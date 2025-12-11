"use client"

import { use, useState } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { products } from "@/lib/products-data"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Check } from "lucide-react"

 

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const productId = Number.parseInt(resolvedParams.id)
  const product = products.find((p) => p.id === productId)
  const { dispatch } = useCart()
  const { toast } = useToast()
  const [selectedSize, setSelectedSize] = useState<string>("")

 

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Selecione um tamanho",
        description: "Escolha um tamanho antes de adicionar ao carrinho",
        variant: "destructive",
      })
      return
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: { product, size: selectedSize },
    })

    toast({
      title: "Adicionado ao carrinho",
      description: `${product.name} (${selectedSize}) foi adicionado ao seu carrinho`,
    })
  }

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="flex min-h-screen flex-col">

      <main className="flex-1 bg-background relative z-10">
        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* Back Button */}
          <Button variant="ghost" size="lg" asChild className="mb-8 rounded-full">
            <Link href="/products">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Voltar aos Produtos
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Product Image */}
            <div className="product-image relative aspect-[3/4] overflow-hidden rounded-3xl bg-background shadow-2xl">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>

            {/* Product Info */}
            <div className="product-info flex flex-col space-y-8">
              <div>
                <p className="text-sm text-primary uppercase tracking-widest font-bold mb-3">{product.category}</p>
                <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold mb-6">
                  {product.name}
                </h1>
                <p className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
              </div>

              <div>
                <p className="text-foreground/70 leading-relaxed text-lg">{product.description}</p>
              </div>

              {/* Size Selection */}
              <div className="space-y-4">
                <label className="text-base font-semibold">Selecione o Tamanho</label>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      size="lg"
                      onClick={() => setSelectedSize(size)}
                      className="min-w-[70px] rounded-full relative"
                    >
                      {size}
                      {selectedSize === size && <Check className="ml-2 h-4 w-4" />}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                size="lg"
                onClick={handleAddToCart}
                className="w-full h-14 text-base rounded-full shadow-lg hover:shadow-xl"
              >
                Adicionar ao Carrinho
              </Button>

              {/* Product Details */}
              <div className="border-t pt-8 space-y-6 text-sm">
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg mb-3">
                    Detalhes do Produto
                  </h3>
                  <ul className="space-y-2 text-foreground/70">
                    <li>Materiais de qualidade premium</li>
                    <li>Construção cuidadosamente elaborada</li>
                    <li>Design para estilo duradouro</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg mb-3">
                    Envio e Devoluções
                  </h3>
                  <ul className="space-y-2 text-foreground/70">
                    <li>Frete grátis em pedidos acima de $100</li>
                    <li>Política de devolução de 30 dias</li>
                    <li>Envio em 2-3 dias úteis</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold mb-10">
                Você Também Pode Gostar
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/products/${relatedProduct.id}`}
                    className="related-product group"
                  >
                    <div className="space-y-4">
                      <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-background shadow-lg group-hover:shadow-2xl transition-all duration-300">
                        <Image
                          src={relatedProduct.image || "/placeholder.svg"}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="space-y-2 px-2">
                        <h3 className="font-[family-name:var(--font-heading)] font-semibold group-hover:text-primary transition-colors">
                          {relatedProduct.name}
                        </h3>
                        <p className="text-sm font-bold text-primary">${relatedProduct.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
