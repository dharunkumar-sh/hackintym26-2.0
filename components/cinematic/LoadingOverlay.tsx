"use client"

import { useState, useEffect } from "react"

interface LoadingOverlayProps {
  onLoaded: () => void
}

export function LoadingOverlay({ onLoaded }: LoadingOverlayProps) {
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    let val = 0
    const interval = setInterval(() => {
      val += Math.random() * 18
      if (val >= 100) {
        val = 100
        clearInterval(interval)
        setTimeout(() => onLoaded(), 350)
      }
      setLoadingProgress(Math.min(100, Math.floor(val)))
    }, 80)
    return () => clearInterval(interval)
  }, [onLoaded])

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-t-2 border-intel-blue rounded-full animate-spin"></div>
        <div 
          className="absolute inset-2 border-b-2 border-power-red rounded-full animate-spin" 
          style={{ animationDirection: "reverse", animationDuration: "1.4s" }}
        ></div>
      </div>
      <div className="text-intel-blue-light font-mono tracking-widest text-sm animate-pulse">
        INITIALIZING NEXUS...
      </div>
      <div className="text-white/50 font-mono text-xs mt-2">
        {loadingProgress}%
      </div>
    </div>
  )
}
