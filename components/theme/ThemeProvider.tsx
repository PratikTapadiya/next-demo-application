"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, type ReactNode } from "react";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, []);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="ratelens-dashboard-theme"
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
