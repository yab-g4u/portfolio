"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowDown, BookOpen, ExternalLink } from "lucide-react"
import type { MedscopeParams, MedscopeTelemetry } from "../scenes/types"

const PRESETS: { label: string; transmission: number; vaccination: number; delay: number }[] = [
  { label: "COVID-19", transmission: 1.3, vaccination: 20, delay: 18 },
  { label: "Ebola", transmission: 0.8, vaccination: 10, delay: 10 },
  { label: "Cholera", transmission: 1.0, vaccination: 15, delay: 25 },
]

export function MedscopeOverlay({
  beatIndex,
  reducedMotion,
  params,
  telemetry,
  onChangeParams,
  onJumpToChapter,
}: {
  beatIndex: number
  reducedMotion: boolean
  params: MedscopeParams
  telemetry: MedscopeTelemetry
  onChangeParams: (next: MedscopeParams) => void
  onJumpToChapter: (index: number) => void
}) {
  const [skReady, setSkReady] = useState(reducedMotion)

  useEffect(() => {
    if (reducedMotion) {
      setSkReady(true)
      return
    }
    setSkReady(false)
    const id = window.setTimeout(() => setSkReady(true), 380)
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
          <span className="sw-tag sw-rv">African Blockchain Championship 2025 · 2nd place</span>
          <h1 className="sw-h1 sw-rv">Medscope</h1>
          <p className="sw-p sw-lead sw-rv">
            Simulated outbreak response and an AI-driven public health system, so institutions can
            rehearse before it counts.
          </p>
          <span className="sw-n sw-rv">Scroll to run the outbreak ↓</span>
        </div>
      </div>

      {/* Beat 1: Simulation Controls */}
      <div className={beatClass(1)}>
        <div className="sw-col sw-interactive">
          <div className="sw-n sw-rv">01 · Epidemic simulation engine</div>
          <h2 className="sw-h2 sw-rv">Simulate the outbreak. Test the response.</h2>
          <p className="sw-p sw-rv">
            Pick a disease, adjust the parameters, and watch spread unfold across the map over 60
            days.
          </p>
          <div className={cardClass}>
            <div className="sw-chips">
              {PRESETS.map((preset) => {
                const isSelected =
                  Math.abs(params.transmission - preset.transmission) < 0.01 &&
                  params.vaccination === preset.vaccination &&
                  params.delay === preset.delay
                return (
                  <button
                    key={preset.label}
                    type="button"
                    className={isSelected ? "is-on" : undefined}
                    onClick={() =>
                      onChangeParams({
                        transmission: preset.transmission,
                        vaccination: preset.vaccination,
                        delay: preset.delay,
                      })
                    }
                  >
                    {preset.label}
                  </button>
                )
              })}
            </div>

            <label className="sw-sl">
              <span>Transmission rate</span>
              <output>×{params.transmission.toFixed(2)}</output>
              <input
                type="range"
                min={0.5}
                max={2}
                step={0.05}
                value={params.transmission}
                onChange={(e) =>
                  onChangeParams({ ...params, transmission: Number(e.target.value) })
                }
              />
            </label>

            <label className="sw-sl">
              <span>Vaccination</span>
              <output>{params.vaccination}%</output>
              <input
                type="range"
                min={0}
                max={60}
                step={1}
                value={params.vaccination}
                onChange={(e) =>
                  onChangeParams({ ...params, vaccination: Number(e.target.value) })
                }
              />
            </label>

            <label className="sw-sl">
              <span>Response delay</span>
              <output>{params.delay} days</output>
              <input
                type="range"
                min={5}
                max={40}
                step={1}
                value={params.delay}
                onChange={(e) => onChangeParams({ ...params, delay: Number(e.target.value) })}
              />
            </label>

            <div className="sw-read">
              <div className="sw-big">{telemetry.infectedPct}%</div>
              <small>of the map infected · Day {String(telemetry.day).padStart(2, "0")} / 60</small>
            </div>

            <div className="sw-lg">
              <span>
                <i style={{ background: "#5a2a2a" }} />
                Susceptible
              </span>
              <span>
                <i style={{ background: "#ff2b2b" }} />
                Infected
              </span>
              <span>
                <i style={{ background: "#fff" }} />
                Vaccinated
              </span>
            </div>
            <div className="sw-fn">Simulation, not a forecast.</div>
          </div>
        </div>
      </div>

      {/* Beat 2: Multi-agent CrewAI */}
      <div className={beatClass(2)}>
        <div className="sw-col sw-interactive">
          <div className="sw-n sw-rv">02 · AI multi-agent system · CrewAI</div>
          <h2 className="sw-h2 sw-rv">Four agents. One response plan.</h2>
          <p className="sw-p sw-rv">
            Intelligent agents plan the response together, from policy to logistics to public
            reaction.
          </p>
          <div className={cardClass}>
            <div className="sw-row">
              <i className="sw-ag">1</i>
              <div>
                <b>Medical Policy Advisor</b>
                <span>Recommends public health interventions</span>
              </div>
            </div>
            <div className="sw-row">
              <i className="sw-ag">2</i>
              <div>
                <b>Logistics Agent</b>
                <span>Allocates beds, staff and medicine</span>
              </div>
            </div>
            <div className="sw-row">
              <i className="sw-ag">3</i>
              <div>
                <b>Public Sentiment Monitor</b>
                <span>Tracks public reaction (simulated)</span>
              </div>
            </div>
            <div className="sw-row">
              <i className="sw-ag">4</i>
              <div>
                <b>Government Simulator</b>
                <span>Models the impact of policy delays</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Beat 3: Funding */}
      <div className={beatClass(3)}>
        <div className="sw-col sw-interactive">
          <div className="sw-n sw-rv">03 · Funding simulation · Masumi</div>
          <h2 className="sw-h2 sw-rv">Follow the funding</h2>
          <p className="sw-p sw-rv">
            Simulate financial flows with preprod ADA through decentralized protocols from Masumi,
            and track funding across agents.
          </p>
          <div className={cardClass}>
            <div className="sw-row">
              <div>
                <b>Government / NGO wallets</b>
                <span>Simulation wallets</span>
              </div>
              <em>SIMULATED</em>
            </div>
            <div className="sw-row">
              <div>
                <b>Medical personnel payments</b>
                <span>Payment simulation</span>
              </div>
              <em>SIMULATED</em>
            </div>
            <div className="sw-row">
              <div>
                <b>Funding across agents</b>
                <span>Tracked end to end</span>
              </div>
              <em>SIMULATED</em>
            </div>
            <div className="sw-fn">Preprod ADA only. No real funds move.</div>
          </div>
        </div>
      </div>

      {/* Beat 4: Real-world datasets */}
      <div className={beatClass(4)}>
        <div className="sw-col sw-interactive">
          <div className="sw-n sw-rv">04 · Real-world datasets</div>
          <h2 className="sw-h2 sw-rv">Grounded in public data</h2>
          <p className="sw-p sw-rv">
            Simulations draw on open health datasets, and insights stay open to everyone, in line
            with SDG 3.
          </p>
          <div className={cardClass}>
            <div className="sw-chips">
              <span>WHO Epidemic Reports</span>
              <span>CDC Influenza Dataset</span>
              <span>India COVID Resources · data.gov.in</span>
              <span>NHS medical response APIs</span>
            </div>
            <div className="sw-row">
              <div>
                <b>SDG 3</b>
                <span>Good Health and Well-being</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Beat 5: Outro */}
      <div className={beatClass(5, "sw-c")}>
        <div className="sw-interactive">
          <div className="sw-n sw-rv">Prepared, not reactive</div>
          <h2 className="sw-h2 sw-rv">Preparedness, rehearsed.</h2>
          <div className="sw-rv flex flex-wrap justify-center">
            <a
              className="sw-pill"
              href="https://medscop.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Open live demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <Link
              className="sw-pill sw-pill-o"
              href="/writing/from-hackathon-prototype-to-real-ai-system"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Architecture essay</span>
            </Link>
            <button
              type="button"
              className="sw-pill sw-pill-o"
              onClick={() => onJumpToChapter(2)}
            >
              <span>Next · IndieCrop</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
