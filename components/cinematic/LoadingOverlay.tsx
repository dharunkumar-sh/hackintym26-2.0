"use client"

import { useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SpidermanIntroCanvas } from "./SpidermanIntroCanvas"

interface LoadingOverlayProps {
  onLoaded: () => void
}

export function LoadingOverlay({ onLoaded }: LoadingOverlayProps) {
  const [isOverlayFading, setIsOverlayFading] = useState(false)
  const [isLanding, setIsLanding] = useState(false)
  const hasFinishedRef = useRef(false)

  // Callback when landing and camera plunge finishes
  const handleLaunchComplete = useCallback(() => {
    if (hasFinishedRef.current) return
    hasFinishedRef.current = true

    setIsOverlayFading(true)

    // Seamless handoff to main page reveal
    setTimeout(() => {
      onLoaded()
    }, 350)
  }, [onLoaded])

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden bg-black select-none transition-opacity duration-500 ${
        isOverlayFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* 3D SPIDER-MAN SCENE: SPINS SLOWLY UNTIL USER CLICKS DIRECTLY ON THE MODEL */}
      <SpidermanIntroCanvas
        onWebShootComplete={handleLaunchComplete}
        onTriggerLanding={() => setIsLanding(true)}
        isLanding={isLanding}
        active={!isOverlayFading}
      />

      {/* APPLICATION-THEMED THOUGHT BUBBLE (NON-INTERACTIVE VISUAL ELEMENT) */}
      <AnimatePresence>
        {!isLanding && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
            exit={{ opacity: 0, scale: 0.5, y: -15 }}
            transition={{
              y: { repeat: Infinity, duration: 2.4, ease: "easeInOut" },
              opacity: { duration: 0.5 },
              scale: { duration: 0.5, type: "spring", bounce: 0.4 }
            }}
            className="absolute top-[28%] sm:top-[26%] right-[8%] sm:right-[18%] md:right-[26%] z-20 pointer-events-none select-none cursor-default"
          >
            <div className="relative">
              {/* Dark Cyber Thought Bubble Display */}
              <div className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-3xl bg-[#090d16]/95 text-white font-mono font-black text-xs sm:text-sm tracking-widest uppercase shadow-[0_0_30px_rgba(0,102,255,0.4),0_15px_35px_rgba(0,0,0,0.9)] border border-intel-blue/60 flex items-center gap-2.5 backdrop-blur-xl">
                <span className="w-2 h-2 rounded-full bg-power-red shadow-[0_0_8px_#ff0033] animate-ping"></span>
                <span className="bg-gradient-to-r from-white via-intel-blue-light to-white bg-clip-text text-transparent font-extrabold drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">
                  CLICK ME!
                </span>
              </div>

              {/* Trailing Circles */}
              <div className="absolute -bottom-2.5 left-4 w-3.5 h-3.5 rounded-full bg-[#090d16] border border-intel-blue/60 shadow-[0_0_12px_rgba(0,102,255,0.4)]"></div>
              <div className="absolute -bottom-5 left-1 w-2 h-2 rounded-full bg-[#090d16] border border-intel-blue/50 shadow-[0_0_8px_rgba(0,102,255,0.3)]"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SUBTLE CINEMATIC VIGNETTE */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)]"></div>
    </div>
  )
}
