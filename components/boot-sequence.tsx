"use client"

import { useEffect, useState } from "react"

const bootSteps = [
  { label: "KERNEL_INIT", status: "OK", delay: 300 },
  { label: "LOADING_NEURAL_CORE", status: "OK", delay: 500 },
  { label: "ML_MODELS_LOADED", status: "100%", delay: 700 },
  { label: "FULLSTACK_MODULES", status: "READY", delay: 900 },
  { label: "CONNECTING_TO_LOGIC", status: "OK", delay: 1100 },
  { label: "SYSTEM_ONLINE", status: "✓", delay: 1300 },
]

export function BootSequence() {
  const [visibleSteps, setVisibleSteps] = useState<number>(0)

  useEffect(() => {
    bootSteps.forEach((step, index) => {
      setTimeout(() => {
        setVisibleSteps(index + 1)
      }, step.delay)
    })
  }, [])

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center font-mono z-50">
      <div className="w-full max-w-2xl px-8 space-y-2">
        <div className="text-white text-sm mb-8 tracking-wider">[SYSTEM BOOT SEQUENCE v2.1.0]</div>

        {bootSteps.slice(0, visibleSteps).map((step, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-white text-sm animate-in fade-in duration-100"
          >
            <span className="tracking-wide">
              {`[${String(index + 1).padStart(2, "0")}]`} {step.label}
            </span>
            <span className="text-white font-bold">...{step.status}</span>
          </div>
        ))}

        {visibleSteps === bootSteps.length && (
          <div className="mt-8 text-center animate-in fade-in duration-500">
            <div className="inline-block border border-white px-6 py-2 text-white">INITIALIZATION COMPLETE</div>
          </div>
        )}
      </div>
    </div>
  )
}
