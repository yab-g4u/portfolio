import type React from "react"
import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Yeabsera Sisay // Neural Architect & Fullstack Engineer",
  description:
    "Portfolio of Yeabsera Sisay - Machine Learning Engineer and Fullstack Developer specializing in neural networks and scalable web applications.",
  generator: "v0.app",
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
    <html lang="en">
      <body className={`${geistMono.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
