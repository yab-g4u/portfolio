"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { ArrowUpRight } from "lucide-react"

interface CarouselItem {
  name: string
  subtitle: string
  href: string
  image: string
  backdrop: string
}

const CAROUSEL_ITEMS: CarouselItem[] = [
  {
    name: "Omniq",
    subtitle: "Voice AI Infrastructure · 2G / PSTN",
    href: "https://omniq-sigma.vercel.app/",
    image: "/assets/aistudio/image_391c6682.png",
    backdrop: "#050505",
  },
  {
    name: "Suno",
    subtitle: "Vision & Assistive Speech",
    href: "https://sunoos.vercel.app/",
    image: "/assets/aistudio/image_cf58bb54.png",
    backdrop: "#fcf9ec",
  },
  {
    name: "Surf",
    subtitle: "Local Hybrid IR · Zero-Cloud",
    href: "https://github.com/yab-g4u/surf.git",
    image: "/assets/aistudio/image_cb1f0fea.png",
    backdrop: "#ffffff",
  },
  {
    name: "CandidateFlow",
    subtitle: "AI Recruitment & CV Synthesis",
    href: "https://candidatefloww.netlify.app/",
    image: "/assets/aistudio/image_946ea523.png",
    backdrop: "#f6f4ef",
  },
  {
    name: "ShieldGuard",
    subtitle: "Telecom Trust & CAMARA APIs",
    href: "https://shieldguard.vercel.app/",
    image: "/assets/aistudio/image_79489152.png",
    backdrop: "#050708",
  },
  {
    name: "IndieCrop",
    subtitle: "AgriTech AI & Blockchain PWA",
    href: "https://indiecropp.vercel.app/",
    image: "/assets/aistudio/image_7730982e.png",
    backdrop: "#030508",
  },
]

const CARD_W = 1024
const CARD_H = 740
const INITIAL_INDEX = 2

function drawRoundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + w - radius, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius)
  ctx.lineTo(x + w, y + h - radius)
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h)
  ctx.lineTo(x + radius, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
}

function paintCardCanvas(
  canvas: HTMLCanvasElement,
  item: CarouselItem,
  index: number,
  total: number,
  img?: HTMLImageElement | null
) {
  const w = canvas.width
  const h = canvas.height
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  ctx.clearRect(0, 0, w, h)
  ctx.save()

  // Outer card clip
  drawRoundedRectPath(ctx, 2, 2, w - 4, h - 4, 38)
  ctx.clip()

  // Crimson-noir base surface
  const bgGrad = ctx.createLinearGradient(0, 0, w, h)
  bgGrad.addColorStop(0, "#140607")
  bgGrad.addColorStop(0.55, "#0d0405")
  bgGrad.addColorStop(1, "#260407")
  ctx.fillStyle = bgGrad
  ctx.fillRect(0, 0, w, h)

  // Subtle crimson corner glow
  const glow = ctx.createRadialGradient(w * 0.82, h * 0.96, 10, w * 0.82, h * 0.96, w * 0.65)
  glow.addColorStop(0, "rgba(214, 4, 7, 0.36)")
  glow.addColorStop(1, "rgba(214, 4, 7, 0)")
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, w, h)

  // Screenshot viewport inside card
  const padX = 24
  const padTop = 24
  const frameW = w - padX * 2
  const frameH = 548
  const frameRadius = 24

  ctx.save()
  drawRoundedRectPath(ctx, padX, padTop, frameW, frameH, frameRadius)
  ctx.clip()

  ctx.fillStyle = item.backdrop
  ctx.fillRect(padX, padTop, frameW, frameH)

  if (img && img.naturalWidth > 0 && img.naturalHeight > 0) {
    const scale = Math.min(frameW / img.naturalWidth, frameH / img.naturalHeight)
    const drawW = img.naturalWidth * scale
    const drawH = img.naturalHeight * scale
    const drawX = padX + (frameW - drawW) / 2
    const drawY = padTop + (frameH - drawH) / 2
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = "high"
    ctx.drawImage(img, drawX, drawY, drawW, drawH)
  } else {
    const placeholderGrad = ctx.createLinearGradient(padX, padTop, padX + frameW, padTop + frameH)
    placeholderGrad.addColorStop(0, "#1d0709")
    placeholderGrad.addColorStop(1, "#0b0405")
    ctx.fillStyle = placeholderGrad
    ctx.fillRect(padX, padTop, frameW, frameH)
  }

  // Subtle top-down inner edge vignette over screenshot frame
  const edgeShade = ctx.createLinearGradient(0, padTop + frameH - 70, 0, padTop + frameH)
  edgeShade.addColorStop(0, "rgba(0, 0, 0, 0)")
  edgeShade.addColorStop(1, "rgba(10, 4, 5, 0.24)")
  ctx.fillStyle = edgeShade
  ctx.fillRect(padX, padTop, frameW, frameH)
  ctx.restore()

  // Crisp inner frame border around screenshot
  drawRoundedRectPath(ctx, padX, padTop, frameW, frameH, frameRadius)
  ctx.strokeStyle = "rgba(255, 255, 255, 0.16)"
  ctx.lineWidth = 2
  ctx.stroke()

  // Footer editorial typography inside card
  const footerY = padTop + frameH + 56
  ctx.fillStyle = "#ffffff"
  ctx.font = "400 52px 'Instrument Serif', Georgia, serif"
  ctx.textBaseline = "alphabetic"
  ctx.fillText(item.name, padX + 8, footerY)

  ctx.fillStyle = "rgba(255, 214, 214, 0.84)"
  ctx.font = "500 22px 'Inter', system-ui, sans-serif"
  ctx.fillText(item.subtitle, padX + 8, footerY + 38)

  // Right-aligned index indicator inside card footer
  const idxText = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`
  ctx.font = "600 20px ui-monospace, SFMono-Regular, Menlo, monospace"
  ctx.fillStyle = "rgba(255, 176, 176, 0.9)"
  const idxWidth = ctx.measureText(idxText).width
  ctx.fillText(idxText, w - padX - idxWidth - 10, footerY - 8)

  ctx.restore()

  // Outer crimson-noir rim stroke
  drawRoundedRectPath(ctx, 2, 2, w - 4, h - 4, 38)
  ctx.strokeStyle = "rgba(255, 43, 43, 0.34)"
  ctx.lineWidth = 2.5
  ctx.stroke()
}

export function ProjectCarousel3D() {
  const boxRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [activeIndex, setActiveIndex] = useState(INITIAL_INDEX)
  const targetRef = useRef(INITIAL_INDEX)

  useEffect(() => {
    const box = boxRef.current
    const canvas = canvasRef.current
    if (!box || !canvas) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    } catch {
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50)
    camera.position.set(0, 0.04, 5.1)

    const group = new THREE.Group()
    group.rotation.x = 0.08
    scene.add(group)

    const geometry = new THREE.PlaneGeometry(1.94, 1.4)
    const cardCanvases: HTMLCanvasElement[] = []
    const loadedImages: Array<HTMLImageElement | null> = []
    const textures: THREE.CanvasTexture[] = []
    const materials: THREE.MeshBasicMaterial[] = []
    const meshes: THREE.Mesh[] = []
    const imageElements: HTMLImageElement[] = []

    const maxAnisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy() || 1)
    let disposed = false

    CAROUSEL_ITEMS.forEach((item, i) => {
      const cardCanvas = document.createElement("canvas")
      cardCanvas.width = CARD_W
      cardCanvas.height = CARD_H
      paintCardCanvas(cardCanvas, item, i, CAROUSEL_ITEMS.length, null)

      const tex = new THREE.CanvasTexture(cardCanvas)
      tex.colorSpace = THREE.SRGBColorSpace
      tex.minFilter = THREE.LinearMipmapLinearFilter
      tex.magFilter = THREE.LinearFilter
      tex.anisotropy = maxAnisotropy
      tex.needsUpdate = true

      const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true })
      const mesh = new THREE.Mesh(geometry, mat)
      mesh.userData.index = i
      group.add(mesh)

      cardCanvases.push(cardCanvas)
      loadedImages.push(null)
      textures.push(tex)
      materials.push(mat)
      meshes.push(mesh)

      const img = new window.Image()
      img.decoding = "async"
      img.onload = () => {
        if (disposed) return
        loadedImages[i] = img
        paintCardCanvas(cardCanvas, item, i, CAROUSEL_ITEMS.length, img)
        tex.needsUpdate = true
      }
      img.src = item.image
      imageElements.push(img)
    })

    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (disposed) return
        CAROUSEL_ITEMS.forEach((item, i) => {
          paintCardCanvas(cardCanvases[i], item, i, CAROUSEL_ITEMS.length, loadedImages[i])
          textures[i].needsUpdate = true
        })
      })
    }

    const count = CAROUSEL_ITEMS.length
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let cur = INITIAL_INDEX
    let dragging = false
    let startX = 0
    let startY = 0
    let startTarget = INITIAL_INDEX
    let idle = 0
    let mx = 0
    let my = 0
    let visible = false
    let lastReported = INITIAL_INDEX

    const resize = () => {
      const b = box.getBoundingClientRect()
      if (b.width === 0 || b.height === 0) return
      renderer.setSize(b.width, b.height, false)
      const aspect = b.width / b.height
      camera.aspect = aspect
      camera.position.z = aspect < 1.05 ? 6.6 : aspect < 1.5 ? 5.6 : 5.0
      camera.updateProjectionMatrix()
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(box)

    const onPointerDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement)?.closest("a, button")) return
      dragging = true
      startX = e.clientX
      startY = e.clientY
      startTarget = targetRef.current
      box.setPointerCapture(e.pointerId)
    }

    const onPointerMove = (e: PointerEvent) => {
      const b = box.getBoundingClientRect()
      mx = (e.clientX - b.left) / b.width - 0.5
      my = (e.clientY - b.top) / b.height - 0.5
      if (dragging) {
        targetRef.current = startTarget - (e.clientX - startX) / Math.max(140, b.width / 4.2)
        idle = 0
      }
    }

    const onPointerUp = (e: PointerEvent) => {
      if (!dragging) return
      dragging = false
      const dist = Math.hypot(e.clientX - startX, e.clientY - startY)
      if (dist < 8) {
        const b = box.getBoundingClientRect()
        pointer.x = ((e.clientX - b.left) / b.width) * 2 - 1
        pointer.y = -((e.clientY - b.top) / b.height) * 2 + 1
        raycaster.setFromCamera(pointer, camera)
        const hits = raycaster.intersectObjects(meshes, false)
        if (hits.length > 0) {
          const hitIndex = hits[0].object.userData.index
          if (typeof hitIndex === "number") {
            targetRef.current = hitIndex
            setActiveIndex(hitIndex)
            idle = 0
            return
          }
        }
      }
      targetRef.current = Math.round(Math.max(0, Math.min(count - 1, targetRef.current)))
    }

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault()
        targetRef.current = Math.max(0, Math.min(count - 1, targetRef.current + e.deltaX * 0.004))
        idle = 0
      }
    }

    box.addEventListener("pointerdown", onPointerDown)
    box.addEventListener("pointermove", onPointerMove)
    box.addEventListener("pointerup", onPointerUp)
    box.addEventListener("pointercancel", onPointerUp)
    box.addEventListener("wheel", onWheel, { passive: false })

    const io = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? false
    })
    io.observe(box)

    let rafId = 0
    const loop = (ts: number) => {
      rafId = window.requestAnimationFrame(loop)
      if (!visible) return

      if (
        !prefersReducedMotion &&
        !dragging &&
        ++idle > 320 &&
        Math.abs(targetRef.current - Math.round(targetRef.current)) < 0.01
      ) {
        targetRef.current = (Math.round(targetRef.current) + 1) % count
        idle = 220
      }

      cur += (targetRef.current - cur) * 0.085
      const t = ts / 1000

      meshes.forEach((m, i) => {
        const o = i - cur
        const a = Math.abs(o)
        m.position.set(
          o * 1.72,
          prefersReducedMotion ? 0.1 : 0.1 + Math.sin(t * 0.65 + i) * 0.025,
          -a * 0.36 + (a < 0.6 ? 0.6 - a : 0) * 0.72
        )
        m.rotation.y = -Math.max(-1, Math.min(1, o)) * 0.46 * Math.min(1, a)
        m.scale.setScalar(1 + (a < 1 ? (1 - a) * 0.24 : 0))
        materials[i].opacity = Math.max(0.32, 1 - a * 0.16)
      })

      group.rotation.y = mx * 0.09
      group.rotation.x = 0.08 + my * 0.05
      renderer.render(scene, camera)

      const nearest = Math.round(Math.max(0, Math.min(count - 1, cur)))
      if (nearest !== lastReported) {
        lastReported = nearest
        setActiveIndex(nearest)
      }
    }
    rafId = window.requestAnimationFrame(loop)

    return () => {
      disposed = true
      window.cancelAnimationFrame(rafId)
      imageElements.forEach((img) => {
        img.onload = null
      })
      box.removeEventListener("pointerdown", onPointerDown)
      box.removeEventListener("pointermove", onPointerMove)
      box.removeEventListener("pointerup", onPointerUp)
      box.removeEventListener("pointercancel", onPointerUp)
      box.removeEventListener("wheel", onWheel)
      ro.disconnect()
      io.disconnect()
      geometry.dispose()
      textures.forEach((tx) => tx.dispose())
      materials.forEach((mt) => mt.dispose())
      renderer.dispose()
    }
  }, [])

  const selectDot = (index: number) => {
    targetRef.current = index
    setActiveIndex(index)
  }

  const activeItem = CAROUSEL_ITEMS[activeIndex] ?? CAROUSEL_ITEMS[0]

  return (
    <div className="gal card g3 rv" id="gal" ref={boxRef}>
      <canvas id="gl2" ref={canvasRef} />
      <div className="dots flex-col items-center gap-2.5" id="dots">
        <div className="flex items-center gap-2.5">
          {CAROUSEL_ITEMS.map((item, i) => (
            <button
              key={item.name}
              type="button"
              className={i === activeIndex ? "on" : undefined}
              onClick={() => selectDot(i)}
              aria-label={`Inspect ${item.name} in 3D carousel`}
              title={item.name}
            />
          ))}
        </div>
        <a
          href={activeItem.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-[#ff2b2b]/45 bg-[#120405]/90 px-3.5 py-1 text-xs font-medium text-[#ffe9e9] hover:bg-[#d60407] hover:border-[#ff6a6a] transition-colors"
        >
          <span>Open {activeItem.name}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  )
}
