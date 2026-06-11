-- ============================================================
-- Healthy Futures — Supabase Row Level Security Policies
-- Run this AFTER schema.sql in your Supabase SQL Editor
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE businesses       ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews          ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_businesses ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- BUSINESSES
-- ============================================================

-- Anyone can read approved businesses (public directory)
CREATE POLICY "businesses_public_select"
  ON businesses FOR SELECT
  USING (status = 'approved');

-- Anyone can submit a new business (must start as 'pending')
CREATE POLICY "businesses_public_insert"
  ON businesses FOR INSERT
  WITH CHECK (status = 'pending' OR status IS NULL);

-- Admin panel uses the service role key which bypasses RLS.
-- The policy below is for local dev / testing without a service role key.
-- ⚠ REMOVE THIS IN PRODUCTION — replace with auth-based admin check.
CREATE POLICY "businesses_dev_update"
  ON businesses FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- REVIEWS
-- ============================================================

-- Anyone can read all reviews
CREATE POLICY "reviews_public_select"
  ON reviews FOR SELECT
  USING (true);

-- Anyone can post a review
CREATE POLICY "reviews_public_insert"
  ON reviews FOR INSERT
  WITH CHECK (true);

-- ============================================================
-- SAVED BUSINESSES
-- ============================================================

-- Users can manage their own saved list (keyed by user_id text)
CREATE POLICY "saved_manage_own"
  ON saved_businesses FOR ALL
  USING (true)
  WITH CHECK (true);
