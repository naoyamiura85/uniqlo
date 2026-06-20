import Link from "next/link"

const footerLinks = [
  {
    title: "お客様サポート",
    links: [
      { label: "よくあるご質問", href: "#" },
      { label: "お問い合わせ", href: "#" },
      { label: "交換・返品について", href: "#" },
      { label: "サイズについて", href: "#" },
      { label: "店舗を探す", href: "#" },
    ],
  },
  {
    title: "ショッピングガイド",
    links: [
      { label: "ご利用ガイド", href: "#" },
      { label: "お支払い方法", href: "#" },
      { label: "配送について", href: "#" },
      { label: "特定商取引法に基づく表記", href: "#" },
    ],
  },
  {
    title: "会員サービス",
    links: [
      { label: "マイページ", href: "#" },
      { label: "ポイントプログラム", href: "#" },
      { label: "お気に入りリスト", href: "#" },
      { label: "注文履歴", href: "#" },
    ],
  },
  {
    title: "企業情報",
    links: [
      { label: "会社概要", href: "#" },
      { label: "サステナビリティ", href: "#" },
      { label: "プレスリリース", href: "#" },
      { label: "採用情報", href: "#" },
    ],
  },
]

const legalLinks = [
  { label: "プライバシーポリシー", href: "#" },
  { label: "利用規約", href: "#" },
  { label: "特定商取引法", href: "#" },
  { label: "アクセシビリティ", href: "#" },
  { label: "サイトマップ", href: "#" },
]

export default function Footer() {
  return (
    <footer className="bg-[var(--uniqlo-gray)] border-t border-[var(--uniqlo-border)] mt-8">
      {/* Main footer links */}
      <div className="max-w-[1280px] mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3
                className="font-bold text-[var(--uniqlo-text-dark)] mb-3 tracking-wide"
                style={{ fontSize: 12 }}
              >
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[var(--uniqlo-text-gray)] hover:text-[var(--uniqlo-text-dark)] transition-colors"
                      style={{ fontSize: 12 }}
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
      <div className="border-t border-[var(--uniqlo-border)]">
        <div className="max-w-[1280px] mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div>
              <h3 className="font-bold text-[var(--uniqlo-text-dark)] mb-1" style={{ fontSize: 13 }}>
                メールマガジン登録
              </h3>
              <p className="text-[var(--uniqlo-text-gray)]" style={{ fontSize: 12 }}>
                最新情報やキャンペーン情報をお届けします。
              </p>
            </div>
            <div className="flex flex-1 max-w-md gap-0">
              <input
                type="email"
                placeholder="メールアドレスを入力"
                className="flex-1 border border-[var(--uniqlo-border)] px-3 py-2 text-sm outline-none focus:border-[var(--uniqlo-text-dark)]"
                style={{ fontSize: 13 }}
              />
              <button
                className="bg-[var(--uniqlo-text-dark)] text-white px-5 py-2 text-xs font-medium tracking-wider hover:bg-[var(--uniqlo-red)] transition-colors"
              >
                登録する
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--uniqlo-border)]">
        <div className="max-w-[1280px] mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div
                className="bg-[var(--uniqlo-red)] text-white font-bold flex items-center justify-center"
                style={{ width: 24, height: 24, fontSize: 9 }}
              >
                UQ
              </div>
              <span className="font-bold tracking-widest" style={{ fontSize: 11, letterSpacing: "0.2em" }}>
                UNIQLO
              </span>
            </div>

            {/* Legal links */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[var(--uniqlo-text-gray)] hover:text-[var(--uniqlo-text-dark)] transition-colors"
                  style={{ fontSize: 11 }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-[var(--uniqlo-text-gray)]" style={{ fontSize: 11 }}>
              © 2025 UNIQLO CO., LTD. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
