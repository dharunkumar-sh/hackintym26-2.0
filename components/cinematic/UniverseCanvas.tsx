"use client"

import { useState, useEffect, forwardRef, memo } from "react"
import { Canvas } from "@react-three/fiber"
import { ParticleField } from "./ParticleField"
import { MultiverseNexus } from "./MultiverseNexus"
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing"
import { PerspectiveCamera } from "@react-three/drei"
import * as THREE from "three"
import { detectPerformanceConfig, PerformanceConfig } from "@/lib/performance"
import { CanvasErrorBoundary } from "./CanvasErrorBoundary"

// Filter out internal THREE.Clock deprecation warnings logged by R3F store in Three.js r185+
if (typeof window !== "undefined") {
  const originalWarn = console.warn
  console.warn = (...args: any[]) => {
    if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) {
      return
    }
    originalWarn(...args)
  }
}

interface UniverseCanvasProps {
  progressRef: React.MutableRefObject<number>
  bloomIntensityRef: React.MutableRefObject<number>
  scrollRef?: React.MutableRefObject<number>
  trackHoverRef?: React.MutableRefObject<string | null>
  active?: boolean
}

export const UniverseCanvas = memo(
  forwardRef<THREE.PerspectiveCamera, UniverseCanvasProps>(
    ({ progressRef, bloomIntensityRef, scrollRef, trackHoverRef, active = true }, cameraRef) => {
      const [config, setConfig] = useState<PerformanceConfig>({
        tier: "BALANCED",
        particleCount: 2000,
        dpr: 1.0,
        enableBloom: true,
        bloomIntensity: 0.8,
        reducedMotion: false
      })

      useEffect(() => {
        setConfig(detectPerformanceConfig())
      }, [])

      return (
        <div className={`absolute inset-0 z-0 bg-background pointer-events-none transition-opacity duration-700 ${active ? "opacity-100" : "opacity-0"}`}>
          <CanvasErrorBoundary>
            <Canvas
              frameloop={active ? "always" : "demand"}
              gl={{ 
                antialias: false, 
                powerPreference: "high-performance",
                alpha: false
              }}
              dpr={config.dpr}
            >
              <color attach="background" args={["#010102"]} />
              <fog attach="fog" args={["#010102", 5, 40]} />
              
              <PerspectiveCamera 
                ref={cameraRef} 
                makeDefault 
                position={[0, 0, 15]} 
                fov={60} 
              />

              <ambientLight intensity={0.1} />
              <directionalLight position={[10, 10, 5]} intensity={0.2} color="#00C8FF" />
              <directionalLight position={[-10, 10, 5]} intensity={0.2} color="#FF2A2A" />

              <ParticleField progressRef={progressRef} scrollRef={scrollRef} trackHoverRef={trackHoverRef} />
              <MultiverseNexus progressRef={progressRef} scrollRef={scrollRef} trackHoverRef={trackHoverRef} />

              <EffectComposer multisampling={0}>
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
              </EffectComposer>
            </Canvas>
          </CanvasErrorBoundary>
        </div>
      )
    }
  )
)

UniverseCanvas.displayName = "UniverseCanvas"
