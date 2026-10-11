"use client"

import { forwardRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Compass, Trophy } from "lucide-react"

export const IntroCTA = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div 
      ref={ref} 
      className="absolute bottom-24 left-0 right-0 flex justify-center items-center gap-6 z-20 opacity-0 pointer-events-none"
    >
      <motion.div 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }}
        className="pointer-events-auto"
      >
        <Button 
          size="lg" 
          className="bg-linear-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black font-extrabold tracking-widest border border-amber-400/80 shadow-[0_0_25px_rgba(255,215,0,0.5)] h-14 px-8 uppercase transition-colors"
          onClick={() => {
            const podiumElem = document.getElementById("podium") || document.getElementById("winners")
            podiumElem?.scrollIntoView({ behavior: "smooth" })
          }}
        >
          View Winners
          <Trophy className="ml-2 h-5 w-5 text-black" />
        </Button>
      </motion.div>

      <motion.div 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }}
        className="pointer-events-auto"
      >
        <Button 
          variant="outline"
          size="lg" 
          className="bg-transparent border border-power-red/50 hover:bg-power-red/10 text-white hover:text-power-red-light font-bold tracking-widest glass-panel h-14 px-8 uppercase transition-colors"
        >
          Explore the Heroes
          <Compass className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  )
})

IntroCTA.displayName = "IntroCTA"
