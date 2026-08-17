"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { FastForward } from "lucide-react"
import { MarvelArcReactorCanvas } from "./MarvelArcReactorCanvas"
import { MarvelComicFlipbook } from "./MarvelComicFlipbook"

interface LoadingOverlayProps {
  onLoaded: () => void
}

export function LoadingOverlay({ onLoaded }: LoadingOverlayProps) {
  const [isOverlayFading, setIsOverlayFading] = useState(false)
  const [isZooming, setIsZooming] = useState(false)

  const overdriveProgress = useRef(0)
  const hasFinishedRef = useRef(false)

  // Execute Zoom-in Transition automatically upon single-run completion
  const triggerAssemble = useCallback(() => {
    if (hasFinishedRef.current) return
    hasFinishedRef.current = true

    // Step 1: Engage smooth 3D camera plunge into Arc Reactor
    setIsZooming(true)

    // Step 2: Seamless handoff to main page reveal
    setTimeout(() => {
      setIsOverlayFading(true)
      setTimeout(() => {
        onLoaded()
      }, 350)
    }, 450)
  }, [onLoaded])

  // Instant Skip option
  const handleSkip = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation()
      if (hasFinishedRef.current) return
      hasFinishedRef.current = true
      setIsOverlayFading(true)
      setTimeout(() => {
        onLoaded()
      }, 200)
    },
    [onLoaded]
  )

  // Keyboard shortcut (Escape to skip)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleSkip()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleSkip])

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden bg-[#020206] select-none cursor-default transition-opacity duration-400 ease-out will-change-[opacity] ${
        isOverlayFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* 3D STARK TECH ARC REACTOR WITH 3D CAMERA PLUNGE ZOOM */}
      <MarvelArcReactorCanvas
        isZooming={isZooming}
        isOverdrive={isZooming}
        overdriveProgress={overdriveProgress}
        onTriggerAssemble={triggerAssemble}
        active={!isOverlayFading}
      />

      {/* TOP CONTROLS (CLEAN MINIMAL SKIP BUTTON) */}
      <div className="absolute top-0 right-0 p-4 sm:p-6 z-30 pointer-events-auto">
        <button
          onClick={handleSkip}
          aria-label="Skip Intro"
          type="button"
          className="p-3 rounded-full bg-power-red hover:bg-power-red-light text-white border border-power-red/60 shadow-[0_0_20px_rgba(225,6,0,0.6)] flex items-center justify-center transition-all cursor-pointer active:scale-95"
        >
          <FastForward className="w-5 h-5" />
        </button>
      </div>

      {/* CENTER STAGE: AUTO-ADVANCING CIRCULAR COMIC PORTAL (SYNCHRONIZED ZOOM-IN PLUNGE ON EXIT) */}
      <motion.div
        animate={{
          scale: isZooming ? 4.2 : 1,
          opacity: isZooming ? 0 : 1,
        }}
        transition={{
          duration: 0.65,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] xs:w-[170px] xs:h-[170px] sm:w-[210px] sm:h-[210px] md:w-[240px] md:h-[240px] pointer-events-none z-10 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,200,255,0.4)] will-change-[transform,opacity]"
      >
        <MarvelComicFlipbook onComplete={triggerAssemble} />
      </motion.div>

      {/* BOTTOM SUBTLE ENERGY PULSE */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20">
        <div className="w-3.5 h-3.5 rounded-full bg-power-red shadow-[0_0_15px_#ff0033] animate-ping" />
        <div className="w-16 h-1 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
      </div>

      {/* CINEMATIC MARVEL VIGNETTE */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.9)_100%)]"></div>
    </div>
  )
}
