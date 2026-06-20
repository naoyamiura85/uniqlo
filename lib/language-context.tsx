"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export type Language = "ja" | "en"

export interface Translations {
  // Header
  headerAnnouncement: string
  searchPlaceholder: string
  navWomen: string
  navMen: string
  navKids: string
  navBaby: string
  subNavNew: string
  subNavCampaign: string
  subNavCollection: string
  subNavCoordinate: string
  subNavMagazine: string
  subNavSpecial: string
  cartItems: string

  // Hero slides
  hero1Badge: string
  hero1Title: string
  hero1Subtitle: string
  hero1Desc: string
  hero1Cta: string
  hero2Badge: string
  hero2Title: string
  hero2Subtitle: string
  hero2Desc: string
  hero2Cta: string
  hero3Badge: string
  hero3Title: string
  hero3Subtitle: string
  hero3Desc: string
  hero3Cta: string

  // Category
  categoryTitle: string
  categoryViewAll: string
  catTshirt: string
  catTops: string
  catShirts: string
  catPants: string
  catShorts: string
  catDress: string
  catOuter: string
  catInnerwear: string
  catKnitwear: string
  catDenim: string
  catSports: string
  catAirizm: string
  catHeattech: string
  catLimited: string
  catUT: string
  catTech: string

  // Product section
  productTitle: string
  productViewAll: string
  productPriceSuffix: string
  productPriceChange: string
  productNew: string
  productOnlineOnly: string
  addToFavorite: string
  // product names
  prodCrewneck: string
  prodCrewneckDesc: string
  prodAirizmDress: string
  prodAirizmDressDesc: string
  prodLinenPants: string
  prodLinenPantsDesc: string
  prodDenim: string
  prodDenimDesc: string
  prodBraTop: string
  prodBraTopDesc: string
  prodShorts: string
  prodShortsDesc: string

  // Feature banner
  feat1Badge: string
  feat1Title: string
  feat1Desc: string
  feat1Cta: string
  feat2Badge: string
  feat2Title: string
  feat2Desc: string
  feat2Cta: string

  // Promo
  promo1Eyebrow: string
  promo1Title: string
  promo2Eyebrow: string
  promo2Title: string
  promo3Eyebrow: string
  promo3Title: string

  // Footer
  footerNewsletter: string
  footerNewsletterDesc: string
  footerNewsletterPlaceholder: string
  footerNewsletterBtn: string
  footerSupport: string
  footerFAQ: string
  footerContact: string
  footerReturn: string
  footerSize: string
  footerStores: string
  footerGuide: string
  footerShoppingGuide: string
  footerPayment: string
  footerShipping: string
  footerLaw: string
  footerMember: string
  footerMyPage: string
  footerPoints: string
  footerFavorites: string
  footerOrders: string
  footerCompany: string
  footerAbout: string
  footerSustain: string
  footerPress: string
  footerCareers: string
  footerPrivacy: string
  footerTerms: string
  footerSitemap: string
  footerAccessibility: string
  footerCopyright: string

  // Product detail page
  pdpAddToCart: string
  pdpAddToFavorite: string
  pdpSize: string
  pdpColor: string
  pdpQuantity: string
  pdpDescription: string
  pdpFeatures: string
  pdpSizeGuide: string
  pdpDelivery: string
  pdpReturn: string
  pdpBreadcrumbHome: string
  pdpBreadcrumbProducts: string
  pdpColorCount: (n: number) => string
  pdpInStock: string
  pdpLowStock: string
  pdpRelated: string
  pdpReviews: string
  pdpReviewCount: (n: number) => string
}

const ja: Translations = {
  headerAnnouncement: "送料無料キャンペーン実施中 ｜ 5,000円以上のご購入で送料無料",
  searchPlaceholder: "何をお探しですか？",
  navWomen: "ウィメンズ",
  navMen: "メンズ",
  navKids: "キッズ",
  navBaby: "ベビー",
  subNavNew: "新着",
  subNavCampaign: "キャンペーン",
  subNavCollection: "コレクション",
  subNavCoordinate: "コーデ提案",
  subNavMagazine: "マガジン",
  subNavSpecial: "特集",
  cartItems: "0",

  hero1Badge: "新発売",
  hero1Title: "UNIQLO FRISCO",
  hero1Subtitle: "2025 夏コレクション",
  hero1Desc: "大自然からインスパイアされた\nニューコレクション。",
  hero1Cta: "今すぐ見る",
  hero2Badge: "SUMMER",
  hero2Title: "エアリズムコットン",
  hero2Subtitle: "新作登場",
  hero2Desc: "着心地の良さと\nスタイルを両立した夏の定番。",
  hero2Cta: "コレクションを見る",
  hero3Badge: "LINEN",
  hero3Title: "リネンブレンド",
  hero3Subtitle: "イージーパンツ",
  hero3Desc: "涼しく、動きやすく。\n夏の定番スタイルが勢揃い。",
  hero3Cta: "ショップへ",

  categoryTitle: "カテゴリから探す",
  categoryViewAll: "すべてのカテゴリを見る",
  catTshirt: "Tシャツ・カットソー",
  catTops: "トップス・ポロシャツ",
  catShirts: "シャツ・ブラウス",
  catPants: "パンツ・スカート",
  catShorts: "キュロット・ショートパンツ",
  catDress: "スカート・ワンピース",
  catOuter: "アウター",
  catInnerwear: "インナー・下着",
  catKnitwear: "ニット・スウェット",
  catDenim: "ジーンズ",
  catSports: "スポーツ・フィットネス",
  catAirizm: "エアリズム",
  catHeattech: "ヒートテック",
  catLimited: "限定コレクション",
  catUT: "UT",
  catTech: "機能素材",

  productTitle: "注目アイテム",
  productViewAll: "すべて見る",
  productPriceSuffix: "（税込）",
  productPriceChange: "価格変更予定",
  productNew: "NEW",
  productOnlineOnly: "ONLINE限定",
  addToFavorite: "お気に入りに追加",
  prodCrewneck: "クルーネックT（半袖）",
  prodCrewneckDesc: "着心地の良さを追求したこれからも定番として愛されるTシャツです。",
  prodAirizmDress: "エアリズムコットン ワンピース（半袖）",
  prodAirizmDressDesc: "肌当たりがやさしく、さらさら快適なワンピースです。",
  prodLinenPants: "リネンブレンド イージーパンツ",
  prodLinenPantsDesc: "天然素材のリネンをブレンドした夏に最適なパンツ。",
  prodDenim: "バギーバレルレッグジーンズ",
  prodDenimDesc: "ゆったりとしたデニムで中間層を魅せる大人のジーンズ。",
  prodBraTop: "ブラトップ（カップ付き）",
  prodBraTopDesc: "着け心地が良く、すっきりシルエットのインナー。",
  prodShorts: "ナイロンショーツ",
  prodShortsDesc: "涼しくて軽く、動きやすい夏のショートパンツ。",

  feat1Badge: "エアリズムコットン",
  feat1Title: "エアリズムコットン\nワンピース",
  feat1Desc: "肌にやさしく、さらさらとした着心地。\nコーデを楽しむ夏の定番。",
  feat1Cta: "今すぐ見る",
  feat2Badge: "リネンブレンド",
  feat2Title: "リネンブレンド\nイージーパンツ",
  feat2Desc: "天然素材のリネンをブレンドした\n大人のゆるっとパンツ。",
  feat2Cta: "今すぐ見る",

  promo1Eyebrow: "mofusand UT",
  promo1Title: "じゃんとはグラウドネコを楽しむ\nキュートなコレクション",
  promo2Eyebrow: "ショーツコレクション",
  promo2Title: "夏を彩るショーツの\nバリエーション",
  promo3Eyebrow: "バックインストック",
  promo3Title: "センシュアルなデニム\nバレルレッグジーンズ",

  footerNewsletter: "メールマガジン登録",
  footerNewsletterDesc: "最新情報やキャンペーン情報をお届けします。",
  footerNewsletterPlaceholder: "メールアドレスを入力",
  footerNewsletterBtn: "登録する",
  footerSupport: "お客様サポート",
  footerFAQ: "よくあるご質問",
  footerContact: "お問い合わせ",
  footerReturn: "交換・返品について",
  footerSize: "サイズについて",
  footerStores: "店舗を探す",
  footerGuide: "ショッピングガイド",
  footerShoppingGuide: "ご利用ガイド",
  footerPayment: "お支払い方法",
  footerShipping: "配送について",
  footerLaw: "特定商取引法に基づく表記",
  footerMember: "会員サービス",
  footerMyPage: "マイページ",
  footerPoints: "ポイントプログラム",
  footerFavorites: "お気に入りリスト",
  footerOrders: "注文履歴",
  footerCompany: "企業情報",
  footerAbout: "会社概要",
  footerSustain: "サステナビリティ",
  footerPress: "プレスリリース",
  footerCareers: "採用情報",
  footerPrivacy: "プライバシーポリシー",
  footerTerms: "利用規約",
  footerSitemap: "サイトマップ",
  footerAccessibility: "アクセシビリティ",
  footerCopyright: "© 2025 UNIQLO CO., LTD. All rights reserved.",

  pdpAddToCart: "カートに追加",
  pdpAddToFavorite: "お気に入りに追加",
  pdpSize: "サイズを選ぶ",
  pdpColor: "カラー",
  pdpQuantity: "数量",
  pdpDescription: "商品説明",
  pdpFeatures: "素材・特長",
  pdpSizeGuide: "サイズガイド",
  pdpDelivery: "配送・返品について",
  pdpReturn: "返品・交換ポリシー",
  pdpBreadcrumbHome: "ホーム",
  pdpBreadcrumbProducts: "商品一覧",
  pdpColorCount: (n) => `${n}色`,
  pdpInStock: "在庫あり",
  pdpLowStock: "残りわずか",
  pdpRelated: "関連商品",
  pdpReviews: "レビュー",
  pdpReviewCount: (n) => `${n}件のレビュー`,
}

const en: Translations = {
  headerAnnouncement: "Free shipping on orders over $50 | Shop the new Summer collection",
  searchPlaceholder: "Search",
  navWomen: "WOMEN",
  navMen: "MEN",
  navKids: "KIDS",
  navBaby: "BABY",
  subNavNew: "New Arrivals",
  subNavCampaign: "Sale",
  subNavCollection: "Collections",
  subNavCoordinate: "Outfits",
  subNavMagazine: "Magazine",
  subNavSpecial: "Features",
  cartItems: "0",

  hero1Badge: "NEW",
  hero1Title: "UNIQLO FRISCO",
  hero1Subtitle: "Summer 2025 Collection",
  hero1Desc: "A new collection inspired\nby the great outdoors.",
  hero1Cta: "Shop Now",
  hero2Badge: "SUMMER",
  hero2Title: "AIRism Cotton",
  hero2Subtitle: "New Arrivals",
  hero2Desc: "Comfort and style for\nthe hottest days of summer.",
  hero2Cta: "Shop the Collection",
  hero3Badge: "LINEN",
  hero3Title: "Linen Blend",
  hero3Subtitle: "Easy Pants",
  hero3Desc: "Stay cool and move freely\nin our summer essentials.",
  hero3Cta: "Shop Now",

  categoryTitle: "Shop by Category",
  categoryViewAll: "View All Categories",
  catTshirt: "T-Shirts",
  catTops: "Tops & Polo",
  catShirts: "Shirts & Blouses",
  catPants: "Pants & Skirts",
  catShorts: "Shorts",
  catDress: "Dresses",
  catOuter: "Outerwear",
  catInnerwear: "Innerwear",
  catKnitwear: "Knitwear",
  catDenim: "Jeans",
  catSports: "Sports",
  catAirizm: "AIRism",
  catHeattech: "HEATTECH",
  catLimited: "Limited Edition",
  catUT: "UT",
  catTech: "Functional",

  productTitle: "Featured Items",
  productViewAll: "View All",
  productPriceSuffix: "",
  productPriceChange: "Price subject to change",
  productNew: "NEW",
  productOnlineOnly: "ONLINE ONLY",
  addToFavorite: "Add to favorites",
  prodCrewneck: "Crew Neck Short-Sleeve T-Shirt",
  prodCrewneckDesc: "An everyday essential crafted for ultimate comfort.",
  prodAirizmDress: "AIRism Cotton Short-Sleeve Dress",
  prodAirizmDressDesc: "Soft on skin, smooth and breathable for warm days.",
  prodLinenPants: "Linen Blend Easy Pants",
  prodLinenPantsDesc: "Natural linen blend for a cool, relaxed summer look.",
  prodDenim: "Baggy Barrel-Leg Jeans",
  prodDenimDesc: "A relaxed denim silhouette for a modern urban look.",
  prodBraTop: "Bra Top (Padded)",
  prodBraTopDesc: "Comfortable innerwear with a sleek silhouette.",
  prodShorts: "Nylon Shorts",
  prodShortsDesc: "Lightweight and breathable shorts for active summer days.",

  feat1Badge: "AIRism Cotton",
  feat1Title: "AIRism Cotton\nDress",
  feat1Desc: "Soft, smooth, and breathable.\nYour summer wardrobe essential.",
  feat1Cta: "Shop Now",
  feat2Badge: "Linen Blend",
  feat2Title: "Linen Blend\nEasy Pants",
  feat2Desc: "Natural linen blend for a relaxed,\nbreezy summer silhouette.",
  feat2Cta: "Shop Now",

  promo1Eyebrow: "mofusand UT",
  promo1Title: "Playful cat graphics\nfrom the mofusand collection",
  promo2Eyebrow: "Shorts Collection",
  promo2Title: "Colorful shorts\nfor summer days",
  promo3Eyebrow: "Back in Stock",
  promo3Title: "The barrel-leg denim\nyou've been waiting for",

  footerNewsletter: "Sign up for our newsletter",
  footerNewsletterDesc: "Get the latest updates and exclusive offers.",
  footerNewsletterPlaceholder: "Enter your email address",
  footerNewsletterBtn: "Subscribe",
  footerSupport: "Customer Support",
  footerFAQ: "FAQ",
  footerContact: "Contact Us",
  footerReturn: "Returns & Exchanges",
  footerSize: "Size Guide",
  footerStores: "Store Finder",
  footerGuide: "Shopping Guide",
  footerShoppingGuide: "How to Shop",
  footerPayment: "Payment Methods",
  footerShipping: "Shipping Info",
  footerLaw: "Legal Notices",
  footerMember: "Membership",
  footerMyPage: "My Account",
  footerPoints: "Rewards Program",
  footerFavorites: "Favorites",
  footerOrders: "Order History",
  footerCompany: "Company",
  footerAbout: "About UNIQLO",
  footerSustain: "Sustainability",
  footerPress: "Press",
  footerCareers: "Careers",
  footerPrivacy: "Privacy Policy",
  footerTerms: "Terms of Use",
  footerSitemap: "Sitemap",
  footerAccessibility: "Accessibility",
  footerCopyright: "© 2025 UNIQLO CO., LTD. All rights reserved.",

  pdpAddToCart: "Add to Cart",
  pdpAddToFavorite: "Add to Favorites",
  pdpSize: "Select Size",
  pdpColor: "Color",
  pdpQuantity: "Quantity",
  pdpDescription: "Product Details",
  pdpFeatures: "Material & Features",
  pdpSizeGuide: "Size Guide",
  pdpDelivery: "Shipping & Returns",
  pdpReturn: "Return Policy",
  pdpBreadcrumbHome: "Home",
  pdpBreadcrumbProducts: "Products",
  pdpColorCount: (n) => `${n} Colors`,
  pdpInStock: "In Stock",
  pdpLowStock: "Low Stock",
  pdpRelated: "You May Also Like",
  pdpReviews: "Reviews",
  pdpReviewCount: (n) => `${n} Reviews`,
}

export const translations: Record<Language, Translations> = { ja, en }

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "ja",
  setLang: () => {},
  t: ja,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("ja")
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
