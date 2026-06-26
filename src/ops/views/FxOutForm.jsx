import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { emptyFxOutForm, mockFxOutFormDraft } from '../mock/crosschainForm.js'

function RequiredMark() {
  return <span className="xc-required">*</span>
}

function FormField({ label, required, hint, span = 1, children }) {
  return (
    <div className={`xc-form-field ${span > 1 ? `xc-form-field--span${span}` : ''}`}>
      <label>
        {label}
        {required ? <RequiredMark /> : null}
      </label>
      {children}
      {hint ? <p className="xc-field-hint">{hint}</p> : null}
    </div>
  )
}

export default function FxOutForm() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ ...emptyFxOutForm })

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleReset = () => setForm({ ...emptyFxOutForm })

  const handleSaveDraft = () => {
    setForm({ ...mockFxOutFormDraft })
    window.alert(t('ops.crosschain.fxOut.saveDraftMock'))
  }

  const handleSubmit = () => {
    window.alert(t('ops.crosschain.fxOut.submitMock'))
  }

  const handleAmountCalc = () => {
    window.alert(t('ops.crosschain.fxOut.amountCalcMock'))
  }

  const common = (key) => t(`ops.crosschain.cnyOut.${key}`)

  return (
    <div className="xc-fx-form">
      <div className="xc-tip-banner">
        <span className="xc-tip-icon" aria-hidden>
          <svg viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zm.75 3a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0V4.5zm-.75 7.25a.875.875 0 1 0 0-1.75.875.875 0 0 0 0 1.75z" />
          </svg>
        </span>
        <p>{t('ops.crosschain.fxOut.tip')}</p>
      </div>

      <section className="xc-form-section">
        <h3 className="xc-form-section-title">{common('sectionPayer')}</h3>
        <div className="xc-form-grid xc-form-grid--2">
          <FormField label={common('payerName')} required>
            <input value={form.payerName} onChange={set('payerName')} placeholder={common('payerNamePh')} />
          </FormField>
          <FormField label={common('payerAccount')} hint={t('ops.crosschain.fxOut.nameOrAccountHint')}>
            <input value={form.payerAccount} onChange={set('payerAccount')} placeholder={common('payerAccountPh')} />
          </FormField>
          <FormField label={t('ops.crosschain.fxOut.payerAddress')}>
            <input value={form.payerAddress} onChange={set('payerAddress')} placeholder={t('ops.crosschain.fxOut.payerAddressPh')} />
          </FormField>
          <FormField label={common('acctName')}>
            <input value={form.payerAcctName} onChange={set('payerAcctName')} placeholder={common('acctNamePh')} />
          </FormField>
          <FormField label={common('payerIdType')}>
            <select value={form.payerIdType} onChange={set('payerIdType')}>
              <option value="">{common('selectPlaceholder')}</option>
              <option value="id_card">{common('idType_id_card')}</option>
              <option value="passport">{common('idType_passport')}</option>
              <option value="business_license">{common('idType_business_license')}</option>
            </select>
          </FormField>
          <FormField label={common('payerIdNo')}>
            <input value={form.payerIdNo} onChange={set('payerIdNo')} placeholder={common('payerIdNoPh')} />
          </FormField>
          <FormField label={common('payerPhone')} required>
            <input value={form.payerPhone} onChange={set('payerPhone')} placeholder={common('payerPhonePh')} />
          </FormField>
        </div>
      </section>

      <section className="xc-form-section">
        <h3 className="xc-form-section-title">{common('sectionPayee')}</h3>
        <div className="xc-form-grid xc-form-grid--2">
          <FormField label={common('payeeName')} required>
            <input value={form.payeeName} onChange={set('payeeName')} placeholder={common('payeeNamePh')} />
          </FormField>
          <FormField label={common('payeeAccount')}>
            <input value={form.payeeAccount} onChange={set('payeeAccount')} placeholder={common('payeeAccountPh')} />
          </FormField>
          <FormField label={t('ops.crosschain.fxOut.payeeAddressShort')}>
            <input value={form.payeeAddress} onChange={set('payeeAddress')} placeholder={t('ops.crosschain.fxOut.payeeAddressShortPh')} />
          </FormField>
          <FormField label={common('acctName')}>
            <input value={form.payeeAcctName} onChange={set('payeeAcctName')} placeholder={common('acctNamePh')} />
          </FormField>
          <FormField label={common('payeeBank')}>
            <input value={form.payeeBank} onChange={set('payeeBank')} placeholder={common('payeeBankPh')} />
          </FormField>
          <FormField label={common('payeeSwift')} hint={t('ops.crosschain.fxOut.payeeSwiftHint')}>
            <input value={form.payeeSwift} onChange={set('payeeSwift')} placeholder={common('payeeSwiftPh')} />
          </FormField>
          <FormField label={common('payeeCountry')} required>
            <select value={form.payeeCountry} onChange={set('payeeCountry')}>
              <option value="">{common('selectPlaceholder')}</option>
              <option value="TH">{common('country_TH')}</option>
              <option value="HK">{common('country_HK')}</option>
              <option value="SG">{common('country_SG')}</option>
              <option value="AE">{common('country_AE')}</option>
              <option value="US">{t('ops.crosschain.fxOut.country_US')}</option>
              <option value="GB">{t('ops.crosschain.fxOut.country_GB')}</option>
            </select>
          </FormField>
          <FormField label={common('payeeAddress')} span={2}>
            <textarea
              value={form.payeeAddressDetail}
              onChange={set('payeeAddressDetail')}
              placeholder={common('payeeAddressPh')}
              rows={3}
            />
          </FormField>
        </div>
      </section>

      <section className="xc-form-section">
        <h3 className="xc-form-section-title">{common('sectionTxn')}</h3>
        <div className="xc-form-grid xc-form-grid--2">
          <FormField label={t('ops.crosschain.fxOut.remitCurrency')} required>
            <select value={form.remitCurrency} onChange={set('remitCurrency')}>
              <option value="">{common('selectPlaceholder')}</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="HKD">HKD</option>
              <option value="THB">THB</option>
              <option value="JPY">JPY</option>
              <option value="AUD">AUD</option>
            </select>
          </FormField>
          <FormField label={common('amount')} required>
            <div className="xc-input-addon">
              <input value={form.amount} onChange={set('amount')} placeholder={common('amountPh')} />
              <button type="button" className="xc-input-addon-btn" onClick={handleAmountCalc} aria-label={t('ops.crosschain.fxOut.amountCalc')}>
                ···
              </button>
            </div>
          </FormField>
          <FormField label={common('exchangeRate')} required hint={common('exchangeRateHint')}>
            <input value={form.exchangeRate} onChange={set('exchangeRate')} placeholder={common('exchangeRatePh')} />
          </FormField>
          <FormField label={common('feeBearer')}>
            <select value={form.feeBearer} onChange={set('feeBearer')}>
              <option value="CRED">{t('ops.crosschain.fxOut.fee_CRED')}</option>
              <option value="DEBT">{common('fee_DEBT')}</option>
              <option value="SHAR">{common('fee_SHAR')}</option>
              <option value="none">{common('fee_none')}</option>
            </select>
          </FormField>
          <FormField label={common('txnType')}>
            <select value={form.txnType} onChange={set('txnType')}>
              <option value="trade">{common('txnType_trade')}</option>
              <option value="service">{common('txnType_service')}</option>
              <option value="capital">{common('txnType_capital')}</option>
            </select>
          </FormField>
          <FormField label={common('txnSummary')}>
            <input value={form.txnSummary} onChange={set('txnSummary')} placeholder={common('txnSummaryPh')} />
          </FormField>
          <FormField label={t('ops.crosschain.fxOut.remitDate')}>
            <input type="date" value={form.remitDate} onChange={set('remitDate')} />
          </FormField>
        </div>
      </section>

      <section className="xc-form-section">
        <h3 className="xc-form-section-title">{common('sectionPurpose')}</h3>
        <div className="xc-form-grid xc-form-grid--1">
          <FormField label={common('purpose')} required>
            <textarea value={form.purpose} onChange={set('purpose')} placeholder={common('purposePh')} rows={4} />
          </FormField>
          <FormField label={common('contractNo')}>
            <input value={form.contractNo} onChange={set('contractNo')} placeholder={common('contractNoPh')} />
          </FormField>
        </div>
      </section>

      <div className="xc-form-footer">
        <button type="button" className="xc-btn-draft" onClick={handleSaveDraft}>
          {common('saveDraft')}
        </button>
        <button type="button" className="xc-btn-reset" onClick={handleReset}>
          {common('reset')}
        </button>
        <button type="button" className="xc-btn-submit" onClick={handleSubmit}>
          {common('submit')}
        </button>
      </div>
    </div>
  )
}
