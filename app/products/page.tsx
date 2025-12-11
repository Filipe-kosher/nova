"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/footer"
import { products } from "@/lib/products-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"

type SortOption = "featured" | "price-low" | "price-high" | "name"
type FilterOption = "all" | "Tops" | "Bottoms" | "Outerwear" | "Footwear"

 

export default function ProductsPage() {
  const [sortBy, setSortBy] = useState<SortOption>("featured")
  const [filterBy, setFilterBy] = useState<FilterOption>("all")

  const categories: FilterOption[] = ["all", "Tops", "Bottoms", "Outerwear", "Footwear"]

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products]

    if (filterBy !== "all") {
      result = result.filter((product) => product.category === filterBy)
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "featured":
      default:
        break
    }

    return result
  }, [sortBy, filterBy])

 

  return (
    <div className="flex min-h-screen flex-col">

      <main className="flex-1">
        <section className="relative overflow-hidden gradient-bg py-16 md:py-20 mb-12">
          <div className="container mx-auto px-4 text-center">
            <div className="page-header mx-auto max-w-4xl space-y-6">
              <h1 className="page-title font-[family-name:var(--font-heading)] text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
                Nossa Coleção
              </h1>
              <p className="text-base md:text-xl text-foreground/70 font-light max-w-2xl mx-auto leading-relaxed">
                Explore nossa seleção curada de peças contemporâneas
              </p>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-xl"></div>
          <div className="section-fade-bottom"></div>
        </section>

        <div className="container mx-auto px-4 pb-16 relative z-10">

          <div className="filters-section relative z-10 mb-12 flex flex-col lg:flex-row gap-6 items-center justify-between p-6 rounded-2xl shadow-lg bg-muted/60 backdrop-blur-md">
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filterBy === category ? "default" : "outline"}
                  size="lg"
                  onClick={() => setFilterBy(category)}
                  className="filter-button capitalize rounded-full min-w-[120px]"
                >
                  {category === "all" ? "Todos" : category}
                </Button>
              ))}
            </div>

            <div className="sort-select flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Ordenar por:</span>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
              <SelectTrigger className="w-[200px] rounded-full bg-background/70">
                <SelectValue />
              </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Destaque</SelectItem>
                  <SelectItem value="price-low">Menor Preço</SelectItem>
                  <SelectItem value="price-high">Maior Preço</SelectItem>
                  <SelectItem value="name">Nome A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredAndSortedProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">Nenhum produto encontrado nesta categoria.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
