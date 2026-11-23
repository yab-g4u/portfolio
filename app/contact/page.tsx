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
    <div className="min-h-screen bg-background text-foreground selection:bg-[#d60407]/30 selection:text-foreground font-sans flex flex-col justify-between overflow-x-clip">
      {/* Top Fixed Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="w-full pt-20 flex-1">
        <Contact isStandalone={true} />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  )
}
