"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { useCart } from "@/lib/use-cart"

export function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    // Verificăm dacă pop-up-ul a fost deja afișat în această sesiune
    const hasSeenPromo = sessionStorage.getItem("hasSeenPromo")

    if (!hasSeenPromo) {
      // Afișăm pop-up-ul după 2 secunde
      const timer = setTimeout(() => {
        setIsOpen(true)
        // Marcăm faptul că utilizatorul a văzut pop-up-ul
        sessionStorage.setItem("hasSeenPromo", "true")
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleAddToCart = () => {
    const product = {
      id: 1,
      name: "Roborock S6 Max V",
      description: "Robot aspirator premium cu funcții avansate de curățare și navigare, sigilat",
      price: 1049,
      oldPrice: 2499,
      discount: 58,
      image: "/images/roborock-max-v6.png",
      category: "electronice",
      inStock: true,
      popularity: 100,
      date: "2024-05-15",
    }

    addToCart(product)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md md:max-w-2xl p-0 bg-white overflow-hidden">
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10">
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 bg-gradient-to-br from-gray-900 to-gray-800 p-6 flex items-center justify-center">
            <div className="relative h-64 w-64 md:h-80 md:w-80">
              <Image src="/images/roborock-max-v6.png" alt="Roborock S6 Max V" fill className="object-contain" />
            </div>
          </div>

          <div className="md:w-1/2 p-6 md:p-8">
            <div className="bg-red-100 text-red-800 px-4 py-2 rounded-md text-sm font-medium mb-4">
              Ofertă limitată!
            </div>

            <h3 className="text-2xl font-bold mb-2">Roborock S6 Max V</h3>
            <div className="flex items-center mb-4">
              <span className="text-3xl font-bold text-amber-600">1049 Lei</span>
              <span className="text-lg text-gray-500 line-through ml-2">2499 Lei</span>
              <span className="ml-2 bg-amber-100 text-amber-800 px-2 py-1 rounded text-sm font-medium">-58%</span>
            </div>

            <div className="space-y-3 mb-6">
              <h4 className="font-medium">Specificații:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <div className="bg-amber-500 rounded-full h-5 w-5 flex items-center justify-center text-white text-xs mr-2 mt-0.5">
                    ✓
                  </div>
                  <span>Putere de aspirare: 2500Pa</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-amber-500 rounded-full h-5 w-5 flex items-center justify-center text-white text-xs mr-2 mt-0.5">
                    ✓
                  </div>
                  <span>Navigare LiDAR + cameră duală</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-amber-500 rounded-full h-5 w-5 flex items-center justify-center text-white text-xs mr-2 mt-0.5">
                    ✓
                  </div>
                  <span>Autonomie: până la 180 minute</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-amber-500 rounded-full h-5 w-5 flex items-center justify-center text-white text-xs mr-2 mt-0.5">
                    ✓
                  </div>
                  <span>Capacitate rezervor: 460ml</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-amber-500 rounded-full h-5 w-5 flex items-center justify-center text-white text-xs mr-2 mt-0.5">
                    ✓
                  </div>
                  <span>Control prin aplicație, compatibil cu Alexa și Google Home</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleAddToCart}
                className="bg-amber-500 hover:bg-amber-600 text-white flex-1 animate-pulse"
              >
                Adaugă în coș
              </Button>
              <Button asChild variant="outline" className="flex-1 border-amber-500 text-amber-500 hover:bg-amber-50">
                <Link href="/produs/1">Vezi detalii</Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
