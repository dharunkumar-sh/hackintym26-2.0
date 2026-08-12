"use client"

import { useRef, useState, useEffect } from "react"
import { IntroTypography } from "./IntroTypography"
import { IntroCTA } from "./IntroCTA"
import { CinematicHUD } from "./CinematicHUD"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import * as THREE from "three"

// Custom plugin registration if needed
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP)
}

interface CinematicIntroProps {
  onComplete?: () => void
  cameraRef?: React.MutableRefObject<THREE.PerspectiveCamera | null>
  progressRef?: React.MutableRefObject<number>
}

export function CinematicIntro({ onComplete, cameraRef, progressRef }: CinematicIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Refs for GSAP animation targets
  const typographyRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const hudRef = useRef<HTMLDivElement>(null)
  const flashRef = useRef<HTMLDivElement>(null)
  
  const mousePos = useRef({ x: 0, y: 0 })
  const [isInteractive, setIsInteractive] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    let val = 0
    const interval = setInterval(() => {
      val += Math.random() * 15
      if (val >= 100) {
        val = 100
        clearInterval(interval)
        setTimeout(() => setIsLoaded(true), 500)
      }
      setLoadingProgress(Math.min(100, Math.floor(val)))
    }, 100)
    return () => clearInterval(interval)
  }, [])

  useGSAP(() => {
    if (!isLoaded || !containerRef.current) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const tl = gsap.timeline({
      onComplete: () => {
        setIsInteractive(!prefersReducedMotion)
        onComplete?.()
      }
    })

    const h1 = typographyRef.current?.querySelector("h1")
    const mission = typographyRef.current?.querySelector(".mt-4")
    const words = typographyRef.current?.querySelectorAll(".tagline-word")
    
    gsap.set([typographyRef.current, ctaRef.current, hudRef.current], { opacity: 1 })
    
    if (prefersReducedMotion) {
      gsap.set([h1, mission, words, ctaRef.current, hudRef.current], { opacity: 1, y: 0 })
      if (progressRef) gsap.set(progressRef, { current: 1 })
      if (cameraRef?.current) cameraRef.current.position.z = 2
      return
    }

    gsap.set([h1, mission], { opacity: 0, y: 20 })
    gsap.set(ctaRef.current, { opacity: 0, y: 30 })
    gsap.set(hudRef.current, { opacity: 0, y: -20 })

    if (progressRef) {
      tl.to(progressRef, { current: 1, duration: 5, ease: "power2.inOut" }, "0")
    }

    if (cameraRef?.current) {
      tl.to(cameraRef.current.position, { z: 8, duration: 5, ease: "power2.inOut" }, "0")
    }

    tl.to(flashRef.current, { opacity: 1, duration: 0.1, ease: "power1.in" }, "4.5")
      .to(flashRef.current, { opacity: 0, duration: 1.5, ease: "power3.out" }, "4.6")

    if (cameraRef?.current) {
      tl.to(cameraRef.current.position, { z: 2, duration: 2, ease: "power3.out" }, "4.5")
    }

    if (h1) {
      tl.to(h1, { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" }, "5.0")
    }
    
    if (words && words.length > 0) {
      tl.to(words, { y: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.5)" }, "5.5")
    }
    
    if (mission) {
      tl.to(mission, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "6.2")
    }
    
    tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "6.5")
    tl.to(hudRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "6.5")

  }, { dependencies: [isLoaded], scope: containerRef })

  useEffect(() => {
    if (!isInteractive) return
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener("mousemove", handleMouseMove)
    
    let reqId: number
    const renderLoop = () => {
      const camera = cameraRef?.current
      if (camera) {
        const targetX = mousePos.current.x * 0.5
        const targetY = mousePos.current.y * 0.5
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
  }, [isInteractive, cameraRef])

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 border-t-2 border-intel-blue rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-b-2 border-power-red rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }}></div>
        </div>
        <div className="text-intel-blue-light font-mono tracking-widest text-sm animate-pulse">
          INITIALIZING NEXUS...
        </div>
        <div className="text-white/50 font-mono text-xs mt-2">
          {loadingProgress}%
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
      <CinematicHUD ref={hudRef} />
      <IntroTypography ref={typographyRef} />
      <IntroCTA ref={ctaRef} />

      <div 
        ref={flashRef}
        className="absolute inset-0 bg-white z-40 pointer-events-none opacity-0"
        style={{ mixBlendMode: "overlay" }}
      ></div>
    </div>
  )
}
