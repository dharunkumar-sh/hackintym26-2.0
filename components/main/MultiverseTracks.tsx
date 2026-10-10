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
  Sparkles,
  Tablet,
  FileText,
} from "lucide-react";

export interface ParsedProblemStatement {
  code: string;
  title: string;
  description: string;
  raw: string;
}

export function parseProblemStatement(
  raw: string,
  index: number,
): ParsedProblemStatement {
  const colonIdx = raw.indexOf(":");
  if (colonIdx !== -1) {
    const code = raw.slice(0, colonIdx).trim();
    const rest = raw.slice(colonIdx + 1).trim();
    const dashMatch = rest.match(/\s+[-–—]\s+/);
    if (dashMatch && dashMatch.index !== undefined) {
      const title = rest.slice(0, dashMatch.index).trim();
      const description = rest
        .slice(dashMatch.index + dashMatch[0].length)
        .trim();
      return { code, title, description, raw };
    }
    return { code, title: rest, description: "", raw };
  }

  // Handle case where there is no colon (e.g. "Title - Description")
  const dashMatch = raw.match(/\s+[-–—]\s+/);
  if (dashMatch && dashMatch.index !== undefined) {
    const title = raw.slice(0, dashMatch.index).trim();
    const description = raw.slice(dashMatch.index + dashMatch[0].length).trim();
    return {
      code: `PS-${String(index + 1).padStart(2, "0")}`,
      title,
      description,
      raw,
    };
  }

  return {
    code: `PS-${String(index + 1).padStart(2, "0")}`,
    title: raw.trim(),
    description: "",
    raw,
  };
}

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

import staticData from "@/public/data.json";

const DEFAULT_DOMAINS: DomainItem[] = (staticData.domains ||
  []) as DomainItem[];

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
          {/* Domain Selection Stack (lg:col-span-5) - Styled as Tablet Selectors */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-3.5 my-auto">
            {domains.map((domain, i) => {
              const isActive = activeDomain.id === domain.id;
              const IconComp = ICON_MAP[domain.icon] || Sparkles;
              const psCount = domain.problemStatements?.length || 0;

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
                  className={`cursor-pointer p-3 sm:p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden group flex items-center justify-between ${
                    isActive
                      ? `bg-black/90 ${domain.border} shadow-[0_0_25px_rgba(0,102,255,0.25)] border-l-4`
                      : "bg-black/40 border-white/10 hover:border-white/30 hover:bg-black/60"
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                    <div
                      className={`p-2.5 rounded-xl border shrink-0 ${
                        isActive
                          ? `${domain.bg}/20 ${domain.border}`
                          : "bg-white/5 border-white/10"
                      } transition-transform group-hover:scale-105`}
                    >
                      <IconComp
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${
                          isActive ? domain.color : "text-white/60"
                        }`}
                      />
                    </div>
                    <div className="min-w-0">
                      <h3
                        className={`text-xs sm:text-base font-black tracking-wider uppercase truncate ${
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

                  {/* Tablet Format PS Badge mentioning PS and Count */}
                  <div className="flex items-center gap-2 shrink-0 pl-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] sm:text-xs font-bold tracking-wider transition-all duration-200 border ${
                        isActive
                          ? `${domain.bg}/25 ${domain.border} ${domain.color} shadow-sm`
                          : "bg-white/5 border-white/10 text-white/60 group-hover:text-white group-hover:border-white/20"
                      }`}
                    >
                      <FileText className="w-3 h-3 opacity-70 shrink-0" />
                      <span>{psCount} PS</span>
                    </span>

                    {isActive ? (
                      <span
                        className={`hidden md:inline-flex items-center gap-1 font-bold font-mono text-[9px] ${domain.color} px-2 py-0.5 rounded-full bg-white/5 border border-white/10`}
                      >
                        ACTIVE
                      </span>
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white/40 transition-colors hidden sm:block" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Active Domain Intel & Problem Statements Tablet Console (lg:col-span-7) */}
          <div className="lg:col-span-7 relative flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDomain.id}
                initial={{ opacity: 0, scale: 0.96, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
                transition={{ duration: 0.4 }}
                className={`glass-panel rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-white/15 border-l-4 ${activeDomain.border} flex flex-col justify-between overflow-hidden h-full relative bg-neutral-950/85 shadow-[0_0_50px_rgba(0,0,0,0.6)]`}
              >
                {/* Background Ambient Color Glow */}
                <div
                  className={`absolute -right-20 -top-20 w-80 h-80 rounded-full opacity-20 blur-[110px] pointer-events-none ${activeDomain.bg}`}
                ></div>

                <div>
                  {/* Domain Title & Description */}
                  <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-2">
                    {activeDomain.name}
                  </h3>

                  {/* Problem Statements Tablet Container */}
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-white/50 tracking-widest uppercase">
                      <span className="flex items-center gap-2 font-bold">
                        <Tablet className="w-4 h-4 text-intel-blue-light" />
                        PROBLEM STATEMENTS
                      </span>
                      <span className="text-[11px] text-intel-blue-light font-bold">
                        {activeDomain.problemStatements?.length || 0} STATEMENTS AVAILABLE
                      </span>
                    </div>

                    {/* Problem Statements Display: Publicly Available */}
                    <div className="space-y-3.5">
                      {activeDomain.problemStatements &&
                      activeDomain.problemStatements.length > 0 ? (
                        activeDomain.problemStatements.map((psRaw, idx) => {
                          const parsed = parseProblemStatement(psRaw, idx);
                          const totalCount =
                            activeDomain.problemStatements.length;

                          return (
                            <motion.div
                              key={parsed.code || idx}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.35,
                                delay: idx * 0.08,
                              }}
                              className={`group relative p-4 sm:p-5 rounded-2xl bg-black/60 border border-white/10 hover:border-white/25 transition-all duration-300 shadow-md hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] overflow-hidden`}
                            >
                              {/* Glowing top accent line with domain glow */}
                              <div
                                className="absolute top-0 left-4 right-4 h-0.5 opacity-60 group-hover:opacity-100 transition-opacity"
                                style={{
                                  background: `linear-gradient(90deg, transparent, ${activeDomain.glow ? activeDomain.glow.replace(/,0\.[0-9]+\)/, ",0.9)") : "rgba(0,102,255,0.7)"}, transparent)`,
                                }}
                              />

                              {/* Tablet Format PS Badges Row */}
                              <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                                <div className="flex flex-wrap items-center gap-2">
                                  {/* Tablet Pill Badge: PS Code */}
                                  <span
                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-black tracking-wider uppercase border shadow-sm ${activeDomain.bg}/20 ${activeDomain.border} ${activeDomain.color}`}
                                  >
                                    <Sparkles className="w-3 h-3" />
                                    PS {String(idx + 1).padStart(
                                      2,
                                      "0",
                                    )} / {String(totalCount).padStart(2, "0")}
                                  </span>
                                </div>
                              </div>

                              {/* PS Title */}
                              <h4 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-wide group-hover:text-intel-blue-light transition-colors leading-snug my-1.5">
                                {parsed.title}
                              </h4>

                              {/* PS Description */}
                              {parsed.description && (
                                <p className="text-xs sm:text-sm font-sans text-white/75 leading-relaxed font-normal pt-1">
                                  {parsed.description}
                                </p>
                              )}
                            </motion.div>
                          );
                        })
                      ) : (
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 font-mono text-xs text-white/60">
                          Problem statements will appear momentarily.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
