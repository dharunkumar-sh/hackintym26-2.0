import { forwardRef } from "react"

export const IntroTypography = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div 
      ref={ref} 
      className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none opacity-0"
    >
      <div className="relative text-center">
        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white uppercase" style={{ textShadow: "0 4px 30px rgba(0, 102, 255, 0.4)" }}>
          Hackintym <span className="text-transparent bg-clip-text bg-gradient-to-r from-intel-blue to-power-red">'26</span>
        </h1>
        
        {/* Mission Status / HUD element */}
        <div className="mt-4 flex items-center justify-center gap-4 text-xs tracking-[0.2em] font-mono text-intel-blue-light uppercase opacity-80">
          <span className="w-12 h-px bg-intel-blue-light/50"></span>
          <span>30-Hour Innovation Mission</span>
          <span className="w-12 h-px bg-intel-blue-light/50"></span>
        </div>

        {/* Hero Tagline */}
        <div className="mt-6 text-xl md:text-2xl font-bold tracking-widest text-white/90 overflow-hidden">
          <div className="tagline-words flex gap-3 justify-center">
            <span className="tagline-word translate-y-full inline-block">ASSEMBLE.</span>
            <span className="tagline-word translate-y-full inline-block">INNOVATE.</span>
            <span className="tagline-word translate-y-full inline-block text-power-red text-glow-red">CONQUER.</span>
          </div>
        </div>

        {/* Small Interface markings */}
        <div className="absolute -top-12 -left-12 text-[10px] font-mono text-white/30 hidden md:block">
          SYS.RDY // {new Date().getFullYear()}
        </div>
        <div className="absolute -bottom-12 -right-12 text-[10px] font-mono text-white/30 hidden md:block">
          NEXUS_CORE // ACTIVE
        </div>
      </div>
    </div>
  )
})

IntroTypography.displayName = "IntroTypography"
