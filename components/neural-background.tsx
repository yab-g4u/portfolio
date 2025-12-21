"use client"

import { useEffect, useRef } from "react"

interface NeuralBackgroundProps {
  opacity?: number
  nodeCount?: number
  interactive?: boolean
}

export function NeuralBackground({ opacity = 0.15, nodeCount = 30, interactive = true }: NeuralBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePosRef = useRef({ x: -1000, y: -1000 })
  const isInteractingRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let nodes: { x: number; y: number }[] = []
    let animationFrame: number

    const resize = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width * 2
      canvas.height = rect.height * 2
      ctx.scale(2, 2)

      // Generate nodes within container bounds
      nodes = []
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
        })
      }
    }

    const draw = () => {
      const rect = container.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      ctx.strokeStyle = "#ffffff"
      ctx.fillStyle = "#ffffff"
      ctx.lineWidth = 1

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y)
          if (dist < 150) {
            let lineOpacity = opacity * (1 - dist / 150)

            if (interactive && isInteractingRef.current) {
              const midX = (nodes[i].x + nodes[j].x) / 2
              const midY = (nodes[i].y + nodes[j].y) / 2
              const mouseDist = Math.hypot(midX - mousePosRef.current.x, midY - mousePosRef.current.y)
              if (mouseDist < 100) {
                lineOpacity = Math.max(lineOpacity, 0.5 - mouseDist / 200)
              }
            }

            ctx.globalAlpha = lineOpacity
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        let radius = 1.5
        let nodeOpacity = opacity

        if (interactive && isInteractingRef.current) {
          const dist = Math.hypot(node.x - mousePosRef.current.x, node.y - mousePosRef.current.y)
          if (dist < 100) {
            radius = 3
            nodeOpacity = 0.8
          }
        }

        ctx.globalAlpha = nodeOpacity
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.globalAlpha = 1
      animationFrame = requestAnimationFrame(draw)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
      isInteractingRef.current = true
    }

    const handleMouseLeave = () => {
      isInteractingRef.current = false
    }

    resize()
    draw()

    window.addEventListener("resize", resize)
    if (interactive) {
      container.addEventListener("mousemove", handleMouseMove)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      window.removeEventListener("resize", resize)
      if (interactive) {
        container.removeEventListener("mousemove", handleMouseMove)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
      cancelAnimationFrame(animationFrame)
    }
  }, [opacity, nodeCount, interactive])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-auto">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
