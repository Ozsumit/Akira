"use client"

import { useState, useEffect, memo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import PowerIndicator from "@/components/power-indicator"

interface UnifiedNavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
  sections: string[]
}

const UnifiedNavigation = memo(function UnifiedNavigation({
  activeSection,
  setActiveSection,
  sections,
}: UnifiedNavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sideNavVisible, setSideNavVisible] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [scrollingDown, setScrollingDown] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show/hide side nav based on scroll position
      if (window.scrollY > 300) {
        setSideNavVisible(true)
      } else {
        setSideNavVisible(false)
      }

      // Determine scroll direction
      const currentScrollY = window.scrollY
      setScrollingDown(currentScrollY > lastScrollY)
      setLastScrollY(currentScrollY)

      // Determine active section
      for (const section of sections.slice().reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Adjust the detection area to be more accurate
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }

      // Default to home if at the top
      if (window.scrollY < 300) {
        setActiveSection("home")
      }
    }

    window.addEventListener("scroll", handleScroll)
    // Initial check on mount
    setTimeout(handleScroll, 100)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY, sections, setActiveSection])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Account for fixed header
        behavior: "smooth",
      })
      setMobileMenuOpen(false)
    }
  }

  return (
    <>
      {/* Top Navigation */}
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-transform duration-300",
          scrollingDown && window.scrollY > 300 ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div className="bg-black/80 backdrop-blur-md border-b border-red-900/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <button onClick={() => scrollToSection("home")} className="flex items-center gap-2">
                <PowerIndicator active={true} />
                <span className="font-bold text-xl text-red-500">SUMIT.POKHREL</span>
              </button>

              <div className="hidden md:flex items-center gap-8">
                {sections.map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`relative text-sm uppercase tracking-wider transition-colors ${
                      activeSection === section ? "text-red-500" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {section}
                    {activeSection === section && (
                      <motion.div
                        layoutId="activeTopSection"
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-500"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              <button className="md:hidden text-red-500 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/95 pt-16 flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-8">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-2xl uppercase tracking-wider ${
                    activeSection === section ? "text-red-500" : "text-gray-400"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Navigation */}
      <AnimatePresence>
        {sideNavVisible && (
          <motion.div
            className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden md:block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              {/* Bike light effect */}
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-red-600/30 rounded-full blur-xl animate-pulse"></div>

              {/* Navigation container */}
              <div className="relative bg-black/80 border border-red-800/50 rounded-lg p-3 backdrop-blur-sm">
                {/* Animated circuit pattern */}
                <div className="absolute inset-0 overflow-hidden rounded-lg opacity-20">
                  <div className="absolute top-0 left-0 w-full h-full circuit-pattern"></div>
                </div>

                <div className="flex flex-col gap-3 items-center relative z-10">
                  {sections.map((section, index) => (
                    <button
                      key={section}
                      onClick={() => scrollToSection(section)}
                      className="group relative w-10 h-10 flex items-center justify-center"
                    >
                      <span className="sr-only">{section}</span>

                      {/* Button background */}
                      {activeSection === section && (
                        <motion.div
                          className="absolute inset-0 rounded-md bg-red-900/50"
                          layoutId="navButtonBg"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}

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
                    height: `${((sections.indexOf(activeSection) + 1) / sections.length) * 100}%`,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />

                {/* Data flow animation */}
                <div className="absolute left-1/2 top-0 -translate-x-1/2 w-0.5 h-full overflow-hidden -z-10">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute w-full bg-red-500/70 z-10"
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
})

export default UnifiedNavigation

