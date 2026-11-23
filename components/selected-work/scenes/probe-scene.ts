import * as THREE from "three"
import {
  lerp,
  smoothstep,
  type SceneCreateOptions,
  type SceneHandle,
  type SceneUpdateState,
} from "./types"

interface ProbeCardDatum {
  t: string
  m: string
  s: string
  k: string
  c: number
  g: string
  ib: string
  ic: string
}

const CARD_DATA: ProbeCardDatum[] = [
  {
    t: "Reddit",
    m: "r/technology · 12h ago",
    s: "“AI tools are already replacing a lot of my workflow for drafting documents, querying…”",
    k: "#10b981",
    c: 1,
    g: "r",
    ib: "#ff4500",
    ic: "#fff",
  },
  {
    t: "GitHub",
    m: "1d ago",
    s: "Popular repos & discussions show explosive growth in local LLM coding assistants and…",
    k: "#10b981",
    c: 1,
    g: "gh",
    ib: "#111",
    ic: "#fff",
  },
  {
    t: "Google / Web",
    m: "2d ago",
    s: "News, blogs and articles highlight massive enterprise AI productivity deployments reducing…",
    k: "#10b981",
    c: 1,
    g: "G",
    ib: "#fff",
    ic: "#4285f4",
  },
  {
    t: "X",
    m: "18h ago",
    s: "Many professionals still prefer traditional deterministic tools for complex accounting,…",
    k: "#ef4444",
    c: 2,
    g: "X",
    ib: "#111",
    ic: "#fff",
  },
  {
    t: "Product Reviews",
    m: "1d ago",
    s: "Users report hallucinations, unpredictable UI latency, and context window drift in real-world…",
    k: "#ef4444",
    c: 2,
    g: "★",
    ib: "#fef3c7",
    ic: "#f59e0b",
  },
  {
    t: "Research Papers",
    m: "3d ago",
    s: "Empirical studies across 1,200 operators show mixed results on net speed once verification…",
    k: "#ef4444",
    c: 2,
    g: "≡",
    ib: "#fee2e2",
    ic: "#ef4444",
  },
  {
    t: "Unknown",
    m: "2d ago",
    s: "Long-term cognitive fatigue and liability for automated agent mistakes remain…",
    k: "#9ca3af",
    c: 3,
    g: "?",
    ib: "#f3f4f6",
    ic: "#6b7280",
  },
  {
    t: "Validate with real users",
    m: "Next test",
    s: "Test it on a live product against a concrete task and capture real friction.",
    k: "#6366f1",
    c: 4,
    g: "→",
    ib: "#e0e7ff",
    ic: "#4338ca",
  },
]

const CHIPS: Record<number, [string, string, string]> = {
  1: ["Supports", "#d1fae5", "#047857"],
  2: ["Challenges", "#fee2e2", "#b91c1c"],
  3: ["Blind Spot", "#fef3c7", "#b45309"],
  4: ["Next test", "#e0e7ff", "#4338ca"],
}

const STORY_ROWS = [
  [0, 0, 15, 0, 0, 0, 0, 1, 1, 1, 1, 0],
  [0, 0, 48, 0, 0, 0, 0, 1, 1, 1, 1, 0],
  [0, -0.4, 48, 0, 0, 0, 0, 1, 1, 1, 1, 0],
  [-1, -1, 46, 1, 1, 0, 0, 1, 0.3, 0.3, 0.3, 0],
  [-4, 0, 32, 1, 1, 0, 1, 1, 1, 0.3, 0.3, 0],
  [9, -2, 30, 1, 1, 0, 2, 1, 0.3, 1, 0.3, 0],
  [7, -8, 28, 1, 1, 0, 4, 1, 0.3, 0.3, 1, 1],
  [0, 0, 32, 1, 0.4, 1, 4, 0.2, 0.2, 0.2, 0.2, 0.2],
  [0, 0, 46, 1, 0.15, 0.4, 4, 0.12, 0.12, 0.12, 0.12, 0.12],
]

const IDEA_TEXT = "AI tools will replace most productivity software"
const TABS = [
  "1. Idea & Assumptions",
  "2. Evidence (3)",
  "3. Contradictions (3)",
  "4. Decisions (0)",
  "5. Next Tests (1)",
]

const W = 640
const H = 272
const GR = "#10b981"
const RD = "#ef4444"
const FONT = "Inter, system-ui, sans-serif"
const MONO = "'JetBrains Mono', monospace"

function makeCanvas(w: number, h: number): HTMLCanvasElement {
  const c = document.createElement("canvas")
  c.width = w
  c.height = h
  return c
}

function drawRoundRect(
  x: CanvasRenderingContext2D,
  a: number,
  b: number,
  w: number,
  h: number,
  r: number
) {
  x.beginPath()
  x.moveTo(a + r, b)
  x.arcTo(a + w, b, a + w, b + h, r)
  x.arcTo(a + w, b + h, a, b + h, r)
  x.arcTo(a, b + h, a, b, r)
  x.arcTo(a, b, a + w, b, r)
  x.closePath()
}

function wrapLines(
  x: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number
): string[] {
  const words = text.split(" ")
  const lines: string[] = []
  let line = ""
  for (const w of words) {
    const candidate = line ? `${line} ${w}` : w
    if (x.measureText(candidate).width > maxWidth && line) {
      lines.push(line)
      line = w
    } else {
      line = candidate
    }
  }
  lines.push(line)
  if (lines.length > maxLines) {
    lines.length = maxLines
    lines[maxLines - 1] = lines[maxLines - 1].replace(/\s?\S*$/, "") + "…"
  }
  return lines
}

function mixRow(u: number, j: number): number {
  const i = Math.min(7, Math.floor(u))
  const f = smoothstep(0, 1, u - i)
  return lerp(STORY_ROWS[i][j], STORY_ROWS[i + 1][j], f)
}

export function createProbeScene({
  renderer,
  isMobile,
  reducedMotion,
  aspect,
}: SceneCreateOptions): SceneHandle {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(40, aspect || 1, 0.1, 300)
  const group = new THREE.Group()
  scene.add(group)

  const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy() || 1)
  const textures: THREE.Texture[] = []
  const geometries: THREE.BufferGeometry[] = []
  const materials: THREE.Material[] = []

  const toTexture = (canvas: HTMLCanvasElement): THREE.CanvasTexture => {
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = maxAniso
    textures.push(tex)
    return tex
  }

  const cardTex = (d: ProbeCardDatum, graphMode: number) => {
    const c = makeCanvas(W, H)
    const x = c.getContext("2d")!
    drawRoundRect(x, 3, 3, W - 6, H - 6, 28)
    x.fillStyle = "#faf9f6"
    x.fill()
    x.lineWidth = 3
    x.strokeStyle = "#e6e1d8"
    x.stroke()

    x.beginPath()
    x.arc(66, 70, 32, 0, Math.PI * 2)
    x.fillStyle = d.ib
    x.fill()
    if (d.ib === "#fff") {
      x.lineWidth = 2
      x.strokeStyle = "#e5e7eb"
      x.stroke()
    }
    x.fillStyle = d.ic
    x.font = `700 30px ${FONT}`
    x.textAlign = "center"
    x.textBaseline = "middle"
    x.fillText(d.g, 66, 72)

    x.textAlign = "left"
    x.fillStyle = "#111"
    x.font = `700 30px ${FONT}`
    x.fillText(d.t, 116, 56)
    x.fillStyle = "#8a857c"
    x.font = `500 20px ${MONO}`
    x.fillText(d.m, 116, 94)

    if (!graphMode) {
      x.beginPath()
      x.arc(W - 46, 50, 10, 0, Math.PI * 2)
      x.fillStyle = d.k
      x.fill()
    } else {
      const ch = CHIPS[d.c]
      x.font = `600 20px ${FONT}`
      const cw = x.measureText(ch[0]).width + 30
      drawRoundRect(x, W - cw - 26, 32, cw, 40, 20)
      x.fillStyle = ch[1]
      x.fill()
      x.fillStyle = ch[2]
      x.fillText(ch[0], W - cw - 11, 53)
    }

    x.fillStyle = "#4b4a46"
    x.font = `500 26px ${FONT}`
    wrapLines(x, d.s, W - 76, 3).forEach((l, i) => x.fillText(l, 38, 150 + i * 37))
    return toTexture(c)
  }

  const skTex = (() => {
    const c = makeCanvas(W, H)
    const x = c.getContext("2d")!
    drawRoundRect(x, 3, 3, W - 6, H - 6, 28)
    x.fillStyle = "#faf9f6"
    x.fill()
    x.lineWidth = 3
    x.strokeStyle = "#e6e1d8"
    x.stroke()
    x.fillStyle = "#ebe7df"
    x.beginPath()
    x.arc(66, 70, 32, 0, Math.PI * 2)
    x.fill()
    ;[
      [116, 42, 200, 24],
      [116, 82, 130, 16],
      [38, 140, 564, 20],
      [38, 178, 500, 20],
      [38, 216, 340, 20],
    ].forEach((b) => {
      drawRoundRect(x, b[0], b[1], b[2], b[3], 10)
      x.fill()
    })
    return toTexture(c)
  })()

  const buildIdeaTex = (n: number, gm: number): THREE.CanvasTexture => {
    const c = makeCanvas(640, 320)
    const x = c.getContext("2d")!
    drawRoundRect(x, 3, 3, 634, 314, 30)
    x.fillStyle = "#fff"
    x.fill()
    x.lineWidth = 3
    x.strokeStyle = gm ? "#111" : "#e6e1d8"
    x.stroke()
    x.textAlign = "center"
    x.fillStyle = "#8a857c"
    x.font = `500 20px ${MONO}`
    x.fillText(gm ? "CORE HYPOTHESIS" : "IDEA", 320, 66)
    x.fillStyle = "#111"
    x.font = `700 36px ${FONT}`
    const t = IDEA_TEXT.slice(0, n) + (n < IDEA_TEXT.length ? "|" : "")
    wrapLines(x, gm ? `“${t}”` : t, 520, 4).forEach((l, i) => x.fillText(l, 320, 130 + i * 48))
    const tex = new THREE.CanvasTexture(c)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = maxAniso
    return tex
  }

  const panelTex = (() => {
    const c = makeCanvas(1080, 780)
    const x = c.getContext("2d")!
    drawRoundRect(x, 3, 3, 1074, 774, 64)
    x.fillStyle = "#faf9f6"
    x.fill()
    x.lineWidth = 4
    x.strokeStyle = "#e6e1d8"
    x.stroke()
    x.fillStyle = "#8a857c"
    x.font = `500 19px ${MONO}`
    x.fillText("EVIDENCE REASONING SPACE · 1 INVESTIGATOR", 60, 78)
    x.fillStyle = "#111"
    x.font = `700 48px ${FONT}`
    x.fillText("Living Evidence Graph", 60, 142)
    ;[
      [GR, "Supporting Signal", 70],
      [RD, "Challenging Signal", 330],
    ].forEach(([col, label, px]) => {
      x.beginPath()
      x.arc(px as number, 726, 8, 0, Math.PI * 2)
      x.fillStyle = col as string
      x.fill()
      x.fillStyle = "#4b4a46"
      x.font = `500 20px ${FONT}`
      x.fillText(label as string, (px as number) + 18, 733)
    })
    return toTexture(c)
  })()

  const tabTextures = TABS.map((_, activeIdx) => {
    const c = makeCanvas(930, 76)
    const x = c.getContext("2d")!
    drawRoundRect(x, 2, 2, 926, 72, 36)
    x.fillStyle = "#f1efe9"
    x.fill()
    x.strokeStyle = "#e0dbd1"
    x.lineWidth = 2
    x.stroke()
    x.textBaseline = "middle"
    x.textAlign = "center"
    TABS.forEach((label, i) => {
      const cx = 30 + (i + 0.5) * 174
      if (i === activeIdx) {
        drawRoundRect(x, cx - 84, 12, 168, 52, 26)
        x.fillStyle = "#fff"
        x.fill()
        x.strokeStyle = "#e0dbd1"
        x.stroke()
      }
      x.fillStyle = i === activeIdx ? "#111" : "#8a857c"
      x.font = `${i === activeIdx ? "700" : "500"} 15px ${MONO}`
      x.fillText(label.length > 20 ? label.replace(" & ", " &\u200a") : label, cx, 39)
    })
    return toTexture(c)
  })

  const makePlane = (size: [number, number], map: THREE.Texture, z: number) => {
    const geo = new THREE.PlaneGeometry(size[0], size[1])
    const mat = new THREE.MeshBasicMaterial({ map, transparent: true })
    geometries.push(geo)
    materials.push(mat)
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.z = z
    group.add(mesh)
    return mesh
  }

  const panel = makePlane([36, 26], panelTex, -0.4)
  const tabs = makePlane([31, 2.53], tabTextures[0], -0.35)
  tabs.position.set(0, 9.2, -0.35)
  let currentTab = 0

  const cards = CARD_DATA.map((d, i) => {
    const m = makePlane([8, 3.4], skTex, 0)
    return {
      m,
      d,
      i,
      t0: cardTex(d, 0),
      t1: cardTex(d, 1),
      grp: d.c === 1 ? 1 : d.c === 2 ? 2 : d.c === 3 ? 3 : 4,
      r: 0,
    }
  })

  let currentIdeaTex = buildIdeaTex(reducedMotion ? IDEA_TEXT.length : 0, 0)
  const idea = makePlane([8, 4], currentIdeaTex, 0.05)
  let prevIdeaN = -1
  let prevIdeaG = -1

  const TP: [number, number][] = [
    [-13, 4.1],
    [-13, 0],
    [-13, -4.1],
    [13, 4.1],
    [13, 0],
    [13, -4.1],
    [0, -7.6],
    [13, -10.8],
  ]
  const GP: [number, number][] = [
    [3, 4.4],
    [3, 0],
    [3, -4.4],
    [13, 2.2],
    [13, -2.2],
    [13, -6.6],
    [3, -8.8],
    [13, -10.8],
  ]
  const IT: [number, number] = [0, 0]
  const IG: [number, number] = [-11.5, 0]

  const EC = [0x10b981, 0x10b981, 0x10b981, 0xef4444, 0xef4444, 0xef4444, 0x9ca3af, 0x6366f1]
  const edges = EC.map(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(34 * 3), 3))
    const mat = new THREE.LineDashedMaterial({
      color: 0x9ca3af,
      dashSize: 0.5,
      gapSize: 0.35,
      transparent: true,
    })
    geometries.push(geo)
    materials.push(mat)
    const line = new THREE.Line(geo, mat)
    line.frustumCulled = false
    group.add(line)
    return { g: geo, l: line }
  })
  const GRY = new THREE.Color(0x9ca3af)
  const tmpColor = new THREE.Color()

  // Usability testing window
  const U = new THREE.Group()
  U.position.z = 1
  group.add(U)

  const rectSegs = (x: number, y: number, w: number, h: number) => [
    x, y, 0, x + w, y, 0,
    x + w, y, 0, x + w, y + h, 0,
    x + w, y + h, 0, x, y + h, 0,
    x, y + h, 0, x, y, 0,
  ]
  const wfGeo = new THREE.BufferGeometry()
  wfGeo.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
      [
        ...rectSegs(-11, -7, 22, 14),
        ...rectSegs(-11, 5.2, 22, 1.8),
        ...rectSegs(-9, 1, 10, 2.5),
        ...rectSegs(-9, -2.6, 4, 1.4),
        ...rectSegs(3, -1, 6, 5),
        ...rectSegs(3, -6, 6, 3.8),
        ...rectSegs(-9, -6, 9, 2),
      ],
      3
    )
  )
  const wfMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true })
  geometries.push(wfGeo)
  materials.push(wfMat)
  U.add(new THREE.LineSegments(wfGeo, wfMat))

  const bgwGeo = new THREE.PlaneGeometry(22, 14)
  const bgwMat = new THREE.MeshBasicMaterial({ color: 0x140304, transparent: true })
  geometries.push(bgwGeo)
  materials.push(bgwMat)
  const bgw = new THREE.Mesh(bgwGeo, bgwMat)
  bgw.position.z = -0.05
  U.add(bgw)

  const curvePts = [
    [-10, 6], [-6, 4], [-4, 0.5], [-3, -2], [-1.2, -0.8],
    [1, -3], [0.5, -4.6], [4, -5.2], [6, 0], [5, 2.4],
  ].map((p) => new THREE.Vector3(p[0], p[1], 0.1))
  const cu = new THREE.CatmullRomCurve3(curvePts)
  const cg = new THREE.BufferGeometry().setFromPoints(cu.getPoints(120))
  const cm = new THREE.LineBasicMaterial({ color: 0xff5a5a, transparent: true })
  geometries.push(cg)
  materials.push(cm)
  U.add(new THREE.Line(cg, cm))

  const rc = makeCanvas(64, 64)
  const rx = rc.getContext("2d")!
  rx.strokeStyle = "#fff"
  rx.lineWidth = 5
  rx.beginPath()
  rx.arc(32, 32, 26, 0, Math.PI * 2)
  rx.stroke()
  const rt = toTexture(rc)

  const fr = [
    [-3, -2],
    [0.5, -4.6],
    [6, 0],
  ].map((p) => {
    const sm = new THREE.SpriteMaterial({
      map: rt,
      color: 0xff2b2b,
      transparent: true,
      depthTest: false,
    })
    materials.push(sm)
    const s = new THREE.Sprite(sm)
    s.position.set(p[0], p[1], 0.2)
    U.add(s)
    return s
  })

  const posCache: [number, number][] = Array.from({ length: CARD_DATA.length }, () => [0, 0])

  const resize = (nextAspect: number, _isMobile: boolean) => {
    camera.aspect = nextAspect || 1
    camera.updateProjectionMatrix()
  }

  const update = (
    p: number,
    _t: number,
    pointer: { x: number; y: number },
    state: SceneUpdateState
  ) => {
    const u = Math.min(8, Math.max(0, p * 8))
    const g = mixRow(u, 3)
    const pn = mixRow(u, 4)
    const uv = mixRow(u, 5)
    const st = Math.round(mixRow(u, 6))

    const ty = reducedMotion ? 1 : Math.min(1, Math.max(0, (state.now - state.chapterEnterTime) / 1400))
    const n = Math.floor(IDEA_TEXT.length * ty)
    const gm = g > 0.5 ? 1 : 0
    if (n !== prevIdeaN || gm !== prevIdeaG) {
      prevIdeaN = n
      prevIdeaG = gm
      const nextTex = buildIdeaTex(n, gm)
      const oldTex = currentIdeaTex
      currentIdeaTex = nextTex
      ;(idea.material as THREE.MeshBasicMaterial).map = nextTex
      ;(idea.material as THREE.MeshBasicMaterial).needsUpdate = true
      oldTex.dispose()
    }

    const hl = [mixRow(u, 7), mixRow(u, 8), mixRow(u, 9), mixRow(u, 10), mixRow(u, 11)]
    idea.position.set(lerp(IT[0], IG[0], g), lerp(IT[1], IG[1], g), 0.05)
    ;(idea.material as THREE.MeshBasicMaterial).opacity = hl[0]
    ;(panel.material as THREE.MeshBasicMaterial).opacity = pn
    ;(tabs.material as THREE.MeshBasicMaterial).opacity = pn
    if (st !== currentTab && tabTextures[st]) {
      currentTab = st
      ;(tabs.material as THREE.MeshBasicMaterial).map = tabTextures[st]
      ;(tabs.material as THREE.MeshBasicMaterial).needsUpdate = true
    }

    cards.forEach((c, i) => {
      const r = i < 7 ? smoothstep(0.1 + 0.016 * i, 0.17 + 0.016 * i, p) : smoothstep(0.72, 0.78, p)
      const e = r * r * (3 - 2 * r)
      const tp = TP[i]
      const gp = GP[i]
      const x = lerp(IT[0] + (tp[0] - IT[0]) * e, gp[0], g)
      const y = lerp(IT[1] + (tp[1] - IT[1]) * e, gp[1], g)
      posCache[i][0] = x
      posCache[i][1] = y
      c.m.position.set(i < 7 ? x : gp[0], i < 7 ? y : gp[1], 0)
      c.m.scale.setScalar(0.7 + 0.3 * r)
      const mat = c.m.material as THREE.MeshBasicMaterial
      mat.map = r < 0.55 ? skTex : g > 0.5 ? c.t1 : c.t0
      mat.opacity = Math.min(1, r * 1.6) * (c.grp === 4 ? hl[4] : hl[c.grp])
      c.r = r
      c.m.visible = r > 0.01 && mat.opacity > 0.005
    })

    const ipx = lerp(IT[0], IG[0], g)
    const ipy = lerp(IT[1], IG[1], g)
    edges.forEach((e, i) => {
      const c = cards[i]
      const r = c.r
      const tp = TP[i]
      const dirT = tp[0] < 0 ? -1 : 1
      const up = i === 6
      let sx: number
      let sy: number
      let ex: number
      let ey: number
      if (i === 7) {
        sx = posCache[6][0] + 4
        sy = posCache[6][1]
        ex = GP[7][0] - 4
        ey = GP[7][1]
      } else {
        sx = lerp(ipx + (up ? 0 : dirT * 4), ipx + 4, g)
        sy = lerp(ipy + (up ? -2 : 0), ipy, g)
        ex = lerp(posCache[i][0] - dirT * 4, posCache[i][0] - 4, g)
        ey = lerp(posCache[i][1] + (up ? 1.7 : 0), posCache[i][1], g)
        if (up) ex = lerp(posCache[i][0], posCache[i][0] - 4, g)
      }
      const dir = i === 7 ? 1 : lerp(dirT, 1, g)
      const dh = Math.abs(ex - sx) * 0.5 + 0.01
      const dv = Math.abs(ey - sy) * 0.5
      let a1x = sx + dir * dh
      let a1y = sy
      let b1x = ex - dir * dh
      let b1y = ey
      if (up) {
        a1x = lerp(sx, a1x, g)
        a1y = lerp(sy - dv, a1y, g)
        b1x = lerp(ex, b1x, g)
        b1y = lerp(ey + dv, b1y, g)
      }
      const pa = e.g.attributes.position as THREE.BufferAttribute
      for (let k = 0; k < 34; k++) {
        const tk = k / 33
        const m = 1 - tk
        pa.setXYZ(
          k,
          m * m * m * sx + 3 * m * m * tk * a1x + 3 * m * tk * tk * b1x + tk * tk * tk * ex,
          m * m * m * sy + 3 * m * m * tk * a1y + 3 * m * tk * tk * b1y + tk * tk * tk * ey,
          -0.15
        )
      }
      pa.needsUpdate = true
      const cs = i === 7 ? 1 : smoothstep(0.2, 0.27, p)
      const lmat = e.l.material as THREE.LineDashedMaterial
      lmat.color.copy(GRY).lerp(tmpColor.setHex(EC[i]), cs)
      e.l.computeLineDistances()
      e.g.setDrawRange(0, Math.floor(34 * r))
      lmat.opacity = 0.9 * Math.min(1, r * 2) * (c.grp === 4 ? hl[4] : Math.min(hl[0], hl[c.grp]))
    })

    U.visible = uv > 0.01
    bgwMat.opacity = uv * 0.9
    wfMat.opacity = uv
    cm.opacity = uv
    cg.setDrawRange(0, Math.floor(121 * smoothstep(6.5, 7.5, u)))
    fr.forEach((s, i) => {
      const a = smoothstep(6.9 + i * 0.2, 7.2 + i * 0.2, u)
      s.visible = a * uv > 0.01
      s.scale.setScalar(2.6 * a + 0.001)
      ;(s.material as THREE.SpriteMaterial).opacity = a * uv
    })

    const w = mixRow(u, 2) * (isMobile ? (u < 0.5 ? 0.7 : 0.62) : 1)
    const h = w / (camera.aspect || 1)
    const z = h / 2 / Math.tan((20 * Math.PI) / 180)
    const cx = mixRow(u, 0)
    const cy = mixRow(u, 1) - h * (isMobile ? 0.2 : 0.16)
    const pxOffset = reducedMotion ? 0 : pointer.x * 1.2
    const pyOffset = reducedMotion ? 0 : pointer.y * 0.8
    camera.position.set(cx + pxOffset, cy - pyOffset, z)
    camera.lookAt(cx, cy, 0)
  }

  const dispose = () => {
    currentIdeaTex.dispose()
    textures.forEach((tx) => tx.dispose())
    geometries.forEach((g) => g.dispose())
    materials.forEach((m) => m.dispose())
  }

  return {
    scene,
    camera,
    bgHex: "#150304",
    fogHex: "#240406",
    update,
    resize,
    dispose,
  }
}
