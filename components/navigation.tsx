"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, FileText, BookOpen, ArrowUpRight } from "lucide-react"
import { GitHubBrandIcon, LinkedInBrandIcon } from "@/components/tech-icons"
import { useResume } from "@/lib/resume-context"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { openResume } = useResume()
  const pathname = usePathname()

  const isHomePage = pathname === "/"
  const isWriting = pathname?.startsWith("/writing")

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
            className="flex items-center gap-2 font-serif text-[16px] sm:text-[17px] leading-none text-white hover:text-[#ffd0d0] transition-colors shrink-0"
          >
            <span>Yeabsera</span>
            <span className="text-[#ff2b2b] tracking-[0.08em] text-[12px] font-sans font-semibold">
              AI
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-4 text-[13px] font-medium text-white/80">
            <Link
              href={isHomePage ? "#works" : "/#works"}
              className="hover:text-white transition-colors"
            >
              Work
            </Link>
            <Link
              href="/writing"
              className={`inline-flex items-center gap-1 transition-colors ${
                isWriting ? "text-[#ff6a6a] font-semibold" : "hover:text-white"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 opacity-80" />
              <span>Writing</span>
            </Link>
            <Link
              href={isHomePage ? "#research" : "/#research"}
              className="hover:text-white transition-colors"
            >
              Research
            </Link>
            <button
              onClick={handleResumeClick}
              className="inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#ff6a6a]" />
              <span>Resume</span>
            </button>
            <Link
              href={isHomePage ? "#contact" : "/#contact"}
              className="px-3.5 py-1 rounded-full bg-[#d60407] hover:bg-[#ff2b2b] text-white text-[12px] font-medium border border-[#ff6a6a]/60 transition-all shadow-[0_0_20px_#d6040766]"
            >
              Contact
            </Link>
          </nav>

          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleResumeClick}
              className="px-2.5 py-1 rounded-full bg-white/10 border border-white/25 text-[11px] font-medium text-white inline-flex items-center gap-1"
            >
              <FileText className="w-3 h-3 text-[#ff6a6a]" />
              <span>CV</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-x-4 top-[62px] z-40 md:hidden rounded-[26px] bg-[#120405]/95 backdrop-blur-xl border border-[#ff2b2b]/40 p-5 shadow-[0_20px_60px_#000d]">
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
                className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-[#d60407]/40 border border-white/10 text-white font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-white/15 flex items-center gap-2 text-xs">
            <a
              href="https://github.com/yab-g4u"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-full bg-white/10 border border-white/20 text-white"
            >
              <GitHubBrandIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="https://www.linkedin.com/in/yeabsera-sisay-b5615b240"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-full bg-white/10 border border-white/20 text-white"
            >
              <LinkedInBrandIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <button
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
