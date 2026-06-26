import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { emptyWhitelistForm, mockWhitelistFormDraft } from '../mock/whitelistForm.js'

function RequiredMark() {
  return <span className="wl-required">*</span>
}

function FormField({ label, required, hint, span = 1, children }) {
  return (
    <div className={`wl-form-field ${span > 1 ? `wl-form-field--span${span}` : ''}`}>
      <label>
        {label}
        {required ? <RequiredMark /> : null}
      </label>
      {children}
      {hint ? <p className="wl-field-hint">{hint}</p> : null}
    </div>
  )
}

function DateField({ label, required, hint, value, onChange }) {
  return (
    <FormField label={label} required={required} hint={hint}>
      <div className="wl-date-input">
        <input type="date" value={value} onChange={onChange} />
        <svg className="wl-date-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
          <path d="M4.5 2a.5.5 0 0 0-1 0v1h-1A1.5 1.5 0 0 0 1 4.5V12A1.5 1.5 0 0 0 2.5 13.5h11A1.5 1.5 0 0 0 15 12V4.5A1.5 1.5 0 0 0 13.5 3h-1v-1a.5.5 0 0 0-1 0v1h-5V2zM2.5 4.5h11V12h-11V4.5z" />
        </svg>
      </div>
    </FormField>
  )
}

export default function WhitelistAddForm() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ ...emptyWhitelistForm })

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleReset = () => setForm({ ...emptyWhitelistForm, type: form.type })

  const handleSaveDraft = () => {
    setForm({ ...mockWhitelistFormDraft })
    window.alert(t('ops.whitelist.add.saveDraftMock'))
  }

  const handleSubmit = () => {
    window.alert(t('ops.whitelist.add.submitMock'))
  }

  const typeLabel = (key) => t(`ops.whitelist.add.typeOption_${key}`)

  return (
    <div className="wl-add-form">
      <div className="wl-tip-banner">
        <span className="wl-tip-icon" aria-hidden>💡</span>
        <p>{t('ops.whitelist.add.tip')}</p>
      </div>

      <section className="wl-form-section">
        <h3 className="wl-form-section-title">{t('ops.whitelist.add.sectionType')}</h3>
        <div className="wl-form-grid wl-form-grid--1">
          <FormField label={t('ops.whitelist.filterType')} required>
            <select value={form.type} onChange={set('type')}>
              <option value="customer">{typeLabel('customer')}</option>
              <option value="ip">{typeLabel('ip')}</option>
              <option value="wallet">{typeLabel('wallet')}</option>
            </select>
          </FormField>
        </div>
      </section>

      {form.type === 'customer' && (
        <section className="wl-form-section">
          <h3 className="wl-form-section-title">{t('ops.whitelist.add.sectionCustomer')}</h3>
          <div className="wl-form-grid wl-form-grid--2">
            <FormField label={t('ops.whitelist.add.customerId')} required>
              <input value={form.customerId} onChange={set('customerId')} placeholder={t('ops.whitelist.add.customerIdPh')} />
            </FormField>
            <FormField label={t('ops.whitelist.add.customerName')} required>
              <input value={form.customerName} onChange={set('customerName')} placeholder={t('ops.whitelist.add.customerNamePh')} />
            </FormField>
            <FormField label={t('ops.whitelist.add.idType')} required>
              <select value={form.idType} onChange={set('idType')}>
                <option value="">{t('ops.whitelist.add.selectIdType')}</option>
                <option value="id_card">{t('ops.whitelist.add.idType_id_card')}</option>
                <option value="passport">{t('ops.whitelist.add.idType_passport')}</option>
                <option value="business_license">{t('ops.whitelist.add.idType_business_license')}</option>
              </select>
            </FormField>
            <FormField label={t('ops.whitelist.add.idNumber')} required>
              <input value={form.idNumber} onChange={set('idNumber')} placeholder={t('ops.whitelist.add.idNumberPh')} />
            </FormField>
            <FormField label={t('ops.whitelist.add.riskLevel')} required>
              <select value={form.riskLevel} onChange={set('riskLevel')}>
                <option value="">{t('ops.whitelist.add.selectRiskLevel')}</option>
                <option value="low">{t('ops.whitelist.add.risk_low')}</option>
                <option value="medium">{t('ops.whitelist.add.risk_medium')}</option>
                <option value="high">{t('ops.whitelist.add.risk_high')}</option>
              </select>
            </FormField>
            <FormField label={t('ops.whitelist.add.industry')}>
              <select value={form.industry} onChange={set('industry')}>
                <option value="">{t('ops.whitelist.add.selectIndustry')}</option>
                <option value="finance">{t('ops.whitelist.add.industry_finance')}</option>
                <option value="trade">{t('ops.whitelist.add.industry_trade')}</option>
                <option value="manufacturing">{t('ops.whitelist.add.industry_manufacturing')}</option>
              </select>
            </FormField>
          </div>
        </section>
      )}

      {form.type === 'ip' && (
        <section className="wl-form-section">
          <h3 className="wl-form-section-title">{t('ops.whitelist.add.sectionIp')}</h3>
          <div className="wl-form-grid wl-form-grid--2">
            <FormField label={t('ops.whitelist.add.ipAddress')} required>
              <input value={form.ipAddress} onChange={set('ipAddress')} placeholder={t('ops.whitelist.add.ipAddressPh')} />
            </FormField>
            <FormField label={t('ops.whitelist.add.ipDesc')} required>
              <input value={form.ipDesc} onChange={set('ipDesc')} placeholder={t('ops.whitelist.add.ipDescPh')} />
            </FormField>
          </div>
        </section>
      )}

      {form.type === 'wallet' && (
        <section className="wl-form-section">
          <h3 className="wl-form-section-title">{t('ops.whitelist.add.sectionWallet')}</h3>
          <div className="wl-form-grid wl-form-grid--2">
            <FormField label={t('ops.whitelist.add.walletId')} required>
              <input value={form.walletId} onChange={set('walletId')} placeholder={t('ops.whitelist.add.walletIdPh')} />
            </FormField>
            <FormField label={t('ops.whitelist.add.walletName')} required>
              <input value={form.walletName} onChange={set('walletName')} placeholder={t('ops.whitelist.add.walletNamePh')} />
            </FormField>
          </div>
        </section>
      )}

      <section className="wl-form-section">
        <h3 className="wl-form-section-title">{t('ops.whitelist.add.sectionValidity')}</h3>
        <div className="wl-form-grid wl-form-grid--2">
          <DateField
            label={t('ops.whitelist.add.effectiveFrom')}
            required
            value={form.effectiveFrom}
            onChange={set('effectiveFrom')}
          />
          <DateField
            label={t('ops.whitelist.add.effectiveTo')}
            hint={t('ops.whitelist.add.effectiveToHint')}
            value={form.effectiveTo}
            onChange={set('effectiveTo')}
          />
          <FormField label={t('ops.whitelist.add.whitelistStatus')} required>
            <select value={form.status} onChange={set('status')}>
              <option value="">{t('ops.whitelist.add.selectStatus')}</option>
              <option value="active">{t('ops.whitelist.status_active')}</option>
              <option value="invalid">{t('ops.whitelist.status_invalid')}</option>
            </select>
          </FormField>
        </div>
      </section>

      <div className="wl-form-footer">
        <button type="button" className="wl-btn-draft" onClick={handleSaveDraft}>
          {t('ops.whitelist.add.saveDraft')}
        </button>
        <button type="button" className="wl-btn-form-reset" onClick={handleReset}>
          {t('ops.whitelist.reset')}
        </button>
        <button type="button" className="wl-btn-submit" onClick={handleSubmit}>
          {t('ops.whitelist.add.submit')}
        </button>
      </div>
    </div>
  )
}
