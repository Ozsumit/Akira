"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AkiraButtonProps {
  children: React.ReactNode
  href?: string
  variant?: "primary" | "secondary" | "icon" | "danger"
  className?: string
  target?: string
  onClick?: () => void
  disabled?: boolean
}

export default function CapsuleButton({
  children,
  href,
  variant = "primary",
  className,
  target,
  onClick,
  disabled = false,
}: AkiraButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)

  // Random glitch effect
  useEffect(() => {
    if (isHovered) {
      const interval = setInterval(() => {
        if (Math.random() > 0.7) {
          setGlitchActive(true)
          setTimeout(() => setGlitchActive(false), 200)
        }
      }, 1000)

      return () => clearInterval(interval)
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
        }
      case "secondary":
        return {
          base: "bg-gradient-to-r from-gray-900 to-gray-800 text-red-400",
          hover: "from-gray-800 to-gray-700",
          border: "border-red-900/50",
          glow: "rgba(239,68,68,0.3)",
          text: "text-red-400",
          highlight: "bg-red-400/10",
        }
      case "danger":
        return {
          base: "bg-gradient-to-r from-red-900 to-black text-red-400",
          hover: "from-red-800 to-gray-900",
          border: "border-red-700",
          glow: "rgba(239,68,68,0.4)",
          text: "text-red-400",
          highlight: "bg-red-400/10",
        }
      case "icon":
        return {
          base: "bg-black text-red-400",
          hover: "bg-red-900/20",
          border: "border-red-900/50",
          glow: "rgba(239,68,68,0.3)",
          text: "text-red-400",
          highlight: "bg-red-400/10",
        }
      default:
        return {
          base: "bg-gradient-to-r from-red-900 to-red-700 text-white",
          hover: "from-red-800 to-red-600",
          border: "border-red-500",
          glow: "rgba(239,68,68,0.6)",
          text: "text-white",
          highlight: "bg-red-400/20",
        }
    }
  }

  const styles = getVariantStyles()

  const buttonClasses = cn(
    "relative overflow-hidden transition-all duration-300",
    variant === "icon" ? "w-10 h-10 flex items-center justify-center rounded-md" : "px-6 py-3",
    styles.base,
    styles.text,
    disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105",
    className,
  )

  const ButtonContent = () => (
    <>
      {/* Button shape with clip path */}
      <div className="absolute inset-0 z-0">
        <div
          className={cn(
            "absolute inset-0 transition-all duration-300",
            styles.base,
            isHovered && !disabled && styles.hover,
          )}
        ></div>

        {/* Top highlight */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/30"></div>

        {/* Left highlight */}
        <div className="absolute top-0 left-0 bottom-0 w-[1px] bg-white/30"></div>

        {/* Bottom shadow */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-black/50"></div>

        {/* Right shadow */}
        <div className="absolute top-0 right-0 bottom-0 w-[1px] bg-black/50"></div>

        {/* Diagonal accent line */}
        <div className="absolute top-0 right-0 w-8 h-[1px] bg-red-400 rotate-45 translate-y-1 translate-x-2"></div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-2 h-2 bg-red-900"></div>

        {/* Data flow animation */}
        {isHovered && !disabled && (
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
          </>
        )}
      </div>

      {/* Button content */}
      <div
        className={cn(
          "relative z-10 flex items-center justify-center",
          variant === "icon" ? "" : "pl-1 pr-2",
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
      ></div>

      {/* Glow effect */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 transition-all duration-300 rounded-md",
          isHovered && !disabled && "opacity-100 blur-md",
          isPressed && !disabled && "opacity-70",
        )}
        style={{
          boxShadow: `0 0 15px ${styles.glow}`,
          background: "transparent",
        }}
      ></div>

      {/* Scan line effect */}
      {isHovered && !disabled && <div className="absolute inset-0 bg-scan-lines opacity-30 pointer-events-none"></div>}
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
    >
      <ButtonContent />
    </button>
  )
}

