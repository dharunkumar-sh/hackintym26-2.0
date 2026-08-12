"use client"

import { forwardRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Compass } from "lucide-react"

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
          className="bg-intel-blue hover:bg-intel-blue-light text-white font-bold tracking-widest border border-intel-blue-light/50 shadow-[0_0_20px_rgba(0,102,255,0.4)] h-14 px-8 uppercase transition-colors"
          onClick={() => {
            // Handled later to enter the main site
            console.log("Entering Universe...")
          }}
        >
          Enter the Universe
          <ArrowRight className="ml-2 h-5 w-5" />
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
