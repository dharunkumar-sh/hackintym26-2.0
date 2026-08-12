"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger)
}

// Fixed IST timestamps (UTC+05:30)
const START_TIMESTAMP = Date.parse("2026-08-14T00:00:00+05:30")
const TARGET_TIMESTAMP = Date.parse("2026-09-02T23:59:59+05:30")

interface TimeRemaining {
  days: number
  hours: number
  minutes: number
  seconds: number
  isComplete: boolean
  progressPercent: number
}

function calculateTimeRemaining(): TimeRemaining {
  const now = Date.now()
  const diff = TARGET_TIMESTAMP - now
  
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true, progressPercent: 100 }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  // Progress from Aug 14 to Sept 2
  const totalDuration = TARGET_TIMESTAMP - START_TIMESTAMP
  const elapsed = Math.max(0, now - START_TIMESTAMP)
  const progressPercent = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100))

  return { days, hours, minutes, seconds, isComplete: false, progressPercent }
}

export function MissionCountdown() {
  const sectionRef = useRef<HTMLElement>(null)
  const hudContainerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" })

  // Client hydration guard
  const [mounted, setMounted] = useState(false)
  const [timeState, setTimeState] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete: false,
    progressPercent: 0
  })

  useEffect(() => {
    setMounted(true)
    setTimeState(calculateTimeRemaining())

    const interval = setInterval(() => {
      setTimeState(calculateTimeRemaining())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // GSAP ScrollTrigger Entrance Sequence
  useGSAP(() => {
    if (!sectionRef.current || !hudContainerRef.current) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const cards = gsap.utils.toArray<HTMLElement>(".countdown-card")
    const metadata = gsap.utils.toArray<HTMLElement>(".hud-meta-item")

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none"
      }
    })

    tl.fromTo(hudContainerRef.current, 
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(cards,
      { opacity: 0, y: 40, rotateX: 15 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.7, stagger: 0.15, ease: "back.out(1.4)" },
      "-=0.5"
    )
    .fromTo(metadata,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      "-=0.3"
    )
  }, { scope: sectionRef })

  const formatNumber = (num: number) => String(num).padStart(2, "0")

  // Accessible readout label
  const accessibleLabel = timeState.isComplete
    ? "Mission Active: The Nexus is open."
    : `Mission countdown: ${timeState.days} days, ${timeState.hours} hours, ${timeState.minutes} minutes, ${timeState.seconds} seconds remaining.`

  return (
    <section 
      ref={sectionRef} 
      id="countdown" 
      aria-label="Mission Countdown"
      className="relative py-28 px-4 sm:px-6 z-10 overflow-hidden flex flex-col items-center justify-center min-h-[90vh]"
    >
      
      <div className="max-w-6xl mx-auto w-full relative z-10 text-center">
        
        {/* Header Titles */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
         

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase text-white mb-3" style={{ textShadow: "0 0 25px rgba(0,200,255,0.3)" }}>
            Mission Countdown
          </h2>

       
        </motion.div>

        {/* Futuristic Energy Reactor / Timer Container */}
        <div 
          ref={hudContainerRef} 
          className="relative max-w-5xl mx-auto glass-panel rounded-3xl p-6 sm:p-12 border border-white/10 shadow-[0_0_50px_rgba(0,102,255,0.15)] bg-black/60 backdrop-blur-xl"
        >
          {/* Reactor Energy Arc / Orbital Progress Indicator */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-intel-blue via-power-red to-intel-blue rounded-full shadow-[0_0_15px_#0066FF]"></div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-power-red via-intel-blue to-power-red rounded-full shadow-[0_0_15px_#FF2A2A]"></div>

          {/* Corner Brackets */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-intel-blue"></div>
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-intel-blue"></div>
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-power-red"></div>
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-power-red"></div>

          {/* Accessible Live Readout */}
          <div className="sr-only" aria-live="polite">
            {accessibleLabel}
          </div>

          {/* Countdown Display Grid or Finished State */}
          {mounted && timeState.isComplete ? (
            <div className="py-12 text-center">
              <div className="text-5xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-intel-blue via-white to-power-red tracking-widest uppercase text-glow-blue animate-pulse">
                THE NEXUS IS OPEN
              </div>
              <div className="mt-4 text-intel-blue-light font-mono text-sm tracking-[0.3em] uppercase">
                MISSION ACTIVE // ALL SYSTEMS OPERATIONAL
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 my-4">
              {[
                { label: "DAYS", value: formatNumber(timeState.days), color: "text-intel-blue-light", glow: "shadow-[0_0_20px_rgba(0,200,255,0.2)]", border: "border-intel-blue/30" },
                { label: "HOURS", value: formatNumber(timeState.hours), color: "text-white", glow: "shadow-[0_0_20px_rgba(255,255,255,0.2)]", border: "border-white/20" },
                { label: "MINUTES", value: formatNumber(timeState.minutes), color: "text-intel-blue", glow: "shadow-[0_0_20px_rgba(0,102,255,0.2)]", border: "border-intel-blue/40" },
                { label: "SECONDS", value: formatNumber(timeState.seconds), color: "text-power-red text-glow-red", glow: "shadow-[0_0_25px_rgba(225,6,0,0.3)]", border: "border-power-red/40" }
              ].map((card, i) => (
                <motion.div
                  key={card.label}
                  whileHover={{ scale: 1.04, y: -4 }}
                  className={`countdown-card relative glass-panel p-6 sm:p-8 rounded-2xl border ${card.border} ${card.glow} bg-black/40 flex flex-col items-center justify-center overflow-hidden group transition-all duration-300`}
                >
                  {/* Subtle hover pulse backdrop */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-intel-blue/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Floating Number */}
                  <div className={`text-5xl sm:text-7xl font-black tracking-tighter ${card.color} font-mono mb-2`}>
                    {mounted ? card.value : "--"}
                  </div>

                  {/* Label */}
                  <div className="text-xs sm:text-sm font-bold tracking-[0.25em] text-white/80 uppercase">
                    {card.label}
                  </div>

                  {/* Corner mark */}
                  <div className="absolute top-2 left-2 text-[9px] font-mono text-white/20">
                    0{i + 1}
                  </div>
                </motion.div>
              ))}
            </div>
          )}


        </div>
      </div>
    </section>
  )
}
