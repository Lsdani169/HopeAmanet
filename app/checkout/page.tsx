"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/lib/use-cart"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    county: "",
    postalCode: "",
    paymentMethod: "ramburs",
  })
  const [step, setStep] = useState(1)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Generăm un număr de comandă aleatoriu
    const randomOrderNumber =
      "CMD" +
      Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0")
    setOrderNumber(randomOrderNumber)

    // Simulăm procesarea comenzii
    setOrderComplete(true)

    // Golim coșul după finalizarea comenzii
    clearCart()
  }

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 text-center">
            <h1 className="text-2xl font-bold mb-4">Coșul tău este gol</h1>
            <p className="text-gray-600 mb-6">Nu ai niciun produs în coșul de cumpărături.</p>
            <Button asChild>
              <Link href="/magazin">Înapoi la magazin</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">Mulțumim pentru comandă!</h1>
            <p className="text-gray-600 mb-4">
              Comanda ta cu numărul <span className="font-medium">{orderNumber}</span> a fost plasată cu succes.
            </p>
            <p className="text-gray-600 mb-6">Vei primi în curând un email cu detaliile comenzii tale.</p>
            <Button asChild>
              <Link href="/">Înapoi la pagina principală</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Coșul tău</h1>
                <Button variant="ghost" className="text-gray-500" onClick={() => router.back()}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Înapoi
                </Button>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.id}-${Math.random()}`} className="flex items-center border-b pb-4">
                    <div className="w-20 h-20 relative flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg?height=80&width=80"}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.description.substring(0, 60)}...</p>
                      <div className="flex items-center mt-2">
                        <span className="font-medium text-amber-600">{item.price} Lei</span>
                        {item.oldPrice && (
                          <span className="text-sm text-gray-400 line-through ml-2">{item.oldPrice} Lei</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center ml-4">
                      <button
                        className="text-gray-500 hover:text-amber-500 px-2"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        className="text-gray-500 hover:text-amber-500 px-2"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                      <button className="ml-4 text-red-500 hover:text-red-600" onClick={() => removeFromCart(item.id)}>
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {step === 2 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Detalii comandă</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Informații personale</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nume complet</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Adresa de livrare</h3>

                    <div className="space-y-2">
                      <Label htmlFor="address">Adresa</Label>
                      <Textarea id="address" name="address" value={formData.address} onChange={handleChange} required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">Oraș</Label>
                        <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="county">Județ</Label>
                        <Input id="county" name="county" value={formData.county} onChange={handleChange} required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Cod poștal</Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Metodă de plată</h3>

                    <RadioGroup value={formData.paymentMethod} onValueChange={handleRadioChange} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ramburs" id="ramburs" />
                        <Label htmlFor="ramburs">Plată la livrare (ramburs)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card">Card bancar online</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="transfer" id="transfer" />
                        <Label htmlFor="transfer">Transfer bancar</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3">
                    Finalizează comanda
                  </Button>
                </form>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Sumar comandă</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{totalPrice.toFixed(2)} Lei</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transport</span>
                  <span>15.00 Lei</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-amber-600">{(totalPrice + 15).toFixed(2)} Lei</span>
                </div>
              </div>

              {step === 1 ? (
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3" onClick={() => setStep(2)}>
                  Continuă către detalii comandă
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-full border-amber-500 text-amber-500 hover:bg-amber-50 py-3 mt-4"
                  onClick={() => setStep(1)}
                >
                  Înapoi la coș
                </Button>
              )}

              <div className="mt-6 space-y-4">
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-amber-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">Plată securizată</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-amber-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">Acceptăm toate cardurile</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-amber-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">Livrare în 24-48 ore</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
