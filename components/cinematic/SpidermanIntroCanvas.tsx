"use client"

import { useRef, useCallback, memo, Suspense, useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { PerspectiveCamera } from "@react-three/drei"
import * as THREE from "three"
import gsap from "gsap"
import { SpidermanModel } from "./SpidermanModel"
import { CanvasErrorBoundary } from "./CanvasErrorBoundary"

interface SpidermanIntroCanvasProps {
  onWebShootComplete: () => void
  active: boolean
  isLanding: boolean
  onTriggerLanding: () => void
}

export const SpidermanIntroCanvas = memo(function SpidermanIntroCanvas({
  onWebShootComplete,
  active,
  isLanding,
  onTriggerLanding,
}: SpidermanIntroCanvasProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  const landingProgress = useRef(0)
  const hasTriggeredRef = useRef(false)
  const [isHoveringModel, setIsHoveringModel] = useState(false)

  // Ensure cursor resets cleanly
  useEffect(() => {
    return () => {
      document.body.style.cursor = "default"
    }
  }, [])

  // Execute Landing and Camera zoom strictly when model is clicked
  const handleModelClick = useCallback(() => {
    if (hasTriggeredRef.current) return
    hasTriggeredRef.current = true
    setIsHoveringModel(false)
    document.body.style.cursor = "default"
    onTriggerLanding()

    const tl = gsap.timeline({
      onComplete: () => {
        onWebShootComplete()
      },
    })

    // Step 1: Turn & Superhero ground landing
    tl.to(
      landingProgress,
      {
        current: 1.0,
        duration: 0.85,
        ease: "power3.inOut",
      },
      "0.0"
    )

    // Step 2: Camera punch-in
    if (cameraRef.current) {
      tl.to(
        cameraRef.current.position,
        {
          z: 5.4,
          y: -0.3,
          duration: 0.8,
          ease: "power2.out",
        },
        "0.3"
      )
    }

    // Step 3: Hold pose for 0.5s
    tl.to({}, { duration: 0.5 }, "0.85")

    // Step 4: Camera dives into light to reveal main page
    if (cameraRef.current) {
      tl.to(
        cameraRef.current.position,
        {
          z: 0.2,
          y: -0.8,
          duration: 0.6,
          ease: "expo.in",
        },
        "1.35"
      )
    }
  }, [onWebShootComplete, onTriggerLanding])

  return (
    <div
      className={`absolute inset-0 z-0 bg-[#020205] select-none ${
        isHoveringModel ? "cursor-pointer" : "cursor-default"
      }`}
    >
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
          <fog attach="fog" args={["#020206", 6, 24]} />

          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[0, 0, 7.5]}
            fov={45}
          />

          {/* REALISTIC PBR STUDIO LIGHTING */}
          <ambientLight intensity={1.4} />
          
          <directionalLight
            position={[0, 3, 6]}
            intensity={3.4}
            color="#ffffff"
          />

          <directionalLight
            position={[5, 6, 4]}
            intensity={2.6}
            color="#a8ecff"
          />

          <directionalLight
            position={[-5, -2, -3]}
            intensity={3.8}
            color="#ff2233"
          />

          <directionalLight
            position={[0, -5, 2]}
            intensity={1.5}
            color="#0066ff"
          />

          {/* 3D SPIDER-MAN CHARACTER: POINTER CURSOR ONLY ON MODEL */}
          <Suspense fallback={null}>
            <SpidermanModel
              isLanding={isLanding}
              landingProgress={landingProgress}
              onPointerOver={() => {
                if (!hasTriggeredRef.current) {
                  setIsHoveringModel(true)
                  document.body.style.cursor = "pointer"
                }
              }}
              onPointerOut={() => {
                setIsHoveringModel(false)
                document.body.style.cursor = "default"
              }}
              onClick={handleModelClick}
            />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  )
})
