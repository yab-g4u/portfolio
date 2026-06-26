'use client'

import { useRef, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

interface MagnetProps {
  children: ReactNode
  padding?: number
  strength?: number
  activeTransition?: string
  inactiveTransition?: string
}

export function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY)

      if (distance < padding) {
        setIsActive(true)
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX)
        const distance2 = Math.min(distance, padding)
        const force = (padding - distance2) / strength

        setOffset({
          x: Math.cos(angle) * force,
          y: Math.sin(angle) * force,
        })
      } else {
        setIsActive(false)
        setOffset({ x: 0, y: 0 })
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [padding, strength])

  return (
    <div
      ref={ref}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: isActive ? activeTransition : inactiveTransition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}
