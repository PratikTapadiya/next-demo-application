const BASE = 'https://api.frankfurter.dev/v1'

export interface RatesResponse {
  amount: number
  base: string
  date: string
  rates: Record<string, number>
}

export interface HistoricalRatesResponse {
  amount: number
  base: string
  start_date: string
  end_date: string
  rates: Record<string, Record<string, number>>
}

export async function getCurrencies(): Promise<Record<string, string>> {
  const res = await fetch(`${BASE}/currencies`)
  if (!res.ok) throw new Error('Frankfurter fetch failed')
  return res.json()
}

export async function getLatestRates(base: string, symbols: string[]): Promise<RatesResponse> {
  const res = await fetch(`${BASE}/latest?base=${base}&symbols=${symbols.join(',')}`)
  if (!res.ok) throw new Error('Frankfurter fetch failed')
  return res.json()
}

export async function getHistoricalRates(
  base: string,
  symbols: string[],
  from: string,
  to: string
): Promise<HistoricalRatesResponse> {
  const res = await fetch(`${BASE}/${from}..${to}?base=${base}&symbols=${symbols.join(',')}`)
  if (!res.ok) throw new Error('Frankfurter fetch failed')
  return res.json()
}
