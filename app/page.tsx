"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Phone, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"
import { useCart } from "@/lib/use-cart"
import type { Product } from "@/lib/products"

export default function Home() {
  const [activeTab, setActiveTab] = useState("aur")
  const [showPhoneNumber, setShowPhoneNumber] = useState(false)
  const { addToCart } = useCart()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [goldWeight, setGoldWeight] = useState(1)
  const [goldType, setGoldType] = useState("14K")
  const [openCart, setOpenCart] = useState(false)
  const [flyingImage, setFlyingImage] = useState<{
    src: string
    top: number
    left: number
    show: boolean
  } | null>(null)

  const slides = [
    {
      id: 1,
      title: "Amanetăm telefoane, laptopuri și TV-uri",
      description:
        "Obține bani pe loc pentru dispozitivele tale electronice. Evaluare gratuită și corectă, fără costuri ascunse. Acceptăm toate mărcile populare de telefoane, laptopuri și televizoare.",
      buttonText: "Evaluează acum",
      buttonLink: "/servicii/electronice",
      image: "/images/phones.png",
      bgColor: "bg-gradient-to-r from-gray-800 to-gray-900",
    },
    {
      id: 2,
      title: "Evaluăm aur la cele mai bune prețuri",
      description:
        "Primești până la 270 RON/gr pentru aurul tău. Evaluare gratuită, plată pe loc și cele mai avantajoase condiții de amanetare pentru bijuteriile tale.",
      buttonText: "Vezi serviciile noastre",
      buttonLink: "/servicii",
      image: "/images/gold.png",
      bgColor: "bg-gradient-to-r from-amber-600 to-amber-800",
    },
    {
      id: 3,
      title: "Schimb valutar cu 0% comision",
      description:
        "Oferim cele mai bune rate pentru Euro, Dolari, Lire și Franci. Fără comision, fără costuri ascunse, doar cursuri avantajoase pentru tine.",
      buttonText: "Vezi cursul zilei",
      buttonLink: "/servicii/schimb-valutar",
      image: "/images/exchange.png",
      bgColor: "bg-gradient-to-r from-blue-700 to-blue-900",
    },
  ]

  const goldPrices = {
    "14K": 230,
    "18K": 290,
    "21K": 320,
    "24K": 380,
  }

  const calculateGoldValue = () => {
    return goldPrices[goldType as keyof typeof goldPrices] * goldWeight
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(timer)
  }, [currentSlide])

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
    <div className="min-h-screen bg-white">
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

      {/* Hero Banner Carousel */}
      <section className="relative bg-gray-100 animate-fade-in">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={slide.id} className={`min-w-full ${slide.bgColor}`}>
                <div className="container mx-auto px-4 py-12">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-6 md:mb-0 text-white">
                      <h1 className="text-3xl md:text-4xl font-bold mb-4">{slide.title}</h1>
                      <p className="text-lg md:text-xl mb-6">{slide.description}</p>
                      <Button
                        className="bg-white text-gray-800 hover:bg-gray-100 px-6 py-2 rounded-md transition-transform duration-300 hover:scale-105"
                        asChild
                      >
                        <Link href={slide.buttonLink}>{slide.buttonText}</Link>
                      </Button>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                      <div className="relative h-64 md:h-80 w-full max-w-md">
                        <Image
                          src={slide.image || "/placeholder.svg"}
                          alt="Banner image"
                          fill
                          className="object-contain rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <Button
            variant="outline"
            className="rounded-full h-10 w-10 p-0 border-gray-300 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:scale-110"
            onClick={prevSlide}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <Button
            variant="outline"
            className="rounded-full h-10 w-10 p-0 border-gray-300 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:scale-110"
            onClick={nextSlide}
          >
            <span className="sr-only">Next</span>
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? "w-8 bg-white" : "w-2 bg-white/50"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Evaluation Section */}
      <section className="py-12 animate-slide-up">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Evaluează, amanetează sau vinde bunurile de valoare
          </h2>

          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 mb-8 md:mb-0">
              <Tabs defaultValue="aur" className="w-full" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="flex flex-col space-y-2 bg-transparent">
                  <TabsTrigger
                    value="aur"
                    className={`justify-start px-4 py-3 border rounded-md transition-all duration-300 ${
                      activeTab === "aur" ? "bg-amber-500 text-white shadow-lg scale-105" : "bg-white hover:bg-amber-50"
                    }`}
                  >
                    Evaluare aur
                  </TabsTrigger>
                  <TabsTrigger
                    value="electronice"
                    className={`justify-start px-4 py-3 border rounded-md transition-all duration-300 ${
                      activeTab === "electronice"
                        ? "bg-amber-500 text-white shadow-lg scale-105"
                        : "bg-white hover:bg-amber-50"
                    }`}
                  >
                    Evaluare electronice
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="md:w-2/3 md:pl-8">
              <div className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold mb-4">Evaluare aproximativă a produsului</h3>

                {activeTab === "aur" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Puritate</label>
                        <select
                          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-amber-500"
                          value={goldType}
                          onChange={(e) => setGoldType(e.target.value)}
                        >
                          <option value="14K">14K</option>
                          <option value="18K">18K</option>
                          <option value="21K">21K</option>
                          <option value="24K">24K</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Greutate (grame)</label>
                        <input
                          type="number"
                          min="0.1"
                          step="0.1"
                          value={goldWeight}
                          onChange={(e) => setGoldWeight(Number.parseFloat(e.target.value))}
                          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                    </div>

                    <div className="text-center py-4">
                      <p className="text-4xl font-bold text-gray-800 mb-2">{calculateGoldValue()} RON</p>
                      <p className="text-gray-500">Valoare estimată</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Comision: {(calculateGoldValue() * 0.003).toFixed(2)} RON (0.3%)
                      </p>
                    </div>
                  </div>
                )}

                {activeTab !== "aur" && (
                  <div className="text-center py-8">
                    <p className="text-4xl font-bold text-gray-800 mb-2">Evaluare gratuită</p>
                    <p className="text-gray-500">Vino în magazin pentru o evaluare precisă</p>
                  </div>
                )}

                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-md transition-transform duration-300 hover:scale-105 mt-4">
                  Evaluare online mai precisă
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 animate-slide-up" style={{ animationDelay: "400ms" }}>
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Produse recomandate</h2>
          <p className="text-center text-gray-600 mb-10">Descoperă cele mai noi produse din magazinul nostru</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              asChild
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-md transition-transform duration-300 hover:scale-105"
            >
              <Link href="/magazin">Vezi toate produsele</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Floating Contact Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Programează o evaluare</h3>
          <p className="mb-4">
            Pentru o evaluare mai precisă a produselor electronice, te invităm să vizitezi unul dintre punctele noastre
            de lucru sau să ne contactezi pentru mai multe informații.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className="bg-amber-500 hover:bg-amber-600 text-white flex-1"
              onClick={() => (window.location.href = "/compania#locatii")}
            >
              Găsește un punct de lucru
            </Button>
            <Button
              className="bg-gray-700 hover:bg-gray-800 text-white flex-1 flex items-center justify-center gap-2"
              onClick={() => window.open("tel:0770168387")}
            >
              <Phone className="h-4 w-4" /> 0770 168 387
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
