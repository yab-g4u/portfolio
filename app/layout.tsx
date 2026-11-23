import type React from "react"
import type { Metadata } from "next"
import { Instrument_Serif, Inter, Archivo_Black, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ResumeProvider } from "@/lib/resume-context"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
})

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-archivo-black",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
})

export const metadata: Metadata = {
  title: "Yeabsera Sisay — AI Engineer",
  description:
    "Yeabsera Sisay is an AI engineer and full-stack builder focused on agentic AI, voice systems, computer vision, and real-world software.",
  keywords: [
    "Yeabsera Sisay",
    "AI Engineer",
    "Full-Stack Builder",
    "Machine Learning",
    "Voice AI",
    "Computer Vision",
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
    title: "Yeabsera Sisay — AI Engineer",
    description:
      "Multi-agent systems, voice AI, computer vision, and full-stack products that ship.",
    siteName: "Yeabsera Sisay Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yeabsera Sisay — AI Engineer",
    description:
      "Multi-agent systems, voice AI, computer vision, and full-stack products that ship.",
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
    <html
      lang="en"
      className={`dark scroll-smooth ${instrumentSerif.variable} ${inter.variable} ${archivoBlack.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased bg-[#0a0a0a] text-white selection:bg-[#d60407]/40 selection:text-white">
        <ResumeProvider>{children}</ResumeProvider>
      </body>
    </html>
  )
}
