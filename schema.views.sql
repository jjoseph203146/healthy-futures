-- Run this in the Supabase SQL editor after schema.sql

CREATE OR REPLACE VIEW business_ratings AS
SELECT
  business_id,
  ROUND(AVG(rating)::numeric, 1) AS avg_rating,
  COUNT(*)::integer AS review_count
FROM reviews
GROUP BY business_id;

-- Grant read access to anon and authenticated roles
GRANT SELECT ON business_ratings TO anon, authenticated;
