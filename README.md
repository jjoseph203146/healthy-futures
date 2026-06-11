# Healthy Futures — Black-Owned Business Directory PWA

A mobile-first Progressive Web App for discovering, connecting with, and empowering Black-owned businesses. Built with Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, backed by Supabase, deployed on Vercel.

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Database | Supabase (PostgreSQL) |
| Hosting | Vercel |
| Fonts | Hanken Grotesk + Newsreader (Google Fonts) |

---

## Project Structure

```
app/
  layout.tsx          # Root layout — fonts, PWA metadata
  globals.css         # Tailwind v4 @theme brand tokens
  manifest.ts         # PWA web app manifest (file-based)
  page.tsx            # Home screen
  search/page.tsx     # Search results
  business/[id]/page.tsx  # Business profile
  saved/page.tsx      # Saved businesses list

components/
  BusinessCard.tsx    # Reusable card (horizontal + vertical variants)
  BottomNav.tsx       # Mobile bottom navigation (client component)
  CategoryGrid.tsx    # Browse-by-category 4×2 grid

lib/
  supabase.ts         # Supabase client singleton
  data.ts             # Mock data + type definitions (use until Supabase is live)

schema.sql            # Supabase schema + seed data (5 Augusta, GA businesses)
.env.local.example    # Required environment variables
vercel.json           # Vercel deployment config
```

---

## Step 1 — Local Setup

```bash
# Clone and install
git clone <your-repo-url>
cd healthy-futures
npm install

# Copy env file and fill in your Supabase credentials (see Step 2)
cp .env.local.example .env.local
```

---

## Step 2 — Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click **New Project** → choose your org → enter a project name and database password
3. Wait ~2 minutes for the project to spin up
4. Go to **Settings → API**
   - Copy **Project URL** → paste as `NEXT_PUBLIC_SUPABASE_URL` in `.env.local`
   - Copy **anon public** key → paste as `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`

---

## Step 3 — Run the Database Schema

1. In your Supabase project, click **SQL Editor** in the left sidebar
2. Click **New query**
3. Open `schema.sql` from this repo and paste the entire contents into the editor
4. Click **Run** (or press Cmd/Ctrl + Enter)
5. You should see: `Success. No rows returned`

This creates three tables (`businesses`, `reviews`, `saved_businesses`) and seeds 5 Augusta, GA Black-owned businesses with sample reviews.

### Verify the seed data

In the SQL Editor, run:
```sql
SELECT name, category, rating FROM businesses ORDER BY name;
```
You should see 5 rows.

---

## Step 4 — Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app runs with **mock data** from `lib/data.ts` by default — no Supabase connection required until you wire it up.

---

## Step 5 — Connect Supabase to the Pages (optional, do before production)

The pages currently use static mock data from `lib/data.ts`. To switch to live Supabase data, replace the data fetching in each page:

**Example — `app/page.tsx`:**
```ts
// Replace:
import { getFeaturedBusinesses, BUSINESSES } from "@/lib/data";

// With:
import { supabase } from "@/lib/supabase";

const { data: businesses } = await supabase
  .from("businesses")
  .select("*")
  .eq("status", "approved")
  .order("created_at", { ascending: false });
```

**Example — `app/business/[id]/page.tsx`:**
```ts
const { data: business } = await supabase
  .from("businesses")
  .select("*, reviews(*)")
  .eq("id", id)
  .single();
```

---

## Step 6 — PWA Icons

Replace the placeholder SVG icon with proper PNG icons before deploying:

1. Create a 512×512 PNG of your app icon and save as `public/icons/icon-512.png`
2. Create a 192×192 PNG and save as `public/icons/icon-192.png`
3. Create a 180×180 PNG and save as `public/icons/apple-touch-icon.png`

Tools: [RealFaviconGenerator](https://realfavicongenerator.net) or [PWABuilder](https://www.pwabuilder.com/imageGenerator)

---

## Step 7 — Deploy to Vercel

### Option A — Vercel CLI

```bash
npm install -g vercel
vercel login
vercel deploy
```

### Option B — Vercel Dashboard (recommended)

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import your GitHub repo
3. Vercel auto-detects Next.js — no build settings needed
4. Add environment variables in **Settings → Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click **Deploy**

Your app will be live at `https://your-project.vercel.app`

---

## Brand Colors (Tailwind v4 tokens)

| Token | Hex | Usage |
|---|---|---|
| `brand-brown` | `#3B1F0A` | Primary / buttons / nav active |
| `brand-dark` | `#2A1607` | Headings / body text |
| `brand-cream` | `#F5EFE6` | App background |
| `brand-gold` | `#C8860A` | Accents / stars / CTA |
| `brand-muted` | `#988671` | Secondary text |
| `brand-card` | `#ECE3D4` | Card borders |
| `brand-light` | `#F4E6CA` | Text on dark backgrounds |
| `brand-surface` | `#5C4A36` | Body copy |

Use as Tailwind utilities: `bg-brand-cream`, `text-brand-gold`, `border-brand-card`, etc.

---

## Development Notes

- Pages use **static mock data** from `lib/data.ts` — safe to run offline, no credentials needed
- `BottomNav` is a `'use client'` component (uses `usePathname`)
- Business profile page reads `params` as a `Promise` (Next.js 16 requirement)
- Search page reads `searchParams` as a `Promise` (Next.js 16 requirement)
- All images use `next/image` with `picsum.photos` as placeholder source
