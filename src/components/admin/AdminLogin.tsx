import { useState } from 'react';
import { Lock, Mail, ArrowLeft, Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';

interface AdminLoginProps {
  onBack: () => void;
}

export default function AdminLogin({ onBack }: AdminLoginProps) {
  const { t, dir } = useI18n();
  const isAr = dir === 'rtl';
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) setError(t.admin.loginError);
  };

  return (
    <div className="min-h-screen flex items-center justify-center section-pad relative overflow-hidden">
      <div className="absolute inset-0 bg-dark-radial" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gold-400/5 blur-[120px]" />

      <div className="relative w-full max-w-md">
        {/* Back */}
        <button
          onClick={onBack}
          className={`flex items-center gap-1.5 text-sm text-ink-400 hover:text-gold-300 transition-colors mb-8 ${isAr ? 'font-arabic flex-row-reverse' : ''}`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t.admin.back}
        </button>

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 rounded-full bg-gold-gradient items-center justify-center mb-4 shadow-lg shadow-gold-400/20">
            <Sparkles className="w-7 h-7 text-ink-950" />
          </div>
          <h1 className={`font-serif text-3xl gold-text mb-1 ${isAr ? 'font-arabic' : ''}`}>
            {t.admin.loginTitle}
          </h1>
          <p className={`text-sm text-ink-400 ${isAr ? 'font-arabic' : ''}`}>
            {t.admin.loginSubtitle}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="glass rounded-2xl p-7 border-gold-400/15 space-y-5">
          <div>
            <label className={`block text-xs text-gold-200 mb-1.5 ${isAr ? 'font-arabic' : ''}`}>
              {t.admin.email}
            </label>
            <div className="relative">
              <Mail className="absolute top-1/2 -translate-y-1/2 left-3 w-4 h-4 text-ink-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-ink-900/60 border border-gold-400/15 focus:border-gold-400/50 focus:outline-none text-ink-100 text-sm transition-colors ${isAr ? 'font-arabic text-right pr-10 pl-4' : ''}`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs text-gold-200 mb-1.5 ${isAr ? 'font-arabic' : ''}`}>
              {t.admin.password}
            </label>
            <div className="relative">
              <Lock className="absolute top-1/2 -translate-y-1/2 left-3 w-4 h-4 text-ink-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-ink-900/60 border border-gold-400/15 focus:border-gold-400/50 focus:outline-none text-ink-100 text-sm transition-colors ${isAr ? 'font-arabic text-right pr-10 pl-4' : ''}`}
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className={isAr ? 'font-arabic' : ''}>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`btn-gold w-full disabled:opacity-60 ${isAr ? 'font-arabic' : ''}`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t.admin.signingIn}
              </>
            ) : (
              t.admin.signIn
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
