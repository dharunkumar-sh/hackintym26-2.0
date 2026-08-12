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

    const element = document.getElementById(targetId)
    if (element) {
      const yOffset = -70
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  return (
    <header 
      ref={ref}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 opacity-0 ${
        isScrolled 
          ? "bg-black/75 backdrop-blur-md border-b border-white/10 py-3 shadow-[0_4px_30px_rgba(0,102,255,0.15)]" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between">
        
        {/* Left: Logo */}
        <a 
          href="#hero" 
          onClick={(e) => handleNavClick(e, "hero")}
          className="flex flex-col items-start group"
        >
          <div className="text-base sm:text-lg font-black tracking-widest text-white uppercase flex items-center gap-1">
            HACKINTYM <span className="text-intel-blue text-glow-blue transition-transform group-hover:scale-110">'26 2.0</span>
          </div>
          <div className="text-[9px] font-mono tracking-widest text-white/40">
            GLOBAL_HACK_PROTOCOL
          </div>
        </a>

        {/* Center: Desktop Smooth-Scroll Navigation */}
        <nav aria-label="Main Header Navigation" className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.targetId
            return (
              <a
                key={item.targetId}
                href={`#${item.targetId}`}
                onClick={(e) => handleNavClick(e, item.targetId)}
                className={`relative text-xs font-mono tracking-widest uppercase transition-colors py-1 ${
                  isActive ? "text-white font-bold" : "text-white/60 hover:text-white"
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
        <div className="flex items-center gap-3">
          <motion.a
            href="#registration"
            onClick={(e) => {
              e.preventDefault()
              const elem = document.getElementById("registration") || document.getElementById("countdown")
              elem?.scrollIntoView({ behavior: "smooth" })
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded bg-power-red/90 hover:bg-power-red text-white text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase border border-power-red/50 shadow-[0_0_15px_rgba(255,0,51,0.5)] transition-all cursor-pointer"
          >
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-pulse"></span>
            REGISTER NOW
          </motion.a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 text-white hover:text-white glass-panel rounded-lg border border-white/20 bg-black/60 active:scale-95 transition-transform"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-panel border-b border-white/10 bg-black/90 backdrop-blur-xl px-6 py-6 overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.targetId
                return (
                  <a
                    key={item.targetId}
                    href={`#${item.targetId}`}
                    onClick={(e) => handleNavClick(e, item.targetId)}
                    className={`flex items-center justify-between text-sm font-mono tracking-widest uppercase py-2 border-b border-white/5 ${
                      isActive ? "text-intel-blue-light font-bold" : "text-white/70"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-intel-blue"></span>}
                  </a>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
})

HeaderNav.displayName = "HeaderNav"
