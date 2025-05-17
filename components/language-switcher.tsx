"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState("ro")
  const router = useRouter()

  const switchLanguage = (lang: string) => {
    setCurrentLang(lang)
    // Aici ar trebui să implementezi logica pentru schimbarea limbii
    // De exemplu, setarea unui cookie sau a unei valori în localStorage
    // și apoi reîncărcarea paginii sau navigarea către versiunea în limba respectivă
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        className={`font-medium transition-all duration-300 px-1 ${
          currentLang === "ro" ? "text-amber-500 border-b-2 border-amber-500" : "text-gray-500 hover:text-amber-500"
        }`}
        onClick={() => switchLanguage("ro")}
      >
        RO
      </button>
      <button
        className={`font-medium transition-all duration-300 px-1 ${
          currentLang === "en" ? "text-amber-500 border-b-2 border-amber-500" : "text-gray-500 hover:text-amber-500"
        }`}
        onClick={() => switchLanguage("en")}
      >
        ENG
      </button>
    </div>
  )
}
