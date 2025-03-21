"use client"

import type React from "react"

import { useState, useEffect, useRef, memo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AkiraButtonProps {
  children: React.ReactNode
  href?: string
  variant?: "primary" | "secondary" | "danger" | "icon"
  className?: string
  target?: string
  onClick?: () => void
  disabled?: boolean
  size?: "sm" | "md" | "lg"
}

const AkiraButton = memo(function AkiraButton({
  children,
  href,
  variant = "primary",
  className,
  target,
  onClick,
  disabled = false,
  size = "md",
}: AkiraButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)
  const [dataFlowActive, setDataFlowActive] = useState(false)
  const [powerLevel] = useState(Math.floor(Math.random() * 30) + 70)
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)

  // Random glitch effect
  useEffect(() => {
    if (isHovered) {
      // Activate data flow
      setDataFlowActive(true)

      // Random glitch effect
      const glitchInterval = setInterval(() => {
        if (Math.random() > 0.7) {
          setGlitchActive(true)
          setTimeout(() => setGlitchActive(false), 150)
        }
      }, 1000)

      return () => {
        clearInterval(glitchInterval)
        setDataFlowActive(false)
      }
    }
  }, [isHovered])

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          base: "bg-gradient-to-r from-red-900 to-red-700 text-white",
          hover: "from-red-800 to-red-600",
          border: "border-red-500",
          glow: "rgba(239,68,68,0.6)",
          text: "text-white",
          highlight: "bg-red-400/20",
          accent: "bg-red-500",
        }
      case "secondary":
        return {
          base: "bg-gradient-to-r from-gray-900 to-gray-800 text-red-400",
          hover: "from-gray-800 to-gray-700",
          border: "border-red-900/50",
          glow: "rgba(239,68,68,0.3)",
          text: "text-red-400",
          highlight: "bg-red-400/10",
          accent: "bg-red-900",
        }
      case "danger":
        return {
          base: "bg-gradient-to-r from-red-900 to-black text-red-400",
          hover: "from-red-800 to-gray-900",
          border: "border-red-700",
          glow: "rgba(239,68,68,0.4)",
          text: "text-red-400",
          highlight: "bg-red-400/10",
          accent: "bg-red-700",
        }
      case "icon":
        return {
          base: "bg-black text-red-400",
          hover: "bg-red-900/20",
          border: "border-red-900/50",
          glow: "rgba(239,68,68,0.3)",
          text: "text-red-400",
          highlight: "bg-red-400/10",
          accent: "bg-red-900",
        }
      default:
        return {
          base: "bg-gradient-to-r from-red-900 to-red-700 text-white",
          hover: "from-red-800 to-red-600",
          border: "border-red-500",
          glow: "rgba(239,68,68,0.6)",
          text: "text-white",
          highlight: "bg-red-400/20",
          accent: "bg-red-500",
        }
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return variant === "icon" ? "w-8 h-8" : "px-3 py-1.5 text-sm"
      case "lg":
        return variant === "icon" ? "w-12 h-12" : "px-8 py-4 text-lg"
      default:
        return variant === "icon" ? "w-10 h-10" : "px-6 py-3"
    }
  }

  const styles = getVariantStyles()
  const sizeClasses = getSizeClasses()

  // Create asymmetrical clip path inspired by Akira interfaces
  // This creates an irregular shape with aggressive angles
  const clipPath =
    variant === "icon"
      ? "polygon(0% 20%, 20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%)"
      : "polygon(0% 30%, 15% 0%, 85% 0%, 100% 30%, 95% 100%, 5% 100%)"

  const buttonClasses = cn(
    "relative overflow-hidden transition-all duration-300 flex items-center justify-center",
    styles.text,
    disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105",
    sizeClasses,
    className,
  )

  const ButtonContent = () => (
    <>
      {/* Button shape with clip path */}
      <div className="absolute inset-0 z-0" style={{ clipPath }}>
        <div
          className={cn(
            "absolute inset-0 transition-all duration-300",
            styles.base,
            isHovered && !disabled && styles.hover,
          )}
        ></div>

        {/* Top highlight */}
        <div className="absolute top-0 left-[15%] right-[15%] h-[1px] bg-white/30"></div>

        {/* Left highlight */}
        <div className="absolute top-[30%] left-0 bottom-0 w-[1px] bg-white/30 transform-gpu"></div>

        {/* Bottom shadow */}
        <div className="absolute bottom-0 left-[5%] right-[5%] h-[1px] bg-black/50"></div>

        {/* Right shadow */}
        <div className="absolute top-[30%] right-0 bottom-0 w-[1px] bg-black/50 transform-gpu"></div>

        {/* Corner accents */}
        <div className="absolute top-0 left-[15%] w-3 h-3 border-t-2 border-l-2 border-red-500/70"></div>
        <div className="absolute top-0 right-[15%] w-3 h-3 border-t-2 border-r-2 border-red-500/70"></div>

        {/* Diagonal accent line */}
        <div className="absolute top-0 right-[15%] w-8 h-[2px] bg-red-400 rotate-45 translate-y-1 translate-x-2"></div>

        {/* Technical readout */}
        <div className="absolute top-1 right-[20%] text-[6px] font-mono text-red-300/70 leading-[6px]">
          SYS:OK
          <br />
          PWR:{powerLevel}%
        </div>

        {/* Circuit pattern background */}
        <div className="absolute inset-0 circuit-pattern opacity-10"></div>

        {/* Data flow animation */}
        {dataFlowActive && !disabled && (
          <>
            <motion.div
              className="absolute h-[1px] bg-red-400/70 z-10"
              style={{ width: 10, top: "30%", left: -10 }}
              animate={{ left: "100%" }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.div
              className="absolute h-[1px] bg-red-400/70 z-10"
              style={{ width: 20, top: "60%", left: -20 }}
              animate={{ left: "100%" }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: 0.5 }}
            />
            <motion.div
              className="absolute h-[1px] bg-blue-400/70 z-10"
              style={{ width: 15, top: "80%", left: -15 }}
              animate={{ left: "100%" }}
              transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: 0.8 }}
            />
          </>
        )}

        {/* Pulsing border effect */}
        {isHovered && !disabled && (
          <div className="absolute inset-0 border-2 border-red-500/0 animate-[pulse_2s_infinite]"></div>
        )}

        {/* Energy particles */}
        {isHovered && !disabled && (
          <>
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-red-400 rounded-full z-20"
                initial={{
                  x: "50%",
                  y: "50%",
                  opacity: 0,
                }}
                animate={{
                  x: ["50%", `${50 + (Math.random() * 40 - 20)}%`],
                  y: ["50%", `${50 + (Math.random() * 40 - 20)}%`],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1 + Math.random(),
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: Math.random() * 0.5,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* Button content */}
      <div
        className={cn(
          "relative z-10 flex items-center justify-center",
          variant === "icon" ? "" : "px-2",
          glitchActive && "animate-[glitch-low_0.2s_ease]",
        )}
      >
        {children}
      </div>

      {/* Hover/press effects */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-200",
          styles.highlight,
          isHovered && !disabled && "opacity-100",
          isPressed && !disabled && "opacity-70",
        )}
        style={{ clipPath }}
      ></div>

      {/* Glow effect */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 transition-all duration-300",
          isHovered && !disabled && "opacity-100 blur-md",
          isPressed && !disabled && "opacity-70",
        )}
        style={{
          boxShadow: `0 0 15px ${styles.glow}`,
          background: "transparent",
          clipPath,
        }}
      ></div>

      {/* Scan line effect */}
      {isHovered && !disabled && (
        <div className="absolute inset-0 bg-scan-lines opacity-30 pointer-events-none" style={{ clipPath }}></div>
      )}

      {/* Accent corner */}
      <div
        className={cn("absolute top-0 right-0 w-3 h-3", styles.accent)}
        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
      ></div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[30%] h-[2px] bg-red-500/70"></div>

      {/* Bike trail effect on hover */}
      {isHovered && !disabled && (
        <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-8 h-16 overflow-hidden">
          <div className="absolute inset-0 bg-red-600/30 blur-lg"></div>
          <motion.div
            className="absolute top-1/2 left-0 h-[1px] bg-red-500 -translate-y-1/2"
            style={{ width: "100%", boxShadow: "0 0 8px 2px rgba(239, 68, 68, 0.8)" }}
            animate={{ scaleX: [0, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.5 }}
          />
        </div>
      )}
    </>
  )

  // Event handlers
  const handleMouseEnter = () => !disabled && setIsHovered(true)
  const handleMouseLeave = () => !disabled && setIsHovered(false)
  const handleMouseDown = () => !disabled && setIsPressed(true)
  const handleMouseUp = () => !disabled && setIsPressed(false)

  // Render as link or button
  if (href) {
    return (
      <Link
        href={href}
        className={buttonClasses}
        target={target}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
      >
        <ButtonContent />
      </Link>
    )
  }

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
    >
      <ButtonContent />
    </button>
  )
})

export default AkiraButton

