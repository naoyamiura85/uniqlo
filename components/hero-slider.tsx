"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function HeroSlider() {
  const { t } = useLanguage()
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const slides = [
    {
      id: 1,
      image: "/images/hero-1.png",
      badge: t.hero1Badge,
      title: t.hero1Title,
      subtitle: t.hero1Subtitle,
      description: t.hero1Desc,
      cta: t.hero1Cta,
      ctaHref: "#",
    },
    {
      id: 2,
      image: "/images/hero-2.png",
      badge: t.hero2Badge,
      title: t.hero2Title,
      subtitle: t.hero2Subtitle,
      description: t.hero2Desc,
      cta: t.hero2Cta,
      ctaHref: "#",
    },
    {
      id: 3,
      image: "/images/hero-3.png",
      badge: t.hero3Badge,
      title: t.hero3Title,
      subtitle: t.hero3Subtitle,
      description: t.hero3Desc,
      cta: t.hero3Cta,
      ctaHref: "#",
    },
  ]

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrent(index)
    setTimeout(() => setIsTransitioning(false), 400)
  }, [isTransitioning])

  const prev = () => goTo((current - 1 + slides.length) % slides.length)
  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo, slides.length])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  const slide = slides[current]

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: "16/7", backgroundColor: "#F5F5F5" }}
    >
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
            style={{ objectPosition: "center 20%" }}
            priority={i === 0}
          />
        </div>
      ))}

      {/* Text panel — bottom-left, white bg */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div
            className="inline-block px-6 py-5 max-w-xs transition-all duration-500"
            style={{
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? "translateY(6px)" : "translateY(0)",
              backgroundColor: "rgba(255,255,255,0.92)",
            }}
          >
            <div
              className="inline-block px-2 py-0.5 mb-2 text-white font-medium tracking-widest"
              style={{ backgroundColor: "var(--uniqlo-red)", fontSize: 10 }}
            >
              {slide.badge}
            </div>
            <h1
              className="font-bold leading-tight mb-1"
              style={{ fontSize: "clamp(18px, 2vw, 26px)", color: "#222222" }}
            >
              {slide.title}
            </h1>
            <p
              className="font-medium mb-2"
              style={{ fontSize: "clamp(12px, 1.4vw, 16px)", color: "#222222" }}
            >
              {slide.subtitle}
            </p>
            <p
              className="mb-4 whitespace-pre-line leading-relaxed"
              style={{ fontSize: "clamp(10px, 1vw, 12px)", color: "#767676" }}
            >
              {slide.description}
            </p>
            <Link
              href={slide.ctaHref}
              className="inline-flex items-center gap-2 text-white px-5 py-2 text-xs font-medium tracking-wider transition-colors hover:opacity-90"
              style={{ backgroundColor: "#222222" }}
            >
              {slide.cta}
            </Link>
          </div>
        </div>
      </div>

      {/* Prev/Next arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 transition-colors"
        style={{ backgroundColor: "rgba(255,255,255,0.85)" }}
        aria-label="Previous slide"
      >
        <ChevronLeft size={18} style={{ color: "#222222" }} />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 transition-colors"
        style={{ backgroundColor: "rgba(255,255,255,0.85)" }}
        aria-label="Next slide"
      >
        <ChevronRight size={18} style={{ color: "#222222" }} />
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
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div
        className="absolute bottom-3 right-4"
        style={{ fontSize: 11, color: "rgba(255,255,255,0.85)" }}
      >
        {current + 1} / {slides.length}
      </div>
    </div>
  )
}
