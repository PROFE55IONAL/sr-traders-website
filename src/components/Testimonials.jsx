import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Rajesh Kumar Gupta',
    role: 'Proprietor, Gupta Pharmaceuticals',
    location: 'Varanasi',
    quote: 'SR Traders has been designing all our medicine boxes for over 8 years. The artwork quality is print-perfect every time, and they understand pharma labelling requirements inside out. Highly recommend.',
    rating: 5,
  },
  {
    name: 'Sunita Devi',
    role: 'Owner, Fomies Cleaning Products',
    location: 'Varanasi',
    quote: 'They designed our entire Fomies product label range — handwash, toilet cleaner, dishwash gel, everything. Professional work, fast delivery, and the labels look fantastic on shelves.',
    rating: 5,
  },
  {
    name: 'Amit Srivastava',
    role: 'Director, Neo Industries',
    location: 'Varanasi',
    quote: 'Our cooler and almirah stickers are all from SR Traders. The print quality and die-cut accuracy is excellent. They know exactly what industrial branding needs.',
    rating: 5,
  },
  {
    name: 'Priya Pandey',
    role: 'Founder, Gulab Naturals',
    location: 'Banaras',
    quote: 'I needed a premium rose toner label that matched our brand feel. SR Traders nailed it on the first concept. Beautiful, elegant, and exactly what my cosmetics brand needed.',
    rating: 5,
  },
  {
    name: 'Vikas Mishra',
    role: 'Pharmacist & Distributor',
    location: 'Varanasi',
    quote: 'Quick turnaround and very professional. The visiting card they designed for my medical shop gets compliments every day. Worth every rupee.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const prev = () => setIdx(i => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx(i => (i + 1) % testimonials.length);
  const t = testimonials[idx];

  return (
    <section className="section-pad" ref={ref}
             style={{ background: 'rgba(20,32,48,0.55)' }}>
      <div className="max-w-3xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-12 text-center"
        >
          <p className="text-xs tracking-[0.4em] uppercase font-medium mb-3" style={{ color: '#D4A847' }}>
            Client Stories
          </p>
          <h2 className="font-display font-light" style={{ fontSize: 'clamp(2.2rem,4vw,3.5rem)', color: '#FFFFFF' }}>
            Testimonials
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="rounded-sm p-10 md:p-12 text-center"
              style={{
                background: 'rgba(21,40,62,0.65)',
                border: '1px solid rgba(212,168,71,0.20)',
              }}
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} style={{ color: '#D4A847', fill: '#D4A847' }} />
                ))}
              </div>

              {/* Opening quote mark */}
              <div className="font-display text-7xl leading-none mb-2" style={{ color: 'rgba(212,168,71,0.20)' }}>"</div>

              {/* Quote — highly readable */}
              <p className="text-lg md:text-xl leading-relaxed font-light italic mb-8 -mt-6"
                 style={{ color: '#D1D9E6' }}>
                {t.quote}
              </p>

              <div>
                <div className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>{t.name}</div>
                <div className="text-xs mt-1" style={{ color: '#A8BAC9' }}>{t.role}</div>
                <div className="text-xs mt-1 tracking-widest uppercase font-medium" style={{ color: '#D4A847' }}>{t.location}</div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-7">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full flex items-center justify-center border transition-all"
              style={{ borderColor: 'rgba(212,168,71,0.35)', color: '#D4A847' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#D4A847'; e.currentTarget.style.color = '#0F1E2E'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#D4A847'; }}
            >
              <ChevronLeft size={15} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === idx ? '24px' : '6px',
                    background: i === idx ? '#D4A847' : 'rgba(255,255,255,0.25)',
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-9 h-9 rounded-full flex items-center justify-center border transition-all"
              style={{ borderColor: 'rgba(212,168,71,0.35)', color: '#D4A847' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#D4A847'; e.currentTarget.style.color = '#0F1E2E'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#D4A847'; }}
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
