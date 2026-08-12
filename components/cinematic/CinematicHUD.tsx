import { forwardRef } from "react"
import { motion } from "framer-motion"

export const CinematicHUD = forwardRef<HTMLDivElement>((_, ref) => {
  const navItems = ["HQ", "MISSION", "UNIVERSE", "TIMELINE", "HEROES", "INTEL"]

  return (
    <div 
      ref={ref} 
      className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-20 pointer-events-none opacity-0"
    >
      {/* Top Left: Logo / Brand Mark */}
      <div className="flex flex-col items-start gap-1">
        <div className="text-xl font-black tracking-widest text-white uppercase flex items-center gap-2">
          H<span className="text-intel-blue">X</span>26
        </div>
        <div className="text-[9px] font-mono tracking-widest text-white/50">
          GLOBAL_HACK_PROTOCOL
        </div>
      </div>

      {/* Top Center: Navigation Preview */}
      <div className="hidden md:flex gap-8 pointer-events-auto">
        {navItems.map((item, idx) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-xs font-mono tracking-widest text-white/60 hover:text-white transition-colors uppercase relative group"
            whileHover={{ y: -2 }}
          >
            {item}
            <span className="absolute -bottom-2 left-0 right-0 h-px bg-intel-blue/0 group-hover:bg-intel-blue transition-colors"></span>
          </motion.a>
        ))}
      </div>

      {/* Top Right: Status */}
      <div className="flex flex-col items-end gap-1">
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-intel-blue-light">
          <span className="w-2 h-2 rounded-full bg-intel-blue-light animate-pulse"></span>
          NEXUS ONLINE
        </div>
        <div className="text-[9px] font-mono tracking-widest text-white/30 scanline relative pl-10 h-3 w-32">
          {/* Scanline handled by CSS before element */}
          V 2.0.26
        </div>
      </div>
      
      {/* Decorative HUD overlay lines */}
      <div className="fixed top-20 left-6 w-px h-32 bg-gradient-to-b from-intel-blue/30 to-transparent"></div>
      <div className="fixed bottom-20 right-6 w-px h-32 bg-gradient-to-t from-power-red/30 to-transparent"></div>
    </div>
  )
})

CinematicHUD.displayName = "CinematicHUD"
