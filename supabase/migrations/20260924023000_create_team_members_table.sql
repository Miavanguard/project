/*
# Create team_members table for La Belleza Aesthetica Clinic

1. New Table
- `team_members` — clinic doctors / specialists shown on the public Team section.
  - id (text, PK) — stable slug e.g. "clara", "diyar"
  - name_en / name_ar (text)
  - role_en / role_ar (text)
  - initials (text)
  - image_url (text, nullable) — public path or CDN URL
  - sort_order (int)
  - is_active (boolean)
  - created_at (timestamptz)

2. Security
- Enable RLS.
- `anon` + `authenticated` can SELECT active rows (public roster).
- Only `authenticated` can INSERT / UPDATE / DELETE (admin).

3. Seed
- Seeds Dr. Clara Elbadry and Dr. Diyar Malik with local public asset paths.
*/

CREATE TABLE IF NOT EXISTS team_members (
  id text PRIMARY KEY,
  name_en text NOT NULL,
  name_ar text NOT NULL,
  role_en text NOT NULL,
  role_ar text NOT NULL,
  initials text NOT NULL,
  image_url text,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_team_members" ON team_members;
CREATE POLICY "public_select_team_members"
  ON team_members FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

DROP POLICY IF EXISTS "auth_insert_team_members" ON team_members;
CREATE POLICY "auth_insert_team_members"
  ON team_members FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_team_members" ON team_members;
CREATE POLICY "auth_update_team_members"
  ON team_members FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_team_members" ON team_members;
CREATE POLICY "auth_delete_team_members"
  ON team_members FOR DELETE
  TO authenticated
  USING (true);

INSERT INTO team_members (id, name_en, name_ar, role_en, role_ar, initials, image_url, sort_order, is_active)
VALUES
  (
    'clara',
    'Dr. Clara Elbadry',
    'د. كلارا البدري',
    'Dermatology & Aesthetics',
    'طب الجلدية والتجميل',
    'CE',
    '/team/dr-clara.jpg',
    1,
    true
  ),
  (
    'diyar',
    'Dr. Diyar Malik',
    'د. ديار مالك',
    'Aesthetic & General Dentistry',
    'طب الأسنان التجميلي والعام',
    'DM',
    '/team/dr-diyar.jpg',
    2,
    true
  ),
  (
    'sarah',
    'Dr. Sarah Al Ani',
    'د. سارة العاني',
    'Cosmetic Dentist',
    'طبيبة أسنان تجميلية',
    'SA',
    '/team/sarah.jpg',
    3,
    true
  ),
  (
    'nahla',
    'Dr. Nahla Sany',
    'د. نهلة ساني',
    'Cosmetic Dentist',
    'طبيبة أسنان تجميلية',
    'NS',
    '/team/nahla.jpg',
    4,
    true
  ),
  (
    'saba',
    'Saba Alhayali',
    'صبا الحيالي',
    'Facial Specialist & Beauty Therapist',
    'أخصائية وجه ومعالجة تجميل',
    'SH',
    '/team/saba.jpg',
    5,
    true
  )
ON CONFLICT (id) DO UPDATE SET
  name_en = EXCLUDED.name_en,
  name_ar = EXCLUDED.name_ar,
  role_en = EXCLUDED.role_en,
  role_ar = EXCLUDED.role_ar,
  initials = EXCLUDED.initials,
  image_url = EXCLUDED.image_url,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active;
