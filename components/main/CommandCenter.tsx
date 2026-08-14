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
          {/* MSIIC Logo Display - Enriched Size & High Responsiveness */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center justify-center text-center p-2 sm:p-4 w-full"
          >
            <div className="w-full max-w-lg lg:max-w-xl flex items-center justify-center p-2 sm:p-4 relative">
              <img 
                src="/msiic.png" 
                alt="MSIIC Logo" 
                className="w-full h-auto max-h-[380px] sm:max-h-[460px] md:max-h-[520px] object-contain filter drop-shadow-[0_0_35px_rgba(0,102,255,0.7)] transition-transform duration-500 hover:scale-[1.02]" 
              />
            </div>
            <div className="text-xs sm:text-sm font-mono text-intel-blue-light font-bold tracking-[0.25em] uppercase mt-2 sm:mt-4">
              MSIIC INNOVATION & INCUBATION CENTER
            </div>
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
                  onClick={() => setActiveCapability(isActive ? null : cap.id)}
                  className="cursor-pointer"
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
