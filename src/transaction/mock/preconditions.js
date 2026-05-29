import {
  ADMITTED_BICS,
  DEMO_FAIL_BIC,
  MOCK_FX_POSITION,
  MOCK_INSTITUTION_STATUS,
  MOCK_PAYER_BALANCE_CNY,
  SENSITIVE_PURPOSE_WORDS,
  TRANSACTION_SCENES,
} from './constants.js'
import { parseAmount } from './validation.js'

export function runPreconditionChecks(form, t) {
  const amount = parseAmount(form.remittanceAmount)
  const checks = []

  checks.push({
    id: 'institution',
    label: t('preconditions.institution'),
    ok: MOCK_INSTITUTION_STATUS === 'ENBL',
    detail: MOCK_INSTITUTION_STATUS === 'ENBL'
      ? t('preconditions.institutionOk')
      : t('preconditions.institutionFail'),
  })

  checks.push({
    id: 'whitelist',
    label: t('preconditions.whitelist'),
    ok: !form.payerAccount.startsWith('9999'),
    detail: !form.payerAccount.startsWith('9999')
      ? t('preconditions.whitelistOk')
      : t('preconditions.whitelistFail'),
  })

  const purposeSensitive = SENSITIVE_PURPOSE_WORDS.some((w) =>
    String(form.remittancePurpose).toLowerCase().includes(w.toLowerCase()),
  )
  checks.push({
    id: 'aml',
    label: t('preconditions.aml'),
    ok: !purposeSensitive && form.payerName !== 'BLOCKED ENTITY',
    detail: !purposeSensitive && form.payerName !== 'BLOCKED ENTITY'
      ? t('preconditions.amlOk')
      : t('preconditions.amlFail'),
  })

  const day = new Date().getDay()
  checks.push({
    id: 'businessDay',
    label: t('preconditions.businessDay'),
    ok: day !== 0 && day !== 6,
    detail: day !== 0 && day !== 6
      ? t('preconditions.businessDayOk')
      : t('preconditions.businessDayFail'),
  })

  let balanceOk = true
  if (amount.valid) {
    if (form.scene === TRANSACTION_SCENES.CNY_OUT) {
      balanceOk = amount.number <= MOCK_PAYER_BALANCE_CNY
    } else {
      balanceOk = amount.number <= (MOCK_FX_POSITION[form.fxCurrency] ?? 0)
    }
  }
  checks.push({
    id: 'balance',
    label: form.scene === TRANSACTION_SCENES.CNY_OUT
      ? t('preconditions.balanceCny')
      : t('preconditions.balanceFx'),
    ok: balanceOk,
    detail: balanceOk ? t('preconditions.balanceOk') : t('preconditions.balanceFail'),
  })

  const bicOk = form.receiverBic && form.receiverBic !== DEMO_FAIL_BIC && Boolean(ADMITTED_BICS[form.receiverBic])
  checks.push({
    id: 'bic',
    label: t('preconditions.bic'),
    ok: bicOk,
    detail: bicOk ? t('preconditions.bicOk') : t('preconditions.bicFail'),
  })

  return {
    checks,
    allPassed: checks.every((c) => c.ok),
  }
}
