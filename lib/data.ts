export interface Business {
  id: string;
  name: string;
  owner_name: string;
  category: string;
  description: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  website: string;
  hours: Record<string, string>;
  image_url: string;
  is_black_owned: boolean;
  is_verified: boolean;
  is_featured: boolean;
  rating: number;
  review_count: number;
}

export interface Review {
  id: string;
  business_id: string;
  user_name: string;
  rating: number;
  content: string;
  created_at: string;
}

export const BUSINESSES: Business[] = [
  {
    id: "mamas-southern-kitchen",
    name: "Mama's Southern Kitchen",
    owner_name: "Dorothy Mae Williams",
    category: "Food & Dining",
    description:
      "Family-owned since 1998, Mama's serves authentic Southern soul food made from recipes passed down three generations. Fried catfish, smothered pork chops, collard greens, and sweet potato pie made fresh daily.",
    address: "1142 Broad St",
    city: "Augusta",
    state: "GA",
    phone: "(706) 555-0101",
    website: "https://mamassouthernkitchen.com",
    hours: {
      Mon: "11am–9pm",
      Tue: "11am–9pm",
      Wed: "11am–9pm",
      Thu: "11am–9pm",
      Fri: "11am–10pm",
      Sat: "10am–10pm",
      Sun: "12pm–8pm",
    },
    image_url: "https://picsum.photos/seed/mamas-kitchen/800/400",
    is_black_owned: true,
    is_verified: true,
    is_featured: true,
    rating: 4.9,
    review_count: 312,
  },
  {
    id: "crown-beauty-studio",
    name: "Crown Beauty Studio",
    owner_name: "Nakia Simone Foster",
    category: "Beauty",
    description:
      "Luxury natural-hair care, protective styles and skincare for every crown. Specializing in locs, braids, and silk presses. Walk-ins welcome on select days.",
    address: "2309 Wrightsboro Rd",
    city: "Augusta",
    state: "GA",
    phone: "(706) 555-0202",
    website: "https://crownbeautystudio.com",
    hours: {
      Tue: "9am–7pm",
      Wed: "9am–7pm",
      Thu: "9am–7pm",
      Fri: "9am–8pm",
      Sat: "8am–6pm",
    },
    image_url: "https://picsum.photos/seed/crown-beauty/800/400",
    is_black_owned: true,
    is_verified: true,
    is_featured: true,
    rating: 4.8,
    review_count: 247,
  },
  {
    id: "augusta-wellness-collective",
    name: "Augusta Wellness Collective",
    owner_name: "Dr. Marcus T. Holloway",
    category: "Health & Wellness",
    description:
      "Holistic care, massage therapy, and community fitness classes. Offering yoga, meditation, nutrition counseling, and therapeutic bodywork in a welcoming community space.",
    address: "428 Greene St",
    city: "Augusta",
    state: "GA",
    phone: "(706) 555-0303",
    website: "https://augustawellness.com",
    hours: {
      Mon: "7am–8pm",
      Tue: "7am–8pm",
      Wed: "7am–8pm",
      Thu: "7am–8pm",
      Fri: "7am–7pm",
      Sat: "9am–4pm",
    },
    image_url: "https://picsum.photos/seed/wellness-col/800/400",
    is_black_owned: true,
    is_verified: true,
    is_featured: false,
    rating: 4.7,
    review_count: 183,
  },
  {
    id: "forrest-barbershop",
    name: "Forrest & Co. Barbershop",
    owner_name: "James Forrest III",
    category: "Beauty",
    description:
      "Classic cuts, hot-towel shaves, and crisp lineups in a neighborhood landmark since 1985. Traditional barbershop experience with modern precision.",
    address: "816 Laney Walker Blvd",
    city: "Augusta",
    state: "GA",
    phone: "(706) 555-0404",
    website: "https://forrestandco.com",
    hours: {
      Tue: "8am–7pm",
      Wed: "8am–7pm",
      Thu: "8am–7pm",
      Fri: "8am–8pm",
      Sat: "7am–6pm",
    },
    image_url: "https://picsum.photos/seed/forrest-barber/800/400",
    is_black_owned: true,
    is_verified: true,
    is_featured: false,
    rating: 4.7,
    review_count: 156,
  },
  {
    id: "peach-pecan-bakery",
    name: "Peach & Pecan Bakery",
    owner_name: "Celeste Renée Armour",
    category: "Food & Dining",
    description:
      "Small-batch peach hand pies, Georgia pecan pralines, and custom celebration cakes baked fresh daily. Wholesale orders welcome for events and corporate clients.",
    address: "305 8th St",
    city: "Augusta",
    state: "GA",
    phone: "(706) 555-0505",
    website: "https://peachandpecan.com",
    hours: {
      Wed: "7am–4pm",
      Thu: "7am–4pm",
      Fri: "7am–5pm",
      Sat: "8am–3pm",
    },
    image_url: "https://picsum.photos/seed/peach-bakery/800/400",
    is_black_owned: true,
    is_verified: true,
    is_featured: true,
    rating: 4.8,
    review_count: 140,
  },
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    business_id: "mamas-southern-kitchen",
    user_name: "Tasha R.",
    rating: 5,
    content:
      "Best soul food in Augusta, hands down. The catfish melts in your mouth and the staff treats you like family.",
    created_at: "2026-05-28",
  },
  {
    id: "r2",
    business_id: "mamas-southern-kitchen",
    user_name: "Marcus J.",
    rating: 5,
    content:
      "Proud to support a Black-owned staple of our community. Generous portions and the cobbler is unreal.",
    created_at: "2026-04-15",
  },
  {
    id: "r3",
    business_id: "crown-beauty-studio",
    user_name: "Keisha B.",
    rating: 5,
    content:
      "Nakia is a miracle worker. My locs have never looked better. The whole vibe is welcoming and professional.",
    created_at: "2026-05-20",
  },
  {
    id: "r4",
    business_id: "augusta-wellness-collective",
    user_name: "David L.",
    rating: 5,
    content:
      "Dr. Holloway changed my life. The yoga classes are transformative and the whole team is dedicated to real wellness.",
    created_at: "2026-06-01",
  },
  {
    id: "r5",
    business_id: "forrest-barbershop",
    user_name: "Tyrone H.",
    rating: 5,
    content:
      "Been coming here for 20 years. James keeps you sharp. This is Augusta barbershop culture at its finest.",
    created_at: "2026-05-10",
  },
  {
    id: "r6",
    business_id: "peach-pecan-bakery",
    user_name: "Angela P.",
    rating: 5,
    content:
      "The peach hand pies are absolutely divine. Ordered a custom cake for my daughter's birthday and it was perfect.",
    created_at: "2026-06-05",
  },
];

export function getBusinessById(id: string): Business | undefined {
  return BUSINESSES.find((b) => b.id === id);
}

export function getBusinessReviews(businessId: string): Review[] {
  return REVIEWS.filter((r) => r.business_id === businessId);
}

export function getFeaturedBusinesses(): Business[] {
  return BUSINESSES.filter((b) => b.is_featured);
}

export function getBusinessesByCategory(category: string): Business[] {
  return BUSINESSES.filter(
    (b) => b.category.toLowerCase() === category.toLowerCase()
  );
}

export function searchBusinesses(query: string): Business[] {
  const q = query.toLowerCase();
  return BUSINESSES.filter(
    (b) =>
      b.name.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q) ||
      b.city.toLowerCase().includes(q)
  );
}
