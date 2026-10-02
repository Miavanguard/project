import { useEffect, useState, useRef } from 'react';
import { X, Calendar, Clock, Check, MessageCircle, Loader2, AlertCircle } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { useBooking } from '@/lib/booking';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { SERVICES, TIME_SLOTS, getWhatsAppUrl } from '@/lib/constants';
import BnplBadges from '@/components/BnplBadges';

interface BookedSlotsMap {
  [date: string]: string[];
}

const mockBooked: BookedSlotsMap = {
  [new Date().toISOString().slice(0, 10)]: ['10:00', '14:00'],
};

export default function BookingModal() {
  const { t, dir, lang } = useI18n();
  const isAr = dir === 'rtl';
  const { isOpen, closeModal, preselectedService } = useBooking();

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<BookedSlotsMap>({});
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const honeypotRef = useRef<HTMLInputElement>(null);

  const todayStr = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    if (preselectedService) setService(preselectedService);
  }, [preselectedService]);

  // Fetch booked slots when date changes
  useEffect(() => {
    if (!date) return;
    let cancelled = false;

    const fetchSlots = async () => {
      if (!isSupabaseConfigured || !supabase) {
        setBookedSlots((prev) => ({ ...prev, [date]: mockBooked[date] ?? [] }));
        return;
      }
      setLoadingSlots(true);
      const { data, error } = await supabase
        .from('appointments')
        .select('preferred_date, preferred_time')
        .eq('preferred_date', date)
        .neq('status', 'cancelled');
      if (!cancelled) {
        if (error) {
          setBookedSlots((prev) => ({ ...prev, [date]: [] }));
        } else {
          const times = (data ?? []).map((row: { preferred_time: string }) => row.preferred_time);
          setBookedSlots((prev) => ({ ...prev, [date]: times }));
        }
        setLoadingSlots(false);
      }
    };
    fetchSlots();
    return () => { cancelled = true; };
  }, [date]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Reset after close animation
      const timer = setTimeout(() => {
        setStep('form');
        setError(null);
        setName(''); setEmail(''); setPhone(''); setService('');
        setDate(''); setTime(''); setNotes('');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const takenSlots = bookedSlots[date] ?? [];
  const availableCount = TIME_SLOTS.filter((s) => !takenSlots.includes(s)).length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Honeypot check
    if (honeypotRef.current?.value) {
      return; // bot filled the hidden field — silently ignore
    }

    if (!name || !phone || !service || !date || !time) return;

    setSubmitting(true);

    if (!isSupabaseConfigured || !supabase) {
      // Mock mode — simulate success
      await new Promise((r) => setTimeout(r, 800));
      setSubmitting(false);
      setStep('success');
      return;
    }

    const { error: insertError } = await supabase.from('appointments').insert({
      full_name: name,
      email: email || null,
      phone,
      service,
      preferred_date: date,
      preferred_time: time,
      notes: notes || null,
      status: 'pending',
    });

    if (insertError) {
      setSubmitting(false);
      setError(t.booking.error);
      return;
    }

    // Also insert into leads table
    await supabase.from('leads').insert({
      name,
      email: email || null,
      phone,
      service,
      message: `Appointment request for ${date} at ${time}. ${notes || ''}`.trim(),
      status: 'new',
    });

    setSubmitting(false);
    setStep('success');
  };

  const whatsappLink = () => {
    const msg = lang === 'ar'
      ? `مرحباً، لقد حجزت استشارة:\nالخدمة: ${service}\nالتاريخ: ${date}\nالوقت: ${time}\nالاسم: ${name}`
      : `Hello! I just booked a consultation:\nService: ${service}\nDate: ${date}\nTime: ${time}\nName: ${name}`;
    return getWhatsAppUrl(msg);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      onClick={closeModal}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto no-scrollbar rounded-3xl glass border-gold-400/20 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full glass flex items-center justify-center text-ink-300 hover:text-gold-300 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div className="p-7 lg:p-9">
            {/* Header */}
            <div className="mb-7">
              <h3 className={`font-serif text-2xl lg:text-3xl gold-text mb-2 ${isAr ? 'font-arabic' : ''}`}>
                {t.booking.title}
              </h3>
              <p className={`text-sm text-ink-300 ${isAr ? 'font-arabic' : ''}`}>
                {t.booking.subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot — hidden from humans */}
              <input
                ref={honeypotRef}
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                className="absolute opacity-0 pointer-events-none -z-10 w-0 h-0"
                aria-hidden="true"
              />

              {/* Name */}
              <div>
                <label className={`block text-xs text-gold-200 mb-1.5 ${isAr ? 'font-arabic' : ''}`}>
                  {t.booking.name} *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={`w-full px-4 py-3 rounded-xl bg-ink-900/60 border border-gold-400/15 focus:border-gold-400/50 focus:outline-none text-ink-100 text-sm transition-colors ${isAr ? 'font-arabic text-right' : ''}`}
                />
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs text-gold-200 mb-1.5 ${isAr ? 'font-arabic' : ''}`}>
                    {t.booking.email}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl bg-ink-900/60 border border-gold-400/15 focus:border-gold-400/50 focus:outline-none text-ink-100 text-sm transition-colors ${isAr ? 'font-arabic text-right' : ''}`}
                  />
                </div>
                <div>
                  <label className={`block text-xs text-gold-200 mb-1.5 ${isAr ? 'font-arabic' : ''}`}>
                    {t.booking.phone} *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className={`w-full px-4 py-3 rounded-xl bg-ink-900/60 border border-gold-400/15 focus:border-gold-400/50 focus:outline-none text-ink-100 text-sm transition-colors ${isAr ? 'font-arabic text-right' : ''}`}
                  />
                </div>
              </div>

              {/* Service */}
              <div>
                <label className={`block text-xs text-gold-200 mb-1.5 ${isAr ? 'font-arabic' : ''}`}>
                  {t.booking.service} *
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  required
                  className={`w-full px-4 py-3 rounded-xl bg-ink-900/60 border border-gold-400/15 focus:border-gold-400/50 focus:outline-none text-ink-100 text-sm transition-colors ${isAr ? 'font-arabic' : ''} ${!service ? 'text-ink-400' : ''}`}
                >
                  <option value="" className="bg-ink-900">{t.booking.selectService}</option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s} className="bg-ink-900">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date + Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs text-gold-200 mb-1.5 ${isAr ? 'font-arabic' : ''}`}>
                    {t.booking.date} *
                  </label>
                  <input
                    type="date"
                    value={date}
                    min={todayStr}
                    onChange={(e) => { setDate(e.target.value); setTime(''); }}
                    required
                    className={`w-full px-4 py-3 rounded-xl bg-ink-900/60 border border-gold-400/15 focus:border-gold-400/50 focus:outline-none text-ink-100 text-sm transition-colors [color-scheme:dark] ${isAr ? 'font-arabic' : ''}`}
                  />
                </div>
                <div>
                  <label className={`block text-xs text-gold-200 mb-1.5 ${isAr ? 'font-arabic' : ''}`}>
                    {t.booking.time} *
                  </label>
                  {loadingSlots ? (
                    <div className="px-4 py-3 rounded-xl bg-ink-900/60 border border-gold-400/15 flex items-center gap-2 text-ink-400 text-sm">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  ) : (
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                      disabled={!date}
                      className={`w-full px-4 py-3 rounded-xl bg-ink-900/60 border border-gold-400/15 focus:border-gold-400/50 focus:outline-none text-ink-100 text-sm transition-colors disabled:opacity-40 ${isAr ? 'font-arabic' : ''} ${!time ? 'text-ink-400' : ''}`}
                    >
                      <option value="" className="bg-ink-900">
                        {date ? (availableCount === 0 ? t.booking.noSlots : t.booking.time) : t.booking.chooseDate}
                      </option>
                      {TIME_SLOTS.map((slot) => {
                        const taken = takenSlots.includes(slot);
                        return (
                          <option
                            key={slot}
                            value={slot}
                            disabled={taken}
                            className={`bg-ink-900 ${taken ? 'text-ink-500 line-through' : ''}`}
                          >
                            {slot}{taken ? ' — ' + (isAr ? 'محجوز' : 'Booked') : ''}
                          </option>
                        );
                      })}
                    </select>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className={`block text-xs text-gold-200 mb-1.5 ${isAr ? 'font-arabic' : ''}`}>
                  {t.booking.notes}
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder={t.booking.notesPlaceholder}
                  className={`w-full px-4 py-3 rounded-xl bg-ink-900/60 border border-gold-400/15 focus:border-gold-400/50 focus:outline-none text-ink-100 text-sm transition-colors resize-none ${isAr ? 'font-arabic text-right' : ''}`}
                />
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span className={isAr ? 'font-arabic' : ''}>{error}</span>
                </div>
              )}

              {/* BNPL */}
              <BnplBadges isAr={isAr} className="justify-center" />

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className={`btn-gold w-full disabled:opacity-60 disabled:cursor-not-allowed ${isAr ? 'font-arabic' : ''}`}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t.booking.submitting}
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    {t.booking.submit}
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Success screen */
          <div className="p-7 lg:p-9 text-center">
            <div className="w-16 h-16 rounded-full bg-gold-gradient flex items-center justify-center mx-auto mb-6 animate-pulse-gold">
              <Check className="w-8 h-8 text-ink-950" />
            </div>
            <h3 className={`font-serif text-2xl lg:text-3xl gold-text mb-3 ${isAr ? 'font-arabic' : ''}`}>
              {t.booking.success}
            </h3>
            <p className={`text-sm text-ink-300 mb-8 leading-relaxed max-w-sm mx-auto ${isAr ? 'font-arabic' : ''}`}>
              {t.booking.successMsg}
            </p>

            {/* WhatsApp button */}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full px-7 py-3.5 rounded-full bg-[#25D366] text-white font-semibold text-sm transition-all hover:scale-[1.02] active:scale-95 mb-3"
            >
              <MessageCircle className="w-4 h-4" />
              {t.booking.whatsapp}
            </a>

            <div className="flex gap-3">
              <button
                onClick={() => setStep('form')}
                className={`flex-1 btn-outline text-xs ${isAr ? 'font-arabic' : ''}`}
              >
                {t.booking.another}
              </button>
              <button
                onClick={closeModal}
                className={`flex-1 text-xs text-ink-400 hover:text-gold-300 transition-colors py-3 ${isAr ? 'font-arabic' : ''}`}
              >
                {t.booking.close}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
