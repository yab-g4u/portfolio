---
title: "I Built a Voice AI Agent for a Feature Phone"
description: "Engineering low-latency streaming speech pipelines over 2G cellular PSTN networks for people without smartphones."
date: "2026-08-14"
category: "Voice & Telephony"
tags:
  - Voice AI
  - Telephony
  - FastAPI
  - WebSockets
  - Streaming ASR
  - Sub-Saharan Africa
featured: false
draft: false
project: "Omniq"
---

Over 3 billion people globally rely on basic 2G/3G button phones or lack consistent high-speed mobile data. When modern AI tools require browser interfaces, React single-page apps, and heavy client-side JavaScript bundles, they inadvertently exclude a massive portion of the world's population.

When I started engineering **Omniq**, the goal was clear: connect standard cellular phone calls directly to conversational AI, allowing anyone to dial a local phone number on a $15 feature phone and interact naturally with an intelligent assistant.

## The Architecture of a Cellular Voice Pipeline

Unlike web applications where WebRTC or WebSocket audio can run on high-bandwidth Opus codecs at 48kHz, cellular voice (PSTN) runs on compressed codecs like AMR-NB (Adaptive Multi-Rate Narrowband) sampled at just **8,000 Hz** in single-channel mono.

The end-to-end flow requires bridging legacy telecom protocols with modern streaming AI infrastructure:

```text
[2G Feature Phone] 
       │ (Standard GSM Voice Call)
       ▼
[Carrier / PSTN Trunk] 
       │ (SIP / RTP Stream)
       ▼
[Telephony Gateway (Twilio / Asterisk)]
       │ (Bi-directional WebSocket, 8kHz μ-law)
       ▼
[Omniq FastAPI Orchestrator] ── (Fast VAD & Buffer)
       │
       ├──► [Streaming ASR (Whisper / Local Model)]
       ├──► [Schema-Constrained LLM Reasoning]
       └──► [Low-Latency Neural TTS Synthesizer]
```

## Sub-Second Turn-Taking and Latency Budgeting

In conversational audio, human turn-taking expectations are unforgiving. A delay of over 1.5 seconds feels like a broken connection or an unresponsive IVR robot. To achieve conversational responsiveness on narrowband phone lines, we had to dismantle the traditional "record audio $\rightarrow$ upload file $\rightarrow$ transcribe $\rightarrow$ prompt LLM $\rightarrow$ generate MP3 $\rightarrow$ playback" chain.

Instead, we stream audio chunks concurrently:

```python
import asyncio
from fastapi import WebSocket

async def handle_telephony_audio_stream(
    websocket: WebSocket, 
    call_id: str, 
    vad_detector, 
    streaming_asr
):
    await websocket.accept()
    audio_buffer = bytearray()
    
    async for message in websocket.iter_json():
        if message.get("event") == "media":
            payload_base64 = message["media"]["payload"]
            pcm_chunk = decode_mulaw_to_pcm(payload_base64)
            audio_buffer.extend(pcm_chunk)
            
            # Continuous Voice Activity Detection
            is_speech = vad_detector.is_speech(pcm_chunk)
            if not is_speech and len(audio_buffer) >= vad_detector.silence_threshold:
                # User paused speaking; trigger speculative extraction
                transcript = await streaming_asr.transcribe(bytes(audio_buffer))
                audio_buffer.clear()
                
                # Dispatch downstream extraction asynchronously
                asyncio.create_task(process_turn(call_id, transcript))
```

## Structured Extraction Over Phone Calls

When feature-phone users access services—such as confirming agricultural grain prices, checking clinic availability, or reporting local infrastructure outages—freeform rambling responses from an AI agent are inadequate. The system must capture structured, validated parameters (names, quantities, dates, coordinates) while keeping the caller informed.

We applied **strict schema validation with automated repair loops**:

1. The conversational agent prompts the caller for one clear parameter at a time.
2. Extracted entities are parsed into typed models (using Pydantic in Python).
3. If an extraction fails schema constraints (e.g. an invalid date or unrecognized crop name), the system asks a targeted clarifying question rather than restarting the conversation.
4. Every extracted field is tagged with its exact audio timestamp for human verification and auditability.

```python
from pydantic import BaseModel, Field

class OutageReport(BaseModel):
    region: str = Field(description="Town or district name reported by caller")
    service_type: str = Field(description="Water, electricity, or telecom infrastructure")
    severity: str = Field(description="Complete shutdown vs intermittent degradation")
    contact_phone: str = Field(description="Callback telephone number")
```

## Three Lessons Learned in Production

1. **Acoustic Background Noise:** Rural feature-phone calls often originate from windy roads, crowded markets, or noisy diesel generators. Standard VAD models tuned on quiet office recordings fail completely. Pre-filtering the 8kHz stream with an adaptive spectral noise gate reduced false turn-triggers by over 60%.
2. **Turn Interruption (Barge-In):** Callers often speak over the synthesized voice when they already know the answer. The pipeline must listen for caller audio while streaming out synthesized speech and immediately cancel the playback stream when user speech is detected.
3. **Patience with Dialects and Pacing:** Conversational tempo varies dramatically across regions and demographics. Hardcoded 500ms silence timeouts cut callers off mid-sentence. We implemented dynamic silence thresholds that adapt based on the caller's established speaking rate.

Democratizing AI means building for the devices people already hold in their hands, not just the latest smartphones.
