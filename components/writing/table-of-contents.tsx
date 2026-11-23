"use client"

import { useState, useEffect } from "react"
import { List, ChevronDown } from "lucide-react"

interface HeadingItem {
  level: number
  text: string
  id: string
}

interface TableOfContentsProps {
  headings: HeadingItem[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (headings.length === 0) return

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120

      for (let i = headings.length - 1; i >= 0; i--) {
        const el = document.getElementById(headings[i].id)
        if (el && el.offsetTop <= scrollPosition) {
          setActiveId(headings[i].id)
          return
        }
      }
      if (headings[0]) {
        setActiveId(headings[0].id)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [headings])

  if (headings.length === 0) return null

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
      setActiveId(id)
      setIsOpen(false)
    }
  }

  return (
    <div className="my-6 rounded-lg border border-border bg-card/60 p-4 transition-all">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-xs font-mono uppercase tracking-wider text-muted-foreground sm:hidden cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-1.5 font-semibold text-foreground">
          <List className="w-3.5 h-3.5" />
          Table of Contents ({headings.length})
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Desktop Header */}
      <div className="hidden sm:flex items-center gap-1.5 pb-2.5 mb-2.5 border-b border-border/70 text-xs font-mono uppercase tracking-wider text-muted-foreground">
        <List className="w-3.5 h-3.5" />
        <span>Outline & Sections</span>
      </div>

      {/* Headings List (Always visible on sm+, toggleable on mobile) */}
      <nav
        className={`space-y-1.5 text-xs transition-all ${
          isOpen ? "block pt-3 mt-3 border-t border-border/50" : "hidden sm:block"
        }`}
        aria-label="Article table of contents"
      >
        {headings.map((item) => {
          const isActive = activeId === item.id
          return (
            <button
              key={item.id}
              onClick={() => scrollToHeading(item.id)}
              className={`block w-full text-left transition-colors py-1 cursor-pointer truncate ${
                item.level === 3 ? "pl-4 text-[11.5px]" : "pl-1 font-medium"
              } ${
                isActive
                  ? "text-accent font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="inline-block w-2 text-muted-foreground/50 mr-1.5">
                {isActive ? "•" : ""}
              </span>
              {item.text}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
