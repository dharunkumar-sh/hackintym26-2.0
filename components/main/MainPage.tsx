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
import { DevelopmentTeamSection } from "./DevelopmentTeamSection"
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

  // Manage scroll lock during loading state
  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [isLoaded])

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

      gsap.set(h1, { opacity: 0, scale: 4, filter: "blur(20px)", z: 500 })
      gsap.set(mission, { opacity: 0, scaleX: 0, filter: "blur(10px)" })
      if (words) gsap.set(words, { opacity: 0, scale: 0.5, rotationX: -90, y: "50%" })
      gsap.set(ctaRef.current, { opacity: 0, scale: 0.8, y: 50 })
      gsap.set(hudRef.current, { opacity: 0, y: -50 })

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

      // 4. Reveal Typography & CTA - Massive Scale Down & Slam
      if (h1) tl.to(h1, { opacity: 1, scale: 1, filter: "blur(0px)", z: 0, duration: 2, ease: "expo.out" }, "4.0")
      
      // Camera Shake Effect via proxy object for dramatic impact
      const shakeProxy = { val: 0 }
      tl.to(shakeProxy, {
        val: 100,
        duration: 0.8,
        onUpdate: () => {
          if (cameraRef.current) {
            cameraRef.current.position.x = (Math.random() - 0.5) * 0.3 * (1 - shakeProxy.val / 100);
            cameraRef.current.position.y = (Math.random() - 0.5) * 0.3 * (1 - shakeProxy.val / 100);
          }
        },
        onComplete: () => {
          if (cameraRef.current) {
            cameraRef.current.position.x = 0;
            cameraRef.current.position.y = 0;
          }
        }
      }, "4.0")

      if (mission) tl.to(mission, { opacity: 1, scaleX: 1, filter: "blur(0px)", duration: 1.5, ease: "expo.out" }, "4.5")
      if (words && words.length > 0) {
        tl.to(words, { opacity: 1, scale: 1, rotationX: 0, y: "0%", duration: 1, stagger: 0.2, ease: "back.out(2)" }, "4.8")
      }
      if (ctaRef.current) tl.to(ctaRef.current, { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power3.out" }, "5.5")
      if (hudRef.current) tl.to(hudRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "5.5")

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
    <main ref={containerRef} className="relative bg-background text-foreground selection:bg-intel-blue selection:text-white overflow-x-hidden">
      
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
        <section className="relative py-24 px-6 z-10 my-12">
          <div className="max-w-4xl mx-auto glass-panel p-12 text-center border border-intel-blue/30 relative overflow-hidden group shadow-[0_0_50px_rgba(0,102,255,0.2)]">
            <div className="absolute inset-0 bg-gradient-to-r from-intel-blue/10 via-power-red/10 to-intel-blue/10 opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col items-center gap-4">
              <span className="px-4 py-1 rounded-full bg-intel-blue/20 border border-intel-blue-light/40 text-intel-blue-light font-mono text-xs tracking-widest uppercase">
                PORTAL DETECTED
              </span>

              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white">
                The Multiverse Nexus
              </h2>

              <p className="text-intel-blue-light font-mono text-sm md:text-base tracking-widest uppercase max-w-xl">
                SELECT A UNIVERSE ABOVE TO BEGIN YOUR MISSION AND ACCESS EXCLUSIVE TRACK INTEL.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <a
                  href="#tracks"
                  className="px-6 py-3 rounded bg-intel-blue hover:bg-intel-blue-light text-white font-mono text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(0,102,255,0.5)] transition-all cursor-pointer"
                >
                  VIEW UNIVERSE TRACKS
                </a>
                <a
                  href="#countdown"
                  className="px-6 py-3 rounded bg-power-red/80 hover:bg-power-red text-white font-mono text-xs font-bold tracking-widest uppercase border border-power-red/50 shadow-[0_0_20px_rgba(255,0,51,0.4)] transition-all cursor-pointer"
                >
                  REGISTER FOR HACKATHON
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 8. MISSION TIMELINE */}
        <MissionTimeline />

        {/* 9. HACKATHON ARENA */}
        <HackathonArena />

        {/* 10. INFINITY REWARDS */}
        <PrizeSection />

        {/* 11. DEVELOPMENT TEAM */}
        <DevelopmentTeamSection />

        {/* 16. FINAL CTA */}
        <FinalCTA />

      </div>
    </main>
  )
}
