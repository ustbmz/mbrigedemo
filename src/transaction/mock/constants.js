export const TRANSACTION_SCENES = {
  CNY_OUT: 'CNY_OUT',
  FX_OUT: 'FX_OUT',
}

export const FX_CURRENCIES = ['HKD', 'THB', 'AED']

export const FEE_BEARER = {
  DEBT: 'DEBT',
  CRED: 'CRED',
  SHAR: 'SHAR',
}

export const CHANNEL_OPTIONS = ['mBridge', 'SWIFT', 'CIPS']

/** Mock fallback rates: 1 CNY = X foreign currency */
export const DEFAULT_FX_RATES = {
  THB: 4.5,
  HKD: 1.081,
  AED: 0.51,
}

/** Admitted mBridge participant BIC codes */
export const ADMITTED_BICS = {
  BKKBTHBK: 'Bangkok International Bank',
  ABAEADXXX: 'Abu Dhabi Commercial Bank',
  HKICHKHH: 'Hong Kong International Clearing Bank',
}

export const MOCK_INSTITUTION_STATUS = 'ENBL'

export const MOCK_PAYER_BALANCE_CNY = 8_000_000

export const MOCK_FX_POSITION = {
  HKD: 2_000_000,
  THB: 15_000_000,
  AED: 1_500_000,
}

export const SENSITIVE_PURPOSE_WORDS = ['赌博', '毒品', 'gambling', 'sanctions', 'terror']

export const DEMO_FAIL_BIC = 'RJCTBKXX'

export const BALANCE_FAIL_THRESHOLD_CNY = 5_000_000
