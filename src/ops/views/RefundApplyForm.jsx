import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { mockOriginalTxnLookup } from '../mock/data.js'

const EMPTY_FORM = {
  originalTxnNo: '',
  refundType: '',
  amount: '',
  currency: 'CNY',
  reason: '',
  feeBearer: 'DEBT',
  description: '',
}

export default function RefundApplyForm({ onSubmit }) {
  const { t } = useTranslation()
  const [form, setForm] = useState(EMPTY_FORM)
  const [lookupKey, setLookupKey] = useState('')

  const originalTxn = useMemo(() => {
    const key = lookupKey.trim()
    if (!key) return null
    return mockOriginalTxnLookup[key] ?? null
  }, [lookupKey])

  const handleOriginalTxnBlur = () => {
    setLookupKey(form.originalTxnNo.trim())
  }

  const handleReset = () => {
    setForm(EMPTY_FORM)
    setLookupKey('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.originalTxnNo || !form.refundType || !form.amount || !form.reason) {
      window.alert(t('ops.exception.formRequired'))
      return
    }
    onSubmit?.(form)
    window.alert(t('ops.exception.submitRefundMock', { id: form.originalTxnNo }))
    handleReset()
  }

  return (
    <>
      <section className="exc-card">
        <div className="exc-card-title">
          <span className="exc-card-icon exc-card-icon--refund" aria-hidden>
            <svg viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zm-.75 2.5v3.5H4.5l2.75 2.75 2.75-2.75H8.75V4h-1.5z" />
            </svg>
          </span>
          <h3>{t('ops.exception.refundApplyTitle')}</h3>
        </div>

        <form className="exc-form" onSubmit={handleSubmit}>
          <div className="exc-form-grid">
            <div className="exc-field">
              <label>
                {t('ops.exception.fieldOriginalTxnNo')}
                <span className="exc-required">*</span>
              </label>
              <input
                value={form.originalTxnNo}
                onChange={(e) => setForm((f) => ({ ...f, originalTxnNo: e.target.value }))}
                onBlur={handleOriginalTxnBlur}
                placeholder={t('ops.exception.fieldOriginalTxnNoPh')}
              />
            </div>
            <div className="exc-field">
              <label>
                {t('ops.exception.fieldRefundType')}
                <span className="exc-required">*</span>
              </label>
              <select
                value={form.refundType}
                onChange={(e) => setForm((f) => ({ ...f, refundType: e.target.value }))}
              >
                <option value="">{t('ops.exception.selectPlaceholder')}</option>
                <option value="original_route">{t('ops.exception.refundType_original_route')}</option>
                <option value="manual">{t('ops.exception.refundType_manual')}</option>
                <option value="partial">{t('ops.exception.refundType_partial')}</option>
              </select>
            </div>
            <div className="exc-field">
              <label>
                {t('ops.exception.fieldAmount')}
                <span className="exc-required">*</span>
              </label>
              <input
                value={form.amount}
                onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                placeholder={t('ops.exception.fieldAmountPh')}
              />
            </div>
            <div className="exc-field">
              <label>
                {t('ops.exception.fieldCurrency')}
                <span className="exc-required">*</span>
              </label>
              <select
                value={form.currency}
                onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value }))}
              >
                <option value="CNY">{t('ops.exception.currency_CNY')}</option>
                <option value="USD">{t('ops.exception.currency_USD')}</option>
                <option value="THB">{t('ops.exception.currency_THB')}</option>
                <option value="HKD">{t('ops.exception.currency_HKD')}</option>
              </select>
            </div>
            <div className="exc-field">
              <label>
                {t('ops.exception.fieldReason')}
                <span className="exc-required">*</span>
              </label>
              <select
                value={form.reason}
                onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
              >
                <option value="">{t('ops.exception.selectPlaceholder')}</option>
                <option value="settlement_fail">{t('ops.exception.reason_settlement_fail')}</option>
                <option value="name_mismatch">{t('ops.exception.reason_name_mismatch')}</option>
                <option value="account_frozen">{t('ops.exception.reason_account_frozen')}</option>
                <option value="customer_request">{t('ops.exception.reason_customer_request')}</option>
              </select>
            </div>
            <div className="exc-field">
              <label>{t('ops.exception.fieldFeeBearer')}</label>
              <select
                value={form.feeBearer}
                onChange={(e) => setForm((f) => ({ ...f, feeBearer: e.target.value }))}
              >
                <option value="DEBT">{t('ops.exception.feeBearer_DEBT')}</option>
                <option value="CRED">{t('ops.exception.feeBearer_CRED')}</option>
                <option value="SHAR">{t('ops.exception.feeBearer_SHAR')}</option>
              </select>
            </div>
          </div>

          <div className="exc-field exc-field--full">
            <label>{t('ops.exception.fieldDescription')}</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder={t('ops.exception.fieldDescriptionPh')}
            />
          </div>

          <div className="exc-form-actions">
            <button type="submit" className="exc-btn-primary">
              {t('ops.exception.submitRefund')}
            </button>
            <button type="button" className="exc-btn-reset" onClick={handleReset}>
              {t('ops.exception.reset')}
            </button>
          </div>
        </form>
      </section>

      <section className="exc-card">
        <div className="exc-card-title">
          <span className="exc-card-icon" aria-hidden>
            <svg viewBox="0 0 16 16" fill="currentColor">
              <path d="M3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v11a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 13.5v-11zM4.5 2.5v11h7v-11h-7zM5.5 5h5v1h-5V5zm0 2.5h3.5v1H5.5v-1z" />
            </svg>
          </span>
          <h3>{t('ops.exception.originalTxnTitle')}</h3>
        </div>

        {originalTxn ? (
          <div className="exc-original-grid">
            <div className="exc-original-kv">
              <span className="exc-original-k">{t('ops.exception.fieldOriginalTxnNo')}</span>
              <span className="exc-original-v">{originalTxn.txnNo}</span>
            </div>
            <div className="exc-original-kv">
              <span className="exc-original-k">{t('ops.exception.colTxnId')}</span>
              <span className="exc-original-v">{originalTxn.txnId}</span>
            </div>
            <div className="exc-original-kv">
              <span className="exc-original-k">{t('ops.exception.colScene')}</span>
              <span className="exc-original-v">{t(`ops.exception.scene_${originalTxn.scene}`)}</span>
            </div>
            <div className="exc-original-kv">
              <span className="exc-original-k">{t('ops.exception.colAmount')}</span>
              <span className="exc-original-v">
                {originalTxn.currency} {originalTxn.amount.toLocaleString()}
              </span>
            </div>
            <div className="exc-original-kv">
              <span className="exc-original-k">{t('ops.exception.colPayerInst')}</span>
              <span className="exc-original-v">{originalTxn.payerInst}</span>
            </div>
            <div className="exc-original-kv">
              <span className="exc-original-k">{t('ops.exception.colReceiverInst')}</span>
              <span className="exc-original-v">{originalTxn.receiverInst}</span>
            </div>
            <div className="exc-original-kv">
              <span className="exc-original-k">{t('ops.exception.colTxnTime')}</span>
              <span className="exc-original-v">{originalTxn.txnTime}</span>
            </div>
            <div className="exc-original-kv">
              <span className="exc-original-k">{t('ops.exception.colStatus')}</span>
              <span className="exc-original-v">
                <span className="exc-status exc-status--failed">{t('ops.exception.txnStatus_failed')}</span>
              </span>
            </div>
          </div>
        ) : (
          <div className="exc-empty">
            <span className="exc-empty-icon" aria-hidden>
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM7.25 4.5v4.25L10.03 10.53l.707-.707L8.5 8.25V4.5h-1.25z" />
              </svg>
            </span>
            <p>{t('ops.exception.originalTxnEmpty')}</p>
          </div>
        )}
      </section>
    </>
  )
}
