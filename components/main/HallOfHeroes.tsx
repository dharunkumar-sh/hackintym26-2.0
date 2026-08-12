"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { VERIFIED_TEAMS, STANDBY_TEAMS } from "@/lib/data"

export function HallOfHeroes() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <section ref={ref} id="heroes" className="relative py-32 px-6 z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Hall of Heroes */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-white mb-4">
              Hall of Heroes
            </h2>
            <p className="text-intel-blue font-mono text-sm tracking-widest uppercase">
              25 VERIFIED SQUADS // PRIMARY TARGETS
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-32"
        >
          {VERIFIED_TEAMS.map((team, i) => (
            <div key={i} className="glass-panel p-4 border-white/5 hover:border-intel-blue/50 hover:bg-intel-blue/5 transition-all text-center">
              <span className="text-white/80 font-bold tracking-wider uppercase text-sm">{team}</span>
            </div>
          ))}
        </motion.div>

        {/* Backup Universe */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-white/50 mb-4">
              The Backup Universe
            </h2>
            <p className="text-power-red font-mono text-sm tracking-widest uppercase">
              STANDBY PROTOCOL INITIATED // 5 SQUADS
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {STANDBY_TEAMS.map((team, i) => (
            <div key={i} className="glass-panel px-6 py-3 border-power-red/20 opacity-70">
              <span className="text-white/60 font-bold tracking-wider uppercase text-sm">{team}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
