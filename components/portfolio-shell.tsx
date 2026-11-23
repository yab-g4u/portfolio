"use client"

import { useEffect } from "react"

export function PortfolioShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // Ensure body gets ready state if preloader was skipped or unmounted
    const readyFallback = window.setTimeout(() => {
      document.body.classList.add("ready")
    }, 100)

    // Hero staggered reveal delays
    document.querySelectorAll<HTMLElement>(".hin .rv").forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.14}s`
    })

    // Scroll reveal IntersectionObserver
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in")
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" }
    )

    const observeReveals = () => {
      document.querySelectorAll<HTMLElement>(".rv:not(.in)").forEach((el) => {
        io.observe(el)
      })
    }

    observeReveals()

    const mo = new MutationObserver(() => {
      observeReveals()
    })
    mo.observe(document.body, { childList: true, subtree: true })

    // Skeleton card shimmer settle
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".card")).filter(
      (c) => !c.closest("#hero")
    )

    const cardTimers: number[] = []
    let ho: IntersectionObserver | null = null

    if (!rm) {
      cards.forEach((c) => c.classList.add("sk"))
      ho = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              ho?.unobserve(entry.target)
              const t = window.setTimeout(() => {
                entry.target.classList.remove("sk")
              }, 320 + Math.random() * 420)
              cardTimers.push(t)
            }
          })
        },
        { threshold: 0.08 }
      )
      cards.forEach((c) => ho?.observe(c))
    }

    // Parallax loop for .ghost watermarks
    let rafId = 0
    const parallax = () => {
      rafId = window.requestAnimationFrame(parallax)
      if (rm) return
      const ghosts = document.querySelectorAll<HTMLElement>(".ghost")
      const vh = window.innerHeight
      ghosts.forEach((g) => {
        const b = g.getBoundingClientRect()
        if (b.bottom < -200 || b.top > vh + 200) return
        g.style.transform = `translateY(${(b.top - vh / 2) * -0.05}px)`
      })
    }
    rafId = window.requestAnimationFrame(parallax)

    return () => {
      window.clearTimeout(readyFallback)
      cardTimers.forEach((t) => window.clearTimeout(t))
      io.disconnect()
      mo.disconnect()
      ho?.disconnect()
      window.cancelAnimationFrame(rafId)
    }
  }, [])

  return <>{children}</>
}
