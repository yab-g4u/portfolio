"use client"

import { useEffect, useState } from "react"
import { Hero } from "@/components/hero"
import { Navigation } from "@/components/navigation"
import { LogicSection } from "@/components/logic-section"
import { NeuronsSection } from "@/components/neurons-section"
import { AchievementsSection } from "@/components/achievements-section"
import { ArchiveSection } from "@/components/archive-section"
import { SignalSection } from "@/components/signal-section"

const BOOT_COMPLETE_KEY = "portfolio_boot_complete"

export default function Portfolio() {
  const [bootComplete, setBootComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const hasBooted = localStorage.getItem(BOOT_COMPLETE_KEY)
    if (hasBooted === "true") {
      setBootComplete(true)
      setIsLoading(false)
    } else {
      setIsLoading(false)
      const timer = setTimeout(() => {
        setBootComplete(true)
        localStorage.setItem(BOOT_COMPLETE_KEY, "true")
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  if (isLoading) {
    return <div className="min-h-screen bg-black" />
  }

  if (!bootComplete) {
    return <div className="min-h-screen bg-black" />
  }

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="relative z-10">
        <Hero />

        <div id="logic" className="scroll-mt-20">
          <LogicSection />
        </div>

        <div id="neurons" className="scroll-mt-20">
          <NeuronsSection />
        </div>

        <div id="achievements" className="scroll-mt-20">
          <AchievementsSection />
        </div>

        <div id="archive" className="scroll-mt-20">
          <ArchiveSection />
        </div>

        <div id="signal" className="scroll-mt-20">
          <SignalSection />
        </div>
      </div>

      <Navigation />
    </main>
  )
}
