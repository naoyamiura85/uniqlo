"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    image: "/images/hero-1.png",
    badge: "新発売",
    title: "UNIQLO FRISCO",
    subtitle: "2025 夏コレクション",
    description: "大自然からインスパイアされた\nニューコレクション。",
    cta: "今すぐ見る",
    ctaHref: "#",
    textPosition: "left" as const,
    textColor: "dark" as const,
  },
  {
    id: 2,
    image: "/images/hero-2.png",
    badge: "SUMMER",
    title: "エアリズムコットン",
    subtitle: "新作登場",
    description: "着心地の良さと\nスタイルを両立した夏の定番。",
    cta: "コレクションを見る",
    ctaHref: "#",
    textPosition: "left" as const,
    textColor: "dark" as const,
  },
  {
    id: 3,
    image: "/images/hero-3.png",
    badge: "LINEN",
    title: "リネンブレンド",
    subtitle: "イージーパンツ",
    description: "涼しく、動きやすく。\n夏の定番スタイルが勢揃い。",
    cta: "ショップへ",
    ctaHref: "#",
    textPosition: "left" as const,
    textColor: "dark" as const,
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrent(index)
    setTimeout(() => setIsTransitioning(false), 400)
  }, [isTransitioning])

  const prev = () => goTo((current - 1 + slides.length) % slides.length)
  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  const slide = slides[current]

  return (
    <div className="relative w-full overflow-hidden bg-[#F5F5F5]" style={{ aspectRatio: "16/7" }}>
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? "auto" : "none" }}
        >
          <Image
            src={s.image}
            alt={s.title}
            fill
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Overlay content — bottom-left panel with semi-transparent bg */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div
            className="inline-block bg-white/90 backdrop-blur-sm px-6 py-5 max-w-xs transition-all duration-500"
            style={{ opacity: isTransitioning ? 0 : 1, transform: isTransitioning ? "translateY(6px)" : "translateY(0)" }}
          >
            <div
              className="inline-block px-2 py-0.5 mb-2 text-white font-medium tracking-widest"
              style={{ backgroundColor: "var(--uniqlo-red)", fontSize: 10 }}
            >
              {slide.badge}
            </div>
            <h1
              className="font-bold leading-tight text-[var(--uniqlo-text-dark)] mb-1"
              style={{ fontSize: "clamp(18px, 2vw, 26px)" }}
            >
              {slide.title}
            </h1>
            <p
              className="font-medium text-[var(--uniqlo-text-dark)] mb-2"
              style={{ fontSize: "clamp(12px, 1.4vw, 16px)" }}
            >
              {slide.subtitle}
            </p>
            <p
              className="text-[var(--uniqlo-text-gray)] mb-4 whitespace-pre-line leading-relaxed"
              style={{ fontSize: "clamp(10px, 1vw, 12px)" }}
            >
              {slide.description}
            </p>
            <Link
              href={slide.ctaHref}
              className="inline-flex items-center gap-2 bg-[var(--uniqlo-text-dark)] text-white px-5 py-2 text-xs font-medium tracking-wider hover:bg-[var(--uniqlo-red)] transition-colors"
            >
              {slide.cta}
            </Link>
          </div>
        </div>
      </div>

      {/* Prev/Next arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 transition-colors"
        aria-label="前のスライド"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 transition-colors"
        aria-label="次のスライド"
      >
        <ChevronRight size={18} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="transition-all duration-300"
            style={{
              width: i === current ? 20 : 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: i === current ? "var(--uniqlo-red)" : "rgba(255,255,255,0.6)",
            }}
            aria-label={`スライド ${i + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div
        className="absolute bottom-3 right-4 text-white/80"
        style={{ fontSize: 11 }}
      >
        {current + 1} / {slides.length}
      </div>
    </div>
  )
}
