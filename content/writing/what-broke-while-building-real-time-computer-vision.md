---
title: "What Broke While Building Real-Time Computer Vision"
description: "A post-mortem of performance traps, WebGL memory leaks, and frame-rate drops when running vision models directly on client hardware."
date: "2026-07-22"
category: "Engineering & Performance"
tags:
  - Computer Vision
  - WebGL
  - Performance
  - Optimization
  - Browser Internals
featured: false
draft: false
---

Building computer vision models in Python notebooks with PyTorch or TensorFlow on high-end desktop GPUs is straightforward. Deploying those same models to run smoothly inside a client browser on mid-tier laptops, Chromebooks, and smartphones is a completely different engineering challenge.

Over the past two years building client-side vision prototypes and interactive kinematic tools, I encountered a series of subtle performance traps that rarely appear in documentation. Here is a breakdown of what broke, why it broke, and how we solved it.

## 1. The `getImageData()` Canvas Bottleneck

When capturing frames from a webcam `<video>` element to feed into an inference runtime, the most common beginner pattern is drawing the video frame to a 2D canvas and reading the pixels back:

```javascript
// The naïve approach — CPU bottleneck
ctx.drawImage(videoElement, 0, 0, width, height)
const frameData = ctx.getImageData(0, 0, width, height) // FORBIDDEN IN CRITICAL PATH
```

### Why It Breaks
`ctx.getImageData()` forces a synchronous GPU-to-CPU roundtrip readback. The browser's compositing thread stalls waiting for the GPU pipeline to flush pixel buffers into standard RAM. On high-DPI displays or resolutions above 720p, this single call alone consumed 14ms—eating nearly half of our entire 33ms frame window.

### The Fix
Pass the video element or an `ImageBitmap` directly into the WebGL texture pipeline or TensorFlow.js/ONNX tensor constructor:

```javascript
// Zero-copy texture binding
const bitmap = await createImageBitmap(videoElement, {
  resizeWidth: 320,
  resizeHeight: 240,
  resizeQuality: "pixelated",
})
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bitmap)
bitmap.close() // explicitly release GPU memory
```

## 2. V8 Garbage Collector Spikes

During continuous 30 FPS video processing, any object allocation inside the render or inference loop adds to the JavaScript heap. In our early builds, frame rates would maintain 30 FPS for roughly 12 seconds, then violently freeze for 180ms before resuming.

Profiling with Chrome DevTools Performance tab showed the culprit: **Minor GC (Scavenger) runs occurring every few seconds, followed by a Major Mark-Sweep pause.**

| Metric | Before Optimization | After Pre-allocation |
| :--- | :--- | :--- |
| Peak Memory Allocation Rate | ~42 MB / sec | < 0.2 MB / sec |
| Max GC Pause Duration | 185 ms | 4.2 ms |
| Sustained Frame Rate | 21 FPS (erratic) | 30 FPS (stable) |

### The Fix: Pre-allocated Typed Arrays and Object Pools

We banned all object literal creation (`{ x, y, z }`) and array allocations inside `requestAnimationFrame`. Instead, we initialized static `Float32Array` buffers once during startup and passed mutated pointer indices through functions.

```typescript
// Pre-allocated flat buffer holding 33 landmarks × 3 coordinates
const LANDMARK_BUFFER = new Float32Array(33 * 3)

function extractLandmarksInPlace(rawDetections: number[], outBuffer: Float32Array): void {
  for (let i = 0; i < rawDetections.length; i++) {
    outBuffer[i] = rawDetections[i]
  }
}
```

## 3. Thermal Throttling on Integrated GPUs

In benchmarks on development machines, a model might run in 18ms. But when running continuously on an ultrabook unplugged from power, the browser GPU process begins throttling clock speeds after 90 seconds to manage thermals. Inference time creeps up from 18ms to 28ms, then 45ms, until the fan spins up and frames drop.

### The Fix: Dynamic Resolution and Inference Skipping

Instead of demanding uniform fidelity at all times, we added an adaptive controller that monitors moving averages of inference completion times:

* If rolling average inference exceeds 26ms over 10 consecutive frames, dynamically downscale video input resolution from $480\times360$ to $320\times240$.
* If thermal load persists, perform keypoint inference on alternate frames (15 Hz) while interpolating visual coordinates at 30 Hz using a lightweight Kalman filter.

## Summary Checklist for Client-Side Vision

* **Never call `ctx.getImageData()` in a render loop.**
* **Never allocate new objects or arrays inside frame callbacks.**
* **Always run heavy inference in a Web Worker or OffscreenCanvas context to keep the UI main thread responsive.**
* **Measure 99th-percentile frame times ($P_{99}$), not just averages.**
