import { useRef, useState } from 'react';
import { Zap, Syringe, Droplets, Smile, ArrowRight, MoveHorizontal } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { useBooking } from '@/lib/booking';

const TREATMENTS = [
  {
    icon: Zap,
    image: '/treatment-laser.webp',
    titleKey: 'cat1',
    descKey: 'cat1Desc',
    service: 'Laser Hair Removal',
  },
  {
    icon: Syringe,
    image: '/treatment-injectables.webp',
    titleKey: 'cat2',
    descKey: 'cat2Desc',
    service: 'Russian Lips',
  },
  {
    icon: Droplets,
    image: '/treatment-skin.webp',
    titleKey: 'cat3',
    descKey: 'cat3Desc',
    service: 'Skin Boosters',
  },
  {
    icon: Smile,
    image: '/treatment-dental.webp',
    titleKey: 'cat4',
    descKey: 'cat4Desc',
    service: 'Cosmetic Dentistry',
  },
] as const;

function BeforeAfterSlider() {
  const { t, dir } = useI18n();
  const isAr = dir === 'rtl';
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  };

  return (
    <div className="mt-16">
      <div className="text-center mb-6">
        <h4 className={`font-serif text-2xl text-gold-200 mb-2 ${isAr ? 'font-arabic' : ''}`}>
          {t.treatments.beforeAfter}
        </h4>
      </div>

      {/* Slider */}
      <div
        ref={containerRef}
        className="relative w-full max-w-2xl mx-auto aspect-[4/3] rounded-2xl overflow-hidden border border-gold-400/20 cursor-ew-resize select-none"
        onMouseDown={(e) => { dragging.current = true; updateFromClientX(e.clientX); }}
        onMouseMove={(e) => { if (dragging.current) updateFromClientX(e.clientX); }}
        onMouseUp={() => { dragging.current = false; }}
        onMouseLeave={() => { dragging.current = false; }}
        onTouchStart={(e) => { dragging.current = true; updateFromClientX(e.touches[0].clientX); }}
        onTouchMove={(e) => { if (dragging.current) updateFromClientX(e.touches[0].clientX); }}
        onTouchEnd={() => { dragging.current = false; }}
      >
        {/* After image (full) */}
        <img src="/after-after-1.webp" alt="After" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
        <span className={`absolute bottom-4 right-4 px-3 py-1 rounded-full glass text-xs text-gold-200 ${isAr ? 'font-arabic' : ''}`}>
          {t.treatments.after}
        </span>

        {/* Before image (clipped) */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
          <img
            src="/before-after-1.webp"
            alt="Before"
            className="absolute inset-0 h-full object-cover"
            style={{ width: `${containerRef.current?.offsetWidth ?? 100}%` }}
            draggable={false}
          />
          <span className={`absolute bottom-4 left-4 px-3 py-1 rounded-full glass text-xs text-ink-200 ${isAr ? 'font-arabic' : ''}`}>
            {t.treatments.before}
          </span>
        </div>

        {/* Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-gold-gradient shadow-[0_0_20px_rgba(212,175,55,0.6)]"
          style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center shadow-lg">
            <MoveHorizontal className="w-5 h-5 text-ink-950" />
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className={`text-center text-xs text-ink-400 mt-4 max-w-2xl mx-auto leading-relaxed ${isAr ? 'font-arabic' : ''}`}>
        {t.treatments.disclaimer}
      </p>
    </div>
  );
}

export default function Treatments() {
  const { t, dir } = useI18n();
  const { openModal } = useBooking();
  const isAr = dir === 'rtl';

  return (
    <section id="treatments" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-20">
        <img src="/bg-texture.webp" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-900/80 to-ink-950" />

      <div className="relative section-pad">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className={`inline-block text-xs tracking-[0.25em] uppercase text-gold-400 mb-4 ${isAr ? 'font-arabic tracking-normal' : ''}`}>
            {t.treatments.label}
          </span>
          <h2 className={`font-serif text-4xl sm:text-5xl lg:text-6xl mb-5 ${isAr ? 'font-arabic' : ''}`}>
            <span className="gold-text">{t.treatments.title}</span>
          </h2>
          <p className={`text-ink-300 leading-relaxed ${isAr ? 'font-arabic' : ''}`}>
            {t.treatments.subtitle}
          </p>
        </div>

        {/* Treatment cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {TREATMENTS.map((tr, i) => {
            const Icon = tr.icon;
            return (
              <div
                key={tr.titleKey}
                className="group relative rounded-2xl overflow-hidden glass border-gold-400/10 hover:border-gold-400/30 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(212,175,55,0.15)]"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={tr.image}
                    alt={t.treatments[tr.titleKey]}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                  <div className="absolute top-4 left-4 w-11 h-11 rounded-full bg-gold-gradient flex items-center justify-center shadow-lg">
                    <Icon className="w-5 h-5 text-ink-950" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-7">
                  <h3 className={`font-serif text-xl lg:text-2xl text-gold-100 mb-3 ${isAr ? 'font-arabic' : ''}`}>
                    {t.treatments[tr.titleKey]}
                  </h3>
                  <p className={`text-sm text-ink-300 leading-relaxed mb-5 ${isAr ? 'font-arabic' : ''}`}>
                    {t.treatments[tr.descKey]}
                  </p>
                  <button
                    onClick={() => openModal(t.treatments[tr.titleKey])}
                    className={`inline-flex items-center gap-1.5 text-sm text-gold-400 hover:text-gold-200 transition-colors group/btn ${isAr ? 'font-arabic' : ''}`}
                  >
                    {t.treatments.learnMore}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Before/After */}
        <BeforeAfterSlider />
      </div>
    </section>
  );
}
