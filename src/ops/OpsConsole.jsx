import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSwitch from '../LanguageSwitch.jsx'
import './OpsConsole.css'
import OpsOverview from './views/OpsOverview.jsx'
import InstitutionView from './views/InstitutionView.jsx'
import WhitelistView from './views/WhitelistView.jsx'
import TransactionMonitorView from './views/TransactionMonitorView.jsx'
import ClearingWindowView from './views/ClearingWindowView.jsx'
import ExceptionView from './views/ExceptionView.jsx'

const NAV_ITEMS = [
  { id: 'overview', icon: '◉' },
  { id: 'institution', icon: '⌂' },
  { id: 'whitelist', icon: '☰' },
  { id: 'monitor', icon: '↗' },
  { id: 'clearing', icon: '◷' },
  { id: 'exception', icon: '⚠' },
]

export default function OpsConsole({ theme, loginTimeText, onLogout, onGoHome }) {
  const { t } = useTranslation()
  const [activeNav, setActiveNav] = useState('overview')

  const renderView = () => {
    switch (activeNav) {
      case 'overview': return <OpsOverview onNavigate={setActiveNav} />
      case 'institution': return <InstitutionView />
      case 'whitelist': return <WhitelistView />
      case 'monitor': return <TransactionMonitorView />
      case 'clearing': return <ClearingWindowView />
      case 'exception': return <ExceptionView />
      default: return <OpsOverview onNavigate={setActiveNav} />
    }
  }

  return (
    <main className={`ops-console app theme-${theme}`}>
      <header className="ops-header">
        <div className="ops-brand">
          <strong>{t('ops.title')}</strong>
          <small>{t('ops.subtitle')}</small>
        </div>
        <div className="ops-header-actions">
          <LanguageSwitch />
          <span className="ops-pill">{t('ops.loginAt')}{loginTimeText || '-'}</span>
          <button type="button" className="btn secondary" onClick={onGoHome}>{t('ops.backTeller')}</button>
          <button type="button" className="btn primary" onClick={onLogout}>{t('ops.logout')}</button>
        </div>
      </header>

      <div className="ops-layout">
        <nav className="ops-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`ops-nav-item ${activeNav === item.id ? 'active' : ''}`}
              onClick={() => setActiveNav(item.id)}
            >
              <span className="ops-nav-icon">{item.icon}</span>
              <em>{t(`ops.nav.${item.id}`)}</em>
            </button>
          ))}
        </nav>
        <section className="ops-content">
          {renderView()}
          <p className="ops-footer-hint">{t('ops.demoHint')}</p>
        </section>
      </div>
    </main>
  )
}
