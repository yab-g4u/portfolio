"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

const VERTEX_SHADER = `
varying vec2 v;
void main() {
  v = uv;
  gl_Position = vec4(position, 1.0);
}
`

const FRAGMENT_SHADER = `
precision highp float;
varying vec2 v;
uniform float t;
uniform vec2 r, m;

float h(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float n(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(h(i), h(i + vec2(1.0, 0.0)), f.x),
    mix(h(i + vec2(0.0, 1.0)), h(i + 1.0), f.x),
    f.y
  );
}

float b2(vec2 p) {
  return fract(p.x * 0.5 + p.y * p.y * 0.75);
}

float b4(vec2 p) {
  return b2(0.5 * p) * 0.25 + b2(p);
}

float fbm(vec2 p) {
  float a = 0.5, s = 0.0;
  for (int i = 0; i < 5; i++) {
    s += a * n(p);
    p = p * 2.02 + 7.0;
    a *= 0.5;
  }
  return s;
}

void main() {
  vec2 p = (v - 0.5) * vec2(r.x / max(r.y, 1.0), 1.0) * 2.2;
  p += (m - 0.5) * 0.3;
  float T = t * 0.07;

  vec2 q = vec2(fbm(p + T), fbm(p + vec2(5.2, 1.3) - T));
  vec2 w = vec2(
    fbm(p + 3.0 * q + vec2(1.7, 9.2) + T * 1.3),
    fbm(p + 3.0 * q + vec2(8.3, 2.8) - T)
  );
  float f = fbm(p + 3.0 * w);

  vec3 red = vec3(0.9, 0.0, 0.0);
  vec3 rosso = vec3(0.84, 0.016, 0.03);
  vec3 blk = vec3(0.07, 0.07, 0.07);
  vec3 tl = vec3(0.01, 0.05, 0.05);

  vec3 c = mix(blk, rosso, smoothstep(0.25, 0.75, f));
  c = mix(c, red, smoothstep(0.45, 0.9, q.x) * 0.7);
  c = mix(c, tl, smoothstep(0.5, 1.0, (1.0 - v.y) * 0.6 + (1.0 - v.x) * 0.5 + q.y * 0.3) * 0.6);

  c *= 0.75 + 0.4 * smoothstep(0.0, 1.0, 1.0 - length(v - vec2(0.5, 0.2)));
  c = pow(c, vec3(0.95));

  float L = 7.0;
  c = floor(c * L + b4(floor(gl_FragCoord.xy / 3.0))) / L;
  gl_FragColor = vec4(c, 1.0);
}
`

export function HeroShader() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: "high-performance" })
    } catch {
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const uniforms = {
      t: { value: 0 },
      r: { value: new THREE.Vector2(1, 1) },
      m: { value: new THREE.Vector2(0.5, 0.5) },
    }

    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      depthWrite: false,
      depthTest: false,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const resize = () => {
      const b = parent.getBoundingClientRect()
      if (b.width === 0 || b.height === 0) return
      renderer.setSize(b.width, b.height, false)
      uniforms.r.value.set(b.width, b.height)
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(parent)

    const targetMouse = new THREE.Vector2(0.5, 0.5)
    const onPointerMove = (e: PointerEvent) => {
      targetMouse.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight)
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true })

    let isVisible = true
    const io = new IntersectionObserver((entries) => {
      isVisible = entries[0]?.isIntersecting ?? true
    })
    io.observe(canvas)

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let rafId = 0
    const renderLoop = (ts: number) => {
      rafId = window.requestAnimationFrame(renderLoop)
      if (!isVisible) return
      uniforms.t.value = reducedMotion ? 1.5 : ts / 1000
      uniforms.m.value.lerp(targetMouse, 0.04)
      renderer.render(scene, camera)
    }
    rafId = window.requestAnimationFrame(renderLoop)

    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener("pointermove", onPointerMove)
      ro.disconnect()
      io.disconnect()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      id="gl"
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: -1 }}
    />
  )
}
