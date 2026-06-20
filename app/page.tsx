import Header from "@/components/header"
import HeroSlider from "@/components/hero-slider"
import CategoryGrid from "@/components/category-grid"
import ProductSection from "@/components/product-section"
import FeatureBanner from "@/components/feature-banner"
import PromoSection from "@/components/promo-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* ヒーロースライダー */}
        <HeroSlider />

        {/* カテゴリグリッド */}
        <CategoryGrid />

        <div className="h-px bg-[var(--uniqlo-border)] mx-4" />

        {/* 注目アイテム商品一覧 */}
        <ProductSection />

        <div className="h-px bg-[var(--uniqlo-border)] mx-4" />

        {/* フィーチャーバナー（エアリズム・リネン） */}
        <FeatureBanner />

        {/* プロモグリッド */}
        <PromoSection />
      </main>

      <Footer />
    </div>
  )
}
