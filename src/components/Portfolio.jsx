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
      style={{ background: 'rgba(8,16,26,0.88)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        className="relative max-w-3xl w-full rounded-md overflow-hidden"
        style={{ background: 'rgba(18,32,48,0.98)', border: '1px solid rgba(212,168,71,0.30)', boxShadow: '0 32px 80px rgba(0,0,0,0.60)' }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full border transition-all"
          style={{ borderColor: 'rgba(212,168,71,0.40)', color: '#D4A847', background: 'rgba(18,32,48,0.8)' }}
          onMouseEnter={e => e.currentTarget.style.background = '#D4A847'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(18,32,48,0.8)'}
        >
          <X size={14} />
        </button>
        <img src={item.img} alt={item.title} className="w-full max-h-[68vh] object-contain" style={{ background: '#0a0f18' }} />
        <div className="p-6">
          <h3 className="font-display text-2xl mb-1" style={{ color: '#FFFFFF' }}>{item.title}</h3>
          <p className="text-sm" style={{ color: '#A8BAC9' }}>{item.desc}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState('all');
  const [modal, setModal]   = useState(null);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const filtered = active === 'all'
    ? portfolioItems
    : portfolioItems.filter(p => p.cat === active);

  return (
    <section id="portfolio" className="section-pad" ref={ref}
             style={{ background: 'rgba(20,32,48,0.50)' }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs tracking-[0.4em] uppercase font-medium mb-3" style={{ color: '#D4A847' }}>
            Real Work
          </p>
          <h2 className="font-display font-light" style={{ fontSize: 'clamp(2.2rem,4vw,3.5rem)', color: '#FFFFFF' }}>
            Portfolio
          </h2>
          <span className="gold-line" />
          <p className="mt-4 text-sm max-w-lg" style={{ color: '#A8BAC9' }}>
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
              className={`filter-btn${active === c.id ? ' active' : ''}`}
            >
              {c.label}
              <span className="ml-1.5" style={{ opacity: 0.55 }}>
                ({c.id === 'all' ? portfolioItems.length : portfolioItems.filter(p => p.cat === c.id).length})
              </span>
            </button>
          ))}
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ delay: i * 0.035, duration: 0.38 }}
                className="portfolio-card break-inside-avoid mb-3 rounded-sm cursor-pointer"
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
                  {/* Overlay — reduced 60% from original */}
                  <div className="overlay rounded-sm">
                    <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                      <div>
                        <p className="text-sm font-medium" style={{ color: '#FFFFFF' }}>{item.title}</p>
                        <p className="text-xs mt-0.5" style={{ color: '#D1D9E6' }}>{item.desc}</p>
                      </div>
                      <ZoomIn size={16} style={{ color: '#D4A847', flexShrink: 0, marginLeft: 8 }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {modal && <Modal item={modal} onClose={() => setModal(null)} />}
      </AnimatePresence>
    </section>
  );
}
