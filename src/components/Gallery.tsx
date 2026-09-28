import { useEffect, useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { GALLERY } from '@/lib/constants';
import { GalleryItemSkeleton, useImagesReady } from '@/components/Skeleton';

export default function Gallery() {
  const { t, lang, dir } = useI18n();
  const isAr = dir === 'rtl';
  const [lightbox, setLightbox] = useState<number | null>(null);
  const imagesReady = useImagesReady(GALLERY.map((item) => item.src));

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox((i) => (i === null ? i : (i + 1) % GALLERY.length));
      if (e.key === 'ArrowLeft') setLightbox((i) => (i === null ? i : (i - 1 + GALLERY.length) % GALLERY.length));
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox]);

  return (
    <section id="gallery" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-[#121212] to-ink-950" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-gold-400/5 blur-[130px]" />

      <div className="relative section-pad">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className={`inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-gold-400 mb-4 ${isAr ? 'font-arabic tracking-normal' : ''}`}>
            <Camera className="w-3.5 h-3.5" />
            {t.gallery.label}
          </span>
          <h2 className={`font-serif text-4xl sm:text-5xl lg:text-6xl mb-5 ${isAr ? 'font-arabic' : ''}`}>
            <span className="gold-text">{t.gallery.title}</span>
          </h2>
          <p className={`text-ink-300 leading-relaxed ${isAr ? 'font-arabic' : ''}`}>
            {t.gallery.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 max-w-7xl mx-auto">
          {!imagesReady
            ? GALLERY.map((item) => <GalleryItemSkeleton key={item.id} />)
            : GALLERY.map((item, i) => {
            const caption = lang === 'ar' ? item.captionAr : item.captionEn;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setLightbox(i)}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-gold-400/15 hover:border-gold-400/40 transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/50"
              >
                <img
                  src={item.src}
                  alt={caption}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <span className={`absolute bottom-3 left-3 right-3 text-left text-xs sm:text-sm text-gold-100 font-medium ${isAr ? 'font-arabic text-right' : ''}`}>
                  {caption}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-ink-950/95 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Gallery lightbox"
        >
          <button
            type="button"
            className="absolute top-5 right-5 w-10 h-10 rounded-full glass flex items-center justify-center text-gold-200 hover:bg-gold-400/10"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="absolute left-3 sm:left-6 w-10 h-10 rounded-full glass flex items-center justify-center text-gold-200 hover:bg-gold-400/10"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i === null ? i : (i - 1 + GALLERY.length) % GALLERY.length));
            }}
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="absolute right-3 sm:right-6 w-10 h-10 rounded-full glass flex items-center justify-center text-gold-200 hover:bg-gold-400/10"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i === null ? i : (i + 1) % GALLERY.length));
            }}
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <img
            src={GALLERY[lightbox].src}
            alt={lang === 'ar' ? GALLERY[lightbox].captionAr : GALLERY[lightbox].captionEn}
            className="max-h-[85vh] max-w-[92vw] object-contain rounded-xl border border-gold-400/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
