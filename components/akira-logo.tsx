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

          {/* Custom Logo instead of "A" letter */}
          <g transform="translate(31, 30) scale(0.38)">
            {/* Main Logo with gradient fill */}
            <defs>
              <linearGradient
                id="logo-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#FF3300" />
                <stop offset="50%" stopColor="#FF0000" />
                <stop offset="100%" stopColor="#CC0000" />
              </linearGradient>

              <filter
                id="red-glow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feFlood
                  floodColor="#FF0000"
                  floodOpacity="0.7"
                  result="glow-color"
                />
                <feComposite
                  in="glow-color"
                  in2="blur"
                  operator="in"
                  result="colored-blur"
                />
                <feComposite
                  in="SourceGraphic"
                  in2="colored-blur"
                  operator="over"
                />
              </filter>

              <filter
                id="cyan-glow"
                x="-10%"
                y="-10%"
                width="120%"
                height="120%"
              >
                <feGaussianBlur stdDeviation="0.5" result="blur" />
                <feFlood
                  floodColor="#00FFFF"
                  floodOpacity="0.7"
                  result="glow-color"
                />
                <feComposite
                  in="glow-color"
                  in2="blur"
                  operator="in"
                  result="colored-blur"
                />
                <feComposite
                  in="SourceGraphic"
                  in2="colored-blur"
                  operator="over"
                />
              </filter>
            </defs>

            <path
              d="M107.473 322.807C107.473 276.836 144.853 238.176 190.792 236.61C236.703 235.045 274.09 271.157 274.11 317.147V356.061V407.133V561.723C274.11 583.174 290.273 604.486 313.933 603.151C337.116 601.843 351.876 580.524 351.876 559.073V397.874V353.411V192.213C351.876 146.222 389.236 107.562 435.195 105.995C481.153 104.429 518.513 140.542 518.513 186.533V347.731L557.393 346.406C603.304 344.841 640.711 380.953 640.711 426.944C640.711 472.908 603.351 511.594 557.393 513.161C511.434 514.727 474.074 478.587 474.074 432.623V393.709L396.308 396.36V557.558C396.308 603.529 358.948 642.209 312.99 643.775C267.058 645.341 229.671 609.209 229.671 563.238V402.039L190.792 403.365C144.853 404.93 107.473 368.798 107.473 322.807ZM229.671 318.662C229.651 297.211 212.208 280.35 190.792 281.08C169.355 281.811 151.912 299.841 151.912 321.292C151.912 342.77 169.355 359.632 190.792 358.901L229.671 357.576V318.662ZM474.074 188.048C474.074 166.596 456.631 149.735 435.195 150.466C413.752 151.196 396.308 169.247 396.308 190.698V351.896L474.074 349.246V188.048ZM518.513 392.195V431.108C518.513 452.56 535.957 469.421 557.393 468.691C578.829 467.96 596.272 449.91 596.272 428.458C596.272 407 578.829 390.139 557.393 390.869L518.513 392.195Z"
              fill="url(#logo-gradient)"
              filter="url(#red-glow)"
              transform="scale(0.08)"
            />

            {/* Energy Points */}
            <circle
              cx="15"
              cy="22"
              r="0.6"
              fill="#00FFFF"
              filter="url(#cyan-glow)"
            />
            <circle
              cx="35"
              cy="12"
              r="0.6"
              fill="#00FFFF"
              filter="url(#cyan-glow)"
            />
            <circle
              cx="45"
              cy="37"
              r="0.6"
              fill="#00FFFF"
              filter="url(#cyan-glow)"
            />
            <circle
              cx="25"
              cy="47"
              r="0.6"
              fill="#00FFFF"
              filter="url(#cyan-glow)"
            />

            {/* Data Stream Lines */}
            <path
              d="M15,22 L35,12"
              stroke="#00FFFF"
              strokeWidth="0.2"
              strokeDasharray="0.5,0.3"
              opacity="0.6"
            />
            <path
              d="M35,12 L45,37"
              stroke="#00FFFF"
              strokeWidth="0.2"
              strokeDasharray="0.5,0.3"
              opacity="0.6"
            />
            <path
              d="M45,37 L25,47"
              stroke="#00FFFF"
              strokeWidth="0.2"
              strokeDasharray="0.5,0.3"
              opacity="0.6"
            />
            <path
              d="M25,47 L15,22"
              stroke="#00FFFF"
              strokeWidth="0.2"
              strokeDasharray="0.5,0.3"
              opacity="0.6"
            />
          </g>
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
