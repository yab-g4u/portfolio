"use client"

import { Navigation } from "@/components/navigation"
import { Intro } from "@/components/intro"
import { WhatIBuild } from "@/components/what-i-build"
import { FavoriteSpotlight } from "@/components/favorite-spotlight"
import { SelectedWork } from "@/components/selected-work"
import { ExtendedProjects } from "@/components/extended-projects"
import { ExperienceAchievements } from "@/components/experience-achievements"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-emerald-500/20 selection:text-emerald-950 dark:selection:text-emerald-100 font-sans">
      {/* Top Minimal Navigation */}
      <Navigation />

      {/* Main Single Column Layout */}
      <main className="max-w-[720px] mx-auto px-6">
        <Intro />
        <WhatIBuild />
        <FavoriteSpotlight />
        <SelectedWork />
        <ExtendedProjects />
        <ExperienceAchievements />
        <About />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}
