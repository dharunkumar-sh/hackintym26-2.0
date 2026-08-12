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
    const navItems = ["HQ", "COUNTDOWN", "MISSION", "UNIVERSE", "TIMELINE", "HEROES", "INTEL"]

    return (
      <section 
        ref={ref} 
        id="hero" 
        className="relative w-full min-h-[100svh] flex flex-col justify-between p-6 md:p-10 z-10 select-none overflow-hidden pt-24"
      >
        {/* Center Hero Typography */}
        <div 
          ref={typographyRef} 
          className="relative flex flex-col items-center justify-center text-center my-auto z-10 py-12 opacity-0"
        >
          {/* Main Title */}
          <h1 
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white uppercase"
            style={{ textShadow: "0 4px 30px rgba(0, 102, 255, 0.4)" }}
          >
            HACKINTYM <span className="text-transparent bg-clip-text bg-gradient-to-r from-intel-blue via-intel-blue-light to-power-red">'26</span>
          </h1>
          
          {/* Mission Subtitle */}
          <div className="mt-4 flex items-center justify-center gap-4 text-xs sm:text-sm tracking-[0.2em] font-mono text-intel-blue-light uppercase opacity-90">
            <span className="w-8 sm:w-12 h-px bg-intel-blue-light/50"></span>
            <span>30-Hour Innovation Mission</span>
            <span className="w-8 sm:w-12 h-px bg-intel-blue-light/50"></span>
          </div>

          {/* Hero Tagline */}
          <div className="mt-6 text-lg sm:text-2xl font-bold tracking-widest text-white/90 overflow-hidden">
            <div className="tagline-words flex flex-wrap gap-2 sm:gap-4 justify-center">
              <span className="tagline-word inline-block opacity-0 translate-y-full">ASSEMBLE.</span>
              <span className="tagline-word inline-block opacity-0 translate-y-full">INNOVATE.</span>
              <span className="tagline-word inline-block text-power-red text-glow-red opacity-0 translate-y-full">CONQUER.</span>
            </div>
          </div>

          {/* HUD Interface Markings */}
          <div className="absolute -top-6 -left-6 text-[10px] font-mono text-white/30 hidden lg:block">
            SYS.RDY // 2026
          </div>
          <div className="absolute -bottom-6 -right-6 text-[10px] font-mono text-white/30 hidden lg:block">
            NEXUS_CORE // ACTIVE
          </div>
        </div>

        {/* Bottom CTA Action Bar */}
        <div 
          ref={ctaRef} 
          className="relative flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 z-20 pb-6 pointer-events-auto opacity-0"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-intel-blue hover:bg-intel-blue-light text-white font-bold tracking-widest border border-intel-blue-light/50 shadow-[0_0_25px_rgba(0,102,255,0.5)] h-14 px-8 uppercase transition-colors"
              onClick={onEnterClick || (() => {
                const countdownElem = document.getElementById("countdown")
                countdownElem?.scrollIntoView({ behavior: "smooth" })
              })}
            >
              Enter the Universe
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <Button 
              variant="outline"
              size="lg" 
              className="w-full sm:w-auto bg-black/40 border border-power-red/50 hover:bg-power-red/10 text-white hover:text-power-red-light font-bold tracking-widest glass-panel h-14 px-8 uppercase transition-colors"
              onClick={onExploreClick || (() => {
                const tracksElem = document.getElementById("tracks")
                tracksElem?.scrollIntoView({ behavior: "smooth" })
              })}
            >
              Explore the Heroes
              <Compass className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>

        {/* Atmospheric lines */}
        <div className="absolute top-20 left-6 w-px h-32 bg-gradient-to-b from-intel-blue/30 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-20 right-6 w-px h-32 bg-gradient-to-t from-power-red/30 to-transparent pointer-events-none"></div>
      </section>
    )
  }
)

HeroSection.displayName = "HeroSection"
