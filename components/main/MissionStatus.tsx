"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card } from "@/components/ui/card"

const METRICS = [
  { value: "30", label: "HOURS", meta: "T-MINUS", glow: "text-power-red" },
  { value: "5", label: "TRACKS", meta: "UNIVERSES", glow: "text-intel-blue" },
  { value: "25", label: "TEAMS", meta: "VERIFIED SQUADS", glow: "text-white" },
  { value: "₹15K", label: "PRIZE POOL", meta: "INFINITY REWARDS", glow: "text-intel-blue-light" },
  { value: "∞", label: "INNOVATION", meta: "POTENTIAL", glow: "text-power-red-light" },
]

export function MissionStatus() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <section ref={ref} id="mission-status" className="relative py-12 md:py-20 px-6 max-w-7xl mx-auto z-10">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {METRICS.map((metric, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            whileHover={{ y: -5 }}
            className="col-span-1"
          >
            <Card className="glass-panel p-6 flex flex-col items-center justify-center text-center border-white/5 bg-black/40 hover:bg-white/5 transition-colors group cursor-default relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="text-[10px] font-mono text-white/40 tracking-widest mb-2 uppercase w-full text-left">
                [{metric.meta}]
              </div>
              <div className={`text-4xl md:text-5xl font-black tracking-tighter ${metric.glow} ${metric.glow.replace("text-", "text-glow-")}`}>
                {metric.value}
              </div>
              <div className="text-xs font-bold tracking-[0.2em] text-white/80 mt-2 uppercase">
                {metric.label}
              </div>
              
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-intel-blue/30 to-transparent"></div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
