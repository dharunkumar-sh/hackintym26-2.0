"use client"

import { useRef, useMemo, useEffect, useState } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { detectPerformanceConfig } from "@/lib/performance"

interface ParticleFieldProps {
  progressRef: React.MutableRefObject<number>
  scrollRef?: React.MutableRefObject<number>
  trackHoverRef?: React.MutableRefObject<string | null>
}

export function ParticleField({ progressRef, scrollRef, trackHoverRef }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const [particleCount, setParticleCount] = useState(2000)

  useEffect(() => {
    const config = detectPerformanceConfig()
    setParticleCount(config.particleCount)
  }, [])
  
  const { positions, colors, speeds, initialPositions, baseColors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const initialPositions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const baseColors = new Float32Array(particleCount * 3)
    const speeds = new Float32Array(particleCount)
    
    const colorBlue = new THREE.Color("#00C8FF")
    const colorRed = new THREE.Color("#FF2A2A")
    
    for (let i = 0; i < particleCount; i++) {
      const isBlue = i < particleCount / 2
      
      const startX = isBlue ? -20 - Math.random() * 20 : 20 + Math.random() * 20
      const startY = (Math.random() - 0.5) * 20
      const startZ = (Math.random() - 0.5) * 20
      
      positions[i * 3] = startX
      positions[i * 3 + 1] = startY
      positions[i * 3 + 2] = startZ
      
      initialPositions[i * 3] = startX
      initialPositions[i * 3 + 1] = startY
      initialPositions[i * 3 + 2] = startZ
      
      const c = isBlue ? colorBlue : colorRed
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b

      baseColors[i * 3] = c.r
      baseColors[i * 3 + 1] = c.g
      baseColors[i * 3 + 2] = c.b
      
      speeds[i] = 0.01 + Math.random() * 0.03
    }
    
    return { positions, colors, speeds, initialPositions, baseColors }
  }, [particleCount])

  // Track colors for hover effects
  const trackColors: Record<string, THREE.Color> = useMemo(() => ({
    "AI": new THREE.Color("#00C8FF"),
    "CYBER": new THREE.Color("#FF2A2A"),
    "HEALTH": new THREE.Color("#0066FF"),
    "SOCIAL": new THREE.Color("#4ade80"),
    "OPEN": new THREE.Color("#ffffff")
  }), [])

  const currentColor = useRef<THREE.Color>(new THREE.Color())
  const targetColor = useRef<THREE.Color>(new THREE.Color())
  const mixFactor = useRef(0)
  const isPositionsFinalized = useRef(false)

  // Explicit GPU Resource Disposal
  useEffect(() => {
    return () => {
      if (pointsRef.current) {
        pointsRef.current.geometry.dispose()
        if (Array.isArray(pointsRef.current.material)) {
          pointsRef.current.material.forEach((m) => m.dispose())
        } else {
          pointsRef.current.material.dispose()
        }
      }
    }
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    
    // Tab Visibility API
    if (typeof document !== "undefined" && document.hidden) return

    const progress = progressRef.current
    const activeTrack = trackHoverRef?.current
    const colorAttr = pointsRef.current.geometry.attributes.color

    // Handle Hover Color Transition
    let colorNeedsUpdate = false
    if (activeTrack && trackColors[activeTrack]) {
      targetColor.current.copy(trackColors[activeTrack])
      mixFactor.current = THREE.MathUtils.lerp(mixFactor.current, 1, 0.05)
      colorNeedsUpdate = true
    } else if (mixFactor.current > 0.001) {
      mixFactor.current = THREE.MathUtils.lerp(mixFactor.current, 0, 0.05)
      colorNeedsUpdate = true
    } else {
      mixFactor.current = 0
    }

    if (colorNeedsUpdate) {
      currentColor.current.lerpColors(new THREE.Color(0,0,0), targetColor.current, mixFactor.current)
      const currentColors = colorAttr.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        if (mixFactor.current > 0.001) {
          currentColors[i3] = THREE.MathUtils.lerp(baseColors[i3], currentColor.current.r, mixFactor.current)
          currentColors[i3 + 1] = THREE.MathUtils.lerp(baseColors[i3 + 1], currentColor.current.g, mixFactor.current)
          currentColors[i3 + 2] = THREE.MathUtils.lerp(baseColors[i3 + 2], currentColor.current.b, mixFactor.current)
        } else {
          currentColors[i3] = baseColors[i3]
          currentColors[i3 + 1] = baseColors[i3 + 1]
          currentColors[i3 + 2] = baseColors[i3 + 2]
        }
      }
      colorAttr.needsUpdate = true
    }

    // Ambient particle animation
    if (progress < 1 || !isPositionsFinalized.current) {
      const posAttr = pointsRef.current.geometry.attributes.position
      const currentPositions = posAttr.array as Float32Array

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        const initX = initialPositions[i3]
        const initY = initialPositions[i3 + 1]
        const initZ = initialPositions[i3 + 2]
        
        const effectiveProgress = Math.min(1, progress * (1 + speeds[i] * 5))
        const smoothProgress = effectiveProgress * effectiveProgress * (3 - 2 * effectiveProgress)
        
        // Spread particles ambiently around space instead of shrinking to center point (0,0,0)
        currentPositions[i3] = THREE.MathUtils.lerp(initX, initX * 0.6, smoothProgress)
        currentPositions[i3 + 1] = THREE.MathUtils.lerp(initY, initY * 0.6, smoothProgress)
        currentPositions[i3 + 2] = THREE.MathUtils.lerp(initZ, initZ * 0.6, smoothProgress)
      }
      posAttr.needsUpdate = true

      if (progress >= 0.99) {
        isPositionsFinalized.current = true
      }
    }

    // Slow ambient rotation
    const time = state.clock.elapsedTime
    pointsRef.current.rotation.y = time * 0.03
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
