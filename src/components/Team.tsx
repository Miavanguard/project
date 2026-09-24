import { useState } from 'react';
import { Stethoscope } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { TEAM } from '@/lib/constants';

export default function Team() {
  const { t, lang, dir } = useI18n();
  const isAr = dir === 'rtl';

  return (
    <section id="team" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-dark-radial" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-gold-400/5 blur-[130px]" />

      <div className="relative section-pad">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className={`inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-gold-400 mb-4 ${isAr ? 'font-arabic tracking-normal' : ''}`}>
            <Stethoscope className="w-3.5 h-3.5" />
            {t.team.label}
          </span>
          <h2 className={`font-serif text-4xl sm:text-5xl lg:text-6xl mb-5 ${isAr ? 'font-arabic' : ''}`}>
            <span className="gold-text">{t.team.title}</span>
          </h2>
          <p className={`text-ink-300 leading-relaxed ${isAr ? 'font-arabic' : ''}`}>
            {t.team.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5 max-w-7xl mx-auto">
          {TEAM.map((member, i) => {
            const name = lang === 'ar' ? member.nameAr : member.name;
            const role = lang === 'ar' ? member.roleAr : member.roleEn;
            return (
              <TeamCard
                key={member.id}
                name={name}
                role={role}
                initials={member.initials}
                imageUrl={member.imageUrl}
                isAr={isAr}
                delay={i * 0.08}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface TeamCardProps {
  name: string;
  role: string;
  initials: string;
  imageUrl?: string;
  isAr: boolean;
  delay: number;
}

function TeamCard({ name, role, initials, imageUrl, isAr, delay }: TeamCardProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = Boolean(imageUrl) && !imgFailed;

  return (
    <article
      className="group relative rounded-2xl overflow-hidden border border-gold-400/25 hover:border-gold-400/50 transition-all duration-500 hover:shadow-[0_16px_50px_rgba(212,175,55,0.15)] hover:-translate-y-1"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="relative aspect-[3/4] bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950">
        {showImage ? (
          <img
            src={imageUrl}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            onError={() => setImgFailed(true)}
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gold-400/15 via-ink-800 to-ink-950">
            <span className="font-serif text-4xl sm:text-5xl gold-text tracking-wide opacity-80">{initials}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-center">
          <h3 className={`font-serif text-sm sm:text-base lg:text-lg text-gold-100 mb-1 leading-snug ${isAr ? 'font-arabic' : ''}`}>
            {name}
          </h3>
          <p className={`text-[10px] sm:text-xs text-ink-200 leading-relaxed ${isAr ? 'font-arabic' : ''}`}>
            {role}
          </p>
        </div>
      </div>
    </article>
  );
}
