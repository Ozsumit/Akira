"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface NeoTokyoNavProps {
  activeSection: string
  className?: string
}

export default function NeoTokyoNav({ activeSection, className }: NeoTokyoNavProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Account for fixed header
        behavior: "smooth",
      })
    }
  }

  if (!isVisible) return null

  const sections = ["home", "about", "projects", "skills", "contact"]
  const activeIndex = sections.indexOf(activeSection)

  return (
    <div className={cn("fixed right-8 top-1/2 -translate-y-1/2 z-50", className)}>
      <div className="relative">
        {/* Bike light effect */}
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-red-600/30 rounded-full blur-xl animate-pulse"></div>

        {/* Navigation container */}
        <div className="relative bg-black/80 border border-red-800/50 rounded-lg p-3 backdrop-blur-sm">
          {/* Animated circuit pattern */}
          <div className="absolute inset-0 overflow-hidden rounded-lg opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNmZjAwMDAiIHN0cm9rZS13aWR0aD0iMSI+PHBhdGggZD0iTTAgMjBMMjAgME00MCAwTDAgNDBNNDAgMjBMMjAgNDBNMjAgMEwyMCA0ME0wIDBMNDAgNDBNMCAwTDQwIDBNMCA0MEw0MCA0ME0wIDBMMCAyME0wIDIwTDAgNDBNNDAgMEw0MCAyME00MCAyMEw0MCA0MCI+PC9wYXRoPjwvZz48L3N2Zz4=')]"></div>
          </div>

          <div className="flex flex-col gap-4 items-center relative z-10">
            {sections.map((section, index) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="group relative w-12 h-12 flex items-center justify-center"
              >
                <span className="sr-only">{section}</span>

                {/* Button background */}
                <motion.div
                  className={cn(
                    "absolute inset-0 rounded-md",
                    activeSection === section ? "bg-red-900/50" : "bg-gray-900/50 group-hover:bg-gray-800/50",
                  )}
                  layoutId="navButtonBg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />

                {/* Indicator light */}
                <div className="relative z-10">
                  <motion.div
                    className={cn(
                      "w-3 h-3 rounded-full",
                      activeSection === section ? "bg-red-500" : "bg-gray-600 group-hover:bg-gray-400",
                    )}
                    animate={{
                      boxShadow:
                        activeSection === section
                          ? [
                              "0 0 0px rgba(239,68,68,0.7)",
                              "0 0 10px rgba(239,68,68,0.7)",
                              "0 0 5px rgba(239,68,68,0.7)",
                            ]
                          : "none",
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: activeSection === section ? Number.POSITIVE_INFINITY : 0,
                      repeatType: "reverse",
                    }}
                  />
                </div>

                {/* Section label */}
                <AnimatePresence>
                  {(activeSection === section || true) && (
                    <motion.div
                      className="absolute left-full ml-3 whitespace-nowrap"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{
                        opacity: activeSection === section ? 1 : 0.6,
                        x: 0,
                      }}
                      exit={{ opacity: 0, x: -10 }}
                    >
                      <div
                        className={cn(
                          "text-xs uppercase tracking-wider font-mono",
                          activeSection === section ? "text-red-500" : "text-gray-500 group-hover:text-gray-300",
                        )}
                      >
                        {section}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Icon for each section */}
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8">
                  {activeSection === section && (
                    <motion.div
                      className="absolute inset-0 bg-red-500"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Vertical progress line */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-0.5 h-full bg-gray-800 -z-10"></div>

          {/* Active indicator */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.7)] -z-10"
            style={{
              top: 0,
              height: `${((activeIndex + 1) / sections.length) * 100}%`,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />

          {/* Data flow animation */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-0.5 h-full overflow-hidden -z-10">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-full bg-red-500/70"
                style={{
                  height: Math.random() * 20 + 10,
                  top: -30,
                }}
                animate={{
                  top: ["0%", "100%"],
                }}
                transition={{
                  duration: Math.random() * 2 + 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.8,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

