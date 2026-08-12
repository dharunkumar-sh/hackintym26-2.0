"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const TRACKS = [
  { 
    id: "AI", 
    name: "Artificial Intelligence", 
    color: "text-intel-blue-light",
    bg: "bg-intel-blue-light",
    border: "border-intel-blue-light",
    desc: "Build the future with neural networks, machine learning, and generative models.",
    examples: ["Predictive Analytics", "NLP Agents", "Computer Vision"]
  },
  { 
    id: "CYBER", 
    name: "Cybersecurity", 
    color: "text-power-red",
    bg: "bg-power-red",
    border: "border-power-red",
    desc: "Defend the digital realm. Create secure systems, threat detection, and privacy tools.",
    examples: ["Zero-trust Architecture", "Fraud Detection", "Encryption"]
  },
  { 
    id: "HEALTH", 
    name: "Healthcare Tech", 
    color: "text-intel-blue",
    bg: "bg-intel-blue",
    border: "border-intel-blue",
    desc: "Revolutionize medical access, patient care, and biotech through software.",
    examples: ["Telemedicine", "Diagnostic AI", "Wearable Integration"]
  },
  { 
    id: "SOCIAL", 
    name: "Social Impact", 
    color: "text-green-400",
    bg: "bg-green-400",
    border: "border-green-400",
    desc: "Develop solutions that address climate change, accessibility, and community challenges.",
    examples: ["Sustainability", "EdTech", "Resource Distribution"]
  },
  { 
    id: "OPEN", 
    name: "Open Innovation", 
    color: "text-white",
    bg: "bg-white",
    border: "border-white",
    desc: "Unrestricted experimentation. Combine domains and build something entirely new.",
    examples: ["Web3 / Blockchain", "IoT Systems", "AR/VR Experiences"]
  }
]

interface MultiverseTracksProps {
  trackHoverRef?: React.MutableRefObject<string | null>
}

export function MultiverseTracks({ trackHoverRef }: MultiverseTracksProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })
  const [activeTrack, setActiveTrack] = useState(TRACKS[0])

  const handleHover = (track: typeof TRACKS[0]) => {
    setActiveTrack(track)
    if (trackHoverRef) trackHoverRef.current = track.id
  }

  const handleLeave = () => {
    if (trackHoverRef) trackHoverRef.current = null
  }

  return (
    <section ref={ref} id="tracks" className="relative py-32 px-6 z-10 min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-white mb-4">
            Choose Your Universe
          </h2>
          <p className="text-xl text-white/60 tracking-widest uppercase font-light">
            Five paths. Five worlds. One mission: build what matters.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[500px]">
          
          {/* Interactive Universe Nodes */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-3">
            {TRACKS.map((track, i) => {
              const isActive = activeTrack.id === track.id
              return (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  onClick={() => {
                    setActiveTrack(track)
                    if (trackHoverRef) trackHoverRef.current = track.id
                  }}
                  className={`cursor-pointer p-4 rounded-lg border transition-all duration-300 ${isActive ? `bg-white/10 ${track.border}` : 'border-transparent hover:bg-white/5'}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className={`text-xl sm:text-2xl font-black tracking-widest uppercase ${isActive ? track.color : 'text-white/50'}`}>
                      {track.name}
                    </h3>
                    {isActive && (
                      <motion.div layoutId="track-indicator" className={`w-3 h-3 rounded-full ${track.bg} animate-pulse`} />
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Active Track Information Panel */}
          <div className="lg:col-span-7 relative min-h-[350px] sm:min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTrack.id}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                transition={{ duration: 0.4 }}
                className={`glass-panel rounded-2xl p-6 sm:p-10 border-l-4 ${activeTrack.border} flex flex-col justify-between overflow-hidden h-full`}
              >
                {/* Background Glow */}
                <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full ${activeTrack.bg} opacity-10 blur-[100px]`}></div>

                <div>
                  <div className={`text-sm font-mono tracking-widest uppercase mb-2 ${activeTrack.color}`}>
                    UNIVERSE // {activeTrack.id}
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black text-white uppercase mb-6">
                    {activeTrack.name}
                  </h3>
                  <p className="text-xl text-white/80 font-light leading-relaxed mb-8">
                    {activeTrack.desc}
                  </p>

                  <div className="space-y-3">
                    <div className="text-xs font-mono text-white/40 tracking-widest uppercase mb-2">
                      TARGET PROBLEM AREAS
                    </div>
                    {activeTrack.examples.map((ex, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className={`w-1 h-1 rounded-full ${activeTrack.bg}`}></div>
                        <span className="text-white/70 tracking-wider uppercase text-sm">{ex}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-white/10">
                  <Button className={`${activeTrack.bg} text-black hover:bg-white hover:text-black font-bold tracking-widest uppercase transition-colors`}>
                    Explore Track
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}
