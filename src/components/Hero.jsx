import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { heroShowcase } from '../data/portfolio';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId, t = 0;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const W = canvas.width, H = canvas.height;

      // Very subtle waves — just 3, very low opacity
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const opacity = 0.018 + i * 0.008;  // was 0.025–0.036, now much lower
        const amp   = 22 + i * 15;
        const freq  = 0.0022 - i * 0.0002;
        const speed = t * (0.22 + i * 0.07);
        const yBase = H * (0.45 + i * 0.15);

        ctx.moveTo(0, yBase);
        for (let x = 0; x <= W; x += 6) {
          const y = yBase
            + Math.sin(x * freq + speed) * amp
            + Math.sin(x * freq * 1.5 + speed * 0.65) * (amp * 0.3);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
        const grad = ctx.createLinearGradient(0, yBase, 0, H);
        grad.addColorStop(0, `rgba(212,168,71,${opacity})`);
        grad.addColorStop(1, `rgba(107,26,42,${opacity * 0.5})`);
        ctx.fillStyle = grad;
        ctx.fill();
      }
      t += 0.35;
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId); };
  }, []);

  const scroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  // Only 3 premium mockups, well-spaced on right
  const mockups = heroShowcase.slice(0, 3);
  const mockupPos = [
    { right: '5%',  top: '16%' },
    { right: '20%', top: '50%' },
    { right: '4%',  top: '65%' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(150deg, #0F1E2E 0%, #142030 45%, #1C0D18 100%)' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Single ambient glow — very subtle */}
      <div className="absolute pointer-events-none" style={{
        top: '30%', left: '45%',
        width: '500px', height: '350px',
        background: 'radial-gradient(ellipse, rgba(212,168,71,0.06) 0%, transparent 68%)',
        transform: 'translate(-50%,-50%)',
      }} />

      {/* 3 floating portfolio mockups — right side only, well spaced */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block">
        {mockups.map((img, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-md overflow-hidden float float-delay-${i}`}
            style={{
              ...mockupPos[i],
              width: i === 0 ? '190px' : '155px',
              border: '1px solid rgba(212,168,71,0.30)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.50)',
            }}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 0.92, x: 0 }}
            transition={{ delay: 0.9 + i * 0.2, duration: 0.7, ease: 'easeOut' }}
          >
            <img src={img} alt="Portfolio preview" className="w-full h-auto block" />
          </motion.div>
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20">
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >

          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            className="text-xs tracking-[0.45em] uppercase font-medium mb-6"
            style={{ color: '#8FA3BA' }}
          >
            Varanasi · Est. 2010 · Premium Design Studio
          </motion.p>

          {/* Main headline — pure white, large, readable */}
          <motion.h1
            variants={fadeUp}
            className="font-display font-light leading-[1.07] mb-6"
            style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5.2rem)', color: '#FFFFFF' }}
          >
            Packaging That
            <br />
            <em className="shimmer font-medium not-italic">Builds Brands.</em>
          </motion.h1>

          {/* Subheadline — light gray, AA compliant */}
          <motion.p
            variants={fadeUp}
            className="text-lg leading-relaxed mb-10"
            style={{ color: '#D1D9E6', maxWidth: '460px' }}
          >
            From Banaras to brands across India — we design packaging that sells.
            Medicine boxes, product labels, FMCG branding, custom print artwork.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <motion.button
              onClick={() => scroll('portfolio')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-7 py-3.5 text-sm tracking-wider uppercase font-semibold rounded-sm"
              style={{ background: 'linear-gradient(135deg, #D4A847, #D4691E)', color: '#0F1E2E' }}
            >
              View Portfolio <ArrowRight size={15} />
            </motion.button>
            <motion.button
              onClick={() => scroll('contact')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-7 py-3.5 text-sm tracking-wider uppercase font-semibold rounded-sm border transition-all duration-250"
              style={{ borderColor: 'rgba(255,255,255,0.35)', color: '#FFFFFF', background: 'transparent' }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#D4A847';
                e.currentTarget.style.color = '#D4A847';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)';
                e.currentTarget.style.color = '#FFFFFF';
              }}
            >
              Contact Us
            </motion.button>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-8 mt-14 pt-10"
            style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}
          >
            {[
              ['1000+', 'Designs Created'],
              ['15+',   'Years Experience'],
              ['500+',  'Happy Clients'],
              ['50+',   'Brands Built'],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-3xl font-semibold text-gold-gradient">{n}</div>
                <div className="text-xs tracking-widest uppercase mt-1" style={{ color: '#8FA3BA' }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scroll('services')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-colors"
        style={{ color: '#8FA3BA' }}
        animate={{ y: [0, 7, 0] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
        onMouseEnter={e => e.currentTarget.style.color = '#D4A847'}
        onMouseLeave={e => e.currentTarget.style.color = '#8FA3BA'}
      >
        <span className="text-[10px] tracking-[0.35em] uppercase">Scroll</span>
        <ChevronDown size={14} />
      </motion.button>
    </section>
  );
}
