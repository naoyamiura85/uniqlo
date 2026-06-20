"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

type BannerItem = {
  id: number
  image: string
  badge?: string
  badgeImg?: string
  title: string
  subtitle?: string
  desc?: string
  price?: string
  priceOld?: string
  promo?: string
  cta: string
  href: string
  textColor?: "white" | "dark"
  overlayStrength?: number
}

export default function FeatureBanner() {
  const { lang, t } = useLanguage()

  const banners: BannerItem[] = [
    {
      id: 1,
      image: "/images/banner-ut.png",
      badgeImg: "/images/cat-icon-ut.png",
      title: lang === "ja" ? "Just Arrived: ポケモン\nUT グラフィックTシャツ" : "Just Arrived: Pokémon\nUT Graphic Tees Collection",
      desc: lang === "ja"
        ? "コレクター必見のポケモンコラボUT"
        : "The collection all Pokémon fans have been waiting for.",
      cta: lang === "ja" ? "コレクションを見る" : "Shop the Collection",
      href: "/products/crew-neck-tshirt",
      textColor: "dark",
      overlayStrength: 0,
    },
    {
      id: 2,
      image: "/images/banner-frisso.png",
      title: lang === "ja" ? "Just Arrived: UNIQLO F.RISSO\nサマーカプセルコレクション" : "Just Arrived: UNIQLO F.RISSO\nSummer Capsule Collection",
      desc: lang === "ja"
        ? "フランチェスコ・リッソとユニクロのコラボレーション"
        : "A summer capsule collection that weaves dreams into everyday clothing.",
      cta: lang === "ja" ? "コレクションを見る" : "Shop the Collection",
      href: "#",
      textColor: "white",
      overlayStrength: 0.35,
    },
    {
      id: 3,
      image: "/images/banner-airism-polo.png",
      title: lang === "ja" ? "エアリズムコットン\nポロシャツ" : "AIRism Cotton\nPiqué Polo Shirt",
      desc: lang === "ja"
        ? "なめらかな速乾コンフォートとソフトコットンを融合したクラシックポロ"
        : "Blending smooth, quick-drying comfort features with soft cotton in a classic polo design.",
      price: lang === "ja" ? "¥1,990" : "$19.90",
      priceOld: lang === "ja" ? "¥2,990" : "$29.90",
      promo: lang === "ja" ? "オンライン・アプリ限定 6/25まで" : "Online + App Only Offer until 6/25",
      cta: lang === "ja" ? "今すぐ購入" : "Shop Now",
      href: "/products/crew-neck-tshirt",
      textColor: "white",
      overlayStrength: 0.25,
    },
    {
      id: 4,
      image: "/images/banner-linen.png",
      title: lang === "ja" ? "100% プレミアムリネン" : "100% Premium Linen",
      desc: lang === "ja"
        ? "Tシャツに重ねてもそのまま着てもサマになる、通気性抜群の天然リネン"
        : "Breathable, natural linen that layers over tees or styles by itself.",
      cta: lang === "ja" ? "コレクションを見る" : "Shop the Collection",
      href: "/products/linen-pants",
      textColor: "white",
      overlayStrength: 0.2,
    },
  ]

  return (
    <section style={{ backgroundColor: "#F5F5F5" }}>
      {banners.map((banner) => (
        <Link
          key={banner.id}
          href={banner.href}
          className="relative block w-full overflow-hidden group"
          style={{ aspectRatio: "16/7" }}
        >
          {/* Full-bleed image */}
          <Image
            src={banner.image}
            alt={banner.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            style={{ objectPosition: "center 30%" }}
          />

          {/* Dark overlay */}
          {(banner.overlayStrength ?? 0) > 0 && (
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to top, rgba(0,0,0,${banner.overlayStrength! + 0.3}) 0%, rgba(0,0,0,${banner.overlayStrength}) 50%, transparent 100%)`,
              }}
            />
          )}

          {/* Text block — bottom-left, matching hero-slider style */}
          <div className="absolute bottom-0 left-0 right-0 px-8 pb-8 md:px-14 md:pb-12">
            <div
              className="transition-all duration-500"
              style={{ maxWidth: 480 }}
            >
              {/* Badge image */}
              {banner.badgeImg && (
                <div className="mb-3">
                  <Image
                    src={banner.badgeImg}
                    alt=""
                    width={80}
                    height={28}
                    style={{ height: 28, width: "auto" }}
                  />
                </div>
              )}

              <h2
                className="font-bold leading-tight whitespace-pre-line mb-2"
                style={{
                  fontSize: "clamp(20px, 2.8vw, 40px)",
                  color: banner.textColor === "white" ? "#FFFFFF" : "#111111",
                  textShadow: banner.textColor === "white" ? "0 1px 4px rgba(0,0,0,0.3)" : "none",
                }}
              >
                {banner.title}
              </h2>

              {banner.desc && (
                <p
                  className="mb-3 leading-relaxed"
                  style={{
                    fontSize: "clamp(12px, 1.2vw, 14px)",
                    color: banner.textColor === "white" ? "rgba(255,255,255,0.85)" : "#444444",
                  }}
                >
                  {banner.desc}
                </p>
              )}

              {banner.price && (
                <div className="flex items-baseline gap-2 mb-1">
                  <span
                    className="font-bold"
                    style={{ fontSize: "clamp(22px, 2.5vw, 34px)", color: "#E60012" }}
                  >
                    {banner.price}
                  </span>
                  {banner.priceOld && (
                    <span
                      className="line-through"
                      style={{ fontSize: "clamp(12px, 1.2vw, 16px)", color: "rgba(255,255,255,0.7)" }}
                    >
                      {banner.priceOld}
                    </span>
                  )}
                </div>
              )}

              {banner.promo && (
                <p
                  className="mb-4"
                  style={{ fontSize: "clamp(10px, 1vw, 12px)", color: "#E60012" }}
                >
                  {banner.promo}
                </p>
              )}

              <div className="mt-4">
                <span
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium tracking-wider"
                  style={{
                    backgroundColor: banner.textColor === "white" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)",
                    border: `1px solid ${banner.textColor === "white" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.3)"}`,
                    color: banner.textColor === "white" ? "#FFFFFF" : "#111111",
                  }}
                >
                  {banner.cta}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </section>
  )
}
