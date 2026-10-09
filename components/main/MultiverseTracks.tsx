/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Heart,
  Shield,
  Brain,
  Leaf,
  Zap,
  Gift,
  Lock,
  FileText,
  Sparkles,
  CheckCircle2,
  Fingerprint,
  Key,
  X,
  AlertTriangle,
} from "lucide-react";
import { ChiefGuestRevealModal } from "./ChiefGuestRevealModal";

export interface DomainItem {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  color: string;
  bg: string;
  border: string;
  gradient: string;
  glow: string;
  desc: string;
  isSurprise?: boolean;
  problemStatements: string[];
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
    problemStatements: [
      "PS-HC01: AI-Driven Rural Triage & Diagnostic Assistant - Develop an offline-capable edge AI diagnostic assistant for primary health workers to detect anomalies in medical imaging and vital signs.",
      "PS-HC02: Privacy-Preserving Federated Healthcare Intelligence - Build a zero-knowledge federated learning framework enabling hospitals to train collaborative oncology prediction models without sharing patient PII.",
    ],
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
    problemStatements: [
      "PS-CS01: Autonomous Zero-Day Threat Mitigation - Implement an AI-powered deception & honeynet system that autonomously isolates lateral movement and reverses memory injections in real-time.",
      "PS-CS02: Quantum-Resistant Identity & Access Management - Architect a post-quantum cryptographic authentication protocol protecting high-value cloud APIs against harvest-now-decrypt-later attacks.",
    ],
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
    problemStatements: [
      "PS-AI01: Collaborative Multi-Agent Code Synthesis & Audit - Create an autonomous swarm of AI agents (Architect, Coder, Pen-tester, Benchmarker) that cooperatively build and verify microservices.",
      "PS-AI02: Self-Governing Enterprise Workflow Agents - Build deterministic agentic workflows capable of multi-step decision execution with cryptographic verification and human safety circuit-breakers.",
    ],
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
    problemStatements: [
      "PS-SD01: Hyperlocal Food Supply & Rescue Logistics - Engineer a predictive routing & matching platform connecting commercial kitchens with local shelters to eliminate perishable food wastage.",
      "PS-SD02: Multilingual Offline Learning Copilot - Build a low-resource multilingual conversational tutor for rural classrooms that runs on low-cost devices without active internet connectivity.",
    ],
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
    problemStatements: [
      "PS-CE01: Decentralized Renewable Microgrid Balancing - Formulate a real-time peer-to-peer renewable energy distribution and automated dynamic tariff optimizer using edge IoT nodes.",
      "PS-CE02: Geospatial Carbon Footprint & Reforestation Audit - Deploy computer vision pipeline analyzing multispectral satellite feeds to quantify urban carbon absorption and trigger automated green credits.",
    ],
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
    problemStatements: [
      "PS-SP01: Autonomous Drone Fleet for Extreme Climate Disaster Relief - Build swarm coordination algorithms to drop medical kits and survey survivor zones in zero-visibility scenarios.",
      "PS-SP02: Spatial Digital Twin for High-Risk Emergency Evacuation - Design real-time 3D spatial simulation for dense indoor arenas during infrastructure anomalies with predictive stampede prevention.",
    ],
  },
];

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  Shield,
  Brain,
  Leaf,
  Zap,
  Gift,
};

interface MultiverseTracksProps {
  trackHoverRef?: React.MutableRefObject<string | null>;
}

export function MultiverseTracks({ trackHoverRef }: MultiverseTracksProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [domains, setDomains] = useState<DomainItem[]>(DEFAULT_DOMAINS);
  const [activeDomain, setActiveDomain] = useState<DomainItem>(
    DEFAULT_DOMAINS[0],
  );
  const [isRevealed, setIsRevealed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const STORAGE_KEY = "hackintym_ps_revealed_v2";
  const [showRelockModal, setShowRelockModal] = useState(false);
  const [relockPasscode, setRelockPasscode] = useState("");
  const [relockError, setRelockError] = useState("");

  // Hydration & Persistence check (Locked by default)
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      localStorage.removeItem("hackintym_ps_revealed");
      const stored = localStorage.getItem(STORAGE_KEY) === "true";
      const urlForce =
        new URLSearchParams(window.location.search).get("chief_guest") ===
        "true";
      if (stored || urlForce) {
        setIsRevealed(true);
      } else {
        setIsRevealed(false);
      }
    }
  }, []);

  // Fetch dynamic data.json in production if updated
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        if (
          data &&
          data.domains &&
          Array.isArray(data.domains) &&
          data.domains.length > 0
        ) {
          setDomains(data.domains);
          setActiveDomain(data.domains[0]);
        }
      })
      .catch(() => {
        // Fallback to DEFAULT_DOMAINS
      });
  }, []);

  const handleRevealSuccess = () => {
    setIsRevealed(true);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, "true");
    }
  };

  const handleRelockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = relockPasscode.trim();
    if (entered === "dev@2526" || entered.toLowerCase() === "dev@2526") {
      setIsRevealed(false);
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem("hackintym_ps_revealed");
      }
      setShowRelockModal(false);
      setRelockPasscode("");
      setRelockError("");
    } else {
      setRelockError("INVALID SECRET PASSWORD. ACCESS DENIED.");
    }
  };

  return (
    <section
      ref={ref}
      id="tracks"
      className="relative py-32 px-4 sm:px-6 z-10 min-h-screen flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* {mounted && isRevealed ? (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-mono text-xs tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>
                DECLASSIFIED BY CHIEF GUEST // S.H.I.E.L.D. CLEARANCE GRANTED
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-power-red/20 border border-power-red/40 text-power-red-light font-mono text-xs tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(225,6,0,0.3)]">
              <Lock className="w-3.5 h-3.5 animate-pulse text-power-red" />
              <span>
                S.H.I.E.L.D. LEVEL 10 ENCRYPTION // CHIEF GUEST REVEAL PENDING
              </span>
            </div>
          )} */}

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase text-white mb-4">
            Choose Your{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-intel-blue via-intel-blue-light to-power-red">
              Universe
            </span>
          </h2>
          <p className="text-sm sm:text-lg font-mono text-white/60 tracking-widest uppercase max-w-2xl mx-auto">
            SIX DOMAINS • ENDLESS POSSIBILITIES
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-130">
          {/* Domain Selection Stack (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-2.5 sm:gap-3.5 my-auto">
            {domains.map((domain, i) => {
              const isActive = activeDomain.id === domain.id;
              const IconComp = ICON_MAP[domain.icon] || Sparkles;

              return (
                <motion.div
                  key={domain.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  onClick={() => {
                    setActiveDomain(domain);
                    if (trackHoverRef) trackHoverRef.current = domain.id;
                  }}
                  className={`cursor-pointer p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden group flex items-center justify-between ${
                    isActive
                      ? `bg-black/90 ${domain.border} shadow-[0_0_25px_rgba(0,102,255,0.25)] border-l-4`
                      : "bg-black/40 border-white/10 hover:border-white/30 hover:bg-black/60"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`p-2.5 rounded-xl border shrink-0 ${
                        isActive
                          ? `${domain.bg}/20 ${domain.border}`
                          : "bg-white/5 border-white/10"
                      } transition-transform group-hover:scale-105`}
                    >
                      <IconComp
                        className={`w-5 h-5 ${
                          isActive ? domain.color : "text-white/60"
                        }`}
                      />
                    </div>
                    <div className="min-w-0">
                      <h3
                        className={`text-sm sm:text-base font-black tracking-wider uppercase truncate ${
                          isActive ? domain.color : "text-white"
                        }`}
                      >
                        {domain.name}
                      </h3>
                      <span className="text-[10px] sm:text-xs font-mono text-white/40 tracking-wider truncate block">
                        {domain.subtitle}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0 pl-3">
                    {isActive ? (
                      <span
                        className={`flex items-center gap-1.5 font-bold font-mono text-[10px] ${domain.color} px-2 py-0.5 rounded-full bg-white/5 border border-white/10`}
                      >
                        ACTIVE
                      </span>
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white/40 transition-colors" />
                    )}
                  </div>
                </motion.div>
              );
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
                        {mounted && isRevealed
                          ? `${activeDomain.problemStatements?.length || 2} STATEMENTS DECLASSIFIED`
                          : "STATUS: ENCRYPTED"}
                      </span>
                    </div>

                    {/* Problem Statements Display: Revealed vs Secured */}
                    {mounted && isRevealed ? (
                      <div className="space-y-3">
                        {activeDomain.problemStatements &&
                        activeDomain.problemStatements.length > 0 ? (
                          activeDomain.problemStatements.map((ps, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: idx * 0.1 }}
                              className="p-4 rounded-xl bg-black/60 border border-white/10 hover:border-intel-blue/40 transition-colors flex items-start gap-3.5 shadow-inner"
                            >
                              <CheckCircle2
                                className={`w-5 h-5 ${activeDomain.color} shrink-0 mt-0.5`}
                              />
                              <div className="font-mono text-xs sm:text-sm text-white/90 leading-relaxed">
                                {ps}
                              </div>
                            </motion.div>
                          ))
                        ) : (
                          <div className="p-4 rounded-xl bg-white/5 border border-white/10 font-mono text-xs text-white/60">
                            Problem statements will appear momentarily.
                          </div>
                        )}

                        {/* Revealed problem statements list */}
                        {/* Hidden Relock Button with Secret Password */}
                        <div className="pt-3 flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              setRelockPasscode("");
                              setRelockError("");
                              setShowRelockModal(true);
                            }}
                            title="S.H.I.E.L.D. Master Relock"
                            className="inline-flex items-center gap-1.5 text-[11px] font-mono text-white/20 hover:text-white/60 p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                          >
                            <Lock className="w-3 h-3" />
                            <span>Security Relock</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* High-tech Marvel S.H.I.E.L.D. Lock Screen for Chief Guest Reveal */
                      <div className="p-6 sm:p-8 rounded-2xl bg-black/75 border border-power-red/40 shadow-[0_0_30px_rgba(225,6,0,0.2)] text-center relative overflow-hidden flex flex-col items-center justify-center gap-4 py-8">
                        {/* Red beam across top */}
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-power-red via-amber-400 to-power-red" />

                        <div className="relative">
                          <div className="w-14 h-14 rounded-2xl bg-power-red/20 border border-power-red/50 flex items-center justify-center shadow-[0_0_20px_rgba(225,6,0,0.4)]">
                            <Lock className="w-7 h-7 text-power-red animate-pulse" />
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm sm:text-base font-mono font-bold tracking-widest text-white uppercase">
                            Problem Statements will be revealed soon.
                          </h4>
                        </div>

                        {/* Redacted lines preview */}
                        <div className="w-full max-w-md space-y-2 py-1 opacity-40">
                          <div className="h-3 bg-white/20 rounded w-full animate-pulse" />
                          <div className="h-3 bg-white/20 rounded w-3/4 animate-pulse" />
                        </div>

                        {/* Chief Guest Action Button */}
                        <button
                          type="button"
                          //onClick={() => setIsModalOpen(true)}
                          className="mt-1 px-6 sm:px-8 py-3.5 rounded-xl bg-linear-to-r from-power-red via-rose-600 to-power-red hover:from-rose-600 hover:to-power-red text-white font-mono font-bold text-xs uppercase tracking-widest border border-power-red-light/50 shadow-[0_0_30px_rgba(225,6,0,0.5)] transition-all flex items-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95"
                        >
                          <Fingerprint className="w-4 h-4 animate-pulse" />
                          <span>REVEAL PROTOCOL</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Marvel S.H.I.E.L.D. Chief Guest Reveal Modal */}
      <ChiefGuestRevealModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleRevealSuccess}
      />

      {/* S.H.I.E.L.D. Secret Relock Modal */}
      <AnimatePresence>
        {showRelockModal && (
          <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRelockModal(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-md rounded-3xl glass-panel bg-neutral-950/95 border border-power-red/40 p-6 sm:p-8 shadow-[0_0_60px_rgba(225,6,0,0.35)] overflow-hidden text-center z-10 my-auto"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-power-red via-amber-400 to-power-red" />

              <button
                type="button"
                onClick={() => setShowRelockModal(false)}
                aria-label="Close Relock Modal"
                className="absolute top-4 right-4 p-2 rounded-full text-white/50 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-power-red/20 border border-power-red/40 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(225,6,0,0.3)]">
                <Lock className="w-6 h-6 text-power-red animate-pulse" />
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-power-red/20 border border-power-red/40 text-power-red-light font-mono text-[11px] font-bold tracking-widest uppercase mb-3">
                <Shield className="w-3.5 h-3.5" />
                <span>S.H.I.E.L.D. MASTER LOCKOUT</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-2">
                RELOCK PROBLEM STATEMENTS
              </h3>

              <p className="text-xs font-mono text-white/60 mb-6">
                Enter secret authorization key to engage Level 10 Encryption and
                lock problem statements.
              </p>

              <form onSubmit={handleRelockSubmit} className="space-y-3">
                <div className="relative">
                  <Key className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={relockPasscode}
                    onChange={(e) => setRelockPasscode(e.target.value)}
                    placeholder="ENTER SECRET PASSWORD"
                    className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/15 focus:border-power-red rounded-xl text-white font-mono text-xs sm:text-sm tracking-wider uppercase focus:outline-none transition-colors"
                  />
                </div>

                {relockError && (
                  <div className="text-power-red text-xs font-mono font-bold flex items-center justify-center gap-1.5 pt-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{relockError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-power-red via-rose-600 to-power-red hover:from-rose-600 hover:to-power-red text-white font-mono font-bold text-xs uppercase tracking-widest border border-power-red-light/50 shadow-[0_0_25px_rgba(225,6,0,0.4)] transition-all cursor-pointer hover:scale-105 active:scale-95 mt-2"
                >
                  ENGAGE SECURITY LOCK
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
