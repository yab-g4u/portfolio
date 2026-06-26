'use client'

import { useState } from 'react'
import { FadeIn } from '@/components/ui/fade-in'

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setStatus('idle'), 3000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch (error) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <FadeIn delay={0} y={40} className="mb-20">
          <h2 className="hero-heading text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight">
            Get In Touch
          </h2>
        </FadeIn>

        {/* Contact info */}
        <div className="space-y-8 mb-16 sm:mb-20 md:mb-28">
          <FadeIn delay={0.1} y={20}>
            <div>
              <p className="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 mb-2">Email</p>
              <a
                href="mailto:g4uforlife@gmail.com"
                className="text-lg sm:text-xl md:text-2xl text-[#D7E2EA] hover:opacity-70 transition-opacity"
              >
                g4uforlife@gmail.com
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} y={20}>
            <div>
              <p className="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 mb-2">Socials</p>
              <div className="flex gap-6">
                <a
                  href="https://github.com/yab-g4u"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D7E2EA] hover:opacity-70 transition-opacity uppercase tracking-wider text-sm"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/yeabsera-sisay-b5615b240/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D7E2EA] hover:opacity-70 transition-opacity uppercase tracking-wider text-sm"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Contact Form */}
        <FadeIn delay={0.3} y={20}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 mb-3">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full bg-transparent border-b-2 border-[#D7E2EA] text-[#D7E2EA] placeholder-[#D7E2EA]/40 pb-3 focus:outline-none focus:border-opacity-100 transition-all"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 mb-3">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full bg-transparent border-b-2 border-[#D7E2EA] text-[#D7E2EA] placeholder-[#D7E2EA]/40 pb-3 focus:outline-none focus:border-opacity-100 transition-all"
                placeholder="Your email"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 mb-3">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                className="w-full bg-transparent border-b-2 border-[#D7E2EA] text-[#D7E2EA] placeholder-[#D7E2EA]/40 pb-3 focus:outline-none focus:border-opacity-100 transition-all resize-none"
                placeholder="Your message"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest hover:bg-[#D7E2EA]/10 transition-all disabled:opacity-50"
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="text-green-400 text-sm">Message sent successfully!</p>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-sm">Failed to send message. Please try again.</p>
            )}
          </form>
        </FadeIn>
      </div>
    </section>
  )
}
