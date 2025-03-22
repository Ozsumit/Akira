"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "../lib/utils";

interface CursorBikeTrailProps {
  className?: string;
  intensity?: "low" | "medium" | "high";
  trailLength?: number;
  disabled?: boolean;
}

export default function CursorBikeTrail({
  className,
  intensity = "medium",
  trailLength = 10,
  disabled = false,
}: CursorBikeTrailProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [trailPoints, setTrailPoints] = useState<
    { x: number; y: number; id: number }[]
  >([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 1000, damping: 100 });
  const springY = useSpring(mouseY, { stiffness: 1000, damping: 100 });
  const idCounter = useRef(0);

  // Get intensity values
  const getIntensityValues = () => {
    switch (intensity) {
      case "low":
        return { opacity: 0.3, blur: "8px", size: "4px" };
      case "high":
        return { opacity: 0.8, blur: "16px", size: "8px" };
      default:
        return { opacity: 0.5, blur: "12px", size: "6px" };
    }
  };

  const { opacity, blur, size } = getIntensityValues();

  // Track mouse movement
  useEffect(() => {
    if (disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);

      // Add new point to trail
      const newPoint = {
        x: e.clientX,
        y: e.clientY,
        id: idCounter.current++,
      };

      setTrailPoints((prev) => {
        const newTrail = [...prev, newPoint];
        // Keep only the most recent points based on trailLength
        if (newTrail.length > trailLength) {
          return newTrail.slice(newTrail.length - trailLength);
        }
        return newTrail;
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, trailLength, disabled]);

  if (disabled) return null;

  return (
    <div className={cn("fixed inset-0 pointer-events-none z-50", className)}>
      {/* Main cursor glow */}
      <motion.div
        className="absolute rounded-full bg-red-500"
        style={{
          x: springX,
          y: springY,
          width: size,
          height: size,
          opacity: isVisible ? opacity : 0,
          boxShadow: `0 0 ${blur} ${blur} rgba(239, 68, 68, 0.8)`,
          filter: `blur(${Number.parseInt(size) / 2}px)`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Trail points */}
      {trailPoints.map((point, index) => {
        // Calculate size and opacity based on position in trail
        const pointSize = Number.parseInt(size) * (1 - index / trailLength);
        const pointOpacity = opacity * (1 - index / trailLength);

        return (
          <motion.div
            key={point.id}
            className="absolute rounded-full bg-red-500"
            initial={{ opacity: pointOpacity }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              left: point.x,
              top: point.y,
              width: `${pointSize}px`,
              height: `${pointSize}px`,
              boxShadow: `0 0 ${
                Number.parseInt(blur) * (1 - index / trailLength)
              }px ${
                Number.parseInt(blur) * (1 - index / trailLength)
              }px rgba(239, 68, 68, 0.8)`,
              filter: `blur(${pointSize / 2}px)`,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}

      {/* Bike trail effect */}
      {isVisible && (
        <motion.div
          className="absolute w-16 h-2 bg-red-500 origin-left"
          style={{
            x: springX,
            y: springY,
            opacity: opacity * 0.8,
            boxShadow: `0 0 15px 5px rgba(239, 68, 68, 0.7)`,
            filter: "blur(2px)",
            transform: "translate(0%, -50%)",
          }}
          animate={{
            scaleX: [0, 1],
            opacity: [0, opacity * 0.8, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 0.1,
          }}
        />
      )}

      {/* Particle effects */}
      {isVisible &&
        Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-red-400 rounded-full"
            style={{
              x: springX,
              y: springY,
            }}
            animate={{
              x: [springX.get(), springX.get() + (Math.random() - 0.5) * 50],
              y: [springY.get(), springY.get() + (Math.random() - 0.5) * 50],
              opacity: [1, 0],
              scale: [1, 0.5],
            }}
            transition={{
              duration: 0.8,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: Math.random() * 0.5,
              ease: "easeOut",
            }}
          />
        ))}
    </div>
  );
}
