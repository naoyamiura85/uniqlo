"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export default function Footer() {
  const { lang } = useLanguage()

  const columns = lang === "ja"
    ? [
        {
          title: "カスタマーサービス",
          links: ["よくある質問", "お問い合わせ", "返品・交換", "サイズガイド", "店舗案内"],
        },
        {
          title: "ショッピングガイド",
          links: ["ご注文について", "お支払い方法", "配送について", "特定商取引法に基づく表示"],
        },
        {
          title: "会員サービス",
          links: ["マイページ", "UNIQLOポイント", "お気に入り", "注文履歴"],
        },
        {
          title: "企業情報",
          links: ["会社概要", "サステナビリティ", "プレスリリース", "採用情報"],
        },
      ]
    : [
        {
          title: "HELP",
          links: ["FAQ", "Contact Us", "Returns & Exchanges", "Size Guide", "Store Locator"],
        },
        {
          title: "SERVICES",
          links: ["Order Information", "Payment Methods", "Shipping Info", "Alterations"],
        },
        {
          title: "MEMBERSHIP",
          links: ["My Page", "UNIQLO Rewards", "Favorites", "Order History"],
        },
        {
          title: "COMPANY",
          links: ["About UNIQLO", "Sustainability", "Press Releases", "Careers"],
        },
      ]

  const legal = lang === "ja"
    ? ["プライバシーポリシー", "利用規約", "アクセシビリティ", "サイトマップ"]
    : ["Privacy Policy", "Terms of Use", "Accessibility", "Sitemap"]

  const copyright = lang === "ja"
    ? "© 2025 UNIQLO CO., LTD. All Rights Reserved."
    : "© 2025 UNIQLO CO., LTD. All Rights Reserved."

  return (
    <footer style={{ backgroundColor: "#F5F5F5", borderTop: "1px solid #E8E8E8" }}>

      {/* Main columns */}
      <div className="max-w-[1280px] mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {columns.map((col) => (
            <div key={col.title}>
              <h3
                className="font-bold mb-4 tracking-wide"
                style={{ fontSize: 11, color: "#222222", letterSpacing: "0.08em" }}
              >
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((label) => (
                  <li key={label}>
                    <Link
                      href="#"
                      className="transition-opacity hover:opacity-60"
                      style={{ fontSize: 12, color: "#555555" }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: "#E8E8E8" }} />

      {/* Bottom bar */}
      <div className="max-w-[1280px] mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">

          {/* Logo */}
          <Link href="/" aria-label="UNIQLO">
            <Image
              src="/images/logo-uniqlo.png"
              alt="UNIQLO"
              width={72}
              height={32}
              style={{ height: 28, width: "auto" }}
            />
          </Link>

          {/* Legal links */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            {legal.map((label) => (
              <Link
                key={label}
                href="#"
                className="transition-opacity hover:opacity-60"
                style={{ fontSize: 11, color: "#767676" }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p style={{ fontSize: 11, color: "#767676" }}>
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
