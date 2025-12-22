"use client"

import { useEffect, useRef, useCallback } from "react"

interface Node {
  x: number
  y: number
  baseX: number
  baseY: number
}

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])
  const mousePosRef = useRef({ x: -1000, y: -1000 })
  const isInteractingRef = useRef(false)
  const animationFrameRef = useRef<number>()

  const generateNodes = useCallback(() => {
    const nodes: Node[] = []
    const isMobile = window.innerWidth < 768
    const cols = isMobile ? 8 : 16
    const rows = isMobile ? 12 : 14
    const spacingX = window.innerWidth / (cols - 1)
    const spacingY = window.innerHeight / (rows - 1)

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * spacingX
        const y = j * spacingY
        nodes.push({
          x,
          y,
          baseX: x,
          baseY: y,
        })
      }
    }
    return nodes
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth * 2
      canvas.height = window.innerHeight * 2
      ctx.scale(2, 2)
      nodesRef.current = generateNodes()
    }

    const drawNeuralNetwork = () => {
      ctx.clearRect(0, 0, canvas.width / 2, canvas.height / 2)

      const nodes = nodesRef.current
      const mousePos = mousePosRef.current
      const isInteracting = isInteractingRef.current

      // Draw connections
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 1

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const otherNode = nodes[j]
          const dist = Math.hypot(node.x - otherNode.x, node.y - otherNode.y)

          if (dist < 120) {
            let opacity = 0.15

            if (isInteracting) {
              const midX = (node.x + otherNode.x) / 2
              const midY = (node.y + otherNode.y) / 2
              const mouseDistance = Math.hypot(midX - mousePos.x, midY - mousePos.y)

              if (mouseDistance < 200) {
                opacity = Math.max(0.15, 0.8 - mouseDistance / 250)
              }
            }

            ctx.beginPath()
            ctx.globalAlpha = opacity
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(otherNode.x, otherNode.y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      ctx.fillStyle = "#ffffff"
      nodes.forEach((node) => {
        let radius = 2
        let opacity = 0.4

        if (isInteracting) {
          const distance = Math.hypot(node.x - mousePos.x, node.y - mousePos.y)
          if (distance < 200) {
            radius = Math.max(2, 6 - distance / 50)
            opacity = Math.max(0.4, 1 - distance / 200)
          }
        }

        ctx.globalAlpha = opacity
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.globalAlpha = 1
    }

    const animate = () => {
      drawNeuralNetwork()
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY }
      isInteractingRef.current = true
    }

    const handleMouseLeave = () => {
      isInteractingRef.current = false
      mousePosRef.current = { x: -1000, y: -1000 }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mousePosRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        }
        isInteractingRef.current = true
      }
    }

    const handleTouchEnd = () => {
      isInteractingRef.current = false
      mousePosRef.current = { x: -1000, y: -1000 }
    }

    resize()
    animate()

    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("touchend", handleTouchEnd)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [generateNodes])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />

      <div className="relative z-10 text-center px-4 md:px-8 max-w-5xl">
        <div className="mb-6 md:mb-8 text-[10px] md:text-xs tracking-[0.3em] text-white/80 font-mono">
          {"// SYSTEM ARCHITECT"}
        </div>

        <h1
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 md:mb-6 text-balance"
          style={{ textShadow: "0 0 60px rgba(0,0,0,1), 0 0 30px rgba(0,0,0,1), 0 4px 20px rgba(0,0,0,0.8)" }}
        >
          YEABSERA SISAY
        </h1>

        <div
          className="text-base sm:text-lg md:text-2xl lg:text-3xl tracking-wider text-white/90 mb-8 md:mb-12"
          style={{ textShadow: "0 0 40px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.9)" }}
        >
          NEURAL ARCHITECT & FULLSTACK ENGINEER
        </div>

        <div className="mt-8 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-6 text-[10px] md:text-xs tracking-wider font-mono">
          <div className="border-2 border-white/60 bg-black/70 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 hover:bg-white/10 transition-colors">
            ML_CORE: ACTIVE
          </div>
          <div className="border-2 border-white/60 bg-black/70 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 hover:bg-white/10 transition-colors">
            STACK_READY: TRUE
          </div>
          <div className="border-2 border-white/60 bg-black/70 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 hover:bg-white/10 transition-colors">
            STATUS: ONLINE
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <span className="text-[10px] tracking-widest">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
