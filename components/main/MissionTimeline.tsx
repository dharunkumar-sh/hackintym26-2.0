"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TIMELINE } from "@/lib/data"

export function MissionTimeline() {
  const containerRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  
  useGSAP(() => {
    if (!containerRef.current || !lineRef.current) return
    
    // Draw the line down
    gsap.to(lineRef.current, {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true
      }
    })

    // Reveal nodes
    const nodes = gsap.utils.toArray(".timeline-node")
    nodes.forEach((node: any) => {
      gsap.fromTo(node, 
        { opacity: 0, x: node.dataset.side === 'left' ? -50 : 50 },
        {
          opacity: 1, 
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: node,
            start: "top 80%",
          }
        }
      )
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} id="timeline" className="relative py-32 px-6 z-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-white mb-4">
            Mission Timeline
          </h2>
          <p className="text-intel-blue-light font-mono text-sm tracking-widest uppercase">
            Synchronize your watches.
          </p>
        </div>

        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block"></div>
          {/* Animated Line */}
          <div ref={lineRef} className="absolute left-1/2 top-0 w-px bg-intel-blue -translate-x-1/2 hidden md:block shadow-[0_0_10px_#0066FF] h-0"></div>

          {/* Timeline Mobile Line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10 md:hidden"></div>

          <div className="flex flex-col gap-12 md:gap-24">
            {TIMELINE.map((item, i) => {
              const isEven = i % 2 === 0
              return (
                <div 
                  key={i} 
                  className={`timeline-node relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                  data-side={isEven ? 'right' : 'left'}
                >
                  {/* Node Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-background border-2 border-intel-blue rounded-full -translate-x-1/2 mt-1.5 md:mt-0 z-10 shadow-[0_0_15px_#0066FF]"></div>
                  
                  {/* Content Box */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12 text-left md:text-right' : 'md:pl-12 text-left'}`}>
                    <div className="glass-panel p-6 inline-block w-full border-white/5 hover:border-intel-blue/30 transition-colors">
                      <div className="text-power-red font-mono text-sm tracking-widest uppercase mb-2">
                        {item.date} {item.time && `// ${item.time}`}
                      </div>
                      <h3 className="text-2xl font-black tracking-widest uppercase text-white">
                        {item.event}
                      </h3>
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
