export type AppointmentStatus = 'pending' | 'confirmed' | 'contacted' | 'cancelled';
export type LeadStatus = 'new' | 'contacted' | 'converted' | 'lost';

export interface Appointment {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  service: string;
  preferred_date: string;
  preferred_time: string;
  notes: string | null;
  status: AppointmentStatus;
  created_at: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  service: string;
  message: string | null;
  status: LeadStatus;
  created_at: string;
}

export interface BookedSlot {
  preferred_date: string;
  preferred_time: string;
}

/** Mirrors `public.team_members` */
export interface TeamMemberRow {
  id: string;
  name_en: string;
  name_ar: string;
  role_en: string;
  role_ar: string;
  initials: string;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}
