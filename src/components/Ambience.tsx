import { useI18n } from '@/lib/i18n';

export default function Ambience() {
  const { dir } = useI18n();
  const isAr = dir === 'rtl';

  return (
    <section id="ambiance" className="relative py-24 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-ink-950" />
      <div className="relative section-pad">
        <article className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-3xl border border-gold-400/20">
          <div className="relative min-h-[280px] lg:min-h-[420px]">
            <img
              src="/1000798290.jpg"
              alt="Clinic Interior Decor & Ambient Lighting"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/20" />
          </div>
          <div className="relative flex flex-col justify-center bg-[#121212] p-8 sm:p-12">
            <span className={`text-xs tracking-[0.25em] uppercase text-gold-400 mb-4 ${isAr ? 'font-arabic tracking-normal' : ''}`}>
              {isAr ? 'لماذا لا بيليزا' : 'Why Choose Us'}
            </span>
            <h2 className={`font-serif text-3xl sm:text-4xl mb-4 ${isAr ? 'font-arabic' : ''}`}>
              <span className="gold-text">{isAr ? 'أجواء من الهدوء الفاخر' : 'An Atmosphere of Quiet Luxury'}</span>
            </h2>
            <p className={`text-ink-200 leading-relaxed ${isAr ? 'font-arabic' : ''}`}>
              {isAr
                ? 'إضاءة دافئة وتفاصيل مختارة بعناية تمنح كل زيارة شعوراً بالراحة والخصوصية منذ اللحظة الأولى.'
                : 'Warm ambient light and carefully chosen details make every visit feel calm, private, and considered from the moment you arrive.'}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
