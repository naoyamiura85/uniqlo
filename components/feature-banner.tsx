"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export default function FeatureBanner() {
  const { lang, t } = useLanguage()

  const features = [
    {
      id: 1,
      image: "/images/feature-airizm.png",
      badge: t.feat1Badge,
      title: t.feat1Title,
      desc: t.feat1Desc,
      price: lang === "ja" ? "¥1,990" : "$29.90",
      cta: t.feat1Cta,
      href: "/products/airizm-dress",
    },
    {
      id: 2,
      image: "/images/feature-linen.png",
      badge: t.feat2Badge,
      title: t.feat2Title,
      desc: t.feat2Desc,
      price: lang === "ja" ? "¥3,990" : "$39.90",
      cta: t.feat2Cta,
      href: "/products/linen-pants",
    },
  ]

  return (
    <section className="py-4" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="flex flex-col gap-0">
        {features.map((feature, idx) => (
          <div
            key={feature.id}
            className={`flex ${idx % 2 === 0 ? "flex-row" : "flex-row-reverse"} min-h-[300px] md:min-h-[400px]`}
          >
            {/* Image */}
            <div className="relative w-1/2 md:w-3/5">
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div
              className="w-1/2 md:w-2/5 flex flex-col justify-center px-6 md:px-12 py-8"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <div
                className="font-medium mb-2 tracking-wide"
                style={{ fontSize: 11, color: "var(--uniqlo-red)" }}
              >
                {feature.badge}
              </div>
              <h3
                className="font-bold leading-tight mb-3 whitespace-pre-line text-balance"
                style={{ fontSize: "clamp(16px, 2vw, 26px)", color: "#222222" }}
              >
                {feature.title}
              </h3>
              <p
                className="mb-4 whitespace-pre-line leading-relaxed"
                style={{ fontSize: "clamp(11px, 1.2vw, 13px)", color: "#767676" }}
              >
                {feature.desc}
              </p>
              <div className="mb-1">
                <span
                  className="font-bold"
                  style={{ fontSize: "clamp(20px, 2.5vw, 32px)", color: "var(--uniqlo-price-red)" }}
                >
                  {feature.price}
                </span>
                {lang === "ja" && (
                  <span className="ml-1" style={{ fontSize: 11, color: "#767676" }}>（税込）</span>
                )}
              </div>
              <p className="mb-5" style={{ fontSize: 11, color: "#767676" }}>
                {t.productPriceChange}
              </p>
              <Link
                href={feature.href}
                className="inline-flex items-center gap-2 px-6 py-2 text-xs font-medium tracking-wider transition-colors w-fit hover:text-white"
                style={{ border: "1px solid #222222", color: "#222222" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#222222"
                  e.currentTarget.style.color = "#FFFFFF"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                  e.currentTarget.style.color = "#222222"
                }}
              >
                {feature.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
