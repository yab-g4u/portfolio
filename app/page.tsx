import { Preloader } from "@/components/preloader"
import { PortfolioShell } from "@/components/portfolio-shell"
import { Navigation } from "@/components/navigation"
import { HeroRed } from "@/components/hero-red"
import { WhatIBuild } from "@/components/what-i-build"
import { FavoriteSpotlight } from "@/components/favorite-spotlight"
import { SelectedWork } from "@/components/selected-work"
import { WritingPreview } from "@/components/writing-preview"
import { ResearchLibrary } from "@/components/research-library"
import { ExperienceAchievements } from "@/components/experience-achievements"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { getAllPosts } from "@/lib/writing"

export default function Portfolio() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-clip">
      <Preloader />
      <Navigation />

      <PortfolioShell>
        <main>
          <HeroRed />
          <WhatIBuild />
          <FavoriteSpotlight />
          <SelectedWork />
          <WritingPreview posts={posts} />
          <ResearchLibrary />
          <ExperienceAchievements />
          <About />
          <Contact />
          <Footer />
        </main>
      </PortfolioShell>
    </div>
  )
}
