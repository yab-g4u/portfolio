import * as THREE from "three"
import {
  smoothstep,
  type SceneCreateOptions,
  type SceneHandle,
  type SceneUpdateState,
} from "./types"

const AFRICA_POLY: [number, number][] = [
  [-5.9, 35.8], [-2, 35.1], [3, 36.8], [10.2, 37.3], [11, 33.5], [15, 32.3], [20, 32.8],
  [25, 31.6], [32.5, 31.2], [34, 28], [35.5, 24], [37, 21], [38.5, 18], [40, 15.5],
  [43.2, 12.7], [43, 11.5], [51.2, 11.8], [50.5, 9], [48, 4.5], [42, -1], [40, -4],
  [39.3, -7], [40.5, -11], [40.5, -15], [35, -19.5], [35.5, -24], [32.8, -26], [32.5, -28.5],
  [30, -31.5], [27, -33.7], [22, -34.2], [18.4, -34.2], [18, -31], [15.2, -27], [14.5, -22],
  [11.7, -17.2], [13.5, -12], [12.3, -6], [9, -1], [9.5, 3.8], [6, 4.3], [2, 6.3], [-2, 4.8],
  [-7.5, 4.4], [-11.5, 6.8], [-13.5, 9.5], [-17, 14.7], [-16.5, 19], [-17, 21], [-13, 27.7],
  [-9.8, 30], [-9.2, 33], [-6.8, 34],
]

const HUBS: [number, number][] = [
  [38.7, 9],
  [36.8, -1.3],
  [3.4, 6.5],
  [31.2, 30],
  [28, -26],
  [-17.4, 14.7],
]

const EDGES: [number, number][] = [
  [0, 1],
  [0, 3],
  [0, 2],
  [1, 4],
  [2, 5],
]

const ORIGINS: [number, number][] = [
  [24, -3],
  [-5, 10],
]

function pointInAfrica(x: number, y: number): boolean {
  let c = false
  for (let i = 0, j = AFRICA_POLY.length - 1; i < AFRICA_POLY.length; j = i++) {
    const a = AFRICA_POLY[i]
    const b = AFRICA_POLY[j]
    if ((a[1] > y) !== (b[1] > y) && x < ((b[0] - a[0]) * (y - a[1])) / (b[1] - a[1]) + a[0]) {
      c = !c
    }
  }
  return c
}

export function createMedscopeScene({
  renderer,
  isMobile,
  reducedMotion,
  aspect,
}: SceneCreateOptions): SceneHandle {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, aspect || 1, 0.1, 300)
  const group = new THREE.Group()
  scene.add(group)

  const geometries: THREE.BufferGeometry[] = []
  const materials: THREE.Material[] = []
  const textures: THREE.Texture[] = []

  const k = 0.5
  const projX = (lon: number) => (lon - 17) * k
  const projY = (lat: number) => (lat - 1) * k
  const step = isMobile ? 1.8 : 1.3
  const dots: [number, number][] = []

  for (let lat = -35; lat <= 37.5; lat += step) {
    for (let lon = -18; lon <= 52; lon += step) {
      if (pointInAfrica(lon, lat) || ((lon - 47) / 2.6) ** 2 + ((lat + 19.5) / 6.5) ** 2 < 1) {
        dots.push([lon, lat])
      }
    }
  }

  const N = dots.length
  const tI = new Float32Array(N)
  const rr = new Float32Array(N)
  const cl = new Float32Array(N * 3)
  const ps = new Float32Array(N * 3)

  dots.forEach((d, i) => {
    ps.set([projX(d[0]), projY(d[1]), 0], i * 3)
    const minDist = Math.min(...ORIGINS.map((o) => Math.hypot(d[0] - o[0], d[1] - o[1])))
    tI[i] = minDist * 1.15 + Math.random() * 4
    rr[i] = Math.random()
  })

  const dc = document.createElement("canvas")
  dc.width = dc.height = 32
  const dx = dc.getContext("2d")!
  const dg = dx.createRadialGradient(16, 16, 0, 16, 16, 16)
  dg.addColorStop(0, "#fff")
  dg.addColorStop(0.45, "#fff")
  dg.addColorStop(1, "rgba(255,255,255,0)")
  dx.fillStyle = dg
  dx.fillRect(0, 0, 32, 32)
  const dt = new THREE.CanvasTexture(dc)
  dt.colorSpace = THREE.SRGBColorSpace
  textures.push(dt)

  const geo = new THREE.BufferGeometry()
  geo.setAttribute("position", new THREE.BufferAttribute(ps, 3))
  geo.setAttribute("color", new THREE.BufferAttribute(cl, 3))
  const pm = new THREE.PointsMaterial({
    size: (isMobile ? 7 : 6.5) * renderer.getPixelRatio(),
    sizeAttenuation: false,
    vertexColors: true,
    map: dt,
    transparent: true,
    depthWrite: false,
  })
  geometries.push(geo)
  materials.push(pm)
  group.add(new THREE.Points(geo, pm))

  const hubVecs = HUBS.map((h) => new THREE.Vector3(projX(h[0]), projY(h[1]), 0.1))

  const rc = document.createElement("canvas")
  rc.width = rc.height = 64
  const rx = rc.getContext("2d")!
  rx.strokeStyle = "#fff"
  rx.lineWidth = 4
  rx.beginPath()
  rx.arc(32, 32, 26, 0, Math.PI * 2)
  rx.stroke()
  const rt = new THREE.CanvasTexture(rc)
  rt.colorSpace = THREE.SRGBColorSpace
  textures.push(rt)

  const rings = hubVecs.map((v) => {
    const mat = new THREE.SpriteMaterial({ map: rt, transparent: true, depthTest: false })
    materials.push(mat)
    const s = new THREE.Sprite(mat)
    s.position.copy(v)
    group.add(s)
    return s
  })

  const lg = new THREE.BufferGeometry().setFromPoints(
    EDGES.flatMap((e) => [hubVecs[e[0]], hubVecs[e[1]]])
  )
  const lm = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 })
  geometries.push(lg)
  materials.push(lm)
  group.add(new THREE.LineSegments(lg, lm))

  const FN = EDGES.length * 10
  const fp = new Float32Array(FN * 3)
  const fg = new THREE.BufferGeometry()
  fg.setAttribute("position", new THREE.BufferAttribute(fp, 3))
  const fm = new THREE.PointsMaterial({
    size: 8 * renderer.getPixelRatio(),
    sizeAttenuation: false,
    color: 0xffd0d0,
    map: dt,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  })
  geometries.push(fg)
  materials.push(fm)
  const fl = new THREE.Points(fg, fm)
  fl.frustumCulled = false
  group.add(fl)

  let mobFlag = isMobile
  let lastReportedDay = -1
  let lastReportedPct = -1

  const resize = (nextAspect: number, nextMobile: boolean) => {
    mobFlag = nextMobile
    camera.aspect = nextAspect || 1
    camera.updateProjectionMatrix()
  }

  const update = (
    p: number,
    t: number,
    pointer: { x: number; y: number },
    state: SceneUpdateState
  ) => {
    const params = state.medscope ?? { transmission: 1.3, vaccination: 20, delay: 18 }
    const Tm = reducedMotion ? 26 : smoothstep(0.06, 0.4, p) * 60
    const sp = params.transmission
    const vac = params.vaccination / 100
    const dl = params.delay

    let infected = 0
    for (let i = 0; i < N; i++) {
      let tt = tI[i] / sp
      if (tt > dl) tt = dl + (tt - dl) * 3
      let r: number
      let g: number
      let b: number
      if (rr[i] < vac * 0.8) {
        r = g = b = 0.95
      } else if (Tm > tt) {
        infected++
        const f = Math.min(1, (Tm - tt) / 3)
        r = 1
        g = b = 0.17 + 0.8 * (1 - f)
      } else {
        r = 0.36
        g = b = 0.16
      }
      cl[i * 3] = r
      cl[i * 3 + 1] = g
      cl[i * 3 + 2] = b
    }
    ;(geo.attributes.color as THREE.BufferAttribute).needsUpdate = true

    const dayVal = Math.round(Tm)
    const pctVal = Math.round((infected / N) * 100)
    if ((dayVal !== lastReportedDay || pctVal !== lastReportedPct) && state.onMedscopeTelemetry) {
      lastReportedDay = dayVal
      lastReportedPct = pctVal
      state.onMedscopeTelemetry({ infectedPct: pctVal, day: dayVal })
    }

    const rv = smoothstep(dl, dl + 6, Tm)
    const ag = smoothstep(0.34, 0.46, p)
    const fw = smoothstep(0.54, 0.64, p) * (1 - smoothstep(0.9, 1, p) * 0.6)

    rings.forEach((s, i) => {
      const sVal = rv * (2.4 + (reducedMotion ? 0 : Math.sin(t * 2 + i) * 0.3)) + 0.001
      s.visible = rv > 0.01
      s.scale.setScalar(sVal)
      ;(s.material as THREE.SpriteMaterial).opacity = rv * 0.9
    })

    lm.opacity = ag * 0.55
    fm.opacity = fw
    fl.visible = fw > 0.01

    EDGES.forEach((e, j) => {
      const a = hubVecs[e[0]]
      const b = hubVecs[e[1]]
      for (let q = 0; q < 10; q++) {
        const f = ((reducedMotion ? 0.4 : t * 0.25) + q / 10) % 1
        const o = (j * 10 + q) * 3
        fp[o] = a.x + (b.x - a.x) * f
        fp[o + 1] = a.y + (b.y - a.y) * f
        fp[o + 2] = 0.15
      }
    })
    ;(fg.attributes.position as THREE.BufferAttribute).needsUpdate = true

    pm.opacity = 1 - 0.55 * smoothstep(0.88, 1, p)
    const mxOff = reducedMotion ? 0 : pointer.x * 0.12
    const myOff = reducedMotion ? 0 : pointer.y * 0.1
    const sway = reducedMotion ? 0 : Math.sin(t * 0.2) * 0.06
    group.rotation.set(-0.85 - myOff, sway + mxOff, 0)
    camera.position.set(0, 0, mobFlag ? 62 : 50)
    camera.lookAt(mobFlag ? 0 : -9, mobFlag ? -15 : 0, 0)
  }

  const dispose = () => {
    textures.forEach((tx) => tx.dispose())
    geometries.forEach((g) => g.dispose())
    materials.forEach((m) => m.dispose())
  }

  return {
    scene,
    camera,
    bgHex: "#0d0305",
    fogHex: "#1c0305",
    update,
    resize,
    dispose,
  }
}
