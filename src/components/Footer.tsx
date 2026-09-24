import { Phone, Mail, MapPin, Instagram, ArrowUp, Sparkles, ExternalLink } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { useBooking } from '@/lib/booking';
import { CLINIC, getWhatsAppUrl } from '@/lib/constants';

export default function Footer() {
  const { t, lang, dir } = useI18n();
  const { openModal } = useBooking();
  const isAr = dir === 'rtl';

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative pt-24 pb-8 overflow-hidden border-t border-gold-400/10">
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950 to-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-gold-400/50 to-transparent" />

      <div className="relative section-pad">
        <div className="glass-gold rounded-3xl p-8 lg:p-12 mb-16 text-center max-w-3xl mx-auto">
          <h3 className={`font-serif text-3xl lg:text-4xl mb-4 ${isAr ? 'font-arabic' : ''}`}>
            <span className="gold-text">{lang === 'ar' ? 'ابدأ رحلتك الجمالية' : 'Begin Your Beauty Journey'}</span>
          </h3>
          <p className={`text-ink-200 text-sm mb-6 max-w-md mx-auto ${isAr ? 'font-arabic' : ''}`}>
            {lang === 'ar'
              ? 'احجز استشارة خاصة مع فريقنا من الأخصائيين الدوليين.'
              : 'Book a private consultation with our team of internationally trained specialists.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button onClick={() => openModal()} className={`btn-gold ${isAr ? 'font-arabic' : ''}`}>
              {t.nav.book}
            </button>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-outline ${isAr ? 'font-arabic' : ''}`}
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-ink-950" />
              </div>
              <div className="font-serif text-lg gold-text">La Belleza</div>
            </div>
            <p className={`text-sm text-ink-400 leading-relaxed ${isAr ? 'font-arabic' : ''}`}>
              {t.footer.aboutText}
            </p>
          </div>

          <div>
            <h4 className={`text-sm font-semibold text-gold-200 mb-4 uppercase tracking-wider ${isAr ? 'font-arabic tracking-normal' : ''}`}>
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: t.nav.home, href: '#hero' },
                { label: t.nav.treatments, href: '#treatments' },
                { label: t.nav.offers, href: '#offers' },
                { label: t.nav.team, href: '#team' },
                { label: t.nav.gallery, href: '#gallery' },
                { label: t.nav.reviews, href: '#reviews' },
                { label: t.nav.book, href: '#contact' },
              ].map((link) => (
                <li key={link.href + link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className={`text-sm text-ink-400 hover:text-gold-300 transition-colors ${isAr ? 'font-arabic' : ''}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={`text-sm font-semibold text-gold-200 mb-4 uppercase tracking-wider ${isAr ? 'font-arabic tracking-normal' : ''}`}>
              {t.footer.contact}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href={`tel:${CLINIC.phoneRaw}`} className="text-sm text-ink-400 hover:text-gold-300 transition-colors" dir="ltr">
                    {CLINIC.phone}
                  </a>
                  <a href={`tel:${CLINIC.phoneSecondaryRaw}`} className="text-sm text-ink-500 hover:text-gold-300 transition-colors" dir="ltr">
                    {CLINIC.phoneSecondary}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                <a href={`mailto:${CLINIC.email}`} className="text-sm text-ink-400 hover:text-gold-300 transition-colors">
                  {CLINIC.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                <a
                  href={CLINIC.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm text-ink-400 hover:text-gold-300 transition-colors inline-flex items-start gap-1.5 ${isAr ? 'font-arabic' : ''}`}
                >
                  <span>{lang === 'ar' ? CLINIC.addressAr : CLINIC.address}</span>
                  <ExternalLink className="w-3 h-3 mt-1 shrink-0 opacity-60" />
                </a>
              </li>
            </ul>
            <a
              href={CLINIC.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-4 inline-flex items-center gap-2 text-xs text-gold-300 hover:text-gold-200 transition-colors ${isAr ? 'font-arabic' : ''}`}
            >
              <MapPin className="w-3.5 h-3.5" />
              {t.footer.openMaps}
            </a>
          </div>

          <div>
            <h4 className={`text-sm font-semibold text-gold-200 mb-4 uppercase tracking-wider ${isAr ? 'font-arabic tracking-normal' : ''}`}>
              {t.footer.hours}
            </h4>
            <p className={`text-sm text-ink-400 leading-relaxed mb-5 ${isAr ? 'font-arabic' : ''}`}>
              {lang === 'ar' ? CLINIC.hoursAr : CLINIC.hours}
            </p>
            <h4 className={`text-sm font-semibold text-gold-200 mb-3 uppercase tracking-wider ${isAr ? 'font-arabic tracking-normal' : ''}`}>
              {t.footer.follow}
            </h4>
            <div className="flex gap-3">
              <a
                href={CLINIC.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full glass border-gold-400/15 flex items-center justify-center text-gold-200 hover:bg-gold-400/10 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full glass border-gold-400/15 flex items-center justify-center text-gold-200 hover:bg-gold-400/10 transition-all"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gold-400/10">
          <div className={`text-center sm:text-left ${isAr ? 'sm:text-right' : ''}`}>
            <p className={`text-xs text-ink-500 ${isAr ? 'font-arabic' : ''}`}>
              © {new Date().getFullYear()} {lang === 'ar' ? CLINIC.nameAr : CLINIC.name}. {t.footer.rights}
            </p>
            <p className="text-[11px] text-ink-500 mt-1.5 tracking-wide">
              {CLINIC.mohLicense}
            </p>
          </div>
          <button
            onClick={() => scrollTo('#hero')}
            className="flex items-center gap-1.5 text-xs text-ink-400 hover:text-gold-300 transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            {lang === 'ar' ? 'العودة للأعلى' : 'Back to top'}
          </button>
        </div>
      </div>
    </footer>
  );
}
