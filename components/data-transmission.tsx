"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AkiraButton from "../components/akira-button";
import PowerIndicator from "../components/power-indicator";

export default function DataTransmission() {
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmissionProgress, setTransmissionProgress] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    if (isTransmitting) {
      const interval = setInterval(() => {
        setTransmissionProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsTransmitting(false);
              setTransmissionProgress(0);
            }, 1000);
            return 100;
          }
          return prev + 5;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isTransmitting]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTransmitting(true);
    // In a real app, you would send the form data to your backend here
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-r from-red-600 to-blue-600 opacity-20 blur-xl rounded-lg"></div>

      <div className="relative border-2 border-red-800/70 bg-black/80 rounded-lg overflow-hidden">
        {/* Terminal header */}
        <div className="bg-gradient-to-r from-red-900/50 to-black border-b-2 border-red-800/50 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PowerIndicator active={true} />
            <div className="text-sm font-mono text-red-400">
              TRANSMISSION.TERMINAL
            </div>
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
        </div>

        {/* Radar display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    IDENTIFIER
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-900/50 border-2 border-red-900/30 rounded-md p-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-mono"
                    placeholder="ENTER NAME"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    COMMUNICATION CHANNEL
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-900/50 border-2 border-red-900/30 rounded-md p-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-mono"
                    placeholder="ENTER EMAIL"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  TRANSMISSION SUBJECT
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border-2 border-red-900/30 rounded-md p-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-mono"
                  placeholder="ENTER SUBJECT"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  MESSAGE DATA
                </label>
                <textarea
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border-2 border-red-900/30 rounded-md p-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-mono"
                  placeholder="ENTER MESSAGE"
                  required
                ></textarea>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500 font-mono">
                  {isTransmitting ? (
                    <span className="text-green-400">
                      TRANSMISSION IN PROGRESS: {transmissionProgress}%
                    </span>
                  ) : (
                    <span>READY TO TRANSMIT</span>
                  )}
                </div>
                <AkiraButton
                  variant="primary"
                  onClick={handleSubmit}
                  disabled={isTransmitting}
                >
                  {isTransmitting ? "TRANSMITTING..." : "TRANSMIT MESSAGE"}
                </AkiraButton>
              </div>
            </form>
          </div>

          <div className="relative h-64 md:h-auto">
            <div className="absolute inset-0 border-2 border-red-800/50 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-black">
                {/* Radar animation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Radar circles */}
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full border border-red-800/50"
                      style={{
                        width: `${(i + 1) * 25}%`,
                        height: `${(i + 1) * 25}%`,
                      }}
                    ></div>
                  ))}

                  {/* Radar sweep */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-[150%] h-1 bg-gradient-to-r from-red-500/0 via-red-500/70 to-red-500/0 origin-left"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    style={{ transformOrigin: "0% 50%" }}
                  ></motion.div>

                  {/* Center point */}
                  <div className="absolute w-4 h-4 rounded-full bg-red-500 animate-ping"></div>
                  <div className="absolute w-2 h-2 rounded-full bg-red-500"></div>

                  {/* Random blips */}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full bg-green-500"
                      initial={{
                        x: Math.random() * 100 - 50,
                        y: Math.random() * 100 - 50,
                        opacity: 0,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 1.5,
                        repeatDelay: Math.random() * 5,
                      }}
                    ></motion.div>
                  ))}
                </div>

                {/* Grid lines */}
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={`h-${i}`}
                      className="w-full h-px bg-red-900/30"
                    ></div>
                  ))}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={`v-${i}`}
                      className="h-full w-px bg-red-900/30"
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Status indicators */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="text-xs font-mono text-green-400">
                SIGNAL STRENGTH: OPTIMAL
              </div>
              <div className="text-xs font-mono text-blue-400">
                ENCRYPTION: ENABLED
              </div>
              <div className="text-xs font-mono text-red-400">
                STATUS: {isTransmitting ? "TRANSMITTING" : "STANDBY"}
              </div>
            </div>
          </div>
        </div>

        {/* Terminal footer */}
        <div className="bg-gradient-to-r from-black to-red-900/50 border-t-2 border-red-800/50 p-3 flex items-center justify-between text-xs font-mono text-gray-500">
          <div>SYSTEM: ONLINE</div>
          <div>PING: 23MS</div>
          <div>UPTIME: 99.9%</div>
        </div>

        {/* Transmission progress overlay */}
        {isTransmitting && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="max-w-md w-full p-6">
              <div className="text-center mb-4">
                <div className="text-xl font-bold text-red-500 mb-2">
                  TRANSMITTING MESSAGE
                </div>
                <div className="text-sm text-gray-400">
                  Please wait while your message is being encrypted and
                  transmitted...
                </div>
              </div>

              <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-gradient-to-r from-red-600 to-blue-600 rounded-full relative"
                  style={{ width: `${transmissionProgress}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>

              <div className="text-center text-sm font-mono text-red-400">
                {transmissionProgress}% COMPLETE
              </div>

              {transmissionProgress === 100 && (
                <div className="text-center mt-4 text-green-500">
                  TRANSMISSION COMPLETE
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
