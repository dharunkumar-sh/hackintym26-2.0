"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { HeaderNav } from "./HeaderNav"
import { HeroSection } from "./HeroSection"
import { EventPosterSection } from "./EventPosterSection"
import { MissionCountdown } from "./MissionCountdown"
import { TheMission } from "./TheMission"
import { CommandCenter } from "./CommandCenter"
import { MultiverseTracks } from "./MultiverseTracks"
import { MissionTimeline } from "./MissionTimeline"
import { HackathonArena } from "./HackathonArena"
import { PrizeSection } from "./PrizeSection"
import { DevelopmentTeamSection } from "./DevelopmentTeamSection"
import { FinalCTA } from "./FinalCTA"
import { Footer } from "./Footer"

import { LoadingOverlay } from "@/components/cinematic/LoadingOverlay"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger)
}

export function MainPage() {
  const [introOverlayActive, setIntroOverlayActive] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  // Stable callback for loading completion
  const handleLoaded = useCallback(() => {
    setIsLoaded(true)
  }, [])

  // Manage scroll state during loading & intro animation
  useEffect(() => {
    if (!isLoaded || introOverlayActive) {
      document.body.style.overflow = "hidden"
      document.documentElement.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
    }
  }, [isLoaded, introOverlayActive])

  const scrollRef = useRef(0)
  
  // Hero DOM Element Refs for intro animation
  const typographyRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const hudRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })

  // GSAP Intro Timeline (Runs ONCE when loaded)
  useGSAP(() => {
    if (!isLoaded || !containerRef.current) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const ctx = gsap.context(() => {
      const h1 = typographyRef.current?.querySelector("h1")
      const mission = typographyRef.current?.querySelector("[data-hero-mission]")
      const words = typographyRef.current?.querySelectorAll(".tagline-word")

      // Safety fallback: if animation fails to complete within 8s, force-reveal everything
      const safetyTimer = setTimeout(() => {
        if (h1) gsap.set(h1, { opacity: 1, scale: 1, y: 0, clearProps: "willChange" })
        if (mission) gsap.set(mission, { opacity: 1, scaleX: 1, y: 0, clearProps: "willChange" })
        if (words) gsap.set(words, { opacity: 1, scale: 1, rotationX: 0, y: "0%", clearProps: "willChange" })
        if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 1, scale: 1, y: 0, clearProps: "willChange" })
        if (hudRef.current) gsap.set(hudRef.current, { opacity: 1, y: 0, clearProps: "willChange" })
        setIntroOverlayActive(false)
      }, 8000)

      if (prefersReducedMotion) {
        clearTimeout(safetyTimer)
        gsap.set([h1, mission, words, ctaRef.current, hudRef.current], { opacity: 1, y: 0, scale: 1 })
        setIntroOverlayActive(false)
        return
      }

      // Fast hardware-accelerated initial states
      if (h1) gsap.set(h1, { opacity: 0, y: 15, willChange: "transform, opacity" })
      if (mission) gsap.set(mission, { opacity: 0, y: 10, willChange: "transform, opacity" })
      if (words) gsap.set(words, { opacity: 0, y: 12, willChange: "transform, opacity" })
      if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 0, y: 15, willChange: "transform, opacity" })
      if (hudRef.current) gsap.set(hudRef.current, { opacity: 0, y: -15, willChange: "transform, opacity" })

      const tl = gsap.timeline({
        onComplete: () => {
          clearTimeout(safetyTimer)
          setIntroOverlayActive(false)
          if (h1) gsap.set(h1, { opacity: 1, scale: 1, y: 0, clearProps: "willChange" })
          if (mission) gsap.set(mission, { opacity: 1, scaleX: 1, y: 0, clearProps: "willChange" })
          if (words) gsap.set(words, { opacity: 1, scale: 1, y: 0, clearProps: "willChange" })
          if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 1, scale: 1, y: 0, clearProps: "willChange" })
          if (hudRef.current) gsap.set(hudRef.current, { opacity: 1, y: 0, clearProps: "willChange" })
        }
      })

      // 1. Reveal Typography, Header & CTA in Smooth Sync (pure GPU y-translate & opacity)
      if (hudRef.current) tl.to(hudRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "0.05")
      if (h1) tl.to(h1, { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" }, "0.05")
      if (mission) tl.to(mission, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, "0.15")
      if (words && words.length > 0) {
        tl.to(words, { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: "power2.out" }, "0.2")
      }
      if (ctaRef.current) tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, "0.3")

    }, containerRef)

    return () => ctx.revert()
  }, { dependencies: [isLoaded], scope: containerRef })

  // Track global scroll
  useGSAP(() => {
    if (!containerRef.current) return

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollRef.current = self.progress
      }
    })
  }, { scope: containerRef })

  return (
    <main ref={containerRef} className="relative bg-background text-foreground selection:bg-intel-blue selection:text-white overflow-x-hidden">
      
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-80 transform-gpu will-change-transform">
        {/* Top Radial Blue Cosmic Light */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_top,rgba(0,102,255,0.2)_0%,rgba(0,200,255,0.06)_50%,transparent_75%)] blur-[60px] transform-gpu"></div>
        
        {/* Power Red Side Energy Glow */}
        <div className="absolute top-[30%] -right-48 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(225,6,0,0.15)_0%,rgba(255,42,42,0.05)_50%,transparent_75%)] blur-[70px] transform-gpu"></div>
        
        {/* Arc Reactor Cyan Mid Portal Glow */}
        <div className="absolute top-[58%] -left-48 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,200,255,0.14)_0%,rgba(0,102,255,0.04)_50%,transparent_75%)] blur-[65px] transform-gpu"></div>
        
        {/* Infinity Power Purple/Red Bottom Aura */}
        <div className="absolute -bottom-40 right-10 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.14)_0%,rgba(225,6,0,0.1)_50%,transparent_75%)] blur-[75px] transform-gpu"></div>
      </div>

      {/* ISOLATED LOADING OVERLAY (Timer state updates stay local to this overlay) */}
      {!isLoaded && <LoadingOverlay onLoaded={handleLoaded} />}

      {/* DOM CONTENT (HIDDEN DURING INITIAL LOADING, FADES IN ON LOAD) */}
      <div className={`relative z-10 w-full transition-opacity duration-500 ${!isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        
        {/* STICKY HEADER NAVIGATION */}
        <HeaderNav ref={hudRef} />

        {/* 1. PERSISTENT HERO SECTION */}
        <HeroSection 
          ref={heroRef}
          typographyRef={typographyRef}
          ctaRef={ctaRef}
          hudRef={hudRef}
        />

        {/* SECTIONS BELOW HERO (REVEALED ONLY AFTER INTRO ANIMATION COMPLETES) */}
        <div className={`transition-opacity duration-700 ${introOverlayActive ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
          {/* 1.5. OFFICIAL MISSION POSTER */}
          <EventPosterSection />

          {/* 2. MARVEL-INSPIRED MISSION COUNTDOWN */}
          <MissionCountdown />

          {/* 4. THE MISSION */}
          <TheMission />

          {/* 5. MSIIC COMMAND CENTER */}
          <CommandCenter />

          {/* 6. MULTIVERSE TRACKS */}
          <MultiverseTracks />

          {/* 8. MISSION TIMELINE */}
          <MissionTimeline />

          {/* 9. HACKATHON ARENA */}
          <HackathonArena />

          {/* 10. INFINITY REWARDS */}
          <PrizeSection />

          {/* 11. ORGANIZING TEAM */}
          <DevelopmentTeamSection />

          {/* 16. FINAL CTA & CONTACT */}
          <FinalCTA />

          {/* 17. HIGH CLASS MARVEL FOOTER */}
          <Footer />
        </div>

      </div>
    </main>
  )
}
