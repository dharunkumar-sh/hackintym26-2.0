"use client"

import { useEffect, useState, memo, useRef } from "react"
import { motion } from "framer-motion"

// Comic panel illustrations rendered as crisp SVG circular vectors (Pure visual art, circular, centered, single full cycle, clean opacity crossfade)
const COMIC_PANELS = [
  {
    id: "ironman",
    accent: "#FF2A2A",
    svg: (
      <svg viewBox="0 0 240 240" className="w-full h-full object-cover">
        <defs>
          <radialGradient id="arcGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="1" />
            <stop offset="60%" stopColor="#0066ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ff0033" stopOpacity="0" />
          </radialGradient>
          <pattern id="halftone1" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="1.5" fill="rgba(255,255,255,0.18)" />
          </pattern>
        </defs>
        <circle cx="120" cy="120" r="120" fill="#120408" />
        <circle cx="120" cy="120" r="120" fill="url(#halftone1)" />
        {/* Speed lines converging to center */}
        <line x1="0" y1="0" x2="120" y2="120" stroke="#ff2a2a" strokeWidth="1.5" opacity="0.6" />
        <line x1="240" y1="0" x2="120" y2="120" stroke="#ff2a2a" strokeWidth="1.5" opacity="0.6" />
        <line x1="0" y1="240" x2="120" y2="120" stroke="#00C8FF" strokeWidth="1.5" opacity="0.6" />
        <line x1="240" y1="240" x2="120" y2="120" stroke="#00C8FF" strokeWidth="1.5" opacity="0.6" />
        {/* Arc Reactor Blueprint */}
        <circle cx="120" cy="120" r="85" fill="none" stroke="#00C8FF" strokeWidth="3" strokeDasharray="6 4" />
        <circle cx="120" cy="120" r="62" fill="none" stroke="#FF2A2A" strokeWidth="4" />
        <circle cx="120" cy="120" r="42" fill="url(#arcGlow)" />
        <polygon points="120,78 155,142 85,142" fill="none" stroke="#ffffff" strokeWidth="3.5" />
      </svg>
    )
  },
  {
    id: "cap",
    accent: "#0066FF",
    svg: (
      <svg viewBox="0 0 240 240" className="w-full h-full object-cover">
        <defs>
          <pattern id="halftone2" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.2" fill="rgba(0,102,255,0.3)" />
          </pattern>
        </defs>
        <circle cx="120" cy="120" r="120" fill="#040b1a" />
        <circle cx="120" cy="120" r="120" fill="url(#halftone2)" />
        {/* Shield concentric rings */}
        <circle cx="120" cy="120" r="105" fill="#E10600" />
        <circle cx="120" cy="120" r="84" fill="#f8fafc" />
        <circle cx="120" cy="120" r="63" fill="#E10600" />
        <circle cx="120" cy="120" r="42" fill="#0044cc" />
        {/* Silver Star */}
        <polygon points="120,86 131,111 158,111 136,127 145,154 120,137 95,154 104,127 82,111 109,111" fill="#ffffff" />
      </svg>
    )
  },
  {
    id: "thor",
    accent: "#00C8FF",
    svg: (
      <svg viewBox="0 0 240 240" className="w-full h-full object-cover">
        <defs>
          <linearGradient id="uruMetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <linearGradient id="bladeEdge" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <linearGradient id="grootWood" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="50%" stopColor="#451a03" />
            <stop offset="100%" stopColor="#291102" />
          </linearGradient>
          <filter id="lightningGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Deep Asgardian cosmic space backdrop */}
        <circle cx="120" cy="120" r="120" fill="#030712" />

        {/* Asgardian Bifrost Runic Halo */}
        <circle cx="120" cy="120" r="95" fill="none" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.5" />
        <circle cx="120" cy="120" r="82" fill="none" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />

        {/* Ambient Lightning Field */}
        <path d="M 25 35 L 75 80 L 60 95 L 115 110" fill="none" stroke="#00ffff" strokeWidth="2.5" opacity="0.75" filter="url(#lightningGlow)" />
        <path d="M 215 35 L 165 75 L 180 90 L 135 110" fill="none" stroke="#38bdf8" strokeWidth="2" opacity="0.75" filter="url(#lightningGlow)" />
        <path d="M 120 15 L 120 65 L 105 80 L 120 100" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.9" filter="url(#lightningGlow)" />
        <path d="M 50 190 L 90 155 L 80 145 L 110 135" fill="none" stroke="#00ffff" strokeWidth="2" opacity="0.7" filter="url(#lightningGlow)" />
        <path d="M 195 190 L 155 160 L 165 145 L 130 135" fill="none" stroke="#38bdf8" strokeWidth="2" opacity="0.7" filter="url(#lightningGlow)" />

        {/* === STORMBREAKER WEAPON GROUP === */}
        <g transform="translate(120, 115)">
          {/* 1. GROOT VINE HANDLE (HAFT) */}
          <path
            d="M -4 -25 Q -6 35 2 95 Q -2 95 -8 35 Z"
            fill="url(#grootWood)"
            stroke="#1c0a00"
            strokeWidth="1.5"
          />
          <path
            d="M -7 -15 Q 4 10 -4 40 Q 6 65 -1 90"
            fill="none"
            stroke="#92400e"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M -2 -20 Q -9 15 3 45 Q -5 70 1 85"
            fill="none"
            stroke="#b45309"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* 2. HAMMER HEAD (BLUNT MAUL SIDE - RIGHT) */}
          <polygon
            points="12,-38 52,-32 48,-4 10,-8"
            fill="url(#uruMetal)"
            stroke="#0f172a"
            strokeWidth="2.5"
          />
          <polygon
            points="52,-32 60,-28 56,-8 48,-4"
            fill="#64748b"
            stroke="#0f172a"
            strokeWidth="2"
          />
          <line x1="20" y1="-28" x2="42" y2="-24" stroke="#00ffff" strokeWidth="2" opacity="0.9" filter="url(#lightningGlow)" />
          <line x1="18" y1="-18" x2="40" y2="-14" stroke="#38bdf8" strokeWidth="2" opacity="0.9" />

          {/* 3. AXE BLADE (CURVED CLEAVER SIDE - LEFT) */}
          <path
            d="M -12,-36 L -40,-48 Q -72,-20 -62,18 L -36,8 L -10,-8 Z"
            fill="url(#uruMetal)"
            stroke="#0f172a"
            strokeWidth="2.5"
          />
          <path
            d="M -40,-48 Q -72,-20 -62,18 Q -68,-15 -42,-44 Z"
            fill="url(#bladeEdge)"
            stroke="#ffffff"
            strokeWidth="1.5"
            filter="url(#lightningGlow)"
          />
          <path
            d="M -22,-30 Q -42,-14 -35,5"
            fill="none"
            stroke="#00ffff"
            strokeWidth="2"
            opacity="0.85"
          />

          {/* 4. CENTRAL URU SOCKET & CROWN COLLAR */}
          <polygon
            points="-14,-42 14,-42 16,-4 -16,-4"
            fill="#475569"
            stroke="#0f172a"
            strokeWidth="2.5"
          />
          <path
            d="M -16,-34 Q 0,-24 16,-34 Q 0,-18 -16,-26 Q 0,-10 16,-18"
            fill="none"
            stroke="#92400e"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M -14,-36 Q 0,-26 14,-36"
            fill="none"
            stroke="#d97706"
            strokeWidth="1.5"
          />

          {/* 5. ACTIVE LIGHTNING ARCS CRACKLING OFF STORMBREAKER */}
          <path
            d="M -62,0 L -48,-15 L -54,-25 L -20,-28 L 0,-44 L 25,-36 L 56,-20 L 70,-24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            filter="url(#lightningGlow)"
          />
          <path
            d="M -50,-40 L -30,-25 L -10,-35 L 15,-20 L 35,-30 L 52,-15"
            fill="none"
            stroke="#00ffff"
            strokeWidth="2.5"
            opacity="0.9"
          />
        </g>
      </svg>
    )
  },
  {
    id: "strange",
    accent: "#f59e0b",
    svg: (
      <svg viewBox="0 0 240 240" className="w-full h-full object-cover">
        <circle cx="120" cy="120" r="120" fill="#140c02" />
        {/* Eldritch Magic Mandalas / Time Stone */}
        <circle cx="120" cy="120" r="100" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="5 5" />
        <circle cx="120" cy="120" r="76" fill="none" stroke="#22c55e" strokeWidth="3.5" />
        <circle cx="120" cy="120" r="54" fill="none" stroke="#f59e0b" strokeWidth="2" />
        <polygon points="120,45 185,157 55,157" fill="none" stroke="#22c55e" strokeWidth="2.5" />
        <polygon points="120,195 185,83 55,83" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
        <circle cx="120" cy="120" r="20" fill="#22c55e" opacity="0.95" />
      </svg>
    )
  },
  {
    id: "spiderman",
    accent: "#E10600",
    svg: (
      <svg viewBox="0 0 240 240" className="w-full h-full object-cover">
        <circle cx="120" cy="120" r="120" fill="#180407" />
        {/* Comic Spider Web Geometric lines */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
          const rad = (deg * Math.PI) / 180
          return (
            <line
              key={deg}
              x1="120"
              y1="120"
              x2={120 + Math.cos(rad) * 120}
              y2={120 + Math.sin(rad) * 120}
              stroke="#E10600"
              strokeWidth="2"
              opacity="0.75"
            />
          )
        })}
        <circle cx="120" cy="120" r="35" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.8" />
        <circle cx="120" cy="120" r="70" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.8" />
        <circle cx="120" cy="120" r="105" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.8" />
        {/* Iconic Eyes */}
        <polygon points="85,102 105,132 65,138" fill="#ffffff" stroke="#000000" strokeWidth="4" />
        <polygon points="155,102 135,132 175,138" fill="#ffffff" stroke="#000000" strokeWidth="4" />
      </svg>
    )
  }
]

interface MarvelComicFlipbookProps {
  onComplete?: () => void
}

export const MarvelComicFlipbook = memo(function MarvelComicFlipbook({
  onComplete,
}: MarvelComicFlipbookProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const hasFinishedRef = useRef(false)

  useEffect(() => {
    // 5 hero panels: 1.25s each = 6.25s single run
    const durationPerPanel = 1250
    let current = 0

    const interval = setInterval(() => {
      current += 1
      if (current >= COMIC_PANELS.length) {
        clearInterval(interval)
        if (!hasFinishedRef.current) {
          hasFinishedRef.current = true
          onComplete?.()
        }
        return
      }
      setActiveIndex(current)
    }, durationPerPanel)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-black/95">
      {/* Pure hardware-accelerated opacity crossfade (Zero scaling during loop for perfectly stable, lag-free transitions) */}
      {COMIC_PANELS.map((panel, idx) => {
        const isActive = idx === activeIndex
        return (
          <motion.div
            key={panel.id}
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
            }}
            transition={{
              duration: 0.45,
              ease: "easeInOut",
            }}
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none will-change-[opacity]"
            style={{
              zIndex: isActive ? 2 : 1,
            }}
          >
            {panel.svg}
          </motion.div>
        )
      })}

      {/* Halftone Comic Grid Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none rounded-full bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:5px_5px] mix-blend-overlay z-10"></div>

      {/* Circular Radial Shadow Border Blend */}
      <div className="absolute inset-0 pointer-events-none rounded-full bg-[radial-gradient(circle_at_center,transparent_55%,rgba(0,0,0,0.9)_100%)] z-10"></div>
    </div>
  )
})
