"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Shield, Lightbulb, Network, Database, Users, Rocket } from "lucide-react"

const CAPABILITIES = [
  { id: "INNOVATION", icon: Lightbulb, color: "text-intel-blue-light", desc: "A playground for disruptive ideas and bleeding-edge technological experimentation." },
  { id: "RESEARCH", icon: Database, color: "text-intel-blue", desc: "Access to advanced research infrastructure and deep-tech problem spaces." },
  { id: "INCUBATION", icon: Rocket, color: "text-power-red", desc: "Transforming prototypes into market-ready ventures with strategic backing." },
  { id: "MENTORSHIP", icon: Users, color: "text-white", desc: "Guidance from industry veterans, technical experts, and successful founders." },
  { id: "RESOURCES", icon: Shield, color: "text-intel-blue-light", desc: "Comprehensive tooling, cloud credits, and hardware access for rapid building." },
  { id: "INDUSTRY NETWORK", icon: Network, color: "text-power-red-light", desc: "Direct pipelines to corporate partners, investors, and the tech ecosystem." }
]

export function CommandCenter() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-20%" })
  const [activeCapability, setActiveCapability] = useState<string | null>(null)

  return (
    <section ref={ref} className="relative py-24 px-6 z-10 min-h-screen flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 text-intel-blue font-mono text-sm tracking-widest uppercase mb-4"
          >
            <span className="w-8 h-px bg-intel-blue"></span>
            MSIIC // INNOVATION HQ
            <span className="w-8 h-px bg-intel-blue"></span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white"
          >
            The Command Center
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Holographic interface representation (DOM fallback/overlay for 3D) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative aspect-square max-w-md mx-auto w-full glass-panel rounded-full flex items-center justify-center border-intel-blue/30 overflow-hidden"
          >
            <div className="absolute inset-0 rounded-full border border-power-red/20 animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute inset-4 rounded-full border border-dashed border-intel-blue/40 animate-[spin_15s_linear_infinite_reverse]"></div>
            
            <div className="text-center z-10">
              <div className="text-3xl font-black tracking-widest text-white text-glow-blue">MSIIC</div>
              <div className="text-xs font-mono text-intel-blue-light mt-2 tracking-widest">CORE ONLINE</div>
            </div>

            {/* Scanning line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-intel-blue-light/50 blur-[2px] animate-[ping_3s_linear_infinite]"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CAPABILITIES.map((cap, i) => {
              const Icon = cap.icon
              const isActive = activeCapability === cap.id
              
              return (
                <motion.div
                  key={cap.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  onHoverStart={() => setActiveCapability(cap.id)}
                  onHoverEnd={() => setActiveCapability(null)}
                >
                  <Card className={`relative overflow-hidden p-6 transition-all duration-300 border-white/10 ${isActive ? 'bg-intel-blue/10 border-intel-blue/50 scale-105 z-10' : 'bg-black/40 hover:bg-white/5'}`}>
                    <div className="flex items-center gap-4 mb-3">
                      <Icon className={`w-6 h-6 ${cap.color}`} />
                      <h3 className="font-bold tracking-widest text-white uppercase text-sm">{cap.id}</h3>
                    </div>
                    
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-sm text-white/70 font-light leading-relaxed"
                        >
                          {cap.desc}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Active glow indicator */}
                    {isActive && (
                      <motion.div 
                        layoutId="active-glow" 
                        className="absolute -bottom-px left-0 right-0 h-1 bg-gradient-to-r from-transparent via-intel-blue to-transparent" 
                      />
                    )}
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
