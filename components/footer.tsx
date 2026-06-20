"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export default function Footer() {
  const { t } = useLanguage()

  const footerLinks = [
    {
      title: t.footerSupport,
      links: [
        { label: t.footerFAQ, href: "#" },
        { label: t.footerContact, href: "#" },
        { label: t.footerReturn, href: "#" },
        { label: t.footerSize, href: "#" },
        { label: t.footerStores, href: "#" },
      ],
    },
    {
      title: t.footerGuide,
      links: [
        { label: t.footerShoppingGuide, href: "#" },
        { label: t.footerPayment, href: "#" },
        { label: t.footerShipping, href: "#" },
        { label: t.footerLaw, href: "#" },
      ],
    },
    {
      title: t.footerMember,
      links: [
        { label: t.footerMyPage, href: "#" },
        { label: t.footerPoints, href: "#" },
        { label: t.footerFavorites, href: "#" },
        { label: t.footerOrders, href: "#" },
      ],
    },
    {
      title: t.footerCompany,
      links: [
        { label: t.footerAbout, href: "#" },
        { label: t.footerSustain, href: "#" },
        { label: t.footerPress, href: "#" },
        { label: t.footerCareers, href: "#" },
      ],
    },
  ]

  const legalLinks = [
    { label: t.footerPrivacy, href: "#" },
    { label: t.footerTerms, href: "#" },
    { label: t.footerLaw, href: "#" },
    { label: t.footerAccessibility, href: "#" },
    { label: t.footerSitemap, href: "#" },
  ]

  return (
    <footer
      className="border-t mt-8"
      style={{ backgroundColor: "#F5F5F5", borderColor: "var(--uniqlo-border)" }}
    >
      {/* Main footer links */}
      <div className="max-w-[1280px] mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3
                className="font-bold mb-3 tracking-wide"
                style={{ fontSize: 12, color: "#222222" }}
              >
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:opacity-70"
                      style={{ fontSize: 12, color: "#767676" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t" style={{ borderColor: "var(--uniqlo-border)" }}>
        <div className="max-w-[1280px] mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div>
              <h3 className="font-bold mb-1" style={{ fontSize: 13, color: "#222222" }}>
                {t.footerNewsletter}
              </h3>
              <p style={{ fontSize: 12, color: "#767676" }}>
                {t.footerNewsletterDesc}
              </p>
            </div>
            <div className="flex flex-1 max-w-md gap-0">
              <input
                type="email"
                placeholder={t.footerNewsletterPlaceholder}
                className="flex-1 px-3 py-2 outline-none"
                style={{
                  border: "1px solid var(--uniqlo-border)",
                  fontSize: 13,
                  backgroundColor: "#FFFFFF",
                  color: "#222222",
                }}
              />
              <button
                className="text-white px-5 py-2 text-xs font-medium tracking-wider transition-colors"
                style={{ backgroundColor: "#222222" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--uniqlo-red)" }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#222222" }}
              >
                {t.footerNewsletterBtn}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t" style={{ borderColor: "var(--uniqlo-border)" }}>
        <div className="max-w-[1280px] mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div
                className="text-white font-bold flex items-center justify-center"
                style={{ width: 24, height: 24, fontSize: 9, backgroundColor: "var(--uniqlo-red)" }}
              >
                UQ
              </div>
              <span className="font-bold tracking-widest" style={{ fontSize: 11, letterSpacing: "0.2em", color: "#222222" }}>
                UNIQLO
              </span>
            </div>

            {/* Legal links */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="transition-colors hover:opacity-70"
                  style={{ fontSize: 11, color: "#767676" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Copyright */}
            <p style={{ fontSize: 11, color: "#767676" }}>
              {t.footerCopyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
