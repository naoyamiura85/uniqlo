"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, User, ShoppingBag, Heart, Menu, X, ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function Header() {
  const { lang, setLang, t } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const mainNavItems = [
    { label: "WOMEN", href: "#", active: false },
    { label: "MEN",   href: "#", active: true },
    { label: "KIDS",  href: "#", active: false },
    { label: "BABY",  href: "#", active: false },
  ]

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ backgroundColor: "transparent" }}
    >
      {/* ── Desktop header ── */}
      <div className="hidden md:flex items-center h-14 px-6 gap-0">

        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center" aria-label="UNIQLO ホーム">
          <Image
            src="/images/logo-uniqlo.png"
            alt="UNIQLO"
            width={63}
            height={44}
            style={{ height: 44, width: "auto" }}
            priority
          />
        </Link>

        {/* Nav — always English labels, white text */}
        <nav
          className="flex items-center h-full ml-8"
          aria-label="Main navigation"
        >
          {mainNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative flex items-center h-full px-5 transition-opacity hover:opacity-70"
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "#FFFFFF",
                letterSpacing: "0.02em",
              }}
            >
              {item.label}
              {item.active && (
                <span
                  className="absolute bottom-0 left-5 right-5"
                  style={{ height: 2, backgroundColor: "#FFFFFF" }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search bar — narrower pill */}
        <div style={{ width: 320 }}>
          <label
            className="flex items-center gap-2 w-full px-4 py-2 rounded-full cursor-text"
            style={{ border: "1px solid rgba(255,255,255,0.5)", backgroundColor: "rgba(255,255,255,0.15)" }}
          >
            <Search size={14} style={{ color: "#FFFFFF", flexShrink: 0 }} />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="outline-none flex-1 bg-transparent placeholder:text-white/60"
              style={{ fontSize: 13, color: "#FFFFFF" }}
            />
          </label>
        </div>

        {/* Icon group — white */}
        <div className="flex items-center ml-3 gap-0.5">
          <button
            className="p-2 transition-opacity hover:opacity-60"
            aria-label={t.addToFavorite}
            style={{ color: "#FFFFFF" }}
          >
            <Heart size={20} />
          </button>
          <button
            className="p-2 transition-opacity hover:opacity-60"
            aria-label="Account"
            style={{ color: "#FFFFFF" }}
          >
            <User size={20} />
          </button>
          <button
            className="p-2 transition-opacity hover:opacity-60"
            aria-label="Cart"
            style={{ color: "#FFFFFF" }}
          >
            <ShoppingBag size={20} />
          </button>
          <button
            className="p-2 transition-opacity hover:opacity-60"
            aria-label="Menu"
            style={{ color: "#FFFFFF" }}
          >
            <Menu size={20} />
          </button>

          {/* Language toggle — white */}
          <div className="flex items-center ml-1 gap-0.5">
            <button
              onClick={() => setLang("ja")}
              className="px-1.5 py-1 transition-opacity hover:opacity-70"
              style={{
                fontSize: 12,
                fontWeight: lang === "ja" ? 700 : 400,
                color: lang === "ja" ? "#FFFFFF" : "rgba(255,255,255,0.5)",
              }}
            >
              JP
            </button>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>|</span>
            <button
              onClick={() => setLang("en")}
              className="px-1.5 py-1 transition-opacity hover:opacity-70"
              style={{
                fontSize: 12,
                fontWeight: lang === "en" ? 700 : 400,
                color: lang === "en" ? "#FFFFFF" : "rgba(255,255,255,0.5)",
              }}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile header ── 実機と同じ構造: 上段(ロゴ+検索+アイコン) / 下段(ナビタブ) */}
      <div className="md:hidden">
        {/* 上段: ロゴ + インライン検索 + アイコン */}
        <div className="flex items-center h-14 px-4 gap-2.5">
          <Link href="/" aria-label="UNIQLO ホーム" className="shrink-0">
            <Image
              src="/images/logo-uniqlo.png"
              alt="UNIQLO"
              width={54}
              height={38}
              style={{ height: 38, width: "auto" }}
              priority
            />
          </Link>

          {/* 検索バー（ヘッダーにインライン表示） */}
          <label
            className="flex items-center gap-2 flex-1 min-w-0 px-3.5 py-2 rounded-full cursor-text"
            style={{ border: "1px solid rgba(255,255,255,0.5)", backgroundColor: "rgba(255,255,255,0.15)" }}
          >
            <Search size={15} style={{ color: "#FFFFFF", flexShrink: 0 }} />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="outline-none flex-1 min-w-0 bg-transparent placeholder:text-white/60"
              style={{ fontSize: 13, color: "#FFFFFF" }}
            />
          </label>

          <button className="p-1.5 shrink-0" aria-label="Account" style={{ color: "#FFFFFF" }}>
            <User size={22} />
          </button>
          <button className="p-1.5 shrink-0" aria-label="Cart" style={{ color: "#FFFFFF" }}>
            <ShoppingBag size={22} />
          </button>
          <button
            className="p-1.5 shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
            style={{ color: "#FFFFFF" }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* 下段: ナビタブ WOMEN / MEN / KIDS / BABY */}
        <nav className="flex items-stretch h-10 px-1" aria-label="Main navigation">
          {mainNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative flex-1 flex items-center justify-center transition-opacity hover:opacity-70"
              style={{ fontSize: 13, fontWeight: 500, color: "#FFFFFF", letterSpacing: "0.02em" }}
            >
              {item.label}
              {item.active && (
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2"
                  style={{ height: 2, width: 30, backgroundColor: "#FFFFFF" }}
                />
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* ── Mobile menu drawer ── */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-t"
          style={{ backgroundColor: "#FFFFFF", borderColor: "rgba(255,255,255,0.2)" }}
        >
          {/* Search */}
          <div className="px-4 pt-3 pb-2">
            <label
              className="flex items-center gap-2 w-full px-4 py-2.5 rounded-full"
              style={{ border: "1px solid #CCCCCC", backgroundColor: "#F5F5F5" }}
            >
              <Search size={14} style={{ color: "#767676" }} />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                className="outline-none flex-1 bg-transparent"
                style={{ fontSize: 14, color: "#222222" }}
              />
            </label>
          </div>

          {/* Language toggle */}
          <div className="flex gap-0 px-4 pb-2">
            <button
              onClick={() => setLang("ja")}
              className="px-4 py-2 border font-medium"
              style={{
                fontSize: 12,
                backgroundColor: lang === "ja" ? "#222222" : "#FFFFFF",
                color: lang === "ja" ? "#FFFFFF" : "#222222",
                borderColor: "#222222",
              }}
            >
              日本語
            </button>
            <button
              onClick={() => setLang("en")}
              className="px-4 py-2 border border-l-0 font-medium"
              style={{
                fontSize: 12,
                backgroundColor: lang === "en" ? "#222222" : "#FFFFFF",
                color: lang === "en" ? "#FFFFFF" : "#222222",
                borderColor: "#222222",
              }}
            >
              English
            </button>
          </div>

          {/* Nav links */}
          <nav className="px-4 pb-2">
            {mainNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between py-3.5 border-b"
                style={{ fontSize: 14, fontWeight: 500, borderColor: "#EEEEEE", color: "#222222" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
                <ChevronRight size={15} style={{ color: "#AAAAAA" }} />
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
