import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSwitch from '../LanguageSwitch.jsx'
import NavIcon from './components/NavIcons.jsx'
import './OpsConsole.css'
import OpsOverview from './views/OpsOverview.jsx'
import InstitutionView from './views/InstitutionView.jsx'
import WhitelistView from './views/WhitelistView.jsx'
import TransactionMonitorView from './views/TransactionMonitorView.jsx'
import ClearingWindowView from './views/ClearingWindowView.jsx'
import ExceptionView from './views/ExceptionView.jsx'

const NAV_ITEMS = [
  { id: 'overview' },
  { id: 'institution' },
  { id: 'crosschain' },
  { id: 'whitelist' },
  { id: 'monitor' },
  { id: 'exception' },
]

export default function OpsConsole({ theme, loginTimeText, onLogout, onGoHome }) {
  const { t } = useTranslation()
  const [activeNav, setActiveNav] = useState('overview')

  const renderView = () => {
    switch (activeNav) {
      case 'overview': return <OpsOverview onNavigate={setActiveNav} />
      case 'institution': return <InstitutionView />
      case 'crosschain':
      case 'monitor': return <TransactionMonitorView />
      case 'whitelist': return <WhitelistView />
      case 'clearing': return <ClearingWindowView />
      case 'exception': return <ExceptionView />
      default: return <OpsOverview onNavigate={setActiveNav} />
    }
  }

  const isFlatContent = ['overview', 'institution', 'crosschain', 'whitelist', 'monitor', 'exception'].includes(activeNav)

  return (
    <main className={`ops-console theme-${theme}`}>
      <div className="ops-layout">
        <aside className="ops-sidebar">
          <div className="ops-sidebar-brand">{t('ops.brand')}</div>
          <nav className="ops-nav">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`ops-nav-item ${activeNav === item.id ? 'active' : ''}`}
                onClick={() => setActiveNav(item.id)}
              >
                <span className="ops-nav-icon">
                  <NavIcon id={item.id} />
                </span>
                <span className="ops-nav-label">{t(`ops.nav.${item.id}`)}</span>
              </button>
            ))}
          </nav>
        </aside>

        <div className="ops-main">
          {!isFlatContent && (
            <header className="ops-header">
              <div className="ops-header-actions">
                <LanguageSwitch />
                <span className="ops-pill">{t('ops.loginAt')}{loginTimeText || '-'}</span>
                <button type="button" className="btn secondary" onClick={onGoHome}>{t('ops.backTeller')}</button>
                <button type="button" className="btn primary" onClick={onLogout}>{t('ops.logout')}</button>
              </div>
            </header>
          )}
          <section className={`ops-content ${isFlatContent ? 'ops-content--flat' : ''}`}>
            {renderView()}
            {!isFlatContent && <p className="ops-footer-hint">{t('ops.demoHint')}</p>}
          </section>
        </div>
      </div>
    </main>
  )
}
