import { useRef, useState } from 'react';
import { MoveHorizontal } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { BEFORE_AFTER } from '@/lib/constants';

interface SliderProps {
  beforeSrc: string;
  afterSrc: string;
  title: string;
  beforeLabel: string;
  afterLabel: string;
  isAr: boolean;
}

function ComparisonSlider({ beforeSrc, afterSrc, title, beforeLabel, afterLabel, isAr }: SliderProps) {
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

  const stop = () => {
    dragging.current = false;
  };

  return (
    <article className="group">
      <div
        ref={containerRef}
        className="relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden border border-gold-400/20 cursor-ew-resize select-none touch-none"
        onMouseDown={(e) => {
          dragging.current = true;
          updateFromClientX(e.clientX);
        }}
        onMouseMove={(e) => {
          if (dragging.current) updateFromClientX(e.clientX);
        }}
        onMouseUp={stop}
        onMouseLeave={stop}
        onTouchStart={(e) => {
          dragging.current = true;
          updateFromClientX(e.touches[0].clientX);
        }}
        onTouchMove={(e) => {
          if (dragging.current) updateFromClientX(e.touches[0].clientX);
        }}
        onTouchEnd={stop}
      >
        <img src={afterSrc} alt={`${title} after`} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
        <span className={`absolute bottom-2 right-2 px-2 py-0.5 rounded-full glass text-[10px] sm:text-xs text-gold-200 ${isAr ? 'font-arabic' : ''}`}>
          {afterLabel}
        </span>

        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
          <img
            src={beforeSrc}
            alt={`${title} before`}
            className="absolute inset-0 h-full object-cover max-w-none"
            style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
            draggable={false}
          />
          <span className={`absolute bottom-2 left-2 px-2 py-0.5 rounded-full glass text-[10px] sm:text-xs text-ink-200 ${isAr ? 'font-arabic' : ''}`}>
            {beforeLabel}
          </span>
        </div>

        <div
          className="absolute top-0 bottom-0 w-0.5 sm:w-1 bg-gold-gradient shadow-[0_0_16px_rgba(212,175,55,0.55)]"
          style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gold-gradient flex items-center justify-center shadow-lg">
            <MoveHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-ink-950" />
          </div>
        </div>
      </div>
      <h4 className={`mt-2.5 text-center font-serif text-sm sm:text-base text-gold-100 ${isAr ? 'font-arabic' : ''}`}>
        {title}
      </h4>
    </article>
  );
}

export default function BeforeAfterGrid() {
  const { t, lang, dir } = useI18n();
  const isAr = dir === 'rtl';

  return (
    <div id="before-after" className="mt-16 sm:mt-20">
      <div className="text-center mb-8 sm:mb-10">
        <h4 className={`font-serif text-2xl sm:text-3xl text-gold-200 mb-2 ${isAr ? 'font-arabic' : ''}`}>
          {t.treatments.beforeAfter}
        </h4>
        <p className={`text-xs sm:text-sm text-ink-400 max-w-xl mx-auto ${isAr ? 'font-arabic' : ''}`}>
          {t.treatments.beforeAfterHint}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 max-w-6xl mx-auto">
        {BEFORE_AFTER.map((item) => (
          <ComparisonSlider
            key={item.id}
            beforeSrc={item.beforeSrc}
            afterSrc={item.afterSrc}
            title={lang === 'ar' ? item.titleAr : item.titleEn}
            beforeLabel={t.treatments.before}
            afterLabel={t.treatments.after}
            isAr={isAr}
          />
        ))}
      </div>

      <p className={`text-center text-[11px] sm:text-xs text-ink-400 mt-6 max-w-2xl mx-auto leading-relaxed ${isAr ? 'font-arabic' : ''}`}>
        {t.treatments.disclaimer}
      </p>
    </div>
  );
}
