"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, ShoppingCart, Star, Truck, Shield, Clock, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { products } from "@/lib/products"
import { useCart } from "@/lib/use-cart"

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("descriere")
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([])
  const [openCart, setOpenCart] = useState(false)
  const [flyingImage, setFlyingImage] = useState<{
    src: string
    top: number
    left: number
    show: boolean
  } | null>(null)

  // Verificăm dacă este produsul Roborock
  const isRoborock = params.id === "999"

  // Găsim produsul în lista de produse sau folosim produsul Roborock
  let product = products.find((p) => p.id.toString() === params.id)

  if (isRoborock) {
    product = {
      id: 999,
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
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Produsul nu a fost găsit</h1>
        <p className="mb-6">Ne pare rău, produsul pe care îl cauți nu există.</p>
        <Button asChild>
          <Link href="/magazin">Înapoi la magazin</Link>
        </Button>
      </div>
    )
  }

  const handleAddToCart = (event: React.MouseEvent) => {
    // Obținem poziția butonului
    const buttonRect = (event.currentTarget as HTMLElement).getBoundingClientRect()

    // Setăm imaginea zburătoare
    setFlyingImage({
      src: product!.image,
      top: buttonRect.top,
      left: buttonRect.left,
      show: true,
    })

    // Adăugăm produsul în coș de mai multe ori, în funcție de cantitate
    for (let i = 0; i < quantity; i++) {
      addToCart(product!)
    }

    // Ascundem imaginea zburătoare după animație
    setTimeout(() => {
      setFlyingImage(null)
      // Deschidem coșul
      setOpenCart(true)
    }, 800)
  }

  const handleBuyNow = (event: React.MouseEvent) => {
    handleAddToCart(event)
    setTimeout(() => {
      router.push("/checkout")
    }, 1000)
  }

  const toggleFaq = (index: number) => {
    setExpandedFaqs((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index)
      } else {
        return [...prev, index]
      }
    })
  }

  const faqs = [
    {
      question: "Care este perioada de garanție?",
      answer: "Toate produsele noastre beneficiază de o garanție de 12 luni de la data achiziției.",
    },
    {
      question: "Cum pot returna produsul?",
      answer:
        "Poți returna produsul în termen de 14 zile de la primire, în ambalajul original și în stare perfectă de funcționare.",
    },
    {
      question: "Cât durează livrarea?",
      answer:
        "Livrarea durează între 1-3 zile lucrătoare, în funcție de adresa de livrare și disponibilitatea curierului.",
    },
    {
      question: "Produsul este sigilat?",
      answer: "Da, produsul este sigilat și vine în ambalajul original al producătorului.",
    },
  ]

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

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 pl-0 text-gray-600 hover:text-amber-500 hover:bg-transparent"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Înapoi
        </Button>

        {/* Breadcrumbs */}
        <div className="flex items-center mb-6 text-sm">
          <Link href="/" className="text-gray-500 hover:text-amber-500 transition-colors">
            Acasă
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/magazin" className="text-gray-500 hover:text-amber-500 transition-colors">
            Magazin
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href={`/magazin/${product.category}`} className="text-gray-500 hover:text-amber-500 transition-colors">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-700 font-medium">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Image */}
            <div className="flex justify-center items-center bg-gray-100 rounded-lg p-4">
              <div className="relative h-80 w-80">
                <Image
                  src={product.image || "/placeholder.svg?height=400&width=400"}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>

              <div className="flex items-center mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <span className="text-gray-500 ml-2">(12 recenzii)</span>
              </div>

              <div className="mb-4">
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div className="flex items-center mb-6">
                <span className="text-3xl font-bold text-amber-600">{product.price} Lei</span>
                {product.oldPrice && (
                  <>
                    <span className="text-lg text-gray-500 line-through ml-2">{product.oldPrice} Lei</span>
                    <span className="ml-2 bg-amber-100 text-amber-800 px-2 py-1 rounded text-sm font-medium">
                      -{product.discount}%
                    </span>
                  </>
                )}
              </div>

              {isRoborock && (
                <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Specificații:</h3>
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
              )}

              <div className="flex items-center mb-6">
                <div className="mr-6">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Cantitate
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      type="button"
                      className="px-3 py-1 text-gray-500 hover:text-amber-500"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                      className="w-12 text-center border-0 focus:ring-0"
                    />
                    <button
                      type="button"
                      className="px-3 py-1 text-gray-500 hover:text-amber-500"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Disponibilitate</label>
                  <div className="text-green-600 font-medium">În stoc</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-amber-500 hover:bg-amber-600 text-white flex-1 py-6" onClick={handleAddToCart}>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Adaugă în coș
                </Button>
                <Button className="bg-gray-800 hover:bg-gray-900 text-white flex-1 py-6" onClick={handleBuyNow}>
                  Cumpără acum
                </Button>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-sm">Livrare rapidă</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-sm">Garanție 12 luni</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-sm">Suport 24/7</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t">
            <div className="flex border-b">
              <button
                className={`px-6 py-3 font-medium text-sm focus:outline-none ${
                  activeTab === "descriere"
                    ? "border-b-2 border-amber-500 text-amber-500"
                    : "text-gray-500 hover:text-amber-500"
                }`}
                onClick={() => setActiveTab("descriere")}
              >
                Descriere
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm focus:outline-none ${
                  activeTab === "specificatii"
                    ? "border-b-2 border-amber-500 text-amber-500"
                    : "text-gray-500 hover:text-amber-500"
                }`}
                onClick={() => setActiveTab("specificatii")}
              >
                Specificații
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm focus:outline-none ${
                  activeTab === "intrebari"
                    ? "border-b-2 border-amber-500 text-amber-500"
                    : "text-gray-500 hover:text-amber-500"
                }`}
                onClick={() => setActiveTab("intrebari")}
              >
                Întrebări frecvente
              </button>
            </div>

            <div className="p-6">
              {activeTab === "descriere" && (
                <div className="prose max-w-none">
                  {isRoborock ? (
                    <>
                      <p>
                        Roborock S6 Max V este un robot aspirator de ultimă generație care combină puterea de curățare
                        cu tehnologia inteligentă de navigare pentru a oferi o experiență de curățare superioară.
                      </p>
                      <p>
                        Echipat cu un sistem de navigare LiDAR și o cameră duală, S6 Max V poate identifica și evita
                        obstacolele din calea sa, asigurând o curățare eficientă și fără întreruperi. Puterea de
                        aspirare de 2500Pa asigură îndepărtarea eficientă a prafului și a murdăriei de pe toate tipurile
                        de suprafețe.
                      </p>
                      <p>
                        Cu o autonomie de până la 180 de minute, acest robot poate curăța suprafețe mari fără a necesita
                        reîncărcare frecventă. Rezervorul de praf de 460ml reduce frecvența golirii, iar rezervorul de
                        apă de 300ml permite spălarea eficientă a podelelor.
                      </p>
                      <p>
                        Controlul prin aplicație îți permite să programezi curățarea, să setezi zone interzise și să
                        monitorizezi progresul curățării de oriunde te-ai afla. Compatibilitatea cu Alexa și Google Home
                        adaugă un plus de confort, permițându-ți să controlezi robotul prin comenzi vocale.
                      </p>
                    </>
                  ) : (
                    <p>{product.description}</p>
                  )}
                </div>
              )}

              {activeTab === "specificatii" && (
                <div className="space-y-4">
                  {isRoborock ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-2">Specificații generale</h3>
                        <ul className="space-y-2">
                          <li className="flex justify-between">
                            <span className="text-gray-600">Model</span>
                            <span className="font-medium">Roborock S6 Max V</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Culoare</span>
                            <span className="font-medium">Negru</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Dimensiuni</span>
                            <span className="font-medium">353 x 350 x 96.5 mm</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Greutate</span>
                            <span className="font-medium">3.6 kg</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Putere</span>
                            <span className="font-medium">66W</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Performanță</h3>
                        <ul className="space-y-2">
                          <li className="flex justify-between">
                            <span className="text-gray-600">Putere de aspirare</span>
                            <span className="font-medium">2500Pa</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Autonomie</span>
                            <span className="font-medium">până la 180 minute</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Capacitate rezervor praf</span>
                            <span className="font-medium">460ml</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Capacitate rezervor apă</span>
                            <span className="font-medium">300ml</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-600">Nivel zgomot</span>
                            <span className="font-medium">67dB</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <p>Nu există specificații detaliate pentru acest produs.</p>
                  )}
                </div>
              )}

              {activeTab === "intrebari" && (
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                      <button
                        className="flex justify-between items-center w-full p-4 text-left font-medium focus:outline-none"
                        onClick={() => toggleFaq(index)}
                      >
                        {faq.question}
                        {expandedFaqs.includes(index) ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                      {expandedFaqs.includes(index) && <div className="p-4 bg-gray-50 border-t">{faq.answer}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
