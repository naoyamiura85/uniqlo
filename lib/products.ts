export interface ProductColor {
  label: string
  labelEn: string
  hex: string
}

export interface ProductSize {
  label: string
  available: boolean
}

export interface Product {
  id: string
  nameKey: string
  nameEn: string
  nameJa: string
  descJa: string
  descEn: string
  priceJPY: number
  priceUSD: number
  image: string
  images: string[]
  colors: ProductColor[]
  sizes: ProductSize[]
  featuresJa: string[]
  featuresEn: string[]
  materialJa: string
  materialEn: string
  isNew: boolean
  badgeJa: string | null
  badgeEn: string | null
  stock: "in" | "low" | "out"
  rating: number
  reviewCount: number
}

export const products: Product[] = [
  {
    id: "crew-neck-tshirt",
    nameKey: "prodCrewneck",
    nameJa: "クルーネックT（半袖）",
    nameEn: "Crew Neck Short-Sleeve T-Shirt",
    descJa: "着心地の良さを追求したこれからも定番として愛されるTシャツです。やわらかな肌触りのコットン素材を使用し、毎日快適に着ていただけます。シンプルなデザインで、さまざまなスタイルに合わせやすいのも魅力です。",
    descEn: "An everyday essential crafted for ultimate comfort. Made with soft cotton fabric that feels gentle against the skin. The clean, minimal design makes it easy to style with anything in your wardrobe.",
    priceJPY: 990,
    priceUSD: 14.90,
    image: "/images/products/crew-neck-tshirt-model.webp",
    images: ["/images/products/crew-neck-tshirt-model.webp", "/images/products/crew-neck-tshirt-front.webp", "/images/products/crew-neck-tshirt-detail.webp", "/images/products/crew-neck-tshirt-styled.webp"],
    colors: [
      { label: "ホワイト", labelEn: "White", hex: "#FFFFFF" },
      { label: "ブラック", labelEn: "Black", hex: "#222222" },
      { label: "ネイビー", labelEn: "Navy", hex: "#2C5282" },
      { label: "レッド", labelEn: "Red", hex: "#C53030" },
      { label: "グリーン", labelEn: "Green", hex: "#276749" },
    ],
    sizes: [
      { label: "XS", available: true },
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true },
      { label: "XXL", available: false },
    ],
    featuresJa: [
      "やわらかな肌触りのコットン100%素材",
      "洗濯機で洗えて、型崩れしにくい",
      "汗をかいてもすぐ乾くドライ機能",
      "動きやすいゆとりのシルエット",
    ],
    featuresEn: [
      "100% soft cotton fabric",
      "Machine washable and shape-retaining",
      "Quick-dry technology for active wear",
      "Relaxed silhouette for ease of movement",
    ],
    materialJa: "綿100%",
    materialEn: "100% Cotton",
    isNew: true,
    badgeJa: "ONLINE限定",
    badgeEn: "ONLINE ONLY",
    stock: "in",
    rating: 4.5,
    reviewCount: 1842,
  },
  {
    id: "airizm-dress",
    nameKey: "prodAirizmDress",
    nameJa: "エアリズムコットン ワンピース（半袖）",
    nameEn: "AIRism Cotton Short-Sleeve Dress",
    descJa: "肌当たりがやさしく、さらさら快適なワンピースです。エアリズムとコットンを組み合わせた特別な素材で、夏の暑い日も心地よく過ごせます。上品なシルエットで、お出かけにも普段使いにも活躍します。",
    descEn: "Soft on skin, smooth and breathable for warm days. Made from a special blend of AIRism and cotton, this dress keeps you comfortable through the hottest summer days. Its refined silhouette works for both outings and everyday wear.",
    priceJPY: 1990,
    priceUSD: 29.90,
    image: "/images/products/airizm-dress-model.webp",
    images: ["/images/products/airizm-dress-model.webp", "/images/products/airizm-dress-front.webp", "/images/products/airizm-dress-detail.webp", "/images/products/airizm-dress-styled.webp"],
    colors: [
      { label: "ライトブルー", labelEn: "Light Blue", hex: "#90CDF4" },
      { label: "イエロー", labelEn: "Yellow", hex: "#FEFCBF" },
      { label: "ピンク", labelEn: "Pink", hex: "#FEB2B2" },
      { label: "グリーン", labelEn: "Green", hex: "#9AE6B4" },
    ],
    sizes: [
      { label: "XS", available: true },
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: false },
      { label: "XL", available: true },
    ],
    featuresJa: [
      "エアリズムとコットンのブレンド素材",
      "さらさら快適、湿気を素早く発散",
      "UVカット機能付き",
      "A-ラインシルエットで体型を問わず着こなせる",
    ],
    featuresEn: [
      "AIRism and cotton blend fabric",
      "Smooth and breathable, wicks moisture quickly",
      "UV protection built-in",
      "A-line silhouette flatters all body types",
    ],
    materialJa: "綿95% ポリウレタン5%",
    materialEn: "95% Cotton, 5% Polyurethane",
    isNew: false,
    badgeJa: null,
    badgeEn: null,
    stock: "in",
    rating: 4.7,
    reviewCount: 3218,
  },
  {
    id: "linen-pants",
    nameKey: "prodLinenPants",
    nameJa: "リネンブレンド イージーパンツ",
    nameEn: "Linen Blend Easy Pants",
    descJa: "天然素材のリネンをブレンドした夏に最適なパンツ。涼しく、動きやすく、ゆったりとしたイージーシルエットが特徴です。ウエストゴム仕様で着脱もラクラク。リラックスしたデイリースタイルに最適です。",
    descEn: "Natural linen blend for a cool, relaxed summer look. A breezy, easy-wearing silhouette that moves with you. Elastic waistband for effortless on/off. Perfect for a laid-back daily style.",
    priceJPY: 3990,
    priceUSD: 39.90,
    image: "/images/products/linen-pants-model.webp",
    images: ["/images/products/linen-pants-model.webp", "/images/products/linen-pants-front.webp", "/images/products/linen-pants-detail.webp", "/images/products/linen-pants-styled.webp"],
    colors: [
      { label: "サンドベージュ", labelEn: "Sand Beige", hex: "#D4A96A" },
      { label: "ネイビー", labelEn: "Navy", hex: "#2D3748" },
      { label: "ライトグリーン", labelEn: "Light Green", hex: "#68D391" },
    ],
    sizes: [
      { label: "XS", available: true },
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true },
      { label: "XXL", available: true },
    ],
    featuresJa: [
      "天然リネン55%のブレンド素材",
      "通気性が高く夏でも涼しい",
      "ウエスト総ゴム仕様で着脱簡単",
      "シワになりにくい加工済み",
    ],
    featuresEn: [
      "55% natural linen blend fabric",
      "Highly breathable, stays cool in summer",
      "Full elastic waist for easy wear",
      "Wrinkle-resistant finish",
    ],
    materialJa: "麻55% 綿45%",
    materialEn: "55% Linen, 45% Cotton",
    isNew: false,
    badgeJa: null,
    badgeEn: null,
    stock: "low",
    rating: 4.3,
    reviewCount: 987,
  },
  {
    id: "denim-jeans",
    nameKey: "prodDenim",
    nameJa: "バギーバレルレッグジーンズ",
    nameEn: "Baggy Barrel-Leg Jeans",
    descJa: "ゆったりとしたデニムで中間層を魅せる大人のジーンズ。ハイライズのウエストとゆるいシルエットが特徴のバレルレッグカットは、今季最注目のスタイルです。",
    descEn: "A relaxed denim silhouette for a modern urban look. The high-rise waist and loose barrel-leg cut is one of the most on-trend styles this season.",
    priceJPY: 3990,
    priceUSD: 49.90,
    image: "/images/products/denim-jeans-model.webp",
    images: ["/images/products/denim-jeans-model.webp", "/images/products/denim-jeans-front.webp", "/images/products/denim-jeans-detail.webp", "/images/products/denim-jeans-styled.webp"],
    colors: [
      { label: "ミディアムウォッシュ", labelEn: "Medium Wash", hex: "#4A5568" },
      { label: "ライトブルー", labelEn: "Light Blue", hex: "#2B6CB0" },
      { label: "インディゴ", labelEn: "Indigo", hex: "#1A202C" },
    ],
    sizes: [
      { label: "24", available: true },
      { label: "25", available: true },
      { label: "26", available: true },
      { label: "27", available: true },
      { label: "28", available: false },
      { label: "29", available: true },
      { label: "30", available: true },
    ],
    featuresJa: [
      "バレルレッグ（樽型）シルエット",
      "ハイライズデザインで脚長効果",
      "ストレッチ素材で動きやすい",
      "5ポケット仕様",
    ],
    featuresEn: [
      "Barrel-leg silhouette for a trendy look",
      "High-rise design for a leg-lengthening effect",
      "Stretch fabric for ease of movement",
      "5-pocket construction",
    ],
    materialJa: "綿99% ポリウレタン1%",
    materialEn: "99% Cotton, 1% Polyurethane",
    isNew: true,
    badgeJa: "NEW",
    badgeEn: "NEW",
    stock: "in",
    rating: 4.6,
    reviewCount: 2104,
  },
  {
    id: "bra-top",
    nameKey: "prodBraTop",
    nameJa: "ブラトップ（カップ付き）",
    nameEn: "Bra Top (Padded)",
    descJa: "着け心地が良く、すっきりシルエットのインナー。内蔵カップ付きでブラジャー不要。エアリズム素材でさらさらした着心地が続きます。",
    descEn: "Comfortable innerwear with a sleek silhouette. Built-in padded cups eliminate the need for a separate bra. AIRism fabric keeps you feeling smooth and fresh all day.",
    priceJPY: 990,
    priceUSD: 14.90,
    image: "/images/products/bra-top-model.webp",
    images: ["/images/products/bra-top-model.webp", "/images/products/bra-top-front.webp", "/images/products/bra-top-detail.webp", "/images/products/bra-top-styled.webp"],
    colors: [
      { label: "ライトピンク", labelEn: "Light Pink", hex: "#FEB2B2" },
      { label: "ホワイト", labelEn: "White", hex: "#FFFFFF" },
      { label: "ブラック", labelEn: "Black", hex: "#2D3748" },
      { label: "パープル", labelEn: "Purple", hex: "#805AD5" },
    ],
    sizes: [
      { label: "XS", available: true },
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: false },
    ],
    featuresJa: [
      "内蔵カップ付きでブラジャー不要",
      "エアリズム素材でさらさら快適",
      "脇に縫い目なしでスムーズな着心地",
      "洗濯機で洗える",
    ],
    featuresEn: [
      "Built-in padded cups, no bra needed",
      "AIRism fabric for smooth, fresh comfort",
      "Seamless sides for a smooth look",
      "Machine washable",
    ],
    materialJa: "ナイロン87% ポリウレタン13%",
    materialEn: "87% Nylon, 13% Polyurethane",
    isNew: false,
    badgeJa: null,
    badgeEn: null,
    stock: "in",
    rating: 4.8,
    reviewCount: 5621,
  },
  {
    id: "nylon-shorts",
    nameKey: "prodShorts",
    nameJa: "ナイロンショーツ",
    nameEn: "Nylon Shorts",
    descJa: "涼しくて軽く、動きやすい夏のショートパンツ。速乾素材で汗をかいてもすぐに乾き、アクティブなシーンにもリラックスタイムにも最適です。",
    descEn: "Lightweight and breathable shorts for active summer days. Quick-drying fabric wicks away sweat, making them perfect for active pursuits or lounging in style.",
    priceJPY: 2990,
    priceUSD: 34.90,
    image: "/images/products/nylon-shorts-model.webp",
    images: ["/images/products/nylon-shorts-model.webp", "/images/products/nylon-shorts-front.webp", "/images/products/nylon-shorts-detail.webp", "/images/products/nylon-shorts-styled.webp"],
    colors: [
      { label: "カーキグリーン", labelEn: "Khaki Green", hex: "#68D391" },
      { label: "グレー", labelEn: "Gray", hex: "#4A5568" },
      { label: "オレンジ", labelEn: "Orange", hex: "#F6AD55" },
      { label: "コーラルレッド", labelEn: "Coral Red", hex: "#FC8181" },
    ],
    sizes: [
      { label: "XS", available: true },
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: true },
    ],
    featuresJa: [
      "軽量ナイロン素材で涼しい着用感",
      "速乾機能で汗をかいてもすぐ乾く",
      "サイドポケット付き",
      "UPF50+のUVカット機能",
    ],
    featuresEn: [
      "Lightweight nylon for a cool, airy feel",
      "Quick-dry technology keeps you dry",
      "Side pockets for essentials",
      "UPF50+ UV protection",
    ],
    materialJa: "ナイロン100%",
    materialEn: "100% Nylon",
    isNew: false,
    badgeJa: null,
    badgeEn: null,
    stock: "in",
    rating: 4.4,
    reviewCount: 1356,
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}
