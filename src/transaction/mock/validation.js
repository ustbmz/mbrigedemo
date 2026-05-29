import {
  ADMITTED_BICS,
  BALANCE_FAIL_THRESHOLD_CNY,
  DEMO_FAIL_BIC,
  MOCK_FX_POSITION,
  MOCK_PAYER_BALANCE_CNY,
  SENSITIVE_PURPOSE_WORDS,
  TRANSACTION_SCENES,
} from './constants.js'

function isEmpty(value) {
  return !String(value ?? '').trim()
}

function parseAmount(value) {
  const sanitized = String(value ?? '').replaceAll(',', '').trim()
  if (!sanitized) return { valid: false, number: NaN, sanitized: '' }
  if (!/^\d+(\.\d{1,2})?$/.test(sanitized)) return { valid: false, number: NaN, sanitized }
  const number = Number(sanitized)
  if (Number.isNaN(number) || number <= 0) return { valid: false, number, sanitized }
  return { valid: true, number, sanitized }
}

function validatePartyId(form, prefix, t) {
  const idType = form[`${prefix}IdType`]
  if (idType === 'account') {
    if (isEmpty(form[`${prefix}Account`])) {
      return t('errors.fieldRequired', { field: t(`form.${prefix}Account`) })
    }
    if (isEmpty(form[`${prefix}AccountName`])) {
      return t('errors.fieldRequired', { field: t(`form.${prefix}AccountName`) })
    }
  } else {
    if (isEmpty(form[`${prefix}WalletId`])) {
      return t('errors.fieldRequired', { field: t(`form.${prefix}WalletId`) })
    }
    if (isEmpty(form[`${prefix}WalletName`])) {
      return t('errors.fieldRequired', { field: t(`form.${prefix}WalletName`) })
    }
  }
  return ''
}

export function validateStep0(form, t) {
  if (form.scene === TRANSACTION_SCENES.FX_OUT && isEmpty(form.fxCurrency)) {
    return t('errors.fxCurrencyRequired')
  }
  return ''
}

export function validateStep1(form, t) {
  const errors = {}

  const partyFields = ['payer', 'receiver']
  for (const prefix of partyFields) {
    const err = validatePartyId(form, prefix, t)
    if (err) errors[`${prefix}Id`] = err
  }

  if (isEmpty(form.payerName)) errors.payerName = t('errors.fieldRequired', { field: t('form.payerName') })
  if (isEmpty(form.payerNameEn)) errors.payerNameEn = t('errors.fieldRequired', { field: t('form.payerNameEn') })
  if (isEmpty(form.payerAddress)) errors.payerAddress = t('errors.fieldRequired', { field: t('form.payerAddress') })
  if (isEmpty(form.receiverName)) errors.receiverName = t('errors.fieldRequired', { field: t('form.receiverName') })
  if (isEmpty(form.receiverNameEn)) errors.receiverNameEn = t('errors.fieldRequired', { field: t('form.receiverNameEn') })
  if (isEmpty(form.receiverAddress)) errors.receiverAddress = t('errors.fieldRequired', { field: t('form.receiverAddress') })

  if (isEmpty(form.receiverBic)) {
    errors.receiverBic = t('errors.fieldRequired', { field: t('form.receiverBic') })
  } else if (form.receiverBic === DEMO_FAIL_BIC) {
    errors.receiverBic = t('errors.bicNotAdmitted')
  } else if (!ADMITTED_BICS[form.receiverBic]) {
    errors.receiverBic = t('errors.bicNotAdmitted')
  }

  if (isEmpty(form.receiverBankName)) {
    errors.receiverBankName = t('errors.fieldRequired', { field: t('form.receiverBankName') })
  }

  const amount = parseAmount(form.remittanceAmount)
  if (!amount.valid) {
    errors.remittanceAmount = t('errors.amountInvalid')
  } else if (form.scene === TRANSACTION_SCENES.CNY_OUT && amount.number > MOCK_PAYER_BALANCE_CNY) {
    errors.remittanceAmount = t('errors.balanceInsufficient')
  } else if (
    form.scene === TRANSACTION_SCENES.CNY_OUT &&
    amount.number > BALANCE_FAIL_THRESHOLD_CNY
  ) {
    errors.remittanceAmount = t('errors.balanceInsufficientDemo')
  } else if (
    form.scene === TRANSACTION_SCENES.FX_OUT &&
    amount.number > (MOCK_FX_POSITION[form.fxCurrency] ?? 0)
  ) {
    errors.remittanceAmount = t('errors.positionInsufficient', { currency: form.fxCurrency })
  }

  if (isEmpty(form.remittancePurpose)) {
    errors.remittancePurpose = t('errors.purposeRequired')
  } else if (SENSITIVE_PURPOSE_WORDS.some((w) => form.remittancePurpose.toLowerCase().includes(w.toLowerCase()))) {
    errors.remittancePurpose = t('errors.purposeSensitive')
  }

  if (isEmpty(form.settlementDate)) {
    errors.settlementDate = t('errors.fieldRequired', { field: t('form.settlementDate') })
  }

  return errors
}

export function validateStep2(form, uploadedFiles, t) {
  const errors = {}
  if (isEmpty(form.tradeType)) errors.tradeType = t('errors.fieldRequired', { field: t('form.tradeType') })
  if (isEmpty(form.goods)) errors.goods = t('errors.fieldRequired', { field: t('form.goods') })
  if (isEmpty(form.contractNo)) errors.contractNo = t('errors.fieldRequired', { field: t('form.contractNo') })
  if (uploadedFiles.length < 2) errors.uploads = t('errors.uploadMinFiles')
  return errors
}

export function hasErrors(errors) {
  return Object.keys(errors).length > 0
}

export { parseAmount }
