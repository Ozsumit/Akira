"use client"

import type React from "react"

import { useState, useRef, memo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink } from "lucide-react"
import NeonText from "@/components/neon-text"
import { cn } from "@/lib/utils"

interface Technology {
  name: string
  description: string
  icon: React.ReactNode
  category: string
  level: number
  link?: string
}

interface TechShowcaseProps {
  technologies: Technology[]
  className?: string
}

// Memoized tech card component
const TechCard = memo(function TechCard({
  tech,
  isActive,
  onClick,
}: {
  tech: Technology
  isActive: boolean
  onClick: () => void
}) {
  return (
    <motion.div
      className={cn(
        "relative cursor-pointer transition-all duration-300 transform-gpu",
        isActive ? "scale-105 z-10" : "scale-100 hover:scale-[1.02]",
      )}
      onClick={onClick}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={cn(
          "absolute -inset-1 bg-gradient-to-r blur-sm transition-opacity duration-300",
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50",
          tech.category === "frontend"
            ? "from-red-600/30 to-red-900/30"
            : tech.category === "animation"
              ? "from-blue-600/30 to-blue-900/30"
              : tech.category === "3d"
                ? "from-purple-600/30 to-purple-900/30"
                : "from-green-600/30 to-green-900/30",
        )}
      ></div>

      <div
        className={cn(
          "relative border-2 bg-black/90 p-4 rounded-lg h-full transition-colors duration-300",
          tech.category === "frontend"
            ? "border-red-800/70"
            : tech.category === "animation"
              ? "border-blue-800/70"
              : tech.category === "3d"
                ? "border-purple-800/70"
                : "border-green-800/70",
        )}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className={cn(
              tech.category === "frontend"
                ? "text-red-400"
                : tech.category === "animation"
                  ? "text-blue-400"
                  : tech.category === "3d"
                    ? "text-purple-400"
                    : "text-green-400",
            )}
          >
            {tech.icon}
          </div>
          <h3
            className={cn(
              "text-lg font-bold",
              tech.category === "frontend"
                ? "text-red-400"
                : tech.category === "animation"
                  ? "text-blue-400"
                  : tech.category === "3d"
                    ? "text-purple-400"
                    : "text-green-400",
            )}
          >
            {tech.name}
          </h3>
        </div>

        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-300 text-sm mb-4">{tech.description}</p>

            {/* Skill level indicator */}
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">PROFICIENCY</span>
                <span
                  className={cn(
                    tech.category === "frontend"
                      ? "text-red-400"
                      : tech.category === "animation"
                        ? "text-blue-400"
                        : tech.category === "3d"
                          ? "text-purple-400"
                          : "text-green-400",
                  )}
                >
                  {tech.level}%
                </span>
              </div>
              <div className="h-2 bg-gray-900 rounded-full overflow-hidden">
                <motion.div
                  className={cn(
                    "h-full relative",
                    tech.category === "frontend"
                      ? "bg-gradient-to-r from-red-900 to-red-500"
                      : tech.category === "animation"
                        ? "bg-gradient-to-r from-blue-900 to-blue-500"
                        : tech.category === "3d"
                          ? "bg-gradient-to-r from-purple-900 to-purple-500"
                          : "bg-gradient-to-r from-green-900 to-green-500",
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: `${tech.level}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </motion.div>
              </div>
            </div>

            {tech.link && (
              <a
                href={tech.link}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center text-xs gap-1 mt-2",
                  tech.category === "frontend"
                    ? "text-red-400 hover:text-red-300"
                    : tech.category === "animation"
                      ? "text-blue-400 hover:text-blue-300"
                      : tech.category === "3d"
                        ? "text-purple-400 hover:text-purple-300"
                        : "text-green-400 hover:text-green-300",
                )}
              >
                <ExternalLink className="h-3 w-3" /> Learn more
              </a>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
})

// Category filter component
const CategoryFilter = memo(function CategoryFilter({
  categories,
  activeCategory,
  onSelectCategory,
}: {
  categories: string[]
  activeCategory: string | null
  onSelectCategory: (category: string | null) => void
}) {
  return (
    <div className="flex flex-wrap gap-3 mb-8 justify-center">
      <button
        className={cn(
          "px-3 py-1 text-sm rounded-full border transition-colors",
          activeCategory === null
            ? "bg-white/10 border-white/50 text-white"
            : "bg-transparent border-gray-700 text-gray-400 hover:text-white hover:border-gray-500",
        )}
        onClick={() => onSelectCategory(null)}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          className={cn(
            "px-3 py-1 text-sm rounded-full border transition-colors",
            activeCategory === category
              ? category === "frontend"
                ? "bg-red-900/30 border-red-700 text-red-400"
                : category === "animation"
                  ? "bg-blue-900/30 border-blue-700 text-blue-400"
                  : category === "3d"
                    ? "bg-purple-900/30 border-purple-700 text-purple-400"
                    : "bg-green-900/30 border-green-700 text-green-400"
              : "bg-transparent border-gray-700 text-gray-400 hover:text-white hover:border-gray-500",
          )}
          onClick={() => onSelectCategory(category)}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  )
})

// Main component
const TechShowcase = memo(function TechShowcase({ technologies, className }: TechShowcaseProps) {
  const [activeTech, setActiveTech] = useState<Technology | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Extract unique categories
  const categories = Array.from(new Set(technologies.map((tech) => tech.category)))

  // Filter technologies by category
  const filteredTechnologies = activeCategory
    ? technologies.filter((tech) => tech.category === activeCategory)
    : technologies

  // Handle tech selection
  const handleTechClick = (tech: Technology) => {
    setActiveTech(activeTech?.name === tech.name ? null : tech)
  }

  // Handle category selection
  const handleCategorySelect = (category: string | null) => {
    setActiveCategory(category)
    setActiveTech(null)
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold mb-4">
          <NeonText color="blue">TECHNOLOGIES</NeonText>
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          The digital arsenal powering my Neo-Tokyo creations. Each technology is a weapon in the fight against digital
          mediocrity.
        </p>
      </div>

      {/* Category filters */}
      <CategoryFilter categories={categories} activeCategory={activeCategory} onSelectCategory={handleCategorySelect} />

      {/* Tech grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredTechnologies.map((tech) => (
            <TechCard
              key={tech.name}
              tech={tech}
              isActive={activeTech?.name === tech.name}
              onClick={() => handleTechClick(tech)}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Tech radar visualization */}
      <div className="mt-16 relative h-64 md:h-80 border-2 border-blue-800/50 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-black/80"></div>

        {/* Radar circles */}
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-800/30"
            style={{
              width: `${i * 25}%`,
              height: `${i * 25}%`,
            }}
          ></div>
        ))}

        {/* Radar sweep */}
        <motion.div
          className="absolute top-1/2 left-1/2 h-[150%] w-1 bg-gradient-to-t from-blue-500/0 via-blue-500/50 to-blue-500/0 origin-bottom"
          style={{ transformOrigin: "bottom center" }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        ></motion.div>

        {/* Tech dots */}
        <AnimatePresence>
          {filteredTechnologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              className={cn(
                "absolute w-3 h-3 rounded-full",
                tech.category === "frontend"
                  ? "bg-red-500"
                  : tech.category === "animation"
                    ? "bg-blue-500"
                    : tech.category === "3d"
                      ? "bg-purple-500"
                      : "bg-green-500",
              )}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: `calc(${Math.cos(index * ((2 * Math.PI) / filteredTechnologies.length)) * 40}% - 6px)`,
                y: `calc(${Math.sin(index * ((2 * Math.PI) / filteredTechnologies.length)) * 40}% - 6px)`,
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                left: "50%",
                top: "50%",
                boxShadow:
                  tech.category === "frontend"
                    ? "0 0 10px rgba(239, 68, 68, 0.7)"
                    : tech.category === "animation"
                      ? "0 0 10px rgba(59, 130, 246, 0.7)"
                      : tech.category === "3d"
                        ? "0 0 10px rgba(168, 85, 247, 0.7)"
                        : "0 0 10px rgba(34, 197, 94, 0.7)",
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    tech.category === "frontend"
                      ? "0 0 5px rgba(239, 68, 68, 0.7)"
                      : tech.category === "animation"
                        ? "0 0 5px rgba(59, 130, 246, 0.7)"
                        : tech.category === "3d"
                          ? "0 0 5px rgba(168, 85, 247, 0.7)"
                          : "0 0 5px rgba(34, 197, 94, 0.7)",

                    tech.category === "frontend"
                      ? "0 0 15px rgba(239, 68, 68, 0.7)"
                      : tech.category === "animation"
                        ? "0 0 15px rgba(59, 130, 246, 0.7)"
                        : tech.category === "3d"
                          ? "0 0 15px rgba(168, 85, 247, 0.7)"
                          : "0 0 15px rgba(34, 197, 94, 0.7)",

                    tech.category === "frontend"
                      ? "0 0 5px rgba(239, 68, 68, 0.7)"
                      : tech.category === "animation"
                        ? "0 0 5px rgba(59, 130, 246, 0.7)"
                        : tech.category === "3d"
                          ? "0 0 5px rgba(168, 85, 247, 0.7)"
                          : "0 0 5px rgba(34, 197, 94, 0.7)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: Math.random() * 2,
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Tech names */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <div className="bg-black/70 border border-blue-800/50 rounded-md px-3 py-1 text-xs font-mono text-blue-400">
            {filteredTechnologies.length} technologies detected
          </div>
        </div>
      </div>
    </div>
  )
})

export default TechShowcase

