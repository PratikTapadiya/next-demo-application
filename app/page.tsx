import HeroSection from "@/components/home/HeroSection";
import FeatureSection from "@/components/home/FeatureSection";
import HomeHeader from "@/components/home/HomeHeader";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      <HomeHeader />

      <main className="flex-1">
        <HeroSection />
        <FeatureSection />
      </main>

      <footer className="border-t border-gray-100 px-6 py-6 text-center text-sm text-gray-400 dark:border-gray-800 dark:text-gray-500">
        &copy; {new Date().getFullYear()} RateLens. Powered by{" "}
        <a
          href="https://frankfurter.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:underline dark:text-gray-500 dark:hover:text-gray-300"
        >
          Frankfurter API
        </a>
        .
      </footer>
    </div>
  );
}
