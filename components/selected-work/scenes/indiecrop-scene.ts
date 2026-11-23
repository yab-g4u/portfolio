import * as THREE from "three"
import { lerp, smoothstep, type SceneCreateOptions, type SceneHandle } from "./types"

const terrainH = (x: number, z: number) => Math.sin(x * 0.3) * 0.5 + Math.cos(z * 0.35) * 0.4

const CAMERA_KEYFRAMES: [number, number, number, number, number, number][] = [
  [0, 4, 22, 0, 2, 0],
  [-6, 3, 16, 0, 1, 0],
  [4.5, 3.2, 8, 2, 0.5, 0],
  [0, 16, 13, 0, 0, 0],
  [0, 21, 16, 0, 0, -2],
  [0, 9, 22, 0, 2, -6],
]

export function createIndieCropScene({
  isMobile,
  reducedMotion,
  aspect,
  isLight = false,
}: SceneCreateOptions): SceneHandle {
  const scene = new THREE.Scene()
  const fog = new THREE.FogExp2(isLight ? 0xf7e6e4 : 0x2a0507, isLight ? 0.014 : 0.017)
  scene.fog = fog
  const camera = new THREE.PerspectiveCamera(50, aspect || 1, 0.1, 300)

  const geometries: THREE.BufferGeometry[] = []
  const materials: THREE.Material[] = []

  scene.add(new THREE.AmbientLight(0xff9a80, 0.6))
  const dl = new THREE.DirectionalLight(0xffb080, 1.4)
  dl.position.set(-8, 10, -10)
  scene.add(dl)

  // Sculpted terrain
  const tg = new THREE.PlaneGeometry(90, 70, 90, 70)
  tg.rotateX(-Math.PI / 2)
  const pa = tg.attributes.position as THREE.BufferAttribute
  for (let i = 0; i < pa.count; i++) {
    pa.setY(i, terrainH(pa.getX(i), pa.getZ(i)))
  }
  tg.computeVertexNormals()
  const tMat = new THREE.MeshStandardMaterial({
    color: isLight ? 0xc49588 : 0x3a0d08,
    flatShading: true,
    roughness: 1,
  })
  geometries.push(tg)
  materials.push(tMat)
  scene.add(new THREE.Mesh(tg, tMat))

  // Warm sun on horizon
  const sunGeo = new THREE.SphereGeometry(7, 32, 16)
  const sunMat = new THREE.MeshBasicMaterial({ color: 0xff3b1a, fog: false })
  geometries.push(sunGeo)
  materials.push(sunMat)
  const sun = new THREE.Mesh(sunGeo, sunMat)
  sun.position.set(0, 5, -55)
  scene.add(sun)

  // Instanced crops
  const pts: [number, number, number, number][] = []
  const zStep = isMobile ? 0.95 : 0.75
  const xStep = isMobile ? 0.8 : 0.55
  for (let z = -13; z <= 9; z += zStep) {
    if (((z + 14) % 6) < 0.9) continue
    for (let x = -17; x <= 17; x += xStep) {
      pts.push([
        x + (Math.random() - 0.5) * 0.15,
        z,
        0.45 + Math.random() * 0.6,
        Math.random() * 6,
      ])
    }
  }

  const cropGeo = new THREE.ConeGeometry(0.1, 1, 5)
  cropGeo.translate(0, 0.5, 0)
  const cropMat = new THREE.MeshStandardMaterial({ color: 0x2fa84f, roughness: 0.8 })
  geometries.push(cropGeo)
  materials.push(cropMat)
  const cr = new THREE.InstancedMesh(cropGeo, cropMat, pts.length)
  cr.frustumCulled = false
  const dummy = new THREE.Object3D()
  const tmpColor = new THREE.Color()
  pts.forEach((_, i) => {
    cr.setColorAt(i, tmpColor.setScalar(0.7 + Math.random() * 0.3))
  })
  if (cr.instanceColor) cr.instanceColor.needsUpdate = true
  scene.add(cr)

  const G0 = new THREE.Color(0x2fa84f)
  const G1 = new THREE.Color(0xe0b13a)

  // Field agent GPS pin
  const px = 2
  const pz = 0
  const pin = new THREE.Group()
  const pm = new THREE.MeshBasicMaterial({ color: isLight ? 0x18181b : 0xffffff })
  const headGeo = new THREE.SphereGeometry(0.4, 16, 10)
  const bodyGeo = new THREE.ConeGeometry(0.3, 0.9, 12)
  bodyGeo.rotateX(Math.PI)
  const ringGeo = new THREE.RingGeometry(0.5, 0.62, 40)
  ringGeo.rotateX(-Math.PI / 2)
  const ringMat = new THREE.MeshBasicMaterial({ color: 0xff2b2b, transparent: true })
  geometries.push(headGeo, bodyGeo, ringGeo)
  materials.push(pm, ringMat)

  const headMesh = new THREE.Mesh(headGeo, pm)
  headMesh.position.y = 1.7
  const bodyMesh = new THREE.Mesh(bodyGeo, pm)
  bodyMesh.position.y = 0.8
  const rg = new THREE.Mesh(ringGeo, ringMat)
  rg.position.y = 0.1
  pin.add(headMesh, bodyMesh, rg)
  pin.position.set(px, terrainH(px, pz), pz)
  scene.add(pin)

  // Regional policy heatmap / vertical bars
  const TI: { x: number; z: number; v: number }[] = []
  const tileGeo = new THREE.BoxGeometry(1, 1, 1)
  const tm = new THREE.MeshStandardMaterial({ transparent: true, opacity: 0, roughness: 0.5 })
  geometries.push(tileGeo)
  materials.push(tm)
  const tl = new THREE.InstancedMesh(tileGeo, tm, 42)
  tl.frustumCulled = false
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 6; j++) {
      const v = 0.5 + 0.5 * Math.sin(i * 1.3 + j * 0.9) * Math.cos(j * 0.7 + 0.5)
      TI.push({ x: (i - 3) * 4.4, z: (j - 3) * 4.4 + 1, v })
      tl.setColorAt(i * 6 + j, tmpColor.setHSL(v * 0.33, 0.85, 0.5))
    }
  }
  if (tl.instanceColor) tl.instanceColor.needsUpdate = true
  scene.add(tl)

  const resize = (nextAspect: number) => {
    camera.aspect = nextAspect || 1
    camera.updateProjectionMatrix()
  }

  const update = (p: number, t: number, pointer: { x: number; y: number }) => {
    const g = smoothstep(0, 0.2, p)
    const rp = smoothstep(0.1, 0.42, p)
    const N = smoothstep(0.48, 0.6, p)
    const Gv = smoothstep(0.68, 0.8, p)

    cropMat.color.lerpColors(G0, G1, rp)
    pts.forEach((q, i) => {
      dummy.position.set(q[0], terrainH(q[0], q[1]), q[1])
      dummy.rotation.set(0, 0, reducedMotion ? 0 : Math.sin(t * 1.2 + q[3]) * 0.07)
      dummy.scale.set(1, 0.001 + g * q[2] * 1.3, 1)
      dummy.updateMatrix()
      cr.setMatrixAt(i, dummy.matrix)
    })
    cr.instanceMatrix.needsUpdate = true

    sun.position.y = lerp(-4, 6, smoothstep(0, 0.25, p))

    const a = smoothstep(0.3, 0.4, p) * (1 - smoothstep(0.46, 0.56, p))
    pin.visible = a > 0.01
    pin.scale.setScalar(0.001 + a)
    const k = reducedMotion ? 0.3 : (t * 0.7) % 1
    rg.scale.setScalar(1 + k * 5)
    ringMat.opacity = (1 - k) * a

    tm.opacity = 0.7 * N
    TI.forEach((q, i) => {
      const h = lerp(0.08, 0.4 + q.v * 8, Gv)
      dummy.position.set(q.x, 1.6 + h / 2, q.z)
      dummy.rotation.set(0, 0, 0)
      dummy.scale.set(4, h, 4)
      dummy.updateMatrix()
      tl.setMatrixAt(i, dummy.matrix)
    })
    tl.instanceMatrix.needsUpdate = true
    tl.visible = N > 0.01

    const sg = Math.min(4, Math.floor(p * 5))
    const f = smoothstep(0, 1, p * 5 - sg)
    const a1 = CAMERA_KEYFRAMES[sg]
    const b1 = CAMERA_KEYFRAMES[sg + 1]
    const mxOff = reducedMotion ? 0 : pointer.x * 1.4
    const myOff = reducedMotion ? 0 : pointer.y * 0.8
    camera.position.set(
      lerp(a1[0], b1[0], f) + mxOff,
      lerp(a1[1], b1[1], f) - myOff,
      lerp(a1[2], b1[2], f)
    )
    camera.lookAt(lerp(a1[3], b1[3], f), lerp(a1[4], b1[4], f), lerp(a1[5], b1[5], f))
  }

  const dispose = () => {
    geometries.forEach((g) => g.dispose())
    materials.forEach((m) => m.dispose())
  }

  const setTheme = (light: boolean) => {
    fog.color.setHex(light ? 0xf7e6e4 : 0x2a0507)
    fog.density = light ? 0.014 : 0.017
    tMat.color.setHex(light ? 0xc49588 : 0x3a0d08)
    pm.color.setHex(light ? 0x18181b : 0xffffff)
  }

  return {
    scene,
    camera,
    bgHex: isLight ? "#f4f3f0" : "#140406",
    fogHex: isLight ? "#f7e6e4" : "#2a0507",
    update,
    setTheme,
    resize,
    dispose,
  }
}
