import Link from "next/link"
import Image from "next/image"

const categories = [
  { label: "Tシャツ・カットソー", image: "/images/cat-tshirt.png", href: "#" },
  { label: "トップス・ポロシャツ", image: "/images/cat-knitwear.png", href: "#" },
  { label: "シャツ・ブラウス", image: "/images/cat-shirt.png", href: "#" },
  { label: "パンツ・スカート", image: "/images/cat-pants.png", href: "#" },
  { label: "キュロット・ショートパンツ", image: "/images/cat-shorts.png", href: "#" },
  { label: "スカート・ワンピース", image: "/images/cat-dress.png", href: "#" },
  { label: "アウター", image: "/images/cat-outer.png", href: "#" },
  { label: "インナー・下着", image: "/images/cat-innerwear.png", href: "#" },
  { label: "ニット・スウェット", image: "/images/cat-knitwear.png", href: "#" },
  { label: "ジーンズ", image: "/images/cat-denim.png", href: "#" },
  { label: "スポーツ・フィットネス", image: "/images/cat-sport.png", href: "#" },
  { label: "エアリズム", image: "/images/cat-innerwear.png", href: "#" },
  { label: "ヒートテック", image: "/images/cat-knitwear.png", href: "#" },
  { label: "限定コレクション", image: "/images/cat-dress.png", href: "#" },
  { label: "UT", image: "/images/cat-tshirt.png", href: "#" },
  { label: "機能素材", image: "/images/cat-sport.png", href: "#" },
]

export default function CategoryGrid() {
  return (
    <section className="py-8 px-4 max-w-[1280px] mx-auto">
      <h2 className="text-base font-bold mb-5 tracking-wide" style={{ fontSize: 15 }}>
        カテゴリから探す
      </h2>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.label}
            href={cat.href}
            className="flex flex-col items-center gap-1.5 group"
          >
            <div className="w-full aspect-square bg-[var(--uniqlo-gray)] overflow-hidden relative">
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className="object-cover group-hover:opacity-80 transition-opacity"
              />
            </div>
            <span
              className="text-center text-[var(--uniqlo-text-dark)] leading-tight text-balance"
              style={{ fontSize: 10 }}
            >
              {cat.label}
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <Link
          href="#"
          className="border border-[var(--uniqlo-text-dark)] px-10 py-2.5 text-xs font-medium tracking-wider hover:bg-[var(--uniqlo-text-dark)] hover:text-white transition-colors"
        >
          すべてのカテゴリを見る
        </Link>
      </div>
    </section>
  )
}
