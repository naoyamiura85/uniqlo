"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export default function PromoSection() {
  const { lang, t } = useLanguage()

  const promos = [
    {
      id: 1,
      image: "/images/promo-ut.png",
      eyebrow: t.promo1Eyebrow,
      title: t.promo1Title,
      price: lang === "ja" ? "¥1,990" : "$19.90",
      href: "#",
    },
    {
      id: 2,
      image: "/images/promo-shorts.png",
      eyebrow: t.promo2Eyebrow,
      title: t.promo2Title,
      price: null,
      href: "#",
    },
    {
      id: 3,
      image: "/images/promo-denim.png",
      eyebrow: t.promo3Eyebrow,
      title: t.promo3Title,
      price: lang === "ja" ? "¥3,990" : "$49.90",
      href: "#",
    },
  ]

  return (
    <section className="py-2 px-4 max-w-[1280px] mx-auto" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left wide promo */}
        <Link href={promos[1].href} className="relative group block overflow-hidden" style={{ backgroundColor: "#F5F5F5" }}>
          <div className="relative" style={{ paddingBottom: "100%" }}>
            <Image
              src={promos[1].image}
              alt={promos[1].title}
              fill
              className="object-cover transition-opacity duration-200 group-hover:opacity-85"
            />
            <div
              className="absolute bottom-0 left-0 p-5 w-full"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)" }}
            >
              <p className="mb-1" style={{ fontSize: 11, color: "rgba(255,255,255,0.8)" }}>{promos[1].eyebrow}</p>
              <h3 className="font-bold leading-tight whitespace-pre-line" style={{ fontSize: 16, color: "#FFFFFF" }}>
                {promos[1].title}
              </h3>
            </div>
          </div>
        </Link>

        {/* Right column — 2 stacked */}
        <div className="flex flex-col gap-4">
          {[promos[0], promos[2]].map((promo) => (
            <Link
              key={promo.id}
              href={promo.href}
              className="relative group block overflow-hidden flex-1"
              style={{ backgroundColor: "#F5F5F5" }}
            >
              <div className="relative" style={{ paddingBottom: "48%" }}>
                <Image
                  src={promo.image}
                  alt={promo.title}
                  fill
                  className="object-cover transition-opacity duration-200 group-hover:opacity-85"
                />
                <div
                  className="absolute bottom-0 left-0 p-4 w-full"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)" }}
                >
                  <p className="mb-0.5" style={{ fontSize: 11, color: "rgba(255,255,255,0.8)" }}>{promo.eyebrow}</p>
                  <h3 className="font-bold leading-tight whitespace-pre-line" style={{ fontSize: 14, color: "#FFFFFF" }}>
                    {promo.title}
                  </h3>
                  {promo.price && (
                    <p className="font-bold mt-1" style={{ fontSize: 16, color: "#FFFFFF" }}>{promo.price}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
