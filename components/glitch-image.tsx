"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface GlitchImageProps {
  children: React.ReactNode
  className?: string
  intensity?: "low" | "medium" | "high"
}

export default function GlitchImage({ children, className, intensity = "medium" }: GlitchImageProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.9) {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 150 + Math.random() * 200)
      }
    }, 2000)

    return () => clearInterval(glitchInterval)
  }, [])

  const getIntensityClass = () => {
    switch (intensity) {
      case "low":
        return "glitch-effect-low"
      case "medium":
        return "glitch-effect-medium"
      case "high":
        return "glitch-effect-high"
      default:
        return "glitch-effect-medium"
    }
  }

  return (
    <div className={cn("relative overflow-hidden", isGlitching && getIntensityClass(), className)}>
      {children}

      {isGlitching && (
        <>
          <div className="absolute inset-0 bg-red-500/10 mix-blend-screen"></div>
          <div className="absolute inset-0 bg-blue-500/10 mix-blend-screen transform translate-x-1"></div>
        </>
      )}
    </div>
  )
}

