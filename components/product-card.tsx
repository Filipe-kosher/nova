"use client"

import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/cart-context"

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  return (
    <Link href={`/products/${product.id}`} className={`group product-card block ${className ?? ""}`}>
      <div className="space-y-4">
        <div className="p-[2px] rounded-3xl bg-gradient-to-br from-primary/40 via-accent/30 to-secondary/40 transition-all duration-500 group-hover:from-primary/70 group-hover:to-secondary/70">
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-background shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-1">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
              <div className="absolute -top-24 left-0 w-1/2 h-1/2 rotate-12 bg-white/5 blur-lg" />
            </div>
            <div className="absolute top-4 left-4 glass-effect px-3 py-1 rounded-full text-xs uppercase tracking-widest text-foreground/80">
              {product.category}
            </div>
            <div className="absolute bottom-4 right-4 glass-effect px-3 py-1 rounded-full text-sm font-semibold">
              ${product.price.toFixed(2)}
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all">
              <div className="px-4 py-2 rounded-full bg-background/80 shadow-md text-sm">Ver detalhes</div>
            </div>
          </div>
        </div>
        <div className="space-y-1 px-1">
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
