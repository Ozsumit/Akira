"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AkiraLogoProps {
  className?: string;
  animated?: boolean;
}

export default function AkiraLogo({
  className,
  animated = true,
}: AkiraLogoProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Base container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Outer hexagon */}
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon
            points="50,0 90,25 90,75 50,100 10,75 10,25"
            className="fill-black stroke-red-500"
            strokeWidth="2"
          />

          {/* Inner circuit patterns */}
          <g className="stroke-red-800/70" strokeWidth="1" fill="none">
            <path d="M30,30 L70,30 L70,70 L30,70 Z" />
            <path d="M40,40 L60,40 L60,60 L40,60 Z" />
            <path d="M30,30 L40,40" />
            <path d="M70,30 L60,40" />
            <path d="M70,70 L60,60" />
            <path d="M30,70 L40,60" />
            <path d="M50,0 L50,30" />
            <path d="M50,70 L50,100" />
            <path d="M10,25 L30,30" />
            <path d="M90,25 L70,30" />
            <path d="M10,75 L30,70" />
            <path d="M90,75 L70,70" />
          </g>

          {/* Animated elements */}
          {animated && (
            <>
              <motion.circle
                cx="50"
                cy="50"
                r="15"
                className="fill-red-900/30"
                animate={{
                  r: [15, 18, 15],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              <motion.circle
                cx="50"
                cy="50"
                r="5"
                className="fill-red-500"
                animate={{
                  r: [5, 6, 5],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </>
          )}

          {/* Static elements if not animated */}
          {!animated && (
            <>
              <circle cx="50" cy="50" r="15" className="fill-red-900/30" />
              <circle cx="50" cy="50" r="5" className="fill-red-500" />
            </>
          )}

          {/* "A" letter */}
          <text
            x="50"
            y="55"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-red-600 font-bold text-5xl"
            style={{ fontFamily: "Orbitron" }}
          >
            S
          </text>
        </svg>

        {/* Glitch effect */}
        {animated && (
          <>
            <motion.div
              className="absolute inset-0 bg-red-500/10"
              animate={{
                opacity: [0, 0.2, 0],
              }}
              transition={{
                duration: 0.2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 5,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute inset-0 bg-blue-500/10 mix-blend-screen"
              style={{
                clipPath: "polygon(0% 30%, 100% 30%, 100% 70%, 0% 70%)",
              }}
              animate={{
                x: [-2, 2, -2],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 0.1,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
            />
          </>
        )}
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 right-0 w-1 h-1 bg-red-500"></div>
      <div className="absolute bottom-0 left-0 w-1 h-1 bg-red-500"></div>

      {/* Scan line */}
      {animated && (
        <motion.div
          className="absolute inset-0 h-1 bg-red-500/20 overflow-hidden"
          animate={{
            y: ["-100%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      )}
    </div>
  );
}
