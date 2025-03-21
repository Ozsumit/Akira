"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import GlitchImage from "@/components/glitch-image"
import NeonText from "@/components/neon-text"

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  image: string
}

interface FilmStripProps {
  projects: Project[]
}

export default function FilmStrip({ projects }: FilmStripProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const nextProject = () => {
    if (isAnimating) return
    setDirection(1)
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    if (isAnimating) return
    setDirection(-1)
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  // Auto-play effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextProject()
    }, 8000)

    return () => clearInterval(interval)
  }, [currentIndex, isAnimating])

  const currentProject = projects[currentIndex]

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
      },
    }),
  }

  return (
    <div className="relative overflow-hidden" ref={containerRef}>
      {/* Film strip holes */}
      <div className="absolute top-0 left-0 w-full h-12 bg-black z-10 flex justify-between px-8">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="w-8 h-8 rounded-full bg-gray-900 border border-gray-800 my-2"></div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-12 bg-black z-10 flex justify-between px-8">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="w-8 h-8 rounded-full bg-gray-900 border border-gray-800 my-2"></div>
        ))}
      </div>

      {/* Film content */}
      <div className="pt-12 pb-12 relative">
        <AnimatePresence initial={false} custom={direction} onExitComplete={() => setIsAnimating(false)}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-red-600 to-blue-600 opacity-20 blur-xl rounded-lg"></div>
                <GlitchImage intensity="medium">
                  <Image
                    src={currentProject.image || "/placeholder.svg"}
                    alt={currentProject.title}
                    width={800}
                    height={600}
                    className="rounded-lg border border-red-800/50 w-full h-[400px] object-cover"
                  />
                </GlitchImage>

                {/* Film frame numbers */}
                <div className="absolute top-4 right-4 bg-black/70 px-2 py-1 rounded text-xs text-red-400 font-mono">
                  FRAME {currentIndex + 1}/{projects.length}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-red-600 opacity-10 blur-xl rounded-lg"></div>
                <div className="relative border border-red-800/50 bg-black/80 p-6 rounded-lg h-full">
                  <h3 className="text-3xl font-bold mb-4">
                    <NeonText color="red">{currentProject.title}</NeonText>
                  </h3>

                  <p className="text-gray-300 mb-6">{currentProject.description}</p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {currentProject.tags.map((tag, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-full bg-red-900/30 text-red-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link href={`/projects/${currentProject.id}`}>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white">VIEW PROJECT DETAILS</Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full border-red-600 text-red-400 hover:bg-red-900/20 hover:text-red-200"
        onClick={prevProject}
        disabled={isAnimating}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full border-red-600 text-red-400 hover:bg-red-900/20 hover:text-red-200"
        onClick={nextProject}
        disabled={isAnimating}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Film strip indicators */}
      <div className="absolute bottom-16 left-0 w-full flex justify-center gap-2 z-20">
        {projects.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${
              i === currentIndex ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.7)]" : "bg-gray-600 hover:bg-gray-400"
            }`}
            onClick={() => {
              if (isAnimating) return
              setDirection(i > currentIndex ? 1 : -1)
              setIsAnimating(true)
              setCurrentIndex(i)
            }}
          />
        ))}
      </div>
    </div>
  )
}

