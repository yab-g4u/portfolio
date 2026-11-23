"use client"

import { useState } from "react"
import { ArrowUpRight, Check, Copy, FileText, Loader2, RefreshCw, AlertCircle } from "lucide-react"
import { useResume } from "@/lib/resume-context"

interface ContactProps {
  isStandalone?: boolean
}

export function Contact({ isStandalone = false }: ContactProps) {
  const { openResume } = useResume()
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
        setStatus("error")
        setErrorMessage(
          data.message ||
            "Something went wrong while sending your message. Please try again or email directly."
        )
      }
    } catch {
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
    <section id="contact" style={isStandalone ? { paddingTop: "32px" } : undefined}>
      <div className="head" style={isStandalone ? { paddingTop: "40px" } : undefined}>
        <div className="ghost" aria-hidden="true">
          CONTACT
        </div>
        <small className="rv">Direct communication</small>
        <h2 className="glow rv">Let&rsquo;s build something.</h2>
        <div className="avail" style={{ margin: "14px 0 0" }}>
          Available for projects
        </div>
      </div>

      <div className="ct card g1 rv">
        <div className="flex flex-col justify-between gap-6">
          <div>
            <p>
              Have an idea, a project, an opportunity, or just want to talk about AI? I&rsquo;d love
              to hear from you.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-3">
              <h3 style={{ margin: "6px 0" }}>
                <a href={`mailto:${emailAddress}`} className="hover:underline">
                  {emailAddress}
                </a>
              </h3>
              <button
                type="button"
                onClick={handleCopy}
                className="pill"
                style={{ padding: "6px 14px", fontSize: "12px" }}
                aria-label="Copy email address"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            <p style={{ marginTop: "10px" }}>
              Addis Ababa, Ethiopia · East Africa Time (UTC+3)
              <br />
              Typically responds within 24 hours
            </p>

            <p style={{ marginTop: "14px" }}>
              <b>Engineering &amp; Collaboration Focus:</b> multi-agent orchestration, audio/voice
              processing, local information retrieval, and production full-stack systems.
            </p>
          </div>

          <div className="btns" style={{ justifyContent: "flex-start" }}>
            <a
              className="pill"
              href="https://github.com/yab-g4u"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              className="pill"
              href="https://www.linkedin.com/in/yeabsera-sisay-b5615b240"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <button type="button" className="pill" onClick={openResume}>
              <FileText className="w-4 h-4" />
              <span>Resume (CV)</span>
            </button>
          </div>
        </div>

        <div>
          {status === "success" ? (
            <div className="py-10 text-center space-y-5">
              <div className="w-12 h-12 rounded-full bg-white/15 border border-white/30 text-white flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <div className="space-y-2 max-w-sm mx-auto">
                <h3 style={{ fontSize: "32px", margin: 0 }}>Message sent.</h3>
                <p>Thanks for reaching out. I&rsquo;ll review your note and get back to you soon.</p>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="pill"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Send another message</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <input
                type="checkbox"
                name="botcheck"
                checked={formState.botcheck}
                onChange={(e) => setFormState({ ...formState, botcheck: e.target.checked })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <label htmlFor="contact-name">
                Name{" "}
                {touched.name && !formState.name.trim() && (
                  <span className="text-[#ffd0d0] font-mono text-[11px] ml-2">Required</span>
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
              />

              <label htmlFor="contact-email">
                Email{" "}
                {touched.email &&
                  (!formState.email.trim() || !validateEmail(formState.email)) && (
                    <span className="text-[#ffd0d0] font-mono text-[11px] ml-2">
                      Valid email required
                    </span>
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
              />

              <label htmlFor="contact-subject">
                Subject{" "}
                {touched.subject && !formState.subject.trim() && (
                  <span className="text-[#ffd0d0] font-mono text-[11px] ml-2">Required</span>
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
              />

              <label htmlFor="contact-message">
                Message{" "}
                {touched.message && !formState.message.trim() && (
                  <span className="text-[#ffd0d0] font-mono text-[11px] ml-2">Required</span>
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
              />

              {status === "error" && (
                <div className="mt-4 p-3 rounded-2xl bg-black/50 border border-white/25 text-xs text-white flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#ffb3b3]" />
                  <div>
                    <div className="font-semibold">Message could not be delivered</div>
                    <p className="text-white/80 mt-0.5">
                      {errorMessage}{" "}
                      <a href={`mailto:${emailAddress}`} className="underline font-semibold">
                        {emailAddress}
                      </a>
                    </p>
                  </div>
                </div>
              )}

              <button className="call" type="submit" disabled={status === "submitting"}>
                {status === "submitting" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Send message</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
