"use client"

import { useState } from "react"
import { ArrowUpRight, Copy, Check, Send, ChevronDown, ChevronUp } from "lucide-react"

export function Contact() {
  const [copied, setCopied] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formState, setFormState] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const emailAddress = "g4uforlife@gmail.com"

  const handleCopy = () => {
    navigator.clipboard.writeText(emailAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formState.email || !formState.message) return

    setStatus("submitting")
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      })
      if (res.ok) {
        setStatus("success")
        setFormState({ name: "", email: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section className="py-12 border-t border-border">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-base sm:text-lg font-semibold tracking-tight text-foreground">
            Have an interesting problem?
          </h2>
          <p className="text-sm text-foreground/90 font-medium">
            Let&apos;s talk.
          </p>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl">
          I&apos;m always open to discussing new AI systems, technical challenges, open-source initiatives, or engineering roles.
        </p>

        {/* Primary Links */}
        <div className="pt-1 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <a
            href={`mailto:${emailAddress}`}
            className="text-foreground hover:text-accent font-medium inline-flex items-center gap-1 group transition-colors"
          >
            <span>Email me</span>
            <span className="text-muted-foreground font-normal">({emailAddress})</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          <button
            onClick={handleCopy}
            className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 px-2.5 py-1 rounded bg-secondary border border-border transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-accent" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy email</span>
              </>
            )}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm pt-1">
          <a
            href="https://github.com/yab-g4u"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 group transition-colors"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          <a
            href="https://www.linkedin.com/in/yeabsera-sisay-b5615b240"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 group transition-colors"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          <button
            onClick={() => setShowForm(!showForm)}
            className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors ml-auto"
          >
            <span>{showForm ? "Hide form" : "Send quick note"}</span>
            {showForm ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>

        {/* Minimal Collapsible Message Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="p-5 rounded-lg bg-secondary/30 border border-border space-y-4 animate-in fade-in duration-150 mt-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                placeholder="Name"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full px-3 py-2 rounded bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent font-sans"
              />
              <input
                type="email"
                required
                placeholder="Email address"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full px-3 py-2 rounded bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent font-sans"
              />
            </div>

            <textarea
              required
              rows={3}
              placeholder="Your message or project scope..."
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              className="w-full px-3 py-2 rounded bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent font-sans resize-none"
            />

            {status === "success" && (
              <div className="text-xs text-accent font-mono flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Message transmitted successfully!</span>
              </div>
            )}

            {status === "error" && (
              <div className="text-xs text-destructive font-mono">
                Error sending message. Please email directly at {emailAddress}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {status === "submitting" ? (
                <span>Sending...</span>
              ) : (
                <>
                  <Send className="w-3 h-3" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
