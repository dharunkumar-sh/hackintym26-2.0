"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Crown,
  X,
  ArrowRight,
  Award,
} from "lucide-react";

interface WinnersAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WinnersAnnouncementModal({
  isOpen,
  onClose,
}: WinnersAnnouncementModalProps) {
  // Prevent background scrolling when open and support Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleExploreWinners = () => {
    onClose();
    setTimeout(() => {
      const podiumElem =
        document.getElementById("podium") ||
        document.getElementById("winners");
      if (podiumElem) {
        const yOffset = -70;
        const y =
          podiumElem.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 150);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
          {/* Frosted Glass Translucent Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="relative w-full max-w-xl sm:max-w-2xl rounded-3xl glass-panel bg-linear-to-b from-neutral-900/98 via-black/98 to-neutral-950/98 border border-amber-400/50 p-6 sm:p-10 shadow-[0_0_80px_rgba(255,215,0,0.35)] overflow-hidden text-center z-10 my-auto"
          >
            {/* Top Glowing Beam */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-linear-to-r from-amber-500 via-yellow-300 to-amber-500 shadow-[0_0_15px_#FFD700]" />

            {/* Ambient Background Glows */}
            <div className="absolute -top-24 left-1/4 w-72 h-72 bg-amber-400/20 blur-[80px] pointer-events-none rounded-full" />
            <div className="absolute -bottom-24 right-1/4 w-72 h-72 bg-cyan-400/15 blur-[80px] pointer-events-none rounded-full" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Winners Announcement Modal"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-white/50 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Announcement Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/50 text-amber-300 font-mono text-xs font-bold tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(255,215,0,0.3)]">
              <Crown className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>S.H.I.E.L.D. VICTORY BULLETIN</span>
            </div>

            {/* Center Animated Trophy Icon */}
            <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24 mb-5 flex items-center justify-center">
              <div className="absolute inset-0 rounded-3xl bg-linear-to-tr from-amber-500 via-yellow-300 to-amber-600 opacity-40 blur-lg animate-pulse" />
              <div className="relative w-full h-full rounded-2xl bg-black/90 border border-amber-400/60 flex items-center justify-center shadow-inner">
                <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-amber-300 drop-shadow-[0_0_15px_#FFD700]" />
              </div>
            </div>

            {/* Main Headline */}
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-3">
              WINNERS ARE{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-300 via-yellow-200 to-amber-400 drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">
                ANNOUNCED!
              </span>
            </h3>

            {/* Descriptive Body */}
            <p className="text-sm sm:text-base font-mono text-white/80 leading-relaxed mb-6 max-w-lg mx-auto">
              30 continuous hours of intense combat and multiverse innovation have concluded.
              The jury evaluation is complete and the champions of <span className="text-white font-bold">HACKINTYM &apos;26 2.0</span> have been crowned!
            </p>

            {/* Teaser Summary Cards (without revealing names directly) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8 max-w-md mx-auto text-center">
              <div className="p-4 rounded-2xl bg-black/60 border border-amber-400/30 shadow-[0_0_20px_rgba(255,215,0,0.15)] flex flex-col items-center justify-center">
                <Trophy className="w-5 h-5 text-amber-400 mb-1.5" />
                <span className="text-xl sm:text-2xl font-black font-mono text-white">
                  ₹15,000
                </span>
                <span className="text-[10px] font-mono text-amber-300/80 tracking-wider uppercase mt-0.5">
                  Prize Pool Disbursed
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-intel-blue/30 shadow-[0_0_20px_rgba(0,102,255,0.15)] flex flex-col items-center justify-center">
                <Award className="w-5 h-5 text-intel-blue-light mb-1.5" />
                <span className="text-xl sm:text-2xl font-black font-mono text-white">
                  Top 3 Teams
                </span>
                <span className="text-[10px] font-mono text-intel-blue-light/80 tracking-wider uppercase mt-0.5">
                  Podium Conquered
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={handleExploreWinners}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-linear-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black font-extrabold font-mono text-xs sm:text-sm tracking-wider uppercase border border-amber-400/80 shadow-[0_0_30px_rgba(255,215,0,0.6)] transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
              >
                <Trophy className="w-4 h-4 text-black" />
                <span>View Winners</span>
                <ArrowRight className="w-4 h-4 text-black ml-1" />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-mono text-xs sm:text-sm font-bold tracking-wider uppercase border border-white/10 transition-colors cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
