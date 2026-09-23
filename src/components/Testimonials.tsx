import { useEffect, useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { REVIEWS } from '@/lib/constants';

export default function Testimonials() {
  const { t, lang, dir } = useI18n();
  const isAr = dir === 'rtl';
  const [active, setActive] = useState(0);

  const next = () => setActive((v) => (v + 1) % REVIEWS.length);
  const prev = () => setActive((v) => (v - 1 + REVIEWS.length) % REVIEWS.length);

  useEffect(() => {
    const interval = setInterval(next, 7000);
    return () => clearInterval(interval);
  }, []);

  const review = REVIEWS[active];
  const name = lang === 'ar' ? review.nameAr : review.name;
  const text = lang === 'ar' ? review.textAr : review.textEn;

  return (
    <section id="reviews" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-[#121212] to-ink-950" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-gold-400/5 blur-[120px]" />

      <div className="relative section-pad">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className={`inline-block text-xs tracking-[0.25em] uppercase text-gold-400 mb-4 ${isAr ? 'font-arabic tracking-normal' : ''}`}>
            {t.reviews.label}
          </span>
          <h2 className={`font-serif text-4xl sm:text-5xl lg:text-6xl mb-5 ${isAr ? 'font-arabic' : ''}`}>
            <span className="gold-text">{t.reviews.title}</span>
          </h2>
          <p className={`text-ink-300 leading-relaxed ${isAr ? 'font-arabic' : ''}`}>
            {t.reviews.subtitle}
          </p>
        </div>

        <div className="max-w-3xl mx-auto relative">
          <div
            key={active}
            className="glass rounded-3xl border-gold-400/15 p-8 lg:p-12 animate-fade-in relative"
          >
            <Quote className="absolute top-6 left-6 w-10 h-10 text-gold-400/20" />
            <div className="flex items-center justify-center gap-1 mb-6">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
              ))}
            </div>
            <blockquote className={`text-base sm:text-lg text-ink-100 leading-relaxed text-center mb-8 ${isAr ? 'font-arabic' : ''}`}>
              “{text}”
            </blockquote>
            <div className="text-center">
              <div className={`font-serif text-xl text-gold-200 ${isAr ? 'font-arabic' : ''}`}>
                {name}
              </div>
              <div className={`text-xs text-ink-400 mt-1 tracking-wide ${isAr ? 'font-arabic' : ''}`}>
                {t.reviews.googleReview}
              </div>
            </div>
          </div>

          <button
            onClick={prev}
            className="absolute top-1/2 -translate-y-1/2 -left-2 sm:-left-5 w-10 h-10 rounded-full glass border-gold-400/20 flex items-center justify-center text-gold-200 hover:bg-gold-400/10 transition-all"
            aria-label="Previous review"
          >
            {isAr ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 -translate-y-1/2 -right-2 sm:-right-5 w-10 h-10 rounded-full glass border-gold-400/20 flex items-center justify-center text-gold-200 hover:bg-gold-400/10 transition-all"
            aria-label="Next review"
          >
            {isAr ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>

          <div className="flex items-center justify-center gap-2 mt-8">
            {REVIEWS.map((r, i) => (
              <button
                key={r.id}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? 'w-8 bg-gold-gradient' : 'w-2 bg-ink-600 hover:bg-ink-500'
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
