"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { cn } from "../lib/utils";

interface NeonTextProps {
  children: React.ReactNode;
  color?: "red" | "blue" | "purple";
  className?: string;
}

export default function NeonText({
  children,
  color = "red",
  className,
}: NeonTextProps) {
  const [flicker, setFlicker] = useState(false);

  useEffect(() => {
    const flickerInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        setFlicker(true);
        setTimeout(() => setFlicker(false), 150);
      }
    }, 500);

    return () => clearInterval(flickerInterval);
  }, []);

  const getColorClasses = () => {
    switch (color) {
      case "red":
        return "text-red-500 shadow-red-500/50";
      case "blue":
        return "text-blue-500 shadow-blue-500/50";
      case "purple":
        return "text-purple-500 shadow-purple-500/50";
      default:
        return "text-red-500 shadow-red-500/50";
    }
  };

  return (
    <span
      className={cn(
        "relative inline-block transition-all duration-300",
        flicker ? "opacity-80" : "opacity-100",
        getColorClasses(),
        "text-shadow-neon",
        className
      )}
      style={{
        textShadow: flicker
          ? "none"
          : `0 0 5px currentColor, 0 0 10px currentColor, 0 0 20px currentColor`,
      }}
    >
      {children}
    </span>
  );
}
