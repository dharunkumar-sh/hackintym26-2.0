"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { CHAMPIONS } from "@/lib/data"
import { Trophy } from "lucide-react"

export function ChampionsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <section ref={ref} className="relative py-32 px-6 z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-white mb-4">
              The Champions
            </h2>
            <p className="text-intel-blue-light font-mono text-sm tracking-widest uppercase">
              RECORDS OF LEGENDARY CONQUERORS
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CHAMPIONS.map((champ, i) => (
            <motion.div
              key={champ.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="glass-panel p-8 text-center relative border-white/10 overflow-hidden group hover:border-intel-blue transition-colors"
            >
              {/* Animated BG */}
              <div className="absolute inset-0 bg-gradient-to-b from-intel-blue/0 to-intel-blue/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <Trophy className="w-12 h-12 mx-auto text-intel-blue-light mb-6 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" />
              
              <div className="text-power-red font-mono text-xs tracking-widest uppercase mb-2">
                {champ.prize} // {champ.amount}
              </div>
              <h3 className="text-3xl font-black tracking-widest uppercase text-white mb-4">
                {champ.name}
              </h3>
              <div className="inline-block px-3 py-1 border border-white/20 rounded-full text-xs font-mono text-white/50 tracking-widest uppercase">
                TRACK: {champ.track}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
