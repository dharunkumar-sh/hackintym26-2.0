"use client"

import { useEffect, useState, memo, useRef } from "react"
import { motion } from "framer-motion"
import { CLUB_LOGOS } from "@/lib/data"

interface MarvelComicFlipbookProps {
  onComplete?: () => void
}

export const MarvelComicFlipbook = memo(function MarvelComicFlipbook({
  onComplete,
}: MarvelComicFlipbookProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const hasFinishedRef = useRef(false)

  useEffect(() => {
    // 6 club logos: 1.1s each
    const durationPerPanel = 1100
    let current = 0

    const interval = setInterval(() => {
      current += 1
      if (current >= CLUB_LOGOS.length) {
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
    <div className="relative w-full h-full rounded-full p-[2.5px] bg-gradient-to-tr from-intel-blue via-intel-blue-light to-power-red shadow-[0_0_40px_rgba(0,200,255,0.6)] flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full rounded-full bg-black/95 border border-white/10 overflow-hidden flex items-center justify-center">
        {/* Pure hardware-accelerated opacity crossfade with circular cut and proper enlargement */}
        {CLUB_LOGOS.map((logo, idx) => {
          const isActive = idx === activeIndex
          return (
            <motion.div
              key={logo.id}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 0.94,
              }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
              className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none will-change-[transform,opacity] p-2 sm:p-3"
              style={{
                zIndex: isActive ? 2 : 1,
              }}
            >
              {/* Circular Mask to strictly cut square logo borders into a circle */}
              <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-black/80">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="w-full h-full object-cover rounded-full filter drop-shadow-[0_0_20px_rgba(0,200,255,0.5)]"
                />
              </div>
            </motion.div>
          )
        })}

        {/* Subtle Ambient Radial Glow */}
        <div className="absolute inset-0 pointer-events-none rounded-full bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.75)_100%)] z-10"></div>
      </div>
    </div>
  )
})
