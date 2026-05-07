import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './App.css'
import AdminPage from './AdminPage.jsx'
import LanguageSwitch from './LanguageSwitch.jsx'

function SectionCard({ title, children }) {
  return (
    <section className="section-card">
      <h3>{title}</h3>
      {children}
    </section>
  )
}

function KvGrid({ items }) {
  return (
    <div className="kv-grid">
      {items.map((item) => (
        <div className="kv-item" key={item.label}>
          <span className="label">{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </div>
  )
}

function UploadList() {
  const { t } = useTranslation()
  return (
    <div className="upload-list">
      <div className="upload-dropzone">
        <p>{t('upload.hint')}</p>
        <button type="button" className="btn secondary upload-trigger">
          {t('upload.choose')}
        </button>
      </div>
      <div className="upload-item">
        <span>{t('upload.file1')}</span>
        <em>{t('upload.status')}</em>
      </div>
      <div className="upload-item">
        <span>{t('upload.file2')}</span>
        <em>{t('upload.status')}</em>
      </div>
      <div className="upload-item">
        <span>{t('upload.file3')}</span>
        <em>{t('upload.status')}</em>
      </div>
    </div>
  )
}

function HomeDashboard({ onStartMBrige }) {
  const { t } = useTranslation()
  return (
    <section className="home-dashboard">
      <div className="dashboard-topbar">
        <strong>{t('home.topbarBrand')}</strong>
        <div className="dashboard-search">{t('home.searchPlaceholder')}</div>
        <div className="topbar-actions">
          <LanguageSwitch />
          <span>{t('home.navMsg')}</span>
          <span>{t('home.navHelp')}</span>
          <span>{t('home.navStaff')}</span>
        </div>
      </div>

      <div className="dashboard-body">
        <div className="dashboard-left">
          <div className="welcome-card">
            <h3>{t('home.welcomeTitle')}</h3>
            <p>{t('home.welcomeLastLogin')}</p>
            <small>{t('home.welcomeSerial')}</small>
          </div>

          <div className="quick-panel">
            <h4>{t('home.quickTitle')}</h4>
            <div className="quick-grid">
              <button type="button" className="quick-item"><span>{t('home.quickOpen')}</span></button>
              <button type="button" className="quick-item"><span>{t('home.quickPay')}</span></button>
              <button type="button" className="quick-item"><span>{t('home.quickReview')}</span></button>
              <button type="button" className="quick-item"><span>{t('home.quickQuery')}</span></button>
              <button type="button" className="quick-item"><span>{t('home.quickFx')}</span></button>
              <button type="button" className="quick-item"><span>{t('home.quickClose')}</span></button>
              <button type="button" className="quick-item"><span>{t('home.quick360')}</span></button>
              <button type="button" className="quick-item mbridge-entry" onClick={onStartMBrige}>
                <span>{t('home.quickMbridge')}</span>
              </button>
            </div>
          </div>

          <div className="data-panel">
            <h4>{t('home.overviewTitle')}</h4>
            <div className="kpi-row">
              <div className="kpi-item"><small>{t('home.kpiCount')}</small><strong>128</strong></div>
              <div className="kpi-item"><small>{t('home.kpiTotal')}</small><strong>58,420,000</strong></div>
              <div className="kpi-item"><small>{t('home.kpiSuccess')}</small><strong>99.21%</strong></div>
            </div>
          </div>

          <div className="data-panel">
            <h4>{t('home.recentTitle')}</h4>
            <div className="mini-table">
              <div className="mini-table-head">
                <span>{t('home.colRef')}</span><span>{t('home.colAmt')}</span><span>{t('home.colStatus')}</span>
              </div>
              <div className="mini-table-row">
                <span>MB-20260420-0011</span><span>CNY 680,000 / THB 3,060,000</span><em className="ok">{t('home.txnStatusOk')}</em>
              </div>
              <div className="mini-table-row">
                <span>MB-20260420-0010</span><span>CNY 220,000 / AED 112,200</span><em className="wait">{t('home.txnStatusWait')}</em>
              </div>
              <div className="mini-table-row">
                <span>MB-20260420-0009</span><span>CNY 1,000,000 / THB 4,500,000</span><em className="ok">{t('home.txnStatusOk')}</em>
              </div>
            </div>
          </div>
        </div>

        <aside className="dashboard-right">
          <div className="right-card">
            <h4>{t('home.todoTitle')}</h4>
            <div className="todo-metrics">
              <div><strong>12</strong><small>{t('home.todoReview')}</small></div>
              <div><strong>26</strong><small>{t('home.todoMemo')}</small></div>
            </div>
          </div>

          <div className="right-card">
            <h4>{t('home.noticeTitle')}</h4>
            <ul className="notice-list">
              <li>{t('home.notice1')}</li>
              <li>{t('home.notice2')}</li>
              <li>{t('home.notice3')}</li>
            </ul>
          </div>

          <div className="right-card">
            <h4>{t('home.rateTitle')}</h4>
            <ul className="rate-list">
              <li><span>CNY/THB</span><strong>4.5000</strong></li>
              <li><span>CNY/AED</span><strong>0.5100</strong></li>
              <li><span>CNY/HKD</span><strong>1.0810</strong></li>
            </ul>
          </div>

          <div className="right-card">
            <h4>{t('home.sysTitle')}</h4>
            <div className="status-grid">
              <div><span>{t('home.sysMbridge')}</span><em className="ok">{t('home.sysStatusOk')}</em></div>
              <div><span>{t('home.sysAml')}</span><em className="ok">{t('home.sysStatusOk')}</em></div>
              <div><span>{t('home.sysFxApi')}</span><em className="warn">{t('home.sysStatusWarn')}</em></div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

function App() {
  const { t, i18n } = useTranslation()
  const [view, setView] = useState('login')
  const [flowStep, setFlowStep] = useState(0)
  const [loadingPhase, setLoadingPhase] = useState('')
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [selectedChannel, setSelectedChannel] = useState('mBrige')
  const [receiveAmountInput, setReceiveAmountInput] = useState('')
  const [receiveAmountTouched, setReceiveAmountTouched] = useState(false)
  const [liveFxRate, setLiveFxRate] = useState(4.5)
  const [fxDate, setFxDate] = useState('')
  const [fxError, setFxError] = useState('')
  const [theme, setTheme] = useState('default')
  const [selectedLoginRole, setSelectedLoginRole] = useState('teller')
  const [loginTimeText, setLoginTimeText] = useState('')

  const trade = useMemo(
    () => ({
      orderNo: t('trade.orderNo'),
      payerCompany: t('trade.payerCompany'),
      payerBank: t('trade.payerBank'),
      payCurrency: t('trade.payCurrency'),
      payAmount: t('trade.payAmount'),
      receiverCompany: t('trade.receiverCompany'),
      receiverBank: t('trade.receiverBank'),
      receiveCurrency: t('trade.receiveCurrency'),
      receiveAmount: t('trade.receiveAmount'),
      fxRate: t('trade.fxRate'),
      tradeType: t('trade.tradeType'),
      goods: t('trade.goods'),
      payerAcct: t('trade.payerAcct'),
      receiverAcct: t('trade.receiverAcct'),
      contractNo: t('trade.contractNo'),
    }),
    [t, i18n.language], // eslint-disable-line react-hooks/exhaustive-deps -- `t` is stable; invalidate on locale change
  )

  const flowSteps = useMemo(() => {
    const steps = t('flow.steps', { returnObjects: true })
    return Array.isArray(steps) ? steps : []
  }, [t, i18n.language]) // eslint-disable-line react-hooks/exhaustive-deps -- `t` is stable; invalidate on locale change

  const loadingTasks = useMemo(() => {
    const checking = t('loading.checking', { returnObjects: true })
    const processing = t('loading.processing', { returnObjects: true })
    return {
      checking: Array.isArray(checking) ? checking : [],
      processing: Array.isArray(processing) ? processing : [],
    }
  }, [t, i18n.language]) // eslint-disable-line react-hooks/exhaustive-deps -- `t` is stable; invalidate on locale change

  const formatDateTime = (d) => {
    const pad = (n) => String(n).padStart(2, '0')
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  }

  const progress = useMemo(
    () => Math.round(((flowStep + 1) / flowSteps.length) * 100),
    [flowStep, flowSteps.length],
  )
  const channelOptions = ['MBrige', 'SWIFT', 'CIPS']
  const fxRateNumber = liveFxRate
  const fixedPayAmountRmb = Number(trade.payAmount.replaceAll(',', ''))
  const requiredReceiveAmount = fixedPayAmountRmb * fxRateNumber
  const sanitizedReceiveAmount = receiveAmountInput.replaceAll(',', '').trim()
  const receiveAmountNumber = Number(sanitizedReceiveAmount)
  const receiveAmountError = useMemo(() => {
    if (!sanitizedReceiveAmount) return t('errors.receiveEmpty', { currency: trade.receiveCurrency })
    if (!/^\d+(\.\d{1,2})?$/.test(sanitizedReceiveAmount)) return t('errors.receiveFormat')
    if (Number.isNaN(receiveAmountNumber)) return t('errors.receiveNaN')
    if (receiveAmountNumber <= 0) return t('errors.receiveNonPositive')
    if (Math.abs(receiveAmountNumber - requiredReceiveAmount) > 0.0001) {
      return t('errors.receiveMismatch', {
        required: requiredReceiveAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        recvCurrency: trade.receiveCurrency,
        payAmount: fixedPayAmountRmb.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        payCurrency: trade.payCurrency,
      })
    }
    return ''
  }, [fixedPayAmountRmb, receiveAmountNumber, requiredReceiveAmount, sanitizedReceiveAmount, trade, t])
  const displayReceiveAmountError = receiveAmountTouched ? receiveAmountError : ''
  const isReceiveAmountValid = !receiveAmountError
  const canDerivePayAmount = !Number.isNaN(receiveAmountNumber) && receiveAmountNumber > 0
  const formattedReceiveAmount = canDerivePayAmount
    ? receiveAmountNumber.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : receiveAmountInput || '-'
  const formattedPayAmount = fixedPayAmountRmb.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  const fxRateDisplay = `1 ${trade.payCurrency} = ${fxRateNumber.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })} ${trade.receiveCurrency}`

  const formatReceiveAmountInput = () => {
    setReceiveAmountTouched(true)
    const sanitized = receiveAmountInput.replaceAll(',', '').trim()
    const amountNumber = Number(sanitized)
    if (!sanitized || Number.isNaN(amountNumber) || amountNumber <= 0) return
    setReceiveAmountInput(amountNumber.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
  }

  const loadFxRate = useCallback(async () => {
    try {
      setFxError('')
      let nextRate = 0
      let nextDate = ''

      try {
        const primaryResponse = await fetch('https://api.frankfurter.app/latest?from=CNY&to=THB')
        if (!primaryResponse.ok) throw new Error('primary failed')
        const primaryData = await primaryResponse.json()
        nextRate = Number(primaryData?.rates?.THB)
        nextDate = primaryData?.date || ''
        if (!Number.isFinite(nextRate) || nextRate <= 0) throw new Error('primary invalid')
      } catch {
        const backupResponse = await fetch('https://open.er-api.com/v6/latest/CNY')
        if (!backupResponse.ok) throw new Error('backup failed')
        const backupData = await backupResponse.json()
        nextRate = Number(backupData?.rates?.THB)
        const unixTime = Number(backupData?.time_last_update_unix)
        nextDate = Number.isFinite(unixTime) && unixTime > 0
          ? new Date(unixTime * 1000).toISOString().slice(0, 10)
          : ''
        if (!Number.isFinite(nextRate) || nextRate <= 0) throw new Error('backup invalid')
      }

      setLiveFxRate(nextRate)
      setFxDate(nextDate)
    } catch {
      setFxError(t('errors.fxRateFailed'))
    }
  }, [t])

  useEffect(() => {
    // Defer to avoid triggering cascading renders inside the effect body.
    setTimeout(() => {
      void loadFxRate()
    }, 0)
  }, [loadFxRate])

  useEffect(() => {
    if (view !== 'flow') {
      // Defer state reset to avoid cascading renders in effect body.
      setTimeout(() => {
        setLoadingPhase('')
        setLoadingProgress(0)
      }, 0)
      return
    }
    let finishTimer
    let intervalTimer
    if (flowStep === 3) {
      setTimeout(() => {
        setLoadingPhase('checking')
        setLoadingProgress(0)
      }, 0)
      intervalTimer = window.setInterval(() => {
        setLoadingProgress((prev) => Math.min(prev + 1, loadingTasks.checking.length))
      }, 1000)
      finishTimer = window.setTimeout(() => {
        window.clearInterval(intervalTimer)
        setLoadingPhase('')
        setLoadingProgress(0)
        setFlowStep(4)
      }, 5000)
    } else if (flowStep === 5) {
      setTimeout(() => {
        setLoadingPhase('processing')
        setLoadingProgress(0)
      }, 0)
      intervalTimer = window.setInterval(() => {
        setLoadingProgress((prev) => Math.min(prev + 1, loadingTasks.processing.length))
      }, 1000)
      finishTimer = window.setTimeout(() => {
        window.clearInterval(intervalTimer)
        setLoadingPhase('')
        setLoadingProgress(0)
        setFlowStep(6)
      }, 5000)
    } else {
      setTimeout(() => {
        setLoadingPhase('')
        setLoadingProgress(0)
      }, 0)
    }
    return () => {
      if (finishTimer) window.clearTimeout(finishTimer)
      if (intervalTimer) window.clearInterval(intervalTimer)
    }
  }, [flowStep, view, loadingTasks.checking.length, loadingTasks.processing.length])

  const stepContent = [
    <SectionCard title={t('flow.step1.sectionTitle')}>
      <div className="kv-grid">
        <div className="kv-item">
          <span className="label">{t('flow.step1.labelChannel')}</span>
          <div>
            <select
              className="channel-select"
              value={selectedChannel}
              onChange={(event) => setSelectedChannel(event.target.value)}
            >
              {channelOptions.map((channel) => (
                <option key={channel} value={channel}>
                  {channel}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="kv-item">
          <span className="label">{t('flow.step1.labelSelected')}</span>
          <strong>{selectedChannel || t('flow.step1.notSelected')}</strong>
        </div>
        <div className="kv-item">
          <span className="label">{t('flow.step1.labelRouting')}</span>
          <strong>{t('flow.step1.routingValue')}</strong>
        </div>
        <div className="kv-item">
          <span className="label">{t('flow.step1.labelEta')}</span>
          <strong>{t('flow.step1.etaValue')}</strong>
        </div>
      </div>
    </SectionCard>,
    <SectionCard title={t('flow.step2.sectionTitle')}>
      <KvGrid items={[
        { label: t('flow.step2.labelPayerCo'), value: trade.payerCompany },
        { label: t('flow.step2.labelPayerBank'), value: trade.payerBank },
        { label: t('flow.step2.labelPayerAcct'), value: trade.payerAcct },
        { label: t('flow.step2.labelReceiverCo'), value: trade.receiverCompany },
        {
          label: t('flow.step2.labelAmountInput'),
          value: (
            <div className="amount-field-wrap">
              <input
                className={`amount-input ${displayReceiveAmountError ? 'invalid' : ''}`}
                value={receiveAmountInput}
                onChange={(event) => {
                  setReceiveAmountTouched(true)
                  setReceiveAmountInput(event.target.value)
                }}
                onBlur={formatReceiveAmountInput}
                placeholder={t('flow.step2.placeholderAmount', { currency: trade.receiveCurrency })}
              />
              <span className="amount-currency">{trade.receiveCurrency}</span>
              {displayReceiveAmountError ? (
                <small className="amount-inline-text error-text">
                  <span className="tip-icon" aria-hidden="true">!</span>
                  {displayReceiveAmountError}
                </small>
              ) : null}
            </div>
          ),
        },
        { label: t('flow.step2.labelReceiverBank'), value: trade.receiverBank },
        { label: t('flow.step2.labelReceiverAcct'), value: trade.receiverAcct },
        { label: t('flow.step2.labelPayDerived'), value: `${formattedPayAmount} ${trade.payCurrency}` },
      ]} />
      <div className="page-tip">
        {t('flow.step2.tipRule', {
          recv: trade.receiveCurrency,
          pay: trade.payCurrency,
          required: requiredReceiveAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
          payAmt: formattedPayAmount,
        })}
      </div>
    </SectionCard>,
    <SectionCard title={t('flow.step3.sectionTitle')}>
      <KvGrid items={[
        { label: t('flow.step3.labelTradeType'), value: trade.tradeType },
        { label: t('flow.step3.labelGoods'), value: trade.goods },
        { label: t('flow.step3.labelContract'), value: trade.contractNo },
        { label: t('flow.step3.labelCustoms'), value: t('flow.step3.customsValue') },
      ]} />
      <UploadList />
    </SectionCard>,
    null,
    <SectionCard title={t('flow.step4.sectionTitle')}>
      <KvGrid items={[
        { label: t('flow.step4.labelFx'), value: fxRateDisplay },
        { label: t('flow.step4.labelRecvInput'), value: `${formattedReceiveAmount} ${trade.receiveCurrency}` },
        { label: t('flow.step4.labelPayDerived'), value: `${formattedPayAmount} ${trade.payCurrency}` },
        { label: t('flow.step4.labelFee'), value: t('flow.step4.feeValue') },
        { label: t('flow.step4.labelSettlement'), value: t('flow.step4.settlementValue') },
      ]} />
    </SectionCard>,
    null,
    <SectionCard title={t('flow.step6.sectionTitle')}>
      <div className="success-box">
        <h4>{t('flow.step6.successHeading')}</h4>
        <KvGrid items={[
          { label: t('flow.step6.labelTxnId'), value: t('flow.step6.txnIdValue') },
          { label: t('flow.step6.labelPayAmt'), value: `${formattedPayAmount} ${trade.payCurrency}` },
          { label: t('flow.step6.labelRecvAmt'), value: `${formattedReceiveAmount} ${trade.receiveCurrency}` },
          { label: t('flow.step6.labelDoneAt'), value: t('flow.step6.doneAtValue') },
        ]} />
      </div>
    </SectionCard>,
    <SectionCard title={t('flow.step7.sectionTitle')}>
      <KvGrid items={[
        { label: t('flow.step7.labelReceiptStatus'), value: t('flow.step7.receiptStatus') },
        { label: t('flow.step7.labelDeclareScope'), value: t('flow.step7.declareScope') },
        { label: t('flow.step7.labelDeclareSystem'), value: t('flow.step7.declareSystem') },
        { label: t('flow.step7.labelSuggest'), value: t('flow.step7.suggest') },
      ]} />
      <div className="action-row">
        <button type="button" className="btn secondary">{t('flow.step7.download')}</button>
        <button type="button" className="btn primary">{t('flow.step7.submit')}</button>
      </div>
    </SectionCard>,
  ]

  const canPrev = flowStep > 0
  const canNext = flowStep < flowSteps.length - 1 && !(flowStep === 1 && !isReceiveAmountValid)
  const lockPreviousSteps = flowStep >= 5 && flowStep <= 7

  if (view === 'login') {
    return (
      <main className="login-page">
        <div className="login-lang">
          <LanguageSwitch />
        </div>
        <section className="login-hero">
          <div className="brand-row"><div className="brand-mark" /><strong>{t('login.brand')}</strong></div>
          <h1>{t('login.title')}</h1>
          <p>{t('login.subtitle')}</p>
          <div className="hero-cubes"><span /><span /><span /></div>
        </section>
        <section className="login-card">
          <div className="login-tabs">
            <button type="button" className="active">{t('login.tabPassword')}</button>
            <button type="button">{t('login.tabFingerprint')}</button>
            <button type="button">{t('login.tabFace')}</button>
            <button type="button">{t('login.tabCombo')}</button>
          </div>
          <div className="login-identity-row">
            <h3>{t('login.identityTitle')}</h3>
            <select
              className="login-identity-select"
              value={selectedLoginRole}
              onChange={(e) => setSelectedLoginRole(e.target.value)}
              aria-label={t('login.identityAria')}
            >
              <option value="teller">{t('login.roleTeller')}</option>
              <option value="admin">{t('login.roleAdmin')}</option>
            </select>
          </div>

          <label className="field">
            <span>{selectedLoginRole === 'admin' ? t('login.labelAdminAcct') : t('login.labelTellerId')}</span>
            <input value={selectedLoginRole === 'admin' ? t('login.adminAcct') : t('login.tellerAcct')} readOnly />
          </label>
          <label className="field"><span>{t('login.labelOrg')}</span><input value={t('login.orgValue')} readOnly /></label>
          <label className="field"><span>{t('login.labelPassword')}</span><input value={t('login.passwordMask')} readOnly /></label>

          <button
            type="button"
            className="btn primary login-btn"
            onClick={() => {
              const now = new Date()
              setLoginTimeText(formatDateTime(now))
              if (selectedLoginRole === 'admin') {
                setView('admin')
              } else {
                setView('home')
              }
            }}
          >
            {selectedLoginRole === 'admin' ? t('login.btnAdmin') : t('login.btnTeller')}
          </button>
        </section>
      </main>
    )
  }

  if (view === 'admin') {
    return (
      <AdminPage
        theme={theme}
        loginTimeText={loginTimeText}
        onLogout={() => {
          setLoginTimeText('')
          setSelectedLoginRole('teller')
          setView('login')
        }}
        onGoHome={() => {
          setView('home')
        }}
      />
    )
  }

  if (view === 'home') {
    return (
      <main className={`app theme-${theme}`}>
        <HomeDashboard onStartMBrige={() => { setFlowStep(0); setView('flow') }} />
      </main>
    )
  }

  return (
    <main className={`app theme-${theme}`}>
      <header className="header">
        <div>
          <h1>{t('flow.headerTitle')}</h1>
          {/* <p>银行正式蓝色风格 Demo - 全套交易页面</p> */}
        </div>
        <div className="header-actions">
          <LanguageSwitch />
          <div className="theme-switch" role="group" aria-label={t('flow.themeGroup')}>
            <button
              type="button"
              className={`theme-dot theme-dot-default ${theme === 'default' ? 'active' : ''}`}
              onClick={() => setTheme('default')}
              aria-label={t('flow.themeDefault')}
              title={t('flow.themeDefaultTitle')}
            />
            <button
              type="button"
              className={`theme-dot theme-dot-dark ${theme === 'dark' ? 'active' : ''}`}
              onClick={() => setTheme('dark')}
              aria-label={t('flow.themeDark')}
              title={t('flow.themeDarkTitle')}
            />
            <button
              type="button"
              className={`theme-dot theme-dot-green ${theme === 'green' ? 'active' : ''}`}
              onClick={() => setTheme('green')}
              aria-label={t('flow.themeGreen')}
              title={t('flow.themeGreenTitle')}
            />
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
                onClick={() => {
                  if (disableJumpBack) return
                  setFlowStep(index)
                }}
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
              {t('flow.rateLine', {
                rate: fxRateDisplay,
                date: fxDate ? t('flow.rateDate', { date: fxDate }) : '',
                fallback: fxError ? t('flow.rateFallback') : '',
              })}
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
        <button type="button" className="btn secondary" onClick={() => setFlowStep((s) => s - 1)} disabled={!canPrev}>
          {t('flow.footerPrev')}
        </button>
        <button type="button" className="btn primary" onClick={() => setFlowStep((s) => s + 1)} disabled={!canNext || Boolean(loadingPhase)}>
          {t('flow.footerNext')}
        </button>
      </footer>

      <section className="promo-footer">
        <div>
          <strong>{t('flow.promoTitle')}</strong>
          <p>{t('flow.promoDesc')}</p>
        </div>
        <div className="promo-tags">
          <span>{t('flow.promoTag1')}</span><span>{t('flow.promoTag2')}</span><span>{t('flow.promoTag3')}</span>
        </div>
        <button type="button" className="btn secondary">{t('flow.promoCta')}</button>
      </section>

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

export default App
