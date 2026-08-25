import { forwardRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image";

export const CinematicHUD = forwardRef<HTMLDivElement>((_, ref) => {
  const navItems = ["HQ", "MISSION", "UNIVERSE", "TIMELINE"]

  return (
    <div
      ref={ref}
      className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-20 pointer-events-none opacity-0"
    >
      {/* Top Left: Logo / Brand Mark */}
      <div className="flex flex-col items-start gap-1">
        <Image
          src="/logo.png"
          alt="HACKINTYM '26 2.0"
          className="h-8 sm:h-9 w-auto max-w-40 object-contain select-none"
          width={200}
          height={200}
        />
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

      {/* Top Right: Status / CTA (Desktop only preview) */}
      <div className="hidden md:flex flex-col items-end gap-1">
        <motion.a
          href="#registration"
          onClick={(e) => {
            e.preventDefault();
            const elem =
              document.getElementById("registration") ||
              document.getElementById("countdown");
            elem?.scrollIntoView({ behavior: "smooth" });
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="pointer-events-auto px-4 py-1.5 rounded bg-power-red/80 hover:bg-power-red text-white text-[11px] font-mono font-bold tracking-widest uppercase border border-power-red/50 shadow-[0_0_15px_rgba(255,0,51,0.5)] transition-all flex items-center gap-2 cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
          REGISTER NOW
        </motion.a>
        <div className="text-[9px] font-mono tracking-widest text-white/30 scanline relative pl-10 h-3 w-32">
          {/* Scanline handled by CSS before element */}V 2.0.26
        </div>
      </div>
    </div>
  );
})

CinematicHUD.displayName = "CinematicHUD"
