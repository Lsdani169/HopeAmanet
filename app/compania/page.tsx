"use client"

import { useState } from "react"
import Image from "next/image"
import { MapPin, Phone, Clock } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const locations = [
  {
    id: "p1",
    name: "HOPE AMANET P1",
    address: "Șoseaua Alexandriei 20, București",
    phone: "0770 168 522",
    hours: "Deschis non stop",
    mapUrl: "https://maps.google.com/?q=Șoseaua+Alexandriei+20+București",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xrnOKeIGZfiB5mbdOBiCCt0jMzyGQt.png", // A doua imagine pentru P1
  },
  {
    id: "p2",
    name: "HOPE AMANET P2",
    address: "Calea Rahovei 305, București",
    phone: "0770 166 384",
    hours: "Deschis non stop",
    mapUrl: "https://maps.google.com/?q=Calea+Rahovei+305+București",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5lhKiS2qmelEVTFTuN9Z9GUlxxyTwi.png", // Prima imagine pentru P2
  },
  {
    id: "p3",
    name: "HOPE AMANET P3",
    address: "Calea Crângași nr 12, București",
    phone: "0770 168 515",
    hours: "Deschis non stop",
    mapUrl: "https://maps.google.com/?q=Calea+Crângași+12+București",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DuZCU3CnuCcdkgOipACrwLl6OZgeIf.png", // Poza de la P12
  },
  {
    id: "p4",
    name: "HOPE AMANET P4",
    address: "Piața Gării de Nord nr 2, București",
    phone: "0770 168 387",
    hours: "Deschis non stop",
    mapUrl: "https://maps.google.com/?q=Piața+Gării+de+Nord+2+București",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2yHw6l2mtjG8uyOb8VCHGW7ucm5j7e.png", // Poza de la P11
  },
  {
    id: "p5",
    name: "HOPE AMANET P5",
    address: "Șoseaua Pantelimon nr 311, București",
    phone: "0770 169 703",
    hours: "Deschis non stop",
    mapUrl: "https://maps.google.com/?q=Șoseaua+Pantelimon+311+București",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WhFUw5nrI2YE4Txdtut0yaRoh5pxfi.png", // Poza de la P10
  },
  {
    id: "p6",
    name: "HOPE AMANET P6",
    address: "Șoseaua Giurgiului 188B, București",
    phone: "021 451 0894",
    hours: "Deschis non stop",
    mapUrl: "https://maps.google.com/?q=Șoseaua+Giurgiului+188B+București",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Niu04N4TVuO3hDj7vXBzRzUqmpUDIq.png", // Poza de la P9
  },
  {
    id: "p7",
    name: "HOPE AMANET P7",
    address: "Bulevardul Iuliu Maniu nr 67, București",
    phone: "0770 168 023",
    hours: "Deschis non stop",
    mapUrl: "https://maps.google.com/?q=Bulevardul+Iuliu+Maniu+67+București",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wZVbpXwnlerfCgw4iZhNLyOb0NLF9z.png", // Poza de la P8
  },
  {
    id: "p8",
    name: "HOPE AMANET P8",
    address: "Strada Brașov nr 24, București",
    phone: "0770 167 338",
    hours: "Deschis non stop",
    mapUrl: "https://maps.google.com/?q=Strada+Brașov+24+București",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-E0chmuiAQHpisf7BktAJ9uzuPZMJjK.png", // Poza de la P7
  },
  {
    id: "p9",
    name: "HOPE AMANET P9",
    address: "Calea Rahovei 291, București",
    phone: "0770 169 463",
    hours: "Luni-Vineri: 09:00-21:00, Sâmbătă: 10:00-17:00, Duminică: 10:00-16:00",
    mapUrl: "https://maps.google.com/?q=Calea+Rahovei+291+București",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BRrQjCvtJlBEW7k55i1LY92860WVtT.png", // Poza de la P6
  },
  {
    id: "p10",
    name: "HOPE AMANET P10",
    address: "Strada Mărgeanului 95A, București",
    phone: "0770 166 859",
    hours: "Deschis non stop",
    mapUrl: "https://maps.google.com/?q=Strada+Mărgeanului+95A+București",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9wQfeBcyjEMe6aFxLpFabcW6ONPNk5.png", // Poza de la P5
  },
  {
    id: "p11",
    name: "HOPE AMANET P11",
    address: "Șoseaua Pantelimon nr 254, București",
    phone: "0770 168 927",
    hours: "Deschis non stop",
    mapUrl: "https://maps.google.com/?q=Șoseaua+Pantelimon+254+București",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3hKooYuseJebGcMegCsss0XTA9cuzh.png", // Poza de la P4
  },
  {
    id: "p12",
    name: "HOPE AMANET P12",
    address: "Bulevardul Iuliu Maniu nr 57, București",
    phone: "0770 167 462",
    hours: "Luni-Vineri: 09:00-21:00, Sâmbătă: 10:00-17:00, Duminică: 10:00-16:00",
    mapUrl: "https://maps.google.com/?q=Bulevardul+Iuliu+Maniu+57+București",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-STAdUak6TcaVF9XB0i9BzJWD5bp3rX.png", // Poza de la P3
  },
]

export default function CompanyPage() {
  const [activeTab, setActiveTab] = useState("despre")

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-600 to-amber-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Hope Amanet</h1>
              <p className="text-xl mb-6">
                Cu o experiență de peste 10 ani în domeniu, Hope Amanet oferă servicii de amanetare, cumpărare și
                vânzare de bijuterii din aur, electronice, ceasuri de lux și multe altele.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8Drq1gtU3dMKNJZW3tQ4jjue9zmwwP.png"
                alt="Hope Amanet Logo"
                width={300}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="despre" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex justify-center mb-8 bg-transparent">
              <TabsTrigger
                value="despre"
                className={`px-6 py-3 mx-2 rounded-md transition-all duration-300 ${
                  activeTab === "despre" ? "bg-amber-500 text-white shadow-lg" : "bg-gray-100 hover:bg-amber-50"
                }`}
              >
                Despre noi
              </TabsTrigger>
              <TabsTrigger
                value="locatii"
                className={`px-6 py-3 mx-2 rounded-md transition-all duration-300 ${
                  activeTab === "locatii" ? "bg-amber-500 text-white shadow-lg" : "bg-gray-100 hover:bg-amber-50"
                }`}
              >
                Locațiile noastre
              </TabsTrigger>
              <TabsTrigger
                value="istoric"
                className={`px-6 py-3 mx-2 rounded-md transition-all duration-300 ${
                  activeTab === "istoric" ? "bg-amber-500 text-white shadow-lg" : "bg-gray-100 hover:bg-amber-50"
                }`}
              >
                Istoric
              </TabsTrigger>
            </TabsList>

            <TabsContent value="despre" className="animate-in fade-in-50 duration-500">
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                <h2 className="text-3xl font-bold mb-6 text-amber-600">Despre Hope Amanet</h2>
                <div className="space-y-6">
                  <p className="text-lg">
                    Hope Amanet este o rețea de case de amanet cu o prezență puternică în București, oferind servicii de
                    înaltă calitate pentru clienții noștri de peste un deceniu.
                  </p>
                  <p className="text-lg">
                    Ne-am construit reputația pe baza încrederii, transparenței și a evaluărilor corecte. La Hope
                    Amanet, înțelegem valoarea bunurilor dumneavoastră și oferim cele mai bune prețuri pentru aur,
                    bijuterii, electronice, ceasuri de lux și multe altele.
                  </p>
                  <p className="text-lg">
                    Echipa noastră de experți evaluatori are pregătirea necesară pentru a oferi estimări precise pentru
                    o gamă largă de produse, asigurându-vă că primiți întotdeauna o ofertă corectă.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-amber-50 p-6 rounded-lg text-center">
                      <h3 className="text-xl font-bold mb-2 text-amber-600">Misiunea noastră</h3>
                      <p>
                        Să oferim servicii de amanetare transparente și evaluări corecte pentru toți clienții noștri.
                      </p>
                    </div>
                    <div className="bg-amber-50 p-6 rounded-lg text-center">
                      <h3 className="text-xl font-bold mb-2 text-amber-600">Viziunea noastră</h3>
                      <p>
                        Să devenim liderul pieței de amanet din România, cunoscuți pentru integritate și servicii de
                        calitate.
                      </p>
                    </div>
                    <div className="bg-amber-50 p-6 rounded-lg text-center">
                      <h3 className="text-xl font-bold mb-2 text-amber-600">Valorile noastre</h3>
                      <p>Integritate, respect, profesionalism și orientare către client în tot ceea ce facem.</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="locatii" className="animate-in fade-in-50 duration-500" id="locatii">
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                <h2 className="text-3xl font-bold mb-6 text-amber-600">Locațiile Hope Amanet</h2>
                <p className="text-lg mb-8">
                  Rețeaua noastră cuprinde 12 puncte de lucru în București, acoperind toate sectoarele pentru a fi mereu
                  aproape de dumneavoastră.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {locations.map((location) => (
                    <div
                      key={location.id}
                      className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-in"
                      style={{ animationDelay: `${Number.parseInt(location.id.replace("p", "")) * 100}ms` }}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={location.image || "/placeholder.svg"}
                          alt={location.name}
                          fill
                          className="object-cover object-center"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-bold mb-2 text-amber-600">{location.name}</h3>
                        <div className="space-y-2 text-gray-700">
                          <div className="flex items-start">
                            <MapPin className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                            <p>{location.address}</p>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-5 w-5 text-amber-500 mr-2" />
                            <a
                              href={`tel:${location.phone}`}
                              className="hover:text-amber-600 transition-colors duration-300"
                            >
                              {location.phone}
                            </a>
                          </div>
                          <div className="flex items-start">
                            <Clock className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                            <p>{location.hours}</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <a
                            href={location.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-600 hover:text-amber-700 font-medium transition-colors duration-300"
                          >
                            Vezi pe hartă →
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="istoric" className="animate-in fade-in-50 duration-500">
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                <h2 className="text-3xl font-bold mb-6 text-amber-600">Istoricul Hope Amanet</h2>
                <div className="space-y-8">
                  <div className="flex">
                    <div className="flex-shrink-0 w-24 text-center">
                      <div className="bg-amber-500 text-white rounded-full h-12 w-12 flex items-center justify-center mx-auto">
                        2010
                      </div>
                      <div className="h-full border-r-2 border-amber-300 mx-auto mt-2"></div>
                    </div>
                    <div className="flex-grow pl-6">
                      <h3 className="text-xl font-bold mb-2">Înființarea companiei</h3>
                      <p className="text-gray-700">
                        Hope Amanet a fost înființată cu primul punct de lucru în sectorul 3 din București, oferind
                        servicii de amanetare pentru bijuterii din aur.
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0 w-24 text-center">
                      <div className="bg-amber-500 text-white rounded-full h-12 w-12 flex items-center justify-center mx-auto">
                        2013
                      </div>
                      <div className="h-full border-r-2 border-amber-300 mx-auto mt-2"></div>
                    </div>
                    <div className="flex-grow pl-6">
                      <h3 className="text-xl font-bold mb-2">Extinderea serviciilor</h3>
                      <p className="text-gray-700">
                        Am extins gama de servicii pentru a include amanetarea de electronice, ceasuri de lux și am
                        deschis încă două puncte de lucru în București.
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0 w-24 text-center">
                      <div className="bg-amber-500 text-white rounded-full h-12 w-12 flex items-center justify-center mx-auto">
                        2016
                      </div>
                      <div className="h-full border-r-2 border-amber-300 mx-auto mt-2"></div>
                    </div>
                    <div className="flex-grow pl-6">
                      <h3 className="text-xl font-bold mb-2">Lansarea magazinului online</h3>
                      <p className="text-gray-700">
                        Am lansat platforma online pentru a oferi clienților noștri posibilitatea de a cumpăra produse
                        direct de pe site-ul nostru.
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0 w-24 text-center">
                      <div className="bg-amber-500 text-white rounded-full h-12 w-12 flex items-center justify-center mx-auto">
                        2020
                      </div>
                      <div className="h-full border-r-2 border-amber-300 mx-auto mt-2"></div>
                    </div>
                    <div className="flex-grow pl-6">
                      <h3 className="text-xl font-bold mb-2">Rețea completă în București</h3>
                      <p className="text-gray-700">
                        Am ajuns la 10 puncte de lucru, acoperind toate sectoarele din București pentru a fi cât mai
                        aproape de clienții noștri.
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0 w-24 text-center">
                      <div className="bg-amber-500 text-white rounded-full h-12 w-12 flex items-center justify-center mx-auto">
                        2023
                      </div>
                    </div>
                    <div className="flex-grow pl-6">
                      <h3 className="text-xl font-bold mb-2">Inovație și dezvoltare</h3>
                      <p className="text-gray-700">
                        Am implementat un sistem modern de evaluare online și am lansat aplicația mobilă pentru o
                        experiență îmbunătățită a clienților noștri.
                      </p>
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
