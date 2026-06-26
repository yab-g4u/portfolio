'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const images = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
]

export default function MarqueeSection() {
  const [offset, setOffset] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const sectionTop = sectionRef.current.getBoundingClientRect().top
      const scrollOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3

      setOffset(scrollOffset - 200)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const Row = ({ images, reverse }: { images: string[]; reverse: boolean }) => (
    <div className="flex gap-3 mb-3" style={{ willChange: 'transform' }}>
      {[...Array(3)].map((_, groupIdx) =>
        images.map((img, imgIdx) => (
          <motion.div
            key={`${groupIdx}-${imgIdx}`}
            style={{
              transform: reverse
                ? `translateX(${-(offset - 200)}px)`
                : `translateX(${offset - 200}px)`,
            }}
            className="flex-shrink-0 w-[420px] h-[270px] rounded-2xl overflow-hidden"
          >
            <img
              src={img}
              alt={`Project ${groupIdx}-${imgIdx}`}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))
      )}
    </div>
  )

  return (
    <section ref={sectionRef} className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 px-6 md:px-10">
      <Row images={images.slice(0, 11)} reverse={false} />
      <Row images={images.slice(11)} reverse={true} />
    </section>
  )
}
