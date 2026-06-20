"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, User, ShoppingBag, Heart, Menu, X, ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

/** ユニクロ公式と同じ 2枚並びロゴ（左: ユニクロ, 右: UNIQLO） */
function UniqloLogo() {
  return (
    <svg
      viewBox="0 0 116 54"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="UNIQLO"
      style={{ height: 36, width: "auto" }}
    >
      {/* Left square — katakana ユニクロ */}
      <rect x="0" y="0" width="54" height="54" fill="#E60012" />
      {/* ユ */}
      <path d="M10 10 h10 M15 10 v8 M9 18 q6 4 12 0" stroke="white" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* ニ */}
      <line x1="10" y1="27" x2="26" y2="27" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="12" y1="22" x2="24" y2="22" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      {/* ク */}
      <path d="M10 35 q8-2 10 2 M14 33 v8" stroke="white" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* ロ */}
      <rect x="21" y="34" width="13" height="10" rx="1" stroke="white" strokeWidth="2.2" fill="none" />
      <line x1="21" y1="39" x2="34" y2="39" stroke="white" strokeWidth="2.2" />

      {/* Right square — UNIQLO */}
      <rect x="62" y="0" width="54" height="54" fill="#E60012" />
      <text
        x="89"
        y="22"
        fontFamily="Arial Black, Arial, sans-serif"
        fontSize="13"
        fontWeight="900"
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
        letterSpacing="1"
      >
        UNI
      </text>
      <text
        x="89"
        y="40"
        fontFamily="Arial Black, Arial, sans-serif"
        fontSize="13"
        fontWeight="900"
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
        letterSpacing="1"
      >
        QLO
      </text>
    </svg>
  )
}

export default function Header() {
  const { lang, setLang, t } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const mainNavItems = [
    { label: t.navWomen, href: "#" },
    { label: t.navMen,   href: "#" },
    { label: t.navKids,  href: "#" },
    { label: t.navBaby,  href: "#" },
  ]

  return (
    <header
      className="sticky top-0 z-50"
      style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #E0E0E0" }}
    >
      <div
        className="max-w-[1280px] mx-auto px-4 flex items-center h-14 gap-4"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        {/* Mobile menu button */}
        <button
          className="md:hidden p-1.5 -ml-1"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="メニュー"
          style={{ color: "#222222" }}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center" aria-label="UNIQLO ホーム">
          <UniqloLogo />
        </Link>

        {/* Desktop main nav */}
        <nav className="hidden md:flex items-center gap-7 ml-2" aria-label="メインナビゲーション">
          {mainNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-medium tracking-wider transition-opacity hover:opacity-50"
              style={{ fontSize: 13, color: "#222222", letterSpacing: "0.08em" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search bar — desktop */}
        <div
          className="hidden md:flex items-center overflow-hidden transition-all"
          style={{
            border: `1px solid ${searchFocused ? "#222222" : "#CCCCCC"}`,
            backgroundColor: "#F5F5F5",
            minWidth: 200,
          }}
        >
          <Search size={15} style={{ color: "#767676", marginLeft: 10, flexShrink: 0 }} />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="px-2 py-2 outline-none flex-1 bg-transparent"
            style={{ fontSize: 13, color: "#222222", minWidth: 0 }}
          />
        </div>

        {/* Icon group */}
        <div className="flex items-center gap-0.5">
          {/* Search icon mobile */}
          <button className="md:hidden p-2" aria-label="検索" style={{ color: "#222222" }}>
            <Search size={20} />
          </button>

          <button className="p-2 transition-opacity hover:opacity-50" aria-label={t.addToFavorite} style={{ color: "#222222" }}>
            <Heart size={20} />
          </button>
          <button className="p-2 transition-opacity hover:opacity-50" aria-label="アカウント" style={{ color: "#222222" }}>
            <User size={20} />
          </button>
          <button className="p-2 transition-opacity hover:opacity-50 relative" aria-label="カート" style={{ color: "#222222" }}>
            <ShoppingBag size={20} />
          </button>
          <button className="p-2 transition-opacity hover:opacity-50" aria-label="メニュー" style={{ color: "#222222" }}>
            <Menu size={20} />
          </button>

          {/* Language toggle */}
          <div
            className="hidden sm:flex items-center ml-2"
            style={{ border: "1px solid #CCCCCC" }}
          >
            <button
              onClick={() => setLang("ja")}
              className="px-2.5 py-1 transition-colors"
              style={{
                fontSize: 11,
                fontWeight: 600,
                backgroundColor: lang === "ja" ? "#222222" : "#FFFFFF",
                color: lang === "ja" ? "#FFFFFF" : "#222222",
              }}
            >
              JP
            </button>
            <button
              onClick={() => setLang("en")}
              className="px-2.5 py-1 transition-colors"
              style={{
                fontSize: 11,
                fontWeight: 600,
                backgroundColor: lang === "en" ? "#222222" : "#FFFFFF",
                color: lang === "en" ? "#FFFFFF" : "#222222",
              }}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-t"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#E0E0E0" }}
        >
          {/* Language toggle mobile */}
          <div className="flex gap-0 px-4 pt-3">
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
          <nav className="px-4 py-2">
            {mainNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between py-3.5 border-b"
                style={{ fontSize: 14, fontWeight: 500, borderColor: "#EEEEEE", color: "#222222" }}
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
