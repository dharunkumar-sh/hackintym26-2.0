"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react"

export function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <section
      ref={ref}
      id="contact"
      className="relative py-24 px-4 sm:px-6 z-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Clean Marvel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Get In Touch Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 relative flex flex-col justify-center items-start text-left overflow-hidden bg-black/60 shadow-[0_0_40px_rgba(0,102,255,0.15)]"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter uppercase text-white mb-6 leading-none">
              Get In{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-intel-blue via-intel-blue-light to-power-red">
                Touch
              </span>
            </h2>

            <p className="text-base sm:text-lg font-mono text-white/70 leading-relaxed">
              Have questions we didn&apos;t cover in the FAQ? Reach out directly
              to our mission control team.
            </p>
          </motion.div>

          {/* Right Column: Clean Action Strips */}
          <div className="lg:col-span-7 flex flex-col justify-center gap-4">
            {/* Row 1: Email Us Strip */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ x: 4 }}
              className="glass-panel p-6 rounded-2xl border-white/10 hover:border-intel-blue/60 bg-black/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group relative overflow-hidden"
            >
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-xl bg-intel-blue/15 border border-intel-blue/30 text-intel-blue-light shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-wider text-white uppercase group-hover:text-intel-blue-light transition-colors">
                    Email Us
                  </h3>
                  <p className="text-xs font-mono text-white/50 tracking-wide mt-0.5">
                    For general queries.
                  </p>
                </div>
              </div>

              <a
                href="mailto:msec.devdynastyclub@gmail.com"
                className="w-full sm:w-auto py-2 px-4 rounded-lg bg-intel-blue/20 hover:bg-intel-blue text-intel-blue-light hover:text-white border border-intel-blue/40 text-xs font-mono font-bold tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer break-all shrink-0"
              >
                <span>msec.devdynastyclub@gmail.com</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </motion.div>

            {/* Row 2: Call Us Strip */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ x: 4 }}
              className="glass-panel p-6 rounded-2xl border-white/10 hover:border-power-red/60 bg-black/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group relative overflow-hidden"
            >
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-xl bg-power-red/15 border border-power-red/30 text-power-red-light shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-wider text-white uppercase group-hover:text-power-red-light transition-colors">
                    Call Us
                  </h3>
                  <p className="text-xs font-mono text-white/50 tracking-wide mt-0.5">
                    Mon-Fri from 9am to 6pm.
                  </p>
                </div>
              </div>

              <a
                href="tel:+916381846882"
                className="w-full sm:w-auto py-2 px-4 rounded-lg bg-power-red/20 hover:bg-power-red text-power-red-light hover:text-white border border-power-red/40 text-xs font-mono font-bold tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
              >
                <span>+91 6383113382</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </motion.div>

            {/* Row 3: Venue Strip */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ x: 4 }}
              className="glass-panel p-6 rounded-2xl border-white/10 hover:border-intel-blue/60 bg-black/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group relative overflow-hidden"
            >
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-xl bg-intel-blue/15 border border-intel-blue/30 text-intel-blue-light shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-wider text-white uppercase group-hover:text-intel-blue-light transition-colors">
                    Venue
                  </h3>
                  <p className="text-xs font-mono text-white/50 tracking-wide mt-0.5">
                    Common Computer Centre 1, 3rd Floor, Main Campus.
                  </p>
                </div>
              </div>

              <a
                href="https://maps.app.goo.gl/4PHXxYVE9qRgB4wU8"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-2 px-4 rounded-lg bg-intel-blue/20 hover:bg-intel-blue text-intel-blue-light hover:text-white border border-intel-blue/40 text-xs font-mono font-bold tracking-widest  flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
              >
                <span>View on Map</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}


