import { useTranslation } from 'react-i18next'
import OpsTable from '../components/OpsTable.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { mockClearingWindow } from '../mock/data.js'

export default function ClearingWindowView() {
  const { t } = useTranslation()
  const { current, history, queued } = mockClearingWindow

  return (
    <div className="ops-view">
      <h2>{t('ops.clearing.title')}</h2>
      <p className="ops-desc">{t('ops.clearing.desc')}</p>

      <div className="ops-info-cards">
        <div className="ops-info-card">
          <small>{t('ops.clearing.currentWindow')}</small>
          <strong>{current.start} – {current.end}</strong>
          <em>{t('ops.clearing.effectiveDate', { date: current.effectiveDate })}</em>
        </div>
        <div className="ops-info-card warn">
          <small>{t('ops.clearing.queuedCount')}</small>
          <strong>{queued.length}</strong>
          <em>{t('ops.clearing.queuedHint')}</em>
        </div>
      </div>

      <h3>{t('ops.clearing.queuedTitle')}</h3>
      <OpsTable
        columns={[
          { key: 'id', label: t('ops.col.txnId'), width: '1.3fr', mono: true },
          { key: 'scene', label: t('ops.col.scene'), width: '1fr', render: (r) => t(`ops.txn.scene_${r.scene}`) },
          { key: 'amount', label: t('ops.col.amount'), width: '1fr', render: (r) => `${r.currency} ${r.amount.toLocaleString()}` },
          { key: 'status', label: t('ops.col.status'), width: '0.9fr', render: () => <StatusBadge status="QUEUED" label={t('ops.txn.status_QUEUED')} /> },
        ]}
        rows={queued}
        emptyText={t('ops.clearing.noQueued')}
      />

      <h3>{t('ops.clearing.historyTitle')}</h3>
      <OpsTable
        columns={[
          { key: 'start', label: t('ops.col.windowStart'), width: '1fr' },
          { key: 'end', label: t('ops.col.windowEnd'), width: '1fr' },
          { key: 'changedAt', label: t('ops.col.changedAt'), width: '1.5fr' },
        ]}
        rows={history.map((h, i) => ({ ...h, id: `hist-${i}` }))}
        emptyText={t('ops.empty')}
      />
    </div>
  )
}
