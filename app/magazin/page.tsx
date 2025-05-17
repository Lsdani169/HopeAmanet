"use client"

import type React from "react"

import { useState } from "react"
import { Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"
import { useCart } from "@/lib/use-cart"
import Image from "next/image"
import type { Product } from "@/lib/types" // Import the Product type

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("toate")
  const [sortBy, setSortBy] = useState("popular")
  const [searchQuery, setSearchQuery] = useState("")
  const { addToCart } = useCart()
  const [openCart, setOpenCart] = useState(false)
  const [flyingImage, setFlyingImage] = useState<{
    src: string
    top: number
    left: number
    show: boolean
  } | null>(null)

  const categories = [
    { id: "toate", name: "Toate produsele" },
    { id: "telefoane", name: "Telefoane" },
    { id: "laptopuri", name: "Laptopuri" },
    { id: "tablete", name: "Tablete" },
    { id: "accesorii", name: "Accesorii" },
    { id: "electronice", name: "Electronice" },
  ]

  const filteredProducts = products.filter((product) => {
    if (activeCategory !== "toate" && product.category !== activeCategory) {
      return false
    }

    if (searchQuery) {
      return (
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "pret-crescator") {
      return a.price - b.price
    } else if (sortBy === "pret-descrescator") {
      return b.price - a.price
    } else if (sortBy === "noi") {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
    // Default: popular
    return b.popularity - a.popularity
  })

  const handleAddToCart = (product: Product, event: React.MouseEvent) => {
    // Obținem poziția butonului
    const buttonRect = (event.currentTarget as HTMLElement).getBoundingClientRect()

    // Setăm imaginea zburătoare
    setFlyingImage({
      src: product.image,
      top: buttonRect.top,
      left: buttonRect.left,
      show: true,
    })

    // Adăugăm produsul în coș
    addToCart(product)

    // Ascundem imaginea zburătoare după animație
    setTimeout(() => {
      setFlyingImage(null)
      // Deschidem coșul
      setOpenCart(true)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Flying Image Animation */}
      {flyingImage && flyingImage.show && (
        <div
          className="add-to-cart-animation fixed"
          style={{
            top: flyingImage.top,
            left: flyingImage.left,
          }}
        >
          <div className="h-16 w-16 relative">
            <Image src={flyingImage.src || "/placeholder.svg"} alt="Product" fill className="object-contain" />
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-600 to-amber-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Magazin Online</h1>
          <p className="text-xl text-center max-w-2xl mx-auto">
            Descoperă o gamă variată de produse verificate și cu garanție la cele mai bune prețuri.
          </p>
        </div>
      </section>

      {/* Shop Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filtrează produsele
                </h2>

                <div className="mb-6">
                  <h3 className="font-medium mb-2">Categorii</h3>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <button
                          className={`w-full text-left px-2 py-1 rounded-md transition-colors duration-300 ${
                            activeCategory === category.id
                              ? "bg-amber-100 text-amber-700 font-medium"
                              : "hover:bg-gray-100"
                          }`}
                          onClick={() => setActiveCategory(category.id)}
                        >
                          {category.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-2">Sortează după</h3>
                  <select
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="popular">Popularitate</option>
                    <option value="pret-crescator">Preț: crescător</option>
                    <option value="pret-descrescator">Preț: descrescător</option>
                    <option value="noi">Cele mai noi</option>
                  </select>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-2">Caută</h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Caută produse..."
                      className="w-full border border-gray-300 rounded-md p-2 pl-10 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="md:w-3/4">
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  {activeCategory === "toate"
                    ? "Toate produsele"
                    : categories.find((c) => c.id === activeCategory)?.name}
                </h2>
                <p className="text-gray-600">{sortedProducts.length} produse</p>
              </div>

              {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">Nu am găsit produse care să corespundă criteriilor tale.</p>
                  <Button
                    className="mt-4 bg-amber-500 hover:bg-amber-600 text-white"
                    onClick={() => {
                      setActiveCategory("toate")
                      setSearchQuery("")
                    }}
                  >
                    Resetează filtrele
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
