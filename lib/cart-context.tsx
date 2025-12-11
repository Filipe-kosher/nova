"use client"

import type React from "react"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"

export interface Product {
  id: number
  name: string
  price: number
  category: string
  image: string
  description: string
  sizes: string[]
}

export interface CartItem extends Product {
  quantity: number
  selectedSize: string
}

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: { product: Product; size: string } }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.product.id && item.selectedSize === action.payload.size,
      )

      if (existingItemIndex > -1) {
        const newItems = [...state.items]
        newItems[existingItemIndex].quantity += 1
        return { ...state, items: newItems }
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            ...action.payload.product,
            quantity: 1,
            selectedSize: action.payload.size,
          },
        ],
      }
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item, index) => index !== action.payload),
      }

    case "UPDATE_QUANTITY": {
      const newItems = state.items.map((item, index) =>
        index === action.payload.id ? { ...item, quantity: Math.max(0, action.payload.quantity) } : item,
      )
      return {
        ...state,
        items: newItems.filter((item) => item.quantity > 0),
      }
    }

    case "CLEAR_CART":
      return { ...state, items: [] }

    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    { items: [] },
    (initial) => {
      if (typeof window === "undefined") return initial
      try {
        const raw = localStorage.getItem("cart")
        if (!raw) return initial
        const parsed = JSON.parse(raw)
        if (!Array.isArray(parsed)) return initial
        return { items: parsed }
      } catch {
        return initial
      }
    },
  )

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(state.items))
    } catch {}
  }, [state.items])

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}
