'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FadeIn } from '@/components/ui/fade-in'
import { LiveProjectButton } from '@/components/ui/buttons'

const PROJECTS = [
  {
    number: '01',
    name: 'IDA',
    category: 'Hackathon Winner',
    type: 'Fullstack',
    images: {
      col1: [
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
      ],
      col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    },
  },
  {
    number: '02',
    name: 'MediScope',
    category: 'Blockchain Champion',
    type: 'Fullstack + ML',
    images: {
      col1: [
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
      ],
      col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    },
  },
  {
    number: '03',
    name: 'DataPilot',
    category: 'ML Dashboard',
    type: 'Fullstack + ML',
    images: {
      col1: [
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
      ],
      col2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    },
  },
]

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  return (
    <section id="projects" className="relative bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-5 sm:px-8 md:px-10 py-20">
      <div ref={containerRef} className="max-w-7xl mx-auto">
        {/* Heading */}
        <FadeIn delay={0} y={40} className="mb-20">
          <h2 className="hero-heading text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight">
            Project
          </h2>
        </FadeIn>

        {/* Projects with stacking effect */}
        <div className="space-y-12">
          {PROJECTS.map((project, index) => {
            const scale = useTransform(
              scrollYProgress,
              [0, 1],
              [1 - (PROJECTS.length - 1 - index) * 0.03, 1]
            )

            return (
              <motion.div
                key={index}
                style={{ scale }}
                className="sticky top-24 md:top-32 h-[85vh]"
              >
                <div className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 h-full flex flex-col justify-between">
                  {/* Top section */}
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <p className="text-[clamp(3rem,10vw,140px)] font-black text-[#D7E2EA] leading-none">
                        {project.number}
                      </p>
                      <div className="mt-4 space-y-2">
                        <p className="text-xs sm:text-sm md:text-base uppercase tracking-widest text-[#D7E2EA]/60">
                          {project.category}
                        </p>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-[#D7E2EA]">
                          {project.name}
                        </h3>
                      </div>
                    </div>
                    <LiveProjectButton />
                  </div>

                  {/* Bottom images grid */}
                  <div className="flex gap-4 h-[50%]">
                    {/* Left column - 2 stacked images (40%) */}
                    <div className="w-[40%] flex flex-col gap-4">
                      {project.images.col1.map((img, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden"
                        >
                          <img
                            src={img}
                            alt={`${project.name} ${i}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Right column - 1 tall image (60%) */}
                    <div className="w-[60%] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden">
                      <img
                        src={project.images.col2}
                        alt={`${project.name} main`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
