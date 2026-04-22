"use client";

import { useEffect, useState, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { getHistoricalRates, getCurrencies } from "@/lib/frankfurter";
import {
  CURRENCY_CODES,
  RangeKey,
  formatRate,
  formatPercent,
  getRangeDates,
} from "@/utils/currency";

const LINE_COLORS = [
  "#6366f1",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
  "#8b5cf6",
];

interface ChartDataPoint {
  date: string;
  [quote: string]: number | string;
}

interface TooltipPayloadEntry {
  name: string;
  value: number;
  color: string;
  payload: ChartDataPoint;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string;
  rawRates: Record<string, Record<string, number>>;
}

function CustomTooltip({
  active,
  payload,
  label,
  rawRates,
}: CustomTooltipProps) {
  if (!active || !payload?.length || !label) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm">
      <p className="font-semibold text-gray-700 mb-2">{label}</p>
      {payload.map((entry) => {
        const raw = rawRates[label]?.[entry.name];
        return (
          <div key={entry.name} className="flex items-center gap-2 py-0.5">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-600 font-medium w-10">{entry.name}</span>
            <span
              className={entry.value >= 0 ? "text-emerald-600" : "text-red-500"}
            >
              {formatPercent(entry.value)}
            </span>
            {raw !== undefined && (
              <span className="text-gray-400 text-xs">({formatRate(raw)})</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function CurrencyChart() {
  const [base, setBase] = useState("USD");
  const [quotes, setQuotes] = useState(["EUR", "GBP", "JPY"]);
  const [range, setRange] = useState<RangeKey>("90D");
  const [addingQuote, setAddingQuote] = useState("");
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [rawRates, setRawRates] = useState<
    Record<string, Record<string, number>>
  >({});
  const [currencies, setCurrencies] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    getCurrencies()
      .then(setCurrencies)
      .catch(() => {});
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { from, to } = getRangeDates(range);
      const response = await getHistoricalRates(base, quotes, from, to);
      const dates = Object.keys(response.rates).sort();

      const firstRates: Record<string, number> = {};
      for (const quote of quotes) {
        const firstDate = dates.find(
          (d) => response.rates[d]?.[quote] !== undefined,
        );
        if (firstDate) firstRates[quote] = response.rates[firstDate][quote];
      }

      const data: ChartDataPoint[] = dates.map((date) => {
        const point: ChartDataPoint = { date };
        for (const quote of quotes) {
          const rate = response.rates[date]?.[quote];
          const first = firstRates[quote];
          if (rate !== undefined && first !== undefined) {
            point[quote] = ((rate - first) / first) * 100;
          }
        }
        return point;
      });

      setChartData(data);
      setRawRates(response.rates);
    } catch {
      setError(
        "Could not load exchange rate data. Check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  }, [base, quotes, range, retryKey]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function removeQuote(code: string) {
    if (quotes.length === 1) return;
    setQuotes((prev) => prev.filter((q) => q !== code));
  }

  function addQuote(code: string) {
    if (!code || quotes.includes(code) || quotes.length >= 5) return;
    setQuotes((prev) => [...prev, code]);
    setAddingQuote("");
  }

  const availableToAdd = CURRENCY_CODES.filter(
    (c) => c !== base && !quotes.includes(c),
  );

  const xTickFormatter = (date: string) => {
    const d = new Date(date);
    if (range === "90D")
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-base font-semibold text-gray-900 mb-5">
        Currency Comparison
      </h2>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-5">
        {/* Base selector */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-black whitespace-nowrap">Base</label>
          <select
            value={base}
            onChange={(e) => setBase(e.target.value)}
            className="text-sm border border-black rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
          >
            {CURRENCY_CODES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Quote chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-black">Quotes</span>
          {quotes.map((q, i) => (
            <span
              key={q}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: LINE_COLORS[i % LINE_COLORS.length] }}
            >
              {q}
              <button
                onClick={() => removeQuote(q)}
                disabled={quotes.length === 1}
                className="hover:opacity-70 disabled:opacity-40 disabled:cursor-not-allowed leading-none"
                aria-label={`Remove ${q}`}
              >
                ×
              </button>
            </span>
          ))}
          {quotes.length < 5 && (
            <select
              value={addingQuote}
              onChange={(e) => addQuote(e.target.value)}
              className="text-xs border border-black rounded-full px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            >
              <option value="">+ Add</option>
              {availableToAdd.map((c) => (
                <option key={c} value={c}>
                  {currencies[c] ? `${c} — ${currencies[c]}` : c}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Range buttons */}
      <div className="flex gap-1 mb-5">
        {(["90D", "1Y", "5Y", "Max"] as RangeKey[]).map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
              range === r
                ? "bg-indigo-600 text-white"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Chart area */}
      {loading && (
        <div className="space-y-3 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-64 bg-gray-100 rounded-lg" />
          <div className="flex gap-4">
            <div className="h-3 bg-gray-200 rounded w-16" />
            <div className="h-3 bg-gray-200 rounded w-16" />
            <div className="h-3 bg-gray-200 rounded w-16" />
          </div>
        </div>
      )}

      {!loading && error && (
        <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
          <div className="flex items-center gap-2 text-amber-600">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              />
            </svg>
            <p className="text-sm font-medium">{error}</p>
          </div>
          <button
            onClick={() => setRetryKey((k) => k + 1)}
            className="px-4 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && chartData.length > 0 && (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tickFormatter={xTickFormatter}
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tickFormatter={(v: number) => `${v.toFixed(1)}%`}
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              tickLine={false}
              axisLine={false}
              width={55}
            />
            <Tooltip content={<CustomTooltip rawRates={rawRates} />} />
            <Legend wrapperStyle={{ paddingTop: "16px", fontSize: "12px" }} />
            {quotes.map((quote, i) => (
              <Line
                key={quote}
                type="monotone"
                dataKey={quote}
                stroke={LINE_COLORS[i % LINE_COLORS.length]}
                strokeWidth={2}
                dot={false}
                connectNulls
                activeDot={{ r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}

      {!loading && !error && chartData.length === 0 && (
        <div className="flex items-center justify-center h-64 text-sm text-gray-400">
          No data available for the selected range.
        </div>
      )}
    </div>
  );
}
