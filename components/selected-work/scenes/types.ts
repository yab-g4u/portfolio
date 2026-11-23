import type * as THREE from "three"

export interface MedscopeParams {
  transmission: number
  vaccination: number
  delay: number
}

export interface MedscopeTelemetry {
  infectedPct: number
  day: number
}

export interface SceneUpdateState {
  medscope?: MedscopeParams
  onMedscopeTelemetry?: (telemetry: MedscopeTelemetry) => void
  chapterEnterTime: number
  now: number
}

export interface SceneHandle {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  bgHex: string
  fogHex: string
  update: (
    progress: number,
    elapsedSec: number,
    pointer: { x: number; y: number },
    state: SceneUpdateState
  ) => void
  resize: (aspect: number, isMobile: boolean) => void
  dispose: () => void
}

export interface SceneCreateOptions {
  renderer: THREE.WebGLRenderer
  isMobile: boolean
  reducedMotion: boolean
  aspect: number
}

export function clamp01(x: number): number {
  return Math.min(1, Math.max(0, x))
}

export function smoothstep(a: number, b: number, x: number): number {
  const t = clamp01((x - a) / (b - a || 1))
  return t * t * (3 - 2 * t)
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function detectSoftwareWebGL(): boolean {
  if (typeof document === "undefined") return false
  try {
    const testCanvas = document.createElement("canvas")
    const gl = testCanvas.getContext("webgl2") || testCanvas.getContext("webgl")
    if (!gl) return true
    const ext = gl.getExtension("WEBGL_debug_renderer_info")
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER
    const gpu = String(gl.getParameter(param) || "")
    gl.getExtension("WEBGL_lose_context")?.loseContext()
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu)
  } catch {
    return false
  }
}
