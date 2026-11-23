"use client"

import { useEffect } from "react"

export function PortfolioShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const readyFallback = window.setTimeout(() => {
      document.body.classList.add("ready")
    }, 100)

    document.querySelectorAll<HTMLElement>(".hin .rv").forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.1}s`
    })

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in")
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.06, rootMargin: "0px 0px -3% 0px" }
    )

    const observeReveals = () => {
      document.querySelectorAll<HTMLElement>(".rv:not(.in)").forEach((el) => {
        io.observe(el)
      })
    }

    observeReveals()

    let moTimer = 0
    const mo = new MutationObserver((mutations) => {
      const relevant = mutations.some(
        (m) => !(m.target instanceof Element && m.target.closest("#selected-work"))
      )
      if (!relevant) return
      window.clearTimeout(moTimer)
      moTimer = window.setTimeout(observeReveals, 80)
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
              }, 260 + Math.random() * 240)
              cardTimers.push(t)
            }
          })
        },
        { threshold: 0.06 }
      )
      cards.forEach((c) => ho?.observe(c))
    }

    // Scroll-coalesced parallax for .ghost watermarks (no continuous 60fps reflow loop)
    let ghosts = Array.from(document.querySelectorAll<HTMLElement>(".ghost"))
    let parallaxPending = false
    let parallaxRaf = 0

    const updateParallax = () => {
      parallaxPending = false
      if (rm) return
      if (ghosts.length === 0) {
        ghosts = Array.from(document.querySelectorAll<HTMLElement>(".ghost"))
      }
      const vh = window.innerHeight
      for (let i = 0; i < ghosts.length; i++) {
        const g = ghosts[i]
        const b = g.getBoundingClientRect()
        if (b.bottom < -200 || b.top > vh + 200) continue
        const offset = (b.top - vh * 0.5) * -0.045
        g.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
      }
    }

    const onScroll = () => {
      if (rm || parallaxPending) return
      parallaxPending = true
      parallaxRaf = window.requestAnimationFrame(updateParallax)
    }

    if (!rm) {
      updateParallax()
      window.addEventListener("scroll", onScroll, { passive: true })
    }

    return () => {
      window.clearTimeout(readyFallback)
      window.clearTimeout(moTimer)
      cardTimers.forEach((t) => window.clearTimeout(t))
      io.disconnect()
      mo.disconnect()
      ho?.disconnect()
      window.removeEventListener("scroll", onScroll)
      window.cancelAnimationFrame(parallaxRaf)
    }
  }, [])

  return <>{children}</>
}
