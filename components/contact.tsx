"use client"

import { useState } from "react"
import {
  ArrowUpRight,
  Copy,
  Check,
  Send,
  Mail,
  Linkedin,
  Github,
  MapPin,
  Clock,
  Sparkles,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react"

interface ContactProps {
  isStandalone?: boolean
}

export function Contact({ isStandalone = false }: ContactProps) {
  const [copied, setCopied] = useState(false)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    botcheck: false,
  })
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")

  const emailAddress = "g4uforlife@gmail.com"
  const accessKey =
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
    "c3c6d568-6f27-47cf-b536-05da61d3df15"

  const handleCopy = () => {
    navigator.clipboard.writeText(emailAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const isEmailValid = !formState.email || validateEmail(formState.email)
  const isFormValid =
    formState.name.trim().length > 0 &&
    validateEmail(formState.email) &&
    formState.subject.trim().length > 0 &&
    formState.message.trim().length > 0

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Mark all as touched
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    })

    if (!isFormValid || formState.botcheck) {
      return
    }

    setStatus("submitting")
    setErrorMessage("")

    try {
      const emailSubject = formState.subject
        ? `Portfolio Contact — ${formState.subject}`
        : "Portfolio Contact Message"

      const payload = {
        access_key: accessKey,
        name: formState.name,
        email: formState.email,
        from_name: formState.name,
        subject: emailSubject,
        message: formState.message,
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus("success")
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
          botcheck: false,
        })
        setTouched({})
      } else {
        console.error("Web3Forms error response:", data)
        setStatus("error")
        setErrorMessage(
          data.message || "Something went wrong while sending your message. Please try again or email directly."
        )
      }
    } catch (err) {
      console.error("Web3Forms submission failed:", err)
      setStatus("error")
      setErrorMessage(
        "Network error or unable to reach the form service. Please try again or reach out directly via email."
      )
    }
  }

  const handleReset = () => {
    setStatus("idle")
    setErrorMessage("")
    setTouched({})
  }

  return (
    <section
      id="contact"
      className={`${
        isStandalone ? "py-10 sm:py-16" : "py-14 sm:py-16 border-t border-border"
      }`}
    >
      <div className="space-y-8 sm:space-y-10">
        {/* Section Header / Hero */}
        <div className="space-y-2.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Direct communication
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary text-foreground font-semibold flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-accent" />
              Available for projects
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Let&apos;s build something.
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Have an idea, a project, an opportunity, or just want to talk about AI? I&apos;d love to hear from you.
          </p>
        </div>

        {/* Two-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Direct Contact Info & Context (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Contact details list */}
            <div className="space-y-4 rounded-lg border border-border bg-card p-5 sm:p-6 shadow-xs">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground border-b border-border pb-2.5">
                Contact channels
              </div>

              {/* Email Block */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5 font-medium text-foreground">
                    <Mail className="w-3.5 h-3.5 text-accent" />
                    <span>Email</span>
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">Primary</span>
                </div>
                <div className="flex items-center justify-between gap-2 p-2 rounded-md bg-secondary/50 border border-border/80">
                  <a
                    href={`mailto:${emailAddress}`}
                    className="text-xs font-medium text-foreground hover:text-accent truncate transition-colors"
                  >
                    {emailAddress}
                  </a>
                  <button
                    onClick={handleCopy}
                    aria-label="Copy email address"
                    className="shrink-0 p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                    title="Copy email to clipboard"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-accent" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Social Channels */}
              <div className="space-y-2 pt-2 border-t border-border/60">
                <div className="text-xs font-medium text-foreground">Networks & Profiles</div>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://www.linkedin.com/in/yeabsera-sisay-b5615b240"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 rounded-md bg-secondary/40 border border-border/70 hover:bg-secondary hover:border-foreground/20 text-xs text-foreground group transition-all"
                  >
                    <span className="flex items-center gap-1.5">
                      <Linkedin className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      <span>LinkedIn</span>
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-muted-foreground opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>

                  <a
                    href="https://github.com/yab-g4u"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 rounded-md bg-secondary/40 border border-border/70 hover:bg-secondary hover:border-foreground/20 text-xs text-foreground group transition-all"
                  >
                    <span className="flex items-center gap-1.5">
                      <Github className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      <span>GitHub</span>
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-muted-foreground opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                </div>
              </div>

              {/* Location & Timezone */}
              <div className="pt-2 border-t border-border/60 space-y-2 text-xs text-muted-foreground">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                  <div>
                    <span className="text-foreground font-medium">Addis Ababa, Ethiopia</span>
                    <span className="block text-[11px] text-muted-foreground font-mono">East Africa Time (UTC+3)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1 text-[11px] font-mono text-muted-foreground">
                  <Clock className="w-3 h-3 text-accent shrink-0" />
                  <span>Typically responds within 24 hours</span>
                </div>
              </div>
            </div>

            {/* Quick Note Box */}
            <div className="p-4 rounded-lg bg-secondary/25 border border-border text-xs text-muted-foreground space-y-1.5">
              <span className="font-medium text-foreground block">Engineering & Collaboration Focus</span>
              <p className="text-[11px] leading-relaxed">
                Specialized in multi-agent orchestration, audio/voice processing, local information retrieval, and production full-stack systems.
              </p>
            </div>
          </div>

          {/* Right Column: Web3Forms Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-lg border border-border bg-card p-5 sm:p-7 shadow-xs">
              {status === "success" ? (
                /* Polished Success Experience */
                <div className="py-8 sm:py-12 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-12 h-12 rounded-full bg-accent/15 border border-accent/30 text-accent flex items-center justify-center mx-auto shadow-xs">
                    <Check className="w-6 h-6 stroke-[2.5]" />
                  </div>

                  <div className="space-y-1.5 max-w-sm mx-auto">
                    <h3 className="text-lg font-semibold text-foreground tracking-tight">
                      Message sent.
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Thanks for reaching out. I&apos;ll review your note and get back to you soon.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-secondary border border-border text-foreground text-xs font-medium hover:bg-secondary/80 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-muted-foreground" />
                      <span>Send another message</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* The Contact Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Web3Forms anti-spam honeypot */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    checked={formState.botcheck}
                    onChange={(e) => setFormState({ ...formState, botcheck: e.target.checked })}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      Send a message
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      Direct form delivery
                    </span>
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-xs font-medium text-foreground flex items-center justify-between">
                        <span>Name</span>
                        {touched.name && !formState.name.trim() && (
                          <span className="text-[10px] font-mono text-destructive">Required</span>
                        )}
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        onBlur={() => handleBlur("name")}
                        className={`w-full px-3.5 py-2.5 rounded-md bg-background border text-xs text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-1 focus:ring-accent transition-all ${
                          touched.name && !formState.name.trim()
                            ? "border-destructive/80"
                            : "border-border hover:border-foreground/30"
                        }`}
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-xs font-medium text-foreground flex items-center justify-between">
                        <span>Email</span>
                        {touched.email && (!formState.email.trim() || !validateEmail(formState.email)) && (
                          <span className="text-[10px] font-mono text-destructive">Valid email required</span>
                        )}
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        onBlur={() => handleBlur("email")}
                        className={`w-full px-3.5 py-2.5 rounded-md bg-background border text-xs text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-1 focus:ring-accent transition-all ${
                          touched.email && (!formState.email.trim() || !validateEmail(formState.email))
                            ? "border-destructive/80"
                            : "border-border hover:border-foreground/30"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-subject" className="text-xs font-medium text-foreground flex items-center justify-between">
                      <span>Subject</span>
                      {touched.subject && !formState.subject.trim() && (
                        <span className="text-[10px] font-mono text-destructive">Required</span>
                      )}
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      required
                      placeholder="What's this about?"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      onBlur={() => handleBlur("subject")}
                      className={`w-full px-3.5 py-2.5 rounded-md bg-background border text-xs text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-1 focus:ring-accent transition-all ${
                        touched.subject && !formState.subject.trim()
                          ? "border-destructive/80"
                          : "border-border hover:border-foreground/30"
                      }`}
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-xs font-medium text-foreground flex items-center justify-between">
                      <span>Message</span>
                      {touched.message && !formState.message.trim() && (
                        <span className="text-[10px] font-mono text-destructive">Required</span>
                      )}
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Tell me about your idea..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      onBlur={() => handleBlur("message")}
                      className={`w-full px-3.5 py-2.5 rounded-md bg-background border text-xs text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-1 focus:ring-accent resize-none transition-all ${
                        touched.message && !formState.message.trim()
                          ? "border-destructive/80"
                          : "border-border hover:border-foreground/30"
                      }`}
                    />
                  </div>

                  {/* Error Notification */}
                  {status === "error" && (
                    <div className="p-3 rounded-md bg-destructive/10 border border-destructive/30 text-xs text-destructive flex items-start gap-2 animate-in fade-in">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <div className="font-medium">Message could not be delivered</div>
                        <p className="text-[11px] opacity-90">
                          {errorMessage || "Something went wrong while sending your message. Please try again or email me directly at"}
                          {" "}
                          <a href={`mailto:${emailAddress}`} className="underline font-semibold">
                            {emailAddress}
                          </a>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-foreground text-background text-xs font-medium hover:opacity-90 active:scale-[0.99] disabled:opacity-50 transition-all shadow-xs"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send message</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </>
                      )}
                    </button>

                    <div className="text-[11px] font-mono text-muted-foreground flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      <span>Encrypted SSL Delivery</span>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
