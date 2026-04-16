// Re-export Prisma model types for use across the app.
export type { Profile, WatchlistEntry } from "@prisma/client";

// After running Supabase CLI type generation, import and re-export here:
// npx supabase gen types typescript --project-id <ref> > lib/types/supabase.ts
// export type { Database } from "./supabase";
