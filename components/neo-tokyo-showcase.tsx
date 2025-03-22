"use client";

import { useState, useRef, useEffect, useCallback, memo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Github,
  Maximize2,
  AlertCircle,
  Cpu,
  ExternalLink,
} from "lucide-react";
import EnhancedGlitchImage from "../components/enhanced-glitch-image";
import NeonText from "../components/neon-text";
import AkiraButton from "../components/akira-button";
import PowerIndicator from "../components/power-indicator";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  github?: string;
  liveDemo?: string;
}

interface NeoTokyoShowcaseProps {
  projects: Project[];
}

function BikeTrail({
  position,
  size,
  intensity,
}: {
  position: string;
  size: string;
  intensity: string;
}) {
  const trailStyle = {
    top: position.includes("top") ? "0" : "auto",
    bottom: position.includes("bottom") ? "0" : "auto",
    left: position.includes("left") ? "0" : "auto",
    right: position.includes("right") ? "0" : "auto",
    width: size === "lg" ? "16rem" : size === "md" ? "8rem" : "4rem",
    height: size === "lg" ? "32rem" : size === "md" ? "16rem" : "8rem",
    opacity:
      intensity === "low" ? "0.3" : intensity === "medium" ? "0.6" : "0.9",
  };

  const motionStyle = {
    width: "100%",
    boxShadow: "0 0 15px 5px rgba(239, 68, 68, 0.7)",
    filter: "blur(2px)",
  };

  return (
    <div className={`absolute ${position} overflow-hidden`} style={trailStyle}>
      <motion.div
        className="absolute top-1/2 left-0 h-2 bg-red-500 -translate-y-1/2 origin-left"
        style={motionStyle}
        animate={{
          scaleX: [0, 1],
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 2,
        }}
      />
    </div>
  );
}

const NeoTokyoShowcase = memo(function NeoTokyoShowcase({
  projects,
}: NeoTokyoShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [expandedView, setExpandedView] = useState(false);
  const [showTechnicalReadout, setShowTechnicalReadout] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [randomStats] = useState({
    memory: Math.floor(Math.random() * 512) + 256,
    power: Math.floor(Math.random() * 50) + 50,
    stability: Math.floor(Math.random() * 30) + 70,
    syncRate: Math.floor(Math.random() * 40) + 60,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading project data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const nextProject = useCallback(() => {
    if (isAnimating) return;
    setDirection(1);
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  }, [isAnimating, projects.length]);

  const prevProject = useCallback(() => {
    if (isAnimating) return;
    setDirection(-1);
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [isAnimating, projects.length]);

  // Auto-play effect
  useEffect(() => {
    if (isHovering || expandedView || showTechnicalReadout) return;

    const interval = setInterval(() => {
      nextProject();
    }, 8000);

    return () => clearInterval(interval);
  }, [
    currentIndex,
    isAnimating,
    isHovering,
    expandedView,
    showTechnicalReadout,
    nextProject,
  ]);

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
      {/* Bike Trails */}
      <BikeTrail position="top-right" size="lg" intensity="medium" />
      <BikeTrail position="bottom-left" size="md" intensity="low" />

      {/* Main Container */}
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <div className="text-red-500 font-mono text-sm">
                LOADING PROJECT DATA...
              </div>
            </div>
          </div>
        )}
        {/* Background Elements */}
        <div className="absolute -inset-4 bg-gradient-to-r from-red-600/20 to-blue-600/20 blur-xl"></div>

        {/* Project Display */}
        <div
          className={cn(
            "relative transition-all duration-500 transform-gpu",
            expandedView ? "scale-105" : "scale-100"
          )}
        >
          {/* Top Control Panel */}
          <div className="relative z-10">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600/30 to-blue-600/30 blur-sm"></div>
            <div className="relative bg-black border-2 border-red-800/70 rounded-t-md overflow-hidden">
              {/* Circuit pattern background */}
              <div className="absolute inset-0 circuit-pattern opacity-10"></div>

              {/* Control Panel Content */}
              <div className="flex items-center justify-between p-2 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <PowerIndicator active={true} pulseSpeed="fast" />
                    <div className="absolute -inset-1 bg-red-500/20 blur-sm rounded-full animate-pulse"></div>
                  </div>
                  <div className="text-sm font-mono text-red-400 border-b border-red-800/50 pb-0.5">
                    PROJECT.SCANNER
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <div className="text-xs font-mono text-gray-500">
                      ID: {currentProject.id.toString().padStart(4, "0")}
                    </div>
                    <div className="w-1 h-1 bg-red-800 rounded-full"></div>
                    <div className="text-xs font-mono text-green-400">
                      ACTIVE
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="hidden sm:block text-xs font-mono text-blue-400">
                    MEM: {randomStats.memory}MB
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
                  <button
                    onClick={() =>
                      setShowTechnicalReadout(!showTechnicalReadout)
                    }
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Cpu className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setExpandedView(!expandedView)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
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
          </div>

          {/* Main Content Area */}
          <div className="relative border-x-2 border-red-800/70 bg-black">
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
                  {/* Technical Readout Overlay */}
                  <AnimatePresence>
                    {showTechnicalReadout && (
                      <motion.div
                        className="absolute inset-0 z-30 bg-black/90 backdrop-blur-sm p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="h-full border-2 border-blue-800/70 p-4 overflow-auto">
                          <div className="flex justify-between items-start mb-6">
                            <div>
                              <h3 className="text-xl font-mono text-blue-400 mb-1">
                                TECHNICAL READOUT
                              </h3>
                              <p className="text-xs text-gray-400">
                                PROJECT ID:{" "}
                                {currentProject.id.toString().padStart(4, "0")}
                              </p>
                            </div>
                            <button
                              onClick={() => setShowTechnicalReadout(false)}
                              className="text-blue-400 hover:text-blue-300"
                            >
                              <AlertCircle className="h-5 w-5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* System Specs */}
                            <div className="border border-blue-900/50 p-3 bg-blue-950/20">
                              <h4 className="text-sm font-mono text-blue-400 mb-3 border-b border-blue-900/50 pb-1">
                                SYSTEM SPECIFICATIONS
                              </h4>
                              <div className="space-y-3 text-xs">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">
                                    MEMORY ALLOCATION:
                                  </span>
                                  <span className="text-blue-300 font-mono">
                                    {randomStats.memory} MB
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">
                                    POWER CONSUMPTION:
                                  </span>
                                  <span className="text-blue-300 font-mono">
                                    {randomStats.power}%
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">
                                    STABILITY INDEX:
                                  </span>
                                  <span className="text-blue-300 font-mono">
                                    {randomStats.stability}%
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">
                                    SYNC RATE:
                                  </span>
                                  <span className="text-blue-300 font-mono">
                                    {randomStats.syncRate}%
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">
                                    FRAMEWORK:
                                  </span>
                                  <span className="text-blue-300 font-mono">
                                    REACT.JS
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">
                                    RUNTIME:
                                  </span>
                                  <span className="text-blue-300 font-mono">
                                    NEXT.JS
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Component Analysis */}
                            <div className="border border-blue-900/50 p-3 bg-blue-950/20">
                              <h4 className="text-sm font-mono text-blue-400 mb-3 border-b border-blue-900/50 pb-1">
                                COMPONENT ANALYSIS
                              </h4>
                              <div className="space-y-3 text-xs">
                                {currentProject.tags.map((tag, i) => (
                                  <div key={i} className="flex justify-between">
                                    <span className="text-gray-400">
                                      COMPONENT {i + 1}:
                                    </span>
                                    <span className="text-blue-300 font-mono">
                                      {tag.toUpperCase()}
                                    </span>
                                  </div>
                                ))}
                                <div className="flex justify-between">
                                  <span className="text-gray-400">
                                    TOTAL COMPONENTS:
                                  </span>
                                  <span className="text-blue-300 font-mono">
                                    {currentProject.tags.length}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">
                                    INTEGRATION STATUS:
                                  </span>
                                  <span className="text-green-400 font-mono">
                                    OPERATIONAL
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Code Snippet */}
                            <div className="border border-blue-900/50 p-3 bg-blue-950/20 md:col-span-2">
                              <h4 className="text-sm font-mono text-blue-400 mb-3 border-b border-blue-900/50 pb-1">
                                CODE FRAGMENT
                              </h4>
                              <pre className="text-xs text-blue-300 font-mono bg-blue-950/30 p-2 overflow-x-auto">
                                {`import React, { useEffect, useState } from 'react';
import { ${currentProject.tags.join(", ")} } from './components';

export function ${currentProject.title.replace(/\s+/g, "")}() {
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    // Initialize system
    console.log("Project ${currentProject.id} initialized");
    setIsActive(true);
    
    return () => {
      // Cleanup
      setIsActive(false);
    };
  }, []);

  return (
    <div className="neo-tokyo-container">
      {/* ${currentProject.description} */}
      <h1>${currentProject.title}</h1>
      {isActive && <StatusIndicator status="operational" />}
    </div>
  );
}`}
                              </pre>
                            </div>
                          </div>

                          <div className="mt-6 flex justify-end">
                            <AkiraButton
                              variant="secondary"
                              size="sm"
                              onClick={() => setShowTechnicalReadout(false)}
                            >
                              CLOSE READOUT
                            </AkiraButton>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Main Project Display */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                    {/* Project Image - 7 columns on large screens */}
                    <div className="lg:col-span-7 relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-red-600/30 to-blue-600/30 blur-sm"></div>
                      <div className="relative overflow-hidden border-2 border-red-800/70 bg-black h-full">
                        {/* Asymmetrical Clip Path for Image Container */}
                        <div
                          className="absolute inset-2"
                          style={{
                            clipPath:
                              "polygon(0% 15%, 15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%)",
                          }}
                        >
                          <EnhancedGlitchImage
                            intensity="medium"
                            frequency="occasional"
                          >
                            <Image
                              src={currentProject.image || "/placeholder.svg"}
                              alt={currentProject.title}
                              width={800}
                              height={600}
                              className="w-full h-full object-cover"
                            />
                          </EnhancedGlitchImage>
                        </div>

                        {/* Scan lines */}
                        <div className="absolute inset-0 bg-scan-lines opacity-20 pointer-events-none"></div>

                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-red-600"></div>
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-600"></div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-600"></div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-red-600"></div>

                        {/* Technical Readouts */}
                        <div className="absolute top-3 left-8 text-[8px] font-mono text-red-400/80 leading-tight">
                          SYS:ACTIVE
                          <br />
                          MEM:{randomStats.memory}MB
                          <br />
                          PWR:{randomStats.power}%
                        </div>

                        <div className="absolute top-3 right-8 text-[8px] font-mono text-blue-400/80 leading-tight text-right">
                          ID:{currentProject.id.toString().padStart(4, "0")}
                          <br />
                          VER:2.1.4
                          <br />
                          SNC:{randomStats.syncRate}%
                        </div>

                        {/* Data Readouts */}
                        <div className="absolute bottom-3 left-8 right-8 bg-black/70 backdrop-blur-sm p-2 text-xs font-mono text-red-400 border border-red-900/50">
                          <div className="flex justify-between">
                            <span>STATUS: OPERATIONAL</span>
                            <span>SYNC: {randomStats.syncRate}%</span>
                          </div>
                        </div>

                        {/* Animated Scan Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent"
                          initial={{ y: -500 }}
                          animate={{ y: 500 }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                            repeatDelay: 1,
                          }}
                        />
                      </div>
                    </div>

                    {/* Project Info - 5 columns on large screens */}
                    <div className="lg:col-span-5 relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-red-600/20 blur-sm"></div>
                      <div className="relative border-2 border-red-800/70 bg-black/90 h-full flex flex-col">
                        {/* Project Title with Asymmetrical Background */}
                        <div className="relative">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-red-900/30 to-black/30"></div>
                          <div
                            className="relative p-3 border-b-2 border-red-800/50"
                            style={{
                              clipPath:
                                "polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)",
                            }}
                          >
                            <h3 className="text-2xl md:text-3xl font-bold">
                              <NeonText color="red">
                                {currentProject.title}
                              </NeonText>
                            </h3>

                            {/* Status Indicators */}
                            <div className="absolute top-2 right-3 flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              <div className="text-[10px] font-mono text-green-400">
                                ONLINE
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Project Content */}
                        <div className="p-4 flex-grow flex flex-col">
                          {/* Description */}
                          <div className="mb-4 flex-grow">
                            <div className="border-l-2 border-red-600 pl-3 py-1 mb-3">
                              <p className="text-gray-300 text-sm md:text-base">
                                {currentProject.description}
                              </p>
                            </div>

                            {/* Technical Readout */}
                            <div className="mt-4 bg-black/50 border border-red-900/30 p-2">
                              <div className="text-xs font-mono text-gray-400 mb-1">
                                SYSTEM ANALYSIS:
                              </div>
                              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                                <div className="flex justify-between">
                                  <span className="text-gray-500">MEMORY:</span>
                                  <span className="text-red-400 font-mono">
                                    {randomStats.memory}MB
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">POWER:</span>
                                  <span className="text-red-400 font-mono">
                                    {randomStats.power}%
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">
                                    STABILITY:
                                  </span>
                                  <span className="text-red-400 font-mono">
                                    {randomStats.stability}%
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">SYNC:</span>
                                  <span className="text-red-400 font-mono">
                                    {randomStats.syncRate}%
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mt-4">
                              {currentProject.tags.map((tag, i) => (
                                <span
                                  key={i}
                                  className="text-xs px-2 py-0.5 bg-red-900/30 text-red-300 border border-red-800/50"
                                  style={{
                                    clipPath:
                                      "polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%, 10% 50%)",
                                  }}
                                >
                                  <span className="px-1">{tag}</span>
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="grid grid-cols-2 gap-3 mt-auto">
                            <AkiraButton
                              href={`/projects/${currentProject.id}`}
                              variant="primary"
                              size="sm"
                            >
                              VIEW DETAILS
                            </AkiraButton>
                            <AkiraButton
                              href={
                                currentProject.github ||
                                "https://github.com/ozsumit"
                              }
                              target="_blank"
                              variant="secondary"
                              size="sm"
                            >
                              <Github className="mr-2 h-4 w-4" /> CODE
                            </AkiraButton>
                          </div>

                          {/* Live Demo Button */}
                          {currentProject.liveDemo && (
                            <div className="mt-3">
                              <AkiraButton
                                href={currentProject.liveDemo}
                                target="_blank"
                                variant="secondary"
                                size="sm"
                                className="w-full"
                              >
                                <ExternalLink className="mr-2 h-4 w-4" /> LIVE
                                DEMO
                              </AkiraButton>
                            </div>
                          )}

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
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Control Panel */}
          <div className="relative z-10">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600/30 to-blue-600/30 blur-sm"></div>
            <div className="relative bg-black border-2 border-t-0 border-red-800/70 rounded-b-md p-3 flex items-center justify-between">
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
          </div>

          {/* Enhanced Navigation buttons */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20">
            <button
              className="group w-12 h-16 md:w-16 md:h-20 bg-black/90 border-2 border-red-800/70 flex items-center justify-center text-red-400 hover:bg-red-900/40 hover:text-red-200 transition-all overflow-hidden"
              style={{
                clipPath:
                  "polygon(40% 0%, 100% 0%, 100% 100%, 40% 100%, 0% 50%)",
              }}
              onClick={prevProject}
              disabled={isAnimating}
              aria-label="Previous project"
            >
              <div className="absolute inset-0 bg-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 circuit-pattern opacity-10"></div>
              <ChevronLeft className="h-6 w-6 md:h-8 md:w-8 relative z-10 group-hover:scale-110 transition-transform" />
              <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-8 h-16 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                <motion.div
                  className="absolute top-1/2 left-0 h-1 bg-red-500 -translate-y-1/2 origin-left"
                  style={{
                    width: "100%",
                    boxShadow: "0 0 10px 3px rgba(239, 68, 68, 0.7)",
                  }}
                  animate={{
                    scaleX: [0, 1],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 0.5,
                  }}
                />
              </div>
            </button>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20">
            <button
              className="group w-12 h-16 md:w-16 md:h-20 bg-black/90 border-2 border-red-800/70 flex items-center justify-center text-red-400 hover:bg-red-900/40 hover:text-red-200 transition-all overflow-hidden"
              style={{
                clipPath: "polygon(0% 0%, 60% 0%, 100% 50%, 60% 100%, 0% 100%)",
              }}
              onClick={nextProject}
              disabled={isAnimating}
              aria-label="Next project"
            >
              <div className="absolute inset-0 bg-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 circuit-pattern opacity-10"></div>
              <ChevronRight className="h-6 w-6 md:h-8 md:w-8 relative z-10 group-hover:scale-110 transition-transform" />
              <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-8 h-16 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                <motion.div
                  className="absolute top-1/2 left-0 h-1 bg-red-500 -translate-y-1/2 origin-left"
                  style={{
                    width: "100%",
                    boxShadow: "0 0 10px 3px rgba(239, 68, 68, 0.7)",
                  }}
                  animate={{
                    scaleX: [0, 1],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 0.5,
                  }}
                />
              </div>
            </button>
          </div>

          {/* Bike Trail Effect */}
          <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-16 h-32 overflow-hidden">
            <motion.div
              className="absolute top-1/2 left-0 h-2 bg-red-500 -translate-y-1/2 origin-left"
              style={{
                width: "100%",
                boxShadow: "0 0 15px 5px rgba(239, 68, 68, 0.7)",
                filter: "blur(2px)",
              }}
              animate={{
                scaleX: [0, 1],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 2,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default NeoTokyoShowcase;

// Helper function for conditional class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
