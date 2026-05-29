import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './App.css'
import OpsConsole from './ops/OpsConsole.jsx'
import LanguageSwitch from './LanguageSwitch.jsx'
import { TRANSACTION_SCENES } from './transaction/mock/constants.js'
import TransactionFlow from './transaction/TransactionFlow.jsx'

function HomeDashboard({ onStartCnyOut, onStartFxOut }) {
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
              <button type="button" className="quick-item"><span>{t('home.quick360')}</span></button>
              <button type="button" className="quick-item mbridge-entry" onClick={onStartFxOut}>
                <span>{t('home.quickMbridgeFx')}</span>
              </button>
              <button type="button" className="quick-item mbridge-entry-alt" onClick={onStartCnyOut}>
                <span>{t('home.quickMbridgeCny')}</span>
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
  const { t } = useTranslation()
  const [view, setView] = useState('login')
  const [theme, setTheme] = useState('default')
  const [selectedLoginRole, setSelectedLoginRole] = useState('teller')
  const [loginTimeText, setLoginTimeText] = useState('')
  const [flowKey, setFlowKey] = useState(0)
  const [flowConfig, setFlowConfig] = useState({ scene: TRANSACTION_SCENES.FX_OUT, fxCurrency: 'THB' })

  const formatDateTime = (d) => {
    const pad = (n) => String(n).padStart(2, '0')
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  }

  const startFlow = (scene, fxCurrency = 'THB') => {
    setFlowConfig({ scene, fxCurrency })
    setFlowKey((k) => k + 1)
    setView('flow')
  }

  if (view === 'login') {
    return (
      <main className="login-page">
        <div className="login-lang"><LanguageSwitch /></div>
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
            <select className="login-identity-select" value={selectedLoginRole}
              onChange={(e) => setSelectedLoginRole(e.target.value)} aria-label={t('login.identityAria')}>
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
          <button type="button" className="btn primary login-btn" onClick={() => {
            setLoginTimeText(formatDateTime(new Date()))
            setView(selectedLoginRole === 'admin' ? 'admin' : 'home')
          }}>
            {selectedLoginRole === 'admin' ? t('login.btnAdmin') : t('login.btnTeller')}
          </button>
        </section>
      </main>
    )
  }

  if (view === 'admin') {
    return (
      <OpsConsole theme={theme} loginTimeText={loginTimeText}
        onLogout={() => { setLoginTimeText(''); setSelectedLoginRole('teller'); setView('login') }}
        onGoHome={() => setView('home')} />
    )
  }

  if (view === 'home') {
    return (
      <main className={`app theme-${theme}`}>
        <HomeDashboard
          onStartCnyOut={() => startFlow(TRANSACTION_SCENES.CNY_OUT)}
          onStartFxOut={() => startFlow(TRANSACTION_SCENES.FX_OUT, 'THB')}
        />
      </main>
    )
  }

  return (
    <TransactionFlow
      key={flowKey}
      theme={theme}
      onThemeChange={setTheme}
      onBackHome={() => setView('home')}
      initialScene={flowConfig.scene}
      initialFxCurrency={flowConfig.fxCurrency}
    />
  )
}

export default App
