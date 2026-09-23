import { useEffect, useState, useCallback } from 'react';
import { LogOut, Calendar, Users, ArrowLeft, Sparkles, Phone, Mail, Clock, Loader2, Inbox } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import type { Appointment, Lead, AppointmentStatus, LeadStatus } from '@/lib/types';

const APPOINTMENT_STATUSES: AppointmentStatus[] = ['pending', 'confirmed', 'contacted'];
const LEAD_STATUSES: LeadStatus[] = ['new', 'contacted', 'converted', 'lost'];

const statusColors: Record<string, string> = {
  pending: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  confirmed: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  contacted: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
  new: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
  converted: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  lost: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
};

interface AdminDashboardProps {
  onBack: () => void;
}

export default function AdminDashboard({ onBack }: AdminDashboardProps) {
  const { t, dir } = useI18n();
  const isAr = dir === 'rtl';
  const { session, signOut } = useAuth();
  const [tab, setTab] = useState<'appointments' | 'leads'>('appointments');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const [aptRes, leadRes] = await Promise.all([
      supabase.from('appointments').select('*').order('created_at', { ascending: false }),
      supabase.from('leads').select('*').order('created_at', { ascending: false }),
    ]);
    if (aptRes.data) setAppointments(aptRes.data);
    if (leadRes.data) setLeads(leadRes.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateAppointmentStatus = async (id: string, status: AppointmentStatus) => {
    if (!supabase) return;
    setUpdating(id);
    const { error } = await supabase.from('appointments').update({ status }).eq('id', id);
    if (!error) {
      setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    }
    setUpdating(null);
  };

  const updateLeadStatus = async (id: string, status: LeadStatus) => {
    if (!supabase) return;
    setUpdating(id);
    const { error } = await supabase.from('leads').update({ status }).eq('id', id);
    if (!error) {
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    }
    setUpdating(null);
  };

  const formatDate = (d: string) => {
    try {
      return new Date(d).toLocaleDateString(isAr ? 'ar-EG' : 'en-GB', {
        year: 'numeric', month: 'short', day: 'numeric',
      });
    } catch {
      return d;
    }
  };

  const formatTime = (d: string) => {
    try {
      return new Date(d).toLocaleString(isAr ? 'ar-EG' : 'en-GB', {
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
      });
    } catch {
      return d;
    }
  };

  const pendingCount = appointments.filter((a) => a.status === 'pending').length;
  const newLeadsCount = leads.filter((l) => l.status === 'new').length;

  return (
    <div className="min-h-screen bg-ink-950">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-ink-950/90 backdrop-blur-xl border-b border-gold-400/10">
        <div className="section-pad py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-ink-950" />
            </div>
            <div>
              <div className="font-serif text-lg gold-text leading-none">La Belleza</div>
              <div className={`text-[10px] tracking-wider uppercase text-ink-400 ${isAr ? 'font-arabic tracking-normal' : ''}`}>
                {t.admin.dashboard}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className={`hidden sm:block text-xs text-ink-400 ${isAr ? 'font-arabic' : ''}`}>
              {t.admin.welcome}, {session?.user?.email}
            </span>
            <button
              onClick={onBack}
              className={`flex items-center gap-1.5 text-xs text-ink-400 hover:text-gold-300 transition-colors ${isAr ? 'font-arabic flex-row-reverse' : ''}`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {t.admin.back}
            </button>
            <button
              onClick={signOut}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full border border-gold-400/20 hover:bg-gold-400/10 text-xs text-gold-200 transition-all ${isAr ? 'font-arabic flex-row-reverse' : ''}`}
            >
              <LogOut className="w-3.5 h-3.5" />
              {t.admin.signOut}
            </button>
          </div>
        </div>
      </header>

      <div className="section-pad py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setTab('appointments')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              tab === 'appointments'
                ? 'bg-gold-gradient text-ink-950'
                : 'glass text-ink-300 hover:text-gold-200'
            } ${isAr ? 'font-arabic' : ''}`}
          >
            <Calendar className="w-4 h-4" />
            {t.admin.appointments}
            {pendingCount > 0 && (
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${tab === 'appointments' ? 'bg-ink-950/20' : 'bg-gold-400/20 text-gold-300'}`}>
                {pendingCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setTab('leads')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              tab === 'leads'
                ? 'bg-gold-gradient text-ink-950'
                : 'glass text-ink-300 hover:text-gold-200'
            } ${isAr ? 'font-arabic' : ''}`}
          >
            <Users className="w-4 h-4" />
            {t.admin.leads}
            {newLeadsCount > 0 && (
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${tab === 'leads' ? 'bg-ink-950/20' : 'bg-gold-400/20 text-gold-300'}`}>
                {newLeadsCount}
              </span>
            )}
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 text-gold-400 animate-spin" />
          </div>
        ) : tab === 'appointments' ? (
          appointments.length === 0 ? (
            <EmptyState label={t.admin.noData} isAr={isAr} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {appointments.map((apt) => (
                <div key={apt.id} className="glass rounded-2xl p-5 border-gold-400/10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-serif text-lg text-gold-100">{apt.name}</h3>
                      <p className="text-xs text-ink-400 mt-0.5">{apt.service}</p>
                    </div>
                    <StatusBadge status={apt.status} isAr={isAr} />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                    <InfoRow icon={Phone} value={apt.phone} isAr={isAr} />
                    {apt.email && <InfoRow icon={Mail} value={apt.email} isAr={isAr} />}
                    <InfoRow icon={Calendar} value={formatDate(apt.preferred_date)} isAr={isAr} />
                    <InfoRow icon={Clock} value={apt.preferred_time} isAr={isAr} />
                  </div>

                  {apt.notes && (
                    <p className={`text-xs text-ink-400 bg-ink-900/40 rounded-lg p-3 mb-4 ${isAr ? 'font-arabic' : ''}`}>
                      {apt.notes}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-gold-400/10">
                    <span className="text-[10px] text-ink-500">
                      {t.admin.submitted}: {formatTime(apt.created_at)}
                    </span>
                    <select
                      value={apt.status}
                      onChange={(e) => updateAppointmentStatus(apt.id, e.target.value as AppointmentStatus)}
                      disabled={updating === apt.id}
                      className={`text-xs px-3 py-1.5 rounded-full bg-ink-900/60 border border-gold-400/20 focus:border-gold-400/50 focus:outline-none text-ink-100 transition-colors ${isAr ? 'font-arabic' : ''}`}
                    >
                      {APPOINTMENT_STATUSES.map((s) => (
                        <option key={s} value={s} className="bg-ink-900">
                          {isAr ? statusLabelAr(s) : s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : leads.length === 0 ? (
          <EmptyState label={t.admin.noData} isAr={isAr} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {leads.map((lead) => (
              <div key={lead.id} className="glass rounded-2xl p-5 border-gold-400/10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-serif text-lg text-gold-100">{lead.name}</h3>
                    <p className="text-xs text-ink-400 mt-0.5">{lead.service}</p>
                  </div>
                  <StatusBadge status={lead.status} isAr={isAr} />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                  <InfoRow icon={Phone} value={lead.phone} isAr={isAr} />
                  {lead.email && <InfoRow icon={Mail} value={lead.email} isAr={isAr} />}
                </div>

                {lead.message && (
                  <p className={`text-xs text-ink-400 bg-ink-900/40 rounded-lg p-3 mb-4 ${isAr ? 'font-arabic' : ''}`}>
                    {lead.message}
                  </p>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-gold-400/10">
                  <span className="text-[10px] text-ink-500">
                    {t.admin.submitted}: {formatTime(lead.created_at)}
                  </span>
                  <select
                    value={lead.status}
                    onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                    disabled={updating === lead.id}
                    className={`text-xs px-3 py-1.5 rounded-full bg-ink-900/60 border border-gold-400/20 focus:border-gold-400/50 focus:outline-none text-ink-100 transition-colors ${isAr ? 'font-arabic' : ''}`}
                  >
                    {LEAD_STATUSES.map((s) => (
                      <option key={s} value={s} className="bg-ink-900">
                        {isAr ? statusLabelAr(s) : s.charAt(0).toUpperCase() + s.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status, isAr }: { status: string; isAr: boolean }) {
  const colorClass = statusColors[status] ?? 'bg-ink-500/15 text-ink-300 border-ink-500/30';
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${colorClass} ${isAr ? 'font-arabic tracking-normal' : ''}`}>
      {isAr ? statusLabelAr(status) : status}
    </span>
  );
}

function InfoRow({ icon: Icon, value, isAr }: { icon: React.ComponentType<{ className?: string }>; value: string; isAr: boolean }) {
  return (
    <div className="flex items-center gap-2 text-ink-300">
      <Icon className="w-3.5 h-3.5 text-gold-400/60 shrink-0" />
      <span className="truncate" dir="ltr">{value}</span>
    </div>
  );
}

function EmptyState({ label, isAr }: { label: string; isAr: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-ink-500">
      <Inbox className="w-12 h-12 mb-3 opacity-40" />
      <p className={`text-sm ${isAr ? 'font-arabic' : ''}`}>{label}</p>
    </div>
  );
}

function statusLabelAr(status: string): string {
  const map: Record<string, string> = {
    pending: 'قيد الانتظار',
    confirmed: 'مؤكد',
    contacted: 'تم التواصل',
    new: 'جديد',
    converted: 'تم التحويل',
    lost: 'مفقود',
  };
  return map[status] ?? status;
}
