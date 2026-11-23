"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

interface CodeBlockProps {
  language?: string
  children: string
}

export function CodeBlock({ language, children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <div className="relative group my-5 rounded-xl border border-[#ff2b2b]/25 bg-[#0c0708] text-[#f4ecec] overflow-hidden font-mono text-xs sm:text-[13px] leading-relaxed shadow-sm">
      {/* Top Bar with Language and Copy Button */}
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-white/10 bg-black/50 select-none">
        <span className="text-[11px] font-mono uppercase tracking-wider text-white/60">
          {language || "text"}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-sans text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          title="Copy code to clipboard"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#ff6a6a]" />
              <span className="text-[#ff6a6a] font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 opacity-70" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="overflow-x-auto p-4 scrollbar-thin">
        <pre className="m-0 p-0 font-mono">
          <code>{children}</code>
        </pre>
      </div>
    </div>
  )
}
