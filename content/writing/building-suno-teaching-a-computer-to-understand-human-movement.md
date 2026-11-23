---
title: "Building Suno: Teaching a Computer to Understand Human Movement"
description: "How I experimented with real-time articulatory kinematics and computer vision to support children's speech-development activities."
date: "2026-08-28"
category: "Computer Vision"
tags:
  - Computer Vision
  - Pose Estimation
  - Assistive AI
  - Kinematics
  - React
featured: true
draft: false
project: "Suno"
---

Speech development in early childhood is fundamentally physical. It is not just about acoustic resonance; it involves coordinated movements of the diaphragm, neck posture, jaw elevation, and subtle facial motor patterns. When building **Suno**, my goal was to test whether commodity consumer webcams and client-side computer vision could provide interactive visual feedback that children find engaging rather than clinical.

Most commercial speech therapy tools operate in one of two modes: audio-only pitch/amplitude visualizers (which fail to teach physical articulation), or expensive proprietary sensory hardware out of reach for most families. I wanted to see how far we could push modern browser-based kinematic tracking without any dedicated hardware or server roundtrips.

## The Core Technical Challenge: The 33ms Frame Budget

Running real-time landmark estimation directly in a browser introduces strict latency constraints. For the interaction to feel organic to a child, the feedback loop must maintain at least 30 frames per second. That leaves roughly **33.3 milliseconds** per frame:

$$\text{Frame Budget} \approx 33.3\text{ ms} = T_{\text{capture}} + T_{\text{inference}} + T_{\text{kinematics}} + T_{\text{render}}$$

If any step in the pipeline overruns, frames drop, the animation stutters, and the child disengages.

```typescript
// Pipeline frame orchestrator with adaptive FPS throttling
export class KinematicStreamController {
  private lastFrameTime = 0
  private targetInterval = 1000 / 30 // 30 FPS target
  private isProcessing = false

  async processFrame(videoElement: HTMLVideoElement, timestamp: number) {
    if (timestamp - this.lastFrameTime < this.targetInterval) {
      return // skip frame to prevent buffer bloat
    }
    if (this.isProcessing) {
      return // drop frame if previous inference still executing
    }

    this.isProcessing = true
    this.lastFrameTime = timestamp

    try {
      const landmarks = await this.poseEstimator.estimate(videoElement)
      if (landmarks) {
        const kinematicMetrics = this.computeArticulatoryMetrics(landmarks)
        this.emitMetrics(kinematicMetrics)
      }
    } finally {
      this.isProcessing = false
    }
  }
}
```

## Extracting Articulatory Kinematics

Instead of evaluating an entire full-body skeleton, Suno narrows the region of interest down to facial landmarks, head orientation angles (yaw, pitch, and roll), and upper-torso postural stability. 

We focused on three key physical indicators:

1. **Vertical Jaw Displacement ($D_{\text{jaw}}$)**: Normalized distance between the lower lip landmark and the chin contour, adjusted by inter-ocular distance to handle camera distance variation.
2. **Horizontal Lip Spread ($W_{\text{lip}}$)**: Corner-to-corner mouth landmark distance, essential for differentiating wide vowels from rounded phonemes.
3. **Neck & Head Stability ($S_{\text{posture}}$)**: Three-dimensional Euler angles derived from facial plane normal vectors, preventing false triggers when the child tilts their head toward a caregiver.

```typescript
function calculateNormalizedJawDisplacement(
  lipCenter: Point3D,
  chinPoint: Point3D,
  interOcularDistance: number
): number {
  const rawDistance = Math.hypot(
    chinPoint.x - lipCenter.x,
    chinPoint.y - lipCenter.y,
    chinPoint.z - lipCenter.z
  )

  // Scale invariance: normalize by distance between pupils
  return rawDistance / (interOcularDistance || 1.0)
}
```

> **Engineering Principle:** Raw pixel distances are useless in consumer video. Every facial landmark measurement must be normalized against an invariant anatomical baseline, such as interpupillary distance, to remain stable as the child moves closer to or further from the screen.

## Making Feedback Engaging Without Overstimulation

A critical discovery during testing was that displaying clinical metrics (like graphs or numerical degrees) confused children and caused frustration. We replaced traditional telemetry with a physics-based interactive avatar:

* When jaw movement matched targeted vowel opening thresholds, an on-screen animated balloon gently expanded.
* When posture slumped forward excessively, the visual environment signaled a soft, playful nudge to sit up.
* All visual transitions were smoothed using low-pass exponential filters to prevent erratic visual jitter caused by sensor noise.

## What Failed and What We Changed

Not everything worked on the first attempt. Here were the three largest failure points:

* **Unfiltered landmark jitter:** In low-light rooms, landmark coordinates oscillated by 2–4 pixels every frame. Applying an Exponential Moving Average (EMA) with adaptive smoothing parameters resolved the jitter without introducing perceptible lag.
* **Canvas memory garbage collection:** Re-allocating image buffers on every frame triggered periodic 100ms GC pauses in V8. Reusing pre-allocated `OffscreenCanvas` objects and typed arrays stabilized memory usage completely.
* **Camera angle sensitivity:** Children rarely look straight into a laptop webcam. We introduced a rapid 3-second calibration baseline at the start of each session to record resting neutral facial geometry.

## Next Steps

We are currently exploring lightweight on-device audio-visual synchrony, combining acoustic phoneme onset with physical lip opening to detect whether movement precedes or trails vocal production. The key remains building tools that solve real assistive challenges through clean, focused engineering.
