import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { portfolioItems } from '../data/portfolio';

export default function About() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const showcase = portfolioItems.slice(0, 6);

  return (
    <section id="about" className="section-pad" ref={ref}
             style={{ background: 'rgba(15,30,46,0.55)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65 }}
          >
            <p className="text-xs tracking-[0.4em] uppercase font-medium mb-3" style={{ color: '#D4A847' }}>
              Our Story
            </p>
            <h2 className="font-display font-light mb-8" style={{ fontSize: 'clamp(2.2rem,4vw,3.5rem)', color: '#FFFFFF' }}>
              About <em className="not-italic text-gold-gradient">SR Traders</em>
            </h2>

            <div className="space-y-4 text-sm leading-relaxed" style={{ color: '#C5D0DC' }}>
              <p>
                SR Traders is a premium packaging design and branding studio based in Varanasi, Uttar Pradesh.
                We have spent over 15 years helping businesses build strong product identities through
                professional packaging, label design, and brand artwork.
              </p>
              <p>
                From a single medicine box for a local pharma company to a complete product range
                for FMCG brands — we bring the same dedication to every project.
                Our work spans medicine cartons, ayurvedic packaging, cosmetic labels,
                FMCG products, cleaning brands, industrial stickers, and visiting cards.
              </p>
              <p>
                Rooted in Varanasi's centuries-old tradition of artisanship, we serve both local
                manufacturers in Purvanchal and national brands that trust our print-ready quality
                and quick turnaround.
              </p>
            </div>

            <div className="flex items-center gap-2 mt-7 text-sm" style={{ color: '#D4A847' }}>
              <MapPin size={14} />
              <span>Varanasi (Banaras), Uttar Pradesh, India</span>
            </div>

            <div className="grid grid-cols-3 gap-5 mt-10 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}>
              {[['Pharma','Medicine & Ayurvedic'],['FMCG','Labels & Packaging'],['Industrial','Stickers & Branding']].map(([t, s]) => (
                <div key={t}>
                  <div className="text-xs tracking-widest uppercase font-semibold mb-1" style={{ color: '#D4A847' }}>{t}</div>
                  <div className="text-xs" style={{ color: '#8FA3BA' }}>{s}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image grid */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="grid grid-cols-3 gap-2.5"
          >
            {showcase.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.07 }}
                className={`overflow-hidden rounded-sm ${i === 0 ? 'col-span-2' : ''}`}
                style={{ border: '1px solid rgba(212,168,71,0.15)' }}
              >
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
