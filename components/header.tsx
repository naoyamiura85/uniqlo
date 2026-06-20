"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, User, ShoppingBag, Heart, Menu, X, ChevronDown } from "lucide-react"

const mainNavItems = [
  { label: "WOMEN", href: "#" },
  { label: "MEN", href: "#" },
  { label: "KIDS", href: "#" },
  { label: "BABY", href: "#" },
]

const subNavItems = [
  { label: "新着", href: "#" },
  { label: "キャンペーン", href: "#" },
  { label: "コレクション", href: "#" },
  { label: "コーデ提案", href: "#" },
  { label: "マガジン", href: "#" },
  { label: "特集", href: "#" },
]

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[var(--uniqlo-border)]">
      {/* Top announcement bar */}
      <div
        className="bg-[var(--uniqlo-red)] text-white text-center py-2 px-4"
        style={{ fontSize: "11px", letterSpacing: "0.05em" }}
      >
        <span>送料無料キャンペーン実施中 ｜ 5,000円以上のご購入で送料無料</span>
      </div>

      {/* Main header */}
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 -ml-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="メニューを開く"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <div className="flex items-center gap-0.5">
              <div
                className="bg-[var(--uniqlo-red)] text-white font-bold flex items-center justify-center"
                style={{ width: 28, height: 28, fontSize: 11, letterSpacing: "-0.5px" }}
              >
                UQ
              </div>
              <span
                className="font-bold tracking-widest hidden sm:block"
                style={{ fontSize: 13, letterSpacing: "0.2em", color: "var(--uniqlo-text-dark)" }}
              >
                UNIQLO
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="メインナビゲーション">
            {mainNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="uniqlo-nav-link font-medium tracking-wider"
                style={{ fontSize: 13 }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search + icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search bar desktop */}
            <div className="hidden md:flex items-center border border-[var(--uniqlo-border)] rounded-none overflow-hidden">
              <input
                type="text"
                placeholder="何をお探しですか？"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="px-3 py-1.5 text-sm outline-none w-52 bg-[#F8F8F8]"
                style={{ fontSize: 12 }}
              />
              <button className="px-3 py-1.5 hover:bg-gray-100 transition-colors">
                <Search size={16} />
              </button>
            </div>

            {/* Search icon mobile */}
            <button
              className="md:hidden p-2"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="検索"
            >
              <Search size={20} />
            </button>

            <button className="p-2 hover:opacity-60 transition-opacity" aria-label="お気に入り">
              <Heart size={20} />
            </button>
            <button className="p-2 hover:opacity-60 transition-opacity" aria-label="マイアカウント">
              <User size={20} />
            </button>
            <button className="p-2 hover:opacity-60 transition-opacity relative" aria-label="ショッピングバッグ">
              <ShoppingBag size={20} />
              <span
                className="absolute top-1 right-1 bg-[var(--uniqlo-red)] text-white rounded-full flex items-center justify-center"
                style={{ width: 14, height: 14, fontSize: 9, lineHeight: 1 }}
              >
                0
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub navigation */}
      <div className="hidden md:block border-t border-[var(--uniqlo-border)] bg-white">
        <div className="max-w-[1280px] mx-auto px-4">
          <nav className="flex items-center gap-6 h-9" aria-label="サブナビゲーション">
            {subNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="uniqlo-nav-link"
                style={{ fontSize: 12 }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="md:hidden border-t border-[var(--uniqlo-border)] p-3">
          <div className="flex items-center border border-[var(--uniqlo-border)]">
            <input
              type="text"
              placeholder="何をお探しですか？"
              className="flex-1 px-3 py-2 text-sm outline-none"
              style={{ fontSize: 13 }}
              autoFocus
            />
            <button className="px-3 py-2">
              <Search size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--uniqlo-border)] bg-white">
          <nav className="px-4 py-3 flex flex-col gap-0">
            {mainNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between py-3 border-b border-[var(--uniqlo-border)] text-sm font-medium"
              >
                {item.label}
                <ChevronDown size={16} className="text-gray-400 -rotate-90" />
              </Link>
            ))}
            {subNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between py-3 border-b border-[var(--uniqlo-border)] text-sm"
              >
                {item.label}
                <ChevronDown size={16} className="text-gray-400 -rotate-90" />
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
