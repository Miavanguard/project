import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';

export default function WhatsAppFab() {
  const { lang } = useI18n();
  const [visible, setVisible] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setShowLabel(true), 500);
      return () => clearTimeout(timer);
    }
    setShowLabel(false);
  }, [visible]);

  if (!visible) return null;

  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 group"
      aria-label="WhatsApp"
    >
      {showLabel && (
        <span className="hidden sm:block px-4 py-2 rounded-full glass text-sm text-ink-100 animate-fade-in whitespace-nowrap">
          {lang === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
        </span>
      )}
      <div className="relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/30 transition-transform group-hover:scale-110 group-active:scale-95 animate-pulse-gold">
        <MessageCircle className="w-7 h-7 text-white" />
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-ink-950 animate-pulse" />
      </div>
    </a>
  );
}
