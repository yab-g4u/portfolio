export interface Project {
  id: number
  name: string
  description: string
  longDescription: string
  tech: string[]
  category: "fullstack" | "ml" | "hybrid"
  github: string
  demo: string
  metrics?: {
    accuracy?: number
    loss?: number
    f1Score?: number
  }
  features?: string[]
  image?: string
}
