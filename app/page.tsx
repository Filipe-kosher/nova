"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { products } from "@/lib/products-data"
import { ProductCard } from "@/components/product-card"

declare global {
  interface Window {
    gsap: any
    ScrollTrigger: any
  }
}

export default function HomePage() {
  const featuredProducts = products.slice(0, 6)
  const floatingImagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap) {
      const gsap = window.gsap
      const ScrollTrigger = window.ScrollTrigger

      gsap.registerPlugin(ScrollTrigger)

      const floatingImages = document.querySelectorAll(".floating-image")
      floatingImages.forEach((img, index) => {
        gsap.to(img, {
          y: -140 - index * 30,
          scrollTrigger: {
            trigger: ".gradient-bg",
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        })
      })
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col">

      <main className="flex-1">
        <section className="hero relative flex min-h-[70vh] items-center justify-center overflow-hidden gradient-bg py-16 md:py-20 mb-12">
          {/* Floating product images */}
          <div ref={floatingImagesRef} className="absolute inset-0 pointer-events-none">
            <div className="floating-image absolute top-[32%] left-[10%] w-28 h-36 rounded-2xl overflow-hidden shadow-2xl">
              <Image src={products[0].image || "/placeholder.svg"} alt="Product" fill className="object-cover" />
            </div>
            <div className="floating-image absolute top-[44%] left-[22%] w-24 h-32 rounded-2xl overflow-hidden shadow-2xl">
              <Image src={products[1].image || "/placeholder.svg"} alt="Product" fill className="object-cover" />
            </div>
            <div className="floating-image absolute top-[58%] left-[34%] w-28 h-36 rounded-2xl overflow-hidden shadow-2xl">
              <Image src={products[2].image || "/placeholder.svg"} alt="Product" fill className="object-cover" />
            </div>
            <div className="floating-image absolute top-[36%] left-[66%] w-24 h-32 rounded-2xl overflow-hidden shadow-2xl">
              <Image src={products[3].image || "/placeholder.svg"} alt="Product" fill className="object-cover" />
            </div>
            <div className="floating-image absolute top-[50%] left-[78%] w-28 h-36 rounded-2xl overflow-hidden shadow-2xl">
              <Image src={products[4].image || "/placeholder.svg"} alt="Product" fill className="object-cover" />
            </div>
            <div className="floating-image absolute top-[62%] left-[90%] w-24 h-32 rounded-2xl overflow-hidden shadow-2xl">
              <Image src={products[5].image || "/placeholder.svg"} alt="Product" fill className="object-cover" />
            </div>
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="mx-auto max-w-4xl space-y-6">
              <h1 className="hero-title font-[family-name:var(--font-heading)] text-5xl md:text-6xl font-bold tracking-tight text-balance leading-[1.1]">
                Moda Contemporânea
                <br />
                <span className="text-primary font-[family-name:var(--font-ebgaramond)] italic">Estilo Moderno</span>
              </h1>
              <p className="hero-subtitle text-base md:text-xl text-foreground/70 text-balance font-light max-w-2xl mx-auto leading-relaxed">
                Descubra coleções exclusivas que combinam design contemporâneo com qualidade excepcional
              </p>
              <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                <Button
                  size="lg"
                  asChild
                  variant="ghost"
                  className="glass-effect min-w-[180px] h-12 text-base rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  <Link href="/products">
                    Explorar Coleção <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-xl"></div>
          <div className="section-fade-bottom"></div>
        </section>

        {/* Featured Products */}
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="section-fade-top"></div>
          <div className="container mx-auto px-4">
            <div className="section-title mb-16">
              <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold mb-4">
                Produtos em Destaque
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl font-light">
                Peças cuidadosamente selecionadas que definem o estilo contemporâneo
              </p>
            </div>

            <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-16 text-center">
              <Button variant="outline" size="lg" asChild className="rounded-full min-w-[200px] h-14 bg-transparent">
                <Link href="/products">Ver Todos os Produtos</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="cta-section py-24 gradient-bg relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5"></div>
          <div className="section-fade-top"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="cta-content mx-auto max-w-3xl text-center space-y-8">
              <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold">
                Eleve Seu Guarda-Roupa
              </h2>
              <p className="text-xl text-foreground/70 font-light leading-relaxed">
                Junte-se à nossa comunidade e descubra coleções exclusivas criadas para quem aprecia qualidade e estilo
                atemporal.
              </p>
              <Button size="lg" asChild className="min-w-[200px] h-14 text-base rounded-full shadow-lg hover:shadow-xl">
                <Link href="/products">Começar a Comprar</Link>
              </Button>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
