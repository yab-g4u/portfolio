"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Menu, X, FileText, BookOpen, ArrowUpRight, Sun, Moon } from "lucide-react"
import { GitHubBrandIcon, LinkedInBrandIcon } from "@/components/tech-icons"
import { useResume } from "@/lib/resume-context"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const { openResume } = useResume()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  const isHomePage = pathname === "/"
  const isWriting = pathname?.startsWith("/writing")
  const isDark = !mounted || resolvedTheme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    openResume()
  }

  return (
    <>
      <header id="logo-dock" className="px-4 sm:px-6 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-4 sm:gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-serif text-[16px] sm:text-[17px] leading-none text-foreground hover:text-accent transition-colors shrink-0 whitespace-nowrap"
          >
            <span>Yeabsera</span>
            <span className="text-[#ff2b2b] tracking-[0.08em] text-[12px] font-sans font-semibold">
              AI
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-4 text-[13px] font-medium text-foreground/80">
            <Link
              href={isHomePage ? "#works" : "/#works"}
              className="hover:text-foreground transition-colors whitespace-nowrap shrink-0"
            >
              Work
            </Link>
            <Link
              href="/writing"
              className={`inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0 ${
                isWriting ? "text-accent font-semibold" : "hover:text-foreground"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 opacity-80" />
              <span>Writing</span>
            </Link>
            <Link
              href={isHomePage ? "#research" : "/#research"}
              className="hover:text-foreground transition-colors whitespace-nowrap shrink-0"
            >
              Research
            </Link>
            <button
              type="button"
              onClick={handleResumeClick}
              className="inline-flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <FileText className="w-3.5 h-3.5 text-accent" />
              <span>Resume</span>
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="p-1.5 rounded-full border border-border bg-secondary/70 hover:bg-secondary text-foreground transition-colors cursor-pointer shrink-0"
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
            <Link
              href={isHomePage ? "#contact" : "/#contact"}
              className="px-3.5 py-1 rounded-full bg-[#d60407] hover:bg-[#ff2b2b] text-white text-[12px] font-medium border border-[#ff6a6a]/60 transition-all shadow-[0_0_20px_#d6040744] whitespace-nowrap shrink-0"
            >
              Contact
            </Link>
          </nav>

          <div className="flex md:hidden items-center gap-1.5">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="p-1.5 rounded-full bg-secondary/80 border border-border text-foreground transition-colors"
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
            <button
              type="button"
              onClick={handleResumeClick}
              className="px-2.5 py-1 rounded-full bg-secondary/80 border border-border text-[11px] font-medium text-foreground inline-flex items-center gap-1"
            >
              <FileText className="w-3 h-3 text-accent" />
              <span>CV</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="p-1.5 rounded-full hover:bg-secondary text-foreground transition-colors"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-x-4 top-[62px] z-40 md:hidden rounded-[26px] bg-popover/95 backdrop-blur-xl border border-[#ff2b2b]/40 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.28)] dark:shadow-[0_20px_60px_#000d]">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { label: "Home", href: "/" },
              { label: "Spotlight", href: isHomePage ? "#spotlight" : "/#spotlight" },
              { label: "Selected Work", href: isHomePage ? "#works" : "/#works" },
              { label: "Writing", href: "/writing" },
              { label: "Research", href: isHomePage ? "#research" : "/#research" },
              { label: "Experience", href: isHomePage ? "#experience" : "/#experience" },
              { label: "About", href: isHomePage ? "#about" : "/#about" },
              { label: "Contact", href: isHomePage ? "#contact" : "/#contact" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2.5 rounded-xl bg-secondary/70 hover:bg-[#d60407] hover:text-white border border-border text-foreground font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-border flex items-center gap-2 text-xs">
            <a
              href="https://github.com/yab-g4u"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-full bg-secondary/80 border border-border text-foreground"
            >
              <GitHubBrandIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="https://www.linkedin.com/in/yeabsera-sisay-b5615b240"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-full bg-secondary/80 border border-border text-foreground"
            >
              <LinkedInBrandIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <button
              type="button"
              onClick={handleResumeClick}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-full bg-[#d60407] border border-[#ff6a6a]/60 text-white font-medium"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
