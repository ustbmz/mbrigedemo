import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { emptyInstitutionForm, mockInstitutionFormDraft } from '../mock/institutionForm.js'

function RequiredMark() {
  return <span className="inst-required">*</span>
}

function FormField({ label, required, hint, span = 1, children }) {
  return (
    <div className={`inst-form-field ${span > 1 ? `inst-form-field--span${span}` : ''}`}>
      <label>
        {label}
        {required ? <RequiredMark /> : null}
      </label>
      {children}
      {hint ? <p className="inst-field-hint">{hint}</p> : null}
    </div>
  )
}

export default function InstitutionAddForm({ onBack }) {
  const { t } = useTranslation()
  const [form, setForm] = useState({ ...emptyInstitutionForm })

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleReset = () => setForm({ ...emptyInstitutionForm })

  const handleSaveDraft = () => {
    setForm({ ...mockInstitutionFormDraft })
    window.alert(t('ops.institution.add.saveDraftMock'))
  }

  const handleSubmit = () => {
    window.alert(t('ops.institution.add.submitMock'))
  }

  return (
    <div className="inst-add-form">
      <button type="button" className="inst-back-link" onClick={onBack}>
        ← {t('ops.institution.add.backToList')}
      </button>

      <section className="inst-form-section">
        <h3 className="inst-form-section-title">{t('ops.institution.add.sectionBasic')}</h3>
        <div className="inst-form-grid inst-form-grid--3">
          <FormField label={t('ops.institution.add.opCode')} required hint={t('ops.institution.add.opCodeHint')}>
            <input value={form.opCode} readOnly disabled placeholder={t('ops.institution.add.opCodePh')} />
          </FormField>
          <FormField label={t('ops.institution.add.nameZh')} required hint={t('ops.institution.add.nameZhHint')}>
            <input value={form.nameZh} onChange={set('nameZh')} placeholder={t('ops.institution.add.nameZhPh')} />
          </FormField>
          <FormField label={t('ops.institution.add.nameEn')} required hint={t('ops.institution.add.nameEnHint')}>
            <input value={form.nameEn} onChange={set('nameEn')} placeholder={t('ops.institution.add.nameEnPh')} />
          </FormField>
          <FormField label={t('ops.institution.add.instType')} required>
            <select value={form.instType} onChange={set('instType')}>
              <option value="">{t('ops.institution.add.selectType')}</option>
              <option value="commercial">{t('ops.institution.typeCommercial')}</option>
              <option value="central">{t('ops.institution.typeCentral')}</option>
            </select>
          </FormField>
          <FormField label={t('ops.institution.add.address')} required span={2}>
            <textarea value={form.address} onChange={set('address')} placeholder={t('ops.institution.add.addressPh')} rows={3} />
          </FormField>
          <FormField label={t('ops.institution.add.phone')} required>
            <input value={form.phone} onChange={set('phone')} placeholder={t('ops.institution.add.phonePh')} />
          </FormField>
          <FormField label={t('ops.institution.add.email')} required>
            <input value={form.email} onChange={set('email')} placeholder={t('ops.institution.add.emailPh')} />
          </FormField>
          <FormField label={t('ops.institution.add.currency')} required>
            <select value={form.currency} onChange={set('currency')}>
              <option value="">{t('ops.institution.add.selectCurrency')}</option>
              <option value="CNY">CNY</option>
              <option value="USD">USD</option>
              <option value="HKD">HKD</option>
              <option value="THB">THB</option>
              <option value="AED">AED</option>
            </select>
          </FormField>
        </div>
      </section>

      <section className="inst-form-section">
        <h3 className="inst-form-section-title">{t('ops.institution.add.sectionWallet')}</h3>
        <div className="inst-form-grid inst-form-grid--2">
          <FormField label={t('ops.institution.add.walletNo')} required hint={t('ops.institution.add.walletNoHint')}>
            <input value={form.walletNo} onChange={set('walletNo')} placeholder={t('ops.institution.add.walletNoPh')} />
          </FormField>
          <FormField label={t('ops.institution.add.walletName')} required hint={t('ops.institution.add.walletNameHint')}>
            <input value={form.walletName} onChange={set('walletName')} placeholder={t('ops.institution.add.walletNamePh')} />
          </FormField>
        </div>
      </section>

      <section className="inst-form-section">
        <h3 className="inst-form-section-title">{t('ops.institution.add.sectionUser')}</h3>
        <div className="inst-form-grid inst-form-grid--3">
          <FormField label={t('ops.institution.add.userName')} required>
            <input value={form.userName} onChange={set('userName')} placeholder={t('ops.institution.add.userNamePh')} />
          </FormField>
          <FormField label={t('ops.institution.add.userCountry')} required>
            <select value={form.country} onChange={set('country')}>
              <option value="">{t('ops.institution.add.selectCountry')}</option>
              <option value="CN">中国</option>
              <option value="HK">香港</option>
              <option value="TH">泰国</option>
              <option value="AE">阿联酋</option>
            </select>
          </FormField>
          <FormField label={t('ops.institution.add.region')} required>
            <input value={form.region} onChange={set('region')} placeholder={t('ops.institution.add.regionPh')} />
          </FormField>
        </div>
      </section>

      <section className="inst-form-section">
        <h3 className="inst-form-section-title">{t('ops.institution.add.sectionBank')}</h3>
        <div className="inst-form-grid inst-form-grid--3">
          <FormField label={t('ops.institution.add.bankName')} required>
            <input value={form.bankName} onChange={set('bankName')} placeholder={t('ops.institution.add.bankNamePh')} />
          </FormField>
          <FormField label={t('ops.institution.add.bankAccount')} required>
            <input value={form.bankAccount} onChange={set('bankAccount')} placeholder={t('ops.institution.add.bankAccountPh')} />
          </FormField>
          <FormField label={t('ops.institution.add.bic')} required>
            <input value={form.bic} onChange={set('bic')} placeholder={t('ops.institution.add.bicPh')} />
          </FormField>
          <FormField label={t('ops.institution.add.lei')} required>
            <input value={form.lei} onChange={set('lei')} placeholder={t('ops.institution.add.leiPh')} />
          </FormField>
        </div>
      </section>

      <div className="inst-form-footer">
        <button type="button" className="inst-btn-draft" onClick={handleSaveDraft}>
          {t('ops.institution.add.saveDraft')}
        </button>
        <button type="button" className="inst-btn-form-reset" onClick={handleReset}>
          {t('ops.institution.reset')}
        </button>
        <button type="button" className="inst-btn-submit" onClick={handleSubmit}>
          {t('ops.institution.add.submit')}
        </button>
      </div>
    </div>
  )
}
