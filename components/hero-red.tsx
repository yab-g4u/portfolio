"use client"

import Link from "next/link"
import { ArrowUpRight, FileText, BookOpen } from "lucide-react"
import { HeroShader } from "@/components/hero-shader"
import { useResume } from "@/lib/resume-context"

export function HeroRed() {
  const { openResume } = useResume()

  return (
    <section id="hero">
      <div className="wrap">
        <div className="card g1">
          <HeroShader />
          <div className="hin">
            <h1 className="rv rb">
              <span className="rl">
                Hi, I&rsquo;m{" "}
                <i
                  className="ch im"
                  style={{ backgroundImage: "url(/images/hero-chip-1.jpg)" }}
                  aria-hidden="true"
                />{" "}
                Yeabsera
              </span>
              <span className="rl">
                <i
                  className="ch im"
                  style={{ backgroundImage: "url(/images/hero-chip-2.jpg)" }}
                  aria-hidden="true"
                />{" "}
                <em>an</em> AI Engineer{" "}
                <i
                  className="ch im"
                  style={{ backgroundImage: "url(/images/hero-chip-3.jpg)" }}
                  aria-hidden="true"
                />
              </span>
              <span className="rl">
                Building{" "}
                <i
                  className="ch im"
                  style={{ backgroundImage: "url(/images/hero-chip-4.jpg)" }}
                  aria-hidden="true"
                />{" "}
                <em>intelligent</em> systems
              </span>
            </h1>

            <p className="sub rv">
              Multi-agent systems, voice AI, computer vision and full-stack products that ship.
            </p>

            <div className="btns rv">
              <a className="pill solid" href="#works">
                <span>View work</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <Link className="pill" href="/writing">
                <BookOpen className="w-4 h-4 text-[#ffb3b3]" />
                <span>Writing</span>
              </Link>
              <button type="button" className="pill" onClick={openResume}>
                <FileText className="w-4 h-4 text-[#ffb3b3]" />
                <span>Resume (CV)</span>
              </button>
              <a className="pill" href="#contact">
                <span>Get in touch</span>
              </a>
            </div>
          </div>
        </div>

        <div className="avail">Available for AI engineering · Addis Ababa (UTC+3)</div>
      </div>
    </section>
  )
}
