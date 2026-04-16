@AGENTS.md

# CurrencyLens — Next.js Demo App

A currency comparison web app for individual users. Users sign up, log in, and then explore or compare live and historical exchange rates through interactive charts.

## Purpose

- Show real-time and historical exchange rates powered by the **Frankfurter API** (free, no API key required)
- Let users pick a base currency and one or more quote currencies and view rate trends over time
- Reference UI: https://frankfurter.dev/playground/?base=EUR&quotes=USD%2CGBP%2CJPY&range=90

## Tech Stack

| Layer | Library | Notes |
|---|---|---|
| Framework | **Next.js 16.2.4** | App Router only — no Pages Router |
| UI | **React 19.2.4** + **TypeScript 5** | |
| Styling | **Tailwind CSS v4** | No `tailwind.config.js` needed |
| Auth | **Supabase** (`@supabase/supabase-js`, `@supabase/ssr`) | Email + password |
| Currency data | **Frankfurter API** | Free, no key, CORS-friendly |
| Charts | TBD — likely **Recharts** or **Chart.js** (`react-chartjs-2`) | Install when implementing dashboard |

> Supabase and charting libraries are **not yet installed**. Run `npm install @supabase/supabase-js @supabase/ssr` before implementing auth. Add the chart library when building the dashboard.

## Development

```bash
npm run dev       # dev server at http://localhost:3000
npm run build     # production build
npx tsc --noEmit  # type-check without emitting
```

## Environment Variables

Create `.env.local` (never commit this file):

```env
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-project-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

Both are `NEXT_PUBLIC_` because they are safe for the browser. The anon key is not a secret — Supabase Row-Level Security controls data access.

## Pages & Routing

| URL | File | Auth required | Description |
|---|---|---|---|
| `/` | `app/page.tsx` | No | Landing page — branding, feature highlights, CTA to sign up |
| `/login` | `app/(auth)/login/page.tsx` | No | Supabase email/password login |
| `/signup` | `app/(auth)/signup/page.tsx` | No | Supabase email/password registration |
| `/dashboard` | `app/dashboard/page.tsx` | Yes | Currency chart — base vs quote(s) with date range selector |

The `(auth)` route group shares a centered-card layout without affecting the URL.

## Project Structure

```
app/
  (auth)/
    layout.tsx          # Full-screen centered layout for auth pages (no html/body)
    login/page.tsx      # Renders <LoginForm />
    signup/page.tsx     # Renders <SignupForm />
  dashboard/
    layout.tsx          # Dashboard chrome: nav + main area
    page.tsx            # Currency chart + controls
  page.tsx              # Home / landing page
  layout.tsx            # Root layout — Geist fonts, html/body
  globals.css           # Tailwind v4 entry (@import "tailwindcss")

components/
  auth/
    LoginForm.tsx       # 'use client' — Supabase signInWithPassword
    SignupForm.tsx      # 'use client' — Supabase signUp
  dashboard/
    DashboardNav.tsx    # 'use client' — session guard + logout
    CurrencyChart.tsx   # 'use client' — chart with base/quote/range controls
    StatsCard.tsx       # presentational stat card
  home/
    HeroSection.tsx     # Landing page hero with CTA
    FeatureSection.tsx  # Feature highlights
  ui/
    Button.tsx          # Reusable button (primary/ghost, loading state)
    Input.tsx           # Reusable labeled input with error display

lib/
  supabase/
    client.ts           # createBrowserClient() — use in Client Components
    server.ts           # createServerClient() — use in Server Components / Route Handlers
  frankfurter.ts        # Frankfurter API fetch helpers

utils/
  currency.ts           # Currency code lists, formatting helpers
```

## Supabase Auth

**Client-side** (in Client Components marked `'use client'`):
```ts
import { createBrowserClient } from '@/lib/supabase/client'

const supabase = createBrowserClient()
await supabase.auth.signInWithPassword({ email, password })
await supabase.auth.signUp({ email, password })
await supabase.auth.signOut()
```

**Server-side** (in Server Components, layouts, Route Handlers):
```ts
import { createServerClient } from '@/lib/supabase/server'

const supabase = await createServerClient()
const { data: { user } } = await supabase.auth.getUser()
```

**Route protection** — check the session in `app/dashboard/layout.tsx` (server-side) and redirect to `/login` if no user. Do **not** rely solely on a client-side guard.

**Do not** use the old mock `localStorage` auth (`lib/auth.ts`) for new code — it is being replaced by Supabase.

## Frankfurter API

Base URL: `https://api.frankfurter.dev`

| Endpoint | Example | Returns |
|---|---|---|
| Latest rates | `GET /v1/latest?base=EUR&symbols=USD,GBP` | Current rates |
| Historical range | `GET /v1/2024-01-01..2024-04-01?base=EUR&symbols=USD` | Daily rates over a range |
| Available currencies | `GET /v1/currencies` | Map of code → name |

- No API key required
- Free, no rate-limit concerns for demo use
- All requests can be made from the browser (CORS allowed) or from Server Components

**Fetch helper pattern** (`lib/frankfurter.ts`):
```ts
const BASE = 'https://api.frankfurter.dev/v1'

export async function getLatestRates(base: string, symbols: string[]) {
  const res = await fetch(`${BASE}/latest?base=${base}&symbols=${symbols.join(',')}`)
  if (!res.ok) throw new Error('Frankfurter fetch failed')
  return res.json()
}

export async function getHistoricalRates(base: string, symbols: string[], from: string, to: string) {
  const res = await fetch(`${BASE}/${from}..${to}?base=${base}&symbols=${symbols.join(',')}`)
  if (!res.ok) throw new Error('Frankfurter fetch failed')
  return res.json()
}
```

## Next.js 16 Breaking Changes

**Read `node_modules/next/dist/docs/` before writing new code.**

| What changed | Old (≤15) | New (16) |
|---|---|---|
| Request proxy / middleware | `middleware.ts` | **`proxy.ts`** at project root |
| Proxy export name | `export default function middleware` | `export function proxy` (named) or default |
| Client-side router | `next/navigation` | `next/navigation` (unchanged) |

**Do not create `middleware.ts`** — it is deprecated and silently ignored. Use `proxy.ts`.

## Tailwind CSS v4

- No config file needed — PostCSS plugin handles everything
- Entry point: `globals.css` uses `@import "tailwindcss"`
- Add custom design tokens inside `@theme inline { }` blocks in `globals.css`
- Utility class names are the same as v3

## Component Conventions

- Default to **Server Components**. Add `'use client'` only for browser APIs, event handlers, or React hooks.
- Keep `'use client'` as deep as possible — server page shells import client form/chart components, not the other way around.
- Reusable primitives → `components/ui/`
- Feature components → `components/auth/`, `components/dashboard/`, `components/home/`
- Supabase browser client → only in Client Components (`lib/supabase/client.ts`)
- Supabase server client → only in Server Components / Route Handlers (`lib/supabase/server.ts`)
