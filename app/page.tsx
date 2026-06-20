import Header from "@/components/header"
import HeroSlider from "@/components/hero-slider"
import CategoryGrid from "@/components/category-grid"
import ProductSection from "@/components/product-section"
import FeatureBanner from "@/components/feature-banner"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* ヒーロースライダー — 100svh, ヘッダー透過でオーバーレイ */}
        <HeroSlider />

        {/* Shop by Category */}
        <CategoryGrid />

        {/* 注目アイテム */}
        <ProductSection />

        {/* フルスクリーンバナー群（UT / F.RISSO / AIRism Polo / Linen） */}
        <FeatureBanner />
      </main>

      <Footer />
    </div>
  )
}
