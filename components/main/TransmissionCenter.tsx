"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"

export function TransmissionCenter() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    setTimeout(() => {
      setStatus("sent")
      setTimeout(() => setStatus("idle"), 3000)
    }, 1500)
  }

  return (
    <section ref={ref} className="relative py-24 px-6 z-10">
      <div className="max-w-4xl mx-auto glass-panel p-8 md:p-12 border-t-2 border-intel-blue">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-intel-blue font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-intel-blue animate-pulse"></span>
                COMMUNICATIONS RELAY
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-white mb-6">
                Transmission Center
              </h2>
              <p className="text-white/60 font-light leading-relaxed mb-8">
                Require clearance? Encountered a temporal anomaly? Send a direct transmission to the command center.
              </p>
              
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-xs font-mono text-white/40 tracking-widest uppercase">ENCRYPTED CHANNEL</span>
                  <span className="text-white/80 font-mono">contact@hackintym26.com</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-mono text-white/40 tracking-widest uppercase">HQ COORDINATES</span>
                  <span className="text-white/80 font-mono">Meenakshi Sundararajan Engineering College</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-mono text-intel-blue-light tracking-widest uppercase">CALLSIGN (NAME)</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-black/50 border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-intel-blue transition-colors font-mono text-sm"
                  placeholder="Enter designation..."
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-mono text-intel-blue-light tracking-widest uppercase">FREQUENCY (EMAIL)</label>
                <input 
                  required
                  type="email" 
                  className="w-full bg-black/50 border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-intel-blue transition-colors font-mono text-sm"
                  placeholder="Enter comms link..."
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-mono text-intel-blue-light tracking-widest uppercase">TRANSMISSION (MESSAGE)</label>
                <textarea 
                  required
                  rows={4}
                  className="w-full bg-black/50 border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-intel-blue transition-colors font-mono text-sm resize-none"
                  placeholder="Type message here..."
                ></textarea>
              </div>
              
              <Button 
                type="submit" 
                disabled={status !== "idle"}
                className={`w-full tracking-widest uppercase font-bold transition-all ${status === 'sent' ? 'bg-green-500 text-white' : 'bg-intel-blue hover:bg-white text-black hover:text-black'}`}
              >
                {status === "idle" && "Transmit Message"}
                {status === "sending" && "Encrypting..."}
                {status === "sent" && "Transmission Received"}
              </Button>
            </form>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}
