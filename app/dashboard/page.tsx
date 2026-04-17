import type { Metadata } from "next";
import StatsCard from "@/components/dashboard/StatsCard";

export const metadata: Metadata = {
  title: "Dashboard",
};

const stats = [
  {
    label: "Total Users",
    value: "1,240",
    color: "bg-indigo-50 text-indigo-600",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4.13a4 4 0 10-8 0 4 4 0 008 0zm6 0a4 4 0 10-8 0"
        />
      </svg>
    ),
  },
  {
    label: "Active Sessions",
    value: "38",
    color: "bg-emerald-50 text-emerald-600",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    label: "Revenue",
    value: "$9,450",
    color: "bg-amber-50 text-amber-600",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    label: "Uptime",
    value: "99.9%",
    color: "bg-blue-50 text-blue-600",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
];

export default function DashboardPage() {
  return (
    <div>
      {/* Welcome heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome to your dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Here&apos;s an overview of your application.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatsCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Recent activity placeholder */}
      <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-3">
          {[
            "User alice@example.com signed in",
            "New session started from 192.168.1.1",
            "Revenue milestone reached: $9,000",
            "System uptime check passed",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0"
            >
              <div className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
              <p className="text-sm text-gray-600">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
