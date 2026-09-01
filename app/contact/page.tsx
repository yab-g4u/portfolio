import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Contact — Yeabsera Sisay",
  description: "Get in touch with Yeabsera Sisay. Have an idea, a project, an opportunity, or want to discuss AI systems? Send a direct message.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-emerald-500/20 selection:text-emerald-950 dark:selection:text-emerald-100 font-sans flex flex-col justify-between">
      {/* Top Minimal Navigation */}
      <Navigation />

      {/* Main Single Column Layout */}
      <main className="max-w-[720px] w-full mx-auto px-4 sm:px-6 overflow-x-hidden flex-1">
        <Contact isStandalone={true} />
      </main>

      {/* Global Footer */}
      <div className="max-w-[720px] w-full mx-auto px-4 sm:px-6">
        <Footer />
      </div>
    </div>
  )
}
