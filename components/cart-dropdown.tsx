"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, X, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/use-cart"

interface CartDropdownProps {
  openCart: boolean
  setOpenCart: (open: boolean) => void
}

export function CartDropdown({ openCart, setOpenCart }: CartDropdownProps) {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart()
  const cartRef = useRef<HTMLDivElement>(null)
  const cartIconRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Adăugăm un event listener pentru click-uri în afara dropdown-ului
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target as Node) &&
        cartIconRef.current &&
        !cartIconRef.current.contains(event.target as Node)
      ) {
        setOpenCart(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [setOpenCart])

  useEffect(() => {
    if (openCart && cartIconRef.current) {
      cartIconRef.current.classList.add("cart-bounce")
      setTimeout(() => {
        if (cartIconRef.current) {
          cartIconRef.current.classList.remove("cart-bounce")
        }
      }, 500)
    }
  }, [openCart])

  return (
    <div className="relative">
      <button
        ref={cartIconRef}
        className="flex items-center text-gray-700 hover:text-amber-500 transition-colors duration-300"
        onClick={() => setOpenCart(!openCart)}
      >
        <ShoppingCart className="h-6 w-6" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {openCart && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setOpenCart(false)} />
          <div ref={cartRef} className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Coșul tău ({totalItems})</h3>
                <button className="text-gray-400 hover:text-gray-600" onClick={() => setOpenCart(false)}>
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {items.length === 0 ? (
                <div className="p-4 text-center text-gray-500">Coșul tău este gol</div>
              ) : (
                <div className="divide-y">
                  {items.map((item) => (
                    <div key={`${item.id}-${Math.random()}`} className="p-4">
                      <div className="flex items-start">
                        <div className="w-16 h-16 relative flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg?height=64&width=64"}
                            alt={item.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <h4 className="text-sm font-medium">{item.name}</h4>
                          <div className="flex items-center mt-1">
                            <span className="text-sm font-medium text-amber-600">{item.price} Lei</span>
                          </div>
                          <div className="flex items-center mt-2">
                            <button
                              className="text-gray-500 hover:text-amber-500 p-1 border border-gray-200 rounded-l-md"
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-3 py-1 border-t border-b border-gray-200">{item.quantity}</span>
                            <button
                              className="text-gray-500 hover:text-amber-500 p-1 border border-gray-200 rounded-r-md"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                            <button
                              className="ml-auto text-gray-400 hover:text-red-500"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 border-t">
              <div className="flex justify-between mb-4">
                <span>Total:</span>
                <span className="font-bold">{totalPrice.toFixed(2)} Lei</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button asChild variant="outline" className="w-full" onClick={() => setOpenCart(false)}>
                  <Link href="/checkout">Vezi coșul</Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white"
                  onClick={() => setOpenCart(false)}
                  disabled={items.length === 0}
                >
                  <Link href="/checkout">Checkout</Link>
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
