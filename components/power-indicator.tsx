"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface PowerIndicatorProps {
  active?: boolean
  className?: string
  pulseSpeed?: "slow" | "medium" | "fast"
}

export default function PowerIndicator({ active = true, className, pulseSpeed = "medium" }: PowerIndicatorProps) {
  const [isOn, setIsOn] = useState(active)

  useEffect(() => {
    if (!active) return

    // Determine interval based on pulse speed
    const interval = pulseSpeed === "slow" ? 2000 : pulseSpeed === "fast" ? 500 : 1000

    const timer = setInterval(() => {
      setIsOn((prev) => !prev)
    }, interval)

    return () => clearInterval(timer)
  }, [active, pulseSpeed])

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "w-4 h-4 rounded-full transition-all duration-300",
          isOn ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.7)]" : "bg-gray-800",
        )}
      ></div>
    </div>
  )
}

