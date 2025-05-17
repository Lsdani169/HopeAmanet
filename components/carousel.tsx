"use client"

import type React from "react"

interface CarouselProps {
  children: React.ReactNode
}

export function Carousel({ children }: CarouselProps) {
  return <div className="carousel">{children}</div>
}
