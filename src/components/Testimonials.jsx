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
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const prev = () => setIdx(i => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx(i => (i + 1) % testimonials.length);

  const t = testimonials[idx];

  return (
    <section className="section-pad bg-[#0A0306]" ref={ref}>
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-14 text-center"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-gold/50 mb-4">Client Stories</p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-cream">Testimonials</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-dark rounded-sm p-10 md:p-14 text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-gold fill-gold" />
                ))}
              </div>

              {/* Quote mark */}
              <div className="font-display text-8xl text-gold/15 leading-none mb-4 -mt-6">"</div>

              <p className="text-cream/80 text-lg md:text-xl leading-relaxed font-light italic mb-8 -mt-8">
                {t.quote}
              </p>

              <div>
                <div className="text-cream font-medium">{t.name}</div>
                <div className="text-cream/40 text-sm mt-1">{t.role}</div>
                <div className="text-gold/50 text-xs mt-1 tracking-widest uppercase">{t.location}</div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-ink flex items-center justify-center transition-all">
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === idx ? 'bg-gold w-6' : 'bg-white/20'}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-ink flex items-center justify-center transition-all">
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
