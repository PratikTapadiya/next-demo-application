import RateIcon from "~icons/material-symbols/chart-data-outline-rounded";
import ChartIcon from "~icons/material-symbols/insert-chart-outline-rounded";
import SwapIcon from "~icons/material-symbols/swap-horiz-rounded";
import ThunderIcon from "~icons/ant-design/thunderbolt-twotone";
import LockIcon from "~icons/material-symbols/lock-person-outline-rounded";
import MobileIcon from "~icons/material-symbols/phone-android-outline-rounded";
import type { ComponentType, SVGProps } from "react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const features: { icon: IconComponent; title: string; description: string }[] =
  [
    {
      icon: RateIcon,
      title: "Live Exchange Rates",
      description:
        "Get up-to-the-minute exchange rates for 30+ currencies powered by the Frankfurter API — free, accurate, and always current.",
    },
    {
      icon: ChartIcon,
      title: "Historical Trend Charts",
      description:
        "Visualize rate movements over custom date ranges. Spot trends, compare fluctuations, and make informed decisions.",
    },
    {
      icon: SwapIcon,
      title: "Multi-Currency Comparison",
      description:
        "Select a base currency and compare it against multiple quote currencies side by side on a single interactive chart.",
    },
    {
      icon: ThunderIcon,
      title: "Instant Results",
      description:
        "No API key required. No sign-up needed to explore. Results load instantly with zero configuration on your end.",
    },
    {
      icon: LockIcon,
      title: "Secure & Private",
      description:
        "Your data stays yours. Authentication is handled by Supabase with industry-standard security. No tracking, no ads.",
    },
    {
      icon: MobileIcon,
      title: "Responsive Design",
      description:
        "Works beautifully on any device — desktop, tablet, or mobile. Your currency dashboard goes wherever you go.",
    },
  ];

export default function FeatureSection() {
  return (
    <section className="bg-gray-100 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          Everything you need to track currencies
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-lg text-gray-500">
          RateLens gives you the tools to monitor global exchange
          rates without the complexity.
        </p>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm flex flex-col gap-4"
            >
              <feature.icon className="size-10 text-black" />
              <h3 className="text-base font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-sm leading-6 text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
