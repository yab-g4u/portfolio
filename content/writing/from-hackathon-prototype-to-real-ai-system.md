---
title: "From Hackathon Prototype to Real AI System"
description: "Lessons from transforming MedScope from a rushed weekend prompt-chain into an auditable multi-agent epidemic simulation engine."
date: "2026-06-30"
category: "Multi-Agent Systems"
tags:
  - Multi-Agent
  - CrewAI
  - System Design
  - Simulation
  - Deterministic Math
featured: false
draft: false
project: "Medscope"
---

During hackathons, the quickest way to demonstrate an "intelligent multi-agent system" is stringing together three or four prompt chains with an LLM framework like CrewAI or LangChain, feeding the output of one agent into the next, and hoping the API doesn't timeout before the demo presentation finishes.

When we built **MedScope**—which won 2nd Place at the African Blockchain Championship—the initial prototype was built under that exact weekend pressure. But when we set out to turn it into a genuine engineering platform for modeling epidemic logistics and public policy interventions, that fragile prompt-chain architecture immediately collapsed.

Here is what failed when scaling from demo to system, and the principles that replaced it.

## The Illusion of Prompt Consensus

In our initial prototype, we had an "Epidemiologist Agent", a "Logistics Officer Agent", and a "Public Health Policy Director Agent". We passed their prompts through an iterative discussion loop:

```text
[Epidemiologist] ──► [Logistics Officer] ──► [Policy Director] ──► [Output]
```

### The Failure Mode
Language models inherently seek agreeable, coherent continuations. When asked to simulate a debate between an epidemiologist advocating for total lockdown and a logistics officer warning that food supply chains would fail, the agents quickly collapsed into superficial compromise within two turns:

> *"I agree with your concerns, and we will simply ensure food is delivered while completely locking down."*

This defeated the entire purpose of simulation. In real public health crises, constraints are zero-sum and non-negotiable. If diesel fuel is rationed, emergency medicine shipments cannot be maintained at 100% capacity. An AI that hallucinates frictionless consensus is dangerous in decision support.

## Decoupling Deterministic Mathematics from LLM Reasoning

The biggest architectural shift in MedScope was strictly separating **mathematical truth** from **agent heuristics**.

Instead of asking LLMs to estimate how disease transmission ($R_t$) would shift, we anchored the simulation in a deterministic differential equation framework: the **SEIR (Susceptible, Exposed, Infectious, Recovered)** model:

$$\frac{dS}{dt} = -\frac{\beta S I}{N}, \quad \frac{dE}{dt} = \frac{\beta S I}{N} - \sigma E, \quad \frac{dI}{dt} = \sigma E - \gamma I, \quad \frac{dR}{dt} = \gamma I$$

```python
import numpy as np

def run_deterministic_seir_step(
    S: float, E: float, I: float, R: float, 
    beta: float, sigma: float, gamma: float, dt: float = 1.0
):
    N = S + E + I + R
    dS = (-beta * S * I / N) * dt
    dE = (beta * S * I / N - sigma * E) * dt
    dI = (sigma * E - gamma * I) * dt
    dR = (gamma * I) * dt
    
    return S + dS, E + dE, I + dI, R + dR
```

### The Role of the Agents
Rather than calculating curves, the AI agents are only permitted to propose **parameter interventions**:

* The **Policy Agent** evaluates curfew stringency and outputs a bounded modifier to $\beta$ (transmission coefficient).
* The **Logistics Agent** tracks physical bed counts, oxygen cylinders, and supply transport delays.
* If the logistics capacity is breached, hospital fatality multipliers scale up automatically in code, completely independent of whatever optimistic language the agents generate.

## Structured Inter-Agent Protocols and Deadlock Resolution

To prevent endless circular debates between opposing agents, we established explicit turn structures:

1. **Phase 1: Situation Assessment:** Each agent independently reads raw data feeds (case growth rate, supply stockpiles) and generates an isolated state report.
2. **Phase 2: Formal Objection:** Agents inspect peer proposals and can only lodge structured objections citing hard numerical constraints.
3. **Phase 3: Arbiter Synthesis:** An impartial Arbiter agent ranks competing proposals against a predefined utility function (e.g. minimizing total mortality subject to keeping essential logistics above critical thresholds).

## Immutable Audit Trails

In governance and public health, decisions must be auditable months after the fact. We coupled the simulation state with an immutable ledger. Every simulated turn logs:

* Raw sensor/input data hash
* Model checkpoint IDs and temperature settings
* The structured parameter modifiers proposed by each agent
* The final SEIR projection outcome

This ensures that no stakeholder can alter historical simulation parameters to fit post-hoc political narratives.

## Core Takeaways

* **Never let an LLM do mental math in a simulation pipeline.** Use Python, NumPy, and differential equations for mechanics; use language models for contextual reasoning and trade-off synthesis.
* **Force hard adversarial constraints.** Real agents need opposing loss functions, not polite conversational handshakes.
* **Auditability is a prerequisite for autonomy.** If you cannot trace which input drove a specific decision, the system is an experiment, not production infrastructure.
