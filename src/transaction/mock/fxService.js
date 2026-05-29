import { DEFAULT_FX_RATES } from './constants.js'

export async function fetchFxRate(currency) {
  if (currency === 'CNY') {
    return { rate: 1, date: new Date().toISOString().slice(0, 10), source: 'fixed' }
  }

  try {
    const response = await fetch(`https://api.frankfurter.app/latest?from=CNY&to=${currency}`)
    if (response.ok) {
      const data = await response.json()
      const rate = Number(data?.rates?.[currency])
      if (Number.isFinite(rate) && rate > 0) {
        return { rate, date: data.date || '', source: 'live' }
      }
    }
  } catch {
    // fall through to backup
  }

  try {
    const response = await fetch('https://open.er-api.com/v6/latest/CNY')
    if (response.ok) {
      const data = await response.json()
      const rate = Number(data?.rates?.[currency])
      const unixTime = Number(data?.time_last_update_unix)
      const date = Number.isFinite(unixTime) && unixTime > 0
        ? new Date(unixTime * 1000).toISOString().slice(0, 10)
        : ''
      if (Number.isFinite(rate) && rate > 0) {
        return { rate, date, source: 'live' }
      }
    }
  } catch {
    // fall through to default
  }

  return {
    rate: DEFAULT_FX_RATES[currency] ?? 1,
    date: '',
    source: 'default',
  }
}

export function formatFxDisplay(payCurrency, rate, receiveCurrency) {
  return `1 ${payCurrency} = ${rate.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })} ${receiveCurrency}`
}
