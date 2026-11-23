export type ChapterId = "probe" | "medscope" | "indiecrop" | "ida"

export interface ChapterMeta {
  id: ChapterId
  number: string
  title: string
  tagline: string
  badge: string
  /** Height of this chapter's scroll runway in svh units (adjust to speed up or slow down a chapter) */
  scrollVh: number
  /** Sub-chapter labels shown in the floating HUD for each scroll beat */
  subChapters: string[]
  /** CSS & WebGL atmospheric accent colors for seamless fog/background transitions */
  bgHex: string
  fogHex: string
  accentHex: string
  scrimVariant: "bottom" | "left" | "ambient"
}

/**
 * Adjust scroll length of the opening title beat ("Selected Work · 04 projects").
 */
export const OPENER_SCROLL_VH = 95

/**
 * Duration (in ms) of the crimson wipe transition between chapters.
 * Kept within the 400–600ms cinematic range.
 */
export const TRANSITION_DURATION_MS = 500

/**
 * Scroll smoothing factor applied per animation frame: cp += (targetP - cp) * SMOOTH_FACTOR.
 */
export const SMOOTH_FACTOR = 0.08

/**
 * Ordered chapter sequence: Probe -> Medscope -> IndieCrop -> IDA
 * Reorder this array to change the presentation sequence.
 */
export const CHAPTERS: ChapterMeta[] = [
  {
    id: "probe",
    number: "01",
    title: "Probe",
    tagline: "Put your idea under pressure",
    badge: "Stark Hackathon · 3rd place",
    scrollVh: 760,
    subChapters: [
      "Idea",
      "Retrieve",
      "Sort",
      "Graph",
      "Evidence",
      "Contradictions",
      "Blind spots",
      "Market testing",
      "Demo",
    ],
    bgHex: "#150304",
    fogHex: "#240406",
    accentHex: "#ff2b2b",
    scrimVariant: "bottom",
  },
  {
    id: "medscope",
    number: "02",
    title: "Medscope",
    tagline: "Simulated outbreak response, AI multi-agent public health",
    badge: "African Blockchain Championship 2025 · 2nd place",
    scrollVh: 560,
    subChapters: ["Overview", "Simulation", "Agents", "Funding", "Data", "Live demo"],
    bgHex: "#0d0305",
    fogHex: "#1c0305",
    accentHex: "#d60407",
    scrimVariant: "left",
  },
  {
    id: "indiecrop",
    number: "03",
    title: "IndieCrop",
    tagline: "Smarter farming for Ethiopia",
    badge: "AI · Agritech",
    scrollVh: 560,
    subChapters: ["Overview", "Mission", "Field Agent", "NGO / FAO", "Government", "Impact"],
    bgHex: "#140406",
    fogHex: "#2a0507",
    accentHex: "#4ade80",
    scrimVariant: "ambient",
  },
  {
    id: "ida",
    number: "04",
    title: "IDA",
    tagline: "Find any medicine, in your language, near you",
    badge: "Healthcare · Pharma AI",
    scrollVh: 560,
    subChapters: ["01 / Search", "02 / Language", "03 / Pharmacies", "04 / Safety", "05 / Done"],
    bgHex: "#100304",
    fogHex: "#1e0406",
    accentHex: "#ff4a4a",
    scrimVariant: "ambient",
  },
]

export const TOTAL_SCROLL_VH =
  OPENER_SCROLL_VH + CHAPTERS.reduce((sum, ch) => sum + ch.scrollVh, 0)

export interface ChapterRange {
  chapter: ChapterMeta
  index: number
  startVh: number
  endVh: number
  startP: number
  endP: number
}

export const CHAPTER_RANGES: ChapterRange[] = (() => {
  let cursor = OPENER_SCROLL_VH
  return CHAPTERS.map((chapter, index) => {
    const startVh = cursor
    const endVh = cursor + chapter.scrollVh
    cursor = endVh
    return {
      chapter,
      index,
      startVh,
      endVh,
      startP: startVh / TOTAL_SCROLL_VH,
      endP: endVh / TOTAL_SCROLL_VH,
    }
  })
})()

export const OPENER_END_P = OPENER_SCROLL_VH / TOTAL_SCROLL_VH
