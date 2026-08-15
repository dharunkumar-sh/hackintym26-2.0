"use client"

import { useRef, useEffect, useState, memo, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { PerspectiveCamera } from "@react-three/drei"
import * as THREE from "three"
import gsap from "gsap"
import { SpidermanModel } from "./SpidermanModel"
import { CanvasErrorBoundary } from "./CanvasErrorBoundary"

interface SpidermanIntroCanvasProps {
  onWebShootComplete: () => void
  active: boolean
}

export const SpidermanIntroCanvas = memo(function SpidermanIntroCanvas({
  onWebShootComplete,
  active,
}: SpidermanIntroCanvasProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  const [isShooting, setIsShooting] = useState(false)
  const webImpactProgress = useRef(0)
  const hasTriggeredRef = useRef(false)

  // Cinematic slow, smooth web-shooting sequence
  useEffect(() => {
    if (hasTriggeredRef.current) return
    hasTriggeredRef.current = true

    const tl = gsap.timeline({
      onComplete: () => {
        onWebShootComplete()
      },
    })

    // Phase 1: Hero Showcase & Camera subtle drift (0.0s - 1.2s)
    if (cameraRef.current) {
      tl.to(
        cameraRef.current.position,
        {
          z: 6.8,
          duration: 1.2,
          ease: "power1.out",
        },
        "0.0"
      )
    }

    // Phase 2: Spider-Man aims and charges web-shooter (0.8s)
    tl.to({}, { duration: 0.6, onComplete: () => setIsShooting(true) }, "0.8")

    // Phase 3: Web projectile travels through 3D space toward camera (1.2s -> 2.2s)
    tl.to(
      webImpactProgress,
      {
        current: 0.5,
        duration: 1.0,
        ease: "power2.inOut",
      },
      "1.2"
    )

    // Phase 4: Web lattice impacts & blossoms across screen (2.2s -> 3.2s)
    tl.to(
      webImpactProgress,
      {
        current: 1.0,
        duration: 1.0,
        ease: "power3.out",
      },
      "2.2"
    )

    // Phase 5: Clear delay hold where web is fully adhered, glowing & vibrating on screen (3.2s -> 4.4s)
    tl.to({}, { duration: 1.2 }, "3.2")

    // Phase 6: Camera glides smoothly through the web into the light to reveal page (4.4s -> 5.6s)
    if (cameraRef.current) {
      tl.to(
        cameraRef.current.position,
        {
          z: 0.1,
          duration: 1.2,
          ease: "power3.inOut",
        },
        "4.4"
      )
    }
  }, [onWebShootComplete])

  return (
    <div className="absolute inset-0 z-0 bg-[#020205] pointer-events-none">
      <CanvasErrorBoundary>
        <Canvas
          frameloop={active ? "always" : "demand"}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            alpha: false,
          }}
          dpr={typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 1.5) : 1}
        >
          <color attach="background" args={["#020206"]} />
          <fog attach="fog" args={["#020206", 6, 22]} />

          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[0, 0, 7.8]}
            fov={45}
          />

          {/* REALISTIC PBR LIGHTING & MARVEL STUDIO AESTHETICS */}
          <ambientLight intensity={1.4} />
          
          {/* Main Front Key Light - Sharp White/Silver */}
          <directionalLight
            position={[0, 2, 6]}
            intensity={3.2}
            color="#ffffff"
          />

          {/* Key Light - Cool Stark Arc Cyan */}
          <directionalLight
            position={[5, 6, 4]}
            intensity={2.6}
            color="#a8ecff"
          />

          {/* Rim Light - Hot Comic Red */}
          <directionalLight
            position={[-5, -2, -3]}
            intensity={3.8}
            color="#ff2233"
          />

          {/* Top Blue Accent */}
          <directionalLight
            position={[0, 7, -2]}
            intensity={2.0}
            color="#0066ff"
          />

          {/* REAL 3D SPIDER-MAN MODEL */}
          <Suspense fallback={null}>
            <SpidermanModel
              isShooting={isShooting}
              webImpactProgress={webImpactProgress}
            />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  )
})
