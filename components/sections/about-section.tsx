'use client'

import { FadeIn } from '@/components/fade-in'
import { ContactButton } from '@/components/contact-button'
import Image from 'next/image'

export default function AboutSection() {
  const decorativeImages = [
    {
      src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
      size: 'w-[120px] sm:w-[160px] md:w-[210px]',
      position: 'top-[4%] left-[1%] sm:left-[2%] md:left-[4%]',
      delay: 0.1,
      x: -80,
    },
    {
      src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
      size: 'w-[100px] sm:w-[140px] md:w-[180px]',
      position: 'bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]',
      delay: 0.25,
      x: -80,
    },
    {
      src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
      size: 'w-[120px] sm:w-[160px] md:w-[210px]',
      position: 'top-[4%] right-[1%] sm:right-[2%] md:right-[4%]',
      delay: 0.15,
      x: 80,
    },
    {
      src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
      size: 'w-[130px] sm:w-[170px] md:w-[220px]',
      position: 'bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]',
      delay: 0.3,
      x: 80,
    },
  ]

  return (
    <section id="about" className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden">
      {/* Decorative Images */}
      {decorativeImages.map((img, idx) => (
        <FadeIn key={idx} delay={img.delay} x={img.x} y={0} duration={0.9}>
          <div className={`absolute ${img.position} hidden sm:block`}>
            <img
              src={img.src}
              alt="Decoration"
              className={`${img.size} object-contain`}
            />
          </div>
        </FadeIn>
      ))}

      <div className="relative z-10 max-w-2xl flex flex-col gap-10 sm:gap-14 md:gap-16">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight text-center">
            About Me
          </h2>
        </FadeIn>

        {/* Text Content */}
        <FadeIn delay={0.2} y={20}>
          <p className="text-[clamp(1rem,2vw,1.35rem)] font-medium text-center leading-relaxed text-[#D7E2EA]">
            With extensive experience in fullstack development and machine learning, i focus on creating innovative solutions, 
            designing impactful user experiences, and building scalable systems. i truly enjoy working with businesses and teams 
            that aim to stand out and present their best. Let&apos;s build something incredible together!
          </p>
        </FadeIn>

        {/* CTA Button */}
        <FadeIn delay={0.4} y={20}>
          <div className="flex justify-center gap-16 sm:gap-20 md:gap-24">
            <ContactButton />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
