"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"

export function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <section ref={ref} className="relative py-40 px-6 z-10 flex items-center justify-center min-h-[70vh]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-power-red/20 via-background to-background pointer-events-none"></div>
      
      <div className="text-center max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="text-power-red font-mono text-sm tracking-widest uppercase mb-8 animate-pulse">
            WARNING // TEMPORAL ANOMALY DETECTED // TIME IS RUNNING OUT
          </div>
          
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-white mb-8 text-glow-red">
            Secure Your Spot In The Multiverse
          </h2>
          
          <div className="mt-12 inline-block relative group cursor-pointer">
            <div className="absolute -inset-2 bg-power-red/30 rounded-lg blur-lg group-hover:bg-power-red/50 transition-colors animate-pulse"></div>
            <Button size="lg" className="relative text-xl h-16 px-12 bg-power-red hover:bg-white text-white hover:text-black font-black tracking-widest uppercase rounded-sm border border-power-red-light transition-all duration-300">
              Initiate Registration
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
