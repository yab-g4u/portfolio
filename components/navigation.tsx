"use client"

import { useState, useEffect } from "react"
import { ArrowUpRight, Moon, Sun } from "lucide-react"

export function Navigation() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null
    if (saved) {
      setTheme(saved)
      document.documentElement.classList.toggle("dark", saved === "dark")
    } else {
      setTheme("light")
      document.documentElement.classList.remove("dark")
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light"
    setTheme(next)
    localStorage.setItem("theme", next)
    document.documentElement.classList.toggle("dark", next === "dark")
  }

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-background/0"
      }`}
    >
      <div className="max-w-[720px] mx-auto px-6 py-5 flex items-center justify-between">
        {/* Left: Name */}
        <a
          href="#"
          className="text-sm font-semibold tracking-tight text-foreground hover:opacity-75 transition-opacity"
        >
          Yeabsera Sisay
        </a>

        {/* Right: Minimal text links */}
        <nav className="flex items-center gap-4 sm:gap-5 text-xs text-muted-foreground">
          <a
            href="https://github.com/yab-g4u"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors inline-flex items-center gap-0.5"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>

          <a
            href="https://www.linkedin.com/in/yeabsera-sisay-b5615b240"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors inline-flex items-center gap-0.5"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>

          <a
            href="/cv/YEABSERA-SISAY.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors inline-flex items-center gap-0.5"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>

          <a
            href="mailto:g4uforlife@gmail.com"
            className="hover:text-foreground transition-colors inline-flex items-center gap-0.5"
          >
            <span>Email</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors ml-1"
          >
            {theme === "light" ? (
              <Moon className="w-3.5 h-3.5" />
            ) : (
              <Sun className="w-3.5 h-3.5" />
            )}
          </button>
        </nav>
      </div>
    </header>
  )
}
