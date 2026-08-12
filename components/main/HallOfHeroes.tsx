"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { HERO_TEAMS, STANDBY_HEROES, HeroTeam } from "@/lib/data"
import { Shield, User, Sparkles, Award } from "lucide-react"

export function HallOfHeroes() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })
  const [selectedTrack, setSelectedTrack] = useState<string>("ALL")

  const tracks = ["ALL", "Artificial Intelligence", "Cybersecurity", "Healthcare Tech", "Social Impact", "Open Innovation"]

  const filteredTeams = selectedTrack === "ALL" 
    ? HERO_TEAMS 
    : HERO_TEAMS.filter((t) => t.track === selectedTrack)

  return (
    <section ref={ref} id="heroes" className="relative py-28 px-4 sm:px-6 z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-intel-blue/20 border border-intel-blue/40 text-intel-blue-light font-mono text-xs tracking-widest uppercase mb-4">
              <Shield className="w-3.5 h-3.5" />
              SQUAD ROSTER PROTOCOL
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase text-white mb-4">
              Hall of Heroes
            </h2>
            <p className="text-intel-blue-light font-mono text-xs sm:text-sm tracking-widest uppercase max-w-2xl mx-auto">
              25 VERIFIED INNOVATION SQUADS // READY FOR COMBAT
            </p>
          </motion.div>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {tracks.map((tr) => (
              <button
                key={tr}
                onClick={() => setSelectedTrack(tr)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase border transition-all cursor-pointer ${
                  selectedTrack === tr
                    ? "bg-intel-blue text-white border-intel-blue-light shadow-[0_0_15px_rgba(0,102,255,0.5)]"
                    : "bg-black/40 text-white/60 border-white/10 hover:border-white/30 hover:text-white"
                }`}
              >
                {tr}
              </button>
            ))}
          </div>
        </div>

        {/* Primary Squad Grid with Photos */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-24"
        >
          {filteredTeams.map((hero, i) => (
            <motion.div
              key={hero.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-panel p-5 border-white/10 hover:border-intel-blue/60 hover:shadow-[0_0_25px_rgba(0,102,255,0.25)] transition-all group flex flex-col justify-between relative overflow-hidden"
            >
              {/* Top Card Badge */}
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-mono tracking-widest text-intel-blue-light uppercase bg-intel-blue/20 px-2 py-0.5 rounded border border-intel-blue/30">
                  {hero.track.split(' ')[0]}
                </span>
                <span className="text-[10px] font-mono text-white/30 group-hover:text-intel-blue transition-colors">
                  #{String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Photo Avatar Container */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-tr from-intel-blue/40 via-power-red/30 to-black p-0.5 relative mb-4 group-hover:scale-105 transition-transform shadow-lg">
                <div className="w-full h-full rounded-full bg-black/80 overflow-hidden flex items-center justify-center relative">
                  {hero.photo ? (
                    <img 
                      src={hero.photo} 
                      alt={hero.name} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-white/70">
                      <User className="w-7 h-7 text-intel-blue-light mb-0.5 group-hover:scale-110 transition-transform" />
                      <span className="text-[9px] font-mono text-white/40 tracking-wider">
                        {hero.name.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Squad Details */}
              <div className="text-center">
                <h3 className="text-base font-bold tracking-wider text-white uppercase mb-1 group-hover:text-intel-blue-light transition-colors line-clamp-1">
                  {hero.name}
                </h3>
                <p className="text-[11px] font-mono text-white/50 tracking-widest uppercase">
                  {hero.leader || "Hero Leader"}
                </p>
              </div>

              {/* Card Bottom Glow Line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-intel-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Standby Squads Section */}
        <div className="text-center mb-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl sm:text-4xl font-black tracking-tighter uppercase text-white/70 mb-2">
              Standby Universe
            </h3>
            <p className="text-power-red font-mono text-xs tracking-widest uppercase">
              STANDBY PROTOCOL INITIATED // 5 SQUADS
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {STANDBY_HEROES.map((hero, i) => (
            <div 
              key={hero.name} 
              className="glass-panel p-4 border-power-red/30 hover:border-power-red bg-power-red/5 transition-all flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-black/60 border border-power-red/40 flex items-center justify-center shrink-0">
                {hero.photo ? (
                  <img src={hero.photo} alt={hero.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <Shield className="w-5 h-5 text-power-red-light" />
                )}
              </div>
              <div className="overflow-hidden">
                <span className="text-white/90 font-bold tracking-wider uppercase text-sm block truncate">
                  {hero.name}
                </span>
                <span className="text-[10px] font-mono text-power-red-light/80 block uppercase truncate">
                  {hero.track}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

