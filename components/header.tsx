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
    { label: t.navWomen, href: "#", active: false },
    { label: t.navMen,   href: "#", active: true },
    { label: t.navKids,  href: "#", active: false },
    { label: t.navBaby,  href: "#", active: false },
  ]

  return (
    <header
      className="sticky top-0 z-50 bg-white"
      style={{ borderBottom: "1px solid #E8E8E8" }}
    >
      {/* ── Desktop header ── */}
      <div className="hidden md:flex items-center h-16 px-6 gap-0">

        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center" aria-label="UNIQLO ホーム">
          <Image
            src="/images/logo-uniqlo.png"
            alt="UNIQLO"
            width={88}
            height={40}
            style={{ height: 40, width: "auto" }}
            priority
          />
        </Link>

        {/* Nav — left-aligned, generous gap from logo */}
        <nav
          className="flex items-center h-full ml-8"
          aria-label="メインナビゲーション"
        >
          {mainNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative flex items-center h-full px-5 transition-opacity hover:opacity-60"
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: "#222222",
                letterSpacing: "0.01em",
              }}
            >
              {item.label}
              {item.active && (
                <span
                  className="absolute bottom-0 left-5 right-5"
                  style={{ height: 2, backgroundColor: "#222222" }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search bar — wide pill, right section */}
        <div style={{ width: 520 }}>
          <label
            className="flex items-center gap-2 w-full px-4 py-2.5 rounded-full cursor-text"
            style={{ border: "1px solid #CCCCCC", backgroundColor: "#FFFFFF" }}
          >
            <Search size={15} style={{ color: "#767676", flexShrink: 0 }} />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="outline-none flex-1 bg-transparent"
              style={{ fontSize: 14, color: "#222222" }}
            />
          </label>
        </div>

        {/* Icon group */}
        <div className="flex items-center ml-4 gap-1">
          <button
            className="p-2 transition-opacity hover:opacity-50"
            aria-label={t.addToFavorite}
            style={{ color: "#222222" }}
          >
            <Heart size={22} />
          </button>
          <button
            className="p-2 transition-opacity hover:opacity-50"
            aria-label="アカウント"
            style={{ color: "#222222" }}
          >
            <User size={22} />
          </button>
          <button
            className="p-2 transition-opacity hover:opacity-50"
            aria-label="カート"
            style={{ color: "#222222" }}
          >
            <ShoppingBag size={22} />
          </button>
          <button
            className="p-2 transition-opacity hover:opacity-50"
            aria-label="メニュー"
            style={{ color: "#222222" }}
          >
            <Menu size={22} />
          </button>

          {/* Language toggle */}
          <div className="flex items-center ml-2 gap-0.5">
            <button
              onClick={() => setLang("ja")}
              className="px-1.5 py-1 transition-colors"
              style={{
                fontSize: 13,
                fontWeight: lang === "ja" ? 700 : 400,
                color: lang === "ja" ? "#222222" : "#AAAAAA",
              }}
            >
              JP
            </button>
            <span style={{ color: "#CCCCCC", fontSize: 12 }}>|</span>
            <button
              onClick={() => setLang("en")}
              className="px-1.5 py-1 transition-colors"
              style={{
                fontSize: 13,
                fontWeight: lang === "en" ? 700 : 400,
                color: lang === "en" ? "#222222" : "#AAAAAA",
              }}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile header ── */}
      <div className="md:hidden flex items-center h-14 px-4 gap-3">
        <Link href="/" aria-label="UNIQLO ホーム">
          <Image
            src="/images/logo-uniqlo.png"
            alt="UNIQLO"
            width={70}
            height={32}
            style={{ height: 32, width: "auto" }}
            priority
          />
        </Link>
        <div className="flex-1" />
        <button className="p-2" aria-label="検索" style={{ color: "#222222" }}>
          <Search size={20} />
        </button>
        <button className="p-2" aria-label={t.addToFavorite} style={{ color: "#222222" }}>
          <Heart size={20} />
        </button>
        <button className="p-2" aria-label="カート" style={{ color: "#222222" }}>
          <ShoppingBag size={20} />
        </button>
        <button
          className="p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="メニュー"
          style={{ color: "#222222" }}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Mobile menu drawer ── */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-t"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#E8E8E8" }}
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
