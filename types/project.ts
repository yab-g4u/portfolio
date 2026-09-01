export interface ArchitectureStep {
  step: string
  label: string
  desc?: string
}

export interface TechnicalDecision {
  title: string
  reasoning: string
}

export interface TechnicalChallenge {
  challenge: string
  solution: string
}

export interface StackCategory {
  category: string
  items: string[]
}

export interface Project {
  id: number | string
  number: string
  tag: string
  name: string
  subtitle: string
  description: string
  problem: string
  whatWasBuilt: string
  highlights: string[]
  architectureSteps?: ArchitectureStep[]
  technicalDecisions?: TechnicalDecision[]
  challenges?: TechnicalChallenge[]
  outcome?: string
  stackGroups?: StackCategory[]
  tech: string[]
  category: "featured" | "fullstack" | "ml" | "hybrid"
  github: string
  demo: string
  metrics?: {
    accuracy?: number
    loss?: number
    f1Score?: number
    latency?: string
    efficiency?: string
  }
  features?: string[]
  isFeatured?: boolean
}
