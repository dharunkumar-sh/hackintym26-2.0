"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export function EventPosterSection() {
  return (
    <section id="poster" className="relative py-12 md:py-20 px-4 sm:px-6 z-10 overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        
        {/* Section Header Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-intel-blue/20 border border-intel-blue/40 text-intel-blue-light font-mono text-xs tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            OFFICIAL MISSION POSTER
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase text-white">
            EVOLUTION <span className="text-transparent bg-clip-text bg-gradient-to-r from-intel-blue via-intel-blue-light to-power-red">ARENA</span>
          </h2>
        </div>

        {/* Static Poster Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl p-3 sm:p-5 bg-black/60 border border-white/15 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,102,255,0.25)] overflow-hidden"
        >
          {/* Ambient Glow Effects */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-intel-blue/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-power-red/20 rounded-full blur-[100px] pointer-events-none"></div>

          {/* Top Tech Corner Accents */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-intel-blue-light/70 pointer-events-none"></div>
          <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-power-red/70 pointer-events-none"></div>
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-power-red/70 pointer-events-none"></div>
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-intel-blue-light/70 pointer-events-none"></div>

          {/* Static Image Container */}
          <div className="relative rounded-2xl overflow-hidden bg-black/80 flex items-center justify-center">
            <img
              src="/poster.jpg"
              alt="Hackintym '26 2.0 Official Poster"
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl"
              loading="lazy"
            />
          </div>

          {/* Bottom Bar Info */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 px-2 font-mono text-xs tracking-widest uppercase text-white/60">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-intel-blue animate-pulse"></span>
              <span>OFFICIAL EVENT FLYER // MEENAKSHI SUNDARARAJAN ENGINEERING COLLEGE</span>
            </div>
            <div className="text-intel-blue-light font-bold">
              SEPTEMBER 12 - 13, 2026
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

