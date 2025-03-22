"use client";

import type React from "react";

import { useState, useEffect, useRef, memo } from "react";
import { cn } from "../lib/utils";

interface EnhancedGlitchImageProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "low" | "medium" | "high";
  frequency?: "rare" | "occasional" | "frequent";
}

const EnhancedGlitchImage = memo(function EnhancedGlitchImage({
  children,
  className,
  intensity = "medium",
  frequency = "occasional",
}: EnhancedGlitchImageProps) {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchType, setGlitchType] = useState<
    "horizontal" | "vertical" | "rgb" | "noise"
  >("horizontal");
  const [rgbShift, setRgbShift] = useState({ r: 0, g: 0, b: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set frequency intervals based on the prop
    const intervalTime =
      frequency === "rare" ? 5000 : frequency === "occasional" ? 3000 : 1500;
    const glitchDuration =
      intensity === "low" ? 150 : intensity === "medium" ? 250 : 350;
    const glitchProbability =
      frequency === "rare" ? 0.2 : frequency === "occasional" ? 0.4 : 0.6;

    // Random glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() < glitchProbability) {
        // Choose a random glitch type
        const types: ("horizontal" | "vertical" | "rgb" | "noise")[] = [
          "horizontal",
          "vertical",
          "rgb",
          "noise",
        ];
        const randomType = types[Math.floor(Math.random() * types.length)];
        setGlitchType(randomType);

        // Set RGB shift values if using that effect
        if (randomType === "rgb") {
          setRgbShift({
            r: Math.floor(Math.random() * 10) - 5,
            g: Math.floor(Math.random() * 10) - 5,
            b: Math.floor(Math.random() * 10) - 5,
          });
        }

        setIsGlitching(true);

        // Random duration for the glitch
        const duration = glitchDuration + Math.random() * 200;
        setTimeout(() => setIsGlitching(false), duration);

        // Sometimes trigger multiple glitches in succession
        if (Math.random() > 0.7) {
          setTimeout(() => {
            setIsGlitching(true);
            setTimeout(() => setIsGlitching(false), duration / 2);
          }, duration + 50);
        }
      }
    }, intervalTime);

    return () => clearInterval(glitchInterval);
  }, [intensity, frequency]);

  const getIntensityClass = () => {
    switch (intensity) {
      case "low":
        return "glitch-effect-low";
      case "medium":
        return "glitch-effect-medium";
      case "high":
        return "glitch-effect-high";
      default:
        return "glitch-effect-medium";
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden",
        isGlitching && getIntensityClass(),
        className
      )}
    >
      {/* Original content */}
      <div
        className={cn(
          "relative z-10",
          isGlitching && glitchType === "horizontal" && "glitch-horizontal",
          isGlitching && glitchType === "vertical" && "glitch-vertical"
        )}
      >
        {children}
      </div>

      {/* RGB Shift effect layers */}
      {isGlitching && glitchType === "rgb" && (
        <>
          <div
            className="absolute inset-0 mix-blend-screen opacity-70 z-20"
            style={{
              transform: `translate(${rgbShift.r}px, ${rgbShift.r}px)`,
              filter: "brightness(1.5)",
            }}
          >
            <div className="absolute inset-0 bg-red-500/30 mix-blend-screen"></div>
            <div className="w-full h-full">{children}</div>
          </div>
          <div
            className="absolute inset-0 mix-blend-screen opacity-70 z-20"
            style={{
              transform: `translate(${rgbShift.g}px, ${rgbShift.g}px)`,
              filter: "brightness(1.5)",
            }}
          >
            <div className="absolute inset-0 bg-green-500/30 mix-blend-screen"></div>
            <div className="w-full h-full">{children}</div>
          </div>
          <div
            className="absolute inset-0 mix-blend-screen opacity-70 z-20"
            style={{
              transform: `translate(${rgbShift.b}px, ${rgbShift.b}px)`,
              filter: "brightness(1.5)",
            }}
          >
            <div className="absolute inset-0 bg-blue-500/30 mix-blend-screen"></div>
            <div className="w-full h-full">{children}</div>
          </div>
        </>
      )}

      {/* Noise overlay */}
      {isGlitching && glitchType === "noise" && (
        <div className="absolute inset-0 bg-noise opacity-30 z-20 pointer-events-none"></div>
      )}

      {/* Scan line effect */}
      {isGlitching && (
        <div className="absolute inset-0 bg-scan-lines opacity-40 z-30 pointer-events-none"></div>
      )}

      {/* Horizontal tear lines */}
      {isGlitching && glitchType === "horizontal" && (
        <>
          <div
            className="absolute left-0 right-0 h-[1px] bg-white/80 z-30"
            style={{ top: `${Math.random() * 100}%` }}
          ></div>
          <div
            className="absolute left-0 right-0 h-[2px] bg-white/60 z-30"
            style={{ top: `${Math.random() * 100}%` }}
          ></div>
          <div
            className="absolute left-0 right-0 h-[1px] bg-white/70 z-30"
            style={{ top: `${Math.random() * 100}%` }}
          ></div>
        </>
      )}

      {/* Vertical tear lines */}
      {isGlitching && glitchType === "vertical" && (
        <>
          <div
            className="absolute top-0 bottom-0 w-[1px] bg-white/80 z-30"
            style={{ left: `${Math.random() * 100}%` }}
          ></div>
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-white/60 z-30"
            style={{ left: `${Math.random() * 100}%` }}
          ></div>
          <div
            className="absolute top-0 bottom-0 w-[1px] bg-white/70 z-30"
            style={{ left: `${Math.random() * 100}%` }}
          ></div>
        </>
      )}
    </div>
  );
});

export default EnhancedGlitchImage;
