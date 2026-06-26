import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { emptyCnyOutForm, mockCnyOutFormDraft } from '../mock/crosschainForm.js'

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

export default function CnyOutForm() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ ...emptyCnyOutForm })

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleReset = () => setForm({ ...emptyCnyOutForm })

  const handleSaveDraft = () => {
    setForm({ ...mockCnyOutFormDraft })
    window.alert(t('ops.crosschain.cnyOut.saveDraftMock'))
  }

  const handleSubmit = () => {
    window.alert(t('ops.crosschain.cnyOut.submitMock'))
  }

  return (
    <div className="xc-cny-form">
      <div className="xc-tip-banner">
        <span className="xc-tip-icon" aria-hidden>
          <svg viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zm.75 3a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0V4.5zm-.75 7.25a.875.875 0 1 0 0-1.75.875.875 0 0 0 0 1.75z" />
          </svg>
        </span>
        <p>{t('ops.crosschain.cnyOut.tip')}</p>
      </div>

      <section className="xc-form-section">
        <h3 className="xc-form-section-title">{t('ops.crosschain.cnyOut.sectionPayer')}</h3>
        <div className="xc-form-grid xc-form-grid--2">
          <FormField label={t('ops.crosschain.cnyOut.payerName')} required>
            <input value={form.payerName} onChange={set('payerName')} placeholder={t('ops.crosschain.cnyOut.payerNamePh')} />
          </FormField>
          <FormField label={t('ops.crosschain.cnyOut.payerAccount')} hint={t('ops.crosschain.cnyOut.nameOrAccountHint')}>
            <input value={form.payerAccount} onChange={set('payerAccount')} placeholder={t('ops.crosschain.cnyOut.payerAccountPh')} />
          </FormField>
          <FormField label={t('ops.crosschain.cnyOut.payerWallet')}>
            <input value={form.payerWallet} onChange={set('payerWallet')} placeholder={t('ops.crosschain.cnyOut.payerWalletPh')} />
          </FormField>
          <FormField label={t('ops.crosschain.cnyOut.acctName')}>
            <input value={form.payerAcctName} onChange={set('payerAcctName')} placeholder={t('ops.crosschain.cnyOut.acctNamePh')} />
          </FormField>
          <FormField label={t('ops.crosschain.cnyOut.walletName')}>
            <input value={form.payerWalletName} onChange={set('payerWalletName')} placeholder={t('ops.crosschain.cnyOut.walletNamePh')} />
          </FormField>
          <FormField label={t('ops.crosschain.cnyOut.payerBank')} required>
            <select value={form.payerBank} onChange={set('payerBank')}>
              <option value="">{t('ops.crosschain.cnyOut.selectPlaceholder')}</option>
              <option value="ICBC">{t('ops.crosschain.cnyOut.bank_ICBC')}</option>
              <option value="BOC">{t('ops.crosschain.cnyOut.bank_BOC')}</option>
              <option value="CCB">{t('ops.crosschain.cnyOut.bank_CCB')}</option>
              <option value="ABC">{t('ops.crosschain.cnyOut.bank_ABC')}</option>
            </select>
          </FormField>
          <FormField label={t('ops.crosschain.cnyOut.payerIdType')}>
            <select value={form.payerIdType} onChange={set('payerIdType')}>
              <option value="">{t('ops.crosschain.cnyOut.selectPlaceholder')}</option>
              <option value="id_card">{t('ops.crosschain.cnyOut.idType_id_card')}</option>
              <option value="passport">{t('ops.crosschain.cnyOut.idType_passport')}</option>
              <option value="business_license">{t('ops.crosschain.cnyOut.idType_business_license')}</option>
            </select>
          </FormField>
          <FormField label={t('ops.crosschain.cnyOut.payerIdNo')}>
            <input value={form.payerIdNo} onChange={set('payerIdNo')} placeholder={t('ops.crosschain.cnyOut.payerIdNoPh')} />
          </FormField>
          <FormField label={t('ops.crosschain.cnyOut.payerPhone')} required>
            <input value={form.payerPhone} onChange={set('payerPhone')} placeholder={t('ops.crosschain.cnyOut.payerPhonePh')} />
          </FormField>
        </div>
      </section>

      <section className="xc-form-section">
        <h3 className="xc-form-section-title">{t('ops.crosschain.cnyOut.sectionPayee')}</h3>
        <div className="xc-form-grid xc-form-grid--2">
          <FormField label={t('ops.crosschain.cnyOut.payeeName')} required>
            <input value={form.payeeName} onChange={set('payeeName')} placeholder={t('ops.crosschain.cnyOut.payeeNamePh')} />
          </FormField>
          <FormField label={t('ops.crosschain.cnyOut.payeeAccount')}>
            <input value={form.payeeAccount} onChange={set('payeeAccount')} placeholder={t('ops.crosschain.cnyOut.payeeAccountPh')} />
          </FormField>
          <FormField label={t('ops.crosschain.cnyOut.payeeWallet')}>
            <input value={form.payeeWallet} onChange={set('payeeWallet')} placeholder={t('ops.crosschain.cnyOut.payeeWalletPh')} />
          </FormField>
          <FormField label={t('ops.crosschain.cnyOut.acctName')}>
            <input value={form.payeeAcctName} onChange={set('payeeAcctName')} placeholder={t('ops.crosschain.cnyOut.acctNamePh')} />
          </FormField>
          <FormField label={t('ops.crosschain.cnyOut.walletName')}>
            <input value={form.payeeWalletName} onChange={set('payeeWalletName')} placeholder={t('ops.crosschain.cnyOut.walletNamePh')} />
          </FormField>
          <FormField label={t('ops.crosschain.cnyOut.payeeBank')}>
            <input value={form.payeeBank} onChange={set('payeeBank')} placeholder={t('ops.crosschain.cnyOut.payeeBankPh')} />
          </FormField>
          <FormField label={t('ops.crosschain.cnyOut.payeeSwift')} required>
            <input value={form.payeeSwift} onChange={set('payeeSwift')} placeholder={t('ops.crosschain.cnyOut.payeeSwiftPh')} />
          </FormField>
          <FormField label={t('ops.crosschain.cnyOut.payeeCountry')} required>
            <select value={form.payeeCountry} onChange={set('payeeCountry')}>
              <option value="">{t('ops.crosschain.cnyOut.selectPlaceholder')}</option>
              <option value="TH">{t('ops.crosschain.cnyOut.country_TH')}</option>
              <option value="HK">{t('ops.crosschain.cnyOut.country_HK')}</option>
              <option value="SG">{t('ops.crosschain.cnyOut.country_SG')}</option>
              <option value="AE">{t('ops.crosschain.cnyOut.country_AE')}</option>
            </select>
          </FormField>
          <FormField label={t('ops.crosschain.cnyOut.payeeAddress')} span={2}>
            <textarea
              value={form.payeeAddress}
              onChange={set('payeeAddress')}
              placeholder={t('ops.crosschain.cnyOut.payeeAddressPh')}
              rows={3}
            />
          </FormField>
        </div>
      </section>

      <section className="xc-form-section">
        <h3 className="xc-form-section-title">{t('ops.crosschain.cnyOut.sectionTxn')}</h3>
        <div className="xc-form-grid xc-form-grid--2">
          <FormField label={t('ops.crosschain.cnyOut.amount')} required>
            <div className="xc-input-suffix">
              <input value={form.amount} onChange={set('amount')} placeholder={t('ops.crosschain.cnyOut.amountPh')} />
              <span className="xc-input-suffix-text">CNY</span>
            </div>
          </FormField>
          <FormField label={t('ops.crosschain.cnyOut.exchangeRate')} required hint={t('ops.crosschain.cnyOut.exchangeRateHint')}>
            <input value={form.exchangeRate} onChange={set('exchangeRate')} placeholder={t('ops.crosschain.cnyOut.exchangeRatePh')} />
          </FormField>
          <FormField label={t('ops.crosschain.cnyOut.feeBearer')}>
            <select value={form.feeBearer} onChange={set('feeBearer')}>
              <option value="none">{t('ops.crosschain.cnyOut.fee_none')}</option>
              <option value="DEBT">{t('ops.crosschain.cnyOut.fee_DEBT')}</option>
              <option value="CRED">{t('ops.crosschain.cnyOut.fee_CRED')}</option>
              <option value="SHAR">{t('ops.crosschain.cnyOut.fee_SHAR')}</option>
            </select>
          </FormField>
          <FormField label={t('ops.crosschain.cnyOut.txnType')} required>
            <select value={form.txnType} onChange={set('txnType')}>
              <option value="trade">{t('ops.crosschain.cnyOut.txnType_trade')}</option>
              <option value="service">{t('ops.crosschain.cnyOut.txnType_service')}</option>
              <option value="capital">{t('ops.crosschain.cnyOut.txnType_capital')}</option>
            </select>
          </FormField>
          <FormField label={t('ops.crosschain.cnyOut.txnSummary')}>
            <input value={form.txnSummary} onChange={set('txnSummary')} placeholder={t('ops.crosschain.cnyOut.txnSummaryPh')} />
          </FormField>
          <FormField label={t('ops.crosschain.cnyOut.settlementDate')}>
            <input type="date" value={form.settlementDate} onChange={set('settlementDate')} />
          </FormField>
        </div>
      </section>

      <section className="xc-form-section">
        <h3 className="xc-form-section-title">{t('ops.crosschain.cnyOut.sectionPurpose')}</h3>
        <div className="xc-form-grid xc-form-grid--1">
          <FormField label={t('ops.crosschain.cnyOut.purpose')} required>
            <textarea value={form.purpose} onChange={set('purpose')} placeholder={t('ops.crosschain.cnyOut.purposePh')} rows={4} />
          </FormField>
          <FormField label={t('ops.crosschain.cnyOut.contractNo')}>
            <input value={form.contractNo} onChange={set('contractNo')} placeholder={t('ops.crosschain.cnyOut.contractNoPh')} />
          </FormField>
        </div>
      </section>

      <div className="xc-form-footer">
        <button type="button" className="xc-btn-draft" onClick={handleSaveDraft}>
          {t('ops.crosschain.cnyOut.saveDraft')}
        </button>
        <button type="button" className="xc-btn-reset" onClick={handleReset}>
          {t('ops.crosschain.cnyOut.reset')}
        </button>
        <button type="button" className="xc-btn-submit" onClick={handleSubmit}>
          {t('ops.crosschain.cnyOut.submit')}
        </button>
      </div>
    </div>
  )
}
