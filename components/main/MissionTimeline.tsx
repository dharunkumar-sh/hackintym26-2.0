"use client"

import { useState, useEffect, useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Clock, Radio, Calendar } from "lucide-react"
import { TIMELINE } from "@/lib/data"

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger)
}

export function MissionTimeline() {
  const containerRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const mobileLineRef = useRef<HTMLDivElement>(null)

  // Current client timestamp for live status traversal with system clock
  const [mounted, setMounted] = useState(false)
  const [now, setNow] = useState<number>(() => Date.now())

  useEffect(() => {
    setMounted(true)
    setNow(Date.now())
    const interval = setInterval(() => {
      setNow(Date.now())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Parse timestamps directly from items
  const parsedTimeline = TIMELINE.map((item, idx) => {
    let timestamp = 0
    if (item.isoDate) {
      const parsedIso = Date.parse(item.isoDate)
      if (!isNaN(parsedIso)) timestamp = parsedIso
    }
    if (!timestamp) {
      const dateStr = item.time ? `${item.date} ${item.time}` : item.date
      const parsedDate = Date.parse(dateStr)
      if (!isNaN(parsedDate)) timestamp = parsedDate
    }
    return {
      ...item,
      timestamp,
      index: idx
    }
  })

  // Determine stage & traversal progress
  const firstTimestamp = parsedTimeline[0]?.timestamp ?? 0
  const lastTimestamp = parsedTimeline[parsedTimeline.length - 1]?.timestamp ?? 0

  // Calculate live traversal percentage (0 - 100%)
  let traversalPercent = 0
  if (mounted) {
    if (now <= firstTimestamp) {
      traversalPercent = 0
    } else if (now >= lastTimestamp) {
      traversalPercent = 100
    } else {
      // Find current interval for accurate node-based proportional traversal
      let currentIdx = 0
      for (let i = 0; i < parsedTimeline.length - 1; i++) {
        if (now >= parsedTimeline[i].timestamp && now < parsedTimeline[i + 1].timestamp) {
          currentIdx = i
          const segmentDuration = parsedTimeline[i + 1].timestamp - parsedTimeline[i].timestamp
          const segmentElapsed = now - parsedTimeline[i].timestamp
          const segmentProgress = segmentDuration > 0 ? segmentElapsed / segmentDuration : 0
          traversalPercent = ((currentIdx + segmentProgress) / (parsedTimeline.length - 1)) * 100
          break
        }
      }
    }
  }

  useGSAP(() => {
    if (!containerRef.current) return

    // ScrollTrigger line extension (animates down on scroll)
    if (lineRef.current) {
      gsap.to(lineRef.current, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 75%",
          scrub: 1
        }
      })
    }

    if (mobileLineRef.current) {
      gsap.to(mobileLineRef.current, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 75%",
          scrub: 1
        }
      })
    }

    // Reveal nodes
    const nodes = gsap.utils.toArray<HTMLElement>(".timeline-node")
    nodes.forEach((node) => {
      gsap.fromTo(
        node,
        { opacity: 0, y: 30, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: node,
            start: "top 85%"
          }
        }
      )
    })
  }, { scope: containerRef })

  // Helper to determine status of each item
  const getItemStatus = (itemTime: number, idx: number) => {
    if (!mounted) return { status: "upcoming", label: "UPCOMING" }
    
    // Check if this is the active/current item
    const nextItem = parsedTimeline[idx + 1]
    const isPast = now >= itemTime
    const isNextFuture = nextItem ? now < nextItem.timestamp : false

    if (isPast && (isNextFuture || !nextItem)) {
      return { status: "active", label: "CURRENT PHASE" }
    } else if (isPast) {
      return { status: "completed", label: "COMPLETED" }
    } else {
      return { status: "upcoming", label: "SCHEDULED" }
    }
  }

  return (
    <section ref={containerRef} id="timeline" className="relative py-32 px-4 sm:px-6 z-10 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-intel-blue/15 border border-intel-blue/40 text-intel-blue-light font-mono text-xs tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(0,102,255,0.25)]">
            <Clock className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: "12s" }} />
            <span>CHRONO PROTOCOL</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase text-white mb-4">
            Mission Timeline
          </h2>
          <p className="text-cyan-400 font-mono text-xs sm:text-sm tracking-widest uppercase flex items-center justify-center gap-2">
            <span>Synchronize your watches</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
          </p>
        </div>

        <div className="relative">
          {/* Central Line Base Track (Desktop) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2 hidden md:block rounded-full"></div>
          
          {/* Central Line Traversed Fill (Desktop - live time progress) */}
          {mounted && (
            <div 
              className="absolute left-1/2 top-0 w-1 bg-linear-to-b from-cyan-400 via-intel-blue to-power-red -translate-x-1/2 hidden md:block rounded-full shadow-[0_0_12px_#00F0FF] transition-all duration-1000 z-0"
              style={{ height: `${traversalPercent}%` }}
            >
              {/* Traversal Seeker Head */}
              {traversalPercent > 0 && traversalPercent < 100 && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-cyan-300 rounded-full shadow-[0_0_15px_#00F0FF] animate-pulse"></div>
              )}
            </div>
          )}

          {/* Central Line Scroll Scrub (Desktop) */}
          <div 
            ref={lineRef} 
            className="absolute left-1/2 top-0 w-1 bg-linear-to-b from-intel-blue via-cyan-400 to-white -translate-x-1/2 hidden md:block shadow-[0_0_12px_#0066FF] h-0 opacity-40 z-0 rounded-full"
          ></div>

          {/* Mobile Line Base Track */}
          <div className="absolute left-4 top-0 bottom-0 w-1 bg-white/10 md:hidden rounded-full"></div>
          
          {/* Mobile Line Traversed Fill (live time progress) */}
          {mounted && (
            <div 
              className="absolute left-4 top-0 w-1 bg-linear-to-b from-cyan-400 via-intel-blue to-power-red md:hidden rounded-full shadow-[0_0_12px_#00F0FF] transition-all duration-1000 z-0"
              style={{ height: `${traversalPercent}%` }}
            >
              {traversalPercent > 0 && traversalPercent < 100 && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 bg-cyan-300 rounded-full shadow-[0_0_15px_#00F0FF] animate-pulse"></div>
              )}
            </div>
          )}

          {/* Mobile Line Scroll Scrub */}
          <div 
            ref={mobileLineRef} 
            className="absolute left-4 top-0 w-1 bg-linear-to-b from-intel-blue via-cyan-400 to-white md:hidden shadow-[0_0_12px_#0066FF] h-0 opacity-40 z-0 rounded-full"
          ></div>

          {/* Timeline Nodes */}
          <div className="flex flex-col gap-10 sm:gap-14 md:gap-20">
            {parsedTimeline.map((item, i) => {
              const isEven = i % 2 === 0
              const { status } = getItemStatus(item.timestamp, i)
              const isActive = status === "active"

              return (
                <div 
                  key={i} 
                  id={isActive ? "active-timeline-node" : undefined}
                  className={`timeline-node relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                  data-side={isEven ? 'right' : 'left'}
                >
                  {/* Node Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 mt-1.5 md:mt-0 z-10 flex items-center justify-center">
                    {isActive ? (
                      <div className="relative flex items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-power-red/60 opacity-75"></span>
                        <div className="w-5 h-5 bg-background border-2 border-power-red rounded-full shadow-[0_0_20px_#E10600] flex items-center justify-center">
                          <Radio className="w-2.5 h-2.5 text-power-red-light animate-pulse" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-4 h-4 bg-background border-2 border-intel-blue rounded-full shadow-[0_0_12px_rgba(0,102,255,0.4)]"></div>
                    )}
                  </div>
                  
                  {/* Content Card Box */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12 text-left md:text-right' : 'md:pl-12 text-left'}`}>
                    <div 
                      className={`glass-panel p-5 sm:p-6 inline-block w-full rounded-2xl transition-all duration-300 group ${
                        isActive 
                          ? 'border-power-red/60 bg-power-red/10 shadow-[0_0_35px_rgba(225,6,0,0.25)] ring-1 ring-power-red/40' 
                          : 'border-white/10 hover:border-intel-blue/40 bg-black/40'
                      }`}
                    >
                      {/* Active Phase Badge (Only for current active milestone) */}
                      {isActive && (
                        <div className={`flex items-center gap-2 mb-3 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-power-red/20 border border-power-red/60 text-power-red-light font-mono text-[10px] font-bold tracking-widest uppercase animate-pulse shadow-[0_0_10px_rgba(225,6,0,0.4)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-power-red"></span>
                            CURRENT PHASE
                          </span>
                        </div>
                      )}

                      {/* Date & High-contrast Time Display */}
                      <div className={`flex flex-wrap items-center gap-2 mb-2 font-mono text-xs sm:text-sm tracking-widest ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        <div className="flex items-center gap-1.5 text-white/80">
                          <Calendar className="w-3.5 h-3.5 text-intel-blue-light shrink-0" />
                          <span>{item.date}</span>
                        </div>

                        {item.time && (
                          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 font-bold shadow-[0_0_12px_rgba(0,240,255,0.3)]">
                            <Clock className="w-3 h-3 text-cyan-400 shrink-0" />
                            <span className="text-glow-blue">{item.time}</span>
                          </div>
                        )}
                      </div>

                      {/* Event Title */}
                      <h3 className={`text-xl sm:text-2xl font-black tracking-wider uppercase transition-colors ${
                        isActive 
                          ? 'text-white text-glow-red' 
                          : 'text-white/90 group-hover:text-intel-blue-light'
                      }`}>
                        {item.event}
                      </h3>

                      {/* Description */}
                      {item.description && (
                        <p className="mt-2 text-xs sm:text-sm text-white/70 font-normal leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
