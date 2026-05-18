import type { ReactNode } from "react";
import AuthLayoutShell from "@/components/auth/AuthLayoutShell";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <AuthLayoutShell>{children}</AuthLayoutShell>;
}
