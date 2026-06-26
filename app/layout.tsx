import type React from "react"
import type { Metadata } from "next"
import { Kanit } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const kanit = Kanit({
  subsets: ["latin"],
  weights: ["300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Yeabsera Sisay -- Neural Architect & Fullstack Engineer",
  description:
    "Portfolio of Yeabsera Sisay - Machine Learning Engineer, Fullstack Developer, and 3D Creator specializing in neural networks, scalable web applications, and innovative visual experiences.",
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
    <html lang="en" className="bg-[#0C0C0C]">
      <head>
        <style>{`
          html, body, #root, main {
            background: #0C0C0C;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          * {
            box-sizing: border-box;
          }
        `}</style>
      </head>
      <body className={`${kanit.className} antialiased bg-[#0C0C0C]`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
