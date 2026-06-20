"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export default function HeroSlider() {
  const { t } = useLanguage()
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [paused, setPaused] = useState(false)

  const slides = [
    {
      id: 1,
      image: "/images/hero-1.png",
      eyebrow: t.hero1Badge,
      title: t.hero1Title,
      subtitle: t.hero1Subtitle,
      note: t.hero1Desc,
      cta: t.hero1Cta,
      ctaHref: "#",
      textLight: true,   // 暗い画像には白文字
    },
    {
      id: 2,
      image: "/images/hero-2.png",
      eyebrow: t.hero2Badge,
      title: t.hero2Title,
      subtitle: t.hero2Subtitle,
      note: t.hero2Desc,
      cta: t.hero2Cta,
      ctaHref: "#",
      textLight: false,  // 明るい画像には黒文字
    },
    {
      id: 3,
      image: "/images/hero-3.png",
      eyebrow: t.hero3Badge,
      title: t.hero3Title,
      subtitle: t.hero3Subtitle,
      note: t.hero3Desc,
      cta: t.hero3Cta,
      ctaHref: "#",
      textLight: false,
    },
  ]

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrent(index)
    setTimeout(() => setIsTransitioning(false), 600)
  }, [isTransitioning])

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo, slides.length])
  const prev = () => goTo((current - 1 + slides.length) % slides.length)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next, paused])

  const slide = slides[current]
  const textColor = slide.textLight ? "#FFFFFF" : "#FFFFFF"
  const subTextColor = slide.textLight ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.85)"

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "calc(100svh - 56px)", minHeight: 480, maxHeight: 900, backgroundColor: "#1a1a1a" }}
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
            className="object-cover object-center"
            priority={i === 0}
            sizes="100vw"
          />
          {/* Gradient overlay: bottom to transparent for text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.2) 45%, transparent 75%)",
            }}
          />
        </div>
      ))}

      {/* Text — bottom-left, directly on image (実際のUniqloサイトと同じスタイル) */}
      <div
        className="absolute bottom-0 left-0 right-0 pb-12 px-6 md:px-10 transition-all duration-500"
        style={{
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? "translateY(8px)" : "translateY(0)",
        }}
      >
        {/* Eyebrow — small label with icon, like "F.RISSO 限定" */}
        <div className="flex items-center gap-2 mb-2">
          <span
            className="font-medium tracking-widest"
            style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", letterSpacing: "0.15em" }}
          >
            {slide.eyebrow}
          </span>
          <span
            className="inline-flex items-center px-1.5 py-0.5"
            style={{
              fontSize: 9,
              backgroundColor: "rgba(255,255,255,0.2)",
              border: "1px solid rgba(255,255,255,0.4)",
              color: "rgba(255,255,255,0.9)",
              letterSpacing: "0.1em",
            }}
          >
            {t.heroLimitedLabel}
          </span>
        </div>

        {/* Main title — large, bold, white */}
        <h1
          className="font-bold leading-tight mb-1.5"
          style={{
            fontSize: "clamp(26px, 4vw, 52px)",
            color: textColor,
            letterSpacing: "-0.01em",
            lineHeight: 1.15,
          }}
        >
          {slide.title}
          {slide.subtitle && (
            <>
              <br />
              {slide.subtitle}
            </>
          )}
        </h1>

        {/* Note text */}
        <p
          className="mb-5 leading-relaxed"
          style={{
            fontSize: "clamp(12px, 1.3vw, 15px)",
            color: subTextColor,
            maxWidth: 360,
          }}
        >
          {slide.note}
        </p>

        {/* CTA + small legal disclaimer, like real Uniqlo site */}
        <Link
          href={slide.ctaHref}
          className="inline-flex items-center gap-2 px-6 py-2.5 font-medium tracking-wider transition-opacity hover:opacity-80"
          style={{
            fontSize: 12,
            backgroundColor: "rgba(255,255,255,0.95)",
            color: "#222222",
            letterSpacing: "0.1em",
          }}
        >
          {slide.cta}
        </Link>
      </div>

      {/* Slide indicators — dots, bottom right */}
      <div
        className="absolute bottom-5 right-6 flex items-center gap-2"
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`スライド ${i + 1}`}
            style={{
              width: i === current ? 24 : 8,
              height: 3,
              borderRadius: 1.5,
              transition: "width 0.3s, background-color 0.3s",
              backgroundColor: i === current ? "#FFFFFF" : "rgba(255,255,255,0.4)",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          />
        ))}
        <span
          style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginLeft: 6 }}
        >
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      {/* Pause indicator (circle like real site) */}
      <button
        onClick={() => setPaused(!paused)}
        className="absolute bottom-4 right-4 md:hidden"
        style={{ color: "rgba(255,255,255,0.5)", fontSize: 18 }}
        aria-label={paused ? "再生" : "一時停止"}
      >
        {paused ? "▶" : "⏸"}
      </button>
    </div>
  )
}
