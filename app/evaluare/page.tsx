"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calculator } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const goldTypes = [
  { id: "14k", name: "14K (585)", value: 585, pricePerGram: 230 },
  { id: "18k", name: "18K (750)", value: 750, pricePerGram: 290 },
]

export default function EvaluarePage() {
  const [selectedGoldType, setSelectedGoldType] = useState("")
  const [grams, setGrams] = useState<number>(0)
  const [totalValue, setTotalValue] = useState<number>(0)
  const [pricePerGram, setPricePerGram] = useState<number>(0)

  useEffect(() => {
    if (selectedGoldType && grams) {
      const goldType = goldTypes.find((type) => type.id === selectedGoldType)
      if (goldType) {
        setPricePerGram(goldType.pricePerGram)
        setTotalValue(goldType.pricePerGram * grams)
      }
    } else {
      setTotalValue(0)
    }
  }, [selectedGoldType, grams])

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24 evaluare-bg">
      <div className="w-full max-w-4xl content-container">
        <Button asChild variant="ghost" className="mb-6 bg-white/50 hover:bg-white/70">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Înapoi la pagina principală
          </Link>
        </Button>

        <h1 className="text-3xl font-bold mb-6 text-amber-800">Evaluează-ți aurul</h1>

        <Card className="w-full shadow-xl border-amber-300 border-2 bg-white/90">
          <CardHeader className="bg-gradient-to-r from-amber-200 to-yellow-200">
            <CardTitle className="text-amber-800">Calculator valoare aur</CardTitle>
            <CardDescription>Selectează tipul de aur și introdu greutatea pentru a calcula valoarea</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="gold-type">Tipul de aur</Label>
                <Select onValueChange={(value) => setSelectedGoldType(value)}>
                  <SelectTrigger id="gold-type">
                    <SelectValue placeholder="Selectează tipul de aur" />
                  </SelectTrigger>
                  <SelectContent>
                    {goldTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name} - {type.pricePerGram} lei/gram
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="grams">Greutate (grame)</Label>
                <Input
                  id="grams"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Introdu greutatea în grame"
                  onChange={(e) => setGrams(Number.parseFloat(e.target.value) || 0)}
                />
              </div>

              {selectedGoldType && grams > 0 && (
                <div className="bg-amber-100 p-4 rounded-md mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="h-5 w-5 text-amber-700" />
                    <h3 className="font-semibold text-amber-800">Rezultatul evaluării</h3>
                  </div>
                  <p className="text-sm mb-2">
                    Preț per gram: <span className="font-medium">{pricePerGram} lei</span>
                  </p>
                  <p className="text-lg font-bold text-amber-900">Valoare totală: {totalValue.toFixed(2)} lei</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
