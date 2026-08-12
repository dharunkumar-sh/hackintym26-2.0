"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { HeaderNav } from "./HeaderNav"
import { HeroSection } from "./HeroSection"
import { MissionCountdown } from "./MissionCountdown"
import { MissionStatus } from "./MissionStatus"
import { TheMission } from "./TheMission"
import { CommandCenter } from "./CommandCenter"
import { MultiverseTracks } from "./MultiverseTracks"
import { MissionTimeline } from "./MissionTimeline"
import { HackathonArena } from "./HackathonArena"
import { PrizeSection } from "./PrizeSection"
import { HallOfHeroes } from "./HallOfHeroes"
import { ChampionsSection } from "./ChampionsSection"
import { HeroAlliance } from "./HeroAlliance"
import { IntelligenceDatabase } from "./IntelligenceDatabase"
import { TransmissionCenter } from "./TransmissionCenter"
import { FinalCTA } from "./FinalCTA"

import { LoadingOverlay } from "@/components/cinematic/LoadingOverlay"
import { UniverseCanvas } from "@/components/cinematic/UniverseCanvas"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import * as THREE from "three"

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

  // Three.js Shared Refs
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  const progressRef = useRef(0)
  const bloomIntensityRef = useRef(1.5)
  const scrollRef = useRef(0)
  const trackHoverRef = useRef<string | null>(null)
  
  // Hero DOM Element Refs for intro animation
  const typographyRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const hudRef = useRef<HTMLDivElement>(null)
  const flashRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })

  // GSAP Intro Timeline (Runs ONCE when loaded)
  useGSAP(() => {
    if (!isLoaded || !containerRef.current) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const ctx = gsap.context(() => {
      const h1 = typographyRef.current?.querySelector("h1")
      const mission = typographyRef.current?.querySelector(".mt-4")
      const words = typographyRef.current?.querySelectorAll(".tagline-word")
      // Ensure hero containers are visible, but individual elements are hidden initially for timeline reveal
      gsap.set([typographyRef.current, ctaRef.current, hudRef.current], { opacity: 1 })

      if (prefersReducedMotion) {
        gsap.set([h1, mission, words, ctaRef.current, hudRef.current], { opacity: 1, y: 0 })
        progressRef.current = 1
        if (cameraRef.current) cameraRef.current.position.z = 2.5
        setIntroOverlayActive(false)
        return
      }

      gsap.set([h1, mission], { opacity: 0, y: 20 })
      if (words) gsap.set(words, { opacity: 0, y: "100%" })
      gsap.set(ctaRef.current, { opacity: 0, y: 30 })
      gsap.set(hudRef.current, { opacity: 0, y: -20 })

      const tl = gsap.timeline({
        onComplete: () => {
          setIntroOverlayActive(false)
          if (h1) gsap.set(h1, { opacity: 1, y: 0 })
          if (mission) gsap.set(mission, { opacity: 1, y: 0 })
          if (words) gsap.set(words, { opacity: 1, y: 0 })
          if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 1, y: 0 })
          if (hudRef.current) gsap.set(hudRef.current, { opacity: 1, y: 0 })
          progressRef.current = 1
        }
      })

      // 1. Materialize Nexus in 3D
      tl.to(progressRef, { current: 1, duration: 4, ease: "power2.inOut" }, "0")

      // 2. Camera Fly-in
      if (cameraRef.current) {
        tl.to(cameraRef.current.position, { z: 8, duration: 4, ease: "power2.inOut" }, "0")
      }

      // 3. Flash Transition & Portal Travel
      if (flashRef.current) {
        tl.to(flashRef.current, { opacity: 1, duration: 0.1, ease: "power1.in" }, "3.8")
          .to(flashRef.current, { opacity: 0, duration: 1.2, ease: "power3.out" }, "3.9")
      }

      if (cameraRef.current) {
        tl.to(cameraRef.current.position, { z: 2.5, duration: 1.8, ease: "power3.out" }, "3.8")
      }

      // 4. Reveal Typography & CTA
      if (h1) tl.to(h1, { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" }, "4.2")
      if (words && words.length > 0) {
        tl.to(words, { opacity: 1, y: "0%", duration: 0.7, stagger: 0.15, ease: "back.out(1.5)" }, "4.6")
      }
      if (mission) tl.to(mission, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "5.2")
      if (ctaRef.current) tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "5.5")
      if (hudRef.current) tl.to(hudRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "5.5")

    }, containerRef)

    return () => ctx.revert()
  }, { dependencies: [isLoaded], scope: containerRef })

  // Subtle Mouse Parallax during persistent Hero state
  useEffect(() => {
    if (introOverlayActive) return
    
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener("mousemove", handleMouseMove)
    
    let reqId: number
    const renderLoop = () => {
      const camera = cameraRef.current
      if (camera && scrollRef.current < 0.15) {
        const targetX = mousePos.current.x * 0.4
        const targetY = mousePos.current.y * 0.4
        camera.position.x += (targetX - camera.position.x) * 0.05
        camera.position.y += (targetY - camera.position.y) * 0.05
        camera.lookAt(0, 0, 0)
      }
      reqId = requestAnimationFrame(renderLoop)
    }
    reqId = requestAnimationFrame(renderLoop)
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(reqId)
    }
  }, [introOverlayActive])

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
    <main ref={containerRef} className="relative bg-background text-foreground selection:bg-intel-blue selection:text-white">
      
      {/* PERSISTENT 3D UNIVERSE CANVAS (MEMOIZED & STABLE) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <UniverseCanvas 
          ref={cameraRef} 
          progressRef={progressRef}
          bloomIntensityRef={bloomIntensityRef}
          scrollRef={scrollRef}
          trackHoverRef={trackHoverRef}
        />
      </div>

      {/* ISOLATED LOADING OVERLAY (Timer state updates stay local to this overlay) */}
      {!isLoaded && <LoadingOverlay onLoaded={handleLoaded} />}

      {/* FLASH TRANSITION OVERLAY */}
      <div 
        ref={flashRef}
        className="fixed inset-0 bg-white z-40 pointer-events-none opacity-0"
        style={{ mixBlendMode: "overlay" }}
      ></div>

      {/* DOM CONTENT (ALWAYS MOUNTED & PERSISTENT) */}
      <div className="relative z-10 w-full">
        
        {/* STICKY HEADER NAVIGATION */}
        <HeaderNav ref={hudRef} />

        {/* 1. PERSISTENT HERO SECTION */}
        <HeroSection 
          ref={heroRef}
          typographyRef={typographyRef}
          ctaRef={ctaRef}
          hudRef={hudRef}
        />

        {/* 2. MARVEL-INSPIRED MISSION COUNTDOWN */}
        <MissionCountdown />

        {/* 3. MISSION STATUS DASHBOARD */}
        <MissionStatus />

        {/* 4. THE MISSION */}
        <TheMission />

        {/* 5. MSIIC COMMAND CENTER */}
        <CommandCenter />

        {/* 6. MULTIVERSE TRACKS */}
        <MultiverseTracks trackHoverRef={trackHoverRef} />
        
        {/* 7. INTERACTIVE TRACK EXPLORER 3D BREAK */}
        <section className="relative h-[120vh] flex items-center justify-center pointer-events-none">
          <div className="absolute top-20 text-center z-10 pointer-events-auto">
            <h2 className="text-3xl font-black tracking-widest uppercase text-white mb-2">The Multiverse Nexus</h2>
            <p className="text-intel-blue-light font-mono text-sm tracking-widest uppercase">SELECT A UNIVERSE TO BEGIN YOUR MISSION.</p>
          </div>
        </section>

        {/* 8. MISSION TIMELINE */}
        <MissionTimeline />

        {/* 9. HACKATHON ARENA */}
        <HackathonArena />

        {/* 10. INFINITY REWARDS */}
        <PrizeSection />

        {/* 11 & 12. HALL OF HEROES */}
        <HallOfHeroes />

        {/* 13. THE CHAMPIONS */}
        <ChampionsSection />

        {/* 14. HERO ALLIANCE */}
        <HeroAlliance />

        {/* 15. INTELLIGENCE DATABASE */}
        <IntelligenceDatabase />

        {/* 16. FINAL CTA */}
        <FinalCTA />

        {/* 17. TRANSMISSION CENTER */}
        <TransmissionCenter />

        {/* UNIVERSE FOOTER */}
        <footer className="relative py-12 px-6 border-t border-white/10 glass-panel mt-32 text-center text-sm font-mono text-white/40 tracking-widest">
          <p className="mb-4">© 2026 HACKINTYM '26. ALL SYSTEMS ONLINE.</p>
          <p>BUILT BY DEVDYNASTY CLUB.</p>
        </footer>

      </div>
    </main>
  )
}
