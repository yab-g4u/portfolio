"use client"

import { useEffect, useState } from "react"
import { ArrowDown, ExternalLink } from "lucide-react"

interface ProbeBeat {
  eyebrow: string
  heading: string
  body: string
  isHero?: boolean
  chips?: string[]
  footnote?: string
  showDemo?: boolean
}

const PROBE_BEATS: ProbeBeat[] = [
  {
    isHero: true,
    eyebrow: "Stark Hackathon · 3rd place",
    heading: "Put your idea under pressure.",
    body: "Real-world research discovery, living evidence graphs, and authentic product testing.",
  },
  {
    eyebrow: "01 · Retrieve",
    heading: "Search every source at once",
    body: "Probe searches Reddit, X, LinkedIn, GitHub, the web and academic papers in parallel, and brings back source-backed evidence.",
    chips: ["Normalized citations", "Graceful rate limits", "Built to prevent hallucination"],
    footnote: "Interface recreated from the Probe app",
  },
  {
    eyebrow: "02 · Sort",
    heading: "Support. Contradict. Unknown.",
    body: "Every result is classified, so you see what backs your idea, what challenges it, and where the blind spots are.",
    footnote: "Interface recreated from the Probe app",
  },
  {
    eyebrow: "03 · Living Evidence Graph",
    heading: "One workspace for the whole investigation",
    body: "The evidence becomes a graph that grows as you investigate, from idea and assumptions to evidence, contradictions, decisions and next tests.",
    footnote: "Interface recreated from the Probe app",
  },
  {
    eyebrow: "04 · Evidence",
    heading: "What backs your idea",
    body: "Supporting signals light up, each one traceable to its source.",
    footnote: "Interface recreated from the Probe app",
  },
  {
    eyebrow: "05 · Contradictions",
    heading: "What challenges it",
    body: "Challenging signals sit right beside them, so nothing convenient hides the inconvenient.",
    footnote: "Interface recreated from the Probe app",
  },
  {
    eyebrow: "06 · Blind spots",
    heading: "Turn unknowns into next tests",
    body: "Interrogate a blind spot and turn it into a validation experiment.",
    footnote: "Interface recreated from the Probe app",
  },
  {
    eyebrow: "07 · Market testing",
    heading: "Test it on real people",
    body: "Run live products against concrete tasks, capture genuine friction, and get an agentic diagnostic report.",
    footnote: "Illustrative session",
  },
  {
    eyebrow: "Put it under pressure",
    heading: "Pressure-test your idea.",
    body: "See the idea tested before the build begins.",
    showDemo: true,
  },
]

export function ProbeOverlay({
  beatIndex,
  reducedMotion,
  onJumpToChapter,
}: {
  beatIndex: number
  reducedMotion: boolean
  onJumpToChapter: (index: number) => void
}) {
  const [swapping, setSwapping] = useState(false)
  const [displayedBeat, setDisplayedBeat] = useState(beatIndex)

  useEffect(() => {
    if (reducedMotion) {
      setDisplayedBeat(beatIndex)
      return
    }
    if (beatIndex === displayedBeat) return
    setSwapping(true)
    const id = window.setTimeout(() => {
      setDisplayedBeat(beatIndex)
      setSwapping(false)
    }, 180)
    return () => window.clearTimeout(id)
  }, [beatIndex, displayedBeat, reducedMotion])

  if (reducedMotion) {
    return (
      <div className="flex flex-col gap-6 px-[6%]">
        {PROBE_BEATS.map((d, idx) => (
          <div key={d.eyebrow} className={`sw-cap ${d.isHero ? "sw-cap-hero" : ""}`}>
            {d.isHero ? <span className="sw-tag">{d.eyebrow}</span> : <div className="sw-n">{d.eyebrow}</div>}
            <h2>{d.heading}</h2>
            <p>{d.body}</p>
            {d.chips && (
              <div className="sw-chips" style={{ marginTop: 12, marginBottom: 0 }}>
                {d.chips.map((c) => (
                  <span key={c}>{c}</span>
                ))}
              </div>
            )}
            {idx === PROBE_BEATS.length - 1 && (
              <div className="mt-2">
                <a
                  className="sw-pill"
                  href="https://youtu.be/Kd4aaC-Hlsw"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Watch the demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  const d = PROBE_BEATS[Math.min(PROBE_BEATS.length - 1, Math.max(0, displayedBeat))]

  return (
    <>
      <div className="sw-dots" aria-hidden="true">
        {PROBE_BEATS.map((_, i) => (
          <i key={i} className={i === beatIndex ? "is-on" : undefined} />
        ))}
      </div>

      <div
        className={`sw-cap ${d.isHero ? "sw-cap-hero" : ""} ${swapping ? "sw-swapping" : ""}`}
      >
        {d.isHero ? (
          <span className="sw-tag" style={{ marginBottom: 10 }}>
            {d.eyebrow}
          </span>
        ) : (
          <div className="sw-n">{d.eyebrow}</div>
        )}
        <h2>{d.heading}</h2>
        <p>{d.body}</p>

        {d.chips && (
          <div className="sw-chips" style={{ marginTop: 12, marginBottom: 0 }}>
            {d.chips.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        )}

        {d.footnote && <div className="sw-fn">{d.footnote}</div>}

        {d.showDemo && (
          <div className="mt-2 flex flex-wrap items-center">
            <a
              className="sw-pill"
              href="https://youtu.be/Kd4aaC-Hlsw"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Watch the demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              type="button"
              onClick={() => onJumpToChapter(1)}
              className="sw-pill sw-pill-o"
            >
              <span>Next · Medscope</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </>
  )
}
