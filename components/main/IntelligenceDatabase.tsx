"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { FAQS } from "@/lib/data"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function IntelligenceDatabase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <section ref={ref} id="intel" className="relative py-32 px-6 z-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-white mb-4">
              Intelligence
            </h2>
            <p className="text-intel-blue-light font-mono text-sm tracking-widest uppercase">
              DECRYPTED FAQ DATABASE
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="glass-panel p-8"
        >
          <Accordion className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b-white/10">
                <AccordionTrigger className="text-left font-bold tracking-widest uppercase text-white/90 hover:text-intel-blue transition-colors py-6 text-sm md:text-base">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-white/30">0{i + 1}</span>
                    {faq.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-white/60 font-light leading-relaxed pl-10 pb-6 text-sm md:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
