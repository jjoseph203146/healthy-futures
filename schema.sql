-- ============================================================
-- Healthy Futures — Supabase Schema
-- Run this in your Supabase project's SQL editor
-- ============================================================

-- Enable UUID extension (already available in Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLES
-- ============================================================

CREATE TABLE businesses (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  owner_name    TEXT,
  category      TEXT NOT NULL,
  description   TEXT,
  address       TEXT,
  city          TEXT DEFAULT 'Augusta',
  state         TEXT DEFAULT 'GA',
  phone         TEXT,
  website       TEXT,
  hours         JSONB,
  latitude      DECIMAL(10, 8),
  longitude     DECIMAL(11, 8),
  image_url     TEXT,
  is_black_owned  BOOLEAN DEFAULT TRUE,
  is_verified     BOOLEAN DEFAULT FALSE,
  status          TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  is_featured     BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE reviews (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id   UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  user_name     TEXT NOT NULL,
  rating        INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  content       TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE saved_businesses (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       TEXT NOT NULL,
  business_id   UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, business_id)
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_businesses_category    ON businesses(category);
CREATE INDEX idx_businesses_status      ON businesses(status);
CREATE INDEX idx_businesses_is_featured ON businesses(is_featured);
CREATE INDEX idx_businesses_city_state  ON businesses(city, state);
CREATE INDEX idx_reviews_business_id    ON reviews(business_id);
CREATE INDEX idx_saved_user_id          ON saved_businesses(user_id);
CREATE INDEX idx_saved_business_id      ON saved_businesses(business_id);

-- ============================================================
-- ROW LEVEL SECURITY (enable after testing)
-- ============================================================

-- ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE saved_businesses ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- SEED DATA — 5 Augusta, GA Black-owned businesses
-- ============================================================

INSERT INTO businesses (
  name, owner_name, category, description, address, city, state,
  phone, website, hours, latitude, longitude, image_url,
  is_black_owned, is_verified, status, is_featured
) VALUES
(
  'Mama''s Southern Kitchen',
  'Dorothy Mae Williams',
  'Food & Dining',
  'Family-owned since 1998, Mama''s serves authentic Southern soul food made from recipes passed down three generations. Fried catfish, smothered pork chops, collard greens, and sweet potato pie made fresh daily.',
  '1142 Broad St', 'Augusta', 'GA',
  '(706) 555-0101', 'https://mamassouthernkitchen.com',
  '{"Mon":"11am–9pm","Tue":"11am–9pm","Wed":"11am–9pm","Thu":"11am–9pm","Fri":"11am–10pm","Sat":"10am–10pm","Sun":"12pm–8pm"}',
  33.4735, -81.9748,
  'https://picsum.photos/seed/mamas-kitchen/800/400',
  TRUE, TRUE, 'approved', TRUE
),
(
  'Crown Beauty Studio',
  'Nakia Simone Foster',
  'Beauty',
  'Luxury natural-hair care, protective styles and skincare for every crown. Specializing in locs, braids, and silk presses. Walk-ins welcome on select days.',
  '2309 Wrightsboro Rd', 'Augusta', 'GA',
  '(706) 555-0202', 'https://crownbeautystudio.com',
  '{"Tue":"9am–7pm","Wed":"9am–7pm","Thu":"9am–7pm","Fri":"9am–8pm","Sat":"8am–6pm"}',
  33.4891, -82.0012,
  'https://picsum.photos/seed/crown-beauty/800/400',
  TRUE, TRUE, 'approved', TRUE
),
(
  'Augusta Wellness Collective',
  'Dr. Marcus T. Holloway',
  'Health & Wellness',
  'Holistic care, massage therapy, and community fitness classes. Offering yoga, meditation, nutrition counseling, and therapeutic bodywork in a welcoming community space.',
  '428 Greene St', 'Augusta', 'GA',
  '(706) 555-0303', 'https://augustawellness.com',
  '{"Mon":"7am–8pm","Tue":"7am–8pm","Wed":"7am–8pm","Thu":"7am–8pm","Fri":"7am–7pm","Sat":"9am–4pm"}',
  33.4720, -81.9655,
  'https://picsum.photos/seed/wellness-col/800/400',
  TRUE, TRUE, 'approved', FALSE
),
(
  'Forrest & Co. Barbershop',
  'James Forrest III',
  'Beauty',
  'Classic cuts, hot-towel shaves, and crisp lineups in a neighborhood landmark since 1985. Traditional barbershop experience with modern precision.',
  '816 Laney Walker Blvd', 'Augusta', 'GA',
  '(706) 555-0404', 'https://forrestandco.com',
  '{"Tue":"8am–7pm","Wed":"8am–7pm","Thu":"8am–7pm","Fri":"8am–8pm","Sat":"7am–6pm"}',
  33.4659, -81.9723,
  'https://picsum.photos/seed/forrest-barber/800/400',
  TRUE, TRUE, 'approved', FALSE
),
(
  'Peach & Pecan Bakery',
  'Celeste Renée Armour',
  'Food & Dining',
  'Small-batch peach hand pies, Georgia pecan pralines, and custom celebration cakes baked fresh daily. Wholesale orders welcome for events and corporate clients.',
  '305 8th St', 'Augusta', 'GA',
  '(706) 555-0505', 'https://peachandpecan.com',
  '{"Wed":"7am–4pm","Thu":"7am–4pm","Fri":"7am–5pm","Sat":"8am–3pm"}',
  33.4774, -81.9681,
  'https://picsum.photos/seed/peach-bakery/800/400',
  TRUE, TRUE, 'approved', TRUE
);

-- ============================================================
-- SEED REVIEWS
-- ============================================================

INSERT INTO reviews (business_id, user_name, rating, content)
SELECT id, 'Tasha R.', 5,
  'Best soul food in Augusta, hands down. The catfish melts in your mouth and the staff treats you like family.'
FROM businesses WHERE name = 'Mama''s Southern Kitchen';

INSERT INTO reviews (business_id, user_name, rating, content)
SELECT id, 'Marcus J.', 5,
  'Proud to support a Black-owned staple of our community. Generous portions and the cobbler is unreal.'
FROM businesses WHERE name = 'Mama''s Southern Kitchen';

INSERT INTO reviews (business_id, user_name, rating, content)
SELECT id, 'Keisha B.', 5,
  'Nakia is a miracle worker. My locs have never looked better. The whole vibe is welcoming and professional.'
FROM businesses WHERE name = 'Crown Beauty Studio';

INSERT INTO reviews (business_id, user_name, rating, content)
SELECT id, 'David L.', 5,
  'Dr. Holloway changed my life. The yoga classes are transformative and the whole team is dedicated to real wellness.'
FROM businesses WHERE name = 'Augusta Wellness Collective';

INSERT INTO reviews (business_id, user_name, rating, content)
SELECT id, 'Tyrone H.', 5,
  'Been coming here for 20 years. James keeps you sharp. This is Augusta barbershop culture at its finest.'
FROM businesses WHERE name = 'Forrest & Co. Barbershop';

INSERT INTO reviews (business_id, user_name, rating, content)
SELECT id, 'Angela P.', 5,
  'The peach hand pies are absolutely divine. Ordered a custom cake for my daughter''s birthday and it was perfect.'
FROM businesses WHERE name = 'Peach & Pecan Bakery';
