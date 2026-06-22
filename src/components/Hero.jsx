import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { heroShowcase } from '../data/portfolio';

const fadeUp = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } };

export default function Hero() {
  const canvasRef = useRef(null);

  // Animated wave canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const W = canvas.width, H = canvas.height;

      // Draw flowing waves inspired by Ganga
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        const opacity = 0.03 + i * 0.015;
        const amp = 30 + i * 20;
        const freq = 0.003 - i * 0.0003;
        const speed = t * (0.3 + i * 0.1);
        const yBase = H * (0.3 + i * 0.12);

        ctx.moveTo(0, yBase);
        for (let x = 0; x <= W; x += 4) {
          const y = yBase + Math.sin(x * freq + speed) * amp
                    + Math.sin(x * freq * 1.7 + speed * 0.8) * (amp * 0.4);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, yBase, 0, H);
        grad.addColorStop(0, `rgba(200,151,58,${opacity})`);
        grad.addColorStop(1, `rgba(107,26,42,${opacity * 0.5})`);
        ctx.fillStyle = grad;
        ctx.fill();
      }
      t += 0.5;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const scroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-[#0D0408]">
      {/* Background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Ambient glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-[120px]"
           style={{ background: 'radial-gradient(circle, #6B1A2A, transparent)' }} />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-15 blur-[100px]"
           style={{ background: 'radial-gradient(circle, #C8973A, transparent)' }} />

      {/* Floating portfolio cards */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {heroShowcase.slice(0, 4).map((img, i) => {
          const positions = [
            { right: '5%', top: '15%' },
            { right: '18%', top: '55%' },
            { right: '2%', top: '62%' },
            { left: '2%', top: '20%' },
          ];
          const delays = [0, -1.5, -3, -4.5];
          return (
            <motion.div
              key={i}
              className={`absolute w-36 md:w-48 rounded-lg overflow-hidden shadow-2xl float float-delay-${i % 3}`}
              style={{ ...positions[i], animationDelay: `${delays[i]}s` }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.75, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.2, duration: 0.8 }}
            >
              <img src={img} alt="Portfolio work" className="w-full h-auto" />
              <div className="absolute inset-0 border border-gold/20 rounded-lg" />
            </motion.div>
          );
        })}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20">
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs tracking-[0.4em] uppercase text-gold/60 mb-6 font-medium"
          >
            Varanasi · Since 2010 · Premium Design Studio
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display text-6xl md:text-8xl font-light leading-[1.05] text-cream mb-6"
          >
            Packaging That
            <br />
            <span className="shimmer italic font-medium">Builds Brands.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-cream/60 leading-relaxed max-w-xl mb-10"
          >
            From Banaras to brands across India — we design packaging that sells.
            Medicine boxes, product labels, FMCG branding, and custom print artwork.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <motion.button
              onClick={() => scroll('portfolio')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-4 text-sm tracking-wider uppercase font-medium"
              style={{ background: 'linear-gradient(135deg, #C8973A, #D4691E)', color: '#0D0408' }}
            >
              View Portfolio <ArrowRight size={16} />
            </motion.button>
            <motion.button
              onClick={() => scroll('contact')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-4 text-sm tracking-wider uppercase font-medium border border-cream/20 text-cream hover:border-gold/50 hover:text-gold transition-all duration-300"
            >
              Contact Us
            </motion.button>
          </motion.div>

          {/* Quick stats */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-8 mt-14 pt-10 border-t border-white/10">
            {[['1000+','Designs Created'],['15+','Years Experience'],['500+','Happy Clients'],['50+','Brand Identities']].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-3xl text-gold-gradient font-semibold">{n}</div>
                <div className="text-xs text-cream/40 tracking-widest uppercase mt-1">{l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scroll('services')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gold/40 hover:text-gold transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} />
      </motion.button>
    </section>
  );
}
