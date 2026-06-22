import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', phone: '', product: '', message: '' });
  const [sent, setSent] = useState(false);

  const send = (e) => {
    e.preventDefault();
    // Build WhatsApp message
    const msg = encodeURIComponent(
      `*New Enquiry from Website*\n\nName: ${form.name}\nPhone: ${form.phone}\nProduct/Service: ${form.product}\n\nMessage: ${form.message}`
    );
    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const contacts = [
    { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
    { icon: MessageCircle, label: 'WhatsApp', value: '+91 98765 43210', href: 'https://wa.me/919876543210' },
    { icon: Mail, label: 'Email', value: 'srtraders.vns@gmail.com', href: 'mailto:srtraders.vns@gmail.com' },
    { icon: MapPin, label: 'Location', value: 'Varanasi, Uttar Pradesh, India', href: 'https://maps.google.com/?q=Varanasi' },
  ];

  return (
    <section id="contact" className="section-pad bg-[#0D0408]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-gold/50 mb-4">Get In Touch</p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-cream">
            Start Your<br />
            <span className="italic text-gold-gradient">Project Today</span>
          </h2>
          <div className="mt-4 w-16 h-px bg-gradient-to-r from-gold to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-cream/60 leading-relaxed">
              Have a product that needs packaging? A brand that needs a label? Or just want to know
              what great design can do for your business? Reach out — we respond quickly.
            </p>

            {contacts.map(c => {
              const Icon = c.icon;
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 border border-gold/10 hover:border-gold/40 rounded-sm transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center border border-gold/20 group-hover:border-gold/50 transition-colors"
                       style={{ background: 'rgba(200,151,58,0.08)' }}>
                    <Icon size={16} className="text-gold" />
                  </div>
                  <div>
                    <div className="text-xs text-gold/40 tracking-widest uppercase">{c.label}</div>
                    <div className="text-cream text-sm mt-0.5">{c.value}</div>
                  </div>
                </a>
              );
            })}

            <motion.a
              href="https://wa.me/919876543210?text=Hello! I need packaging design for my product."
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-3 w-full py-4 text-sm font-medium tracking-wider uppercase text-ink rounded-sm mt-4"
              style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
            >
              <MessageCircle size={18} /> Chat on WhatsApp
            </motion.a>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <form onSubmit={send} className="space-y-4">
              {[
                { key: 'name', label: 'Your Name', type: 'text', placeholder: 'Ramesh Gupta' },
                { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 98765 43210' },
                { key: 'product', label: 'Product / Service Needed', type: 'text', placeholder: 'e.g. Medicine Box Design, Label Design' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs tracking-widest uppercase text-gold/50 mb-2">{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    required
                    value={form[f.key]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    className="w-full px-4 py-3 text-sm text-cream bg-white/5 border border-gold/15 focus:border-gold/50 focus:outline-none rounded-sm transition-colors placeholder:text-cream/25"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs tracking-widest uppercase text-gold/50 mb-2">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your product and what you need..."
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  className="w-full px-4 py-3 text-sm text-cream bg-white/5 border border-gold/15 focus:border-gold/50 focus:outline-none rounded-sm transition-colors placeholder:text-cream/25 resize-none"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 flex items-center justify-center gap-2 text-sm font-medium tracking-wider uppercase text-ink rounded-sm"
                style={{ background: sent ? 'linear-gradient(135deg, #4CAF50, #2E7D32)' : 'linear-gradient(135deg, #C8973A, #D4691E)' }}
              >
                {sent ? '✓ Sent via WhatsApp!' : <><Send size={15} /> Send Enquiry</>}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
