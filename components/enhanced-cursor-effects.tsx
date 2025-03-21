"use client"

import { useState, useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import CursorBikeTrail from "@/components/cursor-bike-trail"

interface EnhancedCursorEffectsProps {
  trailIntensity?: "low" | "medium" | "high"
  trailLength?: number
  showGlitchEffect?: boolean
}

export default function EnhancedCursorEffects({
  trailIntensity = "medium",
  trailLength = 10,
  showGlitchEffect = true,
}: EnhancedCursorEffectsProps) {
  const [isHovering, setIsHovering] = useState<string | null>(null)
  const [glitchActive, setGlitchActive] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 1000, damping: 100 })
  const springY = useSpring(mouseY, { stiffness: 1000, damping: 100 })

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement
      const isButton = target.closest("button") !== null
      const isLink = target.closest("a") !== null
      const isInput = target.closest("input, textarea, select") !== null

      if (isButton) {
        setIsHovering("button")
      } else if (isLink) {
        setIsHovering("link")
      } else if (isInput) {
        setIsHovering("input")
      } else {
        setIsHovering(null)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mouseX, mouseY])

  // Random glitch effect
  useEffect(() => {
    if (!showGlitchEffect) return

    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 150)
      }
    }, 2000)

    return () => clearInterval(glitchInterval)
  }, [showGlitchEffect])

  return (
    <>
      <CursorBikeTrail intensity={trailIntensity} trailLength={trailLength} />

      {/* Custom cursor for interactive elements */}
      {isHovering && (
        <motion.div
          className="fixed pointer-events-none z-50 flex items-center justify-center"
          style={{
            x: springX,
            y: springY,
            width: isHovering === "button" ? 80 : 60,
            height: isHovering === "button" ? 80 : 60,
            opacity: 0.8,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: glitchActive ? [1, 1.1, 0.9, 1] : 1,
          }}
          transition={{
            duration: 0.2,
          }}
        >
          <div className="relative">
            {/* Outer ring */}
            <div
              className={`absolute inset-0 rounded-full border-2 ${isHovering === "button" ? "border-red-500" : "border-blue-500"}`}
              style={{
                boxShadow:
                  isHovering === "button" ? "0 0 10px rgba(239, 68, 68, 0.7)" : "0 0 10px rgba(59, 130, 246, 0.7)",
              }}
            ></div>

            {/* Inner dot */}
            <div
              className={`absolute top-1/2 left-1/2 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 ${isHovering === "button" ? "bg-red-500" : "bg-blue-500"}`}
              style={{
                boxShadow:
                  isHovering === "button" ? "0 0 5px rgba(239, 68, 68, 0.7)" : "0 0 5px rgba(59, 130, 246, 0.7)",
              }}
            ></div>

            {/* Technical readout */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-mono">
              <span className={isHovering === "button" ? "text-red-400" : "text-blue-400"}>
                {isHovering === "button" ? "INTERACT.READY" : isHovering === "link" ? "LINK.ACTIVE" : "INPUT.READY"}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}

