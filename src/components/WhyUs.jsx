import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle, Zap, Award, Clock, Palette, FileCheck } from 'lucide-react';

function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let startTime;
    const duration = 1600;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-display font-semibold text-gold-gradient"
          style={{ fontSize: 'clamp(2.5rem,4vw,3.5rem)' }}>
      {count}{suffix}
    </span>
  );
}

const stats = [
  { target: 1000, suffix: '+', label: 'Designs Created',  sub: 'Across all categories' },
  { target: 15,   suffix: '+', label: 'Years Experience', sub: 'In Varanasi & beyond' },
  { target: 500,  suffix: '+', label: 'Happy Clients',    sub: 'Across India' },
  { target: 50,   suffix: '+', label: 'Brand Identities', sub: 'Built from scratch' },
];

const features = [
  { icon: Palette,   title: 'Custom Artwork',      desc: 'Every design is made from scratch — no templates, no shortcuts.' },
  { icon: FileCheck, title: 'Print-Ready Files',   desc: 'CMYK, bleed, crop marks. Files delivered exactly as your printer needs.' },
  { icon: Zap,       title: 'Fast Turnaround',     desc: 'Urgent jobs? We move fast without compromising quality.' },
  { icon: CheckCircle,title:'Free Revisions',      desc: 'We iterate until you\'re completely satisfied with the artwork.' },
  { icon: Award,     title: 'Industry Standards',  desc: 'FDA norms, Ayush guidelines, FSSAI requirements — we know them all.' },
  { icon: Clock,     title: 'On-Time Delivery',    desc: 'We respect your production schedules and printing deadlines.' },
];

export default function WhyUs() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section-pad" ref={ref}
             style={{ background: 'rgba(15,30,46,0.55)' }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-14"
        >
          <p className="text-xs tracking-[0.4em] uppercase font-medium mb-3" style={{ color: '#D4A847' }}>
            Why SR Traders
          </p>
          <h2 className="font-display font-light" style={{ fontSize: 'clamp(2.2rem,4vw,3.5rem)', color: '#FFFFFF' }}>
            Numbers That <em className="not-italic text-gold-gradient">Speak for Us</em>
          </h2>
          <span className="gold-line" />
        </motion.div>

        {/* Stat counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16 pb-16"
             style={{ borderBottom: '1px solid rgba(255,255,255,0.10)' }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.09 }}
              className="text-center"
            >
              <Counter target={s.target} suffix={s.suffix} />
              <div className="text-sm font-medium mt-2" style={{ color: '#FFFFFF' }}>{s.label}</div>
              <div className="text-xs mt-1" style={{ color: '#8FA3BA' }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25 + i * 0.07 }}
                className="flex gap-4 p-5 rounded-sm transition-all duration-300 group"
                style={{ background: 'rgba(21,40,62,0.50)', border: '1px solid rgba(255,255,255,0.08)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(212,168,71,0.35)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-sm flex items-center justify-center"
                     style={{ background: 'rgba(212,168,71,0.12)', border: '1px solid rgba(212,168,71,0.25)' }}>
                  <Icon size={18} style={{ color: '#D4A847' }} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1" style={{ color: '#FFFFFF' }}>{f.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#A8BAC9' }}>{f.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
