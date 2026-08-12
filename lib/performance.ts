"use client"

export type PerformanceTier = "HIGH" | "BALANCED" | "PERFORMANCE"

export interface PerformanceConfig {
  tier: PerformanceTier
  particleCount: number
  dpr: number
  enableBloom: boolean
  bloomIntensity: number
  reducedMotion: boolean
}

export function detectPerformanceConfig(): PerformanceConfig {
  if (typeof window === "undefined") {
    return {
      tier: "BALANCED",
      particleCount: 2000,
      dpr: 1.0,
      enableBloom: true,
      bloomIntensity: 0.8,
      reducedMotion: false
    }
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const width = window.innerWidth
  const deviceMemory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 4
  const hardwareConcurrency = navigator.hardwareConcurrency || 4
  const rawDpr = window.devicePixelRatio || 1

  // Mobile or Low-end hardware
  if (width < 768 || reducedMotion || deviceMemory < 4 || hardwareConcurrency < 4) {
    return {
      tier: "PERFORMANCE",
      particleCount: 800,
      dpr: 1.0,
      enableBloom: false,
      bloomIntensity: 0,
      reducedMotion
    }
  }

  // Mid-range laptops
  if (width < 1280 || deviceMemory < 8 || hardwareConcurrency < 8) {
    return {
      tier: "BALANCED",
      particleCount: 2000,
      dpr: Math.min(1.25, rawDpr),
      enableBloom: true,
      bloomIntensity: 0.8,
      reducedMotion
    }
  }

  // High-end Desktop
  return {
    tier: "HIGH",
    particleCount: 4000,
    dpr: Math.min(1.5, rawDpr),
    enableBloom: true,
    bloomIntensity: 1.2,
    reducedMotion
  }
}
