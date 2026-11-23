"use client"

import { useEffect, useRef, useState } from "react"

const LETTERS = "YEABSERA".split("")
const PERM_X = [
  [5, 2, 7, 0, 3, 6, 1, 4],
  [2, 6, 0, 5, 7, 1, 4, 3],
  [1, 0, 3, 2, 5, 4, 7, 6],
  [0, 1, 2, 3, 4, 5, 6, 7],
]
const PERM_Y = [
  [-55, 0, -30, 0, -45, 0, -20, 0],
  [0, -40, 0, -25, 0, -35, 0, -10],
  [0, 0, -12, 0, 0, -8, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
]

export function Preloader() {
  const [step, setStep] = useState(0)
  const [exiting, setExiting] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [done, setDone] = useState(false)
  const bootedRef = useRef(false)

  useEffect(() => {
    setMounted(true)

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let alreadyBooted = false
    try {
      alreadyBooted = sessionStorage.getItem("ys_preloaded") === "1"
    } catch {
      // ignore storage restrictions
    }

    const finish = () => {
      if (bootedRef.current) return
      bootedRef.current = true
      document.body.classList.add("ready")
      try {
        sessionStorage.setItem("ys_preloaded", "1")
      } catch {
        // ignore
      }
      setExiting(true)
      window.setTimeout(() => {
        setDone(true)
      }, 950)
    }

    if (reducedMotion || alreadyBooted) {
      document.body.classList.add("ready")
      setDone(true)
      return
    }

    const interval = window.setInterval(() => {
      setStep((prev) => {
        if (prev < 3) return prev + 1
        window.clearInterval(interval)
        return prev
      })
    }, 520)

    const bootTimer = window.setTimeout(finish, 2350)
    const failsafeTimer = window.setTimeout(finish, 4200)

    return () => {
      window.clearInterval(interval)
      window.clearTimeout(bootTimer)
      window.clearTimeout(failsafeTimer)
    }
  }, [])

  const handleSkip = () => {
    if (bootedRef.current) return
    bootedRef.current = true
    document.body.classList.add("ready")
    try {
      sessionStorage.setItem("ys_preloaded", "1")
    } catch {
      // ignore
    }
    setExiting(true)
    window.setTimeout(() => setDone(true), 900)
  }

  if (!mounted || done) return null

  return (
    <div
      id="skl"
      className={exiting ? "out" : undefined}
      onClick={handleSkip}
      aria-hidden="true"
    >
      <div className="pn">
        <div id="lt">
          {LETTERS.map((char, idx) => (
            <span
              key={idx}
              style={
                {
                  "--d": PERM_X[step][idx] - idx,
                  "--y": PERM_Y[step][idx],
                } as React.CSSProperties
              }
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
