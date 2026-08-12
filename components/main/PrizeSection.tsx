"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card } from "@/components/ui/card"

const PRIZES = [
  { 
    title: "FIRST RUNNER UP", 
    amount: "₹5,000", 
    color: "text-intel-blue-light",
    border: "border-intel-blue-light/50",
    glow: "shadow-[0_0_30px_rgba(0,200,255,0.2)]",
    delay: 0.2
  },
  { 
    title: "GRAND PRIZE", 
    amount: "₹7,500", 
    color: "text-power-red",
    border: "border-power-red/80",
    glow: "shadow-[0_0_50px_rgba(225,6,0,0.4)]",
    delay: 0,
    scale: "scale-110 z-10"
  },
  { 
    title: "SECOND RUNNER UP", 
    amount: "₹2,500", 
    color: "text-intel-blue",
    border: "border-intel-blue/50",
    glow: "shadow-[0_0_30px_rgba(0,102,255,0.2)]",
    delay: 0.4
  }
]

export function PrizeSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <section ref={ref} className="relative py-32 px-6 z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-white mb-4">
              Infinity Rewards
            </h2>
            <p className="text-xl text-white/60 tracking-widest uppercase font-light">
              Glory awaits the conquerors.
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-4 mt-12">
          {PRIZES.map((prize, i) => (
            <motion.div
              key={prize.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: prize.delay, ease: "easeOut" }}
              className={`w-full md:w-1/3 ${prize.scale || ''}`}
            >
              <Card className={`relative glass-panel overflow-hidden border ${prize.border} ${prize.glow} p-8 text-center bg-black/60`}>
                <div className={`absolute top-0 left-0 right-0 h-1 bg-current ${prize.color}`}></div>
                
                <div className="text-xs font-mono text-white/50 tracking-widest uppercase mb-6">
                  {prize.title}
                </div>
                
                <div className={`text-5xl md:text-6xl font-black tracking-tighter mb-4 ${prize.color}`}>
                  {prize.amount}
                </div>
                
                <div className="w-full h-px bg-white/10 my-6"></div>
                
                <ul className="text-sm text-white/60 font-light space-y-2">
                  <li>Exclusive Trophy</li>
                  <li>Certificate of Excellence</li>
                  <li>Incubation Opportunity</li>
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
