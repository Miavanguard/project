/*
# Create before_after storage bucket

1. New Storage
- `before_after` bucket (public read) for clinic before/after imagery.
- Allows clinic staff to upload/replace before/after photos via the Supabase dashboard
  without redeploying the app.

2. Security
- Public read (anon + authenticated can SELECT objects).
- Only authenticated users can INSERT/UPDATE/DELETE objects (clinic admin).
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('before_after', 'before_after', true)
ON CONFLICT (id) DO NOTHING;

-- Public read access
DROP POLICY IF EXISTS "public_read_before_after" ON storage.objects;
CREATE POLICY "public_read_before_after"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'before_after');

-- Authenticated can upload/manage
DROP POLICY IF EXISTS "auth_insert_before_after" ON storage.objects;
CREATE POLICY "auth_insert_before_after"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'before_after');

DROP POLICY IF EXISTS "auth_update_before_after" ON storage.objects;
CREATE POLICY "auth_update_before_after"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'before_after')
  WITH CHECK (bucket_id = 'before_after');

DROP POLICY IF EXISTS "auth_delete_before_after" ON storage.objects;
CREATE POLICY "auth_delete_before_after"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'before_after');
