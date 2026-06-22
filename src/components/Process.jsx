import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageCircle, PenTool, RefreshCw, CheckSquare, Download } from 'lucide-react';

const steps = [
  { icon: MessageCircle, title: 'Requirement Discussion', desc: 'We understand your product, target audience, brand personality, and packaging constraints before touching the design.' },
  { icon: PenTool, title: 'Concept Design', desc: 'Our designers create initial artwork concepts with multiple layout directions, colour options, and typography choices.' },
  { icon: RefreshCw, title: 'Revisions', desc: 'You review and give feedback. We refine until the design perfectly represents your brand and product.' },
  { icon: CheckSquare, title: 'Final Artwork', desc: 'Approved design is prepared with professional finishing — CMYK colour, proper bleed, crop marks, and text outlines.' },
  { icon: Download, title: 'Print-Ready Delivery', desc: 'Final files delivered in PDF, CDR, AI, or any format your printer requires. Ready to go straight to press.' },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="process" className="section-pad bg-[#0A0306]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-gold/50 mb-4">How We Work</p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-cream">
            Our Process
          </h2>
          <div className="mt-4 w-16 h-px bg-gradient-to-r from-gold to-transparent" />
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold/20 to-transparent hidden sm:block" />

          <div className="space-y-12">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isRight = i % 2 === 1;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: isRight ? 40 : -40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.12, duration: 0.6, ease: 'easeOut' }}
                  className={`flex items-center gap-8 md:gap-16 ${isRight ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isRight ? 'md:text-right' : ''}`}>
                    <p className="text-xs tracking-[0.3em] uppercase text-gold/40 mb-2">Step {i + 1}</p>
                    <h3 className="font-display text-2xl text-cream mb-3">{step.title}</h3>
                    <p className="text-cream/50 text-sm leading-relaxed max-w-sm">{step.desc}</p>
                  </div>

                  {/* Icon node */}
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center border border-gold/40 relative z-10"
                         style={{ background: 'linear-gradient(135deg, rgba(200,151,58,0.15), rgba(107,26,42,0.2))' }}>
                      <Icon size={22} className="text-gold" />
                    </div>
                    {/* Pulse */}
                    <div className="absolute inset-0 rounded-full border border-gold/20 animate-ping opacity-30" />
                  </div>

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
