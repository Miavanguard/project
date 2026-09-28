import { useEffect, useState } from 'react';
import { Stethoscope } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { TEAM, type TeamMember } from '@/lib/constants';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { TeamCardSkeleton, useImagesReady } from '@/components/Skeleton';

interface TeamRow {
  id: string;
  name_en: string;
  name_ar: string;
  role_en: string;
  role_ar: string;
  initials: string;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
}

function mapRow(row: TeamRow): TeamMember {
  return {
    id: row.id,
    name: row.name_en,
    nameAr: row.name_ar,
    roleEn: row.role_en,
    roleAr: row.role_ar,
    initials: row.initials,
    imageUrl: row.image_url ?? undefined,
    sortOrder: row.sort_order,
    isActive: row.is_active,
  };
}

export default function Team() {
  const { t, lang, dir } = useI18n();
  const isAr = dir === 'rtl';
  const [members, setMembers] = useState<TeamMember[]>(
    () => TEAM.filter((m) => m.isActive !== false).sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
  );
  const imagesReady = useImagesReady(members.map((member) => member.imageUrl));

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!isSupabaseConfigured || !supabase) return;
      const { data, error } = await supabase
        .from('team_members')
        .select('id, name_en, name_ar, role_en, role_ar, initials, image_url, sort_order, is_active')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (cancelled || error || !data?.length) return;
      setMembers(data.map(mapRow));
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

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

        {/* Featured doctors with headshots first */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5 max-w-7xl mx-auto">
          {!imagesReady
            ? members.map((member) => <TeamCardSkeleton key={member.id} />)
            : members.map((member, i) => {
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
                featured={Boolean(member.imageUrl?.includes('dr-clara') || member.imageUrl?.includes('dr-diyar'))}
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
  featured?: boolean;
}

function TeamCard({ name, role, initials, imageUrl, isAr, delay, featured }: TeamCardProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = Boolean(imageUrl) && !imgFailed;

  return (
    <article
      className={`group relative rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-1 ${
        featured
          ? 'border-gold-400/40 hover:border-gold-400/70 shadow-[0_12px_40px_rgba(212,175,55,0.12)] hover:shadow-[0_18px_55px_rgba(212,175,55,0.22)]'
          : 'border-gold-400/20 hover:border-gold-400/45 hover:shadow-[0_16px_50px_rgba(212,175,55,0.12)]'
      }`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="relative aspect-[3/4] bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950">
        {showImage ? (
          <img
            src={imageUrl}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover object-[center_18%] transition-transform duration-700 group-hover:scale-105"
            onError={() => setImgFailed(true)}
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gold-400/15 via-ink-800 to-ink-950">
            <span className="font-serif text-4xl sm:text-5xl gold-text tracking-wide opacity-80">{initials}</span>
          </div>
        )}

        {/* Luxury dark / champagne gold overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-br from-gold-400/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/95 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-center">
          <div className="mx-auto mb-2 h-px w-10 bg-gold-gradient opacity-70" />
          <h3 className={`font-serif text-sm sm:text-base lg:text-lg text-gold-100 mb-1 leading-snug ${isAr ? 'font-arabic' : ''}`}>
            {name}
          </h3>
          <p className={`text-[10px] sm:text-xs text-gold-300/90 leading-relaxed tracking-wide ${isAr ? 'font-arabic tracking-normal' : ''}`}>
            {role}
          </p>
        </div>
      </div>
    </article>
  );
}
