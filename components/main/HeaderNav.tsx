"use client"

import { forwardRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const NAV_ITEMS = [
  { label: "HQ", targetId: "hero" },
  { label: "COUNTDOWN", targetId: "countdown" },
  { label: "MISSION", targetId: "mission" },
  { label: "UNIVERSE", targetId: "tracks" },
  { label: "TIMELINE", targetId: "timeline" },
  { label: "DEV TEAM", targetId: "devteam" },
]

export const HeaderNav = forwardRef<HTMLElement>((_, ref) => {
  const [activeSection, setActiveSection] = useState("hero")
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sectionIds = NAV_ITEMS.map((item) => item.targetId)
      const scrollPosition = window.scrollY + 200

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i]
        const element = document.getElementById(id)
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Smooth scroll handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)

    setTimeout(() => {
      const element = document.getElementById(targetId)
      if (element) {
        const yOffset = -70
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: y, behavior: "smooth" })
      }
    }, 50)
  }

  return (
    <header 
      ref={ref}
      className="fixed top-2.5 sm:top-4 left-2.5 sm:left-6 right-2.5 sm:right-6 z-50 max-w-7xl mx-auto transition-all duration-500 opacity-0 pointer-events-auto"
    >
      <div 
        className={`w-full rounded-2xl transition-all duration-500 px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-between backdrop-blur-2xl border ${
          isScrolled
            ? "bg-black/60 border-intel-blue/40 shadow-[0_10px_40px_rgba(0,102,255,0.3)] bg-gradient-to-r from-intel-blue/20 via-black/70 to-power-red/20"
            : "bg-black/40 border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.4)] bg-gradient-to-r from-intel-blue/10 via-black/40 to-power-red/10"
        }`}
      >
        
        {/* Left: Logo */}
        <a 
          href="#hero" 
          onClick={(e) => handleNavClick(e, "hero")}
          className="flex items-center group cursor-pointer shrink-0"
        >
          <img 
            src="/logo.png" 
            alt="HACKINTYM '26 2.0" 
            className="h-7 xs:h-8 sm:h-9 md:h-10 w-auto max-w-[130px] xs:max-w-[160px] sm:max-w-[200px] object-contain transition-transform group-hover:scale-105 select-none"
          />
        </a>

        {/* Center: Desktop Smooth-Scroll Navigation */}
        <nav aria-label="Main Header Navigation" className="hidden md:flex items-center gap-5 lg:gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.targetId
            return (
              <a
                key={item.targetId}
                href={`#${item.targetId}`}
                onClick={(e) => handleNavClick(e, item.targetId)}
                className={`relative text-[14px] font-mono tracking-wider uppercase transition-colors py-1.5 ${
                  isActive ? "text-white font-bold" : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="active-nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-intel-blue via-intel-blue-light to-power-red shadow-[0_0_10px_#0066FF]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            )
          })}
        </nav>

        {/* Right: Register Button & Mobile Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="relative">
            <motion.a
              href="https://docs.google.com/forms/d/e/1FAIpQLSf4OfwQxpT3z2nohQUOCyHcIqw7cMZbrgscbBH0VDugvojcBw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-xl bg-power-red hover:bg-power-red-light text-white text-[12px] sm:text-[14px] font-mono font-black tracking-wider uppercase border border-power-red/60 shadow-[0_0_20px_rgba(255,0,51,0.6)] transition-all cursor-pointer shrink-0"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <span>REGISTER NOW</span>
            </motion.a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            type="button"
            className="md:hidden p-2 text-white hover:text-white glass-panel rounded-lg border border-white/20 bg-black/60 active:scale-95 transition-transform flex items-center justify-center cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass-panel border border-white/20 bg-black/95 backdrop-blur-3xl rounded-2xl mt-2 p-5 overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.7)]"
          >
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.targetId
                return (
                  <a
                    key={item.targetId}
                    href={`#${item.targetId}`}
                    onClick={(e) => handleNavClick(e, item.targetId)}
                    className={`flex items-center justify-between text-[14px] font-mono font-medium tracking-wider uppercase px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                      isActive 
                        ? "text-white font-bold bg-intel-blue/20 border border-intel-blue/40" 
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-intel-blue shadow-[0_0_8px_#0066FF]"></span>}
                  </a>
                )
              })}

              {/* Full Width Mobile Register Button */}
              <div className="pt-2 mt-1 border-t border-white/10">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSf4OfwQxpT3z2nohQUOCyHcIqw7cMZbrgscbBH0VDugvojcBw/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-power-red hover:bg-power-red-light text-white text-[14px] font-mono font-bold tracking-wider uppercase border border-power-red/50 shadow-[0_0_20px_rgba(255,0,51,0.6)] transition-all cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  REGISTER NOW
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
})

HeaderNav.displayName = "HeaderNav"
