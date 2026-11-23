export interface WritingPost {
  slug: string
  title: string
  description: string
  date: string
  category: string
  tags: string[]
  featured?: boolean
  draft?: boolean
  cover?: string
  project?: string
  readingTime: string
  wordCount: number
  content: string
  headings: {
    level: number
    text: string
    id: string
  }[]
}

export interface WritingFrontmatter {
  title: string
  description: string
  date: string
  category: string
  tags: string[]
  featured?: boolean
  draft?: boolean
  cover?: string
  project?: string
}
