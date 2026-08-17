"use client"

import { useRef, useMemo, memo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { PerspectiveCamera } from "@react-three/drei"
import * as THREE from "three"
import { CanvasErrorBoundary } from "./CanvasErrorBoundary"

interface CameraRigProps {
  isZooming: boolean
}

function CameraRig({ isZooming }: CameraRigProps) {
  const zoomProgress = useRef(0)

  useFrame((state, delta) => {
    if (isZooming) {
      // Smooth, high-precision camera plunge into the arc reactor core
      zoomProgress.current = THREE.MathUtils.damp(zoomProgress.current, 1, 4.5, delta)
      state.camera.position.z = THREE.MathUtils.lerp(7.0, 1.0, zoomProgress.current)
    }
  })

  return null
}

interface ArcReactorProps {
  isOverdrive: boolean
  overdriveProgress: React.MutableRefObject<number>
  onClick?: () => void
  onPointerOver?: () => void
  onPointerOut?: () => void
}

function ArcReactorMesh({
  overdriveProgress,
  onClick,
  onPointerOver,
  onPointerOut,
}: ArcReactorProps) {
  const outerRingRef = useRef<THREE.Group>(null)
  const middleRingRef = useRef<THREE.Group>(null)
  const innerRingRef = useRef<THREE.Group>(null)
  const coreGlowRef = useRef<THREE.Mesh>(null)
  const sparkGroupRef = useRef<THREE.Points>(null)

  // Generate copper coils for arc reactor
  const coils = useMemo(() => {
    const items = []
    const count = 10
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      items.push({
        position: [Math.cos(angle) * 1.7, Math.sin(angle) * 1.7, 0] as [number, number, number],
        rotation: [0, 0, angle + Math.PI / 2] as [number, number, number],
      })
    }
    return items
  }, [])

  // Generate quantum energy particles
  const particleData = useMemo(() => {
    const count = 220
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    const angles = new Float32Array(count)
    const radii = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      angles[i] = Math.random() * Math.PI * 2
      radii[i] = 1.1 + Math.random() * 2.2
      positions[i * 3] = Math.cos(angles[i]) * radii[i]
      positions[i * 3 + 1] = Math.sin(angles[i]) * radii[i]
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.6
      speeds[i] = 0.5 + Math.random() * 1.5
    }
    return { positions, speeds, angles, radii, count }
  }, [])

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime
    const overdrive = overdriveProgress.current
    const speedMultiplier = 1 + overdrive * 6

    // Rotate concentric rings smoothly
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = time * 0.35 * speedMultiplier
    }
    if (middleRingRef.current) {
      middleRingRef.current.rotation.z = -time * 0.75 * speedMultiplier
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = time * 1.25 * speedMultiplier
    }

    // Core energy pulsing
    if (coreGlowRef.current) {
      const pulse = Math.sin(time * 6) * 0.05
      const coreScale = (1 + pulse) * (1 + overdrive * 1.5)
      coreGlowRef.current.scale.setScalar(coreScale)

      const glowMat = coreGlowRef.current.material as THREE.MeshBasicMaterial
      glowMat.opacity = Math.min(1, 0.3 + pulse + overdrive * 0.5)
    }

    // Quantum particles orbital motion
    if (sparkGroupRef.current) {
      const posAttr = sparkGroupRef.current.geometry.attributes.position
      const arr = posAttr.array as Float32Array
      for (let i = 0; i < particleData.count; i++) {
        particleData.angles[i] += delta * particleData.speeds[i] * speedMultiplier * 0.8
        const r = particleData.radii[i] * (1 + overdrive * 1.2)
        arr[i * 3] = Math.cos(particleData.angles[i]) * r
        arr[i * 3 + 1] = Math.sin(particleData.angles[i]) * r
      }
      posAttr.needsUpdate = true
    }
  })

  return (
    <group
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      {/* === OUTER TITANIUM HOUSING RING === */}
      <group ref={outerRingRef}>
        {/* Main Outer Rim */}
        <mesh>
          <torusGeometry args={[2.2, 0.12, 16, 64]} />
          <meshStandardMaterial
            color="#1a1c23"
            metalness={0.9}
            roughness={0.2}
            emissive="#0044aa"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Outer Cyan Accent Ring */}
        <mesh position={[0, 0, 0.05]}>
          <torusGeometry args={[2.32, 0.025, 12, 64]} />
          <meshBasicMaterial color="#00e5ff" />
        </mesh>

        {/* Exterior Arc Segment Tabs */}
        {[0, 1, 2, 3].map((i) => {
          const angle = (i * Math.PI) / 2
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 2.35, Math.sin(angle) * 2.35, 0]}
              rotation={[0, 0, angle]}
            >
              <boxGeometry args={[0.3, 0.12, 0.15]} />
              <meshStandardMaterial color="#00C8FF" emissive="#00C8FF" emissiveIntensity={0.8} />
            </mesh>
          )
        })}
      </group>

      {/* === MIDDLE PALLADIUM & COPPER COIL RING === */}
      <group ref={middleRingRef}>
        {/* Middle Channel */}
        <mesh>
          <torusGeometry args={[1.7, 0.1, 16, 48]} />
          <meshStandardMaterial
            color="#2a2d36"
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>

        {/* Copper Coils */}
        {coils.map((coil, idx) => (
          <group key={idx} position={coil.position} rotation={coil.rotation}>
            <mesh>
              <boxGeometry args={[0.18, 0.35, 0.2]} />
              <meshStandardMaterial
                color="#d97706"
                metalness={0.9}
                roughness={0.3}
              />
            </mesh>
            <mesh position={[0, 0, 0.11]}>
              <boxGeometry args={[0.08, 0.28, 0.02]} />
              <meshBasicMaterial color="#00ffff" />
            </mesh>
          </group>
        ))}
      </group>

      {/* === INNER ACCELERATOR RING (FRAMES THE CENTER CIRCLE) === */}
      <group ref={innerRingRef}>
        <mesh>
          <torusGeometry args={[1.18, 0.06, 16, 48]} />
          <meshBasicMaterial color="#00C8FF" />
        </mesh>

        {/* Inner Glowing Rim */}
        <mesh position={[0, 0, 0.04]}>
          <torusGeometry args={[1.12, 0.03, 12, 48]} />
          <meshBasicMaterial color="#00ffff" />
        </mesh>

        {/* Inner Titanium Segments */}
        {[0, 1, 2].map((i) => {
          const angle = (i * Math.PI * 2) / 3
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 1.05, Math.sin(angle) * 1.05, 0]}
              rotation={[0, 0, angle + Math.PI / 2]}
            >
              <boxGeometry args={[0.12, 0.25, 0.1]} />
              <meshStandardMaterial color="#e10600" emissive="#ff2a2a" emissiveIntensity={0.8} />
            </mesh>
          )
        })}
      </group>

      {/* === CENTRAL GLOWING PORTAL CORONA AROUND CIRCLE === */}
      <mesh ref={coreGlowRef} position={[0, 0, -0.02]}>
        <ringGeometry args={[1.08, 1.35, 48]} />
        <meshBasicMaterial
          color="#00C8FF"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Outer Crimson Corona Flare */}
      <mesh position={[0, 0, -0.05]}>
        <ringGeometry args={[1.15, 2.4, 32]} />
        <meshBasicMaterial
          color="#e10600"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* === QUANTUM SPARK ORBIT PARTICLES === */}
      <points ref={sparkGroupRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particleData.positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#00ffff"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  )
}

interface MarvelArcReactorCanvasProps {
  isZooming: boolean
  isOverdrive: boolean
  overdriveProgress: React.MutableRefObject<number>
  onTriggerAssemble?: () => void
  active: boolean
}

export const MarvelArcReactorCanvas = memo(function MarvelArcReactorCanvas({
  isZooming,
  isOverdrive,
  overdriveProgress,
  onTriggerAssemble,
  active,
}: MarvelArcReactorCanvasProps) {
  return (
    <div className="absolute inset-0 z-0 bg-transparent select-none">
      <CanvasErrorBoundary>
        <Canvas
          frameloop={active ? "always" : "demand"}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            alpha: true,
          }}
          dpr={typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 1.5) : 1}
        >
          <PerspectiveCamera
            makeDefault
            position={[0, 0, 7.0]}
            fov={45}
          />

          <CameraRig isZooming={isZooming} />

          <ambientLight intensity={1.4} />
          <directionalLight position={[0, 4, 6]} intensity={3.0} color="#ffffff" />
          <directionalLight position={[6, 3, 3]} intensity={2.5} color="#00e5ff" />
          <directionalLight position={[-6, -3, -3]} intensity={3.5} color="#ff0033" />

          <ArcReactorMesh
            isOverdrive={isOverdrive}
            overdriveProgress={overdriveProgress}
            onClick={onTriggerAssemble}
          />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  )
})
