import { useEffect, useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { useI18n, type Lang } from '@/lib/i18n';
import { useBooking } from '@/lib/booking';

interface NavbarProps {
  onNavigate: (route: 'site' | 'admin') => void;
  currentRoute: 'site' | 'admin';
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const { lang, setLang, t, dir } = useI18n();
  const { openModal } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const switchLang = (l: Lang) => {
    setLang(l);
    document.documentElement.lang = l;
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
  };

  const navLinks = [
    { label: t.nav.home, href: '#hero' },
    { label: t.nav.treatments, href: '#treatments' },
    { label: t.nav.offers, href: '#offers' },
    { label: t.nav.team, href: '#team' },
    { label: t.nav.reviews, href: '#reviews' },
    { label: t.nav.contact, href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-ink-950/90 backdrop-blur-xl border-b border-gold-400/10 py-3' : 'py-5'
      }`}
    >
      <nav className="section-pad flex items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('site')}
          className="flex items-center gap-2.5 group"
        >
          <div className="relative w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center shadow-lg shadow-gold-400/20 group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5 text-ink-950" />
          </div>
          <div className="text-left">
            <div className={`font-serif text-lg leading-none ${dir === 'rtl' ? 'font-arabic' : ''}`}>
              <span className="gold-text">La Belleza</span>
            </div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-ink-300 mt-0.5">
              {lang === 'ar' ? 'عيادة التجميل' : 'Aesthetica Clinic'}
            </div>
          </div>
        </button>

        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`text-sm text-ink-200 hover:text-gold-300 transition-colors relative group ${
                dir === 'rtl' ? 'font-arabic' : ''
              }`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-gradient group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* EN / AR language switcher pill */}
          <div
            className="flex items-center rounded-full border border-gold-400/25 bg-ink-900/70 backdrop-blur-md p-0.5"
            role="group"
            aria-label="Language switcher"
          >
            {(['en', 'ar'] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => switchLang(l)}
                className={`px-2.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wider transition-all ${
                  lang === l
                    ? 'bg-gold-gradient text-ink-950 shadow-sm'
                    : 'text-gold-200/70 hover:text-gold-200'
                }`}
                aria-pressed={lang === l}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={() => onNavigate('admin')}
            className={`hidden md:flex items-center text-xs text-ink-400 hover:text-gold-300 transition-colors ${dir === 'rtl' ? 'font-arabic' : ''}`}
          >
            {t.nav.admin}
          </button>

          <button
            onClick={() => openModal()}
            className={`hidden sm:inline-flex btn-gold text-xs px-5 py-2.5 ${dir === 'rtl' ? 'font-arabic' : ''}`}
          >
            {t.nav.book}
          </button>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden p-2 text-gold-200"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="lg:hidden absolute top-full inset-x-0 bg-ink-950/95 backdrop-blur-xl border-b border-gold-400/10 animate-fade-in">
          <div className="section-pad py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`text-left text-ink-200 hover:text-gold-300 transition-colors py-2 ${dir === 'rtl' ? 'font-arabic text-right' : ''}`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { setMenuOpen(false); onNavigate('admin'); }}
              className={`text-left text-ink-400 hover:text-gold-300 transition-colors py-2 ${dir === 'rtl' ? 'font-arabic text-right' : ''}`}
            >
              {t.nav.admin}
            </button>
            <button
              onClick={() => { setMenuOpen(false); openModal(); }}
              className={`btn-gold w-full mt-2 ${dir === 'rtl' ? 'font-arabic' : ''}`}
            >
              {t.nav.book}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
