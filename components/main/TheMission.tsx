"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"

const PILLARS = [
  { 
    id: "01",
    title: "INNOVATION",
    subtitle: "BREAKTHROUGH SOLUTIONS",
    desc: "Pushing technical limits with cutting-edge frameworks, machine learning, and novel architecture."
  },
  { 
    id: "02",
    title: "MENTORSHIP",
    subtitle: "EXPERT GUIDANCE",
    desc: "Direct access to industry engineers, architects, and founders for real-time technical feedback."
  },
  { 
    id: "03",
    title: "COLLABORATION",
    subtitle: "CROSS-DISCIPLINARY TEAMS",
    desc: "Assembling developers, designers, and domain experts to turn raw ideas into market-ready prototypes."
  },
  { 
    id: "04",
    title: "IMPACT",
    subtitle: "MEASURABLE OUTCOMES",
    desc: "Building meaningful software that solves high-priority real-world challenges across 5 multiverse tracks."
  }
]

export function TheMission() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })
  const [activePillar, setActivePillar] = useState<typeof PILLARS[0] | null>(null)

  return (
    <section ref={ref} id="mission" className="relative py-20 md:py-28 px-4 sm:px-6 z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.8 }}
          className="mb-10 sm:mb-14"
        >
         
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase text-white">
            The Mission
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Main Mission Briefing Panel */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 glass-panel p-6 sm:p-10 md:p-12 relative flex flex-col justify-between"
          >
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-intel-blue"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-intel-blue"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-intel-blue"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-intel-blue"></div>

            <div>
              <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-white/90 font-light mb-4 sm:mb-6">
                For 30 hours, innovators assemble to transform real-world challenges into technology-driven solutions.
              </p>
              
              <AnimatePresence mode="wait">
                {activePillar ? (
                  <motion.div 
                    key={activePillar.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 sm:p-6 rounded-lg bg-intel-blue/10 border border-intel-blue/40 my-4"
                  >
                    <div className="text-xs font-mono tracking-widest text-intel-blue-light uppercase mb-1">
                      PILLAR {activePillar.id} // {activePillar.subtitle}
                    </div>
                    <p className="text-base sm:text-lg text-white font-medium">
                      {activePillar.desc}
                    </p>
                  </motion.div>
                ) : (
                  <motion.p 
                    key="default-desc"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm sm:text-base md:text-lg leading-relaxed text-white/60 mb-6"
                  >
                    Teams will ideate, build, test, refine and present solutions designed to make a measurable impact across five distinct universes: Artificial Intelligence, Cybersecurity, Healthcare Technology, Social Impact and Open Innovation.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            
            <div className="flex items-center gap-3 font-mono text-[10px] sm:text-xs text-white/40 pt-4 border-t border-white/5">
             
            </div>
          </motion.div>

          {/* Interactive Pillars Sidebar */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-3 sm:gap-4">
            {PILLARS.map((pillar, i) => {
              const isSelected = activePillar?.id === pillar.id
              return (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  onMouseEnter={() => setActivePillar(pillar)}
                  onMouseLeave={() => setActivePillar(null)}
                  onClick={() => setActivePillar(isSelected ? null : pillar)}
                  className={`flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                    isSelected 
                      ? 'bg-intel-blue/15 border-intel-blue/60 shadow-[0_0_20px_rgba(0,102,255,0.25)]' 
                      : 'bg-black/30 border-white/5 hover:bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className={`text-xs sm:text-sm font-mono transition-colors w-6 ${isSelected ? 'text-intel-blue-light font-bold' : 'text-white/30'}`}>
                    {pillar.id}
                  </div>
                  <div className="h-px bg-white/10 flex-grow relative overflow-hidden">
                    <div className={`absolute inset-0 bg-intel-blue transition-transform duration-300 ${isSelected ? 'translate-x-0' : '-translate-x-full'}`}></div>
                  </div>
                  <h3 className={`text-lg sm:text-xl font-bold tracking-widest uppercase transition-colors ${isSelected ? 'text-white' : 'text-white/70'}`}>
                    {pillar.title}
                  </h3>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

