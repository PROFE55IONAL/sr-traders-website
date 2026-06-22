import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react';

const contacts = [
  { icon: Phone,         label: 'Phone',     value: '+91 98765 43210',      href: 'tel:+919876543210' },
  { icon: MessageCircle, label: 'WhatsApp',  value: '+91 98765 43210',      href: 'https://wa.me/919876543210' },
  { icon: Mail,          label: 'Email',     value: 'srtraders.vns@gmail.com', href: 'mailto:srtraders.vns@gmail.com' },
  { icon: MapPin,        label: 'Location',  value: 'Varanasi, UP, India',  href: 'https://maps.google.com/?q=Varanasi' },
];

export default function Contact() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [form, setForm] = useState({ name: '', phone: '', product: '', message: '' });
  const [sent, setSent]  = useState(false);

  const send = (e) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `*New Enquiry — SR Traders Website*\n\nName: ${form.name}\nPhone: ${form.phone}\nService: ${form.product}\n\nMessage: ${form.message}`
    );
    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="section-pad" ref={ref}
             style={{ background: 'rgba(15,30,46,0.55)' }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-14"
        >
          <p className="text-xs tracking-[0.4em] uppercase font-medium mb-3" style={{ color: '#D4A847' }}>
            Get In Touch
          </p>
          <h2 className="font-display font-light" style={{ fontSize: 'clamp(2.2rem,4vw,3.5rem)', color: '#FFFFFF' }}>
            Start Your <em className="not-italic text-gold-gradient">Project Today</em>
          </h2>
          <span className="gold-line" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="space-y-4"
          >
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#C5D0DC' }}>
              Have a product that needs packaging? A brand that needs a label? Reach out —
              we respond quickly and keep things simple from first call to final file.
            </p>

            {contacts.map(c => {
              const Icon = c.icon;
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-sm transition-all duration-250 group"
                  style={{
                    background: 'rgba(21,40,62,0.50)',
                    border: '1px solid rgba(255,255,255,0.10)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(212,168,71,0.40)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'}
                >
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0"
                       style={{ background: 'rgba(212,168,71,0.12)', border: '1px solid rgba(212,168,71,0.25)' }}>
                    <Icon size={16} style={{ color: '#D4A847' }} />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-widest uppercase font-medium" style={{ color: '#8FA3BA' }}>
                      {c.label}
                    </div>
                    <div className="text-sm font-medium mt-0.5" style={{ color: '#FFFFFF' }}>{c.value}</div>
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
              className="flex items-center justify-center gap-3 w-full py-4 text-sm font-semibold tracking-wider uppercase rounded-sm mt-2"
              style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', color: '#FFFFFF' }}
            >
              <MessageCircle size={17} /> Chat on WhatsApp
            </motion.a>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25 }}
          >
            <form onSubmit={send} className="space-y-4">
              {[
                { key: 'name',    label: 'Your Name',               type: 'text', placeholder: 'Ramesh Gupta' },
                { key: 'phone',   label: 'Phone Number',            type: 'tel',  placeholder: '+91 98765 43210' },
                { key: 'product', label: 'Product / Service Needed',type: 'text', placeholder: 'e.g. Medicine Box Design, Label Design' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs tracking-widest uppercase font-medium mb-2" style={{ color: '#A8BAC9' }}>
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    required
                    value={form[f.key]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    className="form-input"
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs tracking-widest uppercase font-medium mb-2" style={{ color: '#A8BAC9' }}>
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your product and what you need..."
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  className="form-input resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 flex items-center justify-center gap-2 text-sm font-semibold tracking-wider uppercase rounded-sm"
                style={{
                  background: sent
                    ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                    : 'linear-gradient(135deg, #D4A847, #D4691E)',
                  color: sent ? '#FFFFFF' : '#0F1E2E',
                }}
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
