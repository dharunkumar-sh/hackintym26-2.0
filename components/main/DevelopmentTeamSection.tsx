"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { DEVELOPMENT_CLUBS } from "@/lib/data"
import { Shield, User, ExternalLink, Code2, Cpu, Zap } from "lucide-react"

export function DevelopmentTeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  const clubIcons = [Code2, Zap, Cpu]

  return (
    <section ref={ref} id="devteam" className="relative py-28 px-4 sm:px-6 z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-intel-blue/20 border border-intel-blue/40 text-intel-blue-light font-mono text-xs tracking-widest uppercase mb-4">
              <Shield className="w-3.5 h-3.5" />
              COMMAND & ARCHITECTURE ALLIANCE
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase text-white mb-4">
              Development Team
            </h2>
            <p className="text-intel-blue-light font-mono text-xs sm:text-sm tracking-widest uppercase max-w-2xl mx-auto">
              3 LEADERSHIP CLUBS // PRESIDENT • VICE PRESIDENT • SECRETARY • TREASURER
            </p>
          </motion.div>
        </div>

        {/* 3 Clubs Display */}
        <div className="space-y-16">
          {DEVELOPMENT_CLUBS.map((club, idx) => {
            const ClubIcon = clubIcons[idx % clubIcons.length]
            return (
              <motion.div
                key={club.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="glass-panel p-6 sm:p-10 border-white/10 rounded-2xl relative overflow-hidden"
              >
                {/* Club Header Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-white">
                      <ClubIcon className="w-6 h-6 text-intel-blue-light" />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-4xl font-black tracking-wider uppercase text-white">
                        {club.name}
                      </h3>
                      <p className="text-xs font-mono text-white/50 tracking-widest uppercase mt-0.5">
                        {club.tagline}
                      </p>
                    </div>
                  </div>

                  <span className={`self-start sm:self-center text-xs font-mono tracking-widest uppercase px-3 py-1 rounded-full border ${club.badgeColor}`}>
                    CLUB ALLIANCE 0{idx + 1}
                  </span>
                </div>

                {/* 4 Executive Members Grid (President, VP, Secretary, Treasurer) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {club.members.map((member, i) => (
                    <motion.div
                      key={member.name}
                      whileHover={{ y: -6, scale: 1.02 }}
                      className={`glass-panel p-6 border-white/10 bg-black/40 transition-all rounded-xl flex flex-col justify-between items-center text-center group relative overflow-hidden ${club.borderGlow}`}
                    >
                      {/* Executive Role Pill */}
                      <span className="text-[10px] font-mono tracking-widest text-intel-blue-light uppercase bg-intel-blue/20 px-3 py-1 rounded-full border border-intel-blue/30 mb-5">
                        {member.role}
                      </span>

                      {/* Photo Avatar */}
                      <div className="w-24 h-24 rounded-[32px] bg-gradient-to-tr from-intel-blue/40 via-power-red/30 to-black p-[2px] relative mb-4 group-hover:scale-105 transition-transform shadow-xl">
                        <div className="w-full h-full rounded-[30px] bg-black/90 overflow-hidden flex items-center justify-center relative">
                          {member.photo ? (
                            <img 
                              src={member.photo} 
                              alt={member.name} 
                              className="w-full h-full object-cover" 
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center text-white/70">
                              <User className="w-9 h-9 text-intel-blue-light mb-1 group-hover:scale-110 transition-transform" />
                              <span className="text-[9px] font-mono text-white/40 tracking-wider">
                                {member.name.substring(0, 2).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Member Info */}
                      <div className="mb-4">
                        <h4 className="text-lg font-bold tracking-wider text-white uppercase group-hover:text-intel-blue-light transition-colors line-clamp-1 mb-1">
                          {member.name}
                        </h4>
                        <p className="text-xs font-mono text-white/40 tracking-widest uppercase">
                          {club.name.split(' ')[0]} Executive
                        </p>
                      </div>

                      {/* LinkedIn Action Button */}
                      <a
                        href={member.linkedin || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 px-3 rounded bg-intel-blue/20 hover:bg-intel-blue text-intel-blue-light hover:text-white border border-intel-blue/40 text-xs font-mono font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                        </svg>
                        <span>LINKEDIN</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </a>

                      {/* Bottom Card Glow Line */}
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-intel-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
