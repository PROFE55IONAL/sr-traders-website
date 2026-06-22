import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat() {
  return (
    <motion.a
      href="https://wa.me/919876543210?text=Hello! I need packaging design for my product."
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl shadow-green-900/50"
      style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
    >
      <MessageCircle size={24} className="text-white" />
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full animate-ping opacity-30"
            style={{ background: '#25D366' }} />
    </motion.a>
  );
}
