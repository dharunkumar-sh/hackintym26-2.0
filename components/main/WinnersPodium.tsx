"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useInView } from "framer-motion";
import {
  Trophy,
  Crown,
  Award,
  Flame,
  Shield,
  Star,
  PartyPopper,
  Users2,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export interface WinnerItem {
  rank: 1 | 2 | 3;
  name: string;
  prizeTitle: string;
  amount: string;
  track: string;
  lead?: string;
  tagline: string;
  theme: {
    primary: string;
    glow: string;
    border: string;
    badgeBg: string;
    textGradient: string;
    podiumGradient: string;
    numberColor: string;
    pillBorder: string;
  };
}

const PODIUM_WINNERS: WinnerItem[] = [
  {
    rank: 1,
    name: "Hackhive_09",
    prizeTitle: "Grand Prize Champion",
    amount: "₹7,500",
    track: "IT",
    lead: "K Ve Shrreya",
    tagline: "The Stealth Strategist",
    theme: {
      primary: "#FFD700",
      glow: "rgba(255, 215, 0, 0.45)",
      border: "border-amber-400/80",
      badgeBg:
        "bg-linear-to-r from-amber-500/30 via-yellow-400/20 to-amber-600/30",
      textGradient: "from-amber-300 via-yellow-400 to-amber-500",
      podiumGradient: "from-amber-500/35 via-yellow-500/15 to-black/90",
      numberColor: "text-amber-400/50",
      pillBorder: "border-amber-400/40 text-amber-300",
    },
  },
  {
    rank: 2,
    name: "Hacktrix",
    prizeTitle: "First Runner Up",
    amount: "₹5,000",
    track: "AIDS",
    lead: "Sudharshan R",
    tagline: "The Agile Prodigy",
    theme: {
      primary: "#38BDF8",
      glow: "rgba(56, 189, 248, 0.4)",
      border: "border-cyan-400/70",
      badgeBg: "bg-linear-to-r from-cyan-500/25 via-sky-400/15 to-blue-600/25",
      textGradient: "from-cyan-300 via-sky-200 to-blue-400",
      podiumGradient: "from-cyan-500/30 via-sky-500/10 to-black/90",
      numberColor: "text-cyan-400/40",
      pillBorder: "border-cyan-400/40 text-cyan-300",
    },
  },
  {
    rank: 3,
    name: "TECH-SQUAD",
    prizeTitle: "Second Runner Up",
    amount: "₹2,500",
    track: "IT",
    lead: "Dharshana S",
    tagline: "The High Voltage Powerhouse",
    theme: {
      primary: "#F97316",
      glow: "rgba(249, 115, 22, 0.4)",
      border: "border-amber-600/70",
      badgeBg:
        "bg-linear-to-r from-orange-500/25 via-amber-600/15 to-rose-600/25",
      textGradient: "from-amber-400 via-orange-300 to-rose-400",
      podiumGradient: "from-amber-600/30 via-orange-600/10 to-black/90",
      numberColor: "text-amber-600/40",
      pillBorder: "border-amber-600/40 text-orange-300",
    },
  },
];

// Helper Confetti Particle
interface ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  shape: "rect" | "circle" | "star";
}

export function WinnersPodium() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const confettiAnimRef = useRef<number | null>(null);
  const particlesRef = useRef<ConfettiParticle[]>([]);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });
  const [confettiActive, setConfettiActive] = useState(false);

  // Trigger interactive high-voltage celebratory confetti blast
  const blastConfetti = useCallback((count = 140) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const colors = [
      "#FFD700",
      "#FFA500",
      "#00E5FF",
      "#0066FF",
      "#FF2A2A",
      "#FFFFFF",
      "#C084FC",
    ];

    const newParticles: ConfettiParticle[] = [];
    const originX = canvas.width / 2;
    const originY = canvas.height * 0.35;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 6;
      newParticles.push({
        x: originX + (Math.random() - 0.5) * 200,
        y: originY + (Math.random() - 0.5) * 100,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 6,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        opacity: 1,
        shape:
          Math.random() > 0.4
            ? "rect"
            : Math.random() > 0.5
              ? "star"
              : "circle",
      });
    }

    particlesRef.current = [...particlesRef.current, ...newParticles];
    setConfettiActive(true);
  }, []);

  // Canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (particlesRef.current.length > 0) {
        particlesRef.current.forEach((p) => {
          p.x += p.vx * dt * 60;
          p.y += p.vy * dt * 60;
          p.vy += 0.28; // gravity
          p.vx *= 0.985; // drag
          p.rotation += p.rotationSpeed;
          p.opacity -= 0.0075; // fade

          if (p.opacity > 0) {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.globalAlpha = Math.max(0, p.opacity);
            ctx.fillStyle = p.color;

            if (p.shape === "rect") {
              ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.6);
            } else if (p.shape === "circle") {
              ctx.beginPath();
              ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
              ctx.fill();
            } else {
              // Star
              ctx.beginPath();
              for (let i = 0; i < 5; i++) {
                ctx.lineTo(
                  Math.cos(((18 + i * 72) * Math.PI) / 180) * p.size,
                  -Math.sin(((18 + i * 72) * Math.PI) / 180) * p.size,
                );
                ctx.lineTo(
                  Math.cos(((54 + i * 72) * Math.PI) / 180) * (p.size / 2),
                  -Math.sin(((54 + i * 72) * Math.PI) / 180) * (p.size / 2),
                );
              }
              ctx.closePath();
              ctx.fill();
            }

            ctx.restore();
          }
        });

        // Filter dead particles
        particlesRef.current = particlesRef.current.filter(
          (p) => p.opacity > 0,
        );
      }

      confettiAnimRef.current = requestAnimationFrame(render);
    };

    confettiAnimRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (confettiAnimRef.current)
        cancelAnimationFrame(confettiAnimRef.current);
    };
  }, []);

  // Trigger confetti once on view
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        blastConfetti(160);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isInView, blastConfetti]);

  // GSAP Entrance Sequence for the 3D podium columns
  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      const podiumPillars = gsap.utils.toArray<HTMLElement>(".podium-pillar");
      if (podiumPillars.length === 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        ".podium-header",
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      );

      // Staggered rise of the 3 pedestals: 2nd rises, 1st rises highest, 3rd rises
      tl.fromTo(
        podiumPillars,
        { opacity: 0, y: 90, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.5)",
        },
        "-=0.4",
      );

      tl.fromTo(
        ".podium-ground-base",
        { opacity: 0, scaleX: 0.8 },
        { opacity: 1, scaleX: 1, duration: 0.8, ease: "power2.out" },
        "-=0.6",
      );
    },
    { scope: sectionRef },
  );

  const firstPlace = PODIUM_WINNERS.find((w) => w.rank === 1)!;
  const secondPlace = PODIUM_WINNERS.find((w) => w.rank === 2)!;
  const thirdPlace = PODIUM_WINNERS.find((w) => w.rank === 3)!;

  return (
    <section
      ref={sectionRef}
      id="podium"
      aria-label="Hackathon Winners Podium"
      className="relative py-28 px-4 sm:px-6 md:px-10 z-10 overflow-hidden flex flex-col items-center justify-center min-h-screen"
    >
      {/* Anchor targets so legacy links to countdown or winners scroll here */}
      <span id="winners" className="sr-only">
        Winners Podium
      </span>
      <span id="countdown" className="sr-only">
        Mission Countdown
      </span>

      {/* Confetti Physics Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-30 w-full h-full"
      />

      {/* Atmospheric Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Golden Central Aura behind 1st place */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-175 h-137.5 rounded-full bg-[radial-gradient(circle,rgba(255,215,0,0.18)_0%,rgba(245,158,11,0.06)_40%,transparent_70%)] blur-[90px] transform-gpu"></div>
        {/* Arc Cyan Glow behind 2nd place */}
        <div className="absolute top-1/3 left-[20%] w-125 h-125 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.16)_0%,transparent_65%)] blur-[80px] transform-gpu"></div>
        {/* Bronze/Rose Glow behind 3rd place */}
        <div className="absolute top-1/3 right-[20%] w-125 h-125 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.15)_0%,transparent_65%)] blur-[80px] transform-gpu"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="podium-header text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
          {/* S.H.I.E.L.D. Protocol Victory Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-amber-400/15 border border-amber-400/50 shadow-[0_0_30px_rgba(255,215,0,0.35)] text-amber-300 font-mono text-xs sm:text-sm tracking-[0.25em] uppercase mb-5 backdrop-blur-md">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500 shadow-[0_0_12px_#FFD700]"></span>
            </span>
            <span className="font-extrabold text-amber-200">
              S.H.I.E.L.D. OFFICIAL VICTORY PROTOCOL
            </span>
          </div>

          {/* Main Giant Heading */}
          <h2
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase text-white mb-4"
            style={{
              textShadow:
                "0 0 40px rgba(255,215,0,0.5), 0 0 80px rgba(0,102,255,0.25)",
            }}
          >
            THE MULTIVERSE{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-300 via-yellow-400 to-amber-500 drop-shadow-[0_0_30px_rgba(255,215,0,0.6)]">
              CHAMPIONS
            </span>
          </h2>

          {/* Action Row: Re-trigger Confetti & Stats */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => blastConfetti(180)}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-linear-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <PartyPopper className="w-4 h-4 text-black animate-bounce" />
              <span>Celebrate Champions</span>
            </button>
          </div>
        </div>

        <div className="w-full relative mb-12">
          {/* Stage Lighting Ground Halo */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-32 bg-linear-to-t from-white/10 via-amber-400/5 to-transparent rounded-full blur-2xl pointer-events-none"></div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.18fr_1fr] lg:grid-cols-[1fr_1.24fr_1fr] gap-6 lg:gap-8 items-end max-w-6xl lg:max-w-7xl mx-auto relative z-10">
            <div className="podium-pillar order-2 md:order-1 flex flex-col items-center">
              {/* Floating Rank Badge */}
              <div className="mb-4 flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border-2 border-cyan-400 shadow-[0_0_30px_rgba(56,189,248,0.5)] flex items-center justify-center backdrop-blur-md relative group transform -rotate-3 hover:rotate-0 transition-transform">
                  <Star className="w-8 h-8 text-cyan-300 drop-shadow-[0_0_10px_#38BDF8]" />
                  <span className="absolute -bottom-2 px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-400 text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-widest">
                    2ND
                  </span>
                </div>
              </div>

              {/* Main Card */}
              <div
                className={`w-full rounded-3xl p-6 sm:p-7 border ${secondPlace.theme.border} bg-linear-to-b from-black/80 via-black/90 to-cyan-950/40 backdrop-blur-xl shadow-[0_0_45px_rgba(56,189,248,0.25)] flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_60px_rgba(56,189,248,0.4)] hover:-translate-y-2`}
              >
                {/* Arc Reactor Neon Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent"></div>

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 font-bold bg-cyan-500/20 px-3 py-1 rounded-full border border-cyan-400/40">
                      TRACK: {secondPlace.track}
                    </span>
                    <span className="text-xs font-mono text-white/50 tracking-wider">
                      {secondPlace.prizeTitle}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white mb-1">
                    {secondPlace.name}
                  </h3>

                  {secondPlace.lead && (
                    <div className="text-[11px] font-mono text-cyan-300/90 mb-2">
                      LEAD:{" "}
                      <span className="text-white font-bold">
                        {secondPlace.lead}
                      </span>
                    </div>
                  )}

                  <p className="text-xs text-white/70 font-mono mb-5 line-clamp-2">
                    {secondPlace.tagline}
                  </p>

                  {/* Cash Prize Display */}
                  <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 mb-5 text-center">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-300/80 mb-0.5">
                      CASH REWARD WON
                    </div>
                    <div className="text-3xl sm:text-4xl font-black font-mono text-cyan-300 drop-shadow-[0_0_15px_rgba(56,189,248,0.6)]">
                      {secondPlace.amount}
                    </div>
                  </div>
                </div>

                {/* 3D Physical Podium Base Block */}
                <div className="w-full mt-4 pt-4 border-t border-cyan-500/20 flex flex-col items-center">
                  <div className="w-full py-6 rounded-2xl bg-linear-to-b from-cyan-500/20 via-black to-cyan-950/60 border border-cyan-400/40 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
                    <span className="text-6xl sm:text-7xl font-black font-mono text-cyan-400/40 select-none">
                      2
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-cyan-300 font-bold uppercase -mt-2">
                      FIRST RUNNER UP
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================== */}
            {/* 1ST PLACE: INNOVISION (SUPREME GOLD / GRAND CHAMPION)       */}
            {/* ========================================================== */}
            <div className="podium-pillar order-1 md:order-2 flex flex-col items-center md:-translate-y-8 lg:-translate-y-12 w-full max-w-lg md:max-w-none">
              {/* Floating Grand Crown & Trophy */}
              <div className="mb-4 flex flex-col items-center relative">
                <div className="absolute -inset-4 bg-amber-400/25 rounded-full blur-xl animate-pulse"></div>
                <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-amber-400 via-yellow-300 to-amber-600 p-0.5 shadow-[0_0_50px_rgba(255,215,0,0.7)] backdrop-blur-md relative group transform hover:scale-110 transition-transform">
                  <div className="w-full h-full rounded-[22px] bg-black/85 flex items-center justify-center">
                    <Crown className="w-10 h-10 text-amber-300 drop-shadow-[0_0_15px_#FFD700] animate-pulse" />
                  </div>
                  <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-linear-to-r from-amber-500 to-yellow-400 text-black text-[11px] font-black tracking-widest uppercase shadow-[0_0_15px_#FFD700]">
                    CHAMPION
                  </span>
                </div>
              </div>

              {/* Main Card */}
              <div
                className={`w-full rounded-3xl p-7 sm:p-9 lg:p-9 border-2 ${firstPlace.theme.border} bg-linear-to-b from-amber-500/20 via-black/90 to-amber-950/50 backdrop-blur-2xl shadow-[0_0_70px_rgba(255,215,0,0.4)] flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_90px_rgba(255,215,0,0.55)] hover:-translate-y-3`}
              >
                {/* Glowing Golden Top Arc */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-transparent via-amber-300 to-transparent shadow-[0_0_15px_#FFD700]"></div>

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300 font-extrabold bg-amber-500/25 px-3.5 py-1 rounded-full border border-amber-400/60 shadow-[0_0_15px_rgba(255,215,0,0.3)]">
                      TRACK: {firstPlace.track}
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-400 tracking-wider flex items-center gap-1.5">
                      <Trophy className="w-4 h-4 text-amber-300" />
                      GRAND PRIZE
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-1">
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-300 via-yellow-200 to-amber-400 drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">
                      {firstPlace.name}
                    </span>
                  </h3>

                  {firstPlace.lead && (
                    <div className="text-xs font-mono text-amber-300/90 mb-3">
                      LEAD:{" "}
                      <span className="text-white font-bold">
                        {firstPlace.lead}
                      </span>
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-white/80 font-mono mb-6">
                    {firstPlace.tagline}
                  </p>

                  {/* Cash Prize Display (Massive Gold) */}
                  <div className="p-5 rounded-2xl bg-linear-to-r from-amber-500/20 via-yellow-400/15 to-amber-600/20 border-2 border-amber-400/50 mb-6 text-center relative overflow-hidden shadow-[0_0_30px_rgba(255,215,0,0.25)]">
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-amber-400/20 rounded-full blur-xl"></div>
                    <div className="text-[11px] font-mono uppercase tracking-widest text-amber-300 font-bold mb-1">
                      GRAND PRIZE CASH PURSE
                    </div>
                    <div className="text-4xl sm:text-5xl md:text-6xl font-black font-mono text-transparent bg-clip-text bg-linear-to-r from-amber-200 via-yellow-300 to-amber-400 drop-shadow-[0_0_25px_rgba(255,215,0,0.7)]">
                      {firstPlace.amount}
                    </div>
                  </div>
                </div>

                {/* 3D Physical Podium Base Block (Tallest, Gold Emblem) */}
                <div className="w-full mt-4 pt-4 border-t border-amber-500/30 flex flex-col items-center">
                  <div className="w-full py-8 sm:py-10 rounded-2xl bg-linear-to-b from-amber-500/30 via-black to-amber-950/70 border-2 border-amber-400/50 flex flex-col items-center justify-center relative overflow-hidden shadow-[0_0_30px_rgba(255,215,0,0.2)]">
                    <span className="text-7xl sm:text-8xl font-black font-mono text-amber-400/50 select-none">
                      1
                    </span>
                    <span className="text-xs font-mono tracking-[0.25em] text-amber-300 font-black uppercase -mt-3 shadow-text">
                      GRAND CHAMPION
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================== */}
            {/* 3RD PLACE: THE GRIX (INFINITY BRONZE / CRIMSON-AMBER)       */}
            {/* ========================================================== */}
            <div className="podium-pillar order-3 md:order-3 flex flex-col items-center">
              {/* Floating Rank Badge */}
              <div className="mb-4 flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-amber-600/20 border-2 border-amber-600 shadow-[0_0_30px_rgba(245,158,11,0.4)] flex items-center justify-center backdrop-blur-md relative group transform rotate-3 hover:rotate-0 transition-transform">
                  <Shield className="w-8 h-8 text-amber-500 drop-shadow-[0_0_10px_#F59E0B]" />
                  <span className="absolute -bottom-2 px-2 py-0.5 rounded-full bg-amber-950 border border-amber-600 text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
                    3RD
                  </span>
                </div>
              </div>

              {/* Main Card */}
              <div
                className={`w-full rounded-3xl p-6 sm:p-7 border ${thirdPlace.theme.border} bg-linear-to-b from-black/80 via-black/90 to-amber-950/40 backdrop-blur-xl shadow-[0_0_45px_rgba(245,158,11,0.2)] flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_60px_rgba(245,158,11,0.35)] hover:-translate-y-2`}
              >
                {/* Neon Top Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-amber-600 to-transparent"></div>

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold bg-amber-600/20 px-3 py-1 rounded-full border border-amber-600/40">
                      TRACK: {thirdPlace.track}
                    </span>
                    <span className="text-xs font-mono text-white/50 tracking-wider">
                      {thirdPlace.prizeTitle}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white mb-1">
                    {thirdPlace.name}
                  </h3>

                  {thirdPlace.lead && (
                    <div className="text-[11px] font-mono text-amber-400/90 mb-2">
                      LEAD:{" "}
                      <span className="text-white font-bold">
                        {thirdPlace.lead}
                      </span>
                    </div>
                  )}

                  <p className="text-xs text-white/70 font-mono mb-5 line-clamp-2">
                    {thirdPlace.tagline}
                  </p>

                  {/* Cash Prize Display */}
                  <div className="p-4 rounded-2xl bg-amber-600/10 border border-amber-600/30 mb-5 text-center">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400/80 mb-0.5">
                      CASH REWARD WON
                    </div>
                    <div className="text-3xl sm:text-4xl font-black font-mono text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                      {thirdPlace.amount}
                    </div>
                  </div>
                </div>

                {/* 3D Physical Podium Base Block */}
                <div className="w-full mt-4 pt-4 border-t border-amber-600/20 flex flex-col items-center">
                  <div className="w-full py-5 rounded-2xl bg-linear-to-b from-amber-600/20 via-black to-amber-950/60 border border-amber-600/40 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
                    <span className="text-6xl sm:text-7xl font-black font-mono text-amber-600/40 select-none">
                      3
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-amber-400 font-bold uppercase -mt-2">
                      SECOND RUNNER UP
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* TOURNAMENT SUMMARY TELEMETRY GRID                              */}
        {/* ============================================================== */}
        <div className="w-full max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-amber-400/30 shadow-[0_0_20px_rgba(255,215,0,0.15)] flex flex-col items-center text-center">
            <Trophy className="w-5 h-5 text-amber-400 mb-2" />
            <span className="text-2xl sm:text-3xl font-black font-mono text-white">
              ₹15,000
            </span>
            <span className="text-[10px] font-mono text-white/60 tracking-wider uppercase mt-1">
              Total Prize Pool
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-intel-blue/30 shadow-[0_0_20px_rgba(0,102,255,0.15)] flex flex-col items-center text-center">
            <Flame className="w-5 h-5 text-intel-blue-light mb-2" />
            <span className="text-2xl sm:text-3xl font-black font-mono text-white">
              30 Hours
            </span>
            <span className="text-[10px] font-mono text-white/60 tracking-wider uppercase mt-1">
              Continuous Sprint
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-power-red/30 shadow-[0_0_20px_rgba(225,6,0,0.15)] flex flex-col items-center text-center">
            <Users2 className="w-5 h-5 text-power-red-light mb-2" />
            <span className="text-2xl sm:text-3xl font-black font-mono text-white">
              25 Teams
            </span>
            <span className="text-[10px] font-mono text-white/60 tracking-wider uppercase mt-1">
              Competing Squads
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.15)] flex flex-col items-center text-center">
            <Award className="w-5 h-5 text-purple-400 mb-2" />
            <span className="text-2xl sm:text-3xl font-black font-mono text-white">
              3 Champions
            </span>
            <span className="text-[10px] font-mono text-white/60 tracking-wider uppercase mt-1">
              Multiverse Conquerors
            </span>
          </div>
        </div>


      </div>
    </section>
  );
}
