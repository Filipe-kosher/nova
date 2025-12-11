import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk, EB_Garamond } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { CartProvider } from "@/lib/cart-context"
import NavHeader from "@/components/nav/header"
import "./globals.css"
import Script from "next/script"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["400", "500", "600", "700"],
})

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-ebgaramond",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  title: "NOVA - Modern Fashion E-commerce",
  description: "Contemporary fashion with clean, modern design",
  generator: "NOVA",
} 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${ebGaramond.variable}`}>
      <head>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" strategy="beforeInteractive" />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        <CartProvider>
          <NavHeader />
          {children}
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
