"use client"

import { useState } from "react"
import { Mail, Copy, Check, Send, Github, Download, ArrowUpRight, MessageSquare, ShieldCheck } from "lucide-react"

export function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const emailAddress = "yabkal12345@gmail.com"

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formState.email || !formState.message) return

    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      })

      if (res.ok) {
        setSubmitStatus("success")
        setFormState({ name: "", email: "", message: "" })
      } else {
        const data = await res.json().catch(() => ({}))
        setErrorMessage(data.error || "Failed to send message. Please reach out directly via email.")
        setSubmitStatus("error")
      }
    } catch (err) {
      setErrorMessage("Network error. Please email directly at yabkal12345@gmail.com")
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-zinc-950/60">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>06 // INITIATE TRANSMISSION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let&apos;s build something useful.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed">
            I&apos;m interested in ambitious problems involving AI, automation, and real-world systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Direct Connect & Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-5">
              <div className="space-y-1">
                <span className="font-mono text-xs text-zinc-400 font-semibold uppercase">
                  DIRECT EMAIL
                </span>
                <div className="text-lg font-mono font-bold text-white truncate">
                  {emailAddress}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopyEmail}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-zinc-800 text-zinc-200 hover:text-white hover:bg-zinc-700 text-xs font-mono font-medium transition-colors"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Copied to clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy email</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${emailAddress}`}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-md bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-mono font-bold transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send email</span>
                </a>
              </div>
            </div>

            {/* Other Profiles & Résumé */}
            <div className="space-y-3">
              <a
                href="https://github.com/yab-g4u"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/60 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-zinc-800 text-zinc-200">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">GitHub Profile</div>
                    <div className="text-xs font-mono text-zinc-400">@yab-g4u</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
              </a>

              <a
                href="/cv/YEABSERA-SISAY.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/60 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-zinc-800 text-emerald-400">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Curriculum Vitae / Résumé</div>
                    <div className="text-xs font-mono text-zinc-400">PDF · Verified Experience</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-5 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-zinc-300">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>DIRECT DISPATCH FORM</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">256-BIT ENCRYPTION</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-mono text-zinc-300">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Your name or organization"
                    className="w-full px-3.5 py-2.5 rounded-md bg-zinc-950 border border-zinc-800 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-mono text-zinc-300">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full px-3.5 py-2.5 rounded-md bg-zinc-950 border border-zinc-800 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-mono text-zinc-300">
                  Message / Project Scope
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell me about your problem, team, or opportunity..."
                  className="w-full px-3.5 py-2.5 rounded-md bg-zinc-950 border border-zinc-800 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 font-sans resize-none"
                />
              </div>

              {submitStatus === "success" && (
                <div className="p-3 rounded-md bg-emerald-950/40 border border-emerald-800 text-xs font-mono text-emerald-300 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Message dispatched successfully! I will respond promptly.</span>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-3 rounded-md bg-rose-950/40 border border-rose-800 text-xs font-mono text-rose-300">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-white text-zinc-950 hover:bg-zinc-200 disabled:opacity-50 text-xs font-mono font-bold transition-all shadow-sm"
              >
                {isSubmitting ? (
                  <span>Transmitting...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Transmission</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
