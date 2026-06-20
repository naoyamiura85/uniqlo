"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"
import { useState } from "react"

const products = [
  {
    id: 1,
    name: "クルーネックT（半袖）",
    description: "着心地の良さを追求したこれからも定番として愛されるＴシャツです。",
    price: 990,
    originalPrice: null,
    badge: "ONLINE限定",
    image: "/images/prod-crewneck.png",
    colors: ["#FFFFFF", "#222222", "#2C5282", "#C53030", "#276749"],
    href: "#",
    isNew: true,
  },
  {
    id: 2,
    name: "エアリズムコットン ワンピース（半袖）",
    description: "肌当たりがやさしく、さらさら快適なワンピースです。",
    price: 1990,
    originalPrice: null,
    badge: null,
    image: "/images/prod-airizm-dress.png",
    colors: ["#90CDF4", "#FEFCBF", "#FEB2B2", "#9AE6B4"],
    href: "#",
    isNew: false,
  },
  {
    id: 3,
    name: "リネンブレンド イージーパンツ",
    description: "天然素材のリネンをブレンドした夏に最適なパンツ。",
    price: 3990,
    originalPrice: null,
    badge: null,
    image: "/images/prod-linen-pants.png",
    colors: ["#D4A96A", "#2D3748", "#68D391"],
    href: "#",
    isNew: false,
  },
  {
    id: 4,
    name: "バギーバレルレッグジーンズ",
    description: "ゆったりとしたデニムで中間層を魅せる大人のジーンズ。",
    price: 3990,
    originalPrice: null,
    badge: "NEW",
    image: "/images/prod-denim.png",
    colors: ["#4A5568", "#2B6CB0", "#1A202C"],
    href: "#",
    isNew: true,
  },
  {
    id: 5,
    name: "ブラトップ（カップ付き）",
    description: "着け心地が良く、すっきりシルエットのインナー。",
    price: 990,
    originalPrice: null,
    badge: null,
    image: "/images/prod-bra-top.png",
    colors: ["#FEB2B2", "#FFFFFF", "#2D3748", "#805AD5"],
    href: "#",
    isNew: false,
  },
  {
    id: 6,
    name: "ナイロンショーツ",
    description: "涼しくて軽く、動きやすい夏のショートパンツ。",
    price: 2990,
    originalPrice: null,
    badge: null,
    image: "/images/prod-shorts.png",
    colors: ["#68D391", "#4A5568", "#F6AD55", "#FC8181"],
    href: "#",
    isNew: false,
  },
]

function ProductCard({ product }: { product: typeof products[0] }) {
  const [liked, setLiked] = useState(false)
  const [selectedColor, setSelectedColor] = useState(0)

  return (
    <div className="product-card group relative flex flex-col">
      {/* Image */}
      <Link href={product.href} className="relative block bg-[var(--uniqlo-gray)] overflow-hidden">
        <div className="aspect-square relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="product-image object-cover transition-opacity duration-200 group-hover:opacity-85"
          />
        </div>
        {/* Badge */}
        {(product.badge || product.isNew) && (
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <span
                className="bg-[var(--uniqlo-red)] text-white px-2 py-0.5 font-medium tracking-wider"
                style={{ fontSize: 9 }}
              >
                NEW
              </span>
            )}
            {product.badge && (
              <span
                className="bg-[var(--uniqlo-text-dark)] text-white px-2 py-0.5 font-medium tracking-wider"
                style={{ fontSize: 9 }}
              >
                {product.badge}
              </span>
            )}
          </div>
        )}
      </Link>

      {/* Favorite */}
      <button
        className="absolute top-2 right-2 bg-white/80 rounded-full p-1.5 hover:bg-white transition-colors"
        onClick={() => setLiked(!liked)}
        aria-label="お気に入りに追加"
      >
        <Heart
          size={14}
          className={liked ? "fill-[var(--uniqlo-red)] stroke-[var(--uniqlo-red)]" : "stroke-[var(--uniqlo-text-dark)]"}
        />
      </button>

      {/* Info */}
      <div className="pt-2 flex flex-col gap-1 flex-1">
        {/* Color swatches */}
        <div className="flex gap-1">
          {product.colors.map((color, i) => (
            <button
              key={i}
              onClick={() => setSelectedColor(i)}
              className="rounded-full border transition-all"
              style={{
                width: 14,
                height: 14,
                backgroundColor: color,
                borderColor: i === selectedColor ? "var(--uniqlo-text-dark)" : "var(--uniqlo-border)",
                outline: i === selectedColor ? "1px solid var(--uniqlo-text-dark)" : "none",
                outlineOffset: 1,
              }}
              aria-label={`カラー ${i + 1}`}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-[var(--uniqlo-text-gray)]" style={{ fontSize: 10 }}>
              +{product.colors.length - 4}
            </span>
          )}
        </div>

        <Link href={product.href}>
          <h3
            className="font-medium text-[var(--uniqlo-text-dark)] leading-tight hover:underline text-balance"
            style={{ fontSize: 13 }}
          >
            {product.name}
          </h3>
        </Link>

        <p className="text-[var(--uniqlo-text-gray)] leading-tight line-clamp-2" style={{ fontSize: 11 }}>
          {product.description}
        </p>

        <div className="flex items-baseline gap-1 mt-auto pt-1">
          <span className="font-bold text-[var(--uniqlo-price-red)]" style={{ fontSize: 16 }}>
            ¥{product.price.toLocaleString()}
          </span>
          <span className="text-[var(--uniqlo-text-gray)]" style={{ fontSize: 10 }}>
            （税込）
          </span>
        </div>

        <p className="text-[var(--uniqlo-text-gray)]" style={{ fontSize: 10 }}>
          4月26日より価格変更予定
        </p>
      </div>
    </div>
  )
}

export default function ProductSection() {
  return (
    <section className="py-8 px-4 max-w-[1280px] mx-auto">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold tracking-wide" style={{ fontSize: 15 }}>
          注目アイテム
        </h2>
        <Link
          href="#"
          className="text-[var(--uniqlo-text-dark)] underline"
          style={{ fontSize: 12 }}
        >
          すべて見る
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
