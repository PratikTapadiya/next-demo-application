export const CURRENCY_CODES = [
  'AUD', 'BGN', 'BRL', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK',
  'EUR', 'GBP', 'HKD', 'HUF', 'IDR', 'ILS', 'INR', 'ISK',
  'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PLN',
  'RON', 'SEK', 'SGD', 'THB', 'TRY', 'USD', 'ZAR',
]

export type RangeKey = '90D' | '1Y' | '5Y' | 'Max'

export function formatRate(rate: number): string {
  if (rate >= 100) return rate.toFixed(2)
  if (rate >= 1) return rate.toFixed(4)
  return rate.toFixed(6)
}

export function formatPercent(value: number): string {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

export function getRangeDates(range: RangeKey): { from: string; to: string } {
  const to = new Date()
  const from = new Date()

  switch (range) {
    case '90D':
      from.setDate(from.getDate() - 90)
      break
    case '1Y':
      from.setFullYear(from.getFullYear() - 1)
      break
    case '5Y':
      from.setFullYear(from.getFullYear() - 5)
      break
    case 'Max':
      return { from: '2000-01-03', to: toISO(to) }
  }

  return { from: toISO(from), to: toISO(to) }
}

function toISO(date: Date): string {
  return date.toISOString().split('T')[0]
}
