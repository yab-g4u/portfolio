"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

const commands = {
  help: `Available commands:
  help     - Show this message
  projects - List all projects
  skills   - Display tech stack
  contact  - Show contact info
  clear    - Clear terminal
  about    - About Yeabsera`,
  projects: `ML Projects:
  • SENTIMENT_ANALYZER
  • IMAGE_CLASSIFIER
  • RECOMMENDER_ENGINE
  • PREDICTIVE_ANALYTICS

Fullstack Projects:
  • E-COMMERCE_PLATFORM
  • HEALTHCARE_AI
  • FINTECH_DASHBOARD`,
  skills: `Core Stack:
  Frontend: React, Next.js, TypeScript
  Backend: Node.js, Python, FastAPI
  ML/AI: PyTorch, TensorFlow, Scikit-learn
  Database: PostgreSQL, MongoDB, Redis
  DevOps: Docker, Kubernetes, AWS`,
  contact: `Contact Information:
  Email: yeabsera@example.com
  GitHub: github.com/yeabsera
  LinkedIn: linkedin.com/in/yeabsera`,
  about: `Yeabsera Sisay
Neural Architect & Fullstack Engineer

Specializing in machine learning systems and 
scalable web applications. Building the future
one model and microservice at a time.`,
}

export function Terminal() {
  const [isOpen, setIsOpen] = useState(false)
  const [history, setHistory] = useState<{ input: string; output: string }[]>([])
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()

    if (trimmedCmd === "clear") {
      setHistory([])
      return
    }

    const output =
      commands[trimmedCmd as keyof typeof commands] || `Command not found: ${cmd}\nType 'help' for available commands.`

    setHistory([...history, { input: cmd, output }])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      handleCommand(input)
      setInput("")
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-50 border-2 border-white bg-black px-3 md:px-4 py-2 text-[9px] md:text-xs tracking-wider hover:bg-white hover:text-black transition-all duration-75"
      >
        {isOpen ? "[CLOSE]" : "[OPEN_TERMINAL]"}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-8 w-[500px] max-w-[calc(100vw-4rem)] h-[400px] border-2 border-white bg-black z-50 flex flex-col shadow-[0_0_30px_rgba(255,255,255,0.3)]">
          <div className="border-b border-white/40 px-4 py-2 text-xs tracking-wider">[TERMINAL_v1.0.0]</div>

          <div ref={terminalRef} className="flex-1 overflow-y-auto p-4 text-xs font-mono space-y-4">
            <div className="text-white/60">Type 'help' for available commands.</div>

            {history.map((entry, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-white/60">$</span>
                  <span>{entry.input}</span>
                </div>
                <div className="text-white/70 whitespace-pre-line pl-4">{entry.output}</div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-white/40">
            <div className="flex items-center gap-2 px-4 py-2">
              <span className="text-white/60">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-white outline-none font-mono text-xs"
                placeholder="Enter command..."
              />
            </div>
          </form>
        </div>
      )}
    </>
  )
}
