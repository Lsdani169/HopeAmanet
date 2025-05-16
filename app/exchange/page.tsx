import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const exchangeRates = [
  { currency: "Euro", buyRate: 5.03, sellRate: 5.42, flag: "🇪🇺" },
  { currency: "Dolar", buyRate: 4.45, sellRate: 4.58, flag: "🇺🇸" },
  { currency: "Liră", buyRate: 5.85, sellRate: 6.02, flag: "🇬🇧" },
  { currency: "Franc", buyRate: 5.3, sellRate: 5.42, flag: "🇨🇭" },
]

export default function ExchangePage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24 exchange-bg">
      <div className="w-full max-w-4xl content-container">
        <Button asChild variant="ghost" className="mb-6 bg-white/50 hover:bg-white/70">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Înapoi la pagina principală
          </Link>
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-amber-800">EXCHANGE</h1>
          <p className="text-xl font-semibold text-green-600 mt-2">0% COMISION</p>
        </div>

        <div className="rounded-xl overflow-hidden shadow-2xl border-2 border-amber-300 bg-white/90">
          <div className="bg-gradient-to-r from-amber-500 to-amber-400 p-4 text-white">
            <h2 className="text-xl font-bold text-center">Cursuri Valutare</h2>
          </div>
          <Table>
            <TableCaption className="text-amber-700 font-medium">
              Cursuri valutare actualizate astăzi | Fără comision
            </TableCaption>
            <TableHeader className="bg-gradient-to-r from-amber-200 to-amber-100">
              <TableRow>
                <TableHead className="w-[150px] text-lg font-bold text-amber-900 py-4">Monedă</TableHead>
                <TableHead className="text-right text-lg font-bold text-green-700 py-4">Cumpărare</TableHead>
                <TableHead className="text-right text-lg font-bold text-amber-900 py-4">Vânzare</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exchangeRates.map((rate, index) => (
                <TableRow
                  key={rate.currency}
                  className={`
                    hover:bg-amber-50 transition-colors duration-150
                    ${index % 2 === 0 ? "bg-white" : "bg-amber-50/50"}
                  `}
                >
                  <TableCell className="font-medium text-base py-4 border-b border-amber-100">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{rate.flag}</span>
                      <span className="font-semibold text-gray-800">{rate.currency}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-bold text-green-600 text-lg py-4 border-b border-amber-100">
                    <div className="flex items-center justify-end gap-1">
                      <span>{rate.buyRate.toFixed(2)}</span>
                      <span className="text-sm font-normal text-green-500">LEI</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-bold text-amber-600 text-lg py-4 border-b border-amber-100">
                    <div className="text-right">
                      <span className="font-bold">
                        {rate.currency === "Euro" ? "5.42" : rate.sellRate.toFixed(2)}
                        <span className="ml-1 font-normal">LEI</span>
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-8 p-6 bg-white/80 rounded-lg border border-amber-200 shadow-md">
          <h2 className="text-xl font-semibold text-amber-800 mb-4">Servicii de schimb valutar</h2>
          <p className="mb-2">Oferim servicii de schimb valutar la cele mai avantajoase cursuri, fără comision.</p>
          <p className="flex items-center gap-2">
            <span className="font-medium">Ne găsiți pe:</span> Strada Piața Gării de Nord nr. 2,{" "}
            <span className="font-semibold text-amber-700">HOPE AMANET EXCHANGE</span>
          </p>
          <p className="mt-2 flex items-center">
            <span className="mr-2">Căutați-ne pe Waze:</span>
            <span className="inline-flex items-center bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <path d="M22 9.5a9.96 9.96 0 0 0-3.6-6.3 10.1 10.1 0 0 0-13.4.3A9.96 9.96 0 0 0 2 9.5c0 1.7.5 3.3 1.3 4.7l1.6 2.4a11 11 0 0 0 3.4 3.4l.4.2c.4.2.8.2 1.2.2.4 0 .8 0 1.2-.2l.4-.2a11 11 0 0 0 3.4-3.4l1.6-2.4c.8-1.4 1.3-3 1.3-4.7z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              HOPE AMANET EXCHANGE
            </span>
          </p>
        </div>
      </div>
    </main>
  )
}
