import { Sparkles } from 'lucide-react';
import type { Lang } from '@/lib/i18n';

interface LanguageModalProps {
  onSelect: (lang: Lang) => void;
}

export default function LanguageModal({ onSelect }: LanguageModalProps) {
  const choose = (lang: Lang) => {
    localStorage.setItem('preferred_language', lang);
    onSelect(lang);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-5 animate-fade-in">
      <div className="absolute inset-0 bg-ink-950/90 backdrop-blur-md" />
      <div className="relative w-full max-w-md glass-gold rounded-3xl border-gold-400/25 p-8 sm:p-10 text-center shadow-2xl shadow-gold-400/10">
        <div className="mx-auto mb-6 w-14 h-14 rounded-full bg-gold-gradient flex items-center justify-center shadow-lg shadow-gold-400/25">
          <Sparkles className="w-7 h-7 text-ink-950" />
        </div>
        <p className="text-xs tracking-[0.25em] uppercase text-gold-400 mb-3">Welcome / أهلاً بك</p>
        <h2 className="font-serif text-2xl sm:text-3xl text-gold-100 mb-2 leading-snug">
          Select Your Preferred Language
        </h2>
        <p className="font-arabic text-xl text-gold-200/90 mb-8">اختر لغتك المفضلة</p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => choose('en')}
            className="btn-gold flex-1 py-3.5 text-sm"
          >
            English
          </button>
          <button
            type="button"
            onClick={() => choose('ar')}
            className="btn-outline flex-1 py-3.5 text-sm font-arabic"
          >
            العربية
          </button>
        </div>
      </div>
    </div>
  );
}
