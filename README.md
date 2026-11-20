# Amayas Fashion — Website

**Live storefront (static demo):** https://zeeshanshaikh95.github.io/amayas-fashion/

Mobile-first storefront for **Amayas Fashion**, an elegant, size-inclusive fashion label
(dresses, co-ords, tunics, fabric & suit, accessories, hijabs and bags, small to 10XL).
Primary conversion: browse → cart → **order on WhatsApp** (no payment gateway, by design).

The catalogue is built from the brand's own public Instagram feed
([@_amayas_fashion](https://www.instagram.com/_amayas_fashion/)) — the same pieces,
size ranges and published prices. Everything is editable from the protected admin panel.

> The GitHub Pages build runs with `VITE_DEMO_MODE=true`, so the storefront works from a
> bundled catalogue without the API. The admin panel, live edits and analytics require the
> Express API + MongoDB (see Deployment).

---

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | React 18 + Vite 6 + TypeScript, Tailwind CSS 3, React Router 6, react-helmet-async |
| Backend | Node.js + Express 4 + TypeScript, Zod validation |
| Database | MongoDB + Mongoose 8 (Atlas free tier for production) |
| Auth | JWT bearer tokens + bcrypt password hashing, protected `/api/admin/*` routes |
| Security | Helmet, CORS allow-list, rate limiting, input validation, secrets via env |
| Images | Cloudinary (server-side uploads) with local-disk fallback |
| Hosting | GitHub Pages (frontend) + Render free tier (API) + MongoDB Atlas |

## Design system

A deep-wine and antique-gold atelier palette derived from the AMAYAS roundel, on warm
ivory. Typography: **Cormorant Garamond** (display), **Jost** (body) and **Pinyon Script**
(accents). Signature components: the editorial **hero slider**, the horizontal **new-in
rail**, arch-framed category cards and a wine story band.

| Token | Value |
| --- | --- |
| Primary (wine) | `#7C2D3F` |
| Deep surface | `#230A11` |
| Logo rose | `#C98B9A` |
| Antique gold | `#C9A464` |
| Ivory | `#FCF9F5` |

## Project structure

```
├── client/                 React SPA
│   ├── public/             robots.txt, sitemap.xml, favicons, brand + product images
│   └── src/
│       ├── admin/          Protected admin panel (lazy-loaded bundle)
│       ├── api/            Centralized API client + typed endpoints
│       ├── components/     Reusable UI (ProductCard, HeroSlider, ProductRail, MiniCart…)
│       ├── context/        Cart / Settings / Toast providers
│       ├── hooks/          useApi, usePageView
│       ├── lib/            WhatsApp builder, analytics, formatting, brand, demo catalogue
│       └── pages/          Public pages
├── server/
│   └── src/
│       ├── config/         Env config + Mongo connection
│       ├── controllers/    Public + admin route handlers
│       ├── middleware/     Auth (JWT), errors, rate limits, uploads
│       ├── models/         Mongoose schemas
│       ├── routes/         /api and /api/admin routers
│       ├── seed/           Admin + settings + first-party catalogue bootstrap
│       ├── services/       Settings singleton, Cloudinary + media services
│       ├── utils/          asyncHandler, query helpers
│       └── validation/     Zod schemas for every write
├── scripts/                Instagram → web asset pipeline
└── docs/DEPLOYMENT.md      Free-tier deployment guide
```

## Pages

- **Home** — hero slider, running ticker, stats, categories, new-in product rail, six-year story, bestsellers, promises, Instagram gallery, WhatsApp CTA
- **Shop** — search, category filter, sort, responsive product grid
- **Category** — image-led category hero + filtered products
- **Product** — portrait gallery, price, size & fit, fabric & details, care notes, related pieces
- **About / Our Story** — six-year anniversary artwork, timeline, promises, WhatsApp CTA
- **Reviews / Gallery / Contact** — approved reviews, Instagram gallery, WhatsApp-first contact
- **Admin** — dashboard analytics, product CRUD (+ images, variants, bestseller/featured/out-of-stock, SEO), category CRUD + reorder, review moderation, gallery manager, settings

## Quick start (local)

**Prerequisites:** Node 20+ and MongoDB — either a local/Atlas instance or the bundled dev database.

```
# 1 — install
npm install

# 2 — configure the server
cp .env.example server/.env
# → edit server/.env: set MONGODB_URI, JWT_SECRET,
#   ADMIN_EMAIL and ADMIN_PASSWORD before any real deployment.

# 3 — start a database (skip if you already run MongoDB / use Atlas)
npm run dev:db

# 4 — bootstrap the database (admin + settings + catalogue)
npm run seed

# 5 — run the API and the client
npm run dev
# Client: http://localhost:5173     API: http://localhost:4000/api/health
```

`npm run dev:all` runs the dev database, API and client together in one terminal.

**Admin panel:** `http://localhost:5173/admin` → log in with `ADMIN_EMAIL` / `ADMIN_PASSWORD`
from `server/.env`. The first login forces a password change.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Run API + client together |
| `npm run dev:all` | Dev database + API + client |
| `npm run dev:db` | Local dev MongoDB (persistent data in `server/.data/mongo`) |
| `npm run build` | Typecheck + build both workspaces |
| `npm run typecheck` | TypeScript project-wide |
| `npm run seed` / `seed:reset` | Seed (optionally wiping catalogue data) |
| `npm run assets -- <source-folder>` | Re-derive brand, product, hero, gallery and OG assets |
| `node server/scripts/api-smoke.mjs` | End-to-end API test (public + admin CRUD + auth) |

## Where the data comes from

| Data | Source |
| --- | --- |
| Brand name, tagline, categories, size ranges | Instagram bio and captions |
| Products, fabric notes, size ranges | Instagram posts and reels |
| Prices | Only the two prices published by the brand (₹199 Korean shirt, ₹2,100 festive co-ord). Everything else shows **Price on request** rather than an invented figure. |
| Photography | Downloaded from the brand's own feed and re-encoded as WebP (see `docs/ASSETS.md`) |
| WhatsApp number | `+91 91065 55977` (published in captions) |
| Logo | The brand's Instagram avatar, masked and upscaled — never redrawn or recoloured |

## Deployment

1. **Frontend (GitHub Pages):** the included workflow builds with `VITE_DEMO_MODE=true`
   and publishes `client/dist`. Enable Pages → Source: GitHub Actions.
2. **API (Render):** create a Blueprint from `render.yaml`, add a MongoDB Atlas URI and
   the first-admin credentials in the Render dashboard.
3. **Connect the two:** set the repository variable `VITE_API_BASE_URL` to the Render URL,
   switch `VITE_DEMO_MODE` to `false`, push, and the admin panel goes live.

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for the full walkthrough.

## Security notes

- Passwords: bcrypt (12 rounds); never stored or logged in plaintext.
- Every `/api/admin/*` request requires a valid JWT; tokens of deleted admins are rejected.
- Login rate-limited (10 attempts / 15 min); analytics + uploads separately limited.
- Zod validation on all writes; Mongo validation as a second layer.
- Central error handler never leaks stack traces; CORS restricted via env in production.
- Admin UI is code-split and route-guarded, but **security is enforced server-side only**.
