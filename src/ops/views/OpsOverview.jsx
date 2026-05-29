import { useTranslation } from 'react-i18next'
import {
  mockAdmissionRequests,
  mockClearingWindow,
  mockExceptions,
  mockTransactions,
} from '../mock/data.js'

export default function OpsOverview({ onNavigate }) {
  const { t } = useTranslation()

  const kpis = [
    { label: t('ops.overview.kpiPending'), value: mockAdmissionRequests.filter((r) => r.status === 'INIT').length, nav: 'institution' },
    { label: t('ops.overview.kpiTxn'), value: mockTransactions.filter((tx) => tx.status === 'PROCESSING').length, nav: 'monitor' },
    { label: t('ops.overview.kpiQueued'), value: mockClearingWindow.queued.length, nav: 'clearing' },
    { label: t('ops.overview.kpiException'), value: mockExceptions.length, nav: 'exception' },
  ]

  return (
    <div className="ops-view">
      <h2>{t('ops.overview.title')}</h2>
      <p className="ops-desc">{t('ops.overview.desc')}</p>

      <div className="ops-kpi-grid">
        {kpis.map((kpi) => (
          <button key={kpi.nav} type="button" className="ops-kpi-card" onClick={() => onNavigate(kpi.nav)}>
            <small>{kpi.label}</small>
            <strong>{kpi.value}</strong>
          </button>
        ))}
      </div>

      <div className="ops-split">
        <section className="ops-panel">
          <h3>{t('ops.overview.recentAdmission')}</h3>
          <ul className="ops-list">
            {mockAdmissionRequests.slice(0, 3).map((item) => (
              <li key={item.id}>
                <strong>{item.institutionName}</strong>
                <span>{t(`ops.admission.op_${item.operation}`)} · {t(`ops.status.${item.status}`)}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="ops-panel">
          <h3>{t('ops.overview.recentTxn')}</h3>
          <ul className="ops-list">
            {mockTransactions.slice(0, 3).map((tx) => (
              <li key={tx.id}>
                <strong className="mono">{tx.id}</strong>
                <span>{t(`ops.txn.scene_${tx.scene}`)} · {t(`ops.txn.status_${tx.status}`)}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
