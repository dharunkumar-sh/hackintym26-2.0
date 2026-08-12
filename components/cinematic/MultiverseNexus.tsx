"use client"

import { useRef, useMemo, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface MultiverseNexusProps {
  progressRef: React.MutableRefObject<number>
  scrollRef?: React.MutableRefObject<number>
  trackHoverRef?: React.MutableRefObject<string | null>
}

export function MultiverseNexus({ progressRef, scrollRef, trackHoverRef }: MultiverseNexusProps) {
  const groupRef = useRef<THREE.Group>(null)
  
  const outerRingRef = useRef<THREE.Mesh>(null)
  const innerRingRef = useRef<THREE.Mesh>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  // Track colors for hover effects
  const trackColors: Record<string, THREE.Color> = useMemo(() => ({
    "AI": new THREE.Color("#00C8FF"),
    "CYBER": new THREE.Color("#FF2A2A"),
    "HEALTH": new THREE.Color("#0066FF"),
    "SOCIAL": new THREE.Color("#4ade80"),
    "OPEN": new THREE.Color("#ffffff")
  }), [])

  const defaultGlowColor = useMemo(() => new THREE.Color("#0066FF"), [])
  const targetGlowColor = useRef<THREE.Color>(new THREE.Color("#0066FF"))

  // Resource Disposal on unmount
  useEffect(() => {
    return () => {
      [outerRingRef, innerRingRef, coreRef, glowRef].forEach((ref) => {
        if (ref.current) {
          ref.current.geometry.dispose()
          if (Array.isArray(ref.current.material)) {
            ref.current.material.forEach((m) => m.dispose())
          } else {
            ref.current.material.dispose()
          }
        }
      })
    }
  }, [])
  
  useFrame((state) => {
    if (!groupRef.current) return
    
    // Tab Visibility API
    if (typeof document !== "undefined" && document.hidden) return

    const scroll = scrollRef?.current || 0
    const progress = progressRef.current

    // PERFORMANCE OPTIMIZATION: Only animate 3D Nexus when in Hero section (scroll <= 0.05)
    if (scroll > 0.05 && progress >= 0.99) {
      return
    }

    const time = state.clock.elapsedTime
    const activeTrack = trackHoverRef?.current
    
    const rotationSpeed = THREE.MathUtils.lerp(0.5, 3.0, progress)
    
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = time * rotationSpeed * 0.2
      outerRingRef.current.rotation.y = time * rotationSpeed * 0.3
      outerRingRef.current.rotation.z = time * rotationSpeed * 0.1
    }
    
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x = time * rotationSpeed * -0.4
      innerRingRef.current.rotation.y = time * rotationSpeed * -0.2
      innerRingRef.current.rotation.z = time * rotationSpeed * 0.5
    }
    
    // Core pulsing and scale based on progress
    if (coreRef.current) {
      const pulse = Math.sin(time * 5) * 0.05
      const targetScale = THREE.MathUtils.lerp(0.1, 1.0, progress)
      coreRef.current.scale.setScalar(targetScale + pulse)
    }

    // Color transition for glow based on track selection
    if (glowRef.current) {
      if (activeTrack && trackColors[activeTrack]) {
        targetGlowColor.current.copy(trackColors[activeTrack])
      } else {
        targetGlowColor.current.copy(defaultGlowColor)
      }
      
      const mat = glowRef.current.material as THREE.MeshBasicMaterial
      mat.color.lerp(targetGlowColor.current, 0.05)
      mat.opacity = THREE.MathUtils.lerp(0.3, 0.8, activeTrack ? 1 : 0)
    }
    
    // Group scale based on progress
    const groupScale = THREE.MathUtils.lerp(0.01, 1, Math.min(1, progress * 1.5))
    groupRef.current.scale.setScalar(groupScale)
    
    groupRef.current.position.y = scroll * 5
  })

  return (
    <group ref={groupRef}>
      {/* Outer Energy Ring (Blue) */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[4, 0.05, 16, 100]} />
        <meshBasicMaterial 
          color="#00C8FF" 
          transparent 
          opacity={0.6} 
          blending={THREE.AdditiveBlending} 
          side={THREE.DoubleSide} 
        />
      </mesh>
      
      {/* Inner Energy Ring (Red) */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[3, 0.08, 16, 100]} />
        <meshBasicMaterial 
          color="#FF2A2A" 
          transparent 
          opacity={0.8} 
          blending={THREE.AdditiveBlending} 
          side={THREE.DoubleSide} 
        />
      </mesh>
      
      {/* Central Dark Sphere (The Portal/Singularity) */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshBasicMaterial color="#010103" />
      </mesh>
      
      {/* Event Horizon Glow (Additive Sphere) */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.6, 32, 32]} />
        <meshBasicMaterial 
          color="#0066FF" 
          transparent 
          opacity={0.3} 
          blending={THREE.AdditiveBlending} 
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}
