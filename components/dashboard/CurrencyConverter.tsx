"use client";

import { useCallback, useEffect, useState } from "react";
import { getLatestRates } from "@/lib/frankfurter";
import { CURRENCY_CODES, formatRate } from "@/utils/currency";
import Input from "@/components/ui/Input";

const selectClassName =
  "text-sm border border-black rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black w-full";

export default function CurrencyConverter() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [amount, setAmount] = useState("1");
  const [rate, setRate] = useState<number | null>(null);
  const [rateDate, setRateDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  const fetchRate = useCallback(async () => {
    if (from === to) {
      setRate(1);
      setRateDate(null);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await getLatestRates(from, [to]);
      const quoteRate = response.rates[to];
      if (quoteRate === undefined) {
        throw new Error("Rate unavailable");
      }
      setRate(quoteRate);
      setRateDate(response.date);
    } catch {
      setRate(null);
      setRateDate(null);
      setError(
        "Could not load exchange rate. Check your connection or try another pair.",
      );
    } finally {
      setLoading(false);
    }
  }, [from, to, retryKey]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchRate();
  }, [fetchRate]);

  const parsedAmount = parseFloat(amount);
  const amountValid =
    amount !== "" && !Number.isNaN(parsedAmount) && parsedAmount >= 0;
  const converted =
    rate !== null && amountValid ? parsedAmount * rate : null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
      <h2 className="text-base font-semibold text-gray-900 mb-1">
        Currency converter
      </h2>
      <p className="text-sm text-gray-500 mb-5">
        Convert amounts using live exchange rates.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
        <div className="flex flex-col gap-1">
          <label htmlFor="converter-from" className="text-sm text-black">
            From
          </label>
          <select
            id="converter-from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className={selectClassName}
          >
            {CURRENCY_CODES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <Input
          id="converter-amount"
          label="Amount"
          type="number"
          min={0}
          step="any"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="flex flex-col gap-1">
          <label htmlFor="converter-to" className="text-sm text-black">
            To
          </label>
          <select
            id="converter-to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className={selectClassName}
          >
            {CURRENCY_CODES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-700">Result</span>
          <div
            className="min-h-[42px] flex flex-col justify-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-2"
            aria-live="polite"
          >
            {loading && (
              <span className="text-sm text-gray-400 animate-pulse">
                Loading…
              </span>
            )}
            {!loading && error && (
              <span className="text-sm text-amber-700">{error}</span>
            )}
            {!loading && !error && !amountValid && (
              <span className="text-sm text-gray-400">Enter a valid amount</span>
            )}
            {!loading && !error && amountValid && converted !== null && (
              <>
                <span className="text-lg font-semibold text-gray-900">
                  {formatRate(converted)} {to}
                </span>
                {from !== to && rate !== null && (
                  <span className="text-xs text-gray-500 mt-0.5">
                    1 {from} = {formatRate(rate)} {to}
                    {rateDate ? ` · ${rateDate}` : ""}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {error && !loading && (
        <button
          type="button"
          onClick={() => setRetryKey((k) => k + 1)}
          className="mt-4 px-4 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Retry
        </button>
      )}
    </div>
  );
}
