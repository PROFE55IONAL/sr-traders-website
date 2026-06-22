import { motion } from 'framer-motion';
import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

const services = [
  'Medicine Box Design','Ayurvedic Packaging','Cosmetic Labels',
  'Product Label Design','FMCG Packaging','Bottle Labels',
  'Dhoop Packaging','Cooler Branding','Visiting Cards',
];

const scroll = (id) => {
  document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
};

export default function Footer() {
  return (
    <footer className="bg-[#080204] border-t border-gold/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="font-display text-2xl text-gold-gradient mb-2">SR Traders</div>
            <div className="text-xs tracking-[0.2em] text-gold/40 uppercase mb-4">Packaging Studio · Varanasi</div>
            <p className="text-cream/40 text-xs leading-relaxed mb-6">
              Premium packaging design and branding studio. From Banaras to brands across India.
            </p>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-sm text-ink"
              style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
            >
              <MessageCircle size={12} /> WhatsApp Us
            </a>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs tracking-[0.3em] uppercase text-gold/50 mb-5">Services</h3>
            <ul className="space-y-2">
              {services.slice(0, 6).map(s => (
                <li key={s}>
                  <button onClick={() => scroll('services')} className="text-cream/40 text-xs hover:text-gold/80 transition-colors anim-underline">
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Portfolio */}
          <div>
            <h3 className="text-xs tracking-[0.3em] uppercase text-gold/50 mb-5">Portfolio</h3>
            <ul className="space-y-2">
              {['Pharma Packaging','Product Labels','FMCG Labels','Industrial Stickers','Visiting Cards','Brand Identities'].map(p => (
                <li key={p}>
                  <button onClick={() => scroll('portfolio')} className="text-cream/40 text-xs hover:text-gold/80 transition-colors">
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs tracking-[0.3em] uppercase text-gold/50 mb-5">Contact</h3>
            <div className="space-y-3">
              {[
                { icon: Phone, val: '+91 98765 43210', href: 'tel:+919876543210' },
                { icon: Mail, val: 'srtraders.vns@gmail.com', href: 'mailto:srtraders.vns@gmail.com' },
                { icon: MapPin, val: 'Varanasi, UP, India', href: '#' },
              ].map(c => {
                const Icon = c.icon;
                return (
                  <a key={c.val} href={c.href} className="flex items-center gap-2 text-cream/40 text-xs hover:text-gold/70 transition-colors">
                    <Icon size={12} className="text-gold/40" /> {c.val}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream/20 text-xs">
            © 2025 SR Traders, Varanasi. All rights reserved.
          </p>
          <p className="text-cream/15 text-xs">
            Packaging Design · Label Design · Brand Identity · Varanasi, India
          </p>
        </div>
      </div>
    </footer>
  );
}
