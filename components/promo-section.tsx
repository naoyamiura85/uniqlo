import Link from "next/link"
import Image from "next/image"

const promos = [
  {
    id: 1,
    image: "/images/promo-ut.png",
    eyebrow: "mofusand UT",
    title: "じゃんとはグラウドネコを楽しむ\nキュートなコレクション",
    price: "¥1,990",
    href: "#",
    wide: false,
  },
  {
    id: 2,
    image: "/images/promo-shorts.png",
    eyebrow: "ショーツコレクション",
    title: "夏を彩るショーツの\nバリエーション",
    price: null,
    href: "#",
    wide: true,
  },
  {
    id: 3,
    image: "/images/promo-denim.png",
    eyebrow: "バックインストック",
    title: "センシュアルなデニム\nバレルレッグジーンズ",
    price: "¥3,990",
    href: "#",
    wide: false,
  },
]

export default function PromoSection() {
  return (
    <section className="py-2 max-w-[1280px] mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left wide promo */}
        <Link href={promos[1].href} className="relative group block overflow-hidden bg-[var(--uniqlo-gray)]">
          <div className="relative" style={{ paddingBottom: "100%" }}>
            <Image
              src={promos[1].image}
              alt={promos[1].title}
              fill
              className="object-cover group-hover:opacity-85 transition-opacity duration-200"
            />
            <div className="absolute bottom-0 left-0 p-5 bg-gradient-to-t from-black/40 to-transparent w-full">
              <p className="text-white/80 mb-1" style={{ fontSize: 11 }}>{promos[1].eyebrow}</p>
              <h3 className="text-white font-bold leading-tight whitespace-pre-line" style={{ fontSize: 16 }}>
                {promos[1].title}
              </h3>
            </div>
          </div>
        </Link>

        {/* Right column — 2 stacked */}
        <div className="flex flex-col gap-4">
          {[promos[0], promos[2]].map((promo) => (
            <Link key={promo.id} href={promo.href} className="relative group block overflow-hidden bg-[var(--uniqlo-gray)] flex-1">
              <div className="relative" style={{ paddingBottom: "48%" }}>
                <Image
                  src={promo.image}
                  alt={promo.title}
                  fill
                  className="object-cover group-hover:opacity-85 transition-opacity duration-200"
                />
                <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/40 to-transparent w-full">
                  <p className="text-white/80 mb-0.5" style={{ fontSize: 11 }}>{promo.eyebrow}</p>
                  <h3 className="text-white font-bold leading-tight whitespace-pre-line" style={{ fontSize: 14 }}>
                    {promo.title}
                  </h3>
                  {promo.price && (
                    <p className="text-white font-bold mt-1" style={{ fontSize: 16 }}>{promo.price}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
