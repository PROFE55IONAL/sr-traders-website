import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle, Zap, Award, Clock, Palette, FileCheck } from 'lucide-react';

function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    let startTime;
    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-display text-5xl md:text-6xl font-semibold text-gold-gradient">
      {count}{suffix}
    </span>
  );
}

const stats = [
  { target: 1000, suffix: '+', label: 'Designs Created', sub: 'Across all categories' },
  { target: 15, suffix: '+', label: 'Years Experience', sub: 'In Varanasi & beyond' },
  { target: 500, suffix: '+', label: 'Happy Clients', sub: 'Across India' },
  { target: 50, suffix: '+', label: 'Brand Identities', sub: 'Built from scratch' },
];

const features = [
  { icon: Palette, title: 'Custom Artwork', desc: 'Every design is made from scratch — no templates, no shortcuts.' },
  { icon: FileCheck, title: 'Print-Ready Files', desc: 'CMYK, bleed, crop marks. Files delivered exactly as your printer needs.' },
  { icon: Zap, title: 'Fast Turnaround', desc: 'Urgent jobs? We move fast without compromising quality.' },
  { icon: CheckCircle, title: 'Free Revisions', desc: 'We iterate until you\'re completely satisfied with the artwork.' },
  { icon: Award, title: 'Industry Standards', desc: 'FDA norms, Ayush guidelines, FSSAI requirements — we know them all.' },
  { icon: Clock, title: 'On-Time Delivery', desc: 'We respect your production schedules and printing deadlines.' },
];

export default function WhyUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-pad bg-[#0D0408]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-gold/50 mb-4">Why SR Traders</p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-cream">
            Numbers That<br />
            <span className="italic text-gold-gradient">Speak for Us</span>
          </h2>
          <div className="mt-4 w-16 h-px bg-gradient-to-r from-gold to-transparent" />
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <Counter target={s.target} suffix={s.suffix} />
              <div className="text-cream text-sm font-medium mt-2">{s.label}</div>
              <div className="text-cream/30 text-xs mt-1">{s.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="flex gap-4 p-5 border border-gold/8 hover:border-gold/25 rounded-sm transition-all duration-400 group"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-sm flex items-center justify-center border border-gold/20 group-hover:border-gold/50 transition-colors"
                     style={{ background: 'rgba(200,151,58,0.06)' }}>
                  <Icon size={18} className="text-gold" />
                </div>
                <div>
                  <h3 className="text-cream text-sm font-medium mb-1">{f.title}</h3>
                  <p className="text-cream/40 text-xs leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
