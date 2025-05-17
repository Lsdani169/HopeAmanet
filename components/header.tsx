"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, User } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { CartDropdown } from "@/components/cart-dropdown"

export function Header() {
  const [openCart, setOpenCart] = useState(false)

  return (
    <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8Drq1gtU3dMKNJZW3tQ4jjue9zmwwP.png"
                alt="Hope Amanet Logo"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <nav className="hidden md:flex items-center space-x-1">
              <NavItem label="Compania" href="/compania" />
              <Link
                href="/magazin"
                className="px-3 py-2 text-gray-700 hover:text-amber-500 transition-colors duration-300"
              >
                Magazin Online
              </Link>
              <NavItem label="Servicii" href="/servicii" />
            </nav>
          </div>

          {/* Text 3D HOPE AMANET în centru */}
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
            <h1 className="text-3d text-amber-500 font-bold text-2xl">HOPE AMANET</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Cauti ceva?"
                className="pl-3 pr-10 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <CartDropdown openCart={openCart} setOpenCart={setOpenCart} />
            <Link href="/account" className="group">
              <User className="h-6 w-6 text-gray-700 group-hover:text-amber-500 transition-colors duration-300" />
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}

function NavItem({ label, href }: { label: string; href: string }) {
  return (
    <Link href={href} className="px-3 py-2 text-gray-700 hover:text-amber-500 transition-colors duration-300">
      {label}
    </Link>
  )
}
