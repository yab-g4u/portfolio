'use client'

import { FadeIn } from '@/components/fade-in'
import { ContactButton } from '@/components/contact-button'
import { Magnet } from '@/components/magnet'

export default function HeroSection() {
  return (
    <section className="relative h-screen flex flex-col overflow-x-clip px-6 md:px-10">
      {/* Navbar */}
      <FadeIn delay={0} y={-20}>
        <nav className="flex justify-between items-center pt-6 md:pt-8">
          <div className="flex gap-8 md:gap-12 lg:gap-16">
            {['About', 'Projects', 'Services', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm md:text-lg lg:text-[1.4rem] font-medium uppercase tracking-wider text-[#D7E2EA] hover:opacity-70 transition-opacity duration-200"
              >
                {link}
              </a>
            ))}
          </div>
        </nav>
      </FadeIn>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Heading */}
        <div className="overflow-hidden mt-6 sm:mt-4 md:-mt-5">
          <FadeIn delay={0.15} y={40}>
            <h1 className="hero-heading text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] font-black uppercase tracking-tight leading-none whitespace-nowrap">
              Hi, i{'&apos;'}m Yeabsera
            </h1>
          </FadeIn>
        </div>

        {/* Bottom Bar */}
        <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10">
          <FadeIn delay={0.35} y={20}>
            <p className="text-[clamp(0.75rem,1.4vw,1.5rem)] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px] text-[#D7E2EA]">
              Neural architect & fullstack engineer driven by crafting striking and unforgettable projects
            </p>
          </FadeIn>

          <FadeIn delay={0.5} y={20}>
            <ContactButton />
          </FadeIn>
        </div>
      </div>

      {/* Portrait - Centered */}
      <FadeIn delay={0.6} y={30}>
        <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 sm:top-auto -translate-y-1/2 sm:translate-y-0 sm:bottom-0">
          <Magnet padding={150} strength={3}>
            <div className="relative w-full aspect-square bg-gradient-to-br from-[#646973] to-[#BBCCD7] rounded-2xl overflow-hidden">
              {/* Placeholder for portrait - neural pattern */}
              <svg
                className="w-full h-full"
                viewBox="0 0 300 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="150" cy="150" r="140" fill="url(#grad)" opacity="0.1" />
                <circle cx="150" cy="150" r="100" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.2" />
                <circle cx="150" cy="150" r="70" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                <defs>
                  <radialGradient id="grad">
                    <stop offset="0%" stopColor="#D7E2EA" />
                    <stop offset="100%" stopColor="#646973" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </Magnet>
        </div>
      </FadeIn>
    </section>
  )
}
