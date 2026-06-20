import Link from "next/link"
import Image from "next/image"

const features = [
  {
    id: 1,
    image: "/images/feature-airizm.png",
    badge: "エアリズムコットン",
    title: "エアリズムコットン\nワンピース",
    description: "肌にやさしく、さらさらとした着心地。\nコーデを楽しむ夏の定番。",
    price: "¥1,990",
    priceNote: "4月26日より価格変更予定",
    cta: "今すぐ見る",
    href: "#",
  },
  {
    id: 2,
    image: "/images/feature-linen.png",
    badge: "リネンブレンド",
    title: "リネンブレンド\nイージーパンツ",
    description: "天然素材のリネンをブレンドした\n大人のゆるっとパンツ。",
    price: "¥3,990",
    priceNote: "4月26日より価格変更予定",
    cta: "今すぐ見る",
    href: "#",
  },
]

export default function FeatureBanner() {
  return (
    <section className="py-4">
      <div className="flex flex-col gap-0">
        {features.map((feature, idx) => (
          <div
            key={feature.id}
            className={`flex ${idx % 2 === 0 ? "flex-row" : "flex-row-reverse"} min-h-[300px] md:min-h-[400px]`}
          >
            {/* Image */}
            <div className="relative w-1/2 md:w-3/5">
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className="w-1/2 md:w-2/5 bg-white flex flex-col justify-center px-6 md:px-12 py-8">
              <div
                className="text-[var(--uniqlo-red)] font-medium mb-2 tracking-wide"
                style={{ fontSize: 11 }}
              >
                {feature.badge}
              </div>
              <h3
                className="font-bold leading-tight mb-3 whitespace-pre-line text-[var(--uniqlo-text-dark)] text-balance"
                style={{ fontSize: "clamp(16px, 2vw, 26px)" }}
              >
                {feature.title}
              </h3>
              <p
                className="text-[var(--uniqlo-text-gray)] mb-4 whitespace-pre-line leading-relaxed"
                style={{ fontSize: "clamp(11px, 1.2vw, 13px)" }}
              >
                {feature.description}
              </p>
              <div className="mb-1">
                <span
                  className="font-bold text-[var(--uniqlo-price-red)]"
                  style={{ fontSize: "clamp(20px, 2.5vw, 32px)" }}
                >
                  {feature.price}
                </span>
                <span className="ml-1 text-[var(--uniqlo-text-gray)]" style={{ fontSize: 11 }}>
                  （税込）
                </span>
              </div>
              <p className="text-[var(--uniqlo-text-gray)] mb-5" style={{ fontSize: 11 }}>
                {feature.priceNote}
              </p>
              <Link
                href={feature.href}
                className="inline-flex items-center gap-2 border border-[var(--uniqlo-text-dark)] px-6 py-2 text-xs font-medium tracking-wider hover:bg-[var(--uniqlo-text-dark)] hover:text-white transition-colors w-fit"
              >
                {feature.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
