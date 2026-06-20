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
    { label: t.navWomen, href: "#" },
    { label: t.navMen,   href: "#", active: true },
    { label: t.navKids,  href: "#" },
    { label: t.navBaby,  href: "#" },
  ]

  return (
    <header
      className="sticky top-0 z-50"
      style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #E8E8E8" }}
    >
      <div
        className="flex items-center h-14 px-4 gap-3"
        style={{ backgroundColor: "#FFFFFF", maxWidth: "100%" }}
      >
        {/* Logo — leftmost */}
        <Link href="/" className="shrink-0 flex items-center mr-2" aria-label="UNIQLO ホーム">
          <Image
            src="/images/logo-uniqlo.png"
            alt="UNIQLO"
            width={80}
            height={36}
            style={{ height: 36, width: "auto" }}
            priority
          />
        </Link>

        {/* Desktop main nav — inline after logo */}
        <nav className="hidden md:flex items-center" aria-label="メインナビゲーション">
          {mainNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-4 py-4 font-medium tracking-wider transition-opacity hover:opacity-50 relative"
              style={{ fontSize: 14, color: "#222222", letterSpacing: "0.04em" }}
            >
              {item.label}
              {item.active && (
                <span
                  className="absolute bottom-0 left-4 right-4"
                  style={{ height: 2, backgroundColor: "#222222", display: "block" }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search bar — pill shape, desktop */}
        <div
          className="hidden md:flex items-center gap-2 flex-1"
          style={{ maxWidth: 380, minWidth: 180 }}
        >
          <label
            className="flex items-center gap-2 w-full px-4 py-2 rounded-full"
            style={{ border: "1px solid #CCCCCC", backgroundColor: "#FFFFFF" }}
          >
            <Search size={14} style={{ color: "#767676", flexShrink: 0 }} />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="outline-none flex-1 bg-transparent"
              style={{ fontSize: 13, color: "#222222", minWidth: 0 }}
            />
          </label>
        </div>

        {/* Icon group */}
        <div className="flex items-center">
          {/* Search icon — mobile only */}
          <button className="md:hidden p-2" aria-label="検索" style={{ color: "#222222" }}>
            <Search size={20} />
          </button>

          <button className="p-2 transition-opacity hover:opacity-50" aria-label={t.addToFavorite} style={{ color: "#222222" }}>
            <Heart size={20} />
          </button>
          <button className="p-2 transition-opacity hover:opacity-50" aria-label="アカウント" style={{ color: "#222222" }}>
            <User size={20} />
          </button>
          <button className="p-2 transition-opacity hover:opacity-50" aria-label="カート" style={{ color: "#222222" }}>
            <ShoppingBag size={20} />
          </button>
          <button className="p-2 transition-opacity hover:opacity-50" aria-label="メニュー" style={{ color: "#222222" }}>
            <Menu size={20} />
          </button>

          {/* Language toggle */}
          <div
            className="hidden sm:flex items-center ml-1"
            style={{ borderLeft: "1px solid #E0E0E0", paddingLeft: 8 }}
          >
            <button
              onClick={() => setLang("ja")}
              className="px-2 py-1 transition-colors font-semibold"
              style={{
                fontSize: 11,
                color: lang === "ja" ? "#222222" : "#AAAAAA",
                textDecoration: lang === "ja" ? "underline" : "none",
              }}
            >
              JP
            </button>
            <span style={{ color: "#CCCCCC", fontSize: 10 }}>|</span>
            <button
              onClick={() => setLang("en")}
              className="px-2 py-1 transition-colors font-semibold"
              style={{
                fontSize: 11,
                color: lang === "en" ? "#222222" : "#AAAAAA",
                textDecoration: lang === "en" ? "underline" : "none",
              }}
            >
              EN
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 ml-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="メニュー"
            style={{ color: "#222222" }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-t"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#E8E8E8" }}
        >
          {/* Search — mobile */}
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

          {/* Language toggle — mobile */}
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
