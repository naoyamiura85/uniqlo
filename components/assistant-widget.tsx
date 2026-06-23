"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Headset, Sparkles, Ruler, Gift, MessageCircle, X, Send } from "lucide-react"
import { useAssistant } from "@/lib/assistant-context"
import { useLanguage } from "@/lib/language-context"
import { scenarios, getScenario, type AssistantIcon } from "@/lib/assistant-scenarios"
import { getProductById } from "@/lib/products"

const ICONS: Record<AssistantIcon, typeof Headset> = {
  concierge: Headset,
  styling: Sparkles,
  ruler: Ruler,
  gift: Gift,
}

interface ChatMessage {
  role: "user" | "assistant"
  content: string
  products?: string[]
}

export default function AssistantWidget() {
  const { mode, setMode, isOpen, open, close } = useAssistant()
  const { lang } = useLanguage()
  const router = useRouter()
  const scenario = getScenario(mode)

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  // モード切替で会話をリセット（新しい接客ペルソナで開始）
  useEffect(() => {
    setMessages([])
    setInput("")
  }, [mode])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  const greeting = lang === "ja" ? scenario.greetingJa : scenario.greetingEn
  const suggestions = lang === "ja" ? scenario.suggestionsJa : scenario.suggestionsEn

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || loading) return
    const next: ChatMessage[] = [...messages, { role: "user", content: trimmed }]
    setMessages(next)
    setInput("")
    setLoading(true)
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, lang, messages: next }),
      })
      const data = await res.json()
      setMessages([...next, { role: "assistant", content: data.reply, products: data.products }])
    } catch {
      setMessages([
        ...next,
        { role: "assistant", content: lang === "ja" ? "申し訳ありません、接続に問題が発生しました。" : "Sorry, a connection error occurred." },
      ])
    } finally {
      setLoading(false)
    }
  }

  function goToProduct(id: string) {
    close()
    router.push(`/products/${id}`)
  }

  return (
    <>
      {/* Floating launcher */}
      {!isOpen && (
        <button
          onClick={open}
          className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-full pl-3.5 pr-4 py-3 shadow-lg transition-transform hover:scale-105"
          style={{ backgroundColor: "var(--uniqlo-red)", color: "#FFFFFF" }}
          aria-label={lang === "ja" ? "AI接客アシスタントを開く" : "Open AI assistant"}
        >
          <MessageCircle size={20} />
          <span style={{ fontSize: 13, fontWeight: 700 }}>{lang === "ja" ? "AI接客" : "AI Help"}</span>
        </button>
      )}

      {/* Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-[60]">
          {/* backdrop */}
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.35)" }} onClick={close} aria-hidden />

          {/* drawer */}
          <div className="absolute top-0 right-0 h-full w-full sm:w-[400px] flex flex-col" style={{ backgroundColor: "#FFFFFF" }}>
            {/* Header */}
            <div className="px-4 pt-4 pb-3" style={{ borderBottom: "1px solid #EEEEEE" }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center rounded-full" style={{ width: 30, height: 30, backgroundColor: "var(--uniqlo-red)", color: "#FFFFFF" }}>
                    <Sparkles size={16} />
                  </span>
                  <div>
                    <p className="font-bold leading-none" style={{ fontSize: 14, color: "#222222" }}>
                      {lang === "ja" ? "AI接客アシスタント" : "AI Assistant"}
                    </p>
                    <p style={{ fontSize: 11, color: "#767676", marginTop: 2 }}>
                      {lang === "ja" ? scenario.labelJa : scenario.labelEn}・{lang === "ja" ? "デモ" : "Demo"}
                    </p>
                  </div>
                </div>
                <button onClick={close} className="p-1.5 transition-opacity hover:opacity-60" aria-label="Close" style={{ color: "#222222" }}>
                  <X size={20} />
                </button>
              </div>

              {/* Mode switcher */}
              <div className="flex gap-1.5 mt-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {scenarios.map((s) => {
                  const Icon = ICONS[s.icon]
                  const active = s.id === mode
                  return (
                    <button
                      key={s.id}
                      onClick={() => setMode(s.id)}
                      className="flex items-center gap-1 shrink-0 rounded-full px-2.5 py-1.5 transition-colors"
                      style={{
                        fontSize: 12,
                        fontWeight: active ? 700 : 500,
                        border: `1px solid ${active ? "#222222" : "#E0E0E0"}`,
                        backgroundColor: active ? "#222222" : "#FFFFFF",
                        color: active ? "#FFFFFF" : "#222222",
                      }}
                    >
                      <Icon size={13} />
                      {lang === "ja" ? s.labelJa : s.labelEn}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3" style={{ backgroundColor: "#FAFAFA" }}>
              {/* greeting */}
              <Bubble role="assistant">{greeting}</Bubble>

              {messages.map((m, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <Bubble role={m.role}>{m.content}</Bubble>
                  {m.products && m.products.length > 0 && (
                    <div className="flex flex-col gap-2">
                      {m.products.map((id) => {
                        const p = getProductById(id)
                        if (!p) return null
                        const pName = lang === "ja" ? p.nameJa : p.nameEn
                        return (
                          <button
                            key={id}
                            onClick={() => goToProduct(id)}
                            className="flex items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-gray-50"
                            style={{ border: "1px solid #EEEEEE", backgroundColor: "#FFFFFF" }}
                          >
                            <span className="relative shrink-0 overflow-hidden rounded" style={{ width: 48, height: 60, backgroundColor: "#F5F5F5" }}>
                              <Image src={p.image} alt={pName} fill className="object-cover" sizes="48px" />
                            </span>
                            <span className="min-w-0">
                              <span className="block font-medium leading-tight line-clamp-2" style={{ fontSize: 12, color: "#222222" }}>{pName}</span>
                              <span className="block font-bold" style={{ fontSize: 13, color: "var(--uniqlo-price-red)" }}>
                                {lang === "ja" ? `¥${p.priceJPY.toLocaleString()}` : `$${p.priceUSD.toFixed(2)}`}
                              </span>
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <Bubble role="assistant">
                  <span className="inline-flex gap-1">
                    <Dot /> <Dot /> <Dot />
                  </span>
                </Bubble>
              )}

              {/* Suggestions (only before the first user message) */}
              {messages.length === 0 && !loading && (
                <div className="flex flex-col gap-2 mt-1">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="self-start rounded-full px-3 py-1.5 text-left transition-colors hover:bg-gray-100"
                      style={{ fontSize: 12, color: "#222222", border: "1px solid #E0E0E0", backgroundColor: "#FFFFFF" }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3" style={{ borderTop: "1px solid #EEEEEE" }}>
              <form
                onSubmit={(e) => { e.preventDefault(); send(input) }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={lang === "ja" ? "メッセージを入力…" : "Type a message…"}
                  className="flex-1 rounded-full px-4 py-2.5 outline-none"
                  style={{ fontSize: 13, border: "1px solid #E0E0E0", color: "#222222" }}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="flex items-center justify-center rounded-full transition-opacity disabled:opacity-40"
                  style={{ width: 40, height: 40, backgroundColor: "var(--uniqlo-red)", color: "#FFFFFF" }}
                  aria-label="Send"
                >
                  <Send size={16} />
                </button>
              </form>
              <p className="text-center" style={{ fontSize: 10, color: "#AAAAAA", marginTop: 6 }}>
                {lang === "ja" ? "※ 接客シミュレーション用のデモです" : "Demo simulation for customer-service scenarios"}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function Bubble({ role, children }: { role: "user" | "assistant"; children: React.ReactNode }) {
  const isUser = role === "user"
  return (
    <div
      className="max-w-[85%] rounded-2xl px-3.5 py-2.5"
      style={{
        alignSelf: isUser ? "flex-end" : "flex-start",
        backgroundColor: isUser ? "#222222" : "#FFFFFF",
        color: isUser ? "#FFFFFF" : "#222222",
        border: isUser ? "none" : "1px solid #EEEEEE",
        fontSize: 13,
        lineHeight: 1.6,
        whiteSpace: "pre-wrap",
      }}
    >
      {children}
    </div>
  )
}

function Dot() {
  return <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#BBBBBB" }} />
}
