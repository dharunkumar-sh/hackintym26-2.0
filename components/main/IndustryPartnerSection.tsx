"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export function IndustryPartnerSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <section
      ref={ref}
      id="partner"
      className="relative py-20 sm:py-28 px-4 sm:px-6 z-10 overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-[radial-gradient(circle,rgba(0,102,255,0.18)_0%,rgba(0,200,255,0.05)_50%,transparent_70%)] blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative flex flex-col items-center text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mb-8 sm:mb-12"
        >
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase text-white">
            Industry{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-intel-blue via-intel-blue-light to-power-red">
              Partner
            </span>
          </h2>
        </motion.div>

        {/* Logo and Company Name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-sm sm:max-w-md"
        >
          <div className="relative rounded-3xl p-6 sm:p-8 bg-black/60 border border-white/15 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,102,255,0.25)] hover:border-intel-blue/60 hover:shadow-[0_0_60px_rgba(0,200,255,0.4)] transition-all overflow-hidden flex flex-col items-center">
            {/* Tech Corner Accents */}
            <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t-2 border-l-2 border-intel-blue-light/70 pointer-events-none" />
            <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t-2 border-r-2 border-power-red/70 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b-2 border-l-2 border-power-red/70 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b-2 border-r-2 border-intel-blue-light/70 pointer-events-none" />

            {/* Logo */}
            <div className="w-full rounded-2xl p-6 sm:p-8 bg-white flex items-center justify-center shadow-lg">
              <img
                src="/logos/4iapps.png"
                alt="4i apps solutions"
                className="w-full max-w-[260px] sm:max-w-[300px] h-auto object-contain"
              />
            </div>

            {/* Company Name */}
            <h3 className="mt-6 text-xl sm:text-2xl font-black tracking-wider uppercase text-white">
              4i apps solutions
            </h3>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
