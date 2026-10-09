/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Fingerprint, Sparkles, X, CheckCircle2, Zap } from "lucide-react"

interface ChiefGuestRevealModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

const SECTOR_DOMAINS = [
  { name: "Healthcare", color: "text-intel-blue", border: "border-intel-blue" },
  { name: "Cybersec", color: "text-power-red", border: "border-power-red" },
  { name: "Agentic AI", color: "text-intel-blue-light", border: "border-intel-blue-light" },
  { name: "Sustainable Dev", color: "text-green-400", border: "border-green-400" },
  { name: "Climate Energy", color: "text-yellow-400", border: "border-yellow-400" },
  { name: "Surprise Domain", color: "text-purple-400", border: "border-purple-400" }
]

export function ChiefGuestRevealModal({ isOpen, onClose, onSuccess }: ChiefGuestRevealModalProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [revealPhase, setRevealPhase] = useState<"idle" | "authenticating" | "decrypting" | "unleashed">("idle")
  
  const scanTimerRef = useRef<NodeJS.Timeout | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Reset states when opened or closed
  useEffect(() => {
    if (!isOpen) {
      setIsScanning(false)
      setScanProgress(0)
      setRevealPhase("idle")
      if (scanTimerRef.current) clearTimeout(scanTimerRef.current)
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
    }
  }, [isOpen])

  // Cinematic Marvel Reveal Sequence
  const triggerRevealSequence = useCallback(() => {
    setRevealPhase("authenticating")

    // Phase 1 -> Phase 2 (Decrypting after 1s)
    setTimeout(() => {
      setRevealPhase("decrypting")
    }, 1100)

    // Phase 2 -> Phase 3 (Unleashed after 2.8s)
    setTimeout(() => {
      setRevealPhase("unleashed")
    }, 2800)

    // Final trigger success callback
    setTimeout(() => {
      onSuccess()
      onClose()
    }, 4200)
  }, [onSuccess, onClose])

  // Handle biometric press-and-hold
  const startBiometricScan = useCallback(() => {
    if (revealPhase !== "idle") return
    setIsScanning(true)
    setScanProgress(0)

    const startTime = performance.now()
    const DURATION = 2000

    progressIntervalRef.current = setInterval(() => {
      const elapsed = performance.now() - startTime
      const percent = Math.min(100, Math.round((elapsed / DURATION) * 100))
      setScanProgress(percent)
    }, 40)

    scanTimerRef.current = setTimeout(() => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
      setScanProgress(100)
      setIsScanning(false)
      triggerRevealSequence()
    }, DURATION)
  }, [revealPhase, triggerRevealSequence])

  const cancelBiometricScan = () => {
    if (scanProgress >= 100) return
    setIsScanning(false)
    setScanProgress(0)
    if (scanTimerRef.current) clearTimeout(scanTimerRef.current)
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (revealPhase === "idle") onClose()
            }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-xl sm:max-w-2xl rounded-3xl glass-panel bg-neutral-950/95 border border-power-red/40 p-6 sm:p-10 shadow-[0_0_80px_rgba(225,6,0,0.35)] overflow-hidden text-center z-10 my-auto"
          >
            {/* Top Glowing Beam */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-power-red via-amber-400 to-intel-blue" />
            
            {/* Ambient Red Glows */}
            <div className="absolute -top-32 left-1/4 w-80 h-80 bg-power-red/15 blur-[90px] pointer-events-none rounded-full" />
            <div className="absolute -bottom-32 right-1/4 w-80 h-80 bg-intel-blue/15 blur-[90px] pointer-events-none rounded-full" />

            {/* Close Button */}
            {revealPhase === "idle" && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Security Modal"
                className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* PHASE 1: IDLE / AUTHENTICATION INTERFACE */}
            {revealPhase === "idle" && (
              <div>
                {/* Protocol Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-power-red/20 border border-power-red/50 text-power-red-light font-mono text-xs font-bold tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(225,6,0,0.3)]">
                  <Shield className="w-4 h-4 text-power-red animate-pulse" />
                  <span>S.H.I.E.L.D. ALPHA LEVEL 10 CLEARANCE</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mb-6">
                  REVEAL{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-power-red via-amber-400 to-intel-blue-light">
                    PROTOCOL
                  </span>
                </h3>

                {/* Biometric Touch Scanner Box */}
                <div className="p-6 sm:p-8 rounded-2xl bg-black/60 border border-intel-blue/40 shadow-inner flex flex-col items-center justify-center">
                  <div className="text-xs font-mono tracking-widest text-intel-blue-light uppercase mb-6 font-bold flex items-center gap-2">
                    <Fingerprint className="w-4 h-4" />
                    <span>BIOMETRIC ARC REACTOR TOUCH</span>
                  </div>

                  {/* Fingerprint Button */}
                  <div
                    onMouseDown={startBiometricScan}
                    onMouseUp={cancelBiometricScan}
                    onMouseLeave={cancelBiometricScan}
                    onTouchStart={startBiometricScan}
                    onTouchEnd={cancelBiometricScan}
                    className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center cursor-pointer select-none group transition-transform active:scale-95"
                  >
                    {/* Outer Rotating Energy Ring */}
                    <div className={`absolute inset-0 rounded-full border-2 border-dashed ${isScanning ? "border-cyan-400 animate-[spin_4s_linear_infinite]" : "border-intel-blue/40"}`} />
                    
                    {/* Scanning Progress Fill Ring */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="46%"
                        className="stroke-cyan-400"
                        strokeWidth="4"
                        fill="transparent"
                        strokeDasharray="289"
                        strokeDashoffset={289 - (289 * scanProgress) / 100}
                        strokeLinecap="round"
                      />
                    </svg>

                    {/* Glowing Core */}
                    <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center transition-all ${
                      isScanning 
                        ? "bg-cyan-500/20 border-2 border-cyan-300 shadow-[0_0_35px_rgba(0,200,255,0.8)]" 
                        : "bg-black/80 border border-white/20 group-hover:border-cyan-400 group-hover:shadow-[0_0_25px_rgba(0,102,255,0.4)]"
                    }`}>
                      <Fingerprint className={`w-10 h-10 sm:w-12 sm:h-12 transition-colors ${isScanning ? "text-cyan-300 animate-pulse" : "text-white/60 group-hover:text-intel-blue-light"}`} />
                    </div>
                  </div>

                  <div className="mt-6 font-mono text-xs tracking-wider text-white/80">
                    {isScanning ? (
                      <span className="text-cyan-300 font-bold animate-pulse">
                        SCANNING BIOMETRICS: {scanProgress}%... HOLD STILL
                      </span>
                    ) : (
                      <span>PRESS &amp; HOLD TOUCH SCANNER (2 SECONDS)</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* PHASE 2: AUTHENTICATING STATE */}
            {revealPhase === "authenticating" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.7)] mb-6 animate-bounce">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-mono text-xs font-bold tracking-widest uppercase mb-4">
                  <span>IDENTITY CONFIRMED</span>
                </div>
                <h3 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-3">
                  ACCESS GRANTED
                </h3>
                <p className="text-sm font-mono text-emerald-300 tracking-widest uppercase">
                  S.H.I.E.L.D. CLEARANCE ACCEPTED
                </p>
              </motion.div>
            )}

            {/* PHASE 3: DECRYPTING MULTIVERSE DOMAINS */}
            {revealPhase === "decrypting" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-8 flex flex-col items-center justify-center"
              >
                {/* Hyper-spinning Arc Reactor */}
                <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-dashed border-cyan-400 animate-[spin_1.5s_linear_infinite]" />
                  <div className="absolute inset-3 rounded-full border-4 border-dashed border-power-red animate-[spin_1s_linear_infinite_reverse]" />
                  <div className="absolute inset-6 rounded-full bg-cyan-400/30 blur-md animate-pulse" />
                  <Zap className="w-10 h-10 text-cyan-300 animate-pulse relative z-10" />
                </div>

                <div className="text-2xl sm:text-3xl font-black uppercase text-white mb-2 tracking-wider">
                  DECLASSIFYING MULTIVERSE SECTORS...
                </div>
                <div className="text-xs font-mono text-intel-blue-light tracking-[0.25em] uppercase mb-8 animate-pulse">
                  DISENGAGING LEVEL 10 SECURITY ENCRYPTION
                </div>

                {/* Sector Badges Illuminating */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-md">
                  {SECTOR_DOMAINS.map((sector, idx) => (
                    <motion.div
                      key={sector.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.18 }}
                      className={`p-2.5 rounded-xl bg-black/70 border ${sector.border} shadow-[0_0_15px_rgba(0,102,255,0.3)] flex items-center gap-2`}
                    >
                      <Sparkles className={`w-3.5 h-3.5 ${sector.color}`} />
                      <span className={`text-xs font-mono font-bold uppercase ${sector.color}`}>
                        {sector.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* PHASE 4: UNLEASHED / REVEALED */}
            {revealPhase === "unleashed" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center"
              >
                <div className="text-5xl sm:text-7xl font-black uppercase text-transparent bg-clip-text bg-linear-to-r from-power-red via-amber-300 to-cyan-300 tracking-tight text-glow-red animate-pulse mb-4">
                  PROBLEM STATEMENTS UNLEASHED!
                </div>
                <div className="text-sm font-mono text-white/90 tracking-widest uppercase mb-4">
                  ALL 6 DOMAINS ARE NOW ACCESSIBLE TO ALL INNOVATORS
                </div>
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-mono text-xs font-bold tracking-widest uppercase">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>TRANSMISSION PUBLISHED TO ARENA</span>
                </div>
              </motion.div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
