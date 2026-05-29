import { FEE_BEARER } from './constants.js'

const FEE_RATE = 0.001
const MIN_FEE_CNY = 50

export function generateTxnId() {
  const now = new Date()
  const pad = (n, len = 2) => String(n).padStart(len, '0')
  const datePart = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`
  const seq = pad(Math.floor(Math.random() * 999999), 6)
  return `TXN-MB-${datePart}-${seq}`
}

export function generateOrderNo() {
  const now = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  const datePart = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`
  const seq = pad(Math.floor(Math.random() * 9999), 4)
  return `MB-${datePart}-${seq}`
}

export function calculateFee(amount, feeBearer, remittanceCurrency) {
  const baseFee = Math.max(amount * FEE_RATE, MIN_FEE_CNY)
  const fee = Math.round(baseFee * 100) / 100

  return {
    fee,
    feeCurrency: remittanceCurrency === 'CNY' ? 'CNY' : remittanceCurrency,
    feeBearer,
    payerFee: feeBearer === FEE_BEARER.CRED ? 0 : feeBearer === FEE_BEARER.SHAR ? fee / 2 : fee,
    receiverFee: feeBearer === FEE_BEARER.DEBT ? 0 : feeBearer === FEE_BEARER.SHAR ? fee / 2 : fee,
  }
}

export function formatAmount(value, currency) {
  const num = typeof value === 'number' ? value : Number(String(value).replaceAll(',', ''))
  if (Number.isNaN(num)) return `- ${currency}`
  return `${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`
}
