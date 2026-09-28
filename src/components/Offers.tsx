import { useState, useEffect } from 'react';
import { Tag, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { useBooking } from '@/lib/booking';
import { OFFERS, getWhatsAppUrl, type SpecialOffer } from '@/lib/constants';
import BnplBadges from '@/components/BnplBadges';
import { OfferCardSkeleton, useImagesReady } from '@/components/Skeleton';

/**
 * Active Monthly Specials carousel / grid.
 * Set `imageUrl` on each offer in constants to drop in custom photos.
 */
export default function Offers() {
  const { t, lang, dir } = useI18n();
  const { openModal } = useBooking();
  const isAr = dir === 'rtl';
  const [active, setActive] = useState(0);
  const imagesReady = useImagesReady(OFFERS.map((item) => item.imageUrl));

  const next = () => setActive((v) => (v + 1) % OFFERS.length);
  const prev = () => setActive((v) => (v - 1 + OFFERS.length) % OFFERS.length);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, []);

  const offer = OFFERS[active];

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

        {!imagesReady ? (
          <>
            <div className="max-w-4xl mx-auto lg:hidden">
              <OfferCardSkeleton />
            </div>
            <div className="hidden lg:grid grid-cols-3 gap-6 max-w-6xl mx-auto">
              {OFFERS.map((item) => (
                <OfferCardSkeleton key={item.id} />
              ))}
            </div>
          </>
        ) : (
        <>
        <div className="max-w-4xl mx-auto lg:hidden">
          <div className="relative">
            <OfferCard
              key={offer.id}
              offer={offer}
              isAr={isAr}
              lang={lang}
              aed={t.offers.aed}
              saveLabel={t.offers.save}
              fromLabel={t.offers.from}
              claimLabel={t.offers.claim}
              consultLabel={lang === 'ar' ? 'تشمل استشارة مجانية' : 'Includes a complimentary consultation'}
              onClaim={() => openModal(lang === 'ar' ? offer.titleAr : offer.titleEn)}
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

        <div className="hidden lg:grid grid-cols-3 gap-6 max-w-6xl mx-auto">
          {OFFERS.map((o) => (
            <OfferCard
              key={o.id}
              offer={o}
              isAr={isAr}
              lang={lang}
              aed={t.offers.aed}
              saveLabel={t.offers.save}
              fromLabel={t.offers.from}
              claimLabel={t.offers.claim}
              consultLabel={lang === 'ar' ? 'تشمل استشارة مجانية' : 'Includes a complimentary consultation'}
              onClaim={() => openModal(lang === 'ar' ? o.titleAr : o.titleEn)}
              compact
            />
          ))}
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
        </>
        )}
      </div>
    </section>
  );
}

interface OfferCardProps {
  offer: SpecialOffer;
  isAr: boolean;
  lang: string;
  aed: string;
  saveLabel: string;
  fromLabel: string;
  claimLabel: string;
  consultLabel: string;
  onClaim: () => void;
  compact?: boolean;
}

function OfferCard({
  offer,
  isAr,
  lang,
  aed,
  saveLabel,
  fromLabel,
  claimLabel,
  consultLabel,
  onClaim,
  compact = false,
}: OfferCardProps) {
  const title = lang === 'ar' ? offer.titleAr : offer.titleEn;
  const desc = lang === 'ar' ? offer.descAr : offer.descEn;
  const badge = lang === 'ar' ? offer.badgeAr : offer.badgeEn;
  const savings =
    offer.originalPrice && offer.originalPrice > offer.price
      ? offer.originalPrice - offer.price
      : null;
  const priceLabel = `${offer.price.toLocaleString()} ${aed}`;

  return (
    <div className="glass rounded-3xl overflow-hidden border-gold-400/15 animate-fade-in h-full flex flex-col hover:border-gold-400/35 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(212,175,55,0.12)]">
      <div
        className={`relative overflow-hidden ${
          compact ? 'min-h-[200px]' : 'min-h-[240px] md:min-h-[280px]'
        }`}
      >
        {offer.imageUrl ? (
          <img
            src={offer.imageUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gold-400/25 via-ink-800 to-ink-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-gold-400/10 via-transparent to-transparent" />

        <div className="relative h-full min-h-[inherit] p-6 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-3">
            <div className="px-3 py-1.5 rounded-full bg-gold-gradient text-ink-950 text-xs font-semibold shrink-0 shadow-lg">
              {badge}
            </div>
            {savings != null && offer.originalPrice != null && (
              <div className="text-right">
                <div className="text-xs text-ink-300 line-through">
                  {offer.originalPrice.toLocaleString()} {aed}
                </div>
                <div className={`text-xs text-gold-300 font-medium ${isAr ? 'font-arabic' : ''}`}>
                  {saveLabel} {savings.toLocaleString()} {aed}
                </div>
              </div>
            )}
          </div>

          <div>
            {offer.fromPrice && (
              <div className={`text-xs text-gold-300 mb-1 ${isAr ? 'font-arabic' : ''}`}>
                {fromLabel}
              </div>
            )}
            <div className="inline-flex items-baseline gap-2 px-3 py-1.5 rounded-lg bg-black/50 border border-gold-400/30 backdrop-blur-sm">
              <span className={`font-serif gold-text font-semibold ${compact ? 'text-3xl' : 'text-4xl lg:text-5xl'}`}>
                {offer.price.toLocaleString()}
              </span>
              <span className={`text-base text-gold-200 font-medium ${isAr ? 'font-arabic' : ''}`}>{aed}</span>
            </div>
            <p className="sr-only">{priceLabel}</p>
          </div>
        </div>
      </div>

      <div className={`p-6 ${compact ? '' : 'lg:p-8'} flex flex-col flex-1 bg-ink-950/40`}>
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
