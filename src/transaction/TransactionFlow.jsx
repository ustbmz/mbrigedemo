import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSwitch from '../LanguageSwitch.jsx'
import { FormInput, FormSection, FormSelect, KvGrid, PreconditionResults, SectionCard } from './components/FormFields.jsx'
import UploadList from './components/UploadList.jsx'
import { ADMITTED_BICS, CHANNEL_OPTIONS, FX_CURRENCIES, TRANSACTION_SCENES } from './mock/constants.js'
import { fetchFxRate, formatFxDisplay } from './mock/fxService.js'
import { runPreconditionChecks } from './mock/preconditions.js'
import { createInitialForm } from './mock/presets.js'
import { calculateFee, formatAmount, generateOrderNo, generateTxnId } from './mock/transactionService.js'
import { hasErrors, parseAmount, validateStep0, validateStep1, validateStep2 } from './mock/validation.js'

function formatDateTime(d) {
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

export default function TransactionFlow({ theme, onThemeChange, onBackHome, initialScene, initialFxCurrency = 'THB' }) {
  const { t, i18n } = useTranslation()
  const [flowStep, setFlowStep] = useState(0)
  const [loadingPhase, setLoadingPhase] = useState('')
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [selectedChannel, setSelectedChannel] = useState('mBridge')
  const [form, setForm] = useState(() => createInitialForm(initialScene || TRANSACTION_SCENES.FX_OUT, initialFxCurrency))
  const [stepErrors, setStepErrors] = useState({})
  const [touched, setTouched] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: '商业发票.pdf', size: 102400, status: 'uploaded' },
    { name: '购销合同.pdf', size: 204800, status: 'uploaded' },
  ])
  const [liveFxRate, setLiveFxRate] = useState(4.5)
  const [fxDate, setFxDate] = useState('')
  const [fxSource, setFxSource] = useState('default')
  const [txnResult, setTxnResult] = useState(null)
  const [receiptSubmitted, setReceiptSubmitted] = useState(false)
  const [checkResult, setCheckResult] = useState(null)

  const flowSteps = useMemo(() => {
    const steps = t('flow.steps', { returnObjects: true })
    return Array.isArray(steps) ? steps : []
  }, [t, i18n.language]) // eslint-disable-line react-hooks/exhaustive-deps

  const loadingTasks = useMemo(() => {
    const checking = t('loading.checking', { returnObjects: true })
    const processing = t('loading.processing', { returnObjects: true })
    return {
      checking: Array.isArray(checking) ? checking : [],
      processing: Array.isArray(processing) ? processing : [],
    }
  }, [t, i18n.language]) // eslint-disable-line react-hooks/exhaustive-deps

  const remittanceCurrency = form.scene === TRANSACTION_SCENES.CNY_OUT ? 'CNY' : form.fxCurrency
  const amountParsed = parseAmount(form.remittanceAmount)
  const feeInfo = amountParsed.valid
    ? calculateFee(amountParsed.number, form.feeBearer, remittanceCurrency)
    : null

  const cnyEquivalent = !amountParsed.valid
    ? null
    : form.scene === TRANSACTION_SCENES.CNY_OUT
      ? amountParsed.number
      : amountParsed.number / liveFxRate

  const fxRateDisplay = form.scene === TRANSACTION_SCENES.CNY_OUT
    ? t('flow.step4.cnyFixedRate')
    : formatFxDisplay('CNY', liveFxRate, form.fxCurrency)

  const updateForm = (patch) => setForm((prev) => ({ ...prev, ...patch }))

  const handleSceneChange = (scene) => {
    const fxCurrency = scene === TRANSACTION_SCENES.FX_OUT ? form.fxCurrency || 'THB' : 'THB'
    setForm(createInitialForm(scene, fxCurrency))
    setStepErrors({})
    setTouched(false)
    setTxnResult(null)
    setReceiptSubmitted(false)
    setCheckResult(null)
  }

  const handleFxCurrencyChange = (fxCurrency) => {
    setForm(createInitialForm(TRANSACTION_SCENES.FX_OUT, fxCurrency))
    setStepErrors({})
  }

  const loadFxRate = useCallback(async () => {
    if (form.scene === TRANSACTION_SCENES.CNY_OUT) return
    const result = await fetchFxRate(form.fxCurrency)
    setLiveFxRate(result.rate)
    setFxDate(result.date)
    setFxSource(result.source)
  }, [form.fxCurrency, form.scene])

  useEffect(() => {
    setTimeout(() => { void loadFxRate() }, 0)
  }, [loadFxRate])

  useEffect(() => {
    if (flowStep !== 3 && flowStep !== 5) return

    let finishTimer
    let intervalTimer

    if (flowStep === 3) {
      const result = runPreconditionChecks(form, t)

      setTimeout(() => {
        setCheckResult(result)
        setLoadingPhase('checking')
        setLoadingProgress(0)
      }, 0)

      intervalTimer = window.setInterval(() => {
        setLoadingProgress((prev) => Math.min(prev + 1, loadingTasks.checking.length))
      }, 800)

      finishTimer = window.setTimeout(() => {
        window.clearInterval(intervalTimer)
        setLoadingPhase('')
        setLoadingProgress(0)
        if (result.allPassed) {
          setFlowStep(4)
        } else {
          setFlowStep(2)
          setStepErrors({ preconditions: t('errors.preconditionsFailed') })
        }
      }, Math.max(loadingTasks.checking.length * 800, 3000))
    }

    if (flowStep === 5) {
      setTimeout(() => {
        setLoadingPhase('processing')
        setLoadingProgress(0)
      }, 0)

      intervalTimer = window.setInterval(() => {
        setLoadingProgress((prev) => Math.min(prev + 1, loadingTasks.processing.length))
      }, 800)

      finishTimer = window.setTimeout(() => {
        window.clearInterval(intervalTimer)
        setLoadingPhase('')
        setLoadingProgress(0)
        const now = new Date()
        setTxnResult({
          txnId: generateTxnId(),
          orderNo: generateOrderNo(),
          completedAt: formatDateTime(now),
        })
        setFlowStep(6)
      }, Math.max(loadingTasks.processing.length * 800, 3000))
    }

    return () => {
      if (finishTimer) window.clearTimeout(finishTimer)
      if (intervalTimer) window.clearInterval(intervalTimer)
    }
  }, [flowStep, form, loadingTasks.checking.length, loadingTasks.processing.length, t])

  const validateCurrentStep = () => {
    let errors = {}
    if (flowStep === 0) {
      const err = validateStep0(form, t)
      if (err) errors.scene = err
      if (selectedChannel !== 'mBridge') errors.channel = t('errors.channelMbridgeOnly')
    } else if (flowStep === 1) {
      errors = validateStep1(form, t)
    } else if (flowStep === 2) {
      errors = validateStep2(form, uploadedFiles, t)
    }
    setStepErrors(errors)
    setTouched(true)
    return !hasErrors(errors)
  }

  const handleNext = () => {
    if (!validateCurrentStep()) return
    setStepErrors({})
    setFlowStep((s) => s + 1)
  }

  const handlePrev = () => setFlowStep((s) => s - 1)

  const progress = Math.round(((flowStep + 1) / flowSteps.length) * 100)
  const canPrev = flowStep > 0
  const canNext = flowStep < flowSteps.length - 1 && !loadingPhase
  const lockPreviousSteps = flowStep >= 5 && flowStep <= 7

  const feeBearerOptions = [
    { value: 'DEBT', label: t('form.feeDebt') },
    { value: 'CRED', label: t('form.feeCred') },
    { value: 'SHAR', label: t('form.feeShar') },
  ]

  const sceneOptions = [
    { value: TRANSACTION_SCENES.CNY_OUT, label: t(`scene.${TRANSACTION_SCENES.CNY_OUT}`) },
    { value: TRANSACTION_SCENES.FX_OUT, label: t(`scene.${TRANSACTION_SCENES.FX_OUT}`) },
  ]

  const fxOptions = FX_CURRENCIES.map((c) => ({ value: c, label: t(`currency.${c}`) }))

  const formattedAmount = amountParsed.valid
    ? formatAmount(amountParsed.number, remittanceCurrency)
    : '-'

  const stepContent = [
    /* Step 0: Scene & Channel */
    <SectionCard title={t('flow.step0.sectionTitle')}>
      <FormSection title={t('flow.step0.sceneTitle')}>
        <FormSelect
          label={t('flow.step0.labelScene')}
          value={form.scene}
          options={sceneOptions}
          onChange={(e) => handleSceneChange(e.target.value)}
        />
        {form.scene === TRANSACTION_SCENES.FX_OUT ? (
          <FormSelect
            label={t('flow.step0.labelFxCurrency')}
            value={form.fxCurrency}
            options={fxOptions}
            onChange={(e) => handleFxCurrencyChange(e.target.value)}
          />
        ) : null}
        <FormSelect
          label={t('flow.step1.labelChannel')}
          value={selectedChannel}
          options={CHANNEL_OPTIONS.map((c) => ({ value: c, label: c }))}
          onChange={(e) => setSelectedChannel(e.target.value)}
          error={touched ? stepErrors.channel : ''}
        />
        <div className="kv-item">
          <span className="label">{t('flow.step1.labelRouting')}</span>
          <strong>{t('flow.step1.routingValue')}</strong>
        </div>
        <div className="kv-item">
          <span className="label">{t('flow.step1.labelEta')}</span>
          <strong>{t('flow.step1.etaValue')}</strong>
        </div>
      </FormSection>
      <div className="page-tip">{t(`scene.${form.scene}Desc`)}</div>
      {touched && stepErrors.scene ? <p className="error-text">{stepErrors.scene}</p> : null}
    </SectionCard>,

    /* Step 1: Payer/Payee & Amount */
    <SectionCard title={t('flow.step2.sectionTitle')}>
      <FormSection title={t('form.sectionPayer')}>
        <FormSelect
          label={t('form.payerIdType')}
          value={form.payerIdType}
          options={[
            { value: 'account', label: t('form.idTypeAccount') },
            { value: 'wallet', label: t('form.idTypeWallet') },
          ]}
          onChange={(e) => updateForm({ payerIdType: e.target.value })}
        />
        {form.payerIdType === 'account' ? (
          <>
            <FormInput label={t('form.payerAccount')} value={form.payerAccount}
              onChange={(e) => updateForm({ payerAccount: e.target.value })}
              error={touched ? stepErrors.payerId : ''} />
            <FormInput label={t('form.payerAccountName')} value={form.payerAccountName}
              onChange={(e) => updateForm({ payerAccountName: e.target.value })} />
          </>
        ) : (
          <>
            <FormInput label={t('form.payerWalletId')} value={form.payerWalletId}
              onChange={(e) => updateForm({ payerWalletId: e.target.value })}
              error={touched ? stepErrors.payerId : ''} />
            <FormInput label={t('form.payerWalletName')} value={form.payerWalletName}
              onChange={(e) => updateForm({ payerWalletName: e.target.value })} />
          </>
        )}
        <FormInput label={t('form.payerName')} value={form.payerName}
          onChange={(e) => updateForm({ payerName: e.target.value })}
          error={touched ? stepErrors.payerName : ''} />
        <FormInput label={t('form.payerNameEn')} value={form.payerNameEn}
          onChange={(e) => updateForm({ payerNameEn: e.target.value })}
          error={touched ? stepErrors.payerNameEn : ''} />
        <FormInput label={t('form.payerAddress')} value={form.payerAddress} className="span-2"
          onChange={(e) => updateForm({ payerAddress: e.target.value })}
          error={touched ? stepErrors.payerAddress : ''} />
      </FormSection>

      <FormSection title={t('form.sectionReceiver')}>
        <FormSelect
          label={t('form.receiverIdType')}
          value={form.receiverIdType}
          options={[
            { value: 'account', label: t('form.idTypeAccount') },
            { value: 'wallet', label: t('form.idTypeWallet') },
          ]}
          onChange={(e) => updateForm({ receiverIdType: e.target.value })}
        />
        {form.receiverIdType === 'account' ? (
          <>
            <FormInput label={t('form.receiverAccount')} value={form.receiverAccount}
              onChange={(e) => updateForm({ receiverAccount: e.target.value })}
              error={touched ? stepErrors.receiverId : ''} />
            <FormInput label={t('form.receiverAccountName')} value={form.receiverAccountName}
              onChange={(e) => updateForm({ receiverAccountName: e.target.value })} />
          </>
        ) : (
          <>
            <FormInput label={t('form.receiverWalletId')} value={form.receiverWalletId}
              onChange={(e) => updateForm({ receiverWalletId: e.target.value })}
              error={touched ? stepErrors.receiverId : ''} />
            <FormInput label={t('form.receiverWalletName')} value={form.receiverWalletName}
              onChange={(e) => updateForm({ receiverWalletName: e.target.value })} />
          </>
        )}
        <FormInput label={t('form.receiverName')} value={form.receiverName}
          onChange={(e) => updateForm({ receiverName: e.target.value })}
          error={touched ? stepErrors.receiverName : ''} />
        <FormInput label={t('form.receiverNameEn')} value={form.receiverNameEn}
          onChange={(e) => updateForm({ receiverNameEn: e.target.value })}
          error={touched ? stepErrors.receiverNameEn : ''} />
        <FormInput label={t('form.receiverAddress')} value={form.receiverAddress} className="span-2"
          onChange={(e) => updateForm({ receiverAddress: e.target.value })}
          error={touched ? stepErrors.receiverAddress : ''} />
        <FormInput label={t('form.receiverBic')} value={form.receiverBic}
          onChange={(e) => {
            const bic = e.target.value.toUpperCase()
            updateForm({
              receiverBic: bic,
              receiverBankName: ADMITTED_BICS[bic] || form.receiverBankName,
            })
          }}
          error={touched ? stepErrors.receiverBic : ''} />
        <FormInput label={t('form.receiverBankName')} value={form.receiverBankName}
          onChange={(e) => updateForm({ receiverBankName: e.target.value })}
          error={touched ? stepErrors.receiverBankName : ''} />
      </FormSection>

      <FormSection title={t('form.sectionRemittance')}>
        <FormInput
          label={t('form.remittanceAmount', { currency: remittanceCurrency })}
          value={form.remittanceAmount}
          onChange={(e) => updateForm({ remittanceAmount: e.target.value })}
          error={touched ? stepErrors.remittanceAmount : ''}
        />
        <FormInput label={t('form.remittancePurpose')} value={form.remittancePurpose}
          onChange={(e) => updateForm({ remittancePurpose: e.target.value })}
          error={touched ? stepErrors.remittancePurpose : ''} />
        <FormInput label={t('form.remarks')} value={form.remarks}
          onChange={(e) => updateForm({ remarks: e.target.value })} />
        <FormInput label={t('form.settlementDate')} type="date" value={form.settlementDate}
          onChange={(e) => updateForm({ settlementDate: e.target.value })}
          error={touched ? stepErrors.settlementDate : ''} />
        <FormSelect label={t('form.feeBearer')} value={form.feeBearer} options={feeBearerOptions}
          onChange={(e) => updateForm({ feeBearer: e.target.value })} />
        {form.scene === TRANSACTION_SCENES.FX_OUT && cnyEquivalent != null ? (
          <div className="kv-item">
            <span className="label">{t('form.cnyEquivalent')}</span>
            <strong>{formatAmount(cnyEquivalent, 'CNY')}</strong>
          </div>
        ) : null}
      </FormSection>
      <div className="page-tip">{t('form.demoHints')}</div>
    </SectionCard>,

    /* Step 2: Trade & Upload */
    <SectionCard title={t('flow.step3.sectionTitle')}>
      <FormSection title={t('form.sectionTrade')}>
        <FormInput label={t('form.tradeType')} value={form.tradeType}
          onChange={(e) => updateForm({ tradeType: e.target.value })}
          error={touched ? stepErrors.tradeType : ''} />
        <FormInput label={t('form.goods')} value={form.goods}
          onChange={(e) => updateForm({ goods: e.target.value })}
          error={touched ? stepErrors.goods : ''} />
        <FormInput label={t('form.contractNo')} value={form.contractNo}
          onChange={(e) => updateForm({ contractNo: e.target.value })}
          error={touched ? stepErrors.contractNo : ''} />
        <FormInput label={t('form.customsMode')} value={form.customsMode}
          onChange={(e) => updateForm({ customsMode: e.target.value })} />
      </FormSection>
      <UploadList files={uploadedFiles} onChange={setUploadedFiles} />
      {touched && stepErrors.uploads ? <p className="error-text">{stepErrors.uploads}</p> : null}
      {touched && stepErrors.preconditions ? (
        <div className="error-banner">{stepErrors.preconditions}</div>
      ) : null}
    </SectionCard>,

    null, /* Step 3: auto check loading */

    /* Step 4: Confirmation */
    <SectionCard title={t('flow.step4.sectionTitle')}>
      <KvGrid items={[
        { label: t('flow.step0.labelScene'), value: t(`scene.${form.scene}`) },
        { label: t('form.remittanceAmount', { currency: remittanceCurrency }), value: formattedAmount },
        { label: t('flow.step4.labelFx'), value: fxRateDisplay },
        { label: t('flow.step4.labelFee'), value: feeInfo ? `${formatAmount(feeInfo.fee, feeInfo.feeCurrency)} (${t(`form.fee${feeInfo.feeBearer}`)})` : '-' },
        { label: t('flow.step4.labelSettlement'), value: t('flow.step4.settlementValue') },
        { label: t('form.receiverBic'), value: form.receiverBic },
        { label: t('form.remittancePurpose'), value: form.remittancePurpose },
        { label: t('form.settlementDate'), value: form.settlementDate },
      ]} />
      {checkResult ? (
        <>
          <h4 className="sub-heading">{t('flow.step4.checkSummary')}</h4>
          <PreconditionResults checks={checkResult.checks} />
        </>
      ) : null}
    </SectionCard>,

    null, /* Step 5: processing */

    /* Step 6: Success */
    <SectionCard title={t('flow.step6.sectionTitle')}>
      <div className="success-box">
        <h4>{t('flow.step6.successHeading')}</h4>
        <KvGrid items={[
          { label: t('flow.step6.labelTxnId'), value: txnResult?.txnId || '-' },
          { label: t('flow.step6.labelOrderNo'), value: txnResult?.orderNo || '-' },
          { label: t('flow.step6.labelPayAmt'), value: formattedAmount },
          { label: t('flow.step6.labelFee'), value: feeInfo ? formatAmount(feeInfo.fee, feeInfo.feeCurrency) : '-' },
          { label: t('flow.step6.labelDoneAt'), value: txnResult?.completedAt || '-' },
        ]} />
      </div>
    </SectionCard>,

    /* Step 7: Receipt */
    <SectionCard title={t('flow.step7.sectionTitle')}>
      <KvGrid items={[
        { label: t('flow.step7.labelReceiptStatus'), value: receiptSubmitted ? t('flow.step7.receiptSubmitted') : t('flow.step7.receiptStatus') },
        { label: t('flow.step7.labelDeclareScope'), value: t('flow.step7.declareScope') },
        { label: t('flow.step7.labelDeclareSystem'), value: t('flow.step7.declareSystem') },
        { label: t('flow.step7.labelSuggest'), value: receiptSubmitted ? t('flow.step7.suggestDone') : t('flow.step7.suggest') },
      ]} />
      <div className="action-row">
        <button type="button" className="btn secondary" onClick={() => window.alert(t('flow.step7.downloadMock'))}>
          {t('flow.step7.download')}
        </button>
        <button
          type="button"
          className="btn primary"
          disabled={receiptSubmitted}
          onClick={() => {
            setReceiptSubmitted(true)
            window.alert(t('flow.step7.submitMock'))
          }}
        >
          {receiptSubmitted ? t('flow.step7.submitted') : t('flow.step7.submit')}
        </button>
      </div>
    </SectionCard>,
  ]

  return (
    <main className={`app theme-${theme}`}>
      <header className="header">
        <div>
          <h1>{t('flow.headerTitle')}</h1>
          <p className="flow-subtitle">{t(`scene.${form.scene}`)} · {remittanceCurrency}</p>
        </div>
        <div className="header-actions">
          <button type="button" className="btn secondary small" onClick={onBackHome}>
            {t('flow.backHome')}
          </button>
          <LanguageSwitch />
          <div className="theme-switch" role="group" aria-label={t('flow.themeGroup')}>
            <button type="button" className={`theme-dot theme-dot-default ${theme === 'default' ? 'active' : ''}`} onClick={() => onThemeChange('default')} aria-label={t('flow.themeDefault')} />
            <button type="button" className={`theme-dot theme-dot-dark ${theme === 'dark' ? 'active' : ''}`} onClick={() => onThemeChange('dark')} aria-label={t('flow.themeDark')} />
            <button type="button" className={`theme-dot theme-dot-green ${theme === 'green' ? 'active' : ''}`} onClick={() => onThemeChange('green')} aria-label={t('flow.themeGreen')} />
          </div>
          <div className="badge">{t('flow.progress', { pct: progress })}</div>
        </div>
      </header>

      <div className="workspace">
        <aside className="stepper">
          {flowSteps.map((step, index) => {
            const state = index < flowStep ? 'done' : index === flowStep ? 'active' : 'todo'
            const disableJumpBack = lockPreviousSteps && index < flowStep
            return (
              <button
                key={index}
                type="button"
                className={`step-item ${state}`}
                disabled={disableJumpBack}
                onClick={() => { if (!disableJumpBack) setFlowStep(index) }}
              >
                <span>{index + 1}</span>
                <em>{step}</em>
              </button>
            )
          })}
        </aside>
        <section className="panel">
          <div className="panel-title">
            <h2>{flowSteps[flowStep]}</h2>
            <small>
              {form.scene !== TRANSACTION_SCENES.CNY_OUT ? (
                <>
                  {t('flow.rateLine', {
                    rate: fxRateDisplay,
                    date: fxDate ? t('flow.rateDate', { date: fxDate }) : '',
                    fallback: fxSource === 'default' ? t('flow.rateFallback') : '',
                  })}
                </>
              ) : null}
            </small>
          </div>
          <div className="step-page" data-step={flowStep + 1}>
            <div className="step-page-header">
              <span className="step-page-chip">STEP {flowStep + 1}</span>
              <strong className="step-page-title">{flowSteps[flowStep]}</strong>
            </div>
            <div className="step-page-body">
              {flowStep === 3 ? (
                <div className="processing-inline-tip">{t('flow.checkingTip')}</div>
              ) : flowStep === 5 ? (
                <div className="processing-inline-tip">{t('flow.submittingTip')}</div>
              ) : (
                stepContent[flowStep]
              )}
            </div>
          </div>
        </section>
      </div>

      <footer className="footer-nav">
        <button type="button" className="btn secondary" onClick={handlePrev} disabled={!canPrev}>
          {t('flow.footerPrev')}
        </button>
        <button type="button" className="btn primary" onClick={handleNext} disabled={!canNext}>
          {t('flow.footerNext')}
        </button>
      </footer>

      {loadingPhase ? (
        <div className="loading-overlay" role="status" aria-live="polite">
          <div className="loading-card">
            <div className="loader-ring" />
            <p>{loadingPhase === 'checking' ? t('flow.loadingTitleChecking') : t('flow.loadingTitleProcessing')}</p>
            <small>{loadingPhase === 'checking' ? t('flow.loadingSubChecking') : t('flow.loadingSubProcessing')}</small>
            <div className="loading-progress-track">
              <div className="loading-progress-fill" style={{ width: `${(loadingProgress / loadingTasks[loadingPhase].length) * 100}%` }} />
            </div>
            <div className="loading-task-list">
              {loadingTasks[loadingPhase].map((task, index) => {
                const done = index < loadingProgress
                return (
                  <div key={index} className={`loading-task ${done ? 'done' : ''}`}>
                    <span>{done ? '✓' : index + 1}</span>
                    <em>{task}</em>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}
