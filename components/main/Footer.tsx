"use client"

import { MapPin, Mail, Phone, Heart, Terminal } from "lucide-react"
import Image from "next/image"

export function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/85 backdrop-blur-2xl text-white pt-16 pb-8 overflow-hidden">
      {/* Marvel Ambient Glow in Footer */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-intel-blue/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-power-red/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
          
          {/* Column 1: Brand Info (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Brand Logo */}
              <a 
                href="#hero" 
                onClick={(e) => handleNavClick(e, "hero")}
                className="inline-flex items-center group cursor-pointer mb-4"
              >
                <Image 
                  src="/logo.png" 
                  alt="HACKINTYM '26 2.0" 
                  className="h-14 sm:h-16 md:h-20 w-auto max-w-65 sm:max-w-[320px] object-contain transition-transform group-hover:scale-105 select-none"
                  width={100}
                  height={80}
                />
              </a>

              <p className="text-xs sm:text-sm font-mono text-intel-blue-light/80 tracking-wide uppercase leading-relaxed max-w-sm mb-6">
                30 Hour Innovation Challenge for students to build solutions to real-world problems.
              </p>
            </div>

            {/* Social Icons (Instagram, LinkedIn) */}
            <div className="flex items-center gap-3">
              <a 
                href="https://www.instagram.com/msec_devdynasty" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-power-red-light hover:border-power-red/50 hover:bg-power-red/10 transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/msec-devdynasty/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-intel-blue-light hover:border-intel-blue/50 hover:bg-intel-blue/10 transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (lg:col-span-3) */}
          <div className="lg:col-span-3">
            <h3 className="text-sm sm:text-base font-black tracking-[0.2em] uppercase text-white mb-6 border-l-2 border-intel-blue pl-3">
              Quick Links
            </h3>
            <ul className="space-y-3.5 font-mono text-xs font-bold tracking-widest uppercase text-white/70">
              <li>
                <a href="#hero" onClick={(e) => handleNavClick(e, "hero")} className="hover:text-intel-blue-light transition-colors cursor-pointer flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-intel-blue opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>About Event</span>
                </a>
              </li>
              <li>
                <a href="#tracks" onClick={(e) => handleNavClick(e, "tracks")} className="hover:text-intel-blue-light transition-colors cursor-pointer flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-intel-blue opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Themes & Tracks</span>
                </a>
              </li>
              <li>
                <a href="#timeline" onClick={(e) => handleNavClick(e, "timeline")} className="hover:text-intel-blue-light transition-colors cursor-pointer flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-intel-blue opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Timeline</span>
                </a>
              </li>
              <li>
                <a href="#prizes" onClick={(e) => handleNavClick(e, "prizes")} className="hover:text-intel-blue-light transition-colors cursor-pointer flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-intel-blue opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Prize Pool</span>
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleNavClick(e, "contact")} className="hover:text-intel-blue-light transition-colors cursor-pointer flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-intel-blue opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>FAQs & Support</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Us (lg:col-span-4) */}
          <div className="lg:col-span-4">
            <h3 className="text-sm sm:text-base font-black tracking-[0.2em] uppercase text-white mb-6 border-l-2 border-power-red pl-3">
              Contact Us
            </h3>
            <ul className="space-y-4 font-mono text-xs font-bold tracking-wider uppercase text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-intel-blue-light shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  363, Arcot Road, Puliyur 1st Main Rd, Subedar Colony, Kodambakkam, Chennai, Tamil Nadu 600024
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-power-red-light shrink-0" />
                <a 
                  href="mailto:msec.devdynastyclub@gmail.com" 
                  className="hover:text-white transition-colors break-all cursor-pointer"
                >
                  msec.devdynastyclub@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-intel-blue-light shrink-0" />
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <a 
                    href="tel:+916383113382" 
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    +91 63831 13382
                  </a>
                  <span className="text-white/40">/</span>
                  <a 
                    href="tel:+916381846882" 
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    +91 63818 46882
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar Divider */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs font-bold tracking-widest uppercase text-white/60">
          <div>
            © 2026 HACKINTYM '26 2.0. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-2">
            <span>BUILT WITH</span>
            <Heart className="w-3.5 h-3.5 text-power-red fill-power-red animate-pulse" />
            <span>BY THE <strong className="text-white font-black">DEVDYNASTY CLUB</strong></span>
          </div>
        </div>

      </div>
    </footer>
  )
}
