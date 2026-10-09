/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Radio, Zap, Flame, Shield, Cpu, ArrowRight, Compass } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger)
}

// Fixed IST timestamps (UTC+05:30)
const START_TIMESTAMP = Date.parse("2026-10-01T00:00:00+05:30")
const TARGET_TIMESTAMP = Date.parse("2026-10-10T09:00:00+05:30")

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
  const isLiveForce = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("live") === "true"
  const diff = TARGET_TIMESTAMP - now
  
  if (diff <= 0 || isLiveForce) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true, progressPercent: 100 }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  // Progress from October 1 to the event start
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

    if (cards.length > 0) {
      tl.fromTo(cards,
        { opacity: 0, y: 40, rotateX: 15 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.7, stagger: 0.15, ease: "back.out(1.4)" },
        "-=0.5"
      )
    }
  }, { scope: sectionRef })

  const formatNumber = (num: number) => String(num).padStart(2, "0")

  // Accessible readout label
  const accessibleLabel = timeState.isComplete
    ? "Mission Active: The Hackathon is live now. 30-hour innovation mission in progress."
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
          className="mb-10"
        >
          {timeState.isComplete ? (
            <>
              {/* Marvel S.H.I.E.L.D. Live Battle Protocol Badge */}
              <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.35)] text-emerald-400 font-mono text-xs sm:text-sm tracking-[0.25em] uppercase mb-4 backdrop-blur-md">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_10px_#10B981]"></span>
                </span>
                <span className="font-extrabold text-emerald-300">
                  S.H.I.E.L.D. PROTOCOL OMEGA // BATTLE ARENA IS ACTIVE
                </span>
              </div>

              <h2 
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase text-white mb-3" 
                style={{ textShadow: "0 0 35px rgba(225,6,0,0.5), 0 0 70px rgba(0,102,255,0.3)" }}
              >
                HACKATHON IS{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-power-red via-amber-400 to-cyan-300">
                  LIVE NOW!
                </span>
              </h2>

              <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm tracking-[0.2em] font-mono text-intel-blue-light uppercase">
                <span className="w-6 sm:w-12 h-px bg-gradient-to-r from-transparent to-emerald-400"></span>
                <span className="text-white/90">30-HOUR MISSION CLOCK ENGAGED // ALL SQUADS DEPLOYED</span>
                <span className="w-6 sm:w-12 h-px bg-gradient-to-l from-transparent to-emerald-400"></span>
              </div>
            </>
          ) : (
            <>
              {/* Marvel S.H.I.E.L.D. Protocol Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-power-red/15 border border-power-red/60 shadow-[0_0_25px_rgba(225,6,0,0.35)] text-power-red-light font-mono text-xs sm:text-sm tracking-[0.25em] uppercase mb-4 backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-power-red opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-power-red shadow-[0_0_8px_#E10600]"></span>
                </span>
                <span className="font-extrabold text-glow-red">MISSION PROTOCOL: EVENT BEGINS SOON</span>
              </div>

              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase text-white mb-3" style={{ textShadow: "0 0 25px rgba(0,200,255,0.3)" }}>
                Mission Countdown
              </h2>

              <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm tracking-[0.2em] font-mono text-intel-blue-light uppercase">
                <span className="w-6 sm:w-12 h-px bg-gradient-to-r from-transparent to-intel-blue-light"></span>
                <span className="text-white/90">TIME REMAINING UNTIL THE EVENT BEGINS</span>
                <span className="w-6 sm:w-12 h-px bg-gradient-to-l from-transparent to-intel-blue-light"></span>
              </div>
            </>
          )}
        </motion.div>

        {/* Futuristic Energy Reactor / Timer Container */}
        <div 
          ref={hudContainerRef} 
          className="relative max-w-5xl mx-auto glass-panel rounded-3xl p-6 sm:p-12 border border-white/10 shadow-[0_0_50px_rgba(0,102,255,0.15)] bg-black/60 backdrop-blur-xl"
        >
          {/* Stark HUD / Marvel Directive Top Bar */}
          <div className="flex items-center justify-center border-b border-white/10 pb-5 mb-8 text-center">
            {timeState.isComplete ? (
              <div className="flex items-center justify-center gap-3 sm:gap-4 text-emerald-400 font-black text-xl sm:text-2xl md:text-3xl tracking-wider sm:tracking-widest uppercase">
                <Radio className="w-6 h-6 animate-pulse text-emerald-400" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-white">
                  TRANSMISSION LIVE // HACKATHON IN PROGRESS
                </span>
                <Radio className="w-6 h-6 animate-pulse text-emerald-400" />
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3 sm:gap-4 text-power-red text-glow-red font-black text-xl sm:text-3xl md:text-4xl tracking-wider sm:tracking-widest uppercase animate-pulse">
                <span className="inline-block w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-xs bg-power-red rotate-45 shadow-[0_0_12px_#E10600]"></span>
                <span>EVENT BEGINS IN:</span>
                <span className="inline-block w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-xs bg-power-red rotate-45 shadow-[0_0_12px_#E10600]"></span>
              </div>
            )}
          </div>

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

          {/* Display: Live Marvel War Room or Countdown Grid */}
          {mounted && timeState.isComplete ? (
            <div className="py-6 sm:py-10 text-center">
              {/* Marvel Stark Arc Reactor Animation */}
              <div className="relative mx-auto w-24 h-24 sm:w-32 sm:h-32 mb-8 flex items-center justify-center">
                {/* Outer spinning arc ring */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/60 animate-[spin_10s_linear_infinite]" />
                {/* Inner counter-spinning arc ring */}
                <div className="absolute inset-2 sm:inset-3 rounded-full border-2 border-dashed border-power-red/60 animate-[spin_7s_linear_infinite_reverse]" />
                {/* Glowing Core Aura */}
                <div className="absolute inset-4 sm:inset-6 rounded-full bg-gradient-to-tr from-intel-blue via-cyan-400 to-power-red opacity-60 blur-md animate-pulse" />
                {/* Center Core */}
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-black/90 border-2 border-cyan-300 shadow-[0_0_30px_rgba(0,200,255,0.8)] flex items-center justify-center">
                  <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-300 animate-pulse" />
                </div>
              </div>

              {/* Headline */}
              <div className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">
                THE MULTIVERSE HAS{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-power-red via-amber-400 to-cyan-300 text-glow-red">
                  ASSEMBLED
                </span>
              </div>

              <p className="max-w-2xl mx-auto text-sm sm:text-base font-mono text-white/80 leading-relaxed mb-10">
                The countdown is complete. 25 qualified innovation squads have deployed into the arena for 30 hours of continuous hacking, prototyping, and multiverse engineering.
              </p>

              {/* Marvel Live Telemetry Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 text-left">
                {/* Telemetry 1 */}
                <div className="p-5 rounded-2xl bg-black/60 border border-emerald-500/40 shadow-[0_0_25px_rgba(16,185,129,0.2)] flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                    <Radio className="w-6 h-6 text-emerald-400 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400/90 font-bold block">
                      MISSION STATUS
                    </span>
                    <span className="text-lg font-black text-white uppercase tracking-wide block">
                      ARENA LIVE
                    </span>
                    <span className="text-xs text-white/60 font-mono block">
                      30-Hour Sprint
                    </span>
                  </div>
                </div>

                {/* Telemetry 2 */}
                <div className="p-5 rounded-2xl bg-black/60 border border-intel-blue/40 shadow-[0_0_25px_rgba(0,102,255,0.2)] flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-intel-blue/20 border border-intel-blue/40 flex items-center justify-center shrink-0">
                    <Cpu className="w-6 h-6 text-intel-blue-light" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-intel-blue-light/90 font-bold block">
                      CURRENT STAGE
                    </span>
                    <span className="text-lg font-black text-white uppercase tracking-wide block">
                      INFILTRATE
                    </span>
                    <span className="text-xs text-white/60 font-mono block">
                      Setup & Prototyping
                    </span>
                  </div>
                </div>

                {/* Telemetry 3 */}
                <div className="p-5 rounded-2xl bg-black/60 border border-power-red/40 shadow-[0_0_25px_rgba(225,6,0,0.2)] flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-power-red/20 border border-power-red/40 flex items-center justify-center shrink-0">
                    <Flame className="w-6 h-6 text-power-red-light animate-bounce" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-power-red-light/90 font-bold block">
                      ACTIVE SQUADS
                    </span>
                    <span className="text-lg font-black text-white uppercase tracking-wide block">
                      25 TEAMS
                    </span>
                    <span className="text-xs text-white/60 font-mono block">
                      Competing for ₹50K+
                    </span>
                  </div>
                </div>

                {/* Telemetry 4 */}
                <div className="p-5 rounded-2xl bg-black/60 border border-purple-500/40 shadow-[0_0_25px_rgba(168,85,247,0.2)] flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400/90 font-bold block">
                      SYSTEM CORES
                    </span>
                    <span className="text-lg font-black text-white uppercase tracking-wide block">
                      100% ONLINE
                    </span>
                    <span className="text-xs text-white/60 font-mono block">
                      All Tracks Unlocked
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#timeline"
                  onClick={(e) => {
                    e.preventDefault()
                    const timelineElem = document.getElementById("timeline")
                    if (timelineElem) {
                      const yOffset = -70
                      const y = timelineElem.getBoundingClientRect().top + window.pageYOffset + yOffset
                      window.scrollTo({ top: y, behavior: "smooth" })
                    }
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-intel-blue hover:bg-intel-blue-light text-white font-bold font-mono text-xs sm:text-sm tracking-wider uppercase border border-intel-blue-light/50 shadow-[0_0_25px_rgba(0,102,255,0.5)] transition-all flex items-center justify-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95"
                >
                  <span>View Mission Timeline</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#tracks"
                  onClick={(e) => {
                    e.preventDefault()
                    const tracksElem = document.getElementById("tracks")
                    if (tracksElem) {
                      const yOffset = -70
                      const y = tracksElem.getBoundingClientRect().top + window.pageYOffset + yOffset
                      window.scrollTo({ top: y, behavior: "smooth" })
                    }
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-black/60 hover:bg-white/10 text-white font-mono text-xs sm:text-sm font-bold tracking-wider uppercase border border-white/20 transition-colors flex items-center justify-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95"
                >
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span>Explore Universe Tracks</span>
                </a>
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

