import { useI18n } from '@/lib/i18n';

export default function About() {
  const { t, dir } = useI18n();
  const isAr = dir === 'rtl';

  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-[#121212] to-ink-950" />
      <div className="relative section-pad">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
          <div className="relative aspect-[4/3] lg:aspect-[5/4] overflow-hidden rounded-3xl border border-gold-400/20">
            <img
              src="/1000798291.jpg"
              alt="La Belleza Aesthetic Clinic Marble Signage"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>
          <div>
            <span className={`inline-block text-xs tracking-[0.25em] uppercase text-gold-400 mb-4 ${isAr ? 'font-arabic tracking-normal' : ''}`}>
              {t.footer.about}
            </span>
            <h2 className={`font-serif text-4xl sm:text-5xl mb-5 ${isAr ? 'font-arabic' : ''}`}>
              <span className="gold-text">{isAr ? 'قصتنا' : 'Our Story'}</span>
            </h2>
            <p className={`text-ink-200 leading-relaxed text-base sm:text-lg ${isAr ? 'font-arabic' : ''}`}>
              {t.footer.aboutText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
