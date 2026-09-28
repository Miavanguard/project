import { useState, useEffect } from 'react';
import { I18nContext, translations, type Lang, type I18nContextValue } from '@/lib/i18n';
import { AuthProvider, useAuth } from '@/lib/auth';
import { BookingProvider } from '@/lib/booking';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Treatments from '@/components/Treatments';
import Offers from '@/components/Offers';
import Team from '@/components/Team';
import Gallery from '@/components/Gallery';
import Ambience from '@/components/Ambience';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import WhatsAppFab from '@/components/WhatsAppFab';
import BookingModal from '@/components/BookingModal';
import LanguageModal from '@/components/LanguageModal';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';

type Route = 'site' | 'admin' | 'admin-dashboard';

function parseRoute(): Route {
  const hash = window.location.hash.replace(/^#/, '');
  const path = window.location.pathname;
  if (hash === '/admin/dashboard' || path === '/admin/dashboard') return 'admin-dashboard';
  if (hash === '/admin' || path === '/admin') return 'admin';
  return 'site';
}

function AppContent() {
  const { session, loading } = useAuth();
  const [route, setRoute] = useState<Route>(() =>
    typeof window !== 'undefined' ? parseRoute() : 'site'
  );

  useEffect(() => {
    const sync = () => setRoute(parseRoute());
    sync();
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, []);

  // Auth route guards
  useEffect(() => {
    if (loading) return;
    if (route === 'admin-dashboard' && !session) {
      window.location.hash = '/admin';
      setRoute('admin');
    } else if (route === 'admin' && session) {
      window.location.hash = '/admin/dashboard';
      setRoute('admin-dashboard');
    }
  }, [route, session, loading]);

  const navigate = (r: Route) => {
    if (r === 'admin-dashboard') {
      window.location.hash = '/admin/dashboard';
    } else if (r === 'admin') {
      window.location.hash = '/admin';
    } else {
      window.location.hash = '';
      window.scrollTo({ top: 0 });
    }
    setRoute(r);
  };

  if (route === 'admin' || route === 'admin-dashboard') {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-ink-950">
          <div className="w-8 h-8 rounded-full border-2 border-gold-400/30 border-t-gold-400 animate-spin" />
        </div>
      );
    }

    if (route === 'admin-dashboard' && session) {
      return <AdminDashboard onBack={() => navigate('site')} />;
    }

    if (route === 'admin' && !session) {
      return (
        <AdminLogin
          onBack={() => navigate('site')}
          onSuccess={() => navigate('admin-dashboard')}
        />
      );
    }

    // Brief guard transition
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink-950">
        <div className="w-8 h-8 rounded-full border-2 border-gold-400/30 border-t-gold-400 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Navbar onNavigate={navigate} currentRoute={route} />
      <main>
        <Hero />
        <About />
        <Treatments />
        <Offers />
        <Team />
        <Ambience />
        <Gallery />
        <Testimonials />
      </main>
      <Footer />
      <WhatsAppFab />
      <BookingModal />
    </>
  );
}

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'en';
  const stored = localStorage.getItem('preferred_language');
  if (stored === 'en' || stored === 'ar') return stored;
  return 'en';
}

function App() {
  const [lang, setLang] = useState<Lang>(getInitialLang);
  const [showLangModal, setShowLangModal] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('preferred_language');
    if (!stored) {
      setShowLangModal(true);
    } else if (stored === 'en' || stored === 'ar') {
      setLang(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const handleLangSelect = (selected: Lang) => {
    setLang(selected);
    setShowLangModal(false);
  };

  const i18nValue: I18nContextValue = {
    lang,
    setLang,
    t: translations[lang],
    dir: lang === 'ar' ? 'rtl' : 'ltr',
  };

  return (
    <I18nContext.Provider value={i18nValue}>
      <AuthProvider>
        <BookingProvider>
          {showLangModal && <LanguageModal onSelect={handleLangSelect} />}
          <AppContent />
        </BookingProvider>
      </AuthProvider>
    </I18nContext.Provider>
  );
}

export default App;
