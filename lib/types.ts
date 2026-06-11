export interface DbBusiness {
  id: string;
  name: string;
  owner_name: string | null;
  category: string;
  description: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  phone: string | null;
  website: string | null;
  hours: Record<string, string> | null;
  latitude: number | null;
  longitude: number | null;
  image_url: string | null;
  is_black_owned: boolean;
  is_verified: boolean;
  is_featured: boolean;
  status: string;
  created_at: string;
  avg_rating?: number | null;
  review_count?: number;
  distance_miles?: number | null;
}

export interface DbReview {
  id: string;
  business_id: string;
  user_name: string;
  rating: number;
  content: string | null;
  created_at: string;
}
