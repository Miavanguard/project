import { useState, useEffect } from 'react';
import { I18nContext, translations, type Lang, type I18nContextValue } from '@/lib/i18n';
import { AuthProvider, useAuth } from '@/lib/auth';
import { BookingProvider } from '@/lib/booking';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Treatments from '@/components/Treatments';
import Offers from '@/components/Offers';
import Team from '@/components/Team';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import WhatsAppFab from '@/components/WhatsAppFab';
import BookingModal from '@/components/BookingModal';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';

type Route = 'site' | 'admin';

function AppContent() {
  const { session, loading } = useAuth();
  const [route, setRoute] = useState<Route>('site');

  // Sync route with hash
  useEffect(() => {
    const checkHash = () => {
      setRoute(window.location.hash === '#/admin' || window.location.pathname === '/admin' ? 'admin' : 'site');
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const navigate = (r: Route) => {
    if (r === 'admin') {
      window.location.hash = '/admin';
    } else {
      window.location.hash = '';
      window.scrollTo({ top: 0 });
    }
    setRoute(r);
  };

  if (route === 'admin') {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-ink-950">
          <div className="w-8 h-8 rounded-full border-2 border-gold-400/30 border-t-gold-400 animate-spin" />
        </div>
      );
    }
    return session ? (
      <AdminDashboard onBack={() => navigate('site')} />
    ) : (
      <AdminLogin onBack={() => navigate('site')} />
    );
  }

  return (
    <>
      <Navbar onNavigate={navigate} currentRoute={route} />
      <main>
        <Hero />
        <Treatments />
        <Offers />
        <Team />
        <Testimonials />
      </main>
      <Footer />
      <WhatsAppFab />
      <BookingModal />
    </>
  );
}

function App() {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

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
          <AppContent />
        </BookingProvider>
      </AuthProvider>
    </I18nContext.Provider>
  );
}

export default App;
