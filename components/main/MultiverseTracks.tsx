"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Heart, Shield, Brain, Leaf, Zap, Gift, Lock, FileText, Sparkles, CheckCircle2 } from "lucide-react"

export interface DomainItem {
  id: string
  name: string
  subtitle: string
  icon: string
  color: string
  bg: string
  border: string
  gradient: string
  glow: string
  desc: string
  isSurprise?: boolean
  problemStatements: string[]
}

const DEFAULT_DOMAINS: DomainItem[] = [
  {
    id: "HEALTHCARE",
    name: "Healthcare",
    subtitle: "Medical & Biotech Innovation",
    icon: "Heart",
    color: "text-intel-blue",
    bg: "bg-intel-blue",
    border: "border-intel-blue",
    gradient: "from-intel-blue/20 via-intel-blue/5 to-transparent",
    glow: "rgba(0,102,255,0.4)",
    desc: "Revolutionize medical access, diagnostic tools, patient care, and biotech solutions through intelligent software and hardware integration.",
    problemStatements: []
  },
  {
    id: "CYBERSEC",
    name: "Cybersec",
    subtitle: "Digital Defense & Security",
    icon: "Shield",
    color: "text-power-red",
    bg: "bg-power-red",
    border: "border-power-red",
    gradient: "from-power-red/20 via-power-red/5 to-transparent",
    glow: "rgba(225,6,0,0.4)",
    desc: "Defend the digital realm. Create zero-trust architectures, threat detection systems, encryption protocols, and privacy-preserving tools.",
    problemStatements: []
  },
  {
    id: "AGENTIC_AI",
    name: "Agentic AI",
    subtitle: "Autonomous & Generative Intelligence",
    icon: "Brain",
    color: "text-intel-blue-light",
    bg: "bg-intel-blue-light",
    border: "border-intel-blue-light",
    gradient: "from-intel-blue-light/20 via-intel-blue-light/5 to-transparent",
    glow: "rgba(0,200,255,0.4)",
    desc: "Build the future with multi-agent systems, autonomous decision networks, neural reasoning models, and generative workflows.",
    problemStatements: []
  },
  {
    id: "SUSTAINABLE_DEV",
    name: "Sustainable Development",
    subtitle: "Global Impact & Eco Solutions",
    icon: "Leaf",
    color: "text-green-400",
    bg: "bg-green-400",
    border: "border-green-400",
    gradient: "from-green-400/20 via-green-400/5 to-transparent",
    glow: "rgba(74,222,128,0.4)",
    desc: "Develop impactful software addressing UN Sustainable Development Goals, education access, resource distribution, and community challenges.",
    problemStatements: []
  },
  {
    id: "CLIMATE_ENERGY",
    name: "Climate & Clean Energy",
    subtitle: "Green Tech & Renewable Energy",
    icon: "Zap",
    color: "text-yellow-400",
    bg: "bg-yellow-400",
    border: "border-yellow-400",
    gradient: "from-yellow-400/20 via-yellow-400/5 to-transparent",
    glow: "rgba(250,204,21,0.4)",
    desc: "Engineered solutions for carbon tracking, solar/wind optimization, smart energy grids, zero-emission logistics, and eco-tech efficiency.",
    problemStatements: []
  },
  {
    id: "SURPRISE_DOMAIN",
    name: "Surprise Domain!",
    subtitle: "Mystery Challenge (+1 Domain)",
    icon: "Gift",
    color: "text-purple-400",
    bg: "bg-purple-400",
    border: "border-purple-400",
    gradient: "from-purple-400/20 via-purple-400/5 to-transparent",
    glow: "rgba(192,132,252,0.4)",
    desc: "A classified mystery domain to be revealed live during the event! Prepare your team for unexpected wild-card innovation challenges.",
    isSurprise: true,
    problemStatements: []
  }
]

const ICON_MAP: Record<string, React.ElementType> = {
  Heart,
  Shield,
  Brain,
  Leaf,
  Zap,
  Gift
}

interface MultiverseTracksProps {
  trackHoverRef?: React.MutableRefObject<string | null>
}

export function MultiverseTracks({ trackHoverRef }: MultiverseTracksProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })
  const [domains, setDomains] = useState<DomainItem[]>(DEFAULT_DOMAINS)
  const [activeDomain, setActiveDomain] = useState<DomainItem>(DEFAULT_DOMAINS[0])

  // Fetch dynamic data.json in production so problem statements can be edited anytime!
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.domains && Array.isArray(data.domains)) {
          setDomains(data.domains)
          setActiveDomain(data.domains[0])
        }
      })
      .catch(() => {
        // Fallback to DEFAULT_DOMAINS if data.json is missing or static
      })
  }, [])

  return (
    <section ref={ref} id="tracks" className="relative py-32 px-4 sm:px-6 z-10 min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-intel-blue/20 border border-intel-blue/40 text-intel-blue-light font-mono text-xs tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            OFFICIAL HACKATHON DOMAINS
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase text-white mb-4">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-intel-blue via-intel-blue-light to-power-red">Universe</span>
          </h2>
          <p className="text-sm sm:text-lg font-mono text-white/60 tracking-widest uppercase max-w-2xl mx-auto">
            SIX DOMAINS • ENDLESS POSSIBILITIES • BUILD SOLUTIONS THAT MATTER
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch min-h-[520px]">
          
          {/* Domain Selection Grid (lg:col-span-5) */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3.5">
            {domains.map((domain, i) => {
              const isActive = activeDomain.id === domain.id
              const IconComp = ICON_MAP[domain.icon] || Sparkles

              return (
                <motion.div
                  key={domain.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  onClick={() => {
                    setActiveDomain(domain)
                    if (trackHoverRef) trackHoverRef.current = domain.id
                  }}
                  className={`cursor-pointer p-4 sm:p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group flex flex-col justify-between ${
                    isActive 
                      ? `bg-black/80 ${domain.border} shadow-[0_0_25px_rgba(0,102,255,0.25)]` 
                      : "bg-black/40 border-white/10 hover:border-white/30 hover:bg-black/60"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2.5 rounded-xl border ${isActive ? `${domain.bg}/20 ${domain.border}` : 'bg-white/5 border-white/10'} transition-transform group-hover:scale-105`}>
                      <IconComp className={`w-5 h-5 ${isActive ? domain.color : 'text-white/60'}`} />
                    </div>
                    <div>
                      <h3 className={`text-base sm:text-lg font-black tracking-wider uppercase leading-tight ${isActive ? domain.color : 'text-white'}`}>
                        {domain.name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center justify-between font-mono text-[10px] tracking-widest text-white/40 uppercase pt-2 border-t border-white/5">
                    <span>SECTOR 0{i + 1}</span>
                    {isActive && (
                      <span className={`flex items-center gap-1 font-bold ${domain.color}`}>
                        ACTIVE <span className={`w-1.5 h-1.5 rounded-full ${domain.bg} animate-pulse`}></span>
                      </span>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Active Domain Intel & Problem Statements Panel (lg:col-span-7) */}
          <div className="lg:col-span-7 relative flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDomain.id}
                initial={{ opacity: 0, scale: 0.96, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
                transition={{ duration: 0.4 }}
                className={`glass-panel rounded-3xl p-6 sm:p-10 border-l-4 ${activeDomain.border} flex flex-col justify-between overflow-hidden h-full relative bg-black/60 shadow-[0_0_40px_rgba(0,0,0,0.5)]`}
              >
                {/* Background Ambient Color Glow */}
                <div 
                  className={`absolute -right-20 -top-20 w-80 h-80 rounded-full opacity-20 blur-[110px] pointer-events-none ${activeDomain.bg}`}
                ></div>

                <div>
                  {/* Subtitle Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`text-xs font-mono tracking-widest uppercase px-3 py-1 rounded-full border bg-black/50 ${activeDomain.border} ${activeDomain.color}`}>
                      DOMAIN // {activeDomain.id}
                    </div>
                    <span className="text-xs font-mono text-white/40 tracking-widest uppercase">
                      HACKINTYM '26 2.0
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4">
                    {activeDomain.name}
                  </h3>

                  <p className="text-base sm:text-lg font-mono text-white/80 leading-relaxed mb-8">
                    {activeDomain.desc}
                  </p>

                  {/* Problem Statements Container */}
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-xs font-mono text-white/50 tracking-widest uppercase">
                      <span className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-intel-blue-light" />
                        PROBLEM STATEMENTS
                      </span>
                      <span>
                        {activeDomain.problemStatements && activeDomain.problemStatements.length > 0 
                          ? `${activeDomain.problemStatements.length} STATEMENTS RELEASED` 
                          : "STATUS: CLASSIFIED"}
                      </span>
                    </div>

                    {/* Display Problem Statements if available in data.json */}
                    {activeDomain.problemStatements && activeDomain.problemStatements.length > 0 ? (
                      <div className="space-y-3">
                        {activeDomain.problemStatements.map((ps, idx) => (
                          <div 
                            key={idx} 
                            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-intel-blue/40 transition-colors flex items-start gap-3"
                          >
                            <CheckCircle2 className={`w-5 h-5 ${activeDomain.color} shrink-0 mt-0.5`} />
                            <div className="font-mono text-xs sm:text-sm text-white/90 leading-relaxed">
                              {ps}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      /* High-tech Marvel HUD Lock Screen when problem statements are awaiting release */
                      <div className="p-6 rounded-2xl bg-black/50 border border-white/10 text-center relative overflow-hidden flex flex-col items-center justify-center gap-3 py-10">
                        <div className="p-3 rounded-full bg-white/5 border border-white/10 text-white/50 mb-1">
                          <Lock className="w-6 h-6 text-intel-blue-light" />
                        </div>
                        <h4 className="text-sm font-mono font-bold tracking-widest text-white uppercase">
                          PROBLEM STATEMENTS REVEALING SOON
                        </h4>
                      </div>
                    )}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}

