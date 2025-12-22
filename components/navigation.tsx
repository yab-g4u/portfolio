"use client"

interface NavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const navItems = [
    { id: "logic", label: "01_LOGIC", description: "Fullstack" },
    { id: "neurons", label: "02_NEURONS", description: "ML" },
    { id: "achievements", label: "03_WINS", description: "Achievements" },
    { id: "archive", label: "04_HYBRID", description: "Hybrid Projects" },
    { id: "signal", label: "05_SIGNAL", description: "Contact" },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(id)
    }
  }

  return (
    <nav className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto max-w-full">
      <div className="bg-black border-2 border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]">
        <div className="flex items-center divide-x divide-white/40 overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="group relative px-3 py-2 md:px-6 md:py-4 hover:bg-white transition-colors duration-75 flex-shrink-0"
            >
              <div className="text-[9px] md:text-xs tracking-wider font-bold group-hover:text-black transition-colors duration-75 whitespace-nowrap">
                {item.label}
              </div>
              <div className="text-[7px] md:text-[10px] text-white/60 group-hover:text-black/60 transition-colors duration-75 mt-0.5 md:mt-1 whitespace-nowrap">
                {item.description}
              </div>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
