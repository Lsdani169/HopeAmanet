import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "./animations.css"
import { CartProvider } from "@/lib/use-cart"
import { PromoPopup } from "@/components/promo-popup"
import { Header } from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hope Amanet - Servicii de amanetare și cumpărare",
  description: "Servicii de amanetare pentru bijuterii din aur, electronice, ceasuri și multe altele",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ro">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          {children}
          <PromoPopup />
        </CartProvider>
      </body>
    </html>
  )
}
