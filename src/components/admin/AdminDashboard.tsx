import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  LogOut, Calendar, Users, ArrowLeft, Sparkles, Phone, Mail, Clock, Loader2, Inbox,
  Search, Download, MessageCircle, LayoutList, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import type { Appointment, Lead, AppointmentStatus, LeadStatus } from '@/lib/types';

const APPOINTMENT_STATUSES: AppointmentStatus[] = ['pending', 'confirmed', 'contacted', 'cancelled'];
const STATUS_FILTERS: Array<'all' | AppointmentStatus> = ['all', 'pending', 'confirmed', 'cancelled', 'contacted'];
const LEAD_STATUSES: LeadStatus[] = ['new', 'contacted', 'converted', 'lost'];

const statusColors: Record<string, string> = {
  pending: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  confirmed: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  contacted: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
  cancelled: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
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
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | AppointmentStatus>('all');
  const [bookingView, setBookingView] = useState<'table' | 'calendar'>('table');

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

  const filteredAppointments = useMemo(() => {
    const q = query.trim().toLowerCase();
    return appointments.filter((apt) => {
      if (statusFilter !== 'all' && apt.status !== statusFilter) return false;
      if (!q) return true;
      const haystack = [apt.name, apt.phone, apt.service, apt.status, apt.email ?? '', apt.preferred_date]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [appointments, query, statusFilter]);

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
              onClick={async () => {
                await signOut();
                window.location.hash = '/admin';
              }}
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
          <div className="space-y-4">
            <BookingToolbar
              isAr={isAr}
              query={query}
              onQuery={setQuery}
              statusFilter={statusFilter}
              onStatus={setStatusFilter}
              view={bookingView}
              onView={setBookingView}
              resultCount={filteredAppointments.length}
              totalCount={appointments.length}
              onExport={() => exportAppointmentsCsv(appointments)}
            />

            {appointments.length === 0 ? (
              <EmptyState label={t.admin.noData} isAr={isAr} />
            ) : filteredAppointments.length === 0 ? (
              <EmptyState
                label={isAr ? 'لا توجد حجوزات مطابقة للبحث.' : 'No bookings match your search.'}
                isAr={isAr}
              />
            ) : bookingView === 'table' ? (
              <BookingTable
                rows={filteredAppointments}
                isAr={isAr}
                updating={updating}
                formatDate={formatDate}
                formatTime={formatTime}
                submittedLabel={t.admin.submitted}
                onStatus={updateAppointmentStatus}
              />
            ) : (
              <BookingCalendar
                rows={filteredAppointments}
                isAr={isAr}
                formatDate={formatDate}
                updating={updating}
                onStatus={updateAppointmentStatus}
              />
            )}
          </div>
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
                  <InfoRow icon={Phone} value={lead.phone} href={`tel:${lead.phone.replace(/[^\d+]/g, '')}`} isAr={isAr} />
                  {lead.email && <InfoRow icon={Mail} value={lead.email} href={`mailto:${lead.email}`} isAr={isAr} />}
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

function BookingToolbar({
  isAr,
  query,
  onQuery,
  statusFilter,
  onStatus,
  view,
  onView,
  resultCount,
  totalCount,
  onExport,
}: {
  isAr: boolean;
  query: string;
  onQuery: (v: string) => void;
  statusFilter: 'all' | AppointmentStatus;
  onStatus: (v: 'all' | AppointmentStatus) => void;
  view: 'table' | 'calendar';
  onView: (v: 'table' | 'calendar') => void;
  resultCount: number;
  totalCount: number;
  onExport: () => void;
}) {
  return (
    <div className="glass rounded-2xl border-gold-400/10 p-4 space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 -translate-y-1/2 left-3 w-4 h-4 text-gold-400/70" />
          <input
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder={isAr ? 'ابحث بالاسم أو الهاتف أو الخدمة أو الحالة' : 'Search by name, phone, service, or status'}
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-ink-900/70 border border-gold-400/15 focus:border-gold-400/50 focus:outline-none text-sm text-ink-100 placeholder:text-ink-500 ${isAr ? 'font-arabic text-right pr-10 pl-4' : ''}`}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-full border border-gold-400/20 bg-ink-900/60 p-0.5" role="group" aria-label="Booking view">
            <button
              type="button"
              onClick={() => onView('table')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                view === 'table' ? 'bg-gold-gradient text-ink-950' : 'text-gold-200/80 hover:text-gold-100'
              } ${isAr ? 'font-arabic' : ''}`}
            >
              <LayoutList className="w-3.5 h-3.5" />
              {isAr ? 'جدول' : 'Table View'}
            </button>
            <button
              type="button"
              onClick={() => onView('calendar')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                view === 'calendar' ? 'bg-gold-gradient text-ink-950' : 'text-gold-200/80 hover:text-gold-100'
              } ${isAr ? 'font-arabic' : ''}`}
            >
              <Calendar className="w-3.5 h-3.5" />
              {isAr ? 'تقويم' : 'Calendar View'}
            </button>
          </div>
          <button
            type="button"
            onClick={onExport}
            disabled={totalCount === 0}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-gold-400/30 text-xs font-medium text-gold-200 hover:bg-gold-400/10 disabled:opacity-40 transition-all ${isAr ? 'font-arabic' : ''}`}
          >
            <Download className="w-3.5 h-3.5" />
            {isAr ? 'تصدير CSV' : 'Export to CSV'}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {STATUS_FILTERS.map((s) => {
          const active = statusFilter === s;
          const label = s === 'all' ? (isAr ? 'الكل' : 'All') : statusLabel(s, isAr);
          return (
            <button
              key={s}
              type="button"
              onClick={() => onStatus(s)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide border transition-all ${
                active
                  ? 'bg-gold-gradient text-ink-950 border-transparent'
                  : 'border-gold-400/20 text-ink-300 hover:text-gold-200 hover:border-gold-400/40'
              } ${isAr ? 'font-arabic tracking-normal' : ''}`}
            >
              {label}
            </button>
          );
        })}
        <span className={`ml-auto text-[11px] text-ink-500 ${isAr ? 'font-arabic mr-auto ml-0' : ''}`}>
          {resultCount}/{totalCount}
        </span>
      </div>
    </div>
  );
}

function BookingTable({
  rows,
  isAr,
  updating,
  formatDate,
  formatTime,
  submittedLabel,
  onStatus,
}: {
  rows: Appointment[];
  isAr: boolean;
  updating: string | null;
  formatDate: (d: string) => string;
  formatTime: (d: string) => string;
  submittedLabel: string;
  onStatus: (id: string, status: AppointmentStatus) => void;
}) {
  return (
    <div className="glass rounded-2xl border-gold-400/10 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-sm">
          <thead>
            <tr className="border-b border-gold-400/15 bg-ink-900/50 text-left">
              {['Name', 'Phone', 'Service', 'Date', 'Time', 'Status', 'WhatsApp'].map((col) => (
                <th
                  key={col}
                  className={`px-4 py-3 text-[11px] uppercase tracking-wider text-gold-300 font-semibold ${isAr ? 'font-arabic tracking-normal text-right' : ''}`}
                >
                  {colLabel(col, isAr)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((apt) => (
              <tr key={apt.id} className="border-b border-gold-400/10 last:border-0 hover:bg-gold-400/[0.04] transition-colors">
                <td className="px-4 py-3 align-top">
                  <div className="font-serif text-gold-100">{apt.name}</div>
                  {apt.email && (
                    <a href={`mailto:${apt.email}`} className="block text-[11px] text-ink-500 mt-0.5 hover:text-gold-300 transition-colors">
                      {apt.email}
                    </a>
                  )}
                  {apt.notes && (
                    <p className={`text-[11px] text-ink-400 mt-1 max-w-[220px] ${isAr ? 'font-arabic' : ''}`}>{apt.notes}</p>
                  )}
                  <div className="text-[10px] text-ink-600 mt-1">
                    {submittedLabel}: {formatTime(apt.created_at)}
                  </div>
                </td>
                <td className="px-4 py-3 align-top text-ink-300" dir="ltr">
                  <a href={`tel:${apt.phone.replace(/[^\d+]/g, '')}`} className="hover:text-gold-300 transition-colors">
                    {apt.phone}
                  </a>
                </td>
                <td className="px-4 py-3 align-top text-ink-200">{apt.service}</td>
                <td className="px-4 py-3 align-top text-ink-200 whitespace-nowrap">{formatDate(apt.preferred_date)}</td>
                <td className="px-4 py-3 align-top text-ink-200">{apt.preferred_time}</td>
                <td className="px-4 py-3 align-top">
                  <div className="flex flex-col items-start gap-2">
                    <StatusBadge status={apt.status} isAr={isAr} />
                    <select
                      value={apt.status}
                      onChange={(e) => onStatus(apt.id, e.target.value as AppointmentStatus)}
                      disabled={updating === apt.id}
                      className={`text-xs px-2.5 py-1.5 rounded-full bg-ink-900/70 border border-gold-400/20 focus:border-gold-400/50 focus:outline-none text-ink-100 ${isAr ? 'font-arabic' : ''}`}
                      aria-label={isAr ? 'تحديث الحالة' : 'Update status'}
                    >
                      {APPOINTMENT_STATUSES.map((s) => (
                        <option key={s} value={s} className="bg-ink-900">
                          {statusLabel(s, isAr)}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
                <td className="px-4 py-3 align-top">
                  <a
                    href={clientWhatsAppUrl(apt)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:brightness-110 transition-all ${isAr ? 'font-arabic' : ''}`}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    WhatsApp
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BookingCalendar({
  rows,
  isAr,
  formatDate,
  updating,
  onStatus,
}: {
  rows: Appointment[];
  isAr: boolean;
  formatDate: (d: string) => string;
  updating: string | null;
  onStatus: (id: string, status: AppointmentStatus) => void;
}) {
  const [cursor, setCursor] = useState(() => startOfMonth(new Date()));
  const [selected, setSelected] = useState<string | null>(null);

  const byDate = useMemo(() => {
    const map = new Map<string, Appointment[]>();
    for (const apt of rows) {
      const key = apt.preferred_date.slice(0, 10);
      const list = map.get(key) ?? [];
      list.push(apt);
      map.set(key, list);
    }
    return map;
  }, [rows]);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<number | null> = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const monthLabel = cursor.toLocaleDateString(isAr ? 'ar-EG' : 'en-GB', { month: 'long', year: 'numeric' });
  const selectedRows = selected ? byDate.get(selected) ?? [] : [];
  const weekdays = isAr
    ? ['أحد', 'إثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)] gap-4">
      <div className="glass rounded-2xl border-gold-400/10 p-4 sm:p-5">
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => setCursor(new Date(year, month - 1, 1))}
            className="w-9 h-9 rounded-full border border-gold-400/20 text-gold-200 hover:bg-gold-400/10 flex items-center justify-center"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h3 className={`font-serif text-xl gold-text ${isAr ? 'font-arabic' : ''}`}>{monthLabel}</h3>
          <button
            type="button"
            onClick={() => setCursor(new Date(year, month + 1, 1))}
            className="w-9 h-9 rounded-full border border-gold-400/20 text-gold-200 hover:bg-gold-400/10 flex items-center justify-center"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1.5 mb-1.5">
          {weekdays.map((d) => (
            <div key={d} className={`text-center text-[10px] uppercase tracking-wider text-gold-400/80 py-1 ${isAr ? 'font-arabic tracking-normal' : ''}`}>
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {cells.map((day, i) => {
            if (!day) return <div key={`empty-${i}`} className="aspect-square" />;
            const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const count = byDate.get(key)?.length ?? 0;
            const active = selected === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelected(key)}
                className={`aspect-square rounded-xl border text-xs sm:text-sm flex flex-col items-center justify-center gap-0.5 transition-all ${
                  active
                    ? 'bg-gold-gradient text-ink-950 border-transparent'
                    : count > 0
                      ? 'border-gold-400/35 text-gold-100 bg-gold-400/10 hover:bg-gold-400/20'
                      : 'border-white/5 text-ink-400 hover:border-gold-400/25'
                }`}
              >
                <span className="font-medium">{day}</span>
                {count > 0 && (
                  <span className={`text-[9px] ${active ? 'text-ink-950/80' : 'text-gold-300'}`}>{count}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="glass rounded-2xl border-gold-400/10 p-4 sm:p-5">
        <h4 className={`font-serif text-lg text-gold-100 mb-3 ${isAr ? 'font-arabic' : ''}`}>
          {selected ? formatDate(selected) : (isAr ? 'اختر يوماً' : 'Select a date')}
        </h4>
        {!selected ? (
          <p className={`text-sm text-ink-400 ${isAr ? 'font-arabic' : ''}`}>
            {isAr ? 'اضغط على يوم لعرض مواعيده.' : 'Choose a day to see its appointments.'}
          </p>
        ) : selectedRows.length === 0 ? (
          <p className={`text-sm text-ink-400 ${isAr ? 'font-arabic' : ''}`}>
            {isAr ? 'لا توجد مواعيد في هذا اليوم.' : 'No appointments on this date.'}
          </p>
        ) : (
          <ul className="space-y-3">
            {selectedRows.map((apt) => (
              <li key={apt.id} className="rounded-xl bg-ink-900/50 border border-gold-400/10 p-3">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="font-serif text-gold-100">{apt.name}</div>
                    <div className="text-xs text-ink-400">{apt.service} · {apt.preferred_time}</div>
                  </div>
                  <StatusBadge status={apt.status} isAr={isAr} />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={clientWhatsAppUrl(apt)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366] text-white text-[11px] font-semibold"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    WhatsApp
                  </a>
                  <select
                    value={apt.status}
                    onChange={(e) => onStatus(apt.id, e.target.value as AppointmentStatus)}
                    disabled={updating === apt.id}
                    className={`text-xs px-2.5 py-1.5 rounded-full bg-ink-900/70 border border-gold-400/20 text-ink-100 ${isAr ? 'font-arabic' : ''}`}
                  >
                    {APPOINTMENT_STATUSES.map((s) => (
                      <option key={s} value={s} className="bg-ink-900">{statusLabel(s, isAr)}</option>
                    ))}
                  </select>
                </div>
              </li>
            ))}
          </ul>
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

function InfoRow({ icon: Icon, value, href }: { icon: React.ComponentType<{ className?: string }>; value: string; href?: string; isAr: boolean }) {
  return (
    <div className="flex items-center gap-2 text-ink-300">
      <Icon className="w-3.5 h-3.5 text-gold-400/60 shrink-0" />
      {href ? (
        <a href={href} className="truncate hover:text-gold-300 transition-colors" dir="ltr">{value}</a>
      ) : (
        <span className="truncate" dir="ltr">{value}</span>
      )}
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

function statusLabel(status: string, isAr: boolean): string {
  if (isAr) return statusLabelAr(status);
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function statusLabelAr(status: string): string {
  const map: Record<string, string> = {
    pending: 'قيد الانتظار',
    confirmed: 'مؤكد',
    contacted: 'تم التواصل',
    cancelled: 'ملغى',
    new: 'جديد',
    converted: 'تم التحويل',
    lost: 'مفقود',
  };
  return map[status] ?? status;
}

function colLabel(col: string, isAr: boolean): string {
  if (!isAr) return col;
  const map: Record<string, string> = {
    Name: 'الاسم',
    Phone: 'الهاتف',
    Service: 'الخدمة',
    Date: 'التاريخ',
    Time: 'الوقت',
    Status: 'الحالة',
    WhatsApp: 'واتساب',
  };
  return map[col] ?? col;
}

function clientWhatsAppUrl(apt: Appointment): string {
  let digits = apt.phone.replace(/\D/g, '');
  if (digits.startsWith('00')) digits = digits.slice(2);
  if (digits.startsWith('0')) digits = `971${digits.slice(1)}`;
  else if (digits.length === 9) digits = `971${digits}`;
  const msg =
    `Hello ${apt.name}, this is La Belleza Aesthetica Clinic. ` +
    `We are confirming your ${apt.service} appointment on ${apt.preferred_date} at ${apt.preferred_time}. ` +
    `Please reply if you need to reschedule. We look forward to welcoming you.`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(msg)}`;
}

function csvCell(value: string): string {
  const safe = /^[=+\-@]/.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
}

function exportAppointmentsCsv(rows: Appointment[]) {
  const headers = ['Name', 'Phone', 'Email', 'Service', 'Date', 'Time', 'Status', 'Notes', 'Submitted'];
  const lines = [
    headers.join(','),
    ...rows.map((a) =>
      [a.name, a.phone, a.email ?? '', a.service, a.preferred_date, a.preferred_time, a.status, a.notes ?? '', a.created_at]
        .map((v) => csvCell(String(v)))
        .join(',')
    ),
  ];
  const blob = new Blob([`\uFEFF${lines.join('\n')}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `la-belleza-bookings-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
