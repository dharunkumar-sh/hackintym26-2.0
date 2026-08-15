"use client"

import { useRef, useEffect, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useGLTF, useAnimations } from "@react-three/drei"
import * as THREE from "three"

interface SpidermanModelProps {
  isLanding: boolean
  landingProgress: React.MutableRefObject<number>
  onPointerOver?: () => void
  onPointerOut?: () => void
  onClick?: () => void
}

export function SpidermanModel({ 
  isLanding, 
  landingProgress,
  onPointerOver,
  onPointerOut,
  onClick
}: SpidermanModelProps) {
  const groupRef = useRef<THREE.Group>(null)
  const spideyModelRef = useRef<THREE.Group>(null)
  const bonesRef = useRef<Record<string, THREE.Bone>>({})
  const shockwaveRef = useRef<THREE.Group>(null)
  const shockwaveMatRef = useRef<THREE.MeshBasicMaterial>(null)
  const shockwaveRing2MatRef = useRef<THREE.MeshBasicMaterial>(null)

  const { viewport } = useThree()
  const isMobile = viewport.width < 5.5

  // Load the 3D Spider-Man model from public folder
  const { scene, animations } = useGLTF("/spiderman.glb")
  const { actions, names } = useAnimations(animations, spideyModelRef)

  // Process and center model
  const modelClone = useMemo(() => {
    const clone = scene.clone(true)
    const foundBones: Record<string, THREE.Bone> = {}

    clone.traverse((child) => {
      if ((child as THREE.Bone).isBone) {
        foundBones[child.name.toLowerCase()] = child as THREE.Bone
      }

      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.castShadow = true
        mesh.receiveShadow = true

        if (mesh.material) {
          const enhanceMat = (mat: THREE.Material) => {
            if (mat instanceof THREE.MeshStandardMaterial) {
              mat.roughness = 0.28
              mat.metalness = 0.3
              mat.envMapIntensity = 2.2
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

    // Compute bounding box to normalize scale
    const box = new THREE.Box3().setFromObject(clone)
    const size = new THREE.Vector3()
    box.getSize(size)
    const maxDim = Math.max(size.x, size.y, size.z)

    const targetHeight = isMobile ? 3.0 : 3.5
    const targetScale = maxDim > 0 ? targetHeight / maxDim : 1
    clone.scale.setScalar(targetScale)

    const center = new THREE.Vector3()
    box.getCenter(center)
    clone.position.sub(center.multiplyScalar(targetScale))

    return clone
  }, [scene, isMobile])

  // Play animation clip if available in GLB
  useEffect(() => {
    if (names.length > 0 && actions) {
      const action = actions[names[0]]
      if (action) {
        action.reset().fadeIn(0.4).play()
      }
    }
  }, [actions, names])

  const bones = bonesRef.current
  const getBone = useMemo(() => {
    return (...keywords: string[]) => {
      for (const k of keywords) {
        for (const [name, bone] of Object.entries(bones)) {
          if (name.includes(k.toLowerCase())) return bone
        }
      }
      return null
    }
  }, [bones])

  // Smooth frame loop kinematics
  useFrame((state, delta) => {
    const time = state.clock.elapsedTime
    const progress = landingProgress.current

    const rArm = getBone("rightarm", "r_arm", "arm_r", "right_arm", "upperarm_r")
    const rForeArm = getBone("rightforearm", "r_forearm", "forearm_r", "right_forearm", "lowerarm_r")
    const rHand = getBone("righthand", "r_hand", "hand_r", "right_hand")
    const lArm = getBone("leftarm", "l_arm", "arm_l", "left_arm", "upperarm_l")
    const lForeArm = getBone("leftforearm", "l_forearm", "forearm_l", "left_forearm", "lowerarm_l")
    const spine = getBone("spine", "spine1", "spine2", "chest", "torso")
    const head = getBone("head", "neck")
    const hips = getBone("hips", "pelvis", "root")
    const rThigh = getBone("rightupleg", "r_thigh", "thigh_r", "right_thigh", "upperleg_r")
    const lThigh = getBone("leftupleg", "l_thigh", "thigh_l", "left_thigh", "upperleg_l")
    const rCalf = getBone("rightleg", "r_calf", "leg_r", "right_leg", "lowerleg_r")
    const lCalf = getBone("leftleg", "l_calf", "leg_l", "left_leg", "lowerleg_l")

    if (spideyModelRef.current) {
      if (!isLanding && progress < 0.05) {
        // Continuous smooth slow 360 spinning until clicked
        spideyModelRef.current.rotation.y += delta * 1.2
        spideyModelRef.current.rotation.x = THREE.MathUtils.lerp(spideyModelRef.current.rotation.x, 0.05, 0.1)
        spideyModelRef.current.position.y = Math.sin(time * 2.0) * 0.12 + 0.1
        spideyModelRef.current.position.z = 0
      } else {
        // Superhero landing transition
        spideyModelRef.current.rotation.y = THREE.MathUtils.lerp(spideyModelRef.current.rotation.y, 0, 0.18)
        spideyModelRef.current.rotation.x = THREE.MathUtils.lerp(spideyModelRef.current.rotation.x, 0.28, 0.18)

        spideyModelRef.current.position.y = THREE.MathUtils.lerp(spideyModelRef.current.position.y, -1.0, 0.18)
        spideyModelRef.current.position.z = THREE.MathUtils.lerp(spideyModelRef.current.position.z, 0.4, 0.18)

        // Pose bones into iconic superhero 3-point landing
        if (spine) {
          spine.rotation.x = THREE.MathUtils.lerp(spine.rotation.x, 0.85, 0.2)
          spine.rotation.y = THREE.MathUtils.lerp(spine.rotation.y, -0.15, 0.2)
        }
        if (hips) {
          hips.position.y = THREE.MathUtils.lerp(hips.position.y, -0.65, 0.2)
        }
        if (head) {
          head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, -0.75, 0.2)
        }
        if (rArm) {
          rArm.rotation.x = THREE.MathUtils.lerp(rArm.rotation.x, -1.2, 0.22)
          rArm.rotation.z = THREE.MathUtils.lerp(rArm.rotation.z, -0.15, 0.22)
          rArm.rotation.y = THREE.MathUtils.lerp(rArm.rotation.y, 0.3, 0.22)
        }
        if (rForeArm) {
          rForeArm.rotation.x = THREE.MathUtils.lerp(rForeArm.rotation.x, 0.95, 0.22)
        }
        if (rHand) {
          rHand.rotation.x = THREE.MathUtils.lerp(rHand.rotation.x, 0.5, 0.22)
        }
        if (lArm) {
          lArm.rotation.x = THREE.MathUtils.lerp(lArm.rotation.x, 1.25, 0.22)
          lArm.rotation.z = THREE.MathUtils.lerp(lArm.rotation.z, 0.9, 0.22)
          lArm.rotation.y = THREE.MathUtils.lerp(lArm.rotation.y, -0.5, 0.22)
        }
        if (lForeArm) {
          lForeArm.rotation.x = THREE.MathUtils.lerp(lForeArm.rotation.x, -0.6, 0.22)
        }
        if (rThigh) {
          rThigh.rotation.x = THREE.MathUtils.lerp(rThigh.rotation.x, -1.35, 0.22)
          rThigh.rotation.z = THREE.MathUtils.lerp(rThigh.rotation.z, 0.65, 0.22)
        }
        if (rCalf) {
          rCalf.rotation.x = THREE.MathUtils.lerp(rCalf.rotation.x, 1.6, 0.22)
        }
        if (lThigh) {
          lThigh.rotation.x = THREE.MathUtils.lerp(lThigh.rotation.x, -1.1, 0.22)
          lThigh.rotation.z = THREE.MathUtils.lerp(lThigh.rotation.z, -0.75, 0.22)
        }
        if (lCalf) {
          lCalf.rotation.x = THREE.MathUtils.lerp(lCalf.rotation.x, 1.8, 0.22)
        }
      }
    }

    // Shockwave Rings Expanding on Ground Impact
    if (shockwaveRef.current && progress > 0.4) {
      shockwaveRef.current.visible = true
      const impactTime = (progress - 0.4) / 0.6
      const waveScale = THREE.MathUtils.lerp(0.1, 4.5, impactTime)
      shockwaveRef.current.scale.set(waveScale, waveScale, 1)

      const opacity = Math.max(0, 1 - impactTime * 1.1)
      if (shockwaveMatRef.current) shockwaveMatRef.current.opacity = opacity * 0.9
      if (shockwaveRing2MatRef.current) shockwaveRing2MatRef.current.opacity = opacity * 0.7
    } else if (shockwaveRef.current) {
      shockwaveRef.current.visible = false
    }
  })

  return (
    <group ref={groupRef}>
      {/* 3D SPIDER-MAN GLB MODEL WITH PRECISE POINTER EVENTS */}
      <group 
        ref={spideyModelRef}
        onPointerOver={(e) => {
          e.stopPropagation()
          if (onPointerOver) onPointerOver()
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          if (onPointerOut) onPointerOut()
        }}
        onClick={(e) => {
          e.stopPropagation()
          if (onClick) onClick()
        }}
      >
        <primitive object={modelClone} />

        {/* Invisible Hit Collider to ensure seamless raycasting */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 3.6, 16]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      </group>

      {/* GROUND IMPACT SHOCKWAVE SYSTEM */}
      <group ref={shockwaveRef} position={[0, -1.25, 0.4]} rotation={[-Math.PI / 2, 0, 0]} visible={false}>
        <mesh>
          <ringGeometry args={[0.9, 1.05, 48]} />
          <meshBasicMaterial
            ref={shockwaveMatRef}
            color="#00e5ff"
            transparent
            opacity={0.9}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        <mesh scale={0.75}>
          <ringGeometry args={[0.85, 1.0, 48]} />
          <meshBasicMaterial
            ref={shockwaveRing2MatRef}
            color="#ff0033"
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* GROUND SHADOW PLANE */}
      <mesh position={[0, -1.26, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[15, 15]} />
        <shadowMaterial opacity={0.4} />
      </mesh>
    </group>
  )
}

// Preload the Spider-Man model asset
useGLTF.preload("/spiderman.glb")
