import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

// Elegant geometric mandala-inspired SVG motif
function Mandala({ size = 200, opacity = 0.3 }) {
  const n = 12;
  const r1 = size * 0.45;
  const r2 = size * 0.3;
  const r3 = size * 0.15;
  const cx = size / 2, cy = size / 2;
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + r1 * Math.cos(a), y: cy + r1 * Math.sin(a) };
  });
  const pts2 = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2 + Math.PI / n;
    return { x: cx + r2 * Math.cos(a), y: cy + r2 * Math.sin(a) };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ opacity }}>
      <g stroke="url(#mg)" strokeWidth="0.5" fill="none">
        {pts.map((p, i) => (
          <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} />
        ))}
        <polygon points={pts.map(p => `${p.x},${p.y}`).join(' ')} />
        <polygon points={pts2.map(p => `${p.x},${p.y}`).join(' ')} />
        <circle cx={cx} cy={cy} r={r1} />
        <circle cx={cx} cy={cy} r={r2} />
        <circle cx={cx} cy={cy} r={r3} />
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={3} fill="url(#mg)" />
        ))}
      </g>
      <defs>
        <linearGradient id="mg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C8973A" />
          <stop offset="100%" stopColor="#D4691E" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Banaras() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section className="relative overflow-hidden py-32" ref={ref}
             style={{ background: 'linear-gradient(135deg, #1A0A0F 0%, #0D0408 50%, #2A0F1C 100%)' }}>
      {/* Parallax mandala */}
      <motion.div style={{ y }} className="absolute -top-16 -right-16 opacity-20 pointer-events-none">
        <Mandala size={400} opacity={1} />
      </motion.div>
      <motion.div style={{ y: y }} className="absolute -bottom-16 -left-16 opacity-10 pointer-events-none">
        <Mandala size={300} opacity={1} />
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Ornamental line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
            <div className="w-2 h-2 rounded-full bg-gold" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
          </div>

          <p className="text-xs tracking-[0.5em] uppercase text-gold/50 mb-6">The Kashi Connection</p>

          <h2 className="font-display text-5xl md:text-7xl font-light text-cream leading-tight mb-6">
            Designed in Banaras,<br />
            <span className="italic text-gold-gradient">Trusted Everywhere</span>
          </h2>

          {/* Hindi/Bhojpuri touch */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="font-devanagari text-2xl md:text-3xl text-gold/80 my-8 tracking-wide"
          >
            "काशी के रचना, व्यापार के पहचान"
          </motion.p>
          <p className="text-xs text-gold/30 tracking-widest mb-10 italic">
            Kashi's craft, your business's identity
          </p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="text-cream/60 text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Varanasi — the oldest living city in the world — has always been a centre of artistry and craft.
            We carry that legacy into modern packaging design, bringing the precision of Banarasi craftsmanship
            to every label, box, and brand identity we create.
          </motion.p>

          <div className="flex items-center justify-center gap-4 mt-10">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
            <div className="w-2 h-2 rounded-full bg-gold" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
