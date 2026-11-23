"use client"

import { useEffect, useState } from "react"
import { ArrowDown, ExternalLink, Search } from "lucide-react"

const LANGUAGES: [string, string][] = [
  ["English", "Take one capsule three times a day, after food."],
  ["አማርኛ", "በቀን ሦስት ጊዜ አንድ እንክብል ከምግብ በኋላ ይውሰዱ።"],
  ["Kiswahili", "Meza kidonge kimoja mara tatu kwa siku, baada ya chakula."],
  ["Français", "Prenez une gélule trois fois par jour, après le repas."],
]

const SEARCH_WORD = "Amoxicillin"

export function IdaOverlay({
  beatIndex,
  reducedMotion,
}: {
  beatIndex: number
  reducedMotion: boolean
}) {
  const [typedLen, setTypedLen] = useState(reducedMotion ? SEARCH_WORD.length : 0)
  const [langIndex, setLangIndex] = useState(0)

  // Typing loop for Amoxicillin search beat
  useEffect(() => {
    if (reducedMotion) {
      setTypedLen(SEARCH_WORD.length)
      return
    }
    let qi = 0
    let dir = 1
    const iv = window.setInterval(() => {
      qi += dir
      if (qi > SEARCH_WORD.length + 8) dir = -1
      if (qi <= 0) dir = 1
      setTypedLen(Math.max(0, Math.min(qi, SEARCH_WORD.length)))
    }, 180)
    return () => window.clearInterval(iv)
  }, [reducedMotion])

  // Auto cycle languages unless reduced motion
  useEffect(() => {
    if (reducedMotion) return
    const iv = window.setInterval(() => {
      setLangIndex((prev) => (prev + 1) % LANGUAGES.length)
    }, 3200)
    return () => window.clearInterval(iv)
  }, [reducedMotion])

  const beatClass = (idx: number, extra = "") =>
    `sw-beat ${extra} ${reducedMotion || beatIndex === idx ? "is-active" : ""}`

  const cardClass = "sw-card sw-rv sw-interactive"

  return (
    <>
      {/* Beat 0: Hero */}
      <div className={beatClass(0)}>
        <div className="sw-col sw-interactive">
          <span className="sw-tag sw-rv">Healthcare · Pharma AI</span>
          <h1 className="sw-h1 sw-rv">IDA</h1>
          <p className="sw-p sw-lead sw-rv">
            Find any medicine, understand it in your own language, and see which real pharmacies
            near you have it.
          </p>
          <span className="sw-mono sw-rv">Scroll ↓</span>
        </div>
      </div>

      {/* Beat 1: Search (Right aligned) */}
      <div className={beatClass(1, "sw-r")}>
        <div className="sw-col sw-interactive">
          <div className="sw-n sw-rv">01 · Search</div>
          <h2 className="sw-h2 sw-rv">Search any medicine</h2>
          <p className="sw-p sw-rv">
            Type a name and get verified results instantly, no guessing, no unreliable listings.
          </p>
          <div className={cardClass}>
            <div className="sw-srch">
              <Search className="w-4 h-4 text-[#d60407] dark:text-[#ff6a6a] shrink-0" />
              <span>{SEARCH_WORD.slice(0, typedLen)}</span>
              <span className="sw-cursor" aria-hidden="true" />
            </div>
            <div className="sw-row">
              <span>Amoxicillin 500&nbsp;mg</span>
              <span className="sw-row-val">
                <span className="sw-ok-red">VERIFIED</span>
              </span>
            </div>
            <div className="sw-row">
              <span>Amoxicillin 250&nbsp;mg</span>
              <span className="sw-row-val">
                <span className="sw-ok-red">VERIFIED</span>
              </span>
            </div>
            <div className="sw-fn">Illustrative UI</div>
          </div>
        </div>
      </div>

      {/* Beat 2: Language */}
      <div className={beatClass(2)}>
        <div className="sw-col sw-interactive">
          <div className="sw-n sw-rv">02 · Your language</div>
          <h2 className="sw-h2 sw-rv">Know your medicine, in your language</h2>
          <p className="sw-p sw-rv">
            Usage, dosage and warnings explained the way you speak, not buried in English leaflets.
          </p>
          <div className={cardClass}>
            <div className="sw-chips">
              {LANGUAGES.map(([label], i) => (
                <button
                  key={label}
                  type="button"
                  className={i === langIndex ? "is-on" : undefined}
                  onClick={() => setLangIndex(i)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="sw-med">Amoxicillin</div>
            <div className="sw-txt">{LANGUAGES[langIndex][1]}</div>
            <div className="sw-fn">Illustrative UI · languages are examples</div>
          </div>
        </div>
      </div>

      {/* Beat 3: Pharmacies near you (Right aligned) */}
      <div className={beatClass(3, "sw-r")}>
        <div className="sw-col sw-interactive">
          <div className="sw-n sw-rv">03 · Near you</div>
          <h2 className="sw-h2 sw-rv">Real pharmacies around you</h2>
          <p className="sw-p sw-rv">
            See which pharmacies near you actually stock it, and the quickest way to get there.
          </p>
          <div className={cardClass}>
            <div className="sw-row">
              <span>Nearest pharmacy</span>
              <span className="sw-row-val">
                0.8 KM · <span className="sw-ok-red">IN STOCK</span>
              </span>
            </div>
            <div className="sw-row">
              <span>Second nearest</span>
              <span className="sw-row-val">
                1.4 KM · <span className="sw-ok-red">IN STOCK</span>
              </span>
            </div>
            <div className="sw-row">
              <span>Third nearest</span>
              <span className="sw-row-val">2.1 KM · LOW STOCK</span>
            </div>
            <div className="sw-fn">Illustrative UI</div>
          </div>
        </div>
      </div>

      {/* Beat 4: Interactions & Transactions */}
      <div className={beatClass(4, "sw-c")}>
        <div className="sw-interactive">
          <div className="sw-n sw-rv">And more</div>
          <h2 className="sw-h2 sw-rv">Safe. Complete.</h2>
          <div className="sw-mini">
            <div className={cardClass}>
              <h3>Interaction warnings</h3>
              <p>Warfarin + Ibuprofen</p>
              <div className="sw-sev">
                <i />
              </div>
              <div className="sw-mono">MAJOR · bleeding risk. Consult a clinician.</div>
            </div>
            <div className={cardClass}>
              <h3>Transactions</h3>
              <p>Order and pay for medicine in one flow, from verified listing to pickup.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Beat 5: Clean portfolio exit */}
      <div className={beatClass(5, "sw-c")}>
        <div className="sw-interactive">
          <h2 className="sw-h2 sw-rv">Medicine, made trustworthy.</h2>
          <div className="sw-rv flex flex-wrap justify-center">
            <a
              className="sw-pill"
              href="https://ida-test.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Open live demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a className="sw-pill sw-pill-o" href="#writing">
              <span>Continue to Writing</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
