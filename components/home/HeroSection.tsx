import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center overflow-hidden px-4 py-16 text-center sm:px-6 sm:py-24">
      <div className="mb-4 flex gap-2 rounded-2xl bg-indigo-50 p-4 md:text-xl font-semibold text-indigo-700 text-base">
        Live exchange rates · Sign in to explore, track, and compare currencies
      </div>

      <h1 className="mt-4 w-full max-w-3xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
        RateLens
      </h1>

      <p className="mt-6 max-w-2xl text-base leading-8 text-gray-600 sm:text-xl">
        Track, compare, and visualize real-time and historical exchange rates
        across 30+ currencies. Pick a base currency, choose your quote
        currencies, and explore rate trends with interactive charts all
        powered by live market data.
      </p>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="/signup"
          className="inline-flex h-12 items-center justify-center rounded-lg bg-indigo-600 px-8 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Get started free
        </Link>
        <Link
          href="/login"
          className="inline-flex h-12 items-center justify-center rounded-lg border border-gray-300 bg-white px-8 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Sign in
        </Link>
      </div>

      <p className="mt-4 text-sm text-gray-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-indigo-600 hover:underline"
        >
          Log in here
        </Link>
      </p>
    </section>
  );
}
