"use client"

import { useState } from "react"
import { Calculator, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { DatePicker } from "@/components/date-picker"

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("aur")
  const [goldType, setGoldType] = useState("14K")
  const [goldWeight, setGoldWeight] = useState(1)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [days, setDays] = useState(30)

  const goldPrices = {
    "14K": 230,
    "18K": 290,
    "21K": 320,
    "24K": 380,
  }

  const calculateGoldValue = () => {
    return goldPrices[goldType as keyof typeof goldPrices] * goldWeight
  }

  const calculateCommission = () => {
    let commissionRate = 0.003 // 0.3% implicit

    if (calculateGoldValue() >= 4000 && calculateGoldValue() < 10000) {
      commissionRate = 0.002 // 0.2%
    } else if (calculateGoldValue() >= 10000) {
      commissionRate = 0.001 // 0.1%
    }

    return calculateGoldValue() * commissionRate * days
  }

  const calculateTotal = () => {
    return calculateGoldValue() + calculateCommission()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-600 to-amber-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Serviciile Noastre</h1>
          <p className="text-xl text-center max-w-2xl mx-auto">
            Oferim o gamă completă de servicii de amanetare, evaluare și cumpărare pentru bijuterii, electronice,
            ceasuri și multe altele.
          </p>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="aur" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex justify-center mb-8 bg-transparent overflow-x-auto">
              <TabsTrigger
                value="aur"
                className={`px-6 py-3 mx-2 rounded-md transition-all duration-300 ${
                  activeTab === "aur" ? "bg-amber-500 text-white shadow-lg" : "bg-gray-100 hover:bg-amber-50"
                }`}
              >
                Evaluare Aur
              </TabsTrigger>
              <TabsTrigger
                value="electronice"
                className={`px-6 py-3 mx-2 rounded-md transition-all duration-300 ${
                  activeTab === "electronice" ? "bg-amber-500 text-white shadow-lg" : "bg-gray-100 hover:bg-amber-50"
                }`}
              >
                Evaluare Electronice
              </TabsTrigger>
            </TabsList>

            <TabsContent value="aur" className="animate-in fade-in-50 duration-500">
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6 text-amber-600">Calculator Evaluare Aur</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-2">Prețurile noastre pentru aur</h3>
                      <div className="bg-amber-50 rounded-lg p-4">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-amber-200">
                              <th className="text-left py-2">Puritate</th>
                              <th className="text-right py-2">Preț / gram</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-amber-100">
                              <td className="py-2">Aur 14K</td>
                              <td className="text-right font-medium">230 RON</td>
                            </tr>
                            <tr className="border-b border-amber-100">
                              <td className="py-2">Aur 18K</td>
                              <td className="text-right font-medium">290 RON</td>
                            </tr>
                            <tr className="border-b border-amber-100">
                              <td className="py-2">Aur 21K</td>
                              <td className="text-right font-medium">320 RON</td>
                            </tr>
                            <tr>
                              <td className="py-2">Aur 24K</td>
                              <td className="text-right font-medium">380 RON</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Informații importante</h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>
                          Comisionul se calculează în funcție de suma împrumutată:
                          <ul className="list-disc pl-5 mt-1">
                            <li>50-3999 lei: 0.3% pe zi</li>
                            <li>4000-9999 lei: 0.2% pe zi</li>
                            <li>10000+ lei: 0.1% pe zi</li>
                          </ul>
                        </li>
                        <li>Perioada contractului este de 30 de zile + 5 zile de grație</li>
                        <li>Evaluarea se face gratuit, fără obligații</li>
                        <li>Plata se face pe loc, în numerar</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-4 flex items-center">
                      <Calculator className="h-5 w-5 mr-2 text-amber-500" />
                      Calculator amanetare aur
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Puritate aur</label>
                        <select
                          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-amber-500"
                          value={goldType}
                          onChange={(e) => setGoldType(e.target.value)}
                        >
                          <option value="14K">Aur 14K</option>
                          <option value="18K">Aur 18K</option>
                          <option value="21K">Aur 21K</option>
                          <option value="24K">Aur 24K</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Greutate (grame)</label>
                        <input
                          type="number"
                          min="0.1"
                          step="0.1"
                          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-amber-500"
                          value={goldWeight}
                          onChange={(e) => setGoldWeight(Number.parseFloat(e.target.value) || 0)}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Data amanetării</label>
                        <DatePicker date={selectedDate} setDate={setSelectedDate} />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Perioada (zile)</label>
                        <input
                          type="range"
                          min="5"
                          max="30"
                          step="1"
                          className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
                          value={days}
                          onChange={(e) => setDays(Number.parseInt(e.target.value))}
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>5 zile</span>
                          <span>{days} zile</span>
                          <span>30 zile</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">* Contract pe 30 zile + 5 zile de grație</p>
                      </div>

                      <div className="bg-white rounded-lg p-4 mt-6 border border-amber-200">
                        <div className="flex justify-between mb-2">
                          <span>Valoare evaluată:</span>
                          <span className="font-medium">{calculateGoldValue().toFixed(2)} RON</span>
                        </div>
                        <div className="flex justify-between mb-2 text-amber-600">
                          <span>Comision ({days} zile):</span>
                          <span className="font-medium">+{calculateCommission().toFixed(2)} RON</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-amber-200 text-lg font-bold">
                          <span>Sumă de rambursat:</span>
                          <span className="text-amber-600">{calculateTotal().toFixed(2)} RON</span>
                        </div>
                      </div>

                      <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-md transition-all duration-300 hover:scale-105 mt-4 animate-pulse">
                        Evaluare online mai precisă
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="electronice" className="animate-in fade-in-50 duration-500">
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6 text-amber-600">Evaluare Electronice</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-lg mb-4">
                      La Hope Amanet, evaluăm și amanetăm o gamă largă de produse electronice, inclusiv:
                    </p>

                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <ChevronRight className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Telefoane mobile</h3>
                          <p className="text-gray-600">iPhone, Samsung, Huawei, Xiaomi și alte mărci populare</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Laptopuri și calculatoare</h3>
                          <p className="text-gray-600">MacBook, Dell, HP, Lenovo, ASUS și alte mărci de top</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Tablete</h3>
                          <p className="text-gray-600">iPad, Samsung Galaxy Tab, Huawei și alte modele</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Console de jocuri</h3>
                          <p className="text-gray-600">PlayStation, Xbox, Nintendo și accesorii</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Aparate foto și camere video</h3>
                          <p className="text-gray-600">DSLR, mirrorless, GoPro și alte echipamente foto-video</p>
                        </div>
                      </li>
                    </ul>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Condiții de amanetare</h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>Produsele trebuie să fie funcționale și în stare bună</li>
                        <li>Este necesară prezentarea actului de identitate</li>
                        <li>Evaluarea se face gratuit, pe loc</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <div className="bg-amber-50 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-medium mb-4">Comisioane pentru electronice</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="bg-amber-500 rounded-full h-5 w-5 flex items-center justify-center text-white text-xs mr-3 mt-0.5">
                            ✓
                          </div>
                          <p>50-999 lei: 0.9% pe zi</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-amber-500 rounded-full h-5 w-5 flex items-center justify-center text-white text-xs mr-3 mt-0.5">
                            ✓
                          </div>
                          <p>1000-1999 lei: 0.8% pe zi</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-amber-500 rounded-full h-5 w-5 flex items-center justify-center text-white text-xs mr-3 mt-0.5">
                            ✓
                          </div>
                          <p>2000-2999 lei: 0.7% pe zi</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-amber-500 rounded-full h-5 w-5 flex items-center justify-center text-white text-xs mr-3 mt-0.5">
                            ✓
                          </div>
                          <p>3000-3999 lei: 0.6% pe zi</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-amber-500 rounded-full h-5 w-5 flex items-center justify-center text-white text-xs mr-3 mt-0.5">
                            ✓
                          </div>
                          <p>4000-4999 lei: 0.4% pe zi</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-amber-500 rounded-full h-5 w-5 flex items-center justify-center text-white text-xs mr-3 mt-0.5">
                            ✓
                          </div>
                          <p>Contractele sunt pe maxim 20 de zile + 5 zile de grație</p>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-medium mb-4">Avantajele amanetării electronicelor la Hope Amanet</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="bg-amber-500 rounded-full h-5 w-5 flex items-center justify-center text-white text-xs mr-3 mt-0.5">
                            ✓
                          </div>
                          <p>Evaluare corectă, la prețul pieței</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-amber-500 rounded-full h-5 w-5 flex items-center justify-center text-white text-xs mr-3 mt-0.5">
                            ✓
                          </div>
                          <p>Bani pe loc</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-amber-500 rounded-full h-5 w-5 flex items-center justify-center text-white text-xs mr-3 mt-0.5">
                            ✓
                          </div>
                          <p>Păstrarea în siguranță a produselor</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-amber-500 rounded-full h-5 w-5 flex items-center justify-center text-white text-xs mr-3 mt-0.5">
                            ✓
                          </div>
                          <p>Posibilitatea de prelungire a contractului</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
