"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface Spiderman3DProps {
  progress?: number
  isShooting: boolean
  webImpactProgress: React.MutableRefObject<number>
}

export function Spiderman3D({ progress = 100, isShooting, webImpactProgress }: Spiderman3DProps) {
  const spideyGroup = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Group>(null)
  const rightArmRef = useRef<THREE.Group>(null)
  const leftArmRef = useRef<THREE.Group>(null)
  const spiderSenseRef = useRef<THREE.Group>(null)
  const webStreamRef = useRef<THREE.LineSegments>(null)
  const webParticleRef = useRef<THREE.Points>(null)
  const screenWebRef = useRef<THREE.Group>(null)

  // Materials with comic-accurate Marvel palette
  const materials = useMemo(() => {
    return {
      suitRed: new THREE.MeshStandardMaterial({
        color: "#d91424",
        roughness: 0.35,
        metalness: 0.15,
      }),
      suitBlue: new THREE.MeshStandardMaterial({
        color: "#0a2558",
        roughness: 0.3,
        metalness: 0.4,
      }),
      suitBlack: new THREE.MeshStandardMaterial({
        color: "#0d0d11",
        roughness: 0.5,
        metalness: 0.2,
      }),
      eyeWhite: new THREE.MeshBasicMaterial({
        color: "#ffffff",
      }),
      eyeGlow: new THREE.MeshBasicMaterial({
        color: "#00e5ff",
        transparent: true,
        opacity: 0.8,
      }),
      webLine: new THREE.LineBasicMaterial({
        color: "#ffffff",
        transparent: true,
        opacity: 0.95,
        linewidth: 2,
      }),
      webGlow: new THREE.MeshBasicMaterial({
        color: "#aae5ff",
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
      }),
      spiderSense: new THREE.LineBasicMaterial({
        color: "#ffd700",
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      }),
    }
  }, [])

  // Procedural Web Impact Lines on Screen
  const { screenWebLines, webParticles } = useMemo(() => {
    // 1. Concentric web rings and radial spokes
    const points: THREE.Vector3[] = []
    const spokes = 14
    const rings = 7
    const maxRadius = 9

    // Radial spokes
    for (let i = 0; i < spokes; i++) {
      const angle = (i / spokes) * Math.PI * 2 + (Math.random() - 0.5) * 0.1
      const p1 = new THREE.Vector3(0, 0, 0)
      const p2 = new THREE.Vector3(
        Math.cos(angle) * maxRadius * (0.9 + Math.random() * 0.2),
        Math.sin(angle) * maxRadius * (0.9 + Math.random() * 0.2),
        0
      )
      points.push(p1, p2)
    }

    // Spiral ring segments
    for (let r = 1; r <= rings; r++) {
      const radius = (r / rings) * maxRadius
      for (let s = 0; s < spokes; s++) {
        const a1 = (s / spokes) * Math.PI * 2
        const a2 = (((s + 1) % spokes) / spokes) * Math.PI * 2
        const sag = 0.88 // Web sag curve
        const midA = (a1 + a2) / 2

        const p1 = new THREE.Vector3(Math.cos(a1) * radius, Math.sin(a1) * radius, 0)
        const pMid = new THREE.Vector3(Math.cos(midA) * radius * sag, Math.sin(midA) * radius * sag, 0)
        const p2 = new THREE.Vector3(Math.cos(a2) * radius, Math.sin(a2) * radius, 0)

        points.push(p1, pMid)
        points.push(pMid, p2)
      }
    }

    const screenWebGeom = new THREE.BufferGeometry().setFromPoints(points)

    // 2. Web projectile particle burst
    const pCount = 200
    const pPositions = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 0.4
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 0.4
      pPositions[i * 3 + 2] = Math.random() * 10
    }
    const pGeom = new THREE.BufferGeometry()
    pGeom.setAttribute("position", new THREE.BufferAttribute(pPositions, 3))

    return { screenWebLines: screenWebGeom, webParticles: pGeom }
  }, [])

  // Web stream line from wrist to camera
  const webStreamGeom = useMemo(() => {
    const pts: THREE.Vector3[] = []
    const segments = 40
    for (let i = 0; i < segments; i++) {
      const t = i / segments
      // Spiraling web line from spidey hand (approx 0.6, 0.2, 0.5) to camera center (0, 0, 7.5)
      const x = THREE.MathUtils.lerp(0.55, 0, t) + Math.sin(t * Math.PI * 8) * (1 - t) * 0.08
      const y = THREE.MathUtils.lerp(0.15, 0, t) + Math.cos(t * Math.PI * 8) * (1 - t) * 0.08
      const z = THREE.MathUtils.lerp(0.6, 7.2, t)
      pts.push(new THREE.Vector3(x, y, z))
    }
    const linePts: THREE.Vector3[] = []
    for (let i = 0; i < pts.length - 1; i++) {
      linePts.push(pts[i], pts[i + 1])
    }
    return new THREE.BufferGeometry().setFromPoints(linePts)
  }, [])

  // Animation Loop
  useFrame((state) => {
    const time = state.clock.elapsedTime
    const impact = webImpactProgress.current

    if (spideyGroup.current) {
      if (!isShooting) {
        // Idle floating/breathing animation in mid-air
        spideyGroup.current.position.y = Math.sin(time * 2.5) * 0.15 - 0.2
        spideyGroup.current.rotation.y = Math.sin(time * 1.2) * 0.15
        spideyGroup.current.rotation.x = Math.cos(time * 1.5) * 0.05 + 0.1
      } else {
        // Dynamic snap into web-shooting action pose
        spideyGroup.current.position.y = -0.1
        spideyGroup.current.position.z = THREE.MathUtils.lerp(spideyGroup.current.position.z, -0.5, 0.1)
        spideyGroup.current.rotation.y = THREE.MathUtils.lerp(spideyGroup.current.rotation.y, -0.2, 0.2)
        spideyGroup.current.rotation.x = THREE.MathUtils.lerp(spideyGroup.current.rotation.x, 0.15, 0.2)
      }
    }

    // Head tracking / tilting
    if (headRef.current) {
      if (isShooting) {
        headRef.current.rotation.x = -0.1
        headRef.current.rotation.y = 0.2
      } else {
        headRef.current.rotation.y = Math.sin(time * 1.8) * 0.2
        headRef.current.rotation.z = Math.cos(time * 2) * 0.08
      }
    }

    // Right Arm aiming into THWIP gesture
    if (rightArmRef.current) {
      if (isShooting) {
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -Math.PI * 0.48, 0.25)
        rightArmRef.current.rotation.y = THREE.MathUtils.lerp(rightArmRef.current.rotation.y, 0.35, 0.25)
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -0.2, 0.25)
      } else {
        rightArmRef.current.rotation.x = Math.sin(time * 2) * 0.1 - 0.3
        rightArmRef.current.rotation.y = 0.2
        rightArmRef.current.rotation.z = -0.3
      }
    }

    // Left Arm balance pose
    if (leftArmRef.current) {
      if (isShooting) {
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0.6, 0.2)
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, 0.8, 0.2)
      } else {
        leftArmRef.current.rotation.x = Math.cos(time * 2) * 0.1 + 0.3
        leftArmRef.current.rotation.z = 0.5
      }
    }

    // Spider-Sense tingling aura
    if (spiderSenseRef.current) {
      const senseScale = progress > 70 ? (1 + Math.sin(time * 20) * 0.2) : 0
      spiderSenseRef.current.scale.setScalar(senseScale)
      spiderSenseRef.current.rotation.z = Math.sin(time * 10) * 0.1
    }

    // Web stream animation
    if (webStreamRef.current) {
      webStreamRef.current.visible = isShooting && impact < 0.95
      if (webStreamRef.current.visible) {
        webStreamRef.current.rotation.z = time * 8
      }
    }

    // Screen web impact expansion & shatter
    if (screenWebRef.current) {
      if (impact > 0) {
        screenWebRef.current.visible = true
        // Web hits lens, expands rapidly, vibrates, then tears open
        const scale = THREE.MathUtils.lerp(0.1, 1.4, Math.min(1, impact * 1.5))
        const shake = impact < 0.7 ? (Math.random() - 0.5) * 0.05 * (1 - impact) : 0
        screenWebRef.current.scale.set(scale + shake, scale + shake, 1)
        screenWebRef.current.position.z = 7.1 // Right in front of camera at z=7.5
        
        // Tearing open at end of impact
        if (impact > 0.6) {
          const tear = (impact - 0.6) / 0.4
          screenWebRef.current.scale.x = scale * (1 + tear * 2)
          screenWebRef.current.scale.y = scale * (1 + tear * 2)
        }
      } else {
        screenWebRef.current.visible = false
      }
    }
  })

  return (
    <group>
      {/* SPIDER-MAN CHARACTER GROUP */}
      <group ref={spideyGroup} position={[0, -0.2, 0]} scale={1.2}>
        {/* SPIDER SENSE TINGLING ARCS */}
        <group ref={spiderSenseRef} position={[0, 1.4, 0]} scale={0}>
          {[-0.4, -0.2, 0, 0.2, 0.4].map((x, i) => (
            <mesh key={i} position={[x, 0.25 + Math.abs(x) * 0.15, 0]}>
              <coneGeometry args={[0.04, 0.35, 4]} />
              <primitive object={materials.spiderSense} attach="material" />
            </mesh>
          ))}
        </group>

        {/* HEAD */}
        <group ref={headRef} position={[0, 1.05, 0]}>
          {/* Mask Shape (Egg-like Sphere) */}
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[0.32, 24, 24]} />
            <primitive object={materials.suitRed} attach="material" />
          </mesh>

          {/* Web Lines on Mask (Subtle Black Wireframe accent) */}
          <mesh scale={1.002}>
            <sphereGeometry args={[0.32, 12, 10]} />
            <meshBasicMaterial color="#1a0005" wireframe transparent opacity={0.35} />
          </mesh>

          {/* Left Eye */}
          <group position={[-0.11, 0.05, 0.27]} rotation={[0.05, -0.25, 0.1]}>
            {/* Eye Frame (Black Outer Rim) */}
            <mesh scale={[0.13, 0.1, 0.03]}>
              <boxGeometry args={[1, 1, 1]} />
              <primitive object={materials.suitBlack} attach="material" />
            </mesh>
            {/* Eye Lens (White Glossy) */}
            <mesh position={[0, 0, 0.015]} scale={[0.1, 0.075, 0.01]}>
              <boxGeometry args={[1, 1, 1]} />
              <primitive object={materials.eyeWhite} attach="material" />
            </mesh>
          </group>

          {/* Right Eye */}
          <group position={[0.11, 0.05, 0.27]} rotation={[0.05, 0.25, -0.1]}>
            {/* Eye Frame */}
            <mesh scale={[0.13, 0.1, 0.03]}>
              <boxGeometry args={[1, 1, 1]} />
              <primitive object={materials.suitBlack} attach="material" />
            </mesh>
            {/* Eye Lens */}
            <mesh position={[0, 0, 0.015]} scale={[0.1, 0.075, 0.01]}>
              <boxGeometry args={[1, 1, 1]} />
              <primitive object={materials.eyeWhite} attach="material" />
            </mesh>
          </group>
        </group>

        {/* TORSO / CHEST */}
        <group position={[0, 0.55, 0]}>
          {/* Main Chest Musculature (V-Taper) */}
          <mesh position={[0, 0.05, 0]} castShadow>
            <cylinderGeometry args={[0.34, 0.24, 0.55, 16]} />
            <primitive object={materials.suitRed} attach="material" />
          </mesh>

          {/* Blue Side Panels */}
          <mesh position={[-0.22, 0.02, 0]} scale={[0.12, 0.5, 0.26]}>
            <boxGeometry args={[1, 1, 1]} />
            <primitive object={materials.suitBlue} attach="material" />
          </mesh>
          <mesh position={[0.22, 0.02, 0]} scale={[0.12, 0.5, 0.26]}>
            <boxGeometry args={[1, 1, 1]} />
            <primitive object={materials.suitBlue} attach="material" />
          </mesh>

          {/* Iconic Black Spider Emblem on Chest */}
          <group position={[0, 0.12, 0.23]} scale={0.16}>
            {/* Spider Body */}
            <mesh>
              <sphereGeometry args={[0.25, 8, 8]} />
              <primitive object={materials.suitBlack} attach="material" />
            </mesh>
            {/* Spider Legs */}
            {[-0.3, 0.3].map((dir, idx) => (
              <group key={idx}>
                <mesh position={[dir * 0.4, 0.15, 0]} rotation={[0, 0, dir * 0.6]}>
                  <boxGeometry args={[0.5, 0.06, 0.02]} />
                  <primitive object={materials.suitBlack} attach="material" />
                </mesh>
                <mesh position={[dir * 0.45, 0, 0]} rotation={[0, 0, dir * 0.3]}>
                  <boxGeometry args={[0.6, 0.06, 0.02]} />
                  <primitive object={materials.suitBlack} attach="material" />
                </mesh>
                <mesh position={[dir * 0.4, -0.15, 0]} rotation={[0, 0, -dir * 0.4]}>
                  <boxGeometry args={[0.5, 0.06, 0.02]} />
                  <primitive object={materials.suitBlack} attach="material" />
                </mesh>
              </group>
            ))}
          </group>

          {/* Waist & Belt */}
          <mesh position={[0, -0.26, 0]}>
            <cylinderGeometry args={[0.24, 0.25, 0.15, 16]} />
            <primitive object={materials.suitRed} attach="material" />
          </mesh>
        </group>

        {/* RIGHT SHOULDER & ARM (WEB SHOOTER HAND) */}
        <group ref={rightArmRef} position={[0.38, 0.72, 0]}>
          {/* Red Shoulder Deltoid */}
          <mesh>
            <sphereGeometry args={[0.15, 12, 12]} />
            <primitive object={materials.suitRed} attach="material" />
          </mesh>
          {/* Blue Bicep */}
          <mesh position={[0.12, -0.16, 0]} rotation={[0, 0, -0.6]}>
            <cylinderGeometry args={[0.1, 0.09, 0.3, 12]} />
            <primitive object={materials.suitBlue} attach="material" />
          </mesh>
          {/* Red Forearm & Web Shooter */}
          <group position={[0.24, -0.36, 0.1]} rotation={[-0.4, 0.3, -0.8]}>
            <mesh position={[0, -0.15, 0]}>
              <cylinderGeometry args={[0.09, 0.08, 0.32, 12]} />
              <primitive object={materials.suitRed} attach="material" />
            </mesh>
            {/* Metallic Web Shooter Gauntlet */}
            <mesh position={[0, -0.26, 0.05]} scale={[0.1, 0.06, 0.06]}>
              <boxGeometry args={[1, 1, 1]} />
              <primitive object={materials.suitBlack} attach="material" />
            </mesh>
            {/* Web Shooter Glow Nozzle */}
            <mesh position={[0, -0.28, 0.08]} scale={0.035}>
              <sphereGeometry args={[1, 8, 8]} />
              <primitive object={materials.eyeGlow} attach="material" />
            </mesh>
            {/* Hand in Iconic THWIP Pose */}
            <group position={[0, -0.34, 0]}>
              <mesh scale={[0.1, 0.12, 0.06]}>
                <boxGeometry args={[1, 1, 1]} />
                <primitive object={materials.suitRed} attach="material" />
              </mesh>
              {/* Extended Thumb, Index & Pinky fingers */}
              <mesh position={[-0.05, -0.08, 0]} scale={[0.025, 0.09, 0.025]}>
                <boxGeometry args={[1, 1, 1]} />
                <primitive object={materials.suitRed} attach="material" />
              </mesh>
              <mesh position={[0.05, -0.08, 0]} scale={[0.025, 0.09, 0.025]}>
                <boxGeometry args={[1, 1, 1]} />
                <primitive object={materials.suitRed} attach="material" />
              </mesh>
            </group>
          </group>
        </group>

        {/* LEFT SHOULDER & ARM */}
        <group ref={leftArmRef} position={[-0.38, 0.72, 0]}>
          {/* Shoulder Deltoid */}
          <mesh>
            <sphereGeometry args={[0.15, 12, 12]} />
            <primitive object={materials.suitRed} attach="material" />
          </mesh>
          {/* Bicep */}
          <mesh position={[-0.12, -0.16, 0]} rotation={[0, 0, 0.6]}>
            <cylinderGeometry args={[0.1, 0.09, 0.3, 12]} />
            <primitive object={materials.suitBlue} attach="material" />
          </mesh>
          {/* Forearm */}
          <mesh position={[-0.24, -0.36, 0]} rotation={[0, 0, 0.9]}>
            <cylinderGeometry args={[0.09, 0.08, 0.32, 12]} />
            <primitive object={materials.suitRed} attach="material" />
          </mesh>
        </group>

        {/* LEGS / CROUCHING ACTION POSE */}
        <group position={[0, 0.25, 0]}>
          {/* Right Leg (Bent Crouch) */}
          <group position={[0.18, 0, 0]} rotation={[-0.6, 0.2, -0.4]}>
            <mesh position={[0, -0.22, 0]}>
              <cylinderGeometry args={[0.13, 0.1, 0.42, 12]} />
              <primitive object={materials.suitBlue} attach="material" />
            </mesh>
            {/* Red Boot & Knee */}
            <mesh position={[0, -0.45, 0.1]} rotation={[1.1, 0, 0]}>
              <cylinderGeometry args={[0.1, 0.08, 0.44, 12]} />
              <primitive object={materials.suitRed} attach="material" />
            </mesh>
          </group>

          {/* Left Leg (Extended Wall-Kick) */}
          <group position={[-0.18, 0, 0]} rotation={[0.4, -0.3, 0.5]}>
            <mesh position={[0, -0.22, 0]}>
              <cylinderGeometry args={[0.13, 0.1, 0.42, 12]} />
              <primitive object={materials.suitBlue} attach="material" />
            </mesh>
            {/* Red Boot */}
            <mesh position={[0, -0.45, -0.1]} rotation={[-0.7, 0, 0]}>
              <cylinderGeometry args={[0.1, 0.08, 0.44, 12]} />
              <primitive object={materials.suitRed} attach="material" />
            </mesh>
          </group>
        </group>
      </group>

      {/* 3D WEB STREAM PROJECTILE (FROM WRIST TO CAMERA) */}
      <lineSegments ref={webStreamRef} visible={false}>
        <primitive object={webStreamGeom} attach="geometry" />
        <primitive object={materials.webGlow} attach="material" />
      </lineSegments>

      {/* 3D SCREEN IMPACT SPIDER-WEB (EXPANDS ACROSS CAMERA VIEWPORT) */}
      <group ref={screenWebRef} visible={false}>
        <lineSegments>
          <primitive object={screenWebLines} attach="geometry" />
          <primitive object={materials.webGlow} attach="material" />
        </lineSegments>
        {/* Glowing impact epicenter node */}
        <mesh position={[0, 0, 0.01]} scale={0.25}>
          <sphereGeometry args={[1, 16, 16]} />
          <primitive object={materials.eyeGlow} attach="material" />
        </mesh>
      </group>
    </group>
  )
}
