import { createServerClient } from "@supabase/ssr";
import { cookies, headers } from "next/headers";

/**
 * Creates a Supabase client for use in Server Components, layouts,
 * and Route Handlers. Must be awaited — cookies() is async in Next.js 16.
 */
export async function createClient() {
  const cookieStore = await cookies();
  const headersList = await headers();
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const isSecure = protocol === "https";

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: {
        secure: process.env.NODE_ENV === "production" ? isSecure : false,
      },
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Server Components cannot write cookies.
            // The session will refresh via the browser client on next interaction.
          }
        },
      },
    }
  );
}
