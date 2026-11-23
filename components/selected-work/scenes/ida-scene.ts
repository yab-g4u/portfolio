import * as THREE from "three"
import { lerp, smoothstep, type SceneCreateOptions, type SceneHandle } from "./types"

const PINS: [number, number][] = [
  [4.8, -4.8],
  [9.6, 4.8],
  [-9.6, -9.6],
  [0, 9.6],
  [14.4, -9.6],
]

export function createIdaScene({
  isMobile,
  reducedMotion,
  aspect,
  isLight = false,
}: SceneCreateOptions): SceneHandle {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, aspect || 1, 0.1, 300)
  const Y = -40

  const geometries: THREE.BufferGeometry[] = []
  const materials: THREE.Material[] = []

  scene.add(new THREE.AmbientLight(0xff8080, 0.55))
  const dl = new THREE.DirectionalLight(0xffffff, 1.3)
  dl.position.set(4, 8, 6)
  scene.add(dl)
  const pl = new THREE.PointLight(0xff2b2b, 2, 40)
  pl.position.set(-5, 2, 4)
  scene.add(pl)

  // Capsule
  const mR = new THREE.MeshStandardMaterial({ color: 0xd60407, roughness: 0.22, metalness: 0.1 })
  const mW = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.25 })
  const coreMat = new THREE.MeshBasicMaterial({ color: 0xff5a5a })
  materials.push(mR, mW, coreMat)

  const cylGeo = new THREE.CylinderGeometry(1, 1, 1.6, 40)
  cylGeo.rotateZ(Math.PI / 2)
  const spGeo = new THREE.SphereGeometry(1, 40, 20)
  const coreGeo = new THREE.SphereGeometry(0.7, 24, 16)
  geometries.push(cylGeo, spGeo, coreGeo)

  const makeHalf = (mat: THREE.Material, dir: number) => {
    const g = new THREE.Group()
    const cy = new THREE.Mesh(cylGeo, mat)
    cy.position.x = dir * 0.8
    const sp = new THREE.Mesh(spGeo, mat)
    sp.position.x = dir * 1.6
    g.add(cy, sp)
    return g
  }

  const hl = makeHalf(mR, -1)
  const hr = makeHalf(mW, 1)
  const core = new THREE.Mesh(coreGeo, coreMat)
  const cap = new THREE.Group()
  cap.add(hl, hr, core)
  cap.rotation.z = 0.55
  cap.scale.setScalar(1.25)
  scene.add(cap)

  // Orbiting mini pills
  const pillGeo = new THREE.SphereGeometry(0.28, 16, 10)
  pillGeo.scale(1.7, 0.8, 0.8)
  geometries.push(pillGeo)

  const orbitingPills = Array.from({ length: 16 }, (_, i) => {
    const m = new THREE.Mesh(pillGeo, i % 2 ? mR : mW)
    scene.add(m)
    return {
      m,
      a: Math.random() * Math.PI * 2,
      r: 4 + Math.random() * 3.5,
      h: (Math.random() - 0.5) * 5,
      v: 0.15 + Math.random() * 0.3,
    }
  })

  // City grid & pharmacy pins at Y = -40
  const city = new THREE.Group()
  scene.add(city)

  let gr = new THREE.GridHelper(
    57.6,
    12,
    isLight ? 0xd60407 : 0xff2b2b,
    isLight ? 0xd0c9cb : 0x6a0408
  )
  gr.position.y = Y + 0.01
  city.add(gr)

  const pgGeo = new THREE.PlaneGeometry(120, 120)
  pgGeo.rotateX(-Math.PI / 2)
  const pgMat = new THREE.MeshBasicMaterial({ color: isLight ? 0xf2eff0 : 0x100304 })
  geometries.push(pgGeo)
  materials.push(pgMat)
  const pg = new THREE.Mesh(pgGeo, pgMat)
  pg.position.y = Y
  city.add(pg)

  const blocks: [number, number, number][] = []
  for (let x = -9; x <= 9; x++) {
    for (let z = -9; z <= 9; z++) {
      if (x % 3 === 0 || z % 3 === 0 || Math.random() < 0.22) continue
      blocks.push([x * 1.6, z * 1.6, 0.5 + Math.pow(Math.random(), 2) * 4])
    }
  }

  const boxGeo = new THREE.BoxGeometry(1, 1, 1)
  const boxMat = new THREE.MeshStandardMaterial({
    color: isLight ? 0xd8d0d2 : 0x3a0508,
    roughness: 0.65,
  })
  geometries.push(boxGeo)
  materials.push(boxMat)
  const bm = new THREE.InstancedMesh(boxGeo, boxMat, blocks.length)
  bm.frustumCulled = false
  const dummy = new THREE.Object3D()
  blocks.forEach((b, i) => {
    dummy.position.set(b[0], Y + b[2] / 2, b[1])
    dummy.scale.set(1.15, b[2], 1.15)
    dummy.updateMatrix()
    bm.setMatrixAt(i, dummy.matrix)
  })
  bm.instanceMatrix.needsUpdate = true
  city.add(bm)

  const pinHeadGeo = new THREE.SphereGeometry(0.4, 16, 10)
  const pinConeGeo = new THREE.ConeGeometry(0.32, 0.9, 12)
  pinConeGeo.rotateX(Math.PI)
  const pinRingGeo = new THREE.RingGeometry(0.5, 0.62, 32)
  pinRingGeo.rotateX(-Math.PI / 2)
  geometries.push(pinHeadGeo, pinConeGeo, pinRingGeo)

  const pins = PINS.map((p, i) => {
    const g = new THREE.Group()
    const c = i ? (isLight ? 0xd60407 : 0xff2b2b) : isLight ? 0x18181b : 0xffffff
    const headMat = new THREE.MeshBasicMaterial({ color: c })
    const ringMat = new THREE.MeshBasicMaterial({ color: c, transparent: true })
    materials.push(headMat, ringMat)

    const head = new THREE.Mesh(pinHeadGeo, headMat)
    head.position.y = 1.5
    const cone = new THREE.Mesh(pinConeGeo, headMat)
    cone.position.y = 0.7
    const ring = new THREE.Mesh(pinRingGeo, ringMat)
    ring.position.y = 0.05

    g.add(head, cone, ring)
    g.position.set(p[0], Y, p[1])
    g.userData.ring = ring
    g.userData.ringMat = ringMat
    g.userData.headMat = headMat
    g.userData.isPrimary = i === 0
    city.add(g)
    return g
  })

  const meGeo = new THREE.SphereGeometry(0.45, 16, 10)
  const meMat = new THREE.MeshBasicMaterial({ color: isLight ? 0x18181b : 0xffffff })
  geometries.push(meGeo)
  materials.push(meMat)
  const me = new THREE.Mesh(meGeo, meMat)
  me.position.set(-4.8, Y + 0.5, 4.8)
  city.add(me)

  const cv = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-4.8, Y + 0.15, 4.8),
      new THREE.Vector3(-4.8, Y + 0.15, -4.2),
      new THREE.Vector3(-4.2, Y + 0.15, -4.8),
      new THREE.Vector3(4.8, Y + 0.15, -4.8),
    ],
    false,
    "catmullrom",
    0.1
  )
  const tubeGeo = new THREE.TubeGeometry(cv, 80, 0.16, 6)
  const tubeMat = new THREE.MeshBasicMaterial({ color: isLight ? 0x18181b : 0xffffff })
  geometries.push(tubeGeo)
  materials.push(tubeMat)
  const tube = new THREE.Mesh(tubeGeo, tubeMat)
  city.add(tube)
  const IC = tubeGeo.index ? tubeGeo.index.count : tubeGeo.attributes.position.count

  let mobFlag = isMobile
  const cpos = new THREE.Vector3()
  const ctar = new THREE.Vector3()

  const resize = (nextAspect: number, nextMobile: boolean) => {
    mobFlag = nextMobile
    camera.aspect = nextAspect || 1
    camera.updateProjectionMatrix()
  }

  const update = (p: number, t: number, pointer: { x: number; y: number }) => {
    const a = smoothstep(0.04, 0.2, p)
    const b = smoothstep(0.28, 0.42, p)
    const c = smoothstep(0.42, 0.58, p)
    const px = mobFlag ? 0 : 3.1

    const x = p < 0.3 ? lerp(px, -px, a) : lerp(-px, px, b)
    cap.position.set(x, mobFlag ? lerp(2.2, 2.6, a) : 0, 0)
    cap.rotation.y = reducedMotion ? 0.5 : t * 0.6
    cap.rotation.x = reducedMotion ? 0 : Math.sin(t * 0.7) * 0.2
    const capScale = 1.25 * (1 - c) + 0.001
    cap.visible = capScale > 0.02
    cap.scale.setScalar(capScale)

    hl.position.x = -b * 1.5
    hr.position.x = b * 1.5
    core.scale.setScalar(0.01 + b * (1 + (reducedMotion ? 0 : Math.sin(t * 4) * 0.08)))

    orbitingPills.forEach((q) => {
      if (!reducedMotion) q.a += q.v * 0.01
      q.m.position.set(
        Math.cos(q.a) * q.r + x * 0.5,
        q.h + (reducedMotion ? 0 : Math.sin(t * q.v * 3) * 0.3),
        Math.sin(q.a) * q.r * 0.5 - 3
      )
      q.m.rotation.z = q.a * 2
      const psVal = Math.max(0.001, 1 - c * 1.4)
      q.m.visible = psVal > 0.02
      q.m.scale.setScalar(psVal)
    })

    const mxOff = reducedMotion ? 0 : pointer.x * 1.2
    const myOff = reducedMotion ? 0 : pointer.y * 0.8
    cpos.set(lerp(0, -3, c) + mxOff, lerp(0, -23, c) - myOff, lerp(14, 17, c))
    ctar.set(lerp(0, 3, c), lerp(0, Y, c), 0)
    camera.position.copy(cpos)
    camera.lookAt(ctar)

    pins.forEach((g, i) => {
      const s = smoothstep(0.54 + i * 0.02, 0.66 + i * 0.02, p)
      g.visible = s > 0.01
      g.scale.setScalar(0.001 + s)
      const rMesh = g.userData.ring as THREE.Mesh
      const rMat = g.userData.ringMat as THREE.MeshBasicMaterial
      const k = reducedMotion ? 0.3 : (t * 0.8 + i * 0.3) % 1
      rMesh.scale.setScalar(1 + k * 3)
      rMat.opacity = (1 - k) * s
    })

    const meScale = smoothstep(0.5, 0.58, p)
    me.visible = meScale > 0.01
    me.scale.setScalar(0.001 + meScale)
    tubeGeo.setDrawRange(0, Math.floor((IC * smoothstep(0.62, 0.8, p)) / 3) * 3)
    city.rotation.y = reducedMotion ? 0 : Math.sin(t * 0.15) * 0.05
  }

  const dispose = () => {
    gr.geometry.dispose()
    if (Array.isArray(gr.material)) gr.material.forEach((m) => m.dispose())
    else gr.material.dispose()
    geometries.forEach((g) => g.dispose())
    materials.forEach((m) => m.dispose())
  }

  const setTheme = (light: boolean) => {
    city.remove(gr)
    gr.geometry.dispose()
    if (Array.isArray(gr.material)) gr.material.forEach((m) => m.dispose())
    else gr.material.dispose()
    gr = new THREE.GridHelper(
      57.6,
      12,
      light ? 0xd60407 : 0xff2b2b,
      light ? 0xd0c9cb : 0x6a0408
    )
    gr.position.y = Y + 0.01
    city.add(gr)

    pgMat.color.setHex(light ? 0xf2eff0 : 0x100304)
    boxMat.color.setHex(light ? 0xd8d0d2 : 0x3a0508)
    meMat.color.setHex(light ? 0x18181b : 0xffffff)
    tubeMat.color.setHex(light ? 0x18181b : 0xffffff)
    pins.forEach((g) => {
      const hex = g.userData.isPrimary ? (light ? 0x18181b : 0xffffff) : light ? 0xd60407 : 0xff2b2b
      ;(g.userData.headMat as THREE.MeshBasicMaterial).color.setHex(hex)
      ;(g.userData.ringMat as THREE.MeshBasicMaterial).color.setHex(hex)
    })
  }

  return {
    scene,
    camera,
    bgHex: isLight ? "#f4f2f3" : "#100304",
    fogHex: isLight ? "#f9e7e8" : "#1e0406",
    update,
    setTheme,
    resize,
    dispose,
  }
}
