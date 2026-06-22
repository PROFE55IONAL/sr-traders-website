import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Package, Tag, Box, Sparkles, Pill, Leaf, Droplets, Wind, CreditCard, Layers } from 'lucide-react';

const services = [
  { icon: Pill,       title: 'Medicine Box Design',      desc: 'Print-ready carton artwork for pharma brands — compliant, clear, and compelling.',         tag: 'Pharma' },
  { icon: Leaf,       title: 'Ayurvedic Packaging',      desc: 'Herbal product boxes that balance Indian tradition with modern shelf appeal.',              tag: 'Ayurveda' },
  { icon: Sparkles,   title: 'Cosmetic Packaging',       desc: 'Cream jars, serum boxes, toner labels — packaging that makes beauty products irresistible.', tag: 'Beauty' },
  { icon: Tag,        title: 'Product Label Design',     desc: 'Custom labels for bottles, jars, pouches, and containers across every product category.',   tag: 'Labels' },
  { icon: Droplets,   title: 'Bottle Label Design',      desc: 'Handwash, sanitizer, cleaning fluids — vibrant bottle wraps and die-cut stickers.',         tag: 'FMCG' },
  { icon: Package,    title: 'FMCG Packaging',           desc: 'Fast-moving consumer goods packaging designed to win on the shelf in seconds.',              tag: 'FMCG' },
  { icon: Box,        title: 'Dhoop Packaging',          desc: 'Incense and dhoop stick boxes with motifs that honour Indian craftsmanship.',               tag: 'Spiritual' },
  { icon: Wind,       title: 'Cooler & Almirah Branding',desc: 'Large-format stickers for coolers, almirahs, tanks, and industrial equipment.',             tag: 'Industrial' },
  { icon: CreditCard, title: 'Visiting Card Design',     desc: 'Premium business cards — from elegant minimal to bold embossed designs.',                   tag: 'Print' },
  { icon: Layers,     title: 'Custom Solutions',         desc: 'Every packaging need is unique. We craft bespoke artwork for any product, any industry.',    tag: 'Custom' },
];

function ServiceCard({ service, i }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (i % 5) * 0.07, duration: 0.55, ease: 'easeOut' }}
      className="service-card group relative p-6 rounded-sm overflow-hidden"
      data-hover
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
           style={{ background: 'radial-gradient(circle at 10% 10%, rgba(212,168,71,0.07), transparent 65%)' }} />

      <div className="relative z-10">
        {/* Tag */}
        <span className="block text-[10px] tracking-[0.3em] uppercase mb-4 font-medium" style={{ color: '#D4A847' }}>
          {service.tag}
        </span>

        {/* Icon */}
        <div className="w-10 h-10 mb-4 rounded-sm flex items-center justify-center transition-all duration-300"
             style={{ background: 'rgba(212,168,71,0.12)', border: '1px solid rgba(212,168,71,0.25)' }}>
          <Icon size={18} style={{ color: '#D4A847' }} />
        </div>

        {/* Title — pure white */}
        <h3 className="font-display text-xl font-medium mb-2" style={{ color: '#FFFFFF' }}>
          {service.title}
        </h3>

        {/* Desc — readable light gray */}
        <p className="text-sm leading-relaxed" style={{ color: '#A8BAC9' }}>
          {service.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" className="section-pad" ref={ref}
             style={{ background: 'rgba(15,30,46,0.55)' }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-xs tracking-[0.4em] uppercase font-medium mb-3" style={{ color: '#D4A847' }}>
            What We Do
          </p>
          <h2 className="font-display font-light" style={{ fontSize: 'clamp(2.2rem,4vw,3.5rem)', color: '#FFFFFF' }}>
            Design Services
          </h2>
          <span className="gold-line" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {services.map((s, i) => <ServiceCard key={s.title} service={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}
