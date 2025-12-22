"use client"

import { useEffect, useRef, useState } from "react"
import { NeuralBackground } from "./neural-background"

const hackathons = [
  "ALX Hospitality Hackathon",
  "African Blockchain Championship",
  "Reboot the Earth",
  "Hult Prize",
  "UniHack",
]

const victories = [
  {
    name: "IDA",
    event: "UniHack",
    position: "1st Place Winner",
    description:
      "AI agent integrated website for intelligent prescription management, drug interaction detection, and patient health monitoring through advanced ML algorithms.",
    tech: ["Python", "FastAPI", "React", "TensorFlow", "PostgreSQL"],
    github: "https://github.com/yab-g4u/IDA.git",
    demo: "https://ida-test.vercel.app/",
  },
  {
    name: "MediScope",
    event: "African Blockchain Championship",
    position: "2nd Place",
    description:
      "Revolutionary blockchain-based healthcare platform for policy simulation and decentralized funding analysis with AI policy prediction.",
    tech: ["Python", "Blockchain", "AI/ML", "React", "Solidity"],
    github: "https://github.com/yab-g4u/medscop.git",
    demo: "https://medscop.vercel.app/",
  },
]

interface Achievement {
  id: string
  title: string
  value: string
  numericValue?: number
  description: string
  icon: string
}

const achievements: Achievement[] = [
  {
    id: "hackathons",
    title: "HACKATHONS",
    value: "5+",
    numericValue: 5,
    description: "Participated in competitive hackathons, building innovative solutions under pressure",
    icon: "⟨/⟩",
  },
  {
    id: "finalist",
    title: "FINALIST",
    value: "4",
    numericValue: 4,
    description: "Reached the final rounds, demonstrating consistent high-quality submissions",
    icon: "◈",
  },
  {
    id: "wins",
    title: "VICTORIES",
    value: "2",
    numericValue: 2,
    description: "Won hackathons with innovative ML and Fullstack solutions",
    icon: "★",
  },
  {
    id: "teaching",
    title: "AI/ML TECHNICAL LEAD",
    value: "GDG",
    description: "Currently teaching AI/ML at GDG Club, AASTU",
    icon: "◎",
  },
]

function AnimatedValue({
  value,
  numericValue,
  isVisible,
}: { value: string; numericValue?: number; isVisible: boolean }) {
  const [displayValue, setDisplayValue] = useState(numericValue !== undefined ? "0" : value)
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    if (!isVisible || hasAnimatedRef.current || numericValue === undefined) return
    hasAnimatedRef.current = true

    const duration = 1500
    const startTime = performance.now()
    const suffix = value.replace(/\d+/, "")

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(numericValue * easeOut)

      setDisplayValue(current.toString() + suffix)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayValue(value)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, numericValue, value])

  return <span>{displayValue}</span>
}

function AchievementNode({
  achievement,
  index,
  isVisible,
}: { achievement: Achievement; index: number; isVisible: boolean }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showVictories, setShowVictories] = useState(false)

  const isHackathons = achievement.id === "hackathons"
  const isVictories = achievement.id === "wins"

  return (
    <div
      className={`relative transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
      onMouseEnter={() => {
        setIsHovered(true)
        if (isVictories) setShowVictories(true)
        if (isHackathons) setIsFlipped(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        if (isVictories) setShowVictories(false)
        if (isHackathons) setIsFlipped(false)
      }}
    >
      {index < achievements.length - 1 && (
        <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-white/40 to-white/10" />
      )}

      <div
        className="relative preserve-3d"
        style={{
          transformStyle: "preserve-3d",
          transform: isHackathons && isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.6s",
        }}
      >
        <div
          className={`relative border-2 transition-all duration-300 p-4 md:p-6 bg-black backface-hidden ${
            isHovered ? "border-white bg-white/5 scale-[1.02]" : "border-white/40"
          }`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div
            className={`absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 transition-all duration-300 ${isHovered ? "border-white" : "border-white/60"}`}
          />
          <div
            className={`absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 transition-all duration-300 ${isHovered ? "border-white" : "border-white/60"}`}
          />
          <div
            className={`absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 transition-all duration-300 ${isHovered ? "border-white" : "border-white/60"}`}
          />
          <div
            className={`absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 transition-all duration-300 ${isHovered ? "border-white" : "border-white/60"}`}
          />

          {isHovered && <div className="absolute inset-0 border-2 border-white/20 animate-ping" />}

          <div className="relative z-10">
            <div className="text-2xl md:text-3xl mb-3 font-mono">{achievement.icon}</div>

            <div className="text-[10px] md:text-xs tracking-[0.2em] text-white/60 mb-2">{achievement.title}</div>

            <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 tracking-tight tabular-nums">
              {achievement.numericValue !== undefined ? (
                <AnimatedValue
                  value={achievement.value}
                  numericValue={achievement.numericValue}
                  isVisible={isVisible}
                />
              ) : (
                <span className="text-2xl md:text-3xl">{achievement.value}</span>
              )}
            </div>

            <p className="text-[10px] md:text-xs text-white/70 leading-relaxed">{achievement.description}</p>

            {isHackathons && (
              <div className="mt-3 text-[8px] md:text-[10px] text-white/50 tracking-wider">[HOVER TO VIEW LIST]</div>
            )}
          </div>

          {isHackathons && (
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-scan" />
            </div>
          )}
        </div>

        {isHackathons && (
          <div
            className="absolute inset-0 border-2 border-white bg-black p-4 md:p-6"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="text-[10px] md:text-xs tracking-[0.2em] text-white/60 mb-4">HACKATHON PARTICIPATION</div>
            <div className="space-y-2">
              {hackathons.map((hackathon, i) => (
                <div key={i} className="flex items-start gap-2 text-[10px] md:text-xs">
                  <span className="text-white/60">{String(i + 1).padStart(2, "0")}.</span>
                  <span className="leading-relaxed">{hackathon}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {isVictories && showVictories && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[90vw] md:w-[500px] z-[100] pointer-events-auto">
          <div className="border-2 border-white bg-black p-4 md:p-6 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="text-[10px] tracking-[0.3em] text-white/60 mb-3">VICTORY PROJECTS</div>
            {victories.map((victory, i) => (
              <div
                key={victory.name}
                className="border border-white/40 p-3 md:p-4 hover:border-white hover:bg-white/5 transition-all duration-300 animate-in slide-in-from-top-2"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-bold text-base md:text-lg mb-1">{victory.name}</div>
                    <div className="text-[10px] text-white/60">{victory.event}</div>
                  </div>
                  <div className="text-[10px] border border-white/60 px-2 py-1">{victory.position}</div>
                </div>
                <p className="text-xs text-white/70 leading-relaxed mb-3">{victory.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {victory.tech.map((tech) => (
                    <span key={tech} className="text-[9px] border border-white/30 px-1.5 py-0.5">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <a
                    href={victory.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] border border-white/60 px-3 py-1.5 hover:bg-white hover:text-black transition-colors"
                  >
                    GITHUB →
                  </a>
                  <a
                    href={victory.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] border border-white/60 px-3 py-1.5 hover:bg-white hover:text-black transition-colors"
                  >
                    LIVE DEMO →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function AchievementsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-20 px-4 md:px-8 border-b border-white/20 overflow-hidden"
    >
      <NeuralBackground opacity={0.1} nodeCount={35} />

      <div className="relative z-10 max-w-6xl w-full">
        <div className="mb-12 md:mb-16 text-center">
          <div className="text-[10px] md:text-xs tracking-[0.3em] text-white/60 mb-4">{"// MODULE 03"}</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">ACHIEVEMENTS</h2>
          <p className="text-sm md:text-base text-white/70 tracking-wide max-w-2xl mx-auto">
            Milestones in competitive programming and community leadership
          </p>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-full h-2 hidden md:block" viewBox="0 0 1000 10">
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="white" stopOpacity="0" />
                  <stop offset="50%" stopColor="white" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line
                x1="0"
                y1="5"
                x2="1000"
                y2="5"
                stroke="url(#pathGradient)"
                strokeWidth="1"
                strokeDasharray="8 4"
                className={`transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
              />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {achievements.map((achievement, index) => (
            <AchievementNode key={achievement.id} achievement={achievement} index={index} isVisible={isVisible} />
          ))}
        </div>

        <div
          className={`mt-12 md:mt-16 flex justify-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <div className="border-2 border-white/60 bg-black/80 backdrop-blur-sm px-6 py-4 md:px-10 md:py-6">
            <div className="text-center">
              <div className="text-[10px] md:text-xs tracking-[0.3em] text-white/60 mb-2">CURRENT POSITION</div>
              <div className="text-lg md:text-xl tracking-wide mb-1">
                <span className="font-bold">AI/ML TECHNICAL LEAD</span> & INSTRUCTOR
              </div>
              <div className="text-xs md:text-sm text-white/80 tracking-wider">
                GDG CLUB // ADDIS ABABA SCIENCE AND TECHNOLOGY UNIVERSITY
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`w-1 bg-white/40 transition-all duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
              style={{
                height: `${12 + (i % 3) * 8}px`,
                transitionDelay: `${800 + i * 50}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
