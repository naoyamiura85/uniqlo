import { NextRequest, NextResponse } from "next/server"
import { getScenario, matchProducts, catalogSummary } from "@/lib/assistant-scenarios"
import { getProductById } from "@/lib/products"
import type { Language } from "@/lib/language-context"

export const runtime = "nodejs"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

/** Gemini (Nano Banana 系の text モデル) で接客応答を生成。キーが無ければ null。 */
async function generateWithGemini(
  systemPrompt: string,
  messages: ChatMessage[],
): Promise<string | null> {
  const key = process.env.GEMINI_API_KEY
  if (!key) return null
  const model = process.env.GEMINI_TEXT_MODEL || "gemini-2.5-flash"
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`
  const body = {
    systemInstruction: { parts: [{ text: systemPrompt }] },
    contents: messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
    generationConfig: { temperature: 0.7, maxOutputTokens: 400 },
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "x-goog-api-key": key, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    if (!res.ok) return null
    const data = await res.json()
    const text = data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text).join("") ?? ""
    return text.trim() || null
  } catch {
    return null
  }
}

/** キーが無い / 失敗時の、シナリオ別スクリプト応答（デモ用シミュレーション）。 */
function fallbackReply(mode: string, lastUser: string, lang: Language, productIds: string[]): string {
  const names = productIds.map((id) => {
    const p = getProductById(id)
    return p ? (lang === "ja" ? p.nameJa : p.nameEn) : ""
  }).filter(Boolean)
  const recoJa = names.length ? `こちらはいかがでしょうか：${names.join("、")}。` : "ご要望に合いそうなおすすめをいくつかご用意できます。"
  const recoEn = names.length ? `Here are some options: ${names.join(", ")}.` : "I can suggest a few items that fit your needs."

  const ja: Record<string, string> = {
    concierge: `かしこまりました。${recoJa} もう少し詳しいご希望（色・予算・用途など）をうかがえれば、さらにぴったりのお品をご案内します。`,
    styling: `素敵ですね。${recoJa} 全体を同系色でまとめると失敗が少なく、足元を明るくすると軽やかな印象になります。`,
    size: `サイズのご相談ですね。普段のサイズとお好みのフィット感（ゆったり／ジャスト）を教えていただけますか。一般的には、ゆったり着たい場合はワンサイズ上がおすすめです。${names.length ? `${recoJa}` : ""}`,
    gift: `ギフトですね、お任せください。${recoJa} ご予算と贈るお相手を教えていただければ、より喜ばれるお品を絞り込みます。ラッピングのご相談も承ります。`,
  }
  const en: Record<string, string> = {
    concierge: `Of course. ${recoEn} If you can share more (color, budget, occasion), I'll narrow it down for you.`,
    styling: `Great choice. ${recoEn} Keeping the palette tonal is foolproof, and a lighter shoe keeps the look fresh.`,
    size: `Happy to help with sizing. Could you tell me your usual size and preferred fit (relaxed / regular)? If you like it loose, sizing up one is a good idea. ${names.length ? recoEn : ""}`,
    gift: `A gift — leave it to me. ${recoEn} Tell me your budget and who it's for, and I'll refine the picks. Gift wrapping is available too.`,
  }
  const table = lang === "ja" ? ja : en
  return table[mode] ?? table.concierge
}

export async function POST(req: NextRequest) {
  let payload: { mode?: string; messages?: ChatMessage[]; lang?: Language }
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 })
  }

  const lang: Language = payload.lang === "en" ? "en" : "ja"
  const scenario = getScenario(payload.mode || "concierge")
  const messages = (payload.messages || []).filter((m) => m && m.content).slice(-10)
  const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content || ""
  const productIds = matchProducts(lastUser)

  const system = (lang === "ja" ? scenario.systemJa : scenario.systemEn) +
    "\n\n" +
    (lang === "ja"
      ? "必ず日本語で、2〜4文程度の簡潔で温かい接客口調で答えてください。提案する商品は必ず以下のカタログ内から選び、商品名で言及してください。カタログ外の商品は作らないこと。"
      : "Always reply in English, in a warm, concise customer-service tone (2-4 sentences). Only recommend products from the catalog below, referring to them by name. Do not invent products outside the catalog.") +
    "\n\n" +
    (lang === "ja" ? "【取り扱い商品カタログ】\n" : "[Product catalog]\n") +
    catalogSummary(lang)

  const llm = await generateWithGemini(system, messages)
  const reply = llm ?? fallbackReply(scenario.id, lastUser, lang, productIds)

  return NextResponse.json({
    reply,
    products: productIds,
    source: llm ? "gemini" : "fallback",
  })
}
