"use client"

import { useEffect, useState } from "react"
import { ArrowDown, ExternalLink } from "lucide-react"

export function IndieCropOverlay({
  beatIndex,
  reducedMotion,
  onJumpToChapter,
}: {
  beatIndex: number
  reducedMotion: boolean
  onJumpToChapter: (index: number) => void
}) {
  const [skReady, setSkReady] = useState(reducedMotion)

  useEffect(() => {
    if (reducedMotion) {
      setSkReady(true)
      return
    }
    setSkReady(false)
    const id = window.setTimeout(() => setSkReady(true), 360)
    return () => window.clearTimeout(id)
  }, [beatIndex, reducedMotion])

  const beatClass = (idx: number, extra = "") =>
    `sw-beat ${extra} ${reducedMotion || beatIndex === idx ? "is-active" : ""}`

  const cardClass = `sw-card sw-rv sw-interactive ${skReady ? "" : "sw-sk"}`

  return (
    <>
      {/* Beat 0: Hero */}
      <div className={beatClass(0)}>
        <div className="sw-col sw-interactive">
          <span className="sw-tag sw-rv">AI · Agritech · Ethiopia</span>
          <h1 className="sw-h1-xl sw-rv">
            Indie<em>Crop</em>
          </h1>
          <p className="sw-p sw-lead sw-rv">
            Smarter crop decisions and verified progress, for the people who grow Ethiopia’s food.
          </p>
          <span className="sw-n sw-rv">Scroll to watch it grow ↓</span>
        </div>
      </div>

      {/* Beat 1: Mission */}
      <div className={beatClass(1, "sw-c")}>
        <div className="sw-interactive">
          <div className="sw-n sw-rv">Our mission</div>
          <h2 className="sw-h2 sw-rv">Grow better. Prove it. Scale it.</h2>
          <div className="sw-mini">
            <div className={cardClass}>
              <h3>Decide better</h3>
              <p>Informed crop choices from climate, soil and market data.</p>
            </div>
            <div className={cardClass}>
              <h3>Prove progress</h3>
              <p>Verified records of farm activities and sustainability actions.</p>
            </div>
            <div className={cardClass}>
              <h3>Scale impact</h3>
              <p>Reliable insights for governments and NGOs to fund and plan.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Beat 2: Field Agent (Right aligned) */}
      <div className={beatClass(2, "sw-r")}>
        <div className="sw-col sw-interactive">
          <div className="sw-n sw-rv">Role 01 · Field Agent</div>
          <h2 className="sw-h2 sw-rv">From the field to the best crop</h2>
          <p className="sw-p sw-rv">
            Agents capture location, soil, water use and yield history, verify the farm by GPS, and
            hand farmers a ranked recommendation on the spot.
          </p>
          <div className={cardClass}>
            <div className="sw-chips">
              <span>Location</span>
              <span>Soil type</span>
              <span>Water usage</span>
              <span>Yield history</span>
              <span className="sw-g">✓ GPS verified</span>
            </div>
            <div className="sw-rk">
              <i>1</i>
              <b>Teff</b>
              <div className="sw-bar">
                <span className="sw-bar-fill" style={{ width: "92%" }} />
              </div>
            </div>
            <div className="sw-rk">
              <i>2</i>
              <b>Wheat</b>
              <div className="sw-bar">
                <span className="sw-bar-fill" style={{ width: "78%" }} />
              </div>
            </div>
            <div className="sw-rk">
              <i>3</i>
              <b>Chickpea</b>
              <div className="sw-bar">
                <span className="sw-bar-fill" style={{ width: "66%" }} />
              </div>
            </div>
            <div className="sw-fn">
              Top 3 crops ranked by profitability &amp; climate resilience · Illustrative UI
            </div>
          </div>
        </div>
      </div>

      {/* Beat 3: NGO / FAO */}
      <div className={beatClass(3)}>
        <div className="sw-col sw-interactive">
          <div className="sw-n sw-rv">Role 02 · NGO / FAO</div>
          <h2 className="sw-h2 sw-rv">See every program, in real time</h2>
          <p className="sw-p sw-rv">
            Track adoption, measure yield and sustainability gains, and let the AI assistant point
            to the farms that need support next.
          </p>
          <div className={cardClass}>
            <div className="sw-big">
              68%<small>adoption</small>
            </div>
            <div className="sw-bar sw-bar-g" style={{ margin: "14px 0" }}>
              <span className="sw-bar-fill" style={{ width: "68%" }} />
            </div>
            <div className="sw-row">
              <span>Farms needing targeted support</span>
              <span className="sw-row-val">12 · AI</span>
            </div>
            <div className="sw-row">
              <span>Yield improvement</span>
              <span className="sw-row-val">+24%</span>
            </div>
            <div className="sw-row">
              <span>Sustainability score</span>
              <span className="sw-row-val">
                <span className="sw-ok">RISING</span>
              </span>
            </div>
            <div className="sw-fn">Illustrative UI</div>
          </div>
        </div>
      </div>

      {/* Beat 4: Government (Right aligned) */}
      <div className={beatClass(4, "sw-r")}>
        <div className="sw-col sw-interactive">
          <div className="sw-n sw-rv">Role 03 · Government</div>
          <h2 className="sw-h2 sw-rv">Policy backed by ground truth</h2>
          <p className="sw-p sw-rv">
            Compare performance across kebeles, woredas and regions, get data-backed recommendations
            for subsidies and climate adaptation, and export reports in one click.
          </p>
          <div className={cardClass}>
            <div className="sw-chips">
              <span>Kebele</span>
              <span className="sw-g">Woreda</span>
              <span>Region</span>
            </div>
            <div className="sw-rk">
              <i>A</i>
              <b>Woreda A</b>
              <div className="sw-bar sw-bar-g">
                <span className="sw-bar-fill" style={{ width: "84%" }} />
              </div>
            </div>
            <div className="sw-rk">
              <i>B</i>
              <b>Woreda B</b>
              <div className="sw-bar sw-bar-g">
                <span className="sw-bar-fill" style={{ width: "61%" }} />
              </div>
            </div>
            <div className="sw-rk">
              <i>C</i>
              <b>Woreda C</b>
              <div className="sw-bar">
                <span className="sw-bar-fill" style={{ width: "38%" }} />
              </div>
            </div>
            <div className="sw-fn">Illustrative UI</div>
          </div>
        </div>
      </div>

      {/* Beat 5: Impact */}
      <div className={beatClass(5, "sw-c")}>
        <div className="sw-interactive">
          <div className="sw-n sw-rv">Decide better · Prove progress · Scale impact</div>
          <h2 className="sw-h2 sw-rv">Better harvests start with better decisions.</h2>
          <div className="sw-rv flex flex-wrap justify-center">
            <a
              className="sw-pill"
              href="https://indiecropp.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Open live demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              type="button"
              className="sw-pill sw-pill-o"
              onClick={() => onJumpToChapter(3)}
            >
              <span>Next · IDA</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
