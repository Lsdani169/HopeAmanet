"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft } from "lucide-react"

interface CheckoutFormProps {
  onSubmit: (data: any) => void
  total: number
}

export function CheckoutForm({ onSubmit, total }: CheckoutFormProps) {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="max-w-2xl mx-auto bg-gray-900 bg-opacity-80 p-6 rounded-lg backdrop-blur-sm border border-gray-700 shadow-xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" className="p-0 mr-2" onClick={() => window.history.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-semibold">Finalizare comandă</h2>
      </div>

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
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
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
              <Input id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
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

        <div className="border-t pt-4">
          <div className="flex justify-between mb-4">
            <span className="font-medium">Total de plată:</span>
            <span className="font-bold text-xl">{total} Lei</span>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-glow"
          >
            Plasează comanda
          </Button>
        </div>
      </form>
    </div>
  )
}
