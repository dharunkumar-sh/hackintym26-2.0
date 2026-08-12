"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { DEVELOPMENT_CLUBS } from "@/lib/data"

export function HeroAlliance() {
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
              Hero Alliance
            </h2>
            <p className="text-intel-blue font-mono text-sm tracking-widest uppercase">
              THE ARCHITECTS BEHIND THE MULTIVERSE
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DEVELOPMENT_CLUBS.map((group, i) => (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="glass-panel p-8 border-t-2 border-t-intel-blue"
            >
              <h3 className="text-xl font-bold tracking-widest uppercase text-white mb-6 border-b border-white/10 pb-4">
                {group.name}
              </h3>
              <ul className="space-y-4">
                {group.members.map((member, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-intel-blue-light rotate-45"></div>
                    <span className="text-white/80 tracking-wider uppercase text-sm">{member.name} - {member.role}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

