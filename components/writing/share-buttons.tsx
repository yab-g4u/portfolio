"use client"

import { useState } from "react"
import { Check, Copy, Share2 } from "lucide-react"
import { LinkedInBrandIcon } from "@/components/tech-icons"

interface ShareButtonsProps {
  title: string
  slug: string
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const url = typeof window !== "undefined"
    ? `${window.location.origin}/writing/${slug}`
    : `https://yeabsera-sisay.vercel.app/writing/${slug}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `"${title}" by @yeabsera_sisay\n\n`
  )}&url=${encodeURIComponent(url)}`

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url
  )}`

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="text-muted-foreground font-mono text-[11px] uppercase tracking-wider mr-1 hidden sm:inline-flex items-center gap-1">
        <Share2 className="w-3 h-3" />
        Share
      </span>

      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-secondary/50 hover:bg-secondary text-foreground transition-colors cursor-pointer"
        title="Copy article link"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-accent" />
            <span className="text-accent font-medium">Copied link</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 opacity-70" />
            <span>Copy link</span>
          </>
        )}
      </button>

      <a
        href={tweetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-secondary/50 hover:bg-secondary text-foreground transition-colors"
      >
        <span className="font-bold text-[11px]">𝕏</span>
        <span>Post</span>
      </a>

      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-secondary/50 hover:bg-secondary text-foreground transition-colors"
      >
        <LinkedInBrandIcon className="w-3.5 h-3.5 opacity-80" />
        <span>Share</span>
      </a>
    </div>
  )
}
