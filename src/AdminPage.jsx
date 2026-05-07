import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import './AdminPage.css'
import LanguageSwitch from './LanguageSwitch.jsx'

export default function AdminPage({ theme, loginTimeText, onLogout, onGoHome }) {
  const { t, i18n } = useTranslation()

  const mockApprovals = useMemo(
    () => [
      { id: 'MB-20260420-0010', title: t('admin.approval1'), status: t('admin.statusPending') },
      { id: 'MB-20260420-0009', title: t('admin.approval2'), status: t('admin.statusPending') },
      { id: 'MB-20260420-0007', title: t('admin.approval3'), status: t('admin.statusPending') },
    ],
    [t, i18n.language], // eslint-disable-line react-hooks/exhaustive-deps -- `t` is stable; invalidate on locale change
  )

  return (
    <main className={`app theme-${theme}`}>
      <header className="admin-header">
        <div className="admin-title">
          <strong>{t('admin.title')}</strong>
          <small>{t('admin.subtitle')}</small>
        </div>
        <div className="admin-actions">
          <LanguageSwitch />
          <span className="admin-pill">{t('admin.loginAt')}{loginTimeText || t('admin.dash')}</span>
          <button type="button" className="btn secondary" onClick={onGoHome}>
            {t('admin.backTeller')}
          </button>
          <button type="button" className="btn primary" onClick={onLogout}>
            {t('admin.logout')}
          </button>
        </div>
      </header>

      <section className="admin-grid">
        <div className="admin-card">
          <h3>{t('admin.overviewTitle')}</h3>
          <div className="admin-kpis">
            <div className="admin-kpi">
              <small>{t('admin.kpiPending')}</small>
              <strong>{mockApprovals.length}</strong>
            </div>
            <div className="admin-kpi">
              <small>{t('admin.kpiUsers')}</small>
              <strong>6</strong>
            </div>
            <div className="admin-kpi">
              <small>{t('admin.kpiAlerts')}</small>
              <strong>1</strong>
            </div>
          </div>
        </div>

        <div className="admin-card">
          <h3>{t('admin.queueTitle')}</h3>
          <div className="admin-table">
            <div className="admin-table-head">
              <span>{t('admin.colId')}</span>
              <span>{t('admin.colItem')}</span>
              <span>{t('admin.colStatus')}</span>
              <span />
            </div>
            {mockApprovals.map((row) => (
              <div className="admin-table-row" key={row.id}>
                <span className="mono">{row.id}</span>
                <span>{row.title}</span>
                <span className="status-wait">{row.status}</span>
                <button
                  type="button"
                  className="btn secondary small"
                  onClick={() => {
                    window.alert(t('admin.alertOpened', { id: row.id }))
                  }}
                >
                  {t('admin.approve')}
                </button>
              </div>
            ))}
          </div>
          <p className="admin-hint">{t('admin.hint')}</p>
        </div>
      </section>
    </main>
  )
}
