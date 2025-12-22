"use client"

import { useEffect, useState, useRef } from "react"

interface AnimatedCounterProps {
  value: string
  duration?: number
}

export function AnimatedCounter({ value, duration = 2000 }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState("0")
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          animateValue()
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  const animateValue = () => {
    // Extract numeric part and suffix
    const numericMatch = value.match(/^(\d+(?:\.\d+)?)(.*)$/)
    if (!numericMatch) {
      setDisplayValue(value)
      return
    }

    const targetNumber = Number.parseFloat(numericMatch[1])
    const suffix = numericMatch[2] || ""
    const isDecimal = value.includes(".")
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = targetNumber * easeOut

      if (isDecimal) {
        setDisplayValue(current.toFixed(1) + suffix)
      } else {
        setDisplayValue(Math.floor(current).toString() + suffix)
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayValue(value)
      }
    }

    requestAnimationFrame(animate)
  }

  return (
    <div ref={ref} className="text-xl md:text-3xl font-bold mb-1 md:mb-2 tabular-nums">
      {displayValue}
    </div>
  )
}
