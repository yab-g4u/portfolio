import type React from "react"
import type { Metadata } from "next"
import { Kanit } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Yeabsera Sisay -- 3D Creator & Engineer",
  description:
    "Portfolio of Yeabsera Sisay - Machine Learning Engineer, Fullstack Developer, and 3D Creator specializing in innovative visual experiences and cutting-edge technology.",
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
    <html lang="en" className="bg-[#0C0C0C] scroll-smooth">
      <body className={`${kanit.className} antialiased bg-[#0C0C0C]`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
