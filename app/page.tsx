'use client'

import HeroSection from '@/components/sections/hero-section'
import MarqueeSection from '@/components/sections/marquee-section'
import AboutSection from '@/components/sections/about-section'
import ServicesSection from '@/components/sections/services-section'
import ProjectsSection from '@/components/sections/projects-section'
import ContactSection from '@/components/sections/contact-section'

export default function Portfolio() {
  return (
    <main className="bg-[#0C0C0C] overflow-x-clip">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  )
}
