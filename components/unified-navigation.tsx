"use client";

import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";
import PowerIndicator from "../components/power-indicator";
import AkiraLogo from "../components/akira-logo";

interface UnifiedNavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  sections: string[];
}

const UnifiedNavigation = memo(function UnifiedNavigation({
  activeSection,
  setActiveSection,
  sections,
}: UnifiedNavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sideNavVisible, setSideNavVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollingDown, setScrollingDown] = useState(false);
  const [systemStatus] = useState(Math.random() > 0.3 ? "ONLINE" : "STANDBY");

  useEffect(() => {
    const handleScroll = () => {
      // Show/hide side nav based on scroll position
      if (window.scrollY > 300) {
        setSideNavVisible(true);
      } else {
        setSideNavVisible(false);
      }

      // Determine scroll direction
      const currentScrollY = window.scrollY;
      setScrollingDown(currentScrollY > lastScrollY);
      setLastScrollY(currentScrollY);

      // Determine active section
      for (const section of sections.slice().reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust the detection area to be more accurate
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }

      // Default to home if at the top
      if (window.scrollY < 300) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check on mount
    setTimeout(handleScroll, 100);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, sections, setActiveSection]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Account for fixed header
        behavior: "smooth",
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top Navigation - Enhanced Akira-themed */}
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300",
          scrollingDown && window.scrollY > 300
            ? "-translate-y-full opacity-0"
            : "translate-y-0 opacity-100"
        )}
      >
        <div className="relative">
          {/* Red scan line effect */}
          <motion.div
            className="absolute inset-0 h-1 bg-red-500/20 z-0"
            animate={{
              y: ["-100%", "100%"],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          <div className="bg-black/80 backdrop-blur-md border-b border-red-900/50">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                {/* Logo area with enhanced Akira styling */}
                <div className="relative flex items-center">
                  {/* Logo container with glitch effect */}
                  <div className="relative mr-3">
                    <div className="absolute -inset-1 bg-red-500/20 blur-md rounded-sm"></div>
                    <button
                      onClick={() => scrollToSection("home")}
                      className="relative group"
                    >
                      <AkiraLogo className="h-10 w-10" />
                    </button>
                  </div>

                  {/* Title with Akira styling */}
                  <div className="relative">
                    <button
                      onClick={() => scrollToSection("home")}
                      className="group relative"
                    >
                      {/* Asymmetrical background shape */}
                      <div className="absolute inset-0 bg-gradient-to-r from-red-900/30 to-transparent skew-x-12"></div>

                      {/* Title text */}
                      <div className="relative px-4 py-1 flex flex-col items-start">
                        <span className="font-bold text-lg text-red-500 tracking-wider">
                          SUMIT.POKHREL
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                          <span className="text-[10px] text-gray-400 font-mono">
                            NEO-TOKYO DIVISION
                          </span>
                        </div>
                      </div>

                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-red-500/70"></div>
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-red-500/70"></div>
                    </button>
                  </div>

                  {/* System status indicator */}
                  <div className="hidden md:flex items-center ml-4 pl-4 border-l border-red-900/30">
                    <div className="flex items-center gap-2">
                      <PowerIndicator active={true} pulseSpeed="fast" />
                      <span className="text-[10px] font-mono text-green-400">
                        {systemStatus}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Navigation items with enhanced Akira styling */}
                <div className="hidden md:flex items-center gap-1">
                  {/* Data transmission animation */}
                  <div className="mr-4 h-6 w-20 bg-black/60 border border-red-900/30 overflow-hidden relative">
                    <motion.div
                      className="h-px bg-red-500 absolute top-1/2"
                      style={{ width: "100%" }}
                      animate={{
                        x: ["-100%", "100%"],
                        opacity: [0.3, 0.7, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[8px] font-mono text-red-400">
                        SYSTEM.ACTIVE
                      </span>
                    </div>
                  </div>

                  {sections.map((section) => (
                    <button
                      key={section}
                      onClick={() => scrollToSection(section)}
                      className={cn(
                        "relative px-4 py-2 text-xs uppercase tracking-wider transition-colors group",
                        activeSection === section
                          ? "text-red-400"
                          : "text-gray-400 hover:text-white"
                      )}
                    >
                      {/* Background shape - different for active vs inactive */}
                      <div
                        className={cn(
                          "absolute inset-0 transition-all duration-300",
                          activeSection === section
                            ? "bg-gradient-to-r from-red-900/30 to-black/30 skew-x-12 border-l-2 border-red-500"
                            : "bg-black/40 group-hover:bg-black/60"
                        )}
                      ></div>

                      <span className="relative z-10">{section}</span>

                      {/* Active indicator */}
                      {activeSection === section && (
                        <div className="absolute inset-0 overflow-hidden">
                          <motion.div
                            className="absolute inset-0 bg-red-500/10"
                            animate={{
                              opacity: [0.1, 0.3, 0.1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                          />
                        </div>
                      )}

                      {/* Corner accents */}
                      <div className="absolute top-0 right-0 w-1 h-1 bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="absolute bottom-0 left-0 w-1 h-1 bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>
                  ))}
                </div>

                {/* Mobile menu button with enhanced Akira styling */}
                <button
                  className="md:hidden relative group"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <div className="absolute -inset-2 bg-red-500/10 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative border border-red-800/50 p-1">
                    {mobileMenuOpen ? (
                      <X className="h-5 w-5 text-red-500" />
                    ) : (
                      <Menu className="h-5 w-5 text-red-500" />
                    )}

                    {/* Corner accents */}
                    <div className="absolute top-0 right-0 w-1 h-1 bg-red-500"></div>
                    <div className="absolute bottom-0 left-0 w-1 h-1 bg-red-500"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-red-500/30 to-transparent"></div>

          {/* Technical readout line */}
          <div className="h-4 w-full bg-black/60 border-b border-red-900/30 overflow-hidden hidden md:block">
            <div className="container mx-auto px-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-[8px] font-mono text-gray-500">
                  ID:AK-{Math.floor(Math.random() * 9000) + 1000}
                </span>
                <span className="text-[8px] font-mono text-gray-500">
                  SECTOR:NEO-TOKYO
                </span>
                <span className="text-[8px] font-mono text-gray-500">
                  ACCESS:GRANTED
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[8px] font-mono text-gray-500">
                  MEM:{Math.floor(Math.random() * 512) + 256}MB
                </span>
                <span className="text-[8px] font-mono text-gray-500">
                  CPU:{Math.floor(Math.random() * 30) + 70}%
                </span>
                <span className="text-[8px] font-mono text-red-400">
                  AKIRA.SYSTEM.ONLINE
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Akira-themed */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/95 pt-16 flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-full max-w-sm">
              {/* Decorative elements */}
              <div className="absolute inset-0 circuit-pattern opacity-5"></div>
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent"></div>

              <div className="flex flex-col items-stretch gap-3 p-4">
                {sections.map((section, index) => (
                  <motion.button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={cn(
                      "relative py-3 px-6 text-left uppercase tracking-wider font-bold border border-red-900/30",
                      activeSection === section
                        ? "akira-nav-item-active bg-red-900/20 text-red-500"
                        : "akira-nav-item bg-black/60 text-gray-400"
                    )}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <span>{section}</span>
                      {activeSection === section && (
                        <ChevronRight className="h-4 w-4 text-red-500" />
                      )}
                    </div>

                    {/* Active indicator */}
                    {activeSection === section && (
                      <motion.div
                        className="absolute left-0 top-0 h-full w-1 bg-red-500"
                        animate={{
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      />
                    )}

                    {/* Corner accents */}
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-red-500/70"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-red-500/70"></div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-10 left-0 w-full flex justify-center">
              <div className="text-xs text-red-500/50 font-mono">
                AKIRA.SYSTEM.NAVIGATION
              </div>
            </div>

            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
              <motion.div
                className="absolute inset-0 h-1 bg-red-500/10"
                animate={{
                  y: ["-100%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
              <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-red-500/5 blur-xl"></div>
              <div className="absolute bottom-10 right-10 w-20 h-20 rounded-full bg-red-500/5 blur-xl"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Navigation - Subtle Neo-Tokyo style */}
      <AnimatePresence>
        {sideNavVisible && (
          <motion.div
            className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              {/* Minimal bike light effect */}
              <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-6 h-20 overflow-hidden">
                <div className="absolute inset-0 bg-red-600/10 blur-lg"></div>
              </div>

              {/* Minimal navigation dots */}
              <div className="flex flex-col gap-4 items-center">
                {sections.map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="group relative w-3 h-3 flex items-center justify-center"
                    aria-label={`Navigate to ${section} section`}
                  >
                    {/* Indicator dot */}
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        activeSection === section
                          ? "bg-red-500"
                          : "bg-gray-800 group-hover:bg-gray-600"
                      )}
                    />

                    {/* Glow effect for active section */}
                    {activeSection === section && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-red-500/30 blur-sm"
                        animate={{
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      />
                    )}

                    {/* Section label on hover - appears to the left */}
                    <div className="absolute right-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="relative bg-black/70 px-2 py-1 rounded-sm border-l border-red-500/50">
                        <div className="text-[10px] uppercase tracking-wider font-mono text-gray-400 group-hover:text-red-400 transition-colors">
                          {section}
                        </div>

                        {/* Corner accent */}
                        <div className="absolute top-0 left-0 w-1 h-1 bg-red-500/70"></div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Vertical line connecting dots */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-full bg-gray-800/30"></div>

              {/* Progress indicator */}
              <motion.div
                className="absolute left-1/2 top-0 -translate-x-1/2 w-px bg-red-500/50"
                style={{
                  height: `${
                    ((sections.indexOf(activeSection) + 1) / sections.length) *
                    100
                  }%`,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />

              {/* Subtle data flow animation */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-full overflow-hidden">
                <motion.div
                  className="absolute w-full bg-red-500/40"
                  style={{
                    height: 10,
                    top: -10,
                  }}
                  animate={{
                    top: ["0%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default UnifiedNavigation;
