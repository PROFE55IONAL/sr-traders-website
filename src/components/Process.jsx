import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageCircle, PenTool, RefreshCw, CheckSquare, Download } from 'lucide-react';

const steps = [
  { icon: MessageCircle, title: 'Requirement Discussion',
    desc: 'We understand your product, target audience, brand personality, and packaging constraints before touching the design.' },
  { icon: PenTool,       title: 'Concept Design',
    desc: 'Our designers create initial artwork concepts with multiple layout directions, colour options, and typography choices.' },
  { icon: RefreshCw,     title: 'Revisions',
    desc: 'You review and give feedback. We refine until the design perfectly represents your brand and product.' },
  { icon: CheckSquare,   title: 'Final Artwork',
    desc: 'Approved design is prepared with professional finishing — CMYK colour, proper bleed, crop marks, and text outlines.' },
  { icon: Download,      title: 'Print-Ready Delivery',
    desc: 'Final files delivered in PDF, CDR, AI, or any format your printer requires. Ready to go straight to press.' },
];

export default function Process() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="process" className="section-pad" ref={ref}
             style={{ background: 'rgba(20,32,48,0.55)' }}>
      <div className="max-w-6xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-14"
        >
          <p className="text-xs tracking-[0.4em] uppercase font-medium mb-3" style={{ color: '#D4A847' }}>
            How We Work
          </p>
          <h2 className="font-display font-light" style={{ fontSize: 'clamp(2.2rem,4vw,3.5rem)', color: '#FFFFFF' }}>
            Our Process
          </h2>
          <span className="gold-line" />
        </motion.div>

        <div className="space-y-10">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.55, ease: 'easeOut' }}
                className="flex items-start gap-6 p-6 rounded-sm"
                style={{ background: 'rgba(21,40,62,0.50)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {/* Step number + icon */}
                <div className="flex-shrink-0 flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-sm flex items-center justify-center"
                       style={{ background: 'rgba(212,168,71,0.12)', border: '1px solid rgba(212,168,71,0.30)' }}>
                    <Icon size={20} style={{ color: '#D4A847' }} />
                  </div>
                  <span className="text-xs font-bold tracking-widest" style={{ color: '#D4A847' }}>
                    0{i + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="pt-1">
                  <h3 className="font-display text-xl font-medium mb-2" style={{ color: '#FFFFFF' }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#A8BAC9' }}>
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
