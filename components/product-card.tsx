"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/products"

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product, event: React.MouseEvent) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Add animation class to button
    const button = e.currentTarget as HTMLButtonElement
    button.classList.add("animate-add-to-cart")

    // Remove animation class after animation completes
    setTimeout(() => {
      button.classList.remove("animate-add-to-cart")
    }, 500)

    onAddToCart(product, e)
  }

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  return (
    <Link href={`/produs/${product.id}`}>
      <div
        ref={cardRef}
        className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          <div className="aspect-square relative overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg?height=300&width=300"}
              alt={product.name}
              fill
              className={`object-contain transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
            />
          </div>

          {product.discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">-{product.discount}%</Badge>
          )}

          <button
            className={`absolute top-2 right-2 h-8 w-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
              isFavorite ? "bg-red-500 text-white" : "bg-white text-gray-500 hover:bg-gray-100"
            }`}
            onClick={toggleFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{product.name}</h3>

          <div className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              {product.oldPrice ? (
                <>
                  <span className="text-lg font-bold text-amber-600">{product.price} Lei</span>
                  <span className="text-sm text-gray-400 line-through ml-2">{product.oldPrice} Lei</span>
                </>
              ) : (
                <span className="text-lg font-bold text-amber-600">{product.price} Lei</span>
              )}
            </div>

            <Button
              size="sm"
              className="bg-amber-500 hover:bg-amber-600 text-white rounded-full h-9 w-9 p-0"
              onClick={handleAddToCart}
              aria-label="Add to cart"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
