// AI 接客アシスタントの「接客モード（シナリオ）」定義。
// クライアント(UI ラベル/サジェスト)とサーバー(システムプロンプト)で共有する。
import { products } from "@/lib/products"
import type { Language } from "@/lib/language-context"

export type AssistantIcon = "concierge" | "styling" | "ruler" | "gift"

export interface Scenario {
  id: string
  icon: AssistantIcon
  labelJa: string
  labelEn: string
  descJa: string
  descEn: string
  greetingJa: string
  greetingEn: string
  suggestionsJa: string[]
  suggestionsEn: string[]
  systemJa: string
  systemEn: string
}

export const scenarios: Scenario[] = [
  {
    id: "concierge",
    icon: "concierge",
    labelJa: "総合案内",
    labelEn: "Concierge",
    descJa: "お探しの商品やお店のご案内",
    descEn: "Find products and get help",
    greetingJa: "いらっしゃいませ！UNIQLO へようこそ。本日はどんなお品物をお探しですか？",
    greetingEn: "Welcome to UNIQLO! What can I help you find today?",
    suggestionsJa: ["夏に涼しいトップスは？", "今のおすすめは？", "プレゼントを探しています"],
    suggestionsEn: ["Cool tops for summer?", "What's recommended now?", "I'm looking for a gift"],
    systemJa: "あなたは UNIQLO 店舗の親切なコンシェルジュです。来店されたお客様に、明るく丁寧な接客で対応します。お客様のご要望をうかがい、最適な商品を1〜3点提案してください。",
    systemEn: "You are a friendly UNIQLO store concierge. Greet customers warmly, understand their needs, and recommend 1-3 suitable products.",
  },
  {
    id: "styling",
    icon: "styling",
    labelJa: "コーデ提案",
    labelEn: "Styling",
    descJa: "コーディネートのご相談",
    descEn: "Outfit & styling advice",
    greetingJa: "コーディネートのご相談ですね！シーンやお好みのテイストを教えていただければ、着回しやすい組み合わせをご提案します。",
    greetingEn: "Let's style an outfit! Tell me the occasion or your taste and I'll suggest easy combinations.",
    suggestionsJa: ["休日のカジュアルコーデ", "オフィス向けの着こなし", "デニムに合うトップス"],
    suggestionsEn: ["Casual weekend outfit", "Office-ready look", "Tops that go with denim"],
    systemJa: "あなたは UNIQLO のスタイリストです。お客様のシーンや好みに合わせ、当店の商品を組み合わせた具体的なコーディネートを提案します。色や着回しのコツも一言添えてください。",
    systemEn: "You are a UNIQLO stylist. Suggest concrete outfits combining our products for the customer's occasion and taste, with a quick tip on color and versatility.",
  },
  {
    id: "size",
    icon: "ruler",
    labelJa: "サイズ相談",
    labelEn: "Size & Fit",
    descJa: "サイズ・フィット感のご相談",
    descEn: "Size & fit help",
    greetingJa: "サイズ選びのお手伝いをします。身長・普段のサイズや、お好みのフィット感（ゆったり／ジャストなど）を教えてください。",
    greetingEn: "I'll help you find the right size. Tell me your height, usual size, and preferred fit (relaxed / regular).",
    suggestionsJa: ["普段Mです。ゆったり着たい", "身長170cmのおすすめサイズは？", "ワンピースのサイズ感は？"],
    suggestionsEn: ["I'm usually M, want it loose", "Best size for 170cm?", "How does the dress fit?"],
    systemJa: "あなたは UNIQLO のサイズ・フィットの専門スタッフです。お客様の身長・普段のサイズ・好みのフィット感をもとに、最適なサイズを根拠とともに丁寧に案内します。断定しすぎず、試着もおすすめしてください。",
    systemEn: "You are a UNIQLO size & fit specialist. Recommend the best size based on the customer's height, usual size, and fit preference, with brief reasoning. Suggest trying it on too.",
  },
  {
    id: "gift",
    icon: "gift",
    labelJa: "ギフト選び",
    labelEn: "Gift",
    descJa: "贈り物選びのお手伝い",
    descEn: "Gift recommendations",
    greetingJa: "ギフト選びですね！贈る相手やご予算、シーンを教えていただければ、喜ばれるお品物をお選びします。",
    greetingEn: "Looking for a gift! Tell me who it's for, your budget, and the occasion, and I'll pick something they'll love.",
    suggestionsJa: ["父の日に3,000円くらいで", "彼女への誕生日プレゼント", "ラッピングはできますか？"],
    suggestionsEn: ["Father's Day under $30", "Birthday gift for my girlfriend", "Do you offer gift wrapping?"],
    systemJa: "あなたは UNIQLO のギフトアドバイザーです。贈る相手・予算・シーンをふまえ、当店の商品からギフトに適した品を提案します。価格にも配慮してください。",
    systemEn: "You are a UNIQLO gift advisor. Recommend gift-appropriate products from our catalog based on the recipient, budget, and occasion, keeping price in mind.",
  },
]

export const DEFAULT_SCENARIO = scenarios[0].id

export function getScenario(id: string): Scenario {
  return scenarios.find((s) => s.id === id) ?? scenarios[0]
}

// 商品ごとのキーワード（日本語・英語）。ユーザー発話とのマッチングに使う。
const PRODUCT_KEYWORDS: Record<string, string[]> = {
  "crew-neck-tshirt": ["tシャツ", "ティーシャツ", "シャツ", "トップ", "tshirt", "t-shirt", "tee", "top", "crew"],
  "airizm-dress": ["ワンピース", "ドレス", "dress", "ワンピ", "エアリズム", "airism", "涼しい", "cool"],
  "linen-pants": ["パンツ", "ズボン", "リネン", "linen", "pants", "trousers", "ボトム", "bottom"],
  "denim-jeans": ["デニム", "ジーンズ", "ジーパン", "denim", "jeans", "barrel", "バレル"],
  "bra-top": ["ブラトップ", "インナー", "下着", "bra", "innerwear", "camisole", "キャミ"],
  "nylon-shorts": ["ショーツ", "ショートパンツ", "短パン", "shorts", "ナイロン", "nylon", "アクティブ", "active"],
}

// ユーザー発話にマッチする商品 id を最大 max 件返す
export function matchProducts(text: string, max = 3): string[] {
  const lower = (text || "").toLowerCase()
  const hits = products
    .map((p) => {
      const kws = PRODUCT_KEYWORDS[p.id] ?? []
      const score = kws.reduce((n, kw) => (lower.includes(kw.toLowerCase()) ? n + 1 : n), 0)
      return { id: p.id, score }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
  return hits.slice(0, max).map((x) => x.id)
}

// LLM 用に商品カタログを短く要約
export function catalogSummary(lang: Language): string {
  return products
    .map((p) => {
      const name = lang === "ja" ? p.nameJa : p.nameEn
      const price = lang === "ja" ? `¥${p.priceJPY.toLocaleString()}` : `$${p.priceUSD.toFixed(2)}`
      const desc = lang === "ja" ? p.descJa : p.descEn
      return `- ${name} (${price}) [id:${p.id}] — ${desc.slice(0, 60)}`
    })
    .join("\n")
}
