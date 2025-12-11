"use client"

import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react"

export default function CartPage() {
  const { state, dispatch } = useCart()

  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 10
  const total = subtotal + shipping

  const handleUpdateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch({ type: "REMOVE_FROM_CART", payload: index })
    } else {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id: index, quantity: newQuantity } })
    }
  }

  const handleRemoveItem = (index: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: index })
  }

  if (state.items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <div className="flex justify-center">
                <div className="rounded-full bg-muted p-6">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                </div>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold">Seu carrinho está vazio</h1>
              <p className="text-muted-foreground">Parece que você ainda não adicionou itens ao carrinho.</p>
              <Button size="lg" asChild>
                <Link href="/products">Começar a Comprar</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continuar Comprando
            </Link>
          </Button>

          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">Carrinho de Compras</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {state.items.map((item, index) => (
                <div key={`${item.id}-${item.selectedSize}-${index}`} className="flex gap-4 border rounded-lg p-4">
                  <div className="relative w-24 h-32 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <Link
                            href={`/products/${item.id}`}
                            className="font-medium hover:underline text-base leading-tight"
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1">Tamanho: {item.selectedSize}</p>
                        </div>
                        <p className="font-semibold text-base">${item.price.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => handleUpdateQuantity(index, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => handleUpdateQuantity(index, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remover
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border rounded-lg p-6 sticky top-20 space-y-4">
                <h2 className="font-serif text-xl font-bold">Resumo do Pedido</h2>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Frete</span>
                    <span className="font-medium">{shipping === 0 ? "Grátis" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {subtotal < 100 && subtotal > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Adicione ${(100 - subtotal).toFixed(2)} para frete grátis
                    </p>
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-base font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button size="lg" className="w-full">
                  Finalizar Compra
                </Button>

                <div className="text-xs text-center text-muted-foreground space-y-1">
                  <p>Checkout seguro (simulado)</p>
                  <p>Devoluções grátis em até 30 dias</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
