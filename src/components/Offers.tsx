import { useState, useEffect } from 'react';
import { Tag, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { useBooking } from '@/lib/booking';
import { OFFERS, getWhatsAppUrl } from '@/lib/constants';
import BnplBadges from '@/components/BnplBadges';

/**
 * Active Monthly Specials carousel.
 * Data lives in `OFFERS` (constants) for easy monthly updates.
 * Swap `OFFERS` for a Supabase query later without changing this UI.
 */
export default function Offers() {
  const { t, lang, dir } = useI18n();
  const { openModal } = useBooking();
  const isAr = dir === 'rtl';
  const [active, setActive] = useState(0);

  const next = () => setActive((v) => (v + 1) % OFFERS.length);
  const prev = () => setActive((v) => (v - 1 + OFFERS.length) % OFFERS.length);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, []);

  const offer = OFFERS[active];
  const title = lang === 'ar' ? offer.titleAr : offer.titleEn;
  const desc = lang === 'ar' ? offer.descAr : offer.descEn;
  const badge = lang === 'ar' ? offer.badgeAr : offer.badgeEn;
  const savings =
    offer.originalPrice && offer.originalPrice > offer.price
      ? offer.originalPrice - offer.price
      : null;

  return (
    <section id="offers" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-dark-radial" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold-400/5 blur-[150px]" />

      <div className="relative section-pad">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className={`inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-gold-400 mb-4 ${isAr ? 'font-arabic tracking-normal' : ''}`}>
            <Tag className="w-3.5 h-3.5" />
            {t.offers.label}
          </span>
          <h2 className={`font-serif text-4xl sm:text-5xl lg:text-6xl mb-5 ${isAr ? 'font-arabic' : ''}`}>
            <span className="gold-text">{t.offers.title}</span>
          </h2>
          <p className={`text-ink-300 leading-relaxed ${isAr ? 'font-arabic' : ''}`}>
            {t.offers.subtitle}
          </p>
        </div>

        {/* Mobile / featured carousel */}
        <div className="max-w-4xl mx-auto lg:hidden">
          <div className="relative">
            <OfferCard
              key={active}
              title={title}
              desc={desc}
              badge={badge}
              price={offer.price}
              originalPrice={offer.originalPrice}
              fromPrice={offer.fromPrice}
              savings={savings}
              isAr={isAr}
              aed={t.offers.aed}
              saveLabel={t.offers.save}
              fromLabel={t.offers.from}
              claimLabel={t.offers.claim}
              consultLabel={lang === 'ar' ? 'تشمل استشارة مجانية' : 'Includes a complimentary consultation'}
              onClaim={() => openModal(title)}
            />

            <button
              onClick={prev}
              className="absolute top-1/2 -translate-y-1/2 -left-3 w-10 h-10 rounded-full glass border-gold-400/20 flex items-center justify-center text-gold-200 hover:bg-gold-400/10 transition-all"
              aria-label="Previous"
            >
              {isAr ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
            <button
              onClick={next}
              className="absolute top-1/2 -translate-y-1/2 -right-3 w-10 h-10 rounded-full glass border-gold-400/20 flex items-center justify-center text-gold-200 hover:bg-gold-400/10 transition-all"
              aria-label="Next"
            >
              {isAr ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 mt-8">
            {OFFERS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? 'w-8 bg-gold-gradient' : 'w-2 bg-ink-600 hover:bg-ink-500'
                }`}
                aria-label={`Go to offer ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop grid of all active specials */}
        <div className="hidden lg:grid grid-cols-3 gap-6 max-w-6xl mx-auto">
          {OFFERS.map((o) => {
            const oTitle = lang === 'ar' ? o.titleAr : o.titleEn;
            const oDesc = lang === 'ar' ? o.descAr : o.descEn;
            const oBadge = lang === 'ar' ? o.badgeAr : o.badgeEn;
            const oSavings =
              o.originalPrice && o.originalPrice > o.price
                ? o.originalPrice - o.price
                : null;
            return (
              <OfferCard
                key={o.id}
                title={oTitle}
                desc={oDesc}
                badge={oBadge}
                price={o.price}
                originalPrice={o.originalPrice}
                fromPrice={o.fromPrice}
                savings={oSavings}
                isAr={isAr}
                aed={t.offers.aed}
                saveLabel={t.offers.save}
                fromLabel={t.offers.from}
                claimLabel={t.offers.claim}
                consultLabel={lang === 'ar' ? 'تشمل استشارة مجانية' : 'Includes a complimentary consultation'}
                onClaim={() => openModal(oTitle)}
                compact
              />
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn-outline text-xs ${isAr ? 'font-arabic' : ''}`}
          >
            {t.offers.whatsappCta}
          </a>
        </div>
      </div>
    </section>
  );
}

interface OfferCardProps {
  title: string;
  desc: string;
  badge: string;
  price: number;
  originalPrice?: number;
  fromPrice?: boolean;
  savings: number | null;
  isAr: boolean;
  aed: string;
  saveLabel: string;
  fromLabel: string;
  claimLabel: string;
  consultLabel: string;
  onClaim: () => void;
  compact?: boolean;
}

function OfferCard({
  title,
  desc,
  badge,
  price,
  originalPrice,
  fromPrice,
  savings,
  isAr,
  aed,
  saveLabel,
  fromLabel,
  claimLabel,
  consultLabel,
  onClaim,
  compact = false,
}: OfferCardProps) {
  return (
    <div className="glass rounded-3xl overflow-hidden border-gold-400/15 animate-fade-in h-full flex flex-col hover:border-gold-400/35 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(212,175,55,0.12)]">
      <div
        className={`relative bg-gradient-to-br from-gold-400/20 via-ink-800 to-ink-900 p-6 ${
          compact ? 'min-h-[160px]' : 'min-h-[200px] md:min-h-[240px]'
        } flex flex-col justify-between`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="px-3 py-1.5 rounded-full bg-gold-gradient text-ink-950 text-xs font-semibold shrink-0">
            {badge}
          </div>
          {savings != null && originalPrice != null && (
            <div className="text-right">
              <div className="text-xs text-ink-400 line-through">
                {originalPrice} {aed}
              </div>
              <div className={`text-xs text-gold-300 font-medium ${isAr ? 'font-arabic' : ''}`}>
                {saveLabel} {savings} {aed}
              </div>
            </div>
          )}
        </div>
        <div>
          {fromPrice && (
            <div className={`text-xs text-gold-300 mb-1 ${isAr ? 'font-arabic' : ''}`}>
              {fromLabel}
            </div>
          )}
          <div className="flex items-baseline gap-2">
            <span className={`font-serif gold-text ${compact ? 'text-4xl' : 'text-5xl lg:text-6xl'}`}>
              {price.toLocaleString()}
            </span>
            <span className={`text-lg text-gold-200 ${isAr ? 'font-arabic' : ''}`}>{aed}</span>
          </div>
        </div>
      </div>

      <div className={`p-6 ${compact ? '' : 'lg:p-8'} flex flex-col flex-1`}>
        <h3 className={`font-serif text-xl lg:text-2xl text-gold-100 mb-3 ${isAr ? 'font-arabic' : ''}`}>
          {title}
        </h3>
        <p className={`text-sm text-ink-300 leading-relaxed mb-4 flex-1 ${isAr ? 'font-arabic' : ''}`}>
          {desc}
        </p>
        <div className="flex items-center gap-2 text-xs text-ink-400 mb-4">
          <Check className="w-4 h-4 text-gold-400 shrink-0" />
          <span className={isAr ? 'font-arabic' : ''}>{consultLabel}</span>
        </div>
        <BnplBadges compact isAr={isAr} className="mb-5" />
        <button onClick={onClaim} className={`btn-gold self-start text-xs px-5 py-2.5 ${isAr ? 'font-arabic' : ''}`}>
          {claimLabel}
        </button>
      </div>
    </div>
  );
}
