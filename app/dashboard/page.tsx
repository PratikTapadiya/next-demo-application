import type { Metadata } from "next";
import CurrencyChart from "@/components/dashboard/CurrencyChart";
import CurrencyConverter from "@/components/dashboard/CurrencyConverter";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Currency Comparison</h1>
        <p className="text-gray-500 mt-1">
          Track historical exchange rate trends across multiple currencies.
        </p>
      </div>

      <CurrencyConverter />
      <CurrencyChart />
    </div>
  );
}
