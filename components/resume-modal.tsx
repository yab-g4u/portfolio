"use client"

import { useState, useEffect } from "react"
import {
  X,
  Download,
  ExternalLink,
  FileText,
  Eye,
  Briefcase,
  GraduationCap,
  Sparkles,
  Trophy,
  Layers,
  CheckCircle2,
  Mail,
  Phone,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
} from "lucide-react"
import { GitHubBrandIcon, LinkedInBrandIcon } from "@/components/tech-icons"

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [activeTab, setActiveTab] = useState<"viewer" | "structured">("viewer")
  const [pdfError, setPdfError] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(100)

  const cvUrl = "/cv/YEABSERA-SISAY.pdf"

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    if (isOpen) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = cvUrl
    link.download = "YEABSERA-SISAY-CV.pdf"
    link.target = "_blank"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      {/* Background click listener */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`relative z-10 w-full bg-card border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden transition-all duration-200 ${
          isFullscreen
            ? "max-w-full h-full max-h-full rounded-none"
            : "max-w-4xl h-[92vh] max-h-[880px]"
        }`}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-3.5 border-b border-border bg-card/95 backdrop-blur-md shrink-0">
          {/* Left info */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-1.5 rounded-md bg-secondary text-foreground shrink-0">
              <FileText className="w-4 h-4 text-accent" />
            </div>
            <div className="min-w-0">
              <h2
                id="resume-modal-title"
                className="text-sm sm:text-base font-semibold text-foreground tracking-tight truncate flex items-center gap-2"
              >
                <span>Yeabsera Sisay — Curriculum Vitae</span>
              </h2>
              <p className="text-[11px] font-mono text-muted-foreground truncate hidden sm:block">
                AI Engineer · Agentic AI, Computer Vision & AI Systems
              </p>
            </div>
          </div>

          {/* Right View Switcher & Action buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Tab switch for devices that can't render inline PDF easily */}
            <div className="hidden sm:flex items-center p-0.5 rounded-lg bg-secondary/80 border border-border text-xs font-medium mr-1">
              <button
                onClick={() => setActiveTab("viewer")}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  activeTab === "viewer"
                    ? "bg-card text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                PDF Document
              </button>
              <button
                onClick={() => setActiveTab("structured")}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  activeTab === "structured"
                    ? "bg-card text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Text Resume
              </button>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-foreground text-background text-xs font-medium hover:opacity-90 active:scale-95 transition-all shadow-xs"
              title="Download CV PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">Download</span>
            </button>

            {/* Open in new tab */}
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-secondary/60 hover:bg-secondary border border-border text-foreground transition-colors hidden sm:inline-flex"
              title="Open raw PDF in new tab"
              aria-label="Open raw PDF in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Toggle Fullscreen */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-lg bg-secondary/60 hover:bg-secondary border border-border text-foreground transition-colors hidden md:inline-flex"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? (
                <Minimize2 className="w-3.5 h-3.5" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              title="Close (Esc)"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="flex sm:hidden border-b border-border bg-secondary/30 text-xs font-medium">
          <button
            onClick={() => setActiveTab("viewer")}
            className={`flex-1 py-2 text-center border-b-2 transition-all ${
              activeTab === "viewer"
                ? "border-accent text-foreground font-semibold bg-secondary/50"
                : "border-transparent text-muted-foreground"
            }`}
          >
            PDF Preview
          </button>
          <button
            onClick={() => setActiveTab("structured")}
            className={`flex-1 py-2 text-center border-b-2 transition-all ${
              activeTab === "structured"
                ? "border-accent text-foreground font-semibold bg-secondary/50"
                : "border-transparent text-muted-foreground"
            }`}
          >
            Detailed View
          </button>
        </div>

        {/* Modal Main Body */}
        <div className="flex-1 overflow-hidden relative bg-muted/20">
          {activeTab === "viewer" && !pdfError ? (
            <div className="w-full h-full flex flex-col">
              {/* PDF embed iframe */}
              <iframe
                src={`${cvUrl}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
                className="w-full h-full border-0"
                title="Yeabsera Sisay CV Preview"
                onError={() => setPdfError(true)}
              />
            </div>
          ) : (
            /* Structured Fallback / Interactive Text CV */
            <div className="w-full h-full overflow-y-auto p-4 sm:p-8 space-y-8 bg-card text-foreground">
              {/* Header */}
              <div className="space-y-3 border-b border-border pb-6">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                      Yeabsera Sisay
                    </h1>
                    <p className="text-sm font-medium text-accent pt-0.5">
                      AI Engineer — Agentic AI, Computer Vision & AI Systems
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-mono text-muted-foreground">
                    <a
                      href="mailto:g4uforlife@gmail.com"
                      className="hover:text-foreground flex items-center gap-1"
                    >
                      <Mail className="w-3 h-3" />
                      <span>g4uforlife@gmail.com</span>
                    </a>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      <span>+251 90 263 6127</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 text-xs font-mono text-muted-foreground pt-1">
                  <a
                    href="https://linkedin.com/in/yeabsera-sisay"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground inline-flex items-center gap-1"
                  >
                    <LinkedInBrandIcon className="w-3.5 h-3.5" />
                    <span>linkedin.com/in/yeabsera-sisay</span>
                  </a>
                  <span>·</span>
                  <a
                    href="https://github.com/yab-g4u"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground inline-flex items-center gap-1"
                  >
                    <GitHubBrandIcon className="w-3.5 h-3.5" />
                    <span>github.com/yab-g4u</span>
                  </a>
                  <span>·</span>
                  <span className="text-foreground">yeabsera-sisay.vercel.app</span>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  <span>Executive Summary</span>
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  AI Engineer focused on agentic AI, computer vision, and applied AI systems. I build intelligent software that combines models, agents, retrieval, and realtime interfaces with full-stack infrastructure to solve real-world problems. My work spans multi-agent systems, voice AI, computer vision, developer infrastructure, healthcare, agriculture, and financial technology — with a consistent focus on shipping complete, working systems rather than isolated experiments.
                </p>
              </div>

              {/* Experience */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-accent" />
                  <span>Experience</span>
                </h3>

                <div className="space-y-4 divide-y divide-border/60">
                  <div className="pt-4 first:pt-0 space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <div className="text-sm font-semibold text-foreground">
                        AI/ML Technical Lead — <span className="font-normal text-muted-foreground">GDG on Campus AASTU</span>
                      </div>
                      <span className="text-xs font-mono text-muted-foreground">2025 – Present</span>
                    </div>
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Lead AI/ML technical direction for the campus developer community, guiding members through practical agentic AI, computer vision, and ML project development.</li>
                      <li>Mentor student developers on building and shipping working AI systems, from model selection through deployment.</li>
                    </ul>
                  </div>

                  <div className="pt-4 space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <div className="text-sm font-semibold text-foreground">
                        Software Lead — <span className="font-normal text-muted-foreground">Lyne Creatives</span>
                      </div>
                      <span className="text-xs font-mono text-muted-foreground">Aug 2025 – Aug 2026</span>
                    </div>
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Led development of a collaborative workspace platform for an architectural firm, enabling internal teams to manage projects and communicate directly with clients.</li>
                      <li>Architected the platform&apos;s project-collaboration and client-communication modules end-to-end as software lead.</li>
                    </ul>
                  </div>

                  <div className="pt-4 space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <div className="text-sm font-semibold text-foreground">
                        AI Research Intern, Applied Machine Learning — <span className="font-normal text-muted-foreground">iCog Labs</span>
                      </div>
                      <span className="text-xs font-mono text-muted-foreground">Jul 2024 – Oct 2025</span>
                    </div>
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Conducted applied machine learning research and experimentation as part of iCog Labs&apos; quantum computing research team.</li>
                      <li>Built and evaluated ML models and data pipelines supporting the team&apos;s ongoing research work.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Selected Projects */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-accent" />
                  <span>Selected Projects</span>
                </h3>

                <div className="grid grid-cols-1 gap-3">
                  <div className="p-3.5 rounded-lg bg-secondary/30 border border-border space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-foreground">MedScope Multi-Agent Epidemic Coordination System</span>
                      <a href="https://github.com/yab-g4u/medscop" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-mono">github.com/yab-g4u/medscop</a>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Designed a multi-agent AI system coordinating epidemic response across policy analysis, logistics, and government-response workflows. Built agent orchestration and sentiment-analysis components for real-time decision support; integrated blockchain for verifiable data coordination. (African Blockchain Championship — 2nd Place)
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-secondary/30 border border-border space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-foreground">Omniq Voice AI Infrastructure for People Without Smartphones</span>
                      <a href="https://github.com/yab-g4u/omniq" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-mono">github.com/yab-g4u/omniq</a>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Built realtime conversational voice AI reachable over 2G/PSTN and IVR, extending AI access to feature-phone users. Engineered multilingual voice interaction flows with structured extraction, targeting a feature-phone channel largely unaddressed elsewhere.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-secondary/30 border border-border space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-foreground">Surf Local-First Hybrid Search Engine</span>
                      <span className="text-muted-foreground font-mono">Local IR / Zero-Cloud</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Built a local-first hybrid search engine combining BM25 and sentence-transformer embeddings via reciprocal rank fusion, using SQLite/FTS5 and vector search with no hosted LLM APIs. Indexed and searched imported data spanning Reddit, Telegram, Devpost, X, and LinkedIn.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-secondary/30 border border-border space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-foreground">ShieldGuard AI-Powered Telecom Trust Orchestration</span>
                      <span className="text-muted-foreground font-mono">CAMARA / Fintech Security</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Designed an AI-driven trust-orchestration system applying telecom signals (Open Gateway/CAMARA) to mobile money and fintech identity onboarding across Sub-Saharan African infrastructure.
                    </p>
                  </div>
                </div>
              </div>

              {/* Technical Skills */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  Technical Skills
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded bg-secondary/40 border border-border/70 space-y-1">
                    <div className="font-semibold text-foreground">AI & Agentic Systems</div>
                    <div className="text-muted-foreground">Agentic AI, Multi-Agent Systems, LLM Applications, RAG, LangChain, CrewAI, AI Agents, Embeddings</div>
                  </div>
                  <div className="p-2.5 rounded bg-secondary/40 border border-border/70 space-y-1">
                    <div className="font-semibold text-foreground">Computer Vision & ML</div>
                    <div className="text-muted-foreground">Computer Vision, OpenCV, Machine Learning, Scikit-learn, SHAP, NLP</div>
                  </div>
                  <div className="p-2.5 rounded bg-secondary/40 border border-border/70 space-y-1">
                    <div className="font-semibold text-foreground">AI Infrastructure</div>
                    <div className="text-muted-foreground">FastAPI, Python, FAISS, Sentence-Transformers, SQLite, PostgreSQL, FTS5, BM25, Vector Search, RRF</div>
                  </div>
                  <div className="p-2.5 rounded bg-secondary/40 border border-border/70 space-y-1">
                    <div className="font-semibold text-foreground">Software Engineering & Cloud</div>
                    <div className="text-muted-foreground">TypeScript, JavaScript, React, Next.js, Node.js, Django, REST APIs, PostgreSQL, SQLite, Supabase, Firebase</div>
                  </div>
                </div>
              </div>

              {/* Achievements & Education */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-accent" />
                    <span>Achievements</span>
                  </h3>
                  <div className="space-y-1.5 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span className="text-foreground font-medium">African Blockchain Championship — MedScope</span>
                      <span className="font-mono text-accent">2nd Place</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground font-medium">UniHack / Agent.ai Track — IDA</span>
                      <span className="font-mono text-accent">Winner</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground font-medium">Hospitality Hackathon</span>
                      <span className="font-mono text-accent">Finalist</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-accent" />
                    <span>Education</span>
                  </h3>
                  <div className="p-2.5 rounded bg-secondary/30 border border-border text-xs space-y-0.5">
                    <div className="font-semibold text-foreground">
                      Addis Ababa Science and Technology University (AASTU)
                    </div>
                    <div className="text-muted-foreground font-mono text-[11px]">
                      Expected June 2027
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom footer bar */}
        <div className="px-4 py-3 sm:px-6 border-t border-border bg-card/95 flex items-center justify-between text-xs text-muted-foreground shrink-0">
          <span className="font-mono text-[11px]">
            Press <kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border text-foreground">Esc</kbd> to close
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab(activeTab === "viewer" ? "structured" : "viewer")}
              className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
            >
              {activeTab === "viewer" ? "Switch to Text View" : "Switch to PDF View"}
            </button>
            <span>·</span>
            <button
              onClick={handleDownload}
              className="text-foreground font-medium hover:text-accent transition-colors flex items-center gap-1"
            >
              <Download className="w-3 h-3" />
              <span>Download Copy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
