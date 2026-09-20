import Image from "next/image"
import { forwardRef } from "react"

export const IntroTypography = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div 
      ref={ref} 
      className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none opacity-0"
    >
      <div className="relative text-center">
        {/* Main Title / Logo */}
        <h1 className="flex items-center justify-center px-4">
          <Image 
            src="/logo.png" 
            alt="Hackintym '26 2.0" 
            loading="eager"
            className="w-full max-w-[320px] sm:max-w-[500px] md:max-w-[680px] lg:max-w-[800px] h-auto object-contain drop-shadow-[0_10px_35px_rgba(0,102,255,0.5)] select-none pointer-events-none"
            height={200}
            width={200}
          />
          <span className="sr-only">Hackintym&apos;26 2.0</span>
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

      </div>
    </div>
  )
})

IntroTypography.displayName = "IntroTypography"
