import { useTranslation } from 'react-i18next'
import OpsTable from '../components/OpsTable.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import {
  mockOverviewStats,
  mockOverviewTransactions,
  mockPendingClearingConfig,
} from '../mock/data.js'
import './OpsOverview.css'

function AlertIcon() {
  return (
    <svg className="ops-alert-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M8 1.5a.5.5 0 0 1 .447.276l6.5 13A.5.5 0 0 1 14.5 15h-13a.5.5 0 0 1-.447-.724l6.5-13A.5.5 0 0 1 8 1.5zm0 4.75a.75.75 0 0 0-.75.75v3.5a.75.75 0 0 0 1.5 0V7a.75.75 0 0 0-.75-.75zm0 6.5a.875.875 0 1 0 0-1.75.875.875 0 0 0 0 1.75z" />
    </svg>
  )
}

export default function OpsOverview({ onNavigate }) {
  const { t } = useTranslation()

  const kpis = [
    { label: t('ops.overview.kpiVolume'), value: mockOverviewStats.totalVolume },
    { label: t('ops.overview.kpiToday'), value: mockOverviewStats.todayCount },
    { label: t('ops.overview.kpiAvgTime'), value: mockOverviewStats.avgProcessingTime, accent: 'green' },
    { label: t('ops.overview.kpiAvailability'), value: mockOverviewStats.availability, accent: 'green' },
  ]

  return (
    <div className="ops-view ops-overview">
      <header className="ops-overview-header">
        <h2>{t('ops.overview.title')}</h2>
        <p className="ops-desc">{t('ops.overview.desc')}</p>
      </header>

      <section className="ops-overview-kpi-wrap">
        <div className="ops-overview-kpi-grid">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="ops-overview-kpi-item">
              <strong className={kpi.accent === 'green' ? 'accent-green' : ''}>{kpi.value}</strong>
              <small>{kpi.label}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="ops-alert-card">
        <div className="ops-alert-header">
          <AlertIcon />
          <div>
            <h3>{t('ops.overview.clearingAlertTitle')}</h3>
            <p>{t('ops.overview.clearingAlertDesc')}</p>
          </div>
        </div>
        <OpsTable
          columns={[
            { key: 'seq', label: t('ops.overview.colSeq'), width: '56px' },
            { key: 'changeDate', label: t('ops.overview.colChangeDate'), width: '1fr' },
            { key: 'windowStart', label: t('ops.overview.colWindowStart'), width: '1fr' },
            { key: 'windowEnd', label: t('ops.overview.colWindowEnd'), width: '1fr' },
            { key: 'reason', label: t('ops.overview.colReason'), width: '1.2fr' },
            {
              key: 'status',
              label: t('ops.col.status'),
              width: '88px',
              render: (row) => (
                <StatusBadge status={row.status} label={t(`ops.overview.status_${row.status}`)} />
              ),
            },
            {
              key: 'action',
              label: t('ops.overview.colAction'),
              width: '88px',
              render: () => (
                <button type="button" className="ops-config-btn" onClick={() => onNavigate('clearing')}>
                  {t('ops.overview.goConfigure')}
                </button>
              ),
            },
          ]}
          rows={mockPendingClearingConfig}
          emptyText={t('ops.empty')}
        />
      </section>

      <section className="ops-panel-card">
        <h3 className="ops-section-title">{t('ops.overview.recentTxn')}</h3>
        <OpsTable
          columns={[
            { key: 'id', label: t('ops.overview.colTxnId'), width: '1.3fr', mono: true },
            { key: 'payerInst', label: t('ops.overview.colPayerInst'), width: '1.1fr' },
            { key: 'receiverInst', label: t('ops.overview.colReceiverInst'), width: '1.1fr' },
            { key: 'amountDisplay', label: t('ops.col.amount'), width: '1fr' },
            { key: 'currency', label: t('ops.overview.colCurrency'), width: '72px' },
            {
              key: 'status',
              label: t('ops.col.status'),
              width: '88px',
              render: (row) => (
                <StatusBadge status={row.status} label={t(`ops.overview.txnStatus_${row.status}`)} />
              ),
            },
            { key: 'time', label: t('ops.overview.colTime'), width: '1.4fr' },
          ]}
          rows={mockOverviewTransactions}
          emptyText={t('ops.empty')}
        />
      </section>
    </div>
  )
}
