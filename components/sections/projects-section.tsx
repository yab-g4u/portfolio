'use client'

import { FadeIn } from '@/components/fade-in'
import { LiveProjectButton } from '@/components/live-project-button'

const projects = [
  {
    number: '01',
    name: 'IDA Platform',
    category: 'AI Agent Integration',
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
    name: 'DataPilot',
    category: 'ML Dashboard',
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
    name: 'MediScope',
    category: 'Healthcare Tech',
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
  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative py-20 sm:py-24 md:py-32 px-5 sm:px-8 md:px-10"
    >
      {/* Heading */}
      <FadeIn delay={0} y={40}>
        <h2 className="hero-heading text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight mb-20">
          Projects
        </h2>
      </FadeIn>

      {/* Projects Grid */}
      <div className="space-y-12 md:space-y-16">
        {projects.map((project, idx) => (
          <FadeIn key={idx} delay={idx * 0.15} y={30}>
            <div className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8">
              {/* Top Row */}
              <div className="flex items-center justify-between gap-4 mb-8 md:mb-12 pb-8 md:pb-12 border-b border-[#D7E2EA]/20">
                <div className="flex flex-col gap-2">
                  <span className="text-[clamp(2rem,8vw,120px)] font-black text-[#D7E2EA]">
                    {project.number}
                  </span>
                  <span className="text-xs md:text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-medium">
                    {project.category}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-[clamp(1.5rem,4vw,3rem)] font-black uppercase text-[#D7E2EA] leading-tight">
                    {project.name}
                  </h3>
                </div>
                <LiveProjectButton />
              </div>

              {/* Image Grid */}
              <div className="grid grid-cols-[40%_60%] gap-4 md:gap-6">
                {/* Left Column */}
                <div className="flex flex-col gap-4 md:gap-6">
                  <img
                    src={project.images.col1[0]}
                    alt={`${project.name} 1`}
                    className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover"
                    style={{ height: 'clamp(130px, 16vw, 230px)' }}
                  />
                  <img
                    src={project.images.col1[1]}
                    alt={`${project.name} 2`}
                    className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover"
                    style={{ height: 'clamp(160px, 22vw, 340px)' }}
                  />
                </div>

                {/* Right Column */}
                <img
                  src={project.images.col2}
                  alt={`${project.name} main`}
                  className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] object-cover h-full"
                />
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
