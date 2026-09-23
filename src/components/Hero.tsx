import { Calendar, Gift, Sparkles, Star } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { useBooking } from '@/lib/booking';

export default function Hero() {
  const { t, dir, lang } = useI18n();
  const { openModal } = useBooking();
  const isAr = dir === 'rtl';

  const scrollToOffers = () => {
    document.querySelector('#offers')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/hero-clinic.webp"
          alt="Luxury clinic interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/60 to-ink-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-transparent to-ink-950/40" />
      </div>

      {/* Decorative gold orbs */}
      <div className="absolute top-1/4 right-10 w-72 h-72 rounded-full bg-gold-400/10 blur-[100px] animate-float" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 rounded-full bg-gold-600/5 blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 section-pad pt-32 pb-20 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-gold mb-8 animate-fade-up">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span className={`text-xs tracking-[0.15em] uppercase text-gold-200 ${isAr ? 'font-arabic tracking-normal' : ''}`}>
              {t.hero.badge}
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] mb-6 text-shadow-lux animate-fade-up ${isAr ? 'font-arabic' : ''}`}
            style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
          >
            <span className="block text-ink-50">{t.hero.title1}</span>
            <span className="block gold-text italic">{t.hero.title2}</span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-base sm:text-lg text-ink-200 leading-relaxed max-w-2xl mb-10 animate-fade-up ${isAr ? 'font-arabic' : ''}`}
            style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
          >
            {t.hero.subtitle}
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-up"
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
          >
            <button onClick={() => openModal()} className={`btn-gold ${isAr ? 'font-arabic' : ''}`}>
              <Calendar className="w-4 h-4" />
              {t.hero.bookCta}
            </button>
            <button onClick={scrollToOffers} className={`btn-outline ${isAr ? 'font-arabic' : ''}`}>
              <Gift className="w-4 h-4" />
              {t.hero.offersCta}
            </button>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-3 gap-6 max-w-lg animate-fade-up"
            style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
          >
            {[
              { val: t.hero.stat1, label: t.hero.stat1Label },
              { val: t.hero.stat2, label: t.hero.stat2Label },
              { val: t.hero.stat3, label: t.hero.stat3Label },
            ].map((stat, i) => (
              <div key={i} className="text-center sm:text-left">
                <div className="font-serif text-3xl sm:text-4xl gold-text mb-1">{stat.val}</div>
                <div className={`text-[11px] sm:text-xs text-ink-300 tracking-wide ${isAr ? 'font-arabic' : ''}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block">
        <div className="flex flex-col items-center gap-2">
          <Star className="w-3 h-3 text-gold-400 animate-pulse" />
          <div className="w-px h-12 bg-gradient-to-b from-gold-400/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
