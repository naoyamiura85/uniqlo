import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductDetail from "@/components/product-detail"
import { getProductById, products } from "@/lib/products"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const product = getProductById(id)
  if (!product) return {}
  return {
    title: `${product.nameJa} | UNIQLO`,
    description: product.descJa,
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params
  const product = getProductById(id)
  if (!product) notFound()

  const related = products.filter((p) => p.id !== id).slice(0, 6)

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FFFFFF" }}>
      <Header />
      <main className="flex-1">
        <ProductDetail product={product} relatedProducts={related} />
      </main>
      <Footer />
    </div>
  )
}
