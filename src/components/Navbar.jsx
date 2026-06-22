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
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        padding: scrolled ? '10px 0' : '18px 0',
        /* Always readable — solid bg from scroll=0, just slightly more opaque after scroll */
        background: scrolled
          ? 'rgba(12,24,38,0.98)'
          : 'rgba(12,24,38,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(212,168,71,0.20)',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.35)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => scroll('home')} className="flex flex-col leading-none text-left">
          <span className="font-display text-2xl font-semibold text-gold-gradient">SR Traders</span>
          <span className="text-[10px] tracking-[0.25em] uppercase mt-0.5" style={{ color: '#8FA3BA' }}>
            Packaging Studio · Varanasi
          </span>
        </button>

        {/* Desktop links — always white, not muted */}
        <div className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <button
              key={l}
              onClick={() => scroll(l)}
              className="anim-underline text-sm tracking-widest uppercase font-medium transition-colors duration-200"
              style={{ color: '#FFFFFF' }}
              onMouseEnter={e => e.currentTarget.style.color = '#D4A847'}
              onMouseLeave={e => e.currentTarget.style.color = '#FFFFFF'}
            >
              {l}
            </button>
          ))}
          <button
            onClick={() => scroll('Contact')}
            className="px-5 py-2.5 text-xs font-semibold tracking-widest uppercase rounded-sm transition-all duration-250"
            style={{ background: '#D4A847', color: '#0F1E2E' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#E8C06A'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#D4A847'; }}
          >
            Get Quote
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          style={{ color: '#FFFFFF' }}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ background: 'rgba(12,24,38,0.99)', borderTop: '1px solid rgba(212,168,71,0.15)' }}
          >
            <div className="flex flex-col px-6 py-4 gap-0">
              {links.map(l => (
                <button
                  key={l}
                  onClick={() => scroll(l)}
                  className="text-left text-sm tracking-widest uppercase py-3.5 border-b font-medium"
                  style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.07)' }}
                >
                  {l}
                </button>
              ))}
              <button
                onClick={() => scroll('Contact')}
                className="mt-4 py-3 text-sm font-semibold tracking-widest uppercase rounded-sm"
                style={{ background: '#D4A847', color: '#0F1E2E' }}
              >
                Get Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
