'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const IMAGES = [
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
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const sectionTop = ref.current.offsetTop
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const calculatedOffset = (scrollY - sectionTop + viewportHeight) * 0.3
      setOffset(calculatedOffset)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const row1Images = [...IMAGES.slice(0, 11), ...IMAGES.slice(0, 11), ...IMAGES.slice(0, 11)]
  const row2Images = [...IMAGES.slice(11), ...IMAGES.slice(11), ...IMAGES.slice(11)]

  return (
    <section ref={ref} className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 px-5 sm:px-8 md:px-10">
      <div className="flex flex-col gap-3">
        {/* Row 1 - moves RIGHT */}
        <motion.div
          style={{
            transform: `translateX(${offset - 200}px)`,
            willChange: 'transform',
          }}
          className="flex gap-3"
        >
          {row1Images.map((src, i) => (
            <div key={i} className="flex-shrink-0 w-[420px] h-[270px] rounded-2xl overflow-hidden">
              <img
                src={src}
                alt={`Gallery ${i}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>

        {/* Row 2 - moves LEFT */}
        <motion.div
          style={{
            transform: `translateX(${-(offset - 200)}px)`,
            willChange: 'transform',
          }}
          className="flex gap-3"
        >
          {row2Images.map((src, i) => (
            <div key={i} className="flex-shrink-0 w-[420px] h-[270px] rounded-2xl overflow-hidden">
              <img
                src={src}
                alt={`Gallery ${i}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
