"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface BikeTrailProps {
  className?: string
  position?: "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right"
  size?: "sm" | "md" | "lg"
  intensity?: "low" | "medium" | "high"
}

export default function BikeTrail({
  className,
  position = "right",
  size = "md",
  intensity = "medium",
}: BikeTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Determine size classes
  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "w-32 h-32 md:w-48 md:h-48"
      case "lg":
        return "w-64 h-64 md:w-96 md:h-96"
      default:
        return "w-48 h-48 md:w-64 md:h-64"
    }
  }

  // Determine position classes
  const getPositionClass = () => {
    switch (position) {
      case "left":
        return "-left-16 top-1/2 -translate-y-1/2"
      case "right":
        return "-right-16 top-1/2 -translate-y-1/2"
      case "top":
        return "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
      case "bottom":
        return "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
      case "top-left":
        return "-top-16 -left-16"
      case "top-right":
        return "-top-16 -right-16"
      case "bottom-left":
        return "-bottom-16 -left-16"
      case "bottom-right":
        return "-bottom-16 -right-16"
      default:
        return "-right-16 top-1/2 -translate-y-1/2"
    }
  }

  // Determine intensity
  const getIntensityClass = () => {
    switch (intensity) {
      case "low":
        return "opacity-30"
      case "high":
        return "opacity-70"
      default:
        return "opacity-50"
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute z-0 pointer-events-none",
        getSizeClass(),
        getPositionClass(),
        getIntensityClass(),
        className,
      )}
    >
      {/* Main glow effect */}
      <div className="absolute inset-0 bg-red-600 blur-3xl rounded-full animate-pulse"></div>

      {/* Bike trail effect */}
      <div className="absolute inset-0">
        {/* Multiple trail lines with different animations */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 bg-red-500 rounded-full"
            style={{
              top: `${20 + i * 15}%`,
              left: 0,
              right: 0,
              boxShadow: "0 0 15px 5px rgba(239, 68, 68, 0.7)",
              opacity: 0.7 - i * 0.1,
            }}
            animate={{
              scaleX: [0.3, 1, 0.3],
              x: ["-10%", "10%", "-10%"],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Pulsing center */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
          animate={{
            opacity: [1, 0.5, 1],
            boxShadow: [
              "0 0 20px 10px rgba(255, 255, 255, 0.8)",
              "0 0 40px 20px rgba(255, 255, 255, 0.4)",
              "0 0 20px 10px rgba(255, 255, 255, 0.8)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Particle effects */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-red-400 rounded-full"
            style={{
              top: "50%",
              left: "50%",
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 100],
              y: [0, (Math.random() - 0.5) * 100],
              opacity: [1, 0],
            }}
            transition={{
              duration: 1 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: Math.random() * 2,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </div>
  )
}

