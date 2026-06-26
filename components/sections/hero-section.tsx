'use client'

import Image from 'next/image'
import { FadeIn } from '@/components/ui/fade-in'
import { ContactButton } from '@/components/ui/buttons'
import { Magnet } from '@/components/ui/magnet'

export default function HeroSection() {
  return (
    <section className="h-screen flex flex-col overflow-x-clip px-6 md:px-10 pt-6 md:pt-8">
      {/* Navbar */}
      <FadeIn delay={0} y={-20}>
        <nav className="flex justify-between items-center text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]">
          <a href="#about" className="hover:opacity-70 transition-opacity duration-200">About</a>
          <a href="#services" className="hover:opacity-70 transition-opacity duration-200">Price</a>
          <a href="#projects" className="hover:opacity-70 transition-opacity duration-200">Projects</a>
          <a href="#contact" className="hover:opacity-70 transition-opacity duration-200">Contact</a>
        </nav>
      </FadeIn>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Heading */}
        <FadeIn delay={0.15} y={40} className="mt-6 sm:mt-4 md:-mt-5 overflow-hidden">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
            Hi, i&apos;m yeabsera
          </h1>
        </FadeIn>

        {/* Bottom bar */}
        <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10">
          {/* Left text */}
          <FadeIn delay={0.35} y={20}>
            <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px] text-[clamp(0.75rem,1.4vw,1.5rem)]">
              a fullstack & ml engineer driven by crafting striking and unforgettable projects
            </p>
          </FadeIn>

          {/* Right button */}
          <FadeIn delay={0.5} y={20}>
            <ContactButton />
          </FadeIn>
        </div>
      </div>

      {/* Portrait - Magnet effect */}
      <FadeIn delay={0.6} y={30} className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 z-10">
        <Magnet padding={150} strength={3} activeTransition="transform 0.3s ease-out" inactiveTransition="transform 0.6s ease-in-out">
          <div className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]">
            <Image
              src="/yeabsera-portrait.png"
              alt="Yeabsera portrait"
              width={520}
              height={600}
              priority
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </Magnet>
      </FadeIn>
    </section>
  )
}
