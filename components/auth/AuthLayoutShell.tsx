"use client";

import type { ReactNode } from "react";
import ThemeToggle from "@/components/theme/ThemeToggle";

export default function AuthLayoutShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      {children}
    </div>
  );
}
