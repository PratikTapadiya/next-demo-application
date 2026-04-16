"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db";

interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

export async function signUpAction(
  payload: SignUpPayload
): Promise<{ error?: string; requiresEmailConfirmation?: boolean }> {
  const { name, email, password } = payload;

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // Store display name in auth.users user_metadata
      data: { display_name: name },
    },
  });

  if (error) return { error: error.message };

  const user = data.user;
  if (!user) return { error: "Signup failed — no user returned." };

  // Persist the profile row so username is available app-wide
  await prisma.profile.upsert({
    where: { id: user.id },
    update: { displayName: name },
    create: {
      id: user.id,
      displayName: name,
    },
  });

  // If session is null, Supabase is still requiring email confirmation
  if (!data.session) {
    return { requiresEmailConfirmation: true };
  }

  return {};
}
