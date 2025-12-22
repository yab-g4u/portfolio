"use client"

import { useEffect, useState } from "react"
import { BootSequence } from "@/components/boot-sequence"
import { Hero } from "@/components/hero"
import { Navigation } from "@/components/navigation"
import { LogicSection } from "@/components/logic-section"
import { NeuronsSection } from "@/components/neurons-section"
import { ArchiveSection } from "@/components/archive-section"
import { SignalSection } from "@/components/signal-section"
import { AchievementsSection } from "@/components/achievements-section"
import { Terminal } from "@/components/terminal"
import { GridOverlay } from "@/components/grid-overlay"

const BOOT_COMPLETE_KEY = "portfolio_boot_complete"

export default function Portfolio() {
  const [bootComplete, setBootComplete] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("hero")
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
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [])

  // Show nothing while checking localStorage to prevent flash
  if (isLoading) {
    return <div className="min-h-screen bg-black" />
  }

  if (!bootComplete) {
    return <BootSequence />
  }

  return (
    <main className="relative min-h-screen bg-black text-white font-mono overflow-hidden">
      <GridOverlay />

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

      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <Terminal />
    </main>
  )
}
