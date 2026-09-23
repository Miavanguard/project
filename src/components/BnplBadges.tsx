interface BnplBadgesProps {
  className?: string;
  compact?: boolean;
  isAr?: boolean;
}

export default function BnplBadges({ className = '', compact = false, isAr = false }: BnplBadgesProps) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span
        className={`inline-flex items-center gap-1.5 rounded-md border border-gold-400/25 bg-ink-900/80 px-2.5 ${
          compact ? 'py-1' : 'py-1.5'
        }`}
      >
        <span className="font-semibold tracking-wide text-[#00D0C1] text-[11px]">tabby</span>
        <span className={`text-[10px] text-ink-300 ${isAr ? 'font-arabic' : ''}`}>
          {isAr ? '٤ دفعات بدون فوائد' : '4 Interest-Free'}
        </span>
      </span>
      <span
        className={`inline-flex items-center gap-1.5 rounded-md border border-gold-400/25 bg-ink-900/80 px-2.5 ${
          compact ? 'py-1' : 'py-1.5'
        }`}
      >
        <span className="font-semibold tracking-wide text-[#5B3CF5] text-[11px]">tamara</span>
        <span className={`text-[10px] text-ink-300 ${isAr ? 'font-arabic' : ''}`}>
          {isAr ? '٤ دفعات بدون فوائد' : '4 Interest-Free'}
        </span>
      </span>
    </div>
  );
}
