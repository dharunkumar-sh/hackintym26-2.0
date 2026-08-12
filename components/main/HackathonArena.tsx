"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Terminal, Cpu, Flag } from "lucide-react"

const PHASES = [
  { 
    id: "INFILTRATE", 
    time: "DAY 1 // MORNING", 
    icon: Terminal, 
    desc: "Enter the arena. Finalize team strategies, set up your development environments, and commence initial prototyping.",
    glow: "text-intel-blue"
  },
  { 
    id: "EXECUTE", 
    time: "THE OVERNIGHT GRIND", 
    icon: Cpu, 
    desc: "30 hours of uninterrupted building. Navigate through intense reviews, pivot when necessary, and push your code to the limit.",
    glow: "text-power-red"
  },
  { 
    id: "CONQUER", 
    time: "DAY 2 // FINALE", 
    icon: Flag, 
    desc: "Survive the final filtration. Polish your product, perfect your pitch, and present your solution to the high council of judges.",
    glow: "text-white"
  }
]

export function HackathonArena() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <section ref={ref} className="relative py-24 px-6 z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            className="inline-block border border-power-red px-4 py-1 rounded-full mb-6"
          >
            <span className="text-power-red font-mono text-sm tracking-widest uppercase">
              WARNING // STRICTLY OFFLINE PROTOCOL
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white"
          >
            Hackathon Arena
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PHASES.map((phase, i) => {
            const Icon = phase.icon
            return (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.2 }}
              >
                <Card className="glass-panel h-full p-8 border-white/5 hover:bg-white/5 transition-all group relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-full h-1 opacity-50 group-hover:opacity-100 transition-opacity bg-current ${phase.glow}`}></div>
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-xs font-mono text-white/50 tracking-widest uppercase">
                      {phase.time}
                    </div>
                    <Icon className={`w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity ${phase.glow}`} />
                  </div>
                  
                  <h3 className={`text-3xl font-black tracking-widest uppercase mb-4 ${phase.glow} text-glow-${phase.glow.split('-')[1]}`}>
                    {phase.id}
                  </h3>
                  
                  <p className="text-white/70 font-light leading-relaxed">
                    {phase.desc}
                  </p>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
