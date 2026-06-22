import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { portfolioItems, categories } from '../data/portfolio';

function Modal({ item, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(13,4,8,0.92)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative max-w-3xl w-full glass-dark rounded-lg overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-ink transition-all"
        >
          <X size={14} />
        </button>
        <img src={item.img} alt={item.title} className="w-full max-h-[70vh] object-contain bg-black" />
        <div className="p-6">
          <h3 className="font-display text-2xl text-cream mb-1">{item.title}</h3>
          <p className="text-sm text-cream/50">{item.desc}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState('all');
  const [modal, setModal] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const filtered = active === 'all'
    ? portfolioItems
    : portfolioItems.filter(p => p.cat === active);

  return (
    <section id="portfolio" className="section-pad bg-[#0A0306]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-gold/50 mb-4">Real Work</p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-cream">Portfolio</h2>
          <div className="mt-4 w-16 h-px bg-gradient-to-r from-gold to-transparent" />
          <p className="mt-4 text-cream/40 text-sm max-w-lg">
            Every project shown here is real work — delivered to actual clients across Varanasi and India.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`px-5 py-2 text-xs tracking-widest uppercase transition-all duration-300 rounded-sm border ${
                active === c.id
                  ? 'bg-gold text-ink border-gold font-medium'
                  : 'border-gold/20 text-cream/50 hover:border-gold/50 hover:text-gold'
              }`}
            >
              {c.label}
              <span className="ml-2 opacity-50">
                ({c.id === 'all' ? portfolioItems.length : portfolioItems.filter(p => p.cat === c.id).length})
              </span>
            </button>
          ))}
        </motion.div>

        {/* Masonry grid */}
        <motion.div
          layout
          className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3"
        >
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                className="portfolio-card break-inside-avoid mb-3 rounded-sm cursor-pointer group"
                onClick={() => setModal(item)}
                data-hover
              >
                <div className="relative">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-auto block rounded-sm"
                    loading="lazy"
                  />
                  <div className="overlay rounded-sm">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-cream text-sm font-medium">{item.title}</p>
                          <p className="text-cream/50 text-xs mt-0.5">{item.desc}</p>
                        </div>
                        <ZoomIn size={18} className="text-gold flex-shrink-0 ml-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal && <Modal item={modal} onClose={() => setModal(null)} />}
      </AnimatePresence>
    </section>
  );
}
