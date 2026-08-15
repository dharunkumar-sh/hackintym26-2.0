"use client"

import { useState, useCallback, useRef } from "react"
import { SpidermanIntroCanvas } from "./SpidermanIntroCanvas"

interface LoadingOverlayProps {
  onLoaded: () => void
}

export function LoadingOverlay({ onLoaded }: LoadingOverlayProps) {
  const [isOverlayFading, setIsOverlayFading] = useState(false)
  const hasFinishedRef = useRef(false)

  // Web Shoot callback fired by Three.js & GSAP when web zooms in through the lens
  const handleWebShootComplete = useCallback(() => {
    if (hasFinishedRef.current) return
    hasFinishedRef.current = true

    setIsOverlayFading(true)

    // Seamless handoff to main page reveal
    setTimeout(() => {
      onLoaded()
    }, 400)
  }, [onLoaded])

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden bg-black select-none transition-opacity duration-500 ${
        isOverlayFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* 3D SPIDER-MAN HERO & WEB-SHOOT SCENE */}
      <SpidermanIntroCanvas
        onWebShootComplete={handleWebShootComplete}
        active={!isOverlayFading}
      />

      {/* SUBTLE CINEMATIC VIGNETTE */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)]"></div>
    </div>
  )
}
