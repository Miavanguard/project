/*
# Create appointments and leads tables for La Belleza Aesthetica Clinic

1. New Tables
- `appointments` — booking requests submitted from the public booking modal.
  - id (uuid, PK)
  - name (text, client full name)
  - email (text, client email)
  - phone (text, client phone)
  - service (text, selected procedure)
  - preferred_date (date, chosen day)
  - preferred_time (text, chosen time slot, e.g. "10:00")
  - notes (text, optional message)
  - status (text, appointment status: pending | confirmed | contacted)
  - created_at (timestamptz)
- `leads` — general inquiries / offer claims that are not tied to a specific slot.
  - id (uuid, PK)
  - name (text, lead full name)
  - email (text, lead email)
  - phone (text, lead phone)
  - service (text, service of interest)
  - message (text, optional message)
  - status (text, lead status: new | contacted | converted | lost)
  - created_at (timestamptz)

2. Security
- Enable RLS on both tables.
- `anon` role can INSERT ONLY (public booking modal writes without sign-in).
- `authenticated` role can SELECT and UPDATE (admin dashboard reads and updates statuses).
- No anon SELECT/UPDATE/DELETE — leads and appointments must never be readable by the public frontend.

3. Important Notes
- The public site uses the anon key, so it can only insert new rows.
- The /admin route signs in with Supabase Auth to gain the `authenticated` role, which unlocks SELECT + UPDATE.
- Status columns default to 'pending' / 'new' so new submissions appear correctly in the dashboard.
*/

CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text NOT NULL,
  service text NOT NULL,
  preferred_date date NOT NULL,
  preferred_time text NOT NULL,
  notes text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- anon can INSERT only (public booking form)
DROP POLICY IF EXISTS "anon_insert_appointments" ON appointments;
CREATE POLICY "anon_insert_appointments"
  ON appointments FOR INSERT
  TO anon WITH CHECK (true);

-- authenticated (admin) can SELECT and UPDATE
DROP POLICY IF EXISTS "auth_select_appointments" ON appointments;
CREATE POLICY "auth_select_appointments"
  ON appointments FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_appointments" ON appointments;
CREATE POLICY "auth_update_appointments"
  ON appointments FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

-- Allow authenticated admin to read booked slots for the public date check is NOT needed:
-- the public frontend queries appointments to grey out taken slots. We add an anon SELECT
-- policy restricted to date+time only via a security definer-free approach: we expose
-- a narrow SELECT policy that returns only preferred_date and preferred_time columns.
-- However, Supabase RLS policies apply at row level, not column level. To avoid leaking
-- PII (names/emails/phones) to the public, we create a dedicated view exposing only
-- date+time and grant anon SELECT on that view instead.

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text NOT NULL,
  service text NOT NULL,
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- anon can INSERT only
DROP POLICY IF EXISTS "anon_insert_leads" ON leads;
CREATE POLICY "anon_insert_leads"
  ON leads FOR INSERT
  TO anon WITH CHECK (true);

-- authenticated (admin) can SELECT and UPDATE
DROP POLICY IF EXISTS "auth_select_leads" ON leads;
CREATE POLICY "auth_select_leads"
  ON leads FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_leads" ON leads;
CREATE POLICY "auth_update_leads"
  ON leads FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

-- Public view exposing only booked date+time (no PII) so the booking modal
-- can grey out taken slots without letting the public read client details.
CREATE OR REPLACE VIEW public.booked_slots AS
  SELECT preferred_date, preferred_time FROM appointments;

GRANT SELECT ON public.booked_slots TO anon, authenticated;
