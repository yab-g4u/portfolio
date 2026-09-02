import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ResumeProvider } from "@/lib/resume-context"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Yeabsera Sisay — AI Engineer & Full-Stack Builder",
  description:
    "Yeabsera Sisay is an AI engineer and full-stack builder focused on agentic AI, voice systems, machine learning, and real-world software.",
  keywords: [
    "Yeabsera Sisay",
    "AI Engineer",
    "Full-Stack Builder",
    "Machine Learning",
    "Voice AI",
    "Multi-Agent Systems",
    "CrewAI",
    "FastAPI",
    "Next.js",
  ],
  authors: [{ name: "Yeabsera Sisay" }],
  creator: "Yeabsera Sisay",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yeabsera-sisay.vercel.app",
    title: "Yeabsera Sisay — AI Engineer & Full-Stack Builder",
    description:
      "Yeabsera Sisay is an AI engineer and full-stack builder focused on agentic AI, voice systems, machine learning, and real-world software.",
    siteName: "Yeabsera Sisay Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yeabsera Sisay — AI Engineer & Full-Stack Builder",
    description:
      "Yeabsera Sisay is an AI engineer and full-stack builder focused on agentic AI, voice systems, machine learning, and real-world software.",
  },
  icons: {
    icon: "/neural-favicon.jpg",
    apple: "/neural-favicon.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}>
        <ResumeProvider>
          {children}
        </ResumeProvider>
      </body>
    </html>
  )
}

