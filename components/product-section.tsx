"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/lib/language-context"

const productData = [
  {
    id: "crew-neck-tshirt",
    nameKey: "prodCrewneck" as const,
    descKey: "prodCrewneckDesc" as const,
    price: 990,
    priceUSD: 14.90,
    badgeKey: "productOnlineOnly" as const,
    image: "/images/prod-crewneck.png",
    colors: ["#FFFFFF", "#222222", "#2C5282", "#C53030", "#276749"],
    isNew: true,
  },
  {
    id: "airizm-dress",
    nameKey: "prodAirizmDress" as const,
    descKey: "prodAirizmDressDesc" as const,
    price: 1990,
    priceUSD: 29.90,
    badgeKey: null,
    image: "/images/prod-airizm-dress.png",
    colors: ["#90CDF4", "#FEFCBF", "#FEB2B2", "#9AE6B4"],
    isNew: false,
  },
  {
    id: "linen-pants",
    nameKey: "prodLinenPants" as const,
    descKey: "prodLinenPantsDesc" as const,
    price: 3990,
    priceUSD: 39.90,
    badgeKey: null,
    image: "/images/prod-linen-pants.png",
    colors: ["#D4A96A", "#2D3748", "#68D391"],
    isNew: false,
  },
  {
    id: "denim-jeans",
    nameKey: "prodDenim" as const,
    descKey: "prodDenimDesc" as const,
    price: 3990,
    priceUSD: 49.90,
    badgeKey: "productNew" as const,
    image: "/images/prod-denim.png",
    colors: ["#4A5568", "#2B6CB0", "#1A202C"],
    isNew: true,
  },
  {
    id: "bra-top",
    nameKey: "prodBraTop" as const,
    descKey: "prodBraTopDesc" as const,
    price: 990,
    priceUSD: 14.90,
    badgeKey: null,
    image: "/images/prod-bra-top.png",
    colors: ["#FEB2B2", "#FFFFFF", "#2D3748", "#805AD5"],
    isNew: false,
  },
  {
    id: "nylon-shorts",
    nameKey: "prodShorts" as const,
    descKey: "prodShortsDesc" as const,
    price: 2990,
    priceUSD: 34.90,
    badgeKey: null,
    image: "/images/prod-shorts.png",
    colors: ["#68D391", "#4A5568", "#F6AD55", "#FC8181"],
    isNew: false,
  },
]

type ProductItem = typeof productData[0]

function ProductCard({ product }: { product: ProductItem }) {
  const { lang, t } = useLanguage()
  const [liked, setLiked] = useState(false)
  const [selectedColor, setSelectedColor] = useState(0)

  const name = t[product.nameKey]
  const desc = t[product.descKey]
  const badgeLabel = product.badgeKey ? t[product.badgeKey] : null

  return (
    <div className="product-card group relative flex flex-col" style={{ backgroundColor: "#FFFFFF" }}>
      {/* Image */}
      <Link href={`/products/${product.id}`} className="relative block overflow-hidden" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="aspect-square relative">
          <Image
            src={product.image}
            alt={name}
            fill
            className="object-cover transition-opacity duration-200 group-hover:opacity-85"
          />
        </div>
        {/* Badges */}
        {(product.badgeKey || product.isNew) && (
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <span
                className="text-white px-2 py-0.5 font-medium tracking-wider"
                style={{ fontSize: 9, backgroundColor: "var(--uniqlo-red)" }}
              >
                {t.productNew}
              </span>
            )}
            {badgeLabel && !product.isNew && (
              <span
                className="text-white px-2 py-0.5 font-medium tracking-wider"
                style={{ fontSize: 9, backgroundColor: "#222222" }}
              >
                {badgeLabel}
              </span>
            )}
          </div>
        )}
      </Link>

      {/* Favorite */}
      <button
        className="absolute top-2 right-2 rounded-full p-1.5 transition-colors hover:opacity-100"
        style={{ backgroundColor: "rgba(255,255,255,0.85)" }}
        onClick={() => setLiked(!liked)}
        aria-label={t.addToFavorite}
      >
        <Heart
          size={14}
          style={{
            fill: liked ? "var(--uniqlo-red)" : "none",
            stroke: liked ? "var(--uniqlo-red)" : "#222222",
          }}
        />
      </button>

      {/* Info */}
      <div className="pt-2 flex flex-col gap-1 flex-1">
        {/* Color swatches */}
        <div className="flex gap-1 flex-wrap">
          {product.colors.map((color, i) => (
            <button
              key={i}
              onClick={() => setSelectedColor(i)}
              className="rounded-full transition-all"
              style={{
                width: 14,
                height: 14,
                backgroundColor: color,
                border: `1px solid ${i === selectedColor ? "#222222" : "#E0E0E0"}`,
                outline: i === selectedColor ? "1px solid #222222" : "none",
                outlineOffset: 1,
              }}
              aria-label={`Color ${i + 1}`}
            />
          ))}
          {product.colors.length > 4 && (
            <span style={{ fontSize: 10, color: "#767676" }}>
              +{product.colors.length - 4}
            </span>
          )}
        </div>

        <Link href={`/products/${product.id}`}>
          <h3
            className="font-medium leading-tight hover:underline text-balance"
            style={{ fontSize: 13, color: "#222222" }}
          >
            {name}
          </h3>
        </Link>

        <p className="leading-tight line-clamp-2" style={{ fontSize: 11, color: "#767676" }}>
          {desc}
        </p>

        <div className="flex items-baseline gap-1 mt-auto pt-1">
          <span className="font-bold" style={{ fontSize: 16, color: "var(--uniqlo-price-red)" }}>
            {lang === "ja" ? `¥${product.price.toLocaleString()}` : `$${product.priceUSD.toFixed(2)}`}
          </span>
          {lang === "ja" && (
            <span style={{ fontSize: 10, color: "#767676" }}>{t.productPriceSuffix}</span>
          )}
        </div>

        <p style={{ fontSize: 10, color: "#767676" }}>{t.productPriceChange}</p>
      </div>
    </div>
  )
}

export default function ProductSection() {
  const { t } = useLanguage()

  return (
    <section className="py-8 px-4 max-w-[1280px] mx-auto" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold tracking-wide" style={{ fontSize: 15, color: "#222222" }}>
          {t.productTitle}
        </h2>
        <Link
          href="#"
          className="underline"
          style={{ fontSize: 12, color: "#222222" }}
        >
          {t.productViewAll}
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-6">
        {productData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
