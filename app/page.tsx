import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24 home-bg">
      {/* Floating background elements */}
      <div className="floating-elements">
        <div className="floating-element euro">€</div>
        <div className="floating-element dollar">$</div>
        <div className="floating-element pound">£</div>
        <div className="floating-element gold-coin"></div>
        <div className="floating-element gold-bar"></div>
        <div className="floating-element phone"></div>
        <div className="floating-element smartphone"></div>
      </div>

      <div className="flex flex-col items-center justify-center gap-8 w-full max-w-5xl content-container">
        {/* Logo Section */}
        <div className="w-full flex justify-center mb-12 md:mb-24 bg-black rounded-full p-8 shadow-xl">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images.jpg-jawI1j8sudIGk9WNzOrrIySChHg84R.jpeg"
              alt="Hope Amanet Logo"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* Buttons Section */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <Button
            asChild
            size="lg"
            className="h-16 text-lg bg-amber-600 hover:bg-amber-700 text-white shadow-md transition-transform hover:scale-105"
          >
            <Link href="/evaluare">Evaluează-ți aurul</Link>
          </Button>

          <Button
            asChild
            size="lg"
            className="h-16 text-lg bg-amber-600 hover:bg-amber-700 text-white shadow-md transition-transform hover:scale-105"
          >
            <Link href="/produse">Produse</Link>
          </Button>

          <Button
            asChild
            size="lg"
            className="h-16 text-lg bg-amber-600 hover:bg-amber-700 text-white shadow-md transition-transform hover:scale-105"
          >
            <Link href="/exchange">Exchange</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
