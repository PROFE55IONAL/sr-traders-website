import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

function Mandala({ size = 200 }) {
  const n = 12, cx = size / 2, cy = size / 2;
  const r1 = size * 0.44, r2 = size * 0.28, r3 = size * 0.14;
  const pts  = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + r1 * Math.cos(a), y: cy + r1 * Math.sin(a) };
  });
  const pts2 = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2 + Math.PI / n;
    return { x: cx + r2 * Math.cos(a), y: cy + r2 * Math.sin(a) };
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id="mg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#D4A847" />
          <stop offset="100%" stopColor="#D4691E" />
        </linearGradient>
      </defs>
      <g stroke="url(#mg)" strokeWidth="0.6" fill="none" opacity="0.7">
        {pts.map((p, i) => <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} />)}
        <polygon points={pts.map(p => `${p.x},${p.y}`).join(' ')} />
        <polygon points={pts2.map(p => `${p.x},${p.y}`).join(' ')} />
        <circle cx={cx} cy={cy} r={r1} />
        <circle cx={cx} cy={cy} r={r2} />
        <circle cx={cx} cy={cy} r={r3} />
        {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={2.5} fill="url(#mg)" />)}
      </g>
    </svg>
  );
}

export default function Banaras() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  return (
    <section className="relative overflow-hidden py-28" ref={ref}
             style={{ background: 'linear-gradient(160deg, #1A0D18 0%, #141C2A 50%, #1C0D18 100%)' }}>

      {/* Parallax mandalas — decorative only, not overwhelming */}
      <motion.div style={{ y }} className="absolute -top-12 -right-12 pointer-events-none opacity-25">
        <Mandala size={360} />
      </motion.div>
      <motion.div style={{ y }} className="absolute -bottom-12 -left-12 pointer-events-none opacity-12">
        <Mandala size={280} />
      </motion.div>

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Ornamental divider */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-14" style={{ background: 'linear-gradient(to right, transparent, #D4A847)' }} />
            <div className="w-2 h-2 rounded-full" style={{ background: '#D4A847' }} />
            <div className="h-px w-14" style={{ background: 'linear-gradient(to left, transparent, #D4A847)' }} />
          </div>

          <p className="text-xs tracking-[0.5em] uppercase font-medium mb-5" style={{ color: '#D4A847' }}>
            The Kashi Connection
          </p>

          <h2 className="font-display font-light leading-tight mb-5"
              style={{ fontSize: 'clamp(2.4rem,5vw,4.5rem)', color: '#FFFFFF' }}>
            Designed in Banaras,<br />
            <em className="not-italic text-gold-gradient font-medium">Trusted Everywhere</em>
          </h2>

          {/* Hindi text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.35 }}
            className="font-devanagari text-2xl md:text-3xl my-7 tracking-wide"
            style={{ color: '#E8C06A' }}
          >
            "काशी के रचना, व्यापार के पहचान"
          </motion.p>
          <p className="text-xs italic mb-9" style={{ color: '#8FA3BA', letterSpacing: '0.05em' }}>
            Kashi's craft, your business's identity
          </p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45 }}
            className="text-lg leading-relaxed"
            style={{ color: '#D1D9E6' }}
          >
            Varanasi — the oldest living city in the world — has always been a centre of artistry and craft.
            We carry that legacy into modern packaging design, bringing the precision of Banarasi
            craftsmanship to every label, box, and brand identity we create.
          </motion.p>

          <div className="flex items-center justify-center gap-4 mt-10">
            <div className="h-px w-14" style={{ background: 'linear-gradient(to right, transparent, #D4A847)' }} />
            <div className="w-2 h-2 rounded-full" style={{ background: '#D4A847' }} />
            <div className="h-px w-14" style={{ background: 'linear-gradient(to left, transparent, #D4A847)' }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
