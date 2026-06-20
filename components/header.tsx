"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, User, ShoppingBag, Heart, Menu, X, ChevronDown } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function Header() {
  const { lang, setLang, t } = useLanguage()
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const mainNavItems = [
    { label: t.navWomen, href: "#" },
    { label: t.navMen, href: "#" },
    { label: t.navKids, href: "#" },
    { label: t.navBaby, href: "#" },
  ]

  const subNavItems = [
    { label: t.subNavNew, href: "#" },
    { label: t.subNavCampaign, href: "#" },
    { label: t.subNavCollection, href: "#" },
    { label: t.subNavCoordinate, href: "#" },
    { label: t.subNavMagazine, href: "#" },
    { label: t.subNavSpecial, href: "#" },
  ]

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: "#FFFFFF",
        borderColor: "var(--uniqlo-border)",
      }}
    >
      {/* Top announcement bar */}
      <div
        className="text-white text-center py-2 px-4"
        style={{ backgroundColor: "var(--uniqlo-red)", fontSize: "11px", letterSpacing: "0.05em" }}
      >
        <span>{t.headerAnnouncement}</span>
      </div>

      {/* Main header */}
      <div className="max-w-[1280px] mx-auto px-4" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="flex items-center justify-between h-14">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 -ml-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="メニューを開く"
            style={{ color: "#222222" }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <div className="flex items-center gap-0.5">
              <div
                className="text-white font-bold flex items-center justify-center"
                style={{ width: 28, height: 28, fontSize: 11, letterSpacing: "-0.5px", backgroundColor: "var(--uniqlo-red)" }}
              >
                UQ
              </div>
              <span
                className="font-bold tracking-widest hidden sm:block"
                style={{ fontSize: 13, letterSpacing: "0.2em", color: "#222222" }}
              >
                UNIQLO
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {mainNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-medium tracking-wider transition-opacity hover:opacity-60"
                style={{ fontSize: 13, color: "#222222" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search + icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search bar desktop */}
            <div
              className="hidden md:flex items-center overflow-hidden"
              style={{ border: "1px solid var(--uniqlo-border)" }}
            >
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="px-3 py-1.5 outline-none w-44"
                style={{ fontSize: 12, backgroundColor: "#F8F8F8", color: "#222222" }}
              />
              <button className="px-3 py-1.5 transition-colors hover:bg-gray-100" style={{ color: "#222222" }}>
                <Search size={16} />
              </button>
            </div>

            {/* Search icon mobile */}
            <button
              className="md:hidden p-2"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
              style={{ color: "#222222" }}
            >
              <Search size={20} />
            </button>

            <button className="p-2 transition-opacity hover:opacity-60" aria-label={t.addToFavorite} style={{ color: "#222222" }}>
              <Heart size={20} />
            </button>
            <button className="p-2 transition-opacity hover:opacity-60" aria-label="Account" style={{ color: "#222222" }}>
              <User size={20} />
            </button>
            <button className="p-2 transition-opacity hover:opacity-60 relative" aria-label="Cart" style={{ color: "#222222" }}>
              <ShoppingBag size={20} />
              <span
                className="absolute top-1 right-1 text-white rounded-full flex items-center justify-center"
                style={{ width: 14, height: 14, fontSize: 9, lineHeight: 1, backgroundColor: "var(--uniqlo-red)" }}
              >
                0
              </span>
            </button>

            {/* Language toggle */}
            <div
              className="hidden sm:flex items-center border ml-1"
              style={{ borderColor: "var(--uniqlo-border)" }}
            >
              <button
                onClick={() => setLang("ja")}
                className="px-2 py-1 text-xs font-medium transition-colors"
                style={{
                  fontSize: 11,
                  backgroundColor: lang === "ja" ? "#222222" : "#FFFFFF",
                  color: lang === "ja" ? "#FFFFFF" : "#222222",
                }}
              >
                JP
              </button>
              <button
                onClick={() => setLang("en")}
                className="px-2 py-1 text-xs font-medium transition-colors"
                style={{
                  fontSize: 11,
                  backgroundColor: lang === "en" ? "#222222" : "#FFFFFF",
                  color: lang === "en" ? "#FFFFFF" : "#222222",
                }}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sub navigation */}
      <div
        className="hidden md:block border-t"
        style={{ backgroundColor: "#FFFFFF", borderColor: "var(--uniqlo-border)" }}
      >
        <div className="max-w-[1280px] mx-auto px-4">
          <nav className="flex items-center gap-6 h-9" aria-label="Sub navigation">
            {subNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition-opacity hover:opacity-60"
                style={{ fontSize: 12, color: "#222222" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile search bar */}
      {searchOpen && (
        <div
          className="md:hidden border-t p-3"
          style={{ backgroundColor: "#FFFFFF", borderColor: "var(--uniqlo-border)" }}
        >
          <div
            className="flex items-center"
            style={{ border: "1px solid var(--uniqlo-border)" }}
          >
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              className="flex-1 px-3 py-2 outline-none"
              style={{ fontSize: 13, backgroundColor: "#FFFFFF", color: "#222222" }}
              autoFocus
            />
            <button className="px-3 py-2" style={{ color: "#222222" }}>
              <Search size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-t"
          style={{ backgroundColor: "#FFFFFF", borderColor: "var(--uniqlo-border)" }}
        >
          {/* Mobile language toggle */}
          <div className="flex px-4 pt-3 gap-0">
            <button
              onClick={() => setLang("ja")}
              className="px-3 py-1.5 text-xs font-medium border transition-colors"
              style={{
                fontSize: 11,
                backgroundColor: lang === "ja" ? "#222222" : "#FFFFFF",
                color: lang === "ja" ? "#FFFFFF" : "#222222",
                borderColor: "#222222",
              }}
            >
              日本語
            </button>
            <button
              onClick={() => setLang("en")}
              className="px-3 py-1.5 text-xs font-medium border border-l-0 transition-colors"
              style={{
                fontSize: 11,
                backgroundColor: lang === "en" ? "#222222" : "#FFFFFF",
                color: lang === "en" ? "#FFFFFF" : "#222222",
                borderColor: "#222222",
              }}
            >
              English
            </button>
          </div>
          <nav className="px-4 py-2 flex flex-col gap-0">
            {mainNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between py-3 border-b text-sm font-medium"
                style={{ borderColor: "var(--uniqlo-border)", color: "#222222" }}
              >
                {item.label}
                <ChevronDown size={16} style={{ color: "#767676" }} className="-rotate-90" />
              </Link>
            ))}
            {subNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between py-3 border-b text-sm"
                style={{ borderColor: "var(--uniqlo-border)", color: "#222222" }}
              >
                {item.label}
                <ChevronDown size={16} style={{ color: "#767676" }} className="-rotate-90" />
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
