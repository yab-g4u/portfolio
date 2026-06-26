'use client'

import { FadeIn } from '@/components/fade-in'

const services = [
  {
    number: '01',
    name: 'Fullstack Development',
    description: 'Building complete end-to-end applications with modern frameworks, databases, and deployment strategies for scalable, production-ready solutions.',
  },
  {
    number: '02',
    name: 'Machine Learning',
    description: 'Creating intelligent systems with advanced algorithms, neural networks, and data-driven insights for predictive analytics and automation.',
  },
  {
    number: '03',
    name: 'Data Engineering',
    description: 'Designing robust data pipelines, ETL processes, and analytics infrastructures that transform raw data into actionable intelligence.',
  },
  {
    number: '04',
    name: 'System Design',
    description: 'Architecting scalable, distributed systems with optimal performance, reliability, and maintainability for enterprise applications.',
  },
  {
    number: '05',
    name: 'Web Design',
    description: 'Designing clean, modern, and conversion-focused interfaces with attention to layout, typography, and user experience.',
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="bg-white pt-0 pb-20 sm:pb-24 md:pb-32">
      {/* Rounded Top */}
      <div className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-white pt-20 sm:pt-24 md:pt-32 px-5 sm:px-8 md:px-10">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2 className="text-[clamp(3rem,12vw,160px)] font-black uppercase text-center text-[#0C0C0C] leading-none tracking-tight mb-16 sm:mb-20 md:mb-28">
            Services
          </h2>
        </FadeIn>

        {/* Services List */}
        <div className="max-w-5xl mx-auto">
          {services.map((service, idx) => (
            <FadeIn key={idx} delay={idx * 0.1} y={20}>
              <div
                className="py-8 sm:py-10 md:py-12 flex gap-8 md:gap-12"
                style={{
                  borderBottom: idx < services.length - 1 ? '1px solid rgba(12, 12, 12, 0.15)' : 'none',
                }}
              >
                {/* Number */}
                <div className="flex-shrink-0">
                  <span className="text-[clamp(3rem,10vw,140px)] font-black text-[#0C0C0C]">
                    {service.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase text-[#0C0C0C] mb-4">
                    {service.name}
                  </h3>
                  <p className="text-[clamp(0.85rem,1.6vw,1.25rem)] font-light leading-relaxed max-w-2xl text-[#0C0C0C] opacity-60">
                    {service.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
