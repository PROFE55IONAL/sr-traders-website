import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Package, Tag, Box, Sparkles, Pill, Leaf, Droplets, Wind, CreditCard, Layers } from 'lucide-react';

const services = [
  { icon: Pill, title: 'Medicine Box Design', desc: 'Print-ready carton artwork for pharma brands — compliant, clear, and clinical yet compelling.', tag: 'Pharma' },
  { icon: Leaf, title: 'Ayurvedic Packaging', desc: 'Herbal and natural product boxes that balance Indian tradition with modern shelf appeal.', tag: 'Ayurveda' },
  { icon: Sparkles, title: 'Cosmetic Packaging', desc: 'Cream jars, serum boxes, toner labels — packaging that makes beauty products irresistible.', tag: 'Beauty' },
  { icon: Tag, title: 'Product Label Design', desc: 'Custom labels for bottles, jars, pouches, and containers across every product category.', tag: 'Labels' },
  { icon: Droplets, title: 'Bottle Label Design', desc: 'Handwash, sanitizer, cleaning fluids — vibrant bottle wraps and die-cut stickers.', tag: 'FMCG' },
  { icon: Package, title: 'FMCG Packaging', desc: 'Fast-moving consumer goods packaging designed to win on the shelf in seconds.', tag: 'FMCG' },
  { icon: Box, title: 'Dhoop Packaging', desc: 'Incense and dhoop stick boxes with motifs that honour Indian craftsmanship.', tag: 'Spiritual' },
  { icon: Wind, title: 'Cooler & Almirah Branding', desc: 'Large-format stickers for coolers, almirahs, tanks, and industrial equipment.', tag: 'Industrial' },
  { icon: CreditCard, title: 'Visiting Card Design', desc: 'Premium business cards — from elegant minimal to bold embossed designs.', tag: 'Print' },
  { icon: Layers, title: 'Custom Solutions', desc: 'Every packaging need is unique. We craft bespoke artwork for any product, any industry.', tag: 'Custom' },
];

function ServiceCard({ service, i }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (i % 5) * 0.08, duration: 0.6, ease: 'easeOut' }}
      className="group relative p-6 border border-gold/10 hover:border-gold/40 transition-all duration-500 bg-white/2 hover:bg-white/5 rounded-sm overflow-hidden"
      data-hover
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
           style={{ background: 'radial-gradient(circle at 0% 0%, rgba(200,151,58,0.06), transparent 70%)' }} />

      <div className="relative z-10">
        <span className="text-[10px] tracking-[0.3em] uppercase text-gold/40 mb-4 block">{service.tag}</span>
        <div className="w-10 h-10 mb-4 rounded-full flex items-center justify-center border border-gold/20 group-hover:border-gold/50 transition-all duration-300"
             style={{ background: 'rgba(200,151,58,0.08)' }}>
          <Icon size={18} className="text-gold" />
        </div>
        <h3 className="font-display text-xl font-medium text-cream mb-2">{service.title}</h3>
        <p className="text-sm text-cream/50 leading-relaxed">{service.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="section-pad bg-[#0D0408]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-gold/50 mb-4">What We Do</p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-cream">
            Design Services
          </h2>
          <div className="mt-4 w-16 h-px bg-gradient-to-r from-gold to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
