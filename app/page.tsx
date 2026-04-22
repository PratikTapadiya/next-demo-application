import HeroSection from "@/components/home/HeroSection";
import FeatureSection from "@/components/home/FeatureSection";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
        <div className="flex gap-2 items-center">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600">
            <svg
              className="w-4 h-4 text-white"
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
          <span className="text-lg font-bold text-gray-900">
            RateLens
          </span>
        </div>
        <nav className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
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

      <main className="flex-1">
        <HeroSection />
        <FeatureSection />
      </main>

      <footer className="border-t border-gray-100 px-6 py-6 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} RateLens. Powered by{" "}
        <a
          href="https://frankfurter.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Frankfurter API
        </a>
        .
      </footer>
    </div>
  );
}
