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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 max-w-7xl mx-auto">
          {TEAM.map((member, i) => {
            const name = lang === 'ar' ? member.nameAr : member.name;
            const role = lang === 'ar' ? member.roleAr : member.roleEn;
            return (
              <article
                key={member.id}
                className="group glass rounded-2xl border-gold-400/10 hover:border-gold-400/35 p-6 text-center transition-all duration-500 hover:shadow-[0_16px_50px_rgba(212,175,55,0.12)] hover:-translate-y-1"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="mx-auto mb-5 w-20 h-20 rounded-full bg-gradient-to-br from-gold-400/30 via-ink-800 to-ink-900 border border-gold-400/30 flex items-center justify-center shadow-lg shadow-gold-400/10 group-hover:scale-105 transition-transform duration-500">
                  <span className="font-serif text-xl gold-text tracking-wide">{member.initials}</span>
                </div>
                <h3 className={`font-serif text-lg text-gold-100 mb-2 leading-snug ${isAr ? 'font-arabic' : ''}`}>
                  {name}
                </h3>
                <p className={`text-xs text-ink-300 leading-relaxed ${isAr ? 'font-arabic' : ''}`}>
                  {role}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
