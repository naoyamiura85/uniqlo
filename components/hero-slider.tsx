"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export default function HeroSlider() {
  const { t, lang } = useLanguage()
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [paused, setPaused] = useState(false)

  const slides = [
    {
      id: 1,
      image: "/images/hero-1.png",
      // Badge: small brand label top-left of text block (like "UNIQLO U")
      brand: "UNIQLO U",
      // Product name
      title: lang === "ja" ? "クルーネックTシャツ" : "Crew Neck T-Shirt",
      // Short copy line
      desc: lang === "ja"
        ? "ベストセラーの100%コットン素材のTシャツ。"
        : "Save now on this best-selling tee crafted with soft 100% cotton.",
      // Sale price (red)
      salePrice: lang === "ja" ? "¥1,990" : "$19.90",
      // Original price (strikethrough)
      origPrice: lang === "ja" ? "¥2,490" : "$24.90",
      // Promo label (red, tiny)
      promo: lang === "ja" ? "オンライン・アプリ限定 6/25まで" : "Online + App Only Offer until 6/25",
      href: "/products/crew-neck-tshirt",
    },
    {
      id: 2,
      image: "/images/hero-2.png",
      brand: "AIRism",
      title: lang === "ja" ? "エアリズムコットン ワンピース" : "AIRism Cotton Dress",
      desc: lang === "ja"
        ? "肌にやさしく、さらさら快適な夏の定番。"
        : "Soft, smooth, and breathable. Your summer wardrobe essential.",
      salePrice: lang === "ja" ? "¥3,990" : "$39.90",
      origPrice: null,
      promo: null,
      href: "/products/airizm-dress",
    },
    {
      id: 3,
      image: "/images/hero-3.png",
      brand: lang === "ja" ? "リネンブレンド" : "LINEN BLEND",
      title: lang === "ja" ? "リネンブレンド イージーパンツ" : "Linen Blend Easy Pants",
      desc: lang === "ja"
        ? "天然素材のリネンをブレンドした夏の定番パンツ。"
        : "Natural linen blend for a cool, relaxed summer look.",
      salePrice: lang === "ja" ? "¥4,990" : "$49.90",
      origPrice: null,
      promo: null,
      href: "/products/linen-pants",
    },
  ]

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrent(index)
    setTimeout(() => setIsTransitioning(false), 700)
  }, [isTransitioning])

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo, slides.length])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next, paused])

  const slide = slides[current]

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", backgroundColor: "#F0EFE9" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? "auto" : "none" }}
          aria-hidden={i !== current}
        >
          <Image
            src={s.image}
            alt={s.title}
            fill
            className="object-cover"
            style={{ objectPosition: "center top" }}
            priority={i === 0}
            sizes="100vw"
          />
          {/* Subtle gradient only at the very bottom for text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 30%, transparent 55%)",
            }}
          />
        </div>
      ))}

      {/* Text block — bottom-left, directly on image (matches real Uniqlo site) */}
      <div
        className="absolute left-0 bottom-0 px-8 md:px-12 pb-16 md:pb-20"
        style={{
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? "translateY(6px)" : "translateY(0)",
          transition: "opacity 0.5s, transform 0.5s",
        }}
      >
        {/* Brand badge — provided PNG image */}
        <div className="mb-3">
          <Image
            src="/images/badge-uniqlo-u.png"
            alt="UNIQLO U"
            width={120}
            height={32}
            style={{ height: 32, width: "auto" }}
          />
        </div>

        {/* Product name — large white */}
        <h1
          className="font-bold leading-tight mb-2"
          style={{
            fontSize: "clamp(22px, 3.5vw, 42px)",
            color: "#FFFFFF",
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
            maxWidth: 480,
          }}
        >
          {slide.title}
        </h1>

        {/* Description */}
        <p
          className="mb-3 leading-relaxed"
          style={{
            fontSize: "clamp(12px, 1.2vw, 14px)",
            color: "rgba(255,255,255,0.9)",
            maxWidth: 380,
          }}
        >
          {slide.desc}
        </p>

        {/* Price block */}
        <div className="flex items-baseline gap-2 mb-1">
          <span
            style={{
              fontSize: "clamp(18px, 2.2vw, 26px)",
              fontWeight: 700,
              color: "#E60012",
              letterSpacing: "-0.01em",
            }}
          >
            {slide.salePrice}
          </span>
          {slide.origPrice && (
            <span
              style={{
                fontSize: "clamp(12px, 1.3vw, 15px)",
                color: "rgba(255,255,255,0.6)",
                textDecoration: "line-through",
              }}
            >
              {slide.origPrice}
            </span>
          )}
        </div>

        {/* Promo text */}
        {slide.promo && (
          <p style={{ fontSize: 11, color: "#FF4444", fontWeight: 500, letterSpacing: "0.01em" }}>
            {slide.promo}
          </p>
        )}
      </div>

      {/* Slide indicators + counter — bottom right */}
      <div className="absolute bottom-6 right-6 flex items-center gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`スライド ${i + 1}`}
            style={{
              width: i === current ? 20 : 7,
              height: 3,
              borderRadius: 2,
              transition: "width 0.3s ease, background-color 0.3s",
              backgroundColor: i === current ? "#FFFFFF" : "rgba(255,255,255,0.35)",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          />
        ))}
        {/* Pause / play circle icon — like real site */}
        <button
          onClick={() => setPaused(!paused)}
          aria-label={paused ? "再生" : "一時停止"}
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            border: "1.5px solid rgba(255,255,255,0.6)",
            backgroundColor: "transparent",
            color: "rgba(255,255,255,0.8)",
            fontSize: 9,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 2,
          }}
        >
          {paused ? "▶" : "⏸"}
        </button>
      </div>
    </div>
  )
}
