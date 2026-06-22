import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

const scroll = (id) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });

const services = [
  'Medicine Box Design','Ayurvedic Packaging','Cosmetic Labels',
  'Product Label Design','FMCG Packaging','Bottle Labels',
];
const portfolio = ['Pharma Packaging','Product Labels','FMCG Labels','Industrial Stickers','Visiting Cards','Brand Identities'];

export default function Footer() {
  return (
    <footer style={{ background: 'rgba(8,14,22,0.98)', borderTop: '1px solid rgba(212,168,71,0.15)' }}
            className="pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="font-display text-2xl font-semibold text-gold-gradient mb-1">SR Traders</div>
            <div className="text-[10px] tracking-[0.2em] uppercase mb-4" style={{ color: '#8FA3BA' }}>
              Packaging Studio · Varanasi
            </div>
            <p className="text-xs leading-relaxed mb-6" style={{ color: '#8FA3BA' }}>
              Premium packaging design and branding studio. From Banaras to brands across India.
            </p>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-sm"
              style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', color: '#FFFFFF' }}
            >
              <MessageCircle size={13} /> WhatsApp Us
            </a>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs tracking-[0.3em] uppercase font-semibold mb-5" style={{ color: '#D4A847' }}>
              Services
            </h3>
            <ul className="space-y-2.5">
              {services.map(s => (
                <li key={s}>
                  <button onClick={() => scroll('services')}
                          className="text-xs transition-colors duration-200"
                          style={{ color: '#A8BAC9' }}
                          onMouseEnter={e => e.currentTarget.style.color = '#D4A847'}
                          onMouseLeave={e => e.currentTarget.style.color = '#A8BAC9'}>
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Portfolio */}
          <div>
            <h3 className="text-xs tracking-[0.3em] uppercase font-semibold mb-5" style={{ color: '#D4A847' }}>
              Portfolio
            </h3>
            <ul className="space-y-2.5">
              {portfolio.map(p => (
                <li key={p}>
                  <button onClick={() => scroll('portfolio')}
                          className="text-xs transition-colors duration-200"
                          style={{ color: '#A8BAC9' }}
                          onMouseEnter={e => e.currentTarget.style.color = '#D4A847'}
                          onMouseLeave={e => e.currentTarget.style.color = '#A8BAC9'}>
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs tracking-[0.3em] uppercase font-semibold mb-5" style={{ color: '#D4A847' }}>
              Contact
            </h3>
            <div className="space-y-3">
              {[
                { icon: Phone,  val: '+91 98765 43210',        href: 'tel:+919876543210' },
                { icon: Mail,   val: 'srtraders.vns@gmail.com', href: 'mailto:srtraders.vns@gmail.com' },
                { icon: MapPin, val: 'Varanasi, UP, India',     href: '#' },
              ].map(c => {
                const Icon = c.icon;
                return (
                  <a key={c.val} href={c.href}
                     className="flex items-center gap-2 text-xs transition-colors duration-200"
                     style={{ color: '#A8BAC9' }}
                     onMouseEnter={e => e.currentTarget.style.color = '#D4A847'}
                     onMouseLeave={e => e.currentTarget.style.color = '#A8BAC9'}>
                    <Icon size={12} style={{ color: '#D4A847', flexShrink: 0 }} /> {c.val}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-3"
             style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-xs" style={{ color: '#5A6F82' }}>
            © 2025 SR Traders, Varanasi. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: '#5A6F82' }}>
            Packaging Design · Label Design · Brand Identity
          </p>
        </div>
      </div>
    </footer>
  );
}
