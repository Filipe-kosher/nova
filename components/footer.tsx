import Link from "next/link"

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <span className="font-[family-name:var(--font-heading)] text-lg font-semibold">NOVA</span>
          </div>
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/">Home</Link>
            <Link href="/products">Produtos</Link>
            <Link href="/cart">Carrinho</Link>
          </nav>
          <div className="text-xs text-muted-foreground">© {year} NOVA</div>
        </div>
      </div>
    </footer>
  )
}
