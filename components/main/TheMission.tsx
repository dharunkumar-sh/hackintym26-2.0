"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export function TheMission() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-20%" })

  const pillars = ["INNOVATION", "MENTORSHIP", "COLLABORATION", "IMPACT"]

  return (
    <section ref={ref} id="mission" className="relative py-24 px-6 z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 text-intel-blue-light font-mono text-sm tracking-widest uppercase mb-4">
            <span className="w-8 h-px bg-intel-blue-light"></span>
            OPERATION // HACKINTYM '26
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-white">
            The Mission
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-7 glass-panel p-8 md:p-12 relative"
          >
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-intel-blue"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-intel-blue"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-intel-blue"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-intel-blue"></div>

            <p className="text-xl md:text-2xl leading-relaxed text-white/90 font-light mb-6">
              For 30 hours, innovators assemble to transform real-world challenges into technology-driven solutions.
            </p>
            <p className="text-lg leading-relaxed text-white/60 mb-8">
              Teams will ideate, build, test, refine and present solutions designed to make a measurable impact across five distinct universes: Artificial Intelligence, Cybersecurity, Healthcare Technology, Social Impact and Open Innovation.
            </p>
            
            <div className="flex items-center gap-3 font-mono text-xs text-white/40">
              <span className="animate-pulse w-2 h-2 rounded-full bg-power-red"></span>
              LIVE RECORDING // DO NOT DISTRIBUTE
            </div>
          </motion.div>

          <div className="md:col-span-5 flex flex-col justify-center gap-4">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-4 group cursor-default"
              >
                <div className="text-xs font-mono text-white/30 group-hover:text-intel-blue transition-colors w-8">
                  0{i + 1}
                </div>
                <div className="h-px bg-white/10 group-hover:bg-intel-blue/50 flex-grow transition-colors relative">
                  <div className="absolute top-0 right-0 h-full w-0 bg-intel-blue group-hover:w-full transition-all duration-500 ease-out origin-right"></div>
                </div>
                <h3 className="text-2xl font-bold tracking-widest text-white/70 group-hover:text-white transition-colors uppercase">
                  {pillar}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
