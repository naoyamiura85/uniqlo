"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export default function CategoryGrid() {
  const { t } = useLanguage()

  const categories = [
    { label: "AIRism",             image: "/images/cat-icon-airism.png",     href: "#", bg: "#FFFFFF" },
    { label: "UV Protection",      image: "/images/cat-icon-uvprotection.png", href: "#", bg: "#FFFFFF" },
    { label: "UT",                 image: "/images/cat-icon-ut.png",         href: "#", bg: "#FFFFFF" },
    { label: "GU",                 image: "/images/cat-icon-gu.png",         href: "#", bg: "#FFFFFF" },
    { label: "Linen",              image: "/images/cat-icon-linen.png",      href: "#", bg: "#FFFFFF" },
    { label: "Sport Utility Wear", image: "/images/cat-icon-sportuware.png", href: "#", bg: "#FFFFFF" },
  ]

  return (
    <section className="py-8 px-4 max-w-[1280px] mx-auto" style={{ backgroundColor: "#FFFFFF" }}>
      <h2 className="font-bold mb-5 tracking-wide" style={{ fontSize: 15, color: "#222222" }}>
        {t.categoryTitle}
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.label}
            href={cat.href}
            className="flex flex-col items-center gap-2 group"
          >
            <div
              className="w-full aspect-square overflow-hidden relative"
              style={{ backgroundColor: cat.bg, border: "1px solid #E8E8E8" }}
            >
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className="object-contain p-3 transition-opacity duration-200 group-hover:opacity-75"
              />
            </div>
            <span
              className="text-center leading-tight text-balance"
              style={{ fontSize: 11, color: "#222222" }}
            >
              {cat.label}
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <Link
          href="#"
          className="px-10 py-2.5 text-xs font-medium tracking-wider transition-colors hover:text-white"
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
          {t.categoryViewAll}
        </Link>
      </div>
    </section>
  )
}
