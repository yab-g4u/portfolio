"use client"

import { useState, useEffect } from "react"
import { ArrowUpRight, Moon, Sun, Menu, X, Sparkles, FileText, Mail } from "lucide-react"
import { GitHubBrandIcon, LinkedInBrandIcon } from "@/components/tech-icons"

export function Navigation() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

  const navItems = [
    { label: "Overview", href: "#overview", num: "01" },
    { label: "What I Build", href: "#what-i-build", num: "02" },
    { label: "Spotlight", href: "#spotlight", num: "03" },
    { label: "Selected Work", href: "#selected-work", num: "04" },
    { label: "Extended Projects", href: "#extended-projects", num: "05" },
    { label: "Research & Papers", href: "#research", num: "06" },
    { label: "Experience", href: "#experience", num: "07" },
    { label: "About", href: "#about", num: "08" },
    { label: "Contact", href: "#contact", num: "09" },
  ]

  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled || mobileMenuOpen
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-background/0"
      }`}
    >
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between gap-3">
        {/* Left: Name & Status */}
        <a
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground hover:opacity-80 transition-opacity shrink-0 py-1"
        >
          <span>Yeabsera Sisay</span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" title="Available for projects" />
        </a>

        {/* Right Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 text-xs text-muted-foreground">
          <a
            href="https://github.com/yab-g4u"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors inline-flex items-center gap-1.5 py-1"
          >
            <GitHubBrandIcon className="w-3.5 h-3.5 opacity-80" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>

          <a
            href="https://www.linkedin.com/in/yeabsera-sisay-b5615b240"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors inline-flex items-center gap-1.5 py-1"
          >
            <LinkedInBrandIcon className="w-3.5 h-3.5 opacity-80" />
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>

          <a
            href="/cv/YEABSERA-SISAY.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors inline-flex items-center gap-1 py-1"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>

          <a
            href="#contact"
            className="hover:text-foreground transition-colors inline-flex items-center gap-1 py-1 font-medium text-foreground"
          >
            <span>Contact</span>
          </a>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            {theme === "light" ? (
              <Moon className="w-3.5 h-3.5" />
            ) : (
              <Sun className="w-3.5 h-3.5" />
            )}
          </button>
        </nav>

        {/* Right Mobile Controls (Theme Toggle + Hamburger) */}
        <div className="flex md:hidden items-center gap-1.5">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors touch-manipulation"
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="p-2 rounded-md hover:bg-secondary text-foreground transition-colors touch-manipulation"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Sheet */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl px-4 py-5 animate-in slide-in-from-top-3 duration-200">
          <div className="space-y-4">
            {/* Quick Section Index */}
            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground px-2 pb-1">
                Navigation Index
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={handleNavClick}
                    className="flex items-center gap-2 p-2.5 rounded-md bg-secondary/30 hover:bg-secondary active:bg-secondary/80 text-xs font-medium text-foreground transition-colors"
                  >
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {item.num}
                    </span>
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Actions Strip */}
            <div className="pt-2 border-t border-border/80 flex items-center justify-between gap-2 text-xs">
              <a
                href="https://github.com/yab-g4u"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 p-2 rounded-md bg-secondary/60 text-foreground font-medium"
              >
                <GitHubBrandIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/yeabsera-sisay-b5615b240"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 p-2 rounded-md bg-secondary/60 text-foreground font-medium"
              >
                <LinkedInBrandIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>

              <a
                href="/cv/YEABSERA-SISAY.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 p-2 rounded-md bg-secondary/60 text-foreground font-medium"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
