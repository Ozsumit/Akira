"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Github, Maximize2 } from "lucide-react";
import GlitchImage from "@/components/glitch-image";
import NeonText from "@/components/neon-text";
import HexagonButton from "@/components/hexagon-button";
import PowerIndicator from "@/components/power-indicator";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
}

interface ProjectShowcaseProps {
  projects: Project[];
}

export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [expandedView, setExpandedView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextProject = () => {
    if (isAnimating) return;
    setDirection(1);
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    if (isAnimating) return;
    setDirection(-1);
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Auto-play effect
  useEffect(() => {
    if (isHovering || expandedView) return;

    const interval = setInterval(() => {
      nextProject();
    }, 8000);

    return () => clearInterval(interval);
  }, [currentIndex, isAnimating, isHovering, expandedView]);

  const currentProject = projects[currentIndex];

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
  };

  return (
    <div
      className="relative overflow-hidden"
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Project Display */}
      <div
        className={cn(
          "relative transition-all duration-500",
          expandedView ? "scale-100" : "scale-95"
        )}
      >
        {/* Experimental Lab Container */}
        <div className="relative">
          {/* Lab Header */}
          <div className="relative z-10 bg-gradient-to-r from-red-900/80 to-black/80 border-2 border-red-800/50 rounded-t-lg overflow-hidden">
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <PowerIndicator active={true} pulseSpeed="fast" />
                <div className="text-sm font-mono text-red-400">
                  PROJECT.LAB
                </div>
                <div className="text-xs font-mono text-gray-500 hidden sm:block">
                  ID: {currentProject.id.toString().padStart(4, "0")}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-xs font-mono text-green-400 hidden sm:block">
                  STATUS: ACTIVE
                </div>
                <div className="flex items-center gap-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-red-500 animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    ></div>
                  ))}
                </div>
                {/* <button
                  onClick={() => setExpandedView(!expandedView)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  {/* <Maximize2 className="h-4 w-4" /> */}
                {/* ??</button> */} 

              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1 w-full bg-gray-900 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-red-600 to-blue-600"
                initial={{
                  width: `${(currentIndex / projects.length) * 100}%`,
                }}
                animate={{
                  width: `${((currentIndex + 1) / projects.length) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="relative border-x-2 border-red-800/50 bg-black">
            <div className="absolute inset-0 circuit-pattern opacity-5"></div>

            {/* Diagonal Accent Lines */}
            <div className="absolute top-0 left-0 w-20 h-1 bg-red-600 transform -rotate-45 origin-top-left"></div>
            <div className="absolute top-0 right-0 w-20 h-1 bg-blue-600 transform rotate-45 origin-top-right"></div>

            {/* Project Content */}
            <div className="relative z-10 p-4 md:p-6">
              <AnimatePresence
                initial={false}
                custom={direction}
                onExitComplete={() => setIsAnimating(false)}
              >
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
                    {/* Project Image - 3 columns on large screens */}
                    <div className="lg:col-span-3 relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-red-600/30 to-blue-600/30 blur-sm"></div>
                      <div className="relative overflow-hidden border-2 border-red-800/50 bg-black h-full">
                        {/* Hexagonal Clip Path for Image Container */}
                        <div
                          className="absolute inset-2"
                          style={{
                            clipPath:
                              "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)",
                          }}
                        >
                          <GlitchImage intensity="medium">
                            <Image
                              src={currentProject.image || "/placeholder.svg"}
                              alt={currentProject.title}
                              width={800}
                              height={600}
                              className="w-full h-full object-cover"
                            />
                          </GlitchImage>
                        </div>

                        {/* Scan lines */}
                        <div className="absolute inset-0 bg-scan-lines opacity-20 pointer-events-none"></div>

                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-600"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-600"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-600"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-600"></div>

                        {/* Data Readouts */}
                        <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-sm p-2 text-xs font-mono text-red-400 border border-red-900/50">
                          <div className="flex justify-between">
                            <span>RES: 1920x1080</span>
                            <span>FPS: 60</span>
                            <span>MEM: 512MB</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Project Info - 2 columns on large screens */}
                    <div className="lg:col-span-2 relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-red-600/20 blur-sm"></div>
                      <div className="relative border-2 border-red-800/50 bg-black/90 p-4 h-full flex flex-col">
                        {/* Project Title with Hexagonal Background */}
                        <div className="relative mb-4">
                          <div
                            className="absolute -inset-2 bg-gradient-to-r from-red-900/30 to-black/30"
                            style={{
                              clipPath:
                                "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)",
                            }}
                          ></div>
                          <div
                            className="relative p-2"
                            style={{
                              clipPath:
                                "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)",
                            }}
                          >
                            <h3 className="text-2xl md:text-3xl font-bold">
                              <NeonText color="red">
                                {currentProject.title}
                              </NeonText>
                            </h3>
                          </div>
                        </div>

                        {/* Project Description */}
                        <div className="mb-4 flex-grow">
                          <div className="border-l-2 border-red-600 pl-3 py-1 mb-3">
                            <p className="text-gray-300 text-sm md:text-base">
                              {currentProject.description}
                            </p>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mt-3">
                            {currentProject.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="text-xs px-2 py-0.5 bg-red-900/30 text-red-300 border border-red-800/50"
                                style={{
                                  clipPath:
                                    "polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)",
                                }}
                              >
                                <span className="px-1">{tag}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-3 mt-auto">
                          <HexagonButton
                            href={`/projects/${currentProject.id}`}
                            variant="primary"
                            size="sm"
                          >
                            VIEW DETAILS
                          </HexagonButton>
                          <HexagonButton
                            href="https://github.com/ozsumit"
                            target="_blank"
                            variant="secondary"
                            size="sm"
                          >
                            <Github className="mr-2 h-4 w-4" /> CODE
                          </HexagonButton>
                        </div>

                        {/* Technical specs */}
                        <div className="mt-4 pt-3 border-t border-red-900/30 grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <div className="text-gray-500">FRAMEWORK</div>
                            <div className="text-red-400 font-mono">
                              REACT.JS
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-500">STATUS</div>
                            <div className="text-green-400 font-mono">
                              OPERATIONAL
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Lab Footer */}
          <div className="relative z-10 bg-gradient-to-r from-black/80 to-red-900/80 border-2 border-t-0 border-red-800/50 rounded-b-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-xs font-mono text-gray-400">
                PROJECTS: {projects.length}
              </div>
              <div className="text-xs font-mono text-red-400">
                VIEWING: {currentIndex + 1}/{projects.length}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === currentIndex
                      ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.7)]"
                      : "bg-gray-600 hover:bg-gray-400"
                  }`}
                  onClick={() => {
                    if (isAnimating) return;
                    setDirection(i > currentIndex ? 1 : -1);
                    setIsAnimating(true);
                    setCurrentIndex(i);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/80 border border-red-800/50 flex items-center justify-center text-red-400 hover:bg-red-900/20 hover:text-red-200 transition-all"
            onClick={prevProject}
            disabled={isAnimating}
          >
            <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
          </button>

          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/80 border border-red-800/50 flex items-center justify-center text-red-400 hover:bg-red-900/20 hover:text-red-200 transition-all"
            onClick={nextProject}
            disabled={isAnimating}
          >
            <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper function for conditional class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
