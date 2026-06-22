import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { portfolioItems } from '../data/portfolio';

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const showcase = portfolioItems.slice(0, 6);

  return (
    <section id="about" className="section-pad bg-[#0D0408]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs tracking-[0.4em] uppercase text-gold/50 mb-4">Our Story</p>
            <h2 className="font-display text-5xl md:text-6xl font-light text-cream mb-8">
              About<br />
              <span className="italic text-gold-gradient">SR Traders</span>
            </h2>

            <div className="space-y-5 text-cream/60 leading-relaxed">
              <p>
                SR Traders is a premium packaging design and branding studio based in Varanasi, Uttar Pradesh.
                We have spent over 15 years helping businesses build strong product identities through
                professional packaging, label design, and brand artwork.
              </p>
              <p>
                From a single medicine box for a local pharma company to a complete product range
                for FMCG brands — we bring the same dedication and craft to every project.
                Our work spans medicine cartons, ayurvedic packaging, cosmetic labels,
                FMCG products, cleaning brands, industrial stickers, and visiting cards.
              </p>
              <p>
                Rooted in Varanasi's centuries-old tradition of artisanship, we serve both local
                manufacturers in Purvanchal and national brands that trust our print-ready quality
                and quick turnaround.
              </p>
            </div>

            <div className="flex items-center gap-2 mt-8 text-gold/70 text-sm">
              <MapPin size={14} />
              <span>Varanasi (Banaras), Uttar Pradesh, India</span>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 pt-8 border-t border-white/5">
              {[['Pharma','Medicine & Ayurvedic'],['FMCG','Labels & Packaging'],['Industrial','Stickers & Branding']].map(([t,s]) => (
                <div key={t}>
                  <div className="text-gold text-xs tracking-widest uppercase mb-1">{t}</div>
                  <div className="text-cream/40 text-xs">{s}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-3 gap-3"
          >
            {showcase.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
                className={`overflow-hidden rounded-sm border border-gold/10 ${i === 0 ? 'col-span-2 row-span-1' : ''}`}
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
