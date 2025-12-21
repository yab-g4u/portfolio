"use client"

import { NeuralBackground } from "./neural-background"

export function SignalSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-12 md:py-20 px-4 md:px-8 overflow-hidden">
      <NeuralBackground opacity={0.08} nodeCount={25} />

      <div className="relative z-10 max-w-4xl w-full text-center">
        <div className="mb-12 md:mb-16">
          <div className="text-[10px] md:text-xs tracking-[0.3em] text-white/60 mb-4">{"// MODULE 04"}</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">OPEN CHANNEL</h2>
          <p className="text-sm md:text-base text-white/70 tracking-wide">
            Interested in collaboration? Transmit your signal.
          </p>
        </div>

        <div className="border-2 border-white bg-black/80 backdrop-blur-sm p-6 md:p-12 mb-8">
          <div className="space-y-6 md:space-y-8">
            <div className="text-left">
              <label className="text-[10px] md:text-xs tracking-wider text-white/60 mb-2 block">[SENDER_ID]</label>
              <input
                type="text"
                className="w-full bg-black border border-white/40 px-3 py-2 md:px-4 md:py-3 text-sm md:text-base text-white font-mono focus:outline-none focus:border-white transition-colors"
                placeholder="YOUR_NAME"
              />
            </div>

            <div className="text-left">
              <label className="text-[10px] md:text-xs tracking-wider text-white/60 mb-2 block">
                [TRANSMISSION_ADDRESS]
              </label>
              <input
                type="email"
                className="w-full bg-black border border-white/40 px-3 py-2 md:px-4 md:py-3 text-sm md:text-base text-white font-mono focus:outline-none focus:border-white transition-colors"
                placeholder="EMAIL@DOMAIN.COM"
              />
            </div>

            <div className="text-left">
              <label className="text-[10px] md:text-xs tracking-wider text-white/60 mb-2 block">
                [MESSAGE_PAYLOAD]
              </label>
              <textarea
                rows={6}
                className="w-full bg-black border border-white/40 px-3 py-2 md:px-4 md:py-3 text-sm md:text-base text-white font-mono focus:outline-none focus:border-white transition-colors resize-none"
                placeholder="ENTER YOUR MESSAGE..."
              />
            </div>

            <button className="w-full border-2 border-white py-3 md:py-4 text-sm md:text-base font-bold tracking-wider hover:bg-white hover:text-black transition-all duration-75">
              TRANSMIT_SIGNAL
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm">
          <a
            href="mailto:g4uforlife@gmail.com"
            className="border border-white/40 bg-black/60 backdrop-blur-sm p-4 hover:border-white hover:bg-white/5 transition-all duration-75"
          >
            <div className="text-[10px] md:text-xs text-white/60 mb-1">EMAIL</div>
            <div className="font-mono break-all">g4uforlife@gmail.com</div>
          </a>
          <a
            href="https://github.com/yab-g4u"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/40 bg-black/60 backdrop-blur-sm p-4 hover:border-white hover:bg-white/5 transition-all duration-75"
          >
            <div className="text-[10px] md:text-xs text-white/60 mb-1">GITHUB</div>
            <div className="font-mono">@yab-g4u</div>
          </a>
          <a
            href="https://www.linkedin.com/in/yeabsera-sisay-b5615b240/"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/40 bg-black/60 backdrop-blur-sm p-4 hover:border-white hover:bg-white/5 transition-all duration-75"
          >
            <div className="text-[10px] md:text-xs text-white/60 mb-1">LINKEDIN</div>
            <div className="font-mono">/in/yeabsera-sisay</div>
          </a>
        </div>
      </div>
    </section>
  )
}
