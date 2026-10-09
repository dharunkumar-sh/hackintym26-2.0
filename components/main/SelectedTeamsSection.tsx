"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, User, CheckCircle2, Clock } from "lucide-react";

import selectedTeamsData from "@/data/selected_teams.json";
import waitingListTeamsData from "@/data/waiting_list_teams.json";

export interface TeamItem {
  id: number;
  waitlistNumber?: number;
  teamName: string;
  teamLead: string;
  status: "Selected" | "Waiting List";
}

export function SelectedTeamsSection() {
  const [activeTab, setActiveTab] = useState<"selected" | "waitingList">(
    "selected",
  );

  const selectedTeams = selectedTeamsData as TeamItem[];
  const waitingListTeams = waitingListTeamsData as TeamItem[];

  const handleTabChange = (
    e: React.MouseEvent<HTMLButtonElement>,
    tab: "selected" | "waitingList"
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (activeTab === tab) return;

    // Capture the current scroll position before tab switch
    const currentScrollY = window.scrollY;
    setActiveTab(tab);

    // Restore scroll position to prevent browser auto-scroll / scroll-anchoring shifts
    requestAnimationFrame(() => {
      window.scrollTo({ top: currentScrollY, behavior: "instant" });
    });
  };

  return (
    <section
      id="selected-teams"
      className="relative py-20 sm:py-28 px-4 sm:px-6 z-20 overflow-x-clip border-t border-intel-blue/20 bg-black/60 backdrop-blur-md"
      style={{ overflowAnchor: "none" }}
    >
      {/* Background Marvel Aura Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-intel-blue/15 via-power-red/10 to-transparent blur-[90px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-cyan-500/10 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10" style={{ overflowAnchor: "none" }}>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-intel-blue/20 via-intel-blue/10 to-power-red/20 border border-intel-blue/40 text-intel-blue-light font-mono text-xs tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(0,102,255,0.25)]">
              <Shield className="w-3.5 h-3.5 text-intel-blue-light" />
              <span>OFFICIAL SQUAD TRANSMISSION</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase text-white mb-4">
              Selected{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-intel-blue-light via-white to-power-red-light">
                Teams Roster
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Centered Category Tabs: Selected (25) & Waiting List (5) */}
        <div className="mb-10 flex justify-center" style={{ overflowAnchor: "none" }}>
          <div className="inline-flex items-center bg-black/60 p-1.5 rounded-xl border border-white/10 backdrop-blur-xl shadow-lg">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => handleTabChange(e, "selected")}
              className={`px-5 py-2.5 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer select-none ${
                activeTab === "selected"
                  ? "bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              Selected ({selectedTeams.length})
            </button>

            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => handleTabChange(e, "waitingList")}
              className={`px-5 py-2.5 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer select-none ${
                activeTab === "waitingList"
                  ? "bg-power-red text-white shadow-[0_0_15px_rgba(225,6,0,0.5)]"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Clock className="w-4 h-4" />
              Waiting List ({waitingListTeams.length})
            </button>
          </div>
        </div>

        <div className="min-h-[450px]" style={{ overflowAnchor: "none" }}>
          {/* 1. SELECTED SQUADS GRID (25 TEAMS) */}
          {activeTab === "selected" && (
            <div className="mb-14">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-white">
                      Qualified Teams ({selectedTeams.length})
                    </h3>
                    <p className="text-[11px] font-mono text-white/50 tracking-wider uppercase">
                      Official 25 Selected Innovation Squads
                    </p>
                  </div>
                </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                ACTIVE SLOTS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {selectedTeams.map((team, index) => {
                return (
                  <motion.div
                    key={`selected-${team.id}`}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-5%" }}
                    transition={{ duration: 0.35, delay: (index % 4) * 0.05 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="group relative flex flex-col justify-between p-6 rounded-2xl glass-panel bg-gradient-to-b from-black/80 to-intel-blue/5 border border-white/10 hover:border-intel-blue/60 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_25px_rgba(0,102,255,0.25)] overflow-hidden"
                  >
                    {/* Top Glow bar on hover */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-intel-blue via-cyan-400 to-emerald-400 opacity-60 group-hover:opacity-100 transition-opacity" />

                    <div>
                      {/* Card Header: Slot # & Status */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-mono font-bold tracking-wider uppercase text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          SELECTED
                        </span>
                        <span className="text-xs sm:text-sm font-mono font-bold text-white/50 group-hover:text-intel-blue-light transition-colors">
                          #{String(team.id).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Team Name */}
                      <h4 className="text-lg sm:text-xl md:text-2xl font-black tracking-wide text-white uppercase mb-5 group-hover:text-intel-blue-light transition-colors line-clamp-2">
                        {team.teamName}
                      </h4>
                    </div>

                    {/* Team Lead Badge */}
                    <div className="pt-4 border-t border-white/10">
                      <div className="p-3 sm:p-3.5 rounded-xl bg-black/60 border border-white/10 group-hover:border-intel-blue/40 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-intel-blue/20 border border-intel-blue/40 flex items-center justify-center shrink-0">
                            <User className="w-4 h-4 sm:w-5 sm:h-5 text-intel-blue-light" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="block text-[10px] sm:text-[11px] font-mono font-semibold tracking-widest text-white/50 uppercase">
                              TEAM LEAD
                            </span>
                            <span className="block text-sm sm:text-base font-bold text-white truncate tracking-wide">
                              {team.teamLead}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. WAITING LIST SQUADS GRID (5 TEAMS) */}
        {activeTab === "waitingList" && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-white">
                    Waiting List Squads ({waitingListTeams.length})
                  </h3>
                  <p className="text-[11px] font-mono text-white/50 tracking-wider uppercase">
                    Standby Reserve Teams for Event Check-in
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                STANDBY PROTOCOL
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {waitingListTeams.map((team, index) => {
                return (
                  <motion.div
                    key={`waitlist-${team.id}`}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-5%" }}
                    transition={{ duration: 0.35, delay: (index % 4) * 0.05 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="group relative flex flex-col justify-between p-6 rounded-2xl glass-panel bg-linear-to-b from-black/80 to-power-red/5 border border-power-red/30 hover:border-power-red transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_25px_rgba(225,6,0,0.25)] overflow-hidden"
                  >
                    {/* Top Amber/Red Glow bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-power-red to-power-red-light opacity-70 group-hover:opacity-100 transition-opacity" />

                    <div>
                      {/* Card Header: Waitlist # & Status */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-mono font-bold tracking-wider uppercase text-amber-400 bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-full">
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                          WAITLIST #{team.waitlistNumber || team.id}
                        </span>
                        <span className="text-xs sm:text-sm font-mono font-bold text-power-red-light/80">
                          WL-{String(team.id).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Team Name */}
                      <h4 className="text-lg sm:text-xl md:text-2xl font-black tracking-wide text-white uppercase mb-5 group-hover:text-power-red-light transition-colors line-clamp-2">
                        {team.teamName}
                      </h4>
                    </div>

                    {/* Team Lead Badge */}
                    <div className="pt-4 border-t border-white/10">
                      <div className="p-3 sm:p-3.5 rounded-xl bg-black/60 border border-power-red/20 group-hover:border-power-red/40 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-power-red/20 border border-power-red/40 flex items-center justify-center shrink-0">
                            <User className="w-4 h-4 sm:w-5 sm:h-5 text-power-red-light" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="block text-[10px] sm:text-[11px] font-mono font-semibold tracking-widest text-white/50 uppercase">
                              TEAM LEAD
                            </span>
                            <span className="block text-sm sm:text-base font-bold text-white truncate tracking-wide">
                              {team.teamLead}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
        </div>
      </div>
    </section>
  );
}
