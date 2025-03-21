"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface CityScapeProps {
  className?: string
}

export default function CityScape({ className }: CityScapeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Building class
    class Building {
      x: number
      width: number
      height: number
      color: string
      windows: { x: number; y: number; width: number; height: number; lit: boolean }[]

      constructor(x: number, width: number, height: number) {
        this.x = x
        this.width = width
        this.height = height
        this.color = `rgb(${10 + Math.random() * 20}, ${10 + Math.random() * 20}, ${20 + Math.random() * 30})`
        this.windows = []

        // Create windows
        const windowWidth = 3
        const windowHeight = 5
        const windowSpacing = 8

        for (let wx = 5; wx < this.width - 5; wx += windowSpacing) {
          for (let wy = 10; wy < this.height - 20; wy += windowSpacing) {
            if (Math.random() > 0.3) {
              this.windows.push({
                x: wx,
                y: wy,
                width: windowWidth,
                height: windowHeight,
                lit: Math.random() > 0.5,
              })
            }
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D, y: number) {
        // Draw building
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, y - this.height, this.width, this.height)

        // Draw windows
        this.windows.forEach((window) => {
          if (window.lit) {
            // Window glow
            ctx.fillStyle = "rgba(255, 200, 50, 0.2)"
            ctx.fillRect(this.x + window.x - 1, y - this.height + window.y - 1, window.width + 2, window.height + 2)

            // Window
            ctx.fillStyle = "rgba(255, 200, 50, 0.8)"
            ctx.fillRect(this.x + window.x, y - this.height + window.y, window.width, window.height)
          } else {
            ctx.fillStyle = "rgba(50, 50, 70, 0.8)"
            ctx.fillRect(this.x + window.x, y - this.height + window.y, window.width, window.height)
          }
        })
      }

      // Randomly toggle window lights
      updateWindows() {
        if (Math.random() > 0.99) {
          const windowIndex = Math.floor(Math.random() * this.windows.length)
          if (windowIndex < this.windows.length) {
            this.windows[windowIndex].lit = !this.windows[windowIndex].lit
          }
        }
      }
    }

    // Create buildings
    const buildings: Building[] = []
    const groundY = canvas.height * 0.8

    const createSkyline = () => {
      buildings.length = 0
      let x = 0

      while (x < canvas.width) {
        const width = 30 + Math.random() * 80
        const height = 100 + Math.random() * 200

        buildings.push(new Building(x, width, height))
        x += width - 5 // Slight overlap
      }
    }

    createSkyline()
    window.addEventListener("resize", createSkyline)

    // Draw function
    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw sky gradient
      const skyGradient = ctx.createLinearGradient(0, 0, 0, groundY)
      skyGradient.addColorStop(0, "rgb(5, 5, 20)")
      skyGradient.addColorStop(1, "rgb(40, 10, 30)")
      ctx.fillStyle = skyGradient
      ctx.fillRect(0, 0, canvas.width, groundY)

      // Draw distant glow
      ctx.fillStyle = "rgba(255, 50, 50, 0.1)"
      ctx.beginPath()
      ctx.ellipse(canvas.width / 2, groundY - 50, canvas.width / 3, 60, 0, 0, Math.PI * 2)
      ctx.fill()

      // Draw buildings
      buildings.forEach((building) => {
        building.draw(ctx, groundY)
        building.updateWindows()
      })

      // Draw ground
      const groundGradient = ctx.createLinearGradient(0, groundY, 0, canvas.height)
      groundGradient.addColorStop(0, "rgb(20, 20, 30)")
      groundGradient.addColorStop(1, "rgb(5, 5, 10)")
      ctx.fillStyle = groundGradient
      ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY)

      // Draw grid lines on ground
      ctx.strokeStyle = "rgba(255, 0, 100, 0.2)"
      ctx.lineWidth = 1

      // Horizontal grid lines
      for (let y = groundY; y < canvas.height; y += 20) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Vertical grid lines
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath()
        ctx.moveTo(x, groundY)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("resize", createSkyline)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className={cn("absolute inset-0 w-full h-full", className)} />
}

