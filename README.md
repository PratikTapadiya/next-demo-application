# RateLens

Currency comparison web app for individual users. Sign up, log in, and explore live and historical exchange rates with interactive charts. Exchange data comes from the [Frankfurter API](https://www.frankfurter.app/) (free, no API key).

## Tech stack

| Layer | Technology | Notes |
| ----- | ---------- | ----- |
| Framework | [Next.js](https://nextjs.org/) **16.2.4** | App Router only (no Pages Router) |
| UI | **React 19.2.4** + **TypeScript 5** | Server Components by default |
| Styling | **Tailwind CSS v4** | Entry: `app/globals.css` (`@import "tailwindcss"`) |
| Auth | **Supabase** (`@supabase/supabase-js`, `@supabase/ssr`) | Email + password |
| Database | **Prisma 7** + **PostgreSQL** | `prisma/schema.prisma` |
| Rates | **Frankfurter API** | `https://api.frankfurter.dev/v1` — no key required |
| Charts | **Recharts** | Dashboard currency charts |
| Icons | **lucide-react** | |
| Themes | **next-themes** | Light/dark support |

Package manager: **pnpm** (`packageManager` in `package.json`).

## Prerequisites

- **Node.js** 20+ (LTS recommended)
- **pnpm** 9.x — [install](https://pnpm.io/installation)
- **PostgreSQL** — for Prisma (local or hosted)
- **Supabase project** — URL + anon key for auth

## Environment variables

Create `.env.local` in the project root (never commit this file):

```env
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-project-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

Add database URL and any other vars required by `prisma/schema.prisma` (see `CLAUDE.md`).

Both `NEXT_PUBLIC_*` Supabase values are safe for the browser; access is enforced with Supabase Row Level Security.

## Install

```bash
pnpm install
```

After schema changes:

```bash
pnpm run db:migrate
```

## Scripts

| Command | Description |
| ------- | ----------- |
| `pnpm dev` | Start dev server at [http://localhost:3000](http://localhost:3000) |
| `pnpm build` | `prisma generate` + production build |
| `pnpm start` | Serve production build |
| `pnpm typecheck` | TypeScript check (`tsc --noEmit`) |
| `pnpm lint` | ESLint (max warnings 0) |
| `pnpm lint:fix` | ESLint with auto-fix |
| `pnpm check` | `typecheck` + `lint` |
| `pnpm db:migrate` | Prisma migrate dev |
| `pnpm db:push` | Prisma db push (prototyping) |
| `pnpm db:studio` | Open Prisma Studio |

**Common workflows**

```bash
# Development
pnpm dev

# Verify before commit
pnpm run check

# Production build
pnpm run build
pnpm start
```

## Routes

| URL | Auth | Description |
| --- | ---- | ----------- |
| `/` | No | Landing — features and sign-up CTA |
| `/login` | No | Email/password login |
| `/signup` | No | Registration |
| `/dashboard` | Yes | Currency chart — base vs quotes, date range |

`/dashboard` is protected server-side in `app/dashboard/layout.tsx` (redirects to `/login` when unauthenticated).

## Project layout (high level)

```
app/              # Next.js App Router pages and layouts
components/       # UI, auth, dashboard, home
lib/              # Supabase clients, Frankfurter API helpers
utils/            # Currency formatting helpers
prisma/           # Schema and migrations
```

## Further documentation

- **`CLAUDE.md`** — architecture, Supabase/Frankfurter patterns, Next.js 16 conventions (`proxy.ts`, not `middleware.ts`)
- **`AGENTS.md`** — agent and Linear workflow notes for this repo

## Reference UI

Frankfurter playground (similar chart UX):  
https://frankfurter.dev/playground/?base=EUR&quotes=USD%2CGBP%2CJPY&range=90
