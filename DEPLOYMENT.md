# Deployment Guide — Healthy Futures

## Prerequisites

- Node.js 20+
- A Supabase project (free tier works)
- A Vercel account (free tier works)
- `vercel` CLI: `npm i -g vercel`

---

## 1. Supabase Setup

### 1a. Run Migrations

In the Supabase SQL Editor, run these files **in order**:

1. `schema.sql` — creates `businesses`, `reviews`, `saved_businesses` tables
2. `schema.views.sql` — creates `business_ratings` view + grants

### 1b. Enable Storage (optional — for business images)

1. In Supabase Dashboard → **Storage**, create a public bucket named `business-images`
2. The `next.config.ts` already whitelists `*.supabase.co` for Next.js Image

### 1c. Create the Admin User

In **Supabase → Authentication → Users**, click **"Add User"**:
- Email: your admin email
- Password: strong password (16+ chars)
- Auto-confirm: **checked**

### 1d. Set Auth Redirect URL

In **Supabase → Authentication → URL Configuration**:
- **Site URL**: `https://your-domain.com` (or your Vercel preview URL)
- **Redirect URLs**: Add `https://your-domain.com/admin`

---

## 2. Environment Variables

You need four env vars. Obtain them from **Supabase → Project Settings → API**:

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `anon` `public` key |
| `SUPABASE_SERVICE_ROLE_KEY` | `service_role` key (keep secret!) |
| `NEXT_PUBLIC_APP_URL` | Your production URL (e.g. `https://healthy-futures.vercel.app`) |

For local development, create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 3. Vercel Deployment

### 3a. First Deploy (CLI)

```bash
vercel            # follow prompts: link to project, select framework Next.js
vercel --prod     # promote to production after preview looks good
```

### 3b. Add Env Vars in Vercel

**Vercel Dashboard → Project → Settings → Environment Variables**. Add all four variables from step 2. Mark `SUPABASE_SERVICE_ROLE_KEY` as **not exposed to client**.

### 3c. Subsequent Deploys

```bash
git push origin main    # Vercel auto-deploys on push to main
```

Or manually:

```bash
vercel --prod
```

---

## 4. Custom Domain

1. In **Vercel → Project → Settings → Domains**, add your domain
2. Follow Vercel's DNS instructions (CNAME or A record via your registrar)
3. Go back to **Supabase → Auth → URL Configuration** and update the Site URL + Redirect URL to your custom domain

---

## 5. Post-Deploy Checklist

- [ ] Home page loads and shows trending businesses
- [ ] Search with `q=`, `category=`, `filter=open-now` all work
- [ ] Near Me button triggers geolocation prompt in mobile browser
- [ ] Business profile page shows correct data
- [ ] Save button toggles without error (check browser console)
- [ ] `/admin/login` accepts credentials and redirects to `/admin`
- [ ] Admin sign-out works and redirects to login
- [ ] PWA: install prompt appears on mobile Chrome/Edge
- [ ] PWA icon looks correct on home screen (dark brown bg, gold HF)

---

## 6. Local Development

```bash
npm install
cp .env.local.example .env.local   # fill in your Supabase values
npm run dev
```

TypeScript check:

```bash
npx tsc --noEmit
```

Production build test:

```bash
npm run build
npm start
```
