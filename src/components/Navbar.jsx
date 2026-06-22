import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = ['Home','Services','Portfolio','Process','About','Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scroll = (id) => {
    setOpen(false);
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-dark py-3 shadow-xl shadow-black/20' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scroll('home')} className="flex flex-col leading-none">
          <span className="font-display text-2xl font-semibold text-gold-gradient">SR Traders</span>
          <span className="text-xs tracking-[0.2em] text-gold/60 uppercase">Packaging Studio · Varanasi</span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <button
              key={l}
              onClick={() => scroll(l)}
              className="anim-underline text-sm tracking-widest uppercase text-cream/70 hover:text-gold transition-colors duration-300"
            >
              {l}
            </button>
          ))}
          <button
            onClick={() => scroll('Contact')}
            className="px-5 py-2 text-sm font-medium tracking-wider uppercase border border-gold/50 text-gold hover:bg-gold hover:text-ink transition-all duration-300 rounded-sm"
          >
            Get Quote
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-gold" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-dark border-t border-gold/10"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {links.map(l => (
                <button
                  key={l}
                  onClick={() => scroll(l)}
                  className="text-left text-sm tracking-widest uppercase text-cream/70 hover:text-gold py-2 border-b border-white/5"
                >
                  {l}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
