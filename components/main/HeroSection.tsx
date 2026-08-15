"use client"

import { forwardRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Compass } from "lucide-react"

interface HeroSectionProps {
  typographyRef?: React.RefObject<HTMLDivElement | null>
  ctaRef?: React.RefObject<HTMLDivElement | null>
  hudRef?: React.RefObject<HTMLDivElement | null>
  onEnterClick?: () => void
  onExploreClick?: () => void
}

export const HeroSection = forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ typographyRef, ctaRef, hudRef, onEnterClick, onExploreClick }, ref) => {
    const navItems = ["HQ", "COUNTDOWN", "MISSION", "UNIVERSE", "TIMELINE"]

    return (
      <section 
        ref={ref} 
        id="hero" 
        className="relative w-full min-h-[75vh] sm:min-h-[80vh] flex flex-col justify-center items-center p-6 md:p-10 z-10 select-none overflow-hidden pt-28 pb-12"
      >
        {/* Center Hero Typography */}
        <div 
          ref={typographyRef} 
          className="relative flex flex-col items-center justify-center text-center z-10 mb-6 sm:mb-8"
        >
          {/* Main Title / Logo */}
          <h1 className="opacity-0 flex items-center justify-center px-2">
            <img 
              src="/logo.png" 
              alt="HACKINTYM '26 2.0" 
              className="w-full max-w-[280px] xs:max-w-[340px] sm:max-w-[480px] md:max-w-[620px] lg:max-w-[720px] h-auto object-contain drop-shadow-[0_10px_35px_rgba(0,102,255,0.45)] select-none pointer-events-none"
            />
            <span className="sr-only">HACKINTYM '26 2.0</span>
          </h1>
          
          {/* Mission Subtitle */}
          <div data-hero-mission className="mt-3 sm:mt-4 flex items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm tracking-[0.2em] font-mono text-intel-blue-light uppercase opacity-90 opacity-0">
            <span className="w-6 sm:w-10 h-px bg-intel-blue-light/50"></span>
            <span>30-Hour Innovation Mission</span>
            <span className="w-6 sm:w-10 h-px bg-intel-blue-light/50"></span>
          </div>

          {/* Hero Tagline */}
          <div className="mt-4 sm:mt-5 text-base sm:text-xl md:text-2xl font-bold tracking-widest text-white/90 overflow-hidden">
            <div className="tagline-words flex flex-wrap gap-2 sm:gap-4 justify-center">
              <span className="tagline-word inline-block opacity-0">ASSEMBLE.</span>
              <span className="tagline-word inline-block opacity-0">INNOVATE.</span>
              <span className="tagline-word inline-block text-power-red text-glow-red opacity-0">CONQUER.</span>
            </div>
          </div>

        </div>

        {/* Bottom CTA Action Bar */}
        <div 
          ref={ctaRef} 
          className="relative flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 z-20 pointer-events-auto mt-2 opacity-0"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSf4OfwQxpT3z2nohQUOCyHcIqw7cMZbrgscbBH0VDugvojcBw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full sm:w-auto"
            >
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-intel-blue hover:bg-intel-blue-light text-white font-bold tracking-widest border border-intel-blue-light/50 shadow-[0_0_25px_rgba(0,102,255,0.5)] h-14 px-8 uppercase transition-colors cursor-pointer"
              >
                Enter the Universe
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <Button 
              variant="outline"
              size="lg" 
              className="w-full sm:w-auto bg-black/40 border border-power-red/50 hover:bg-power-red/10 text-white hover:text-power-red-light font-bold tracking-widest glass-panel h-14 px-8 uppercase transition-colors cursor-pointer"
              onClick={onExploreClick || (() => {
                const devteamElem = document.getElementById("devteam")
                devteamElem?.scrollIntoView({ behavior: "smooth" })
              })}
            >
              Development Team
              <Compass className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    )
  }
)

HeroSection.displayName = "HeroSection"
