"use client"

import { forwardRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Compass } from "lucide-react"
import { CLUB_LOGOS } from "@/lib/data"
import Image from "next/image"

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
        className="relative w-full min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-center items-center p-4 sm:p-6 md:p-10 z-10 select-none overflow-hidden pt-36 sm:pt-44 md:pt-48 pb-16"
      >
        {/* Center Hero Typography */}
        <div 
          ref={typographyRef} 
          className="relative flex flex-col items-center justify-center text-center z-10  mb-6 sm:mb-6"
        >
          {/* Main Title / Logo */}
          <h1 className="opacity-0 flex items-center justify-center px-4 -mt-7">
            <Image 
              src="/logo.png" 
              alt="HACKINTYM '26 2.0" 
              loading="eager"
              className="w-full max-w-[260px] xs:max-w-[320px] sm:max-w-[440px] md:max-w-[560px] lg:max-w-[650px] h-auto object-contain drop-shadow-[0_10px_35px_rgba(0,102,255,0.45)] select-none pointer-events-none"
              height={800}
              width={800}
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

          {/* Club Logos in Round Frames & Industry Partner */}
          <div 
            data-hero-logos
            className="mt-6 sm:mt-8 flex flex-col items-center justify-center gap-4 sm:gap-5 opacity-0"
          >
            <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-5 md:gap-6">
              {CLUB_LOGOS.map((logo) => (
                <motion.div 
                  key={logo.id}
                  whileHover={{ scale: 1.15, y: -4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-full p-[2.5px] bg-gradient-to-tr from-intel-blue via-intel-blue-light to-power-red shadow-[0_0_20px_rgba(0,102,255,0.4)] hover:shadow-[0_0_30px_rgba(0,200,255,0.7)] flex items-center justify-center overflow-hidden shrink-0 transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-full h-full rounded-full bg-black/90 p-2 sm:p-3 flex items-center justify-center overflow-hidden">
                    <img 
                      src={logo.src} 
                      alt={logo.alt} 
                      className="w-full h-full object-contain rounded-full transition-transform duration-300 group-hover:scale-105" 
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Official Industry Partner Pill */}
            <motion.a
              href="#partner"
              onClick={(e) => {
                e.preventDefault()
                const partnerElem = document.getElementById("partner")
                if (partnerElem) {
                  const yOffset = -70
                  const y = partnerElem.getBoundingClientRect().top + window.pageYOffset + yOffset
                  window.scrollTo({ top: y, behavior: "smooth" })
                }
              }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="mt-1 sm:mt-2 inline-flex items-center gap-2.5 sm:gap-3 px-4 py-1.5 sm:py-2 rounded-full bg-black/60 border border-intel-blue/40 shadow-[0_0_20px_rgba(0,102,255,0.25)] hover:border-intel-blue hover:shadow-[0_0_30px_rgba(0,200,255,0.5)] backdrop-blur-xl transition-all cursor-pointer group"
            >
              <span className="text-[10px] sm:text-xs font-mono tracking-widest text-intel-blue-light uppercase font-semibold">
                INDUSTRY PARTNER:
              </span>
              <div className="h-6 w-auto px-2 py-0.5 rounded bg-white flex items-center justify-center shadow-sm">
                <img 
                  src="/logos/4iapps.png" 
                  alt="4i apps solutions" 
                  className="h-4.5 w-auto object-contain" 
                />
              </div>
              <span className="text-xs sm:text-sm font-bold tracking-wider text-white group-hover:text-intel-blue-light transition-colors uppercase">
                4i APPS SOLUTIONS
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-intel-blue-light group-hover:translate-x-1 transition-transform" />
            </motion.a>
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
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-intel-blue hover:bg-intel-blue-light text-white font-bold tracking-widest border border-intel-blue-light/50 shadow-[0_0_25px_rgba(0,102,255,0.5)] h-14 px-8 uppercase transition-colors cursor-pointer"
              onClick={onEnterClick || (() => {
                const teamsElem = document.getElementById("selected-teams")
                if (teamsElem) {
                  const yOffset = -70
                  const y = teamsElem.getBoundingClientRect().top + window.pageYOffset + yOffset
                  window.scrollTo({ top: y, behavior: "smooth" })
                }
              })}
            >
              View Selected Teams
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
              className="w-full sm:w-auto bg-black/40 border border-power-red/50 hover:bg-power-red/10 text-white hover:text-power-red-light font-bold tracking-widest glass-panel h-14 px-8 uppercase transition-colors cursor-pointer"
              onClick={onExploreClick || (() => {
                const devteamElem = document.getElementById("devteam")
                devteamElem?.scrollIntoView({ behavior: "smooth" })
              })}
            >
              Organizing Team
              <Compass className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    )
  }
)

HeroSection.displayName = "HeroSection"
