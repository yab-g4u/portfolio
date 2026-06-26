'use client'

import { useState } from 'react'
import { FadeIn } from '@/components/fade-in'

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

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
    } catch (err) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <section id="contact" className="bg-white min-h-screen flex items-center justify-center px-5 sm:px-8 md:px-10 py-20 md:py-32">
      <div className="w-full max-w-2xl">
        <FadeIn delay={0} y={40}>
          <h2 className="text-[clamp(3rem,12vw,160px)] font-black uppercase text-center text-[#0C0C0C] leading-none tracking-tight mb-16 md:mb-24">
            Get In Touch
          </h2>
        </FadeIn>

        <FadeIn delay={0.15} y={20}>
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            {/* Name */}
            <div>
              <label className="block text-sm md:text-base font-medium uppercase text-[#0C0C0C] mb-3 tracking-wider">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-6 py-4 md:py-5 bg-[#0C0C0C]/5 border-2 border-[#0C0C0C] text-[#0C0C0C] placeholder-[#0C0C0C]/40 font-medium rounded-xl focus:outline-none focus:border-[#0C0C0C]"
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm md:text-base font-medium uppercase text-[#0C0C0C] mb-3 tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-6 py-4 md:py-5 bg-[#0C0C0C]/5 border-2 border-[#0C0C0C] text-[#0C0C0C] placeholder-[#0C0C0C]/40 font-medium rounded-xl focus:outline-none focus:border-[#0C0C0C]"
                placeholder="your@email.com"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm md:text-base font-medium uppercase text-[#0C0C0C] mb-3 tracking-wider">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                className="w-full px-6 py-4 md:py-5 bg-[#0C0C0C]/5 border-2 border-[#0C0C0C] text-[#0C0C0C] placeholder-[#0C0C0C]/40 font-medium rounded-xl focus:outline-none focus:border-[#0C0C0C] resize-none"
                placeholder="Your message..."
              />
            </div>

            {/* Status Messages */}
            {status === 'success' && (
              <div className="p-4 bg-green-100 border-2 border-green-500 text-green-700 rounded-xl font-medium">
                Message sent successfully!
              </div>
            )}
            {status === 'error' && (
              <div className="p-4 bg-red-100 border-2 border-red-500 text-red-700 rounded-xl font-medium">
                Failed to send. Please try again.
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full px-8 py-4 md:py-5 bg-[#0C0C0C] text-white font-black uppercase tracking-widest rounded-xl hover:bg-[#0C0C0C]/90 transition-colors duration-300 disabled:opacity-50 text-base md:text-lg"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </FadeIn>

        {/* Contact Info */}
        <FadeIn delay={0.3} y={20}>
          <div className="mt-20 md:mt-28 pt-16 md:pt-20 border-t-2 border-[#0C0C0C]/20">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
              <div>
                <p className="text-xs md:text-sm uppercase tracking-widest text-[#0C0C0C]/60 font-medium mb-2">
                  Email
                </p>
                <a href="mailto:g4uforlife@gmail.com" className="text-base md:text-lg font-medium text-[#0C0C0C] hover:opacity-70 transition-opacity">
                  g4uforlife@gmail.com
                </a>
              </div>
              <div>
                <p className="text-xs md:text-sm uppercase tracking-widest text-[#0C0C0C]/60 font-medium mb-2">
                  GitHub
                </p>
                <a href="https://github.com/yab-g4u" target="_blank" rel="noopener noreferrer" className="text-base md:text-lg font-medium text-[#0C0C0C] hover:opacity-70 transition-opacity">
                  yab-g4u
                </a>
              </div>
              <div>
                <p className="text-xs md:text-sm uppercase tracking-widest text-[#0C0C0C]/60 font-medium mb-2">
                  LinkedIn
                </p>
                <a href="https://www.linkedin.com/in/yeabsera-sisay-b5615b240/" target="_blank" rel="noopener noreferrer" className="text-base md:text-lg font-medium text-[#0C0C0C] hover:opacity-70 transition-opacity">
                  Yeabsera Sisay
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
