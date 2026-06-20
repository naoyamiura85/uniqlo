"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ChevronRight, Star, Minus, Plus, Share2, Truck, RotateCcw } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import type { Product } from "@/lib/products"

interface ProductDetailProps {
  product: Product
  relatedProducts: Product[]
}

export default function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const { lang, t } = useLanguage()
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [liked, setLiked] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState<"description" | "features" | "delivery">("description")
  const [sizeError, setSizeError] = useState(false)

  const name = lang === "ja" ? product.nameJa : product.nameEn
  const desc = lang === "ja" ? product.descJa : product.descEn
  const material = lang === "ja" ? product.materialJa : product.materialEn
  const features = lang === "ja" ? product.featuresJa : product.featuresEn
  const badge = lang === "ja" ? product.badgeJa : product.badgeEn
  const stockLabel = product.stock === "low"
    ? t.pdpLowStock
    : product.stock === "in" ? t.pdpInStock : ""

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true)
      return
    }
    setSizeError(false)
    // Cart logic placeholder
  }

  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh" }}>
      {/* Breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-4 py-3">
        <nav className="flex items-center gap-1" aria-label="Breadcrumb">
          <Link href="/" className="transition-opacity hover:opacity-60" style={{ fontSize: 12, color: "#767676" }}>
            {t.pdpBreadcrumbHome}
          </Link>
          <ChevronRight size={12} style={{ color: "#767676" }} />
          <Link href="#" className="transition-opacity hover:opacity-60" style={{ fontSize: 12, color: "#767676" }}>
            {t.pdpBreadcrumbProducts}
          </Link>
          <ChevronRight size={12} style={{ color: "#767676" }} />
          <span style={{ fontSize: 12, color: "#222222" }}>{name}</span>
        </nav>
      </div>

      {/* Main content */}
      <div className="max-w-[1280px] mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">

          {/* Left: Images */}
          <div className="flex gap-3">
            {/* Thumbnails */}
            <div className="flex flex-col gap-2 shrink-0">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className="relative overflow-hidden transition-all"
                  style={{
                    width: 64,
                    height: 64,
                    border: `2px solid ${i === activeImage ? "#222222" : "#E0E0E0"}`,
                    backgroundColor: "#F5F5F5",
                  }}
                >
                  <Image src={img} alt={`${name} ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div
              className="relative flex-1 aspect-square overflow-hidden"
              style={{ backgroundColor: "#F5F5F5" }}
            >
              <Image
                src={product.images[activeImage]}
                alt={name}
                fill
                className="object-cover"
                priority
              />
              {badge && (
                <div
                  className="absolute top-3 left-3 text-white px-2 py-0.5 font-medium"
                  style={{
                    fontSize: 10,
                    backgroundColor: product.isNew ? "var(--uniqlo-red)" : "#222222",
                  }}
                >
                  {badge}
                </div>
              )}
            </div>
          </div>

          {/* Right: Product info */}
          <div className="flex flex-col gap-5">
            {/* Title + share */}
            <div className="flex items-start justify-between gap-4">
              <h1 className="font-bold leading-tight text-balance" style={{ fontSize: "clamp(18px, 2.5vw, 26px)", color: "#222222" }}>
                {name}
              </h1>
              <button className="p-2 shrink-0 transition-opacity hover:opacity-60" aria-label="Share" style={{ color: "#222222" }}>
                <Share2 size={18} />
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={14}
                    style={{
                      fill: star <= Math.round(product.rating) ? "#F6AD55" : "none",
                      stroke: "#F6AD55",
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: 13, color: "#767676" }}>
                {product.rating} ({t.pdpReviewCount(product.reviewCount)})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="font-bold" style={{ fontSize: 28, color: "var(--uniqlo-price-red)" }}>
                {lang === "ja" ? `¥${product.priceJPY.toLocaleString()}` : `$${product.priceUSD.toFixed(2)}`}
              </span>
              {lang === "ja" && (
                <span style={{ fontSize: 12, color: "#767676" }}>{t.productPriceSuffix}</span>
              )}
            </div>

            {/* Stock status */}
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ backgroundColor: product.stock === "low" ? "#F6AD55" : product.stock === "in" ? "#68D391" : "#FC8181" }}
              />
              <span style={{ fontSize: 12, color: product.stock === "low" ? "#D69E2E" : "#276749" }}>
                {stockLabel}
              </span>
            </div>

            {/* Color selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium" style={{ fontSize: 13, color: "#222222" }}>
                  {t.pdpColor}：<span style={{ color: "#767676" }}>
                    {lang === "ja" ? product.colors[selectedColor].label : product.colors[selectedColor].labelEn}
                  </span>
                </p>
                <span style={{ fontSize: 11, color: "#767676" }}>
                  {t.pdpColorCount(product.colors.length)}
                </span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    className="rounded-full transition-all"
                    style={{
                      width: 28,
                      height: 28,
                      backgroundColor: color.hex,
                      border: `1px solid ${i === selectedColor ? "#222222" : "#E0E0E0"}`,
                      outline: i === selectedColor ? "3px solid #222222" : "none",
                      outlineOffset: 2,
                    }}
                    aria-label={lang === "ja" ? color.label : color.labelEn}
                  />
                ))}
              </div>
            </div>

            {/* Size selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium" style={{ fontSize: 13, color: "#222222" }}>{t.pdpSize}</p>
                <button
                  className="underline transition-opacity hover:opacity-60"
                  style={{ fontSize: 12, color: "#767676" }}
                >
                  {t.pdpSizeGuide}
                </button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size.label}
                    onClick={() => {
                      if (size.available) {
                        setSelectedSize(size.label)
                        setSizeError(false)
                      }
                    }}
                    disabled={!size.available}
                    className="transition-all"
                    style={{
                      width: 44,
                      height: 44,
                      fontSize: 13,
                      fontWeight: selectedSize === size.label ? 700 : 400,
                      border: `${selectedSize === size.label ? 2 : 1}px solid ${selectedSize === size.label ? "#222222" : "#E0E0E0"}`,
                      backgroundColor: selectedSize === size.label ? "#222222" : size.available ? "#FFFFFF" : "#F5F5F5",
                      color: selectedSize === size.label ? "#FFFFFF" : size.available ? "#222222" : "#BDBDBD",
                      cursor: size.available ? "pointer" : "not-allowed",
                      textDecoration: size.available ? "none" : "line-through",
                    }}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
              {sizeError && (
                <p className="mt-1" style={{ fontSize: 12, color: "var(--uniqlo-red)" }}>
                  {lang === "ja" ? "サイズを選択してください" : "Please select a size"}
                </p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <p className="font-medium mb-2" style={{ fontSize: 13, color: "#222222" }}>{t.pdpQuantity}</p>
              <div className="flex items-center gap-0" style={{ border: "1px solid #E0E0E0", width: "fit-content" }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex items-center justify-center transition-colors hover:bg-gray-100"
                  style={{ width: 40, height: 40, color: "#222222" }}
                  aria-label="Decrease"
                >
                  <Minus size={14} />
                </button>
                <span className="flex items-center justify-center font-medium" style={{ width: 44, fontSize: 15, color: "#222222" }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex items-center justify-center transition-colors hover:bg-gray-100"
                  style={{ width: 40, height: 40, color: "#222222" }}
                  aria-label="Increase"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 text-sm font-bold tracking-wider text-white transition-colors"
                style={{ backgroundColor: "var(--uniqlo-red)" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--uniqlo-dark-red)" }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--uniqlo-red)" }}
              >
                {t.pdpAddToCart}
              </button>
              <button
                onClick={() => setLiked(!liked)}
                className="flex items-center justify-center transition-colors"
                style={{
                  width: 48,
                  border: `1px solid #222222`,
                  backgroundColor: liked ? "#222222" : "#FFFFFF",
                }}
                aria-label={t.pdpAddToFavorite}
              >
                <Heart
                  size={18}
                  style={{
                    fill: liked ? "#FFFFFF" : "none",
                    stroke: liked ? "#FFFFFF" : "#222222",
                  }}
                />
              </button>
            </div>

            {/* Delivery / Return */}
            <div
              className="flex flex-col gap-3 py-4"
              style={{ borderTop: "1px solid #E0E0E0", borderBottom: "1px solid #E0E0E0" }}
            >
              <div className="flex items-start gap-3">
                <Truck size={16} style={{ color: "#767676", marginTop: 1, shrink: 0 }} />
                <div>
                  <p className="font-medium" style={{ fontSize: 12, color: "#222222" }}>{t.pdpDelivery}</p>
                  <p style={{ fontSize: 11, color: "#767676" }}>
                    {lang === "ja" ? "5,000円以上で送料無料" : "Free shipping on orders over $50"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw size={16} style={{ color: "#767676", marginTop: 1 }} />
                <div>
                  <p className="font-medium" style={{ fontSize: 12, color: "#222222" }}>{t.pdpReturn}</p>
                  <p style={{ fontSize: 11, color: "#767676" }}>
                    {lang === "ja" ? "30日以内に返品・交換可能" : "30-day returns and exchanges"}
                  </p>
                </div>
              </div>
            </div>

            {/* Tabs: Description / Features / Delivery */}
            <div>
              <div className="flex border-b" style={{ borderColor: "#E0E0E0" }}>
                {(["description", "features", "delivery"] as const).map((tab) => {
                  const labels: Record<string, string> = {
                    description: t.pdpDescription,
                    features: t.pdpFeatures,
                    delivery: t.pdpDelivery,
                  }
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className="py-2 px-4 text-xs font-medium transition-colors"
                      style={{
                        fontSize: 12,
                        color: activeTab === tab ? "#222222" : "#767676",
                        borderBottom: activeTab === tab ? "2px solid #222222" : "2px solid transparent",
                        marginBottom: -1,
                      }}
                    >
                      {labels[tab]}
                    </button>
                  )
                })}
              </div>
              <div className="py-4" style={{ fontSize: 13, color: "#444444", lineHeight: 1.7 }}>
                {activeTab === "description" && <p>{desc}</p>}
                {activeTab === "features" && (
                  <ul className="flex flex-col gap-2">
                    {features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span style={{ color: "var(--uniqlo-red)", marginTop: 3 }}>•</span>
                        <span>{f}</span>
                      </li>
                    ))}
                    <li className="flex items-start gap-2 pt-2" style={{ borderTop: "1px solid #E0E0E0" }}>
                      <span style={{ color: "#767676", marginTop: 3 }}>•</span>
                      <span style={{ color: "#767676" }}>
                        {lang === "ja" ? `素材：${material}` : `Material: ${material}`}
                      </span>
                    </li>
                  </ul>
                )}
                {activeTab === "delivery" && (
                  <div className="flex flex-col gap-3">
                    <p>{lang === "ja"
                      ? "通常配送：ご注文から3〜5営業日以内にお届けします。5,000円以上のご購入で送料無料。"
                      : "Standard shipping: 3–5 business days. Free shipping on orders over $50."
                    }</p>
                    <p>{lang === "ja"
                      ? "返品・交換：商品到着後30日以内であれば返品・交換が可能です（一部商品を除く）。"
                      : "Returns & Exchanges: Items can be returned or exchanged within 30 days of delivery (some exclusions apply)."
                    }</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="font-bold mb-6" style={{ fontSize: 16, color: "#222222" }}>
              {t.pdpRelated}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-6">
              {relatedProducts.map((p) => {
                const pName = lang === "ja" ? p.nameJa : p.nameEn
                return (
                  <Link key={p.id} href={`/products/${p.id}`} className="group flex flex-col gap-1.5">
                    <div
                      className="relative aspect-square overflow-hidden"
                      style={{ backgroundColor: "#F5F5F5" }}
                    >
                      <Image
                        src={p.image}
                        alt={pName}
                        fill
                        className="object-cover transition-opacity duration-200 group-hover:opacity-85"
                      />
                    </div>
                    <p className="font-medium leading-tight line-clamp-2 text-balance" style={{ fontSize: 12, color: "#222222" }}>
                      {pName}
                    </p>
                    <p className="font-bold" style={{ fontSize: 14, color: "var(--uniqlo-price-red)" }}>
                      {lang === "ja" ? `¥${p.priceJPY.toLocaleString()}` : `$${p.priceUSD.toFixed(2)}`}
                    </p>
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
