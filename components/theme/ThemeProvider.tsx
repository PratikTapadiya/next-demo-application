"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, type ReactNode } from "react";

const THEME_STORAGE_KEY = "ratelens-theme";
const LEGACY_THEME_STORAGE_KEY = "ratelens-dashboard-theme";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
      const legacy = localStorage.getItem(LEGACY_THEME_STORAGE_KEY);
      if (legacy) {
        localStorage.setItem(THEME_STORAGE_KEY, legacy);
      }
    }
  }, []);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey={THEME_STORAGE_KEY}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
