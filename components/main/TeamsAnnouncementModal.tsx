"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Sparkles, X, ArrowRight, CheckCircle2, Clock } from "lucide-react"

interface TeamsAnnouncementModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TeamsAnnouncementModal({ isOpen, onClose }: TeamsAnnouncementModalProps) {
  // Close on Escape key press and prevent background scrolling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
      document.documentElement.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
    }
  }, [isOpen, onClose])

  const handleViewTeams = () => {
    onClose()
    setTimeout(() => {
      const teamsElem = document.getElementById("selected-teams")
      if (teamsElem) {
        const yOffset = -70
        const y = teamsElem.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: y, behavior: "smooth" })
      }
    }, 150)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
          {/* Frosted Glass Translucent Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-[3px]"
          />

          {/* Horizontally Enlarged Modal Container (max-w-3xl) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="relative w-full max-w-2xl sm:max-w-3xl rounded-3xl glass-panel bg-gradient-to-b from-neutral-900/95 via-black/95 to-neutral-950/95 border border-intel-blue/40 p-6 sm:p-10 md:p-12 shadow-[0_0_60px_rgba(0,102,255,0.4)] overflow-hidden text-center z-10 my-auto"
          >
            {/* Top Glowing Beam */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-intel-blue via-cyan-400 to-power-red" />
            
            {/* Ambient Background Glows */}
            <div className="absolute -top-28 left-1/4 w-80 h-80 bg-intel-blue/20 blur-[80px] pointer-events-none rounded-full" />
            <div className="absolute -bottom-28 right-1/4 w-80 h-80 bg-power-red/15 blur-[80px] pointer-events-none rounded-full" />
            
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Announcement Modal"
              className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Announcement Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-intel-blue/20 border border-intel-blue/40 text-intel-blue-light font-mono text-xs font-bold tracking-widest uppercase mb-5 shadow-[0_0_15px_rgba(0,102,255,0.3)]">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>OFFICIAL TRANSMISSION</span>
            </div>

            {/* Center Animated Icon Shield */}
            <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24 mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-intel-blue via-cyan-400 to-power-red opacity-35 blur-md animate-pulse" />
              <div className="relative w-full h-full rounded-2xl bg-black/85 border border-intel-blue/50 flex items-center justify-center shadow-inner">
                <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-intel-blue-light" />
              </div>
            </div>

            {/* Main Headline */}
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
              Selected Teams{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-intel-blue-light via-cyan-300 to-white">
                Are Announced!
              </span>
            </h3>

            {/* Descriptive Body */}
            <p className="text-sm sm:text-base font-mono text-white/75 leading-relaxed mb-8 max-w-xl mx-auto">
              The official qualified innovation squads and standby teams for <span className="text-white font-bold">HACKINTYM &apos;26 2.0</span> have been published. Check out the full roster now!
            </p>

            {/* Wide Summary Panels (2 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-xl mx-auto text-left">
              {/* Selected Teams Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)] flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <span className="block text-base sm:text-lg font-black text-white uppercase tracking-wide">
                    25 Selected
                  </span>
                  <span className="block text-[11px] font-mono text-emerald-400/90 tracking-wider uppercase font-semibold">
                    Qualified Active Slots
                  </span>
                </div>
              </div>

              {/* Waiting List Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.15)] flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <span className="block text-base sm:text-lg font-black text-white uppercase tracking-wide">
                    5 Waiting List
                  </span>
                  <span className="block text-[11px] font-mono text-amber-400/90 tracking-wider uppercase font-semibold">
                    Standby Reserve Squads
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleViewTeams}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-intel-blue hover:bg-intel-blue-light text-white font-bold font-mono text-xs sm:text-sm tracking-wider uppercase border border-intel-blue-light/50 shadow-[0_0_25px_rgba(0,102,255,0.5)] transition-all flex items-center justify-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>View Selected Teams</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-mono text-xs sm:text-sm font-bold tracking-wider uppercase border border-white/10 transition-colors cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
