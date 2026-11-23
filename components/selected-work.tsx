"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { ArrowDown } from "lucide-react"
import "./selected-work/selected-work.css"
import {
  CHAPTERS,
  CHAPTER_RANGES,
  OPENER_END_P,
  SMOOTH_FACTOR,
  TOTAL_SCROLL_VH,
  TRANSITION_DURATION_MS,
} from "./selected-work/chapters-config"
import {
  clamp01,
  detectSoftwareWebGL,
  type MedscopeParams,
  type MedscopeTelemetry,
  type SceneCreateOptions,
  type SceneHandle,
} from "./selected-work/scenes/types"
import { createProbeScene } from "./selected-work/scenes/probe-scene"
import { createMedscopeScene } from "./selected-work/scenes/medscope-scene"
import { createIndieCropScene } from "./selected-work/scenes/indiecrop-scene"
import { createIdaScene } from "./selected-work/scenes/ida-scene"
import { ProbeOverlay } from "./selected-work/overlays/ProbeOverlay"
import { MedscopeOverlay } from "./selected-work/overlays/MedscopeOverlay"
import { IndieCropOverlay } from "./selected-work/overlays/IndieCropOverlay"
import { IdaOverlay } from "./selected-work/overlays/IdaOverlay"

type CurtainPhase = "idle" | "in" | "out"

function createSceneForChapter(
  chapterIdx: number,
  options: SceneCreateOptions
): SceneHandle | null {
  switch (chapterIdx) {
    case 0:
      return createProbeScene(options)
    case 1:
      return createMedscopeScene(options)
    case 2:
      return createIndieCropScene(options)
    case 3:
      return createIdaScene(options)
    default:
      return null
  }
}

export function SelectedWork() {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const [reducedMotion, setReducedMotion] = useState(false)
  const [renderedChapter, setRenderedChapter] = useState<number>(-1) // -1 = Opener
  const [beatIndex, setBeatIndex] = useState<number>(0)
  const [subLabel, setSubLabel] = useState<string>("04 Projects")
  const [curtainPhase, setCurtainPhase] = useState<CurtainPhase>("idle")
  const [curtainLabel, setCurtainLabel] = useState<string>("Selected Work")
  const [curtainSkipTransition, setCurtainSkipTransition] = useState<boolean>(false)

  const [medscopeParams, setMedscopeParams] = useState<MedscopeParams>({
    transmission: 1.3,
    vaccination: 20,
    delay: 18,
  })
  const [medscopeTelemetry, setMedscopeTelemetry] = useState<MedscopeTelemetry>({
    infectedPct: 0,
    day: 0,
  })

  // Mutable refs for 60fps RAF loop without tearing down renderer
  const renderedChapterRef = useRef<number>(-1)
  const desiredChapterRef = useRef<number>(-1)
  const beatIndexRef = useRef<number>(0)
  const subLabelRef = useRef<string>("04 Projects")
  const localTargetPRef = useRef<number>(0)
  const smoothPRef = useRef<number>(0)
  const chapterEnterTimeRef = useRef<number>(0)
  const isWipingRef = useRef<boolean>(false)
  const isVisibleRef = useRef<boolean>(false)
  const medscopeParamsRef = useRef<MedscopeParams>(medscopeParams)
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const activeSceneRef = useRef<SceneHandle | null>(null)
  const reducedMotionRef = useRef<boolean>(false)

  useEffect(() => {
    medscopeParamsRef.current = medscopeParams
  }, [medscopeParams])

  // Track prefers-reduced-motion live
  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => {
      reducedMotionRef.current = mq.matches
      setReducedMotion(mq.matches)
    }
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  const swapSceneImmediately = useCallback((nextIdx: number) => {
    const renderer = rendererRef.current
    const stage = stageRef.current
    if (activeSceneRef.current) {
      activeSceneRef.current.dispose()
      activeSceneRef.current = null
    }

    if (renderer && stage && nextIdx >= 0) {
      const rect = stage.getBoundingClientRect()
      const aspect = rect.height > 0 ? rect.width / rect.height : window.innerWidth / window.innerHeight
      const isMobile = window.innerWidth < 800
      try {
        activeSceneRef.current = createSceneForChapter(nextIdx, {
          renderer,
          isMobile,
          reducedMotion: reducedMotionRef.current,
          aspect,
        })
      } catch {
        activeSceneRef.current = null
      }
    }

    renderedChapterRef.current = nextIdx
    smoothPRef.current = localTargetPRef.current
    chapterEnterTimeRef.current = performance.now()
    setRenderedChapter(nextIdx)

    if (nextIdx >= 0) {
      const ch = CHAPTERS[nextIdx]
      const count = ch.id === "probe" ? 9 : 6
      const initBeat = Math.min(count - 1, Math.round(localTargetPRef.current * (count - 1)))
      beatIndexRef.current = initBeat
      setBeatIndex(initBeat)
      const initSub = ch.subChapters[Math.min(ch.subChapters.length - 1, initBeat)] ?? ch.tagline
      subLabelRef.current = initSub
      setSubLabel(initSub)
    } else {
      beatIndexRef.current = 0
      setBeatIndex(0)
      subLabelRef.current = "04 Projects"
      setSubLabel("04 Projects")
    }
  }, [])

  // Main WebGL renderer, scroll progress tracker, transition orchestrator, and IntersectionObserver RAF loop
  useEffect(() => {
    const wrap = wrapRef.current
    const stage = stageRef.current
    const canvas = canvasRef.current
    if (!wrap || !stage || !canvas) return

    const isSoftwareGl = detectSoftwareWebGL()
    let renderer: THREE.WebGLRenderer | null = null
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: "high-performance",
      })
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 1.5))
      renderer.setClearColor(0x000000, 0)
    } catch {
      renderer = null
    }
    rendererRef.current = renderer

    const handleResize = () => {
      const rect = stage.getBoundingClientRect()
      const w = rect.width || window.innerWidth
      const h = rect.height || window.innerHeight
      const isMobile = window.innerWidth < 800
      if (renderer) {
        renderer.setSize(w, h, false)
        renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 1.5))
      }
      if (activeSceneRef.current && h > 0) {
        activeSceneRef.current.resize(w / h, isMobile)
      }
    }
    handleResize()

    const ro = new ResizeObserver(handleResize)
    ro.observe(stage)

    const onPointerMove = (e: PointerEvent) => {
      pointerRef.current.x = e.clientX / window.innerWidth - 0.5
      pointerRef.current.y = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true })

    let wipeTimer1 = 0
    let wipeTimer2 = 0
    let wipeTimer3 = 0

    const triggerTransition = (nextIdx: number) => {
      if (isWipingRef.current || reducedMotionRef.current) {
        if (reducedMotionRef.current) swapSceneImmediately(nextIdx)
        return
      }
      isWipingRef.current = true
      const targetTitle = nextIdx >= 0 ? CHAPTERS[nextIdx].title : "Selected Work"
      setCurtainLabel(targetTitle)
      setCurtainSkipTransition(false)
      setCurtainPhase("in")

      const halfMs = Math.round(TRANSITION_DURATION_MS / 2)
      wipeTimer1 = window.setTimeout(() => {
        const finalTarget = desiredChapterRef.current
        swapSceneImmediately(finalTarget)
        setCurtainPhase("out")

        wipeTimer2 = window.setTimeout(() => {
          setCurtainSkipTransition(true)
          setCurtainPhase("idle")
          wipeTimer3 = window.setTimeout(() => {
            setCurtainSkipTransition(false)
            isWipingRef.current = false
            if (desiredChapterRef.current !== renderedChapterRef.current) {
              triggerTransition(desiredChapterRef.current)
            }
          }, 30)
        }, halfMs + 40)
      }, halfMs)
    }

    const computeScroll = () => {
      if (reducedMotionRef.current) return
      const rect = wrap.getBoundingClientRect()
      const scrollable = wrap.offsetHeight - window.innerHeight
      const rawP = scrollable > 0 ? clamp01(-rect.top / scrollable) : 0

      if (rawP < OPENER_END_P) {
        desiredChapterRef.current = -1
        localTargetPRef.current = OPENER_END_P > 0 ? rawP / OPENER_END_P : 0
      } else {
        const matched =
          CHAPTER_RANGES.find((r) => rawP >= r.startP && rawP <= r.endP) ??
          CHAPTER_RANGES[CHAPTER_RANGES.length - 1]
        desiredChapterRef.current = matched.index
        const span = matched.endP - matched.startP || 1
        localTargetPRef.current = clamp01((rawP - matched.startP) / span)
      }

      if (desiredChapterRef.current !== renderedChapterRef.current && !isWipingRef.current) {
        triggerTransition(desiredChapterRef.current)
      }
    }

    computeScroll()
    window.addEventListener("scroll", computeScroll, { passive: true })

    // Clock & active-only RAF loop managed by IntersectionObserver
    const clock = new THREE.Clock()
    let rafId = 0

    const frameLoop = () => {
      rafId = window.requestAnimationFrame(frameLoop)
      if (!isVisibleRef.current || reducedMotionRef.current) return

      const elapsed = clock.getElapsedTime()
      const now = performance.now()
      const chIdx = renderedChapterRef.current

      if (chIdx >= 0) {
        smoothPRef.current += (localTargetPRef.current - smoothPRef.current) * SMOOTH_FACTOR
        const p = clamp01(smoothPRef.current)
        const ch = CHAPTERS[chIdx]

        // Update active beat & HUD sub-chapter label
        const maxBeat = ch.id === "probe" ? 8 : 5
        const nextBeat = Math.min(maxBeat, Math.round(p * maxBeat))
        if (nextBeat !== beatIndexRef.current) {
          beatIndexRef.current = nextBeat
          setBeatIndex(nextBeat)
        }

        const subIdx =
          ch.id === "ida"
            ? Math.min(ch.subChapters.length - 1, Math.floor(p * 5 + 0.35))
            : Math.min(ch.subChapters.length - 1, nextBeat)
        const nextSub = ch.subChapters[subIdx] ?? ch.tagline
        if (nextSub !== subLabelRef.current) {
          subLabelRef.current = nextSub
          setSubLabel(nextSub)
        }

        // Update active Three.js scene
        if (activeSceneRef.current && renderer) {
          activeSceneRef.current.update(p, elapsed, pointerRef.current, {
            medscope: medscopeParamsRef.current,
            onMedscopeTelemetry: (tel) => setMedscopeTelemetry(tel),
            chapterEnterTime: chapterEnterTimeRef.current,
            now,
          })
          renderer.render(activeSceneRef.current.scene, activeSceneRef.current.camera)
        }
      } else if (renderer) {
        // Clear during Opener beat
        renderer.clear()
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0]?.isIntersecting ?? false
        if (isVisibleRef.current) {
          computeScroll()
        }
      },
      { threshold: 0 }
    )
    io.observe(wrap)

    rafId = window.requestAnimationFrame(frameLoop)

    return () => {
      window.cancelAnimationFrame(rafId)
      window.clearTimeout(wipeTimer1)
      window.clearTimeout(wipeTimer2)
      window.clearTimeout(wipeTimer3)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener("scroll", computeScroll)
      window.removeEventListener("pointermove", onPointerMove)
      if (activeSceneRef.current) {
        activeSceneRef.current.dispose()
        activeSceneRef.current = null
      }
      if (renderer) {
        renderer.dispose()
        rendererRef.current = null
      }
    }
  }, [swapSceneImmediately])

  const scrollToChapter = useCallback(
    (index: number) => {
      const wrap = wrapRef.current
      if (!wrap) return
      const range = CHAPTER_RANGES[index]
      if (!range) return
      const wrapTop = wrap.getBoundingClientRect().top + window.scrollY
      const scrollable = Math.max(1, wrap.offsetHeight - window.innerHeight)
      const targetP = range.startP + 0.015 * (range.endP - range.startP)
      window.scrollTo({
        top: Math.round(wrapTop + targetP * scrollable),
        behavior: reducedMotion ? "auto" : "smooth",
      })
    },
    [reducedMotion]
  )

  const currentChapter = renderedChapter >= 0 ? CHAPTERS[renderedChapter] : null
  const stageStyle = {
    "--sw-stage-bg": currentChapter ? currentChapter.bgHex : "#0a0a0a",
    "--sw-stage-fog": currentChapter ? currentChapter.fogHex : "#2a0406",
  } as React.CSSProperties

  const curtainClass =
    curtainPhase === "in"
      ? "sw-pn phase-in"
      : curtainPhase === "out"
        ? "sw-pn phase-out"
        : "sw-pn"

  const scrimClass =
    currentChapter?.scrimVariant === "left"
      ? "sw-scr sw-scr--left"
      : currentChapter?.scrimVariant === "bottom"
        ? "sw-scr sw-scr--bottom"
        : "sw-scr sw-scr--ambient"

  return (
    <section id="works" aria-label="Selected Work">
      <div
        id="selected-work"
        ref={wrapRef}
        className="sw-wrap"
        style={{ height: reducedMotion ? "auto" : `${TOTAL_SCROLL_VH}svh` }}
      >
        <div className="sw-stage" ref={stageRef} style={stageStyle}>
          {/* Single shared WebGL canvas */}
          <canvas className="sw-gl" ref={canvasRef} aria-hidden="true" />
          <div className="sw-dz" aria-hidden="true" />
          <div className={scrimClass} aria-hidden="true" />

          {/* Crimson transition curtain (.pn language) */}
          <div
            className={curtainClass}
            style={{
              transition: curtainSkipTransition
                ? "none"
                : `transform ${Math.round(TRANSITION_DURATION_MS / 2)}ms cubic-bezier(0.7, 0, 0.2, 1)`,
            }}
            aria-hidden="true"
          >
            <div className="sw-pn-title">{curtainLabel}</div>
          </div>

          {/* Persistent Selected Work HUD (offset cleanly below main site dock) */}
          <div className="sw-hud">
            <div className="sw-hud-left">
              <span className="sw-hud-idx">
                {currentChapter ? `${currentChapter.number} / 04` : "00 / 04"}
              </span>
              <span>·</span>
              <span>{currentChapter ? currentChapter.title : "Selected Work"}</span>
            </div>

            <div className="sw-hud-right">
              <span className="sw-hud-sub">
                {currentChapter?.id === "medscope"
                  ? `${subLabel} · Day ${String(medscopeTelemetry.day).padStart(2, "0")} / 60`
                  : subLabel}
              </span>
            </div>
          </div>

          {/* 4 Clickable chapter index ticks */}
          <nav className="sw-ticks" aria-label="Project chapters">
            {CHAPTERS.map((ch, idx) => (
              <button
                key={ch.id}
                type="button"
                className={`sw-tick ${renderedChapter === idx ? "is-on" : ""}`}
                onClick={() => scrollToChapter(idx)}
                aria-label={`Jump to chapter ${ch.number}: ${ch.title}`}
              >
                <span className="sw-tick-label">
                  {ch.number} · {ch.title}
                </span>
                <span className="sw-tick-dot" />
              </button>
            ))}
          </nav>

          {/* Per-project chapter overlays driven by scroll progress */}
          <div className="sw-overlay-root">
            {/* Opener beat: Selected Work · 04 projects */}
            {(reducedMotion || renderedChapter === -1) && (
              <div className={`sw-beat sw-c ${reducedMotion || renderedChapter === -1 ? "is-active" : ""}`}>
                <div className="sw-interactive max-w-3xl mx-auto">
                  <div className="sw-n sw-rv">Selected Work · 04 projects</div>
                  <h2 className="sw-h1 sw-rv" style={{ fontSize: "clamp(42px, 7.6vw, 128px)" }}>
                    Selected Work.
                  </h2>
                  <p className="sw-p sw-lead sw-rv mx-auto">
                    Four interactive engineering chapters — scroll through each system in motion,
                    or jump straight to any chapter below.
                  </p>
                  <div className="sw-opener-grid sw-rv">
                    {CHAPTERS.map((ch, idx) => (
                      <button
                        key={ch.id}
                        type="button"
                        className="sw-opener-btn"
                        onClick={() => scrollToChapter(idx)}
                      >
                        <span className="text-[#ff6a6a]">{ch.number}</span>
                        <span>{ch.title}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 sw-rv">
                    <button
                      type="button"
                      className="sw-pill"
                      onClick={() => scrollToChapter(0)}
                    >
                      <span>Start Chapter 01 · Probe</span>
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Chapter 01: Probe */}
            {(reducedMotion || renderedChapter === 0) && (
              <ProbeOverlay
                beatIndex={beatIndex}
                reducedMotion={reducedMotion}
                onJumpToChapter={scrollToChapter}
              />
            )}

            {/* Chapter 02: Medscope */}
            {(reducedMotion || renderedChapter === 1) && (
              <MedscopeOverlay
                beatIndex={beatIndex}
                reducedMotion={reducedMotion}
                params={medscopeParams}
                telemetry={medscopeTelemetry}
                onChangeParams={setMedscopeParams}
                onJumpToChapter={scrollToChapter}
              />
            )}

            {/* Chapter 03: IndieCrop */}
            {(reducedMotion || renderedChapter === 2) && (
              <IndieCropOverlay
                beatIndex={beatIndex}
                reducedMotion={reducedMotion}
                onJumpToChapter={scrollToChapter}
              />
            )}

            {/* Chapter 04: IDA */}
            {(reducedMotion || renderedChapter === 3) && (
              <IdaOverlay beatIndex={beatIndex} reducedMotion={reducedMotion} />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
