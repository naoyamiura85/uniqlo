"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export default function CategoryGrid() {
  const { t } = useLanguage()

  const categories = [
    { label: t.catTshirt, image: "/images/cat-tshirt.png", href: "#" },
    { label: t.catTops, image: "/images/cat-knitwear.png", href: "#" },
    { label: t.catShirts, image: "/images/cat-shirt.png", href: "#" },
    { label: t.catPants, image: "/images/cat-pants.png", href: "#" },
    { label: t.catShorts, image: "/images/cat-shorts.png", href: "#" },
    { label: t.catDress, image: "/images/cat-dress.png", href: "#" },
    { label: t.catOuter, image: "/images/cat-outer.png", href: "#" },
    { label: t.catInnerwear, image: "/images/cat-innerwear.png", href: "#" },
    { label: t.catKnitwear, image: "/images/cat-knitwear.png", href: "#" },
    { label: t.catDenim, image: "/images/cat-denim.png", href: "#" },
    { label: t.catSports, image: "/images/cat-sport.png", href: "#" },
    { label: t.catAirizm, image: "/images/cat-innerwear.png", href: "#" },
    { label: t.catHeattech, image: "/images/cat-knitwear.png", href: "#" },
    { label: t.catLimited, image: "/images/cat-dress.png", href: "#" },
    { label: t.catUT, image: "/images/cat-tshirt.png", href: "#" },
    { label: t.catTech, image: "/images/cat-sport.png", href: "#" },
  ]

  return (
    <section className="py-8 px-4 max-w-[1280px] mx-auto" style={{ backgroundColor: "#FFFFFF" }}>
      <h2 className="font-bold mb-5 tracking-wide" style={{ fontSize: 15, color: "#222222" }}>
        {t.categoryTitle}
      </h2>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.label}
            href={cat.href}
            className="flex flex-col items-center gap-1.5 group"
          >
            <div
              className="w-full aspect-square overflow-hidden relative"
              style={{ backgroundColor: "#F5F5F5" }}
            >
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className="object-cover transition-opacity duration-200 group-hover:opacity-80"
              />
            </div>
            <span
              className="text-center leading-tight text-balance"
              style={{ fontSize: 10, color: "#222222" }}
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
