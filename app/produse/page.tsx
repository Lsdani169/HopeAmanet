"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ShoppingCart, Rotate3D, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const products = [
  {
    id: 1,
    name: "ROBOROCK S6 MAX V",
    description: "Aspirator robot inteligent cu navigație LiDAR, mop integrat și recunoaștere de obiecte",
    price: 1049,
    oldPrice: 2223,
    image: "/roborock-s6-maxv.png",
    featured: true,
    badge: "Nou",
    category: "Aspiratoare Robot",
  },
  {
    id: 2,
    name: "Samsung S25",
    description: "Smartphone nou, sigilat, cu performanțe de top și cameră profesională",
    price: 2900,
    image: "/samsung-s25.png",
    category: "Telefoane",
    specs: ["128GB stocare", "12GB RAM", "Procesor Snapdragon 8 Gen 3", "Cameră 200MP", "Nou, sigilat"],
    badge: "Sigilat",
  },
  {
    id: 3,
    name: "MACBOOK AIR 15",
    description: "MacBook Air 15 inch, model A3114, nou sigilat, cu performanțe excepționale",
    price: 5700,
    image: "/macbook-air-15.png",
    category: "Laptopuri",
    specs: ["Procesor M3", "8GB RAM", "10-core GPU", "SSD rapid", "Nou, sigilat"],
    badge: "Sigilat",
  },
]

export default function ProdusePage() {
  const [rotate, setRotate] = useState(false)
  const featuredProduct = products.find((product) => product.featured)
  const regularProducts = products.filter((product) => !product.featured)

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24 produse-bg">
      <div className="w-full max-w-6xl content-container">
        <Button asChild variant="ghost" className="mb-6 bg-white/50 hover:bg-white/70">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Înapoi la pagina principală
          </Link>
        </Button>

        <h1 className="text-3xl font-bold mb-2 text-amber-800">Catalog Produse</h1>
        <p className="text-lg mb-8 text-gray-600">Explorați gama noastră de produse la prețuri avantajoase</p>

        {/* Featured Product with 3D effect */}
        {featuredProduct && (
          <div className="mb-12 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-amber-800">Produs Recomandat</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative">
                <div
                  className={`relative w-full h-[300px] transition-transform duration-700 transform ${
                    rotate ? "rotate-y-180" : ""
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                    transform: rotate ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  <div className="absolute w-full h-full backface-hidden">
                    <Image
                      src={featuredProduct.image || "/placeholder.svg"}
                      alt={featuredProduct.name}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                  <div
                    className="absolute w-full h-full backface-hidden bg-amber-100 rounded-lg flex items-center justify-center p-6"
                    style={{ transform: "rotateY(180deg)" }}
                  >
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-2">Specificații tehnice</h3>
                      <ul className="text-left space-y-2">
                        <li>• Putere de aspirare: 2500Pa</li>
                        <li>• Autonomie: 180 minute</li>
                        <li>• Capacitate rezervor: 460ml</li>
                        <li>• Navigație LiDAR + cameră</li>
                        <li>• Control prin aplicație</li>
                        <li>• Funcție de mop</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute bottom-2 right-2 bg-white/80"
                  onClick={() => setRotate(!rotate)}
                >
                  {rotate ? <Info className="h-4 w-4 mr-1" /> : <Rotate3D className="h-4 w-4 mr-1" />}
                  {rotate ? "Imagine" : "Specificații"}
                </Button>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <Badge className="bg-amber-500">{featuredProduct.badge}</Badge>
                  <span className="ml-2 text-sm text-gray-500">{featuredProduct.category}</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">ROBOROCK S6 MAX V</h3>
                <p className="mb-4 text-gray-600">{featuredProduct.description}</p>
                <div className="flex items-center mb-4">
                  <span className="text-3xl font-bold text-amber-600">{featuredProduct.price.toFixed(2)} Lei</span>
                  {featuredProduct.oldPrice && (
                    <span className="ml-2 text-lg text-gray-400 line-through">
                      {featuredProduct.oldPrice.toFixed(2)} Lei
                    </span>
                  )}
                </div>
                <Button className="bg-amber-600 hover:bg-amber-700">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Adaugă în coș
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Product Catalog */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {regularProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white/90">
              <div className="relative h-64 bg-gray-100">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                />
                {product.badge && <Badge className="absolute top-3 right-3 bg-green-600">{product.badge}</Badge>}
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <span className="text-sm text-gray-500">{product.category}</span>
                </div>
                <CardDescription className="text-base">{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-3">
                  <h4 className="font-semibold text-gray-700 mb-2">Specificații:</h4>
                  <ul className="space-y-1">
                    {product.specs?.map((spec, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <span className="mr-2 text-amber-500">•</span> {spec}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-2xl font-bold text-amber-600 mt-3">{product.price.toFixed(2)} Lei</div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-amber-600 hover:bg-amber-700">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Adaugă în coș
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
