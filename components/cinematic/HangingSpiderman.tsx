"use client"

import { useRef, useMemo, Suspense } from "react"
import { motion } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { PerspectiveCamera, useGLTF } from "@react-three/drei"
import * as THREE from "three"
import { CanvasErrorBoundary } from "./CanvasErrorBoundary"

function Hanging3DModel() {
  const modelRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF("/spiderman.glb")

  // Clone and prepare model geometry
  const modelClone = useMemo(() => {
    const clone = scene.clone(true)

    // Compute bounding box
    const box = new THREE.Box3().setFromObject(clone)
    const size = new THREE.Vector3()
    box.getSize(size)
    const maxDim = Math.max(size.x, size.y, size.z)

    // Scale to fit neatly inside canvas
    const targetScale = maxDim > 0 ? 2.4 / maxDim : 1
    clone.scale.setScalar(targetScale)

    // Center pivot
    const center = new THREE.Vector3()
    box.getCenter(center)
    clone.position.sub(center.multiplyScalar(targetScale))

    // Enhance materials for Marvel suit vibrancy
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => {
              if (mat instanceof THREE.MeshStandardMaterial) {
                mat.roughness = 0.35
                mat.metalness = 0.2
              }
            })
          } else if (mesh.material instanceof THREE.MeshStandardMaterial) {
            mesh.material.roughness = 0.35
            mesh.material.metalness = 0.2
          }
        }
      }
    })

    return clone
  }, [scene])

  // Gentle physical pendulum physics on the 3D model
  useFrame((state) => {
    const time = state.clock.elapsedTime
    if (modelRef.current) {
      // Upside down with gentle pendulum swing and breathing motion
      modelRef.current.rotation.z = Math.PI + Math.sin(time * 2.2) * 0.12
      modelRef.current.rotation.y = Math.sin(time * 1.5) * 0.25
      modelRef.current.position.y = 0.2 + Math.cos(time * 2.2) * 0.05
    }
  })

  return (
    <group ref={modelRef} position={[0, 0.2, 0]}>
      <primitive object={modelClone} />
    </group>
  )
}

interface HangingSpidermanProps {
  className?: string
}

export function HangingSpiderman({ className = "" }: HangingSpidermanProps) {
  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8, type: "spring", bounce: 0.4 }}
      className={`absolute top-full left-1/2 -translate-x-1/2 pointer-events-none z-40 flex flex-col items-center select-none origin-top ${className}`}
    >
      {/* GLOWING SILK WEB THREAD */}
      <div className="w-[2px] h-7 sm:h-9 bg-gradient-to-b from-white via-cyan-300 to-white shadow-[0_0_10px_#00E5FF,0_0_4px_#FFFFFF] relative z-10">
        {/* Top Web Anchor Node on the Button */}
        <div className="absolute -top-1 -left-1 w-3 h-2 bg-white rounded-full shadow-[0_0_8px_#00E5FF]"></div>
      </div>

      {/* 3D REAL SPIDER-MAN MODEL CANVAS */}
      <div className="w-20 sm:w-24 h-28 sm:h-32 -mt-2 relative">
        <CanvasErrorBoundary>
          <Canvas
            frameloop="always"
            gl={{
              alpha: true,
              antialias: true,
              powerPreference: "high-performance",
            }}
            dpr={typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 1.5) : 1}
          >
            <PerspectiveCamera
              makeDefault
              position={[0, 0, 3.8]}
              fov={45}
            />

            {/* LIGHTING */}
            <ambientLight intensity={1.2} />
            <directionalLight position={[3, 4, 3]} intensity={2.5} color="#ffffff" />
            <directionalLight position={[-3, -2, -2]} intensity={2.8} color="#ff2233" />
            <directionalLight position={[0, -3, 2]} intensity={1.8} color="#00C8FF" />

            <Suspense fallback={null}>
              <Hanging3DModel />
            </Suspense>
          </Canvas>
        </CanvasErrorBoundary>
      </div>
    </motion.div>
  )
}
