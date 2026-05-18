"use client";

import Link from "next/link";
import ThemeToggle from "@/components/theme/ThemeToggle";

export default function HomeHeader() {
  return (
    <header className="flex items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-gray-800">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
          <svg
            className="h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <span className="text-lg font-bold text-gray-900 dark:text-gray-100">RateLens</span>
      </div>
      <nav className="flex items-center gap-3 sm:gap-4">
        <ThemeToggle />
        <Link
          href="/login"
          className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          Log in
        </Link>
        <Link
          href="/signup"
          className="inline-flex h-9 items-center rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Sign up
        </Link>
      </nav>
    </header>
  );
}
