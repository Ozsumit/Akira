"use client";

import { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import { ChevronUp } from "lucide-react";

export default function BikeNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      // Show/hide based on scroll position
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Determine active section
      const sections = ["about", "projects", "skills", "contact"];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="relative">
        {/* Bike light effect */}
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-red-600/30 rounded-full blur-xl animate-pulse"></div>

        {/* Navigation container */}
        <div className="relative bg-black/80 border border-red-800/50 rounded-full p-2 backdrop-blur-sm">
          {/* Top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-red-900/30 text-red-400 hover:bg-red-800/50 hover:text-red-200 transition-all"
          >
            <ChevronUp className="h-5 w-5" />
          </button>

          {/* Section indicators */}
          <div className="mt-2 flex flex-col gap-2">
            {["home", "about", "projects", "skills", "contact"].map(
              (section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={cn(
                    "w-3 h-3 mx-auto rounded-full transition-all",
                    activeSection === section
                      ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.7)]"
                      : "bg-gray-600 hover:bg-gray-400"
                  )}
                  aria-label={`Scroll to ${section}`}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
