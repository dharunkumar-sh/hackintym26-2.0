"use client"

import { useRef, useEffect, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF, useAnimations } from "@react-three/drei"
import * as THREE from "three"

interface SpidermanModelProps {
  isShooting: boolean
  webImpactProgress: React.MutableRefObject<number>
}

export function SpidermanModel({ isShooting, webImpactProgress }: SpidermanModelProps) {
  const groupRef = useRef<THREE.Group>(null)
  const spideyModelRef = useRef<THREE.Group>(null)
  const handBoneRef = useRef<THREE.Bone | null>(null)
  const bonesRef = useRef<Record<string, THREE.Bone>>({})
  const webStreamRef = useRef<THREE.Group>(null)
  const screenWebRef = useRef<THREE.Group>(null)

  // Dynamic buffer position array for web cable
  const cablePositionsRef = useRef<Float32Array | null>(null)
  const cableGeomRef = useRef<THREE.BufferGeometry>(null)

  // Load the 3D Spider-Man model from public folder
  const { scene, animations } = useGLTF("/spiderman.glb")
  const { actions, names } = useAnimations(animations, spideyModelRef)

  // Process and pose the 3D Spider-Man model
  const modelClone = useMemo(() => {
    const clone = scene.clone(true)
    const foundBones: Record<string, THREE.Bone> = {}

    // Find and map all skeleton bones for dynamic action posing
    clone.traverse((child) => {
      if ((child as THREE.Bone).isBone) {
        const name = child.name.toLowerCase()
        foundBones[name] = child as THREE.Bone
      }

      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.castShadow = true
        mesh.receiveShadow = true

        if (mesh.material) {
          const enhanceMat = (mat: THREE.Material) => {
            if (mat instanceof THREE.MeshStandardMaterial) {
              mat.roughness = 0.3
              mat.metalness = 0.25
              mat.envMapIntensity = 2.0
              if (mat.map) mat.map.colorSpace = THREE.SRGBColorSpace
            }
          }

          if (Array.isArray(mesh.material)) {
            mesh.material.forEach(enhanceMat)
          } else {
            enhanceMat(mesh.material)
          }
        }
      }
    })

    bonesRef.current = foundBones

    // Compute bounding box to normalize scale and center model
    const box = new THREE.Box3().setFromObject(clone)
    const size = new THREE.Vector3()
    box.getSize(size)
    const maxDim = Math.max(size.x, size.y, size.z)

    // Standardize height to 3.4 units for dramatic cinematic framing
    const targetScale = maxDim > 0 ? 3.4 / maxDim : 1
    clone.scale.setScalar(targetScale)

    // Center model at origin
    const center = new THREE.Vector3()
    box.getCenter(center)
    clone.position.sub(center.multiplyScalar(targetScale))
    clone.position.y += 0.1

    return clone
  }, [scene])

  // Play animation clip if available in GLB
  useEffect(() => {
    if (names.length > 0 && actions) {
      const action = actions[names[0]]
      if (action) {
        action.reset().fadeIn(0.4).play()
      }
    }
  }, [actions, names])

  // Pose bones dynamically into Marvel action stance with extended hand & wrist
  useEffect(() => {
    const bones = bonesRef.current
    if (Object.keys(bones).length === 0) return

    const getBone = (...keywords: string[]) => {
      for (const k of keywords) {
        for (const [name, bone] of Object.entries(bones)) {
          if (name.includes(k.toLowerCase())) return bone
        }
      }
      return null
    }

    const rArm = getBone("rightarm", "r_arm", "arm_r", "right_arm", "upperarm_r")
    const rForeArm = getBone("rightforearm", "r_forearm", "forearm_r", "right_forearm", "lowerarm_r")
    const rHand = getBone("righthand", "r_hand", "hand_r", "right_hand")
    const lArm = getBone("leftarm", "l_arm", "arm_l", "left_arm", "upperarm_l")
    const lForeArm = getBone("leftforearm", "l_forearm", "forearm_l", "left_forearm", "lowerarm_l")
    const spine = getBone("spine", "spine1", "spine2", "chest", "torso")
    const hips = getBone("hips", "pelvis", "root")
    const rThigh = getBone("rightupleg", "r_thigh", "thigh_r", "right_thigh", "upperleg_r")
    const lThigh = getBone("leftupleg", "l_thigh", "thigh_l", "left_thigh", "upperleg_l")

    handBoneRef.current = rHand || rForeArm

    // Dynamic forward-leaning superhero action pose
    if (spine) {
      spine.rotation.x = 0.28
      spine.rotation.y = -0.18
    }
    if (hips) {
      hips.position.y -= 0.18
    }

    // Right Arm: Extended forward directly toward camera with wrist flicked
    if (rArm) {
      rArm.rotation.x = -1.52 // Arm thrust straight forward
      rArm.rotation.z = -0.22
      rArm.rotation.y = 0.38
    }
    if (rForeArm) {
      rForeArm.rotation.x = 0.15
      rForeArm.rotation.y = 0.25
    }
    if (rHand) {
      rHand.rotation.x = -0.65 // Cocked wrist in classic THWIP web-shooter posture
      rHand.rotation.z = 0.1
    }

    // Left Arm: Athletic balancing pullback
    if (lArm) {
      lArm.rotation.x = 0.65
      lArm.rotation.z = 0.85
      lArm.rotation.y = -0.45
    }
    if (lForeArm) {
      lForeArm.rotation.x = -0.85
    }

    // Legs: athletic wide superhero crouch
    if (rThigh) {
      rThigh.rotation.x = -0.55
      rThigh.rotation.z = 0.45
    }
    if (lThigh) {
      lThigh.rotation.x = -0.75
      lThigh.rotation.z = -0.55
    }
  }, [modelClone])

  // Realistic Organic Spider-Web Net Geometry for Screen Impact (Compact Localized Patch)
  const { webFilamentsGeom, webRaysGeom } = useMemo(() => {
    const filamentPts: THREE.Vector3[] = []
    const rayPts: THREE.Vector3[] = []
    const spokes = 16
    const rings = 7
    const maxRadius = 3.6

    for (let i = 0; i < spokes; i++) {
      const angle = (i / spokes) * Math.PI * 2
      const jitter = (Math.random() - 0.5) * 0.04
      const finalAngle = angle + jitter
      const r = maxRadius * (0.95 + Math.random() * 0.1)

      const start = new THREE.Vector3(0, 0, 0)
      const end = new THREE.Vector3(
        Math.cos(finalAngle) * r,
        Math.sin(finalAngle) * r,
        (Math.random() - 0.5) * 0.2
      )
      rayPts.push(start, end)
    }

    for (let r = 1; r <= rings; r++) {
      const radius = Math.pow(r / rings, 0.9) * maxRadius
      for (let s = 0; s < spokes; s++) {
        const a1 = (s / spokes) * Math.PI * 2
        const a2 = (((s + 1) % spokes) / spokes) * Math.PI * 2
        const midA = (a1 + a2) / 2
        const sag = 0.92 + (r / rings) * 0.03

        const p1 = new THREE.Vector3(Math.cos(a1) * radius, Math.sin(a1) * radius, 0)
        const pMid = new THREE.Vector3(
          Math.cos(midA) * radius * sag,
          Math.sin(midA) * radius * sag,
          (Math.random() - 0.5) * 0.1
        )
        const p2 = new THREE.Vector3(Math.cos(a2) * radius, Math.sin(a2) * radius, 0)

        filamentPts.push(p1, pMid)
        filamentPts.push(pMid, p2)
      }
    }

    const webRaysGeom = new THREE.BufferGeometry().setFromPoints(rayPts)
    const webFilamentsGeom = new THREE.BufferGeometry().setFromPoints(filamentPts)

    return { webFilamentsGeom, webRaysGeom }
  }, [])

  // Initialize dynamic web cable geometry buffer (4 strands, 80 segments each)
  const STRANDS = 4
  const SEGMENTS = 80
  const TOTAL_LINE_VERTS = STRANDS * (SEGMENTS - 1) * 2

  const cableBufferGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry()
    const positions = new Float32Array(TOTAL_LINE_VERTS * 3)
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    cablePositionsRef.current = positions
    return geom
  }, [TOTAL_LINE_VERTS])

  // Frame animation kinematics - Dynamic Anchor to Hand & Web Flight
  useFrame((state) => {
    const time = state.clock.elapsedTime
    const impact = webImpactProgress.current

    // 1. Calculate the EXACT WORLD POSITION of Spider-Man's Right Hand / Web-Shooter Wrist
    const handPos = new THREE.Vector3()
    if (handBoneRef.current) {
      handBoneRef.current.getWorldPosition(handPos)
      handPos.add(new THREE.Vector3(0.05, -0.02, 0.15))
    } else if (spideyModelRef.current) {
      // Precise offset corresponding to right gauntlet in model space
      handPos.set(0.42, 0.28, 0.95).applyMatrix4(spideyModelRef.current.matrixWorld)
    }

    // 2. Spider-Man Action Movement & Shooting Kinematics
    if (spideyModelRef.current) {
      if (!isShooting) {
        // Natural hover & breathing dynamics
        spideyModelRef.current.position.y = Math.sin(time * 1.8) * 0.08 - 0.05
        spideyModelRef.current.rotation.y = Math.sin(time * 1.0) * 0.12
        spideyModelRef.current.rotation.x = 0.08 + Math.cos(time * 1.2) * 0.04
      } else {
        if (impact < 0.4) {
          // Lunging forward into wrist-shoot gesture
          spideyModelRef.current.position.z = THREE.MathUtils.lerp(spideyModelRef.current.position.z, 0.35, 0.14)
          spideyModelRef.current.position.y = THREE.MathUtils.lerp(spideyModelRef.current.position.y, -0.12, 0.14)
          spideyModelRef.current.rotation.x = THREE.MathUtils.lerp(spideyModelRef.current.rotation.x, 0.24, 0.16)
          spideyModelRef.current.rotation.y = THREE.MathUtils.lerp(spideyModelRef.current.rotation.y, -0.16, 0.16)
        } else {
          // Physical recoil after discharging high-velocity silk cord
          spideyModelRef.current.position.z = THREE.MathUtils.lerp(spideyModelRef.current.position.z, -0.28, 0.06)
          spideyModelRef.current.position.y = THREE.MathUtils.lerp(spideyModelRef.current.position.y, 0.04, 0.06)
          spideyModelRef.current.rotation.x = THREE.MathUtils.lerp(spideyModelRef.current.rotation.x, 0.06, 0.08)
        }
      }
    }

    // 3. Update Web Cable Geometry starting DIRECTLY FROM HAND to Camera
    if (cablePositionsRef.current && cableGeomRef.current && webStreamRef.current) {
      const isVisible = isShooting && impact < 0.98
      webStreamRef.current.visible = isVisible

      if (isVisible) {
        const positions = cablePositionsRef.current
        const cameraTarget = new THREE.Vector3(0, 0, 6.8)
        const progress = Math.min(1, impact * 2.2)

        // Web trajectory end point traveling from Hand -> Camera
        const currentEnd = new THREE.Vector3().lerpVectors(handPos, cameraTarget, progress)

        let ptr = 0
        for (let s = 0; s < STRANDS; s++) {
          const strandOffset = (s / STRANDS) * Math.PI * 2
          let prevPoint: THREE.Vector3 | null = null

          for (let i = 0; i < SEGMENTS; i++) {
            const t = i / (SEGMENTS - 1)
            const currentPos = new THREE.Vector3().lerpVectors(handPos, currentEnd, t)

            // Spiral silk radius around central trajectory
            const radius = (1 - t * 0.5) * 0.07
            const spiralAngle = t * Math.PI * 16 + strandOffset + time * 6

            currentPos.x += Math.cos(spiralAngle) * radius
            currentPos.y += Math.sin(spiralAngle) * radius

            if (prevPoint) {
              positions[ptr++] = prevPoint.x
              positions[ptr++] = prevPoint.y
              positions[ptr++] = prevPoint.z

              positions[ptr++] = currentPos.x
              positions[ptr++] = currentPos.y
              positions[ptr++] = currentPos.z
            }

            prevPoint = currentPos.clone()
          }
        }

        cableGeomRef.current.attributes.position.needsUpdate = true
      }
    }

    // 4. Screen impact web lattice animation (Compact localized patch)
    if (screenWebRef.current) {
      if (impact > 0.35) {
        screenWebRef.current.visible = true
        const normalizedImpact = (impact - 0.35) / 0.65
        const scale = THREE.MathUtils.lerp(0.05, 0.45, Math.min(1, normalizedImpact))
        const vibration = normalizedImpact < 0.7 ? (Math.random() - 0.5) * 0.015 * (1 - normalizedImpact) : 0
        screenWebRef.current.scale.set(scale + vibration, scale + vibration, 1)
        screenWebRef.current.position.z = 6.8
      } else {
        screenWebRef.current.visible = false
      }
    }
  })

  return (
    <group ref={groupRef}>
      {/* 3D REAL SPIDER-MAN GLB MODEL WITH ACTION STANCE */}
      <group ref={spideyModelRef}>
        <primitive object={modelClone} />
      </group>

      {/* 3D HIGH-TENSILE MULTI-STRAND SILK CABLE ANCHORED DIRECTLY TO HAND */}
      <group ref={webStreamRef} visible={false}>
        <lineSegments>
          <primitive ref={cableGeomRef} object={cableBufferGeometry} attach="geometry" />
          <lineBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.98}
            linewidth={3}
          />
        </lineSegments>
        {/* Cyan Energy Glow Core */}
        <lineSegments>
          <primitive object={cableBufferGeometry} attach="geometry" />
          <lineBasicMaterial
            color="#00e5ff"
            transparent
            opacity={0.65}
            linewidth={1.5}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
      </group>

      {/* 3D ORGANIC SPIDER-WEB NET ON SCREEN */}
      <group ref={screenWebRef} visible={false}>
        {/* Radial Structural Silk Lines */}
        <lineSegments>
          <primitive object={webRaysGeom} attach="geometry" />
          <lineBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.95}
            linewidth={3}
          />
        </lineSegments>

        {/* Concentric Drooping Silk Filaments */}
        <lineSegments>
          <primitive object={webFilamentsGeom} attach="geometry" />
          <lineBasicMaterial
            color="#e2f7ff"
            transparent
            opacity={0.9}
            linewidth={2}
          />
        </lineSegments>

        {/* Cyan Energy Glow Core */}
        <lineSegments>
          <primitive object={webRaysGeom} attach="geometry" />
          <lineBasicMaterial
            color="#00e5ff"
            transparent
            opacity={0.5}
            linewidth={1}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
      </group>
    </group>
  )
}

// Preload the Spider-Man model asset
useGLTF.preload("/spiderman.glb")
