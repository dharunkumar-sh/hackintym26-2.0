"use client"

import { useState, useEffect } from "react"

interface LoadingOverlayProps {
  onLoaded: () => void
}

export function LoadingOverlay({ onLoaded }: LoadingOverlayProps) {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("INITIALIZING NEXUS...")

  useEffect(() => {
    let val = 0
    const texts = [
      "CALIBRATING MULTIVERSE...",
      "SYNCING HERO TRAJECTORIES...",
      "ESTABLISHING SECURE CONNECTION...",
      "LOADING HACKINTYM PROTOCOLS..."
    ]

    const textInterval = setInterval(() => {
      setLoadingText(texts[Math.floor(Math.random() * texts.length)])
    }, 800)

    const interval = setInterval(() => {
      val += Math.random() * 8
      if (val >= 100) {
        val = 100
        clearInterval(interval)
        clearInterval(textInterval)
        setLoadingText("SYSTEM READY.")
        setTimeout(() => onLoaded(), 800) // Delay to show 100%
      }
      setLoadingProgress(Math.min(100, Math.floor(val)))
    }, 100)
    
    return () => {
      clearInterval(interval)
      clearInterval(textInterval)
    }
  }, [onLoaded])

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50 overflow-hidden font-mono text-white selection:bg-intel-blue">
      {/* Background Grid & Glitch lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(rgba(0,102,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,102,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      {/* Central HUD Ring */}
      <div className="relative flex items-center justify-center w-64 h-64 sm:w-80 sm:h-80 mb-12">
        {/* Outer dashed ring */}
        <div className="absolute inset-0 rounded-full border border-dashed border-intel-blue-light/30 animate-[spin_10s_linear_infinite]"></div>
        <div className="absolute inset-4 rounded-full border-t-2 border-r-2 border-intel-blue animate-[spin_3s_linear_infinite]"></div>
        <div className="absolute inset-8 rounded-full border-b-2 border-l-2 border-power-red animate-[spin_4s_linear_infinite_reverse]"></div>
        <div className="absolute inset-12 rounded-full border border-dotted border-white/20 animate-[spin_15s_linear_infinite]"></div>
        
        {/* Center Progress Text */}
        <div className="relative flex flex-col items-center justify-center">
          <span className="text-5xl sm:text-7xl font-black tracking-tighter drop-shadow-[0_0_15px_rgba(0,102,255,0.8)]">
            {loadingProgress}
          </span>
          <span className="text-intel-blue-light text-xs tracking-widest mt-1">%</span>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="w-64 sm:w-96 max-w-[80vw] flex flex-col gap-3 z-10">
        <div className="flex justify-between items-end text-xs text-intel-blue-light tracking-[0.2em] uppercase">
          <span>{loadingText}</span>
          <span className="text-power-red">{loadingProgress === 100 ? "OK" : "BUSY"}</span>
        </div>
        
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden relative">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-intel-blue to-power-red transition-all duration-100 ease-out shadow-[0_0_10px_rgba(0,102,255,0.5)]"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
        
        <div className="flex justify-between text-[10px] text-white/40 tracking-widest uppercase">
          <span>Hackintym '26 2.0</span>
          <span>v2.0.0</span>
        </div>
      </div>
    </div>
  )
}
