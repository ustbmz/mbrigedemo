import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import OpsTable from '../components/OpsTable.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { mockTransactions } from '../mock/data.js'

export default function TransactionMonitorView() {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')
  const [sceneFilter, setSceneFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => {
    return mockTransactions.filter((tx) => {
      if (sceneFilter !== 'all' && tx.scene !== sceneFilter) return false
      if (!query.trim()) return true
      const q = query.toLowerCase()
      return tx.id.toLowerCase().includes(q) || tx.msgId.toLowerCase().includes(q)
    })
  }, [query, sceneFilter])

  return (
    <div className="ops-view">
      <h2>{t('ops.monitor.title')}</h2>
      <p className="ops-desc">{t('ops.monitor.desc')}</p>

      <div className="ops-toolbar">
        <input className="ops-search" placeholder={t('ops.monitor.search')} value={query} onChange={(e) => setQuery(e.target.value)} />
        <select className="ops-select" value={sceneFilter} onChange={(e) => setSceneFilter(e.target.value)}>
          <option value="all">{t('ops.monitor.allScenes')}</option>
          <option value="CNY_OUT">{t('ops.txn.scene_CNY_OUT')}</option>
          <option value="FX_OUT">{t('ops.txn.scene_FX_OUT')}</option>
          <option value="CNY_IN">{t('ops.txn.scene_CNY_IN')}</option>
          <option value="FX_IN">{t('ops.txn.scene_FX_IN')}</option>
        </select>
      </div>

      <div className="ops-split">
        <OpsTable
          columns={[
            { key: 'id', label: t('ops.col.txnId'), width: '1.3fr', mono: true },
            { key: 'scene', label: t('ops.col.scene'), width: '0.9fr', render: (r) => t(`ops.txn.scene_${r.scene}`) },
            { key: 'amount', label: t('ops.col.amount'), width: '1fr', render: (r) => `${r.currency} ${r.amount.toLocaleString()}` },
            { key: 'status', label: t('ops.col.status'), width: '0.9fr', render: (r) => <StatusBadge status={r.status} label={t(`ops.txn.status_${r.status}`)} /> },
          ]}
          rows={filtered}
          onRowClick={setSelected}
          emptyText={t('ops.empty')}
        />

        {selected ? (
          <aside className="ops-detail">
            <h3>{t('ops.monitor.detailTitle')}</h3>
            <dl className="ops-dl">
              <dt>{t('ops.col.txnId')}</dt><dd className="mono">{selected.id}</dd>
              <dt>{t('ops.col.msgId')}</dt><dd className="mono">{selected.msgId}</dd>
              <dt>{t('ops.col.scene')}</dt><dd>{t(`ops.txn.scene_${selected.scene}`)}</dd>
              <dt>{t('ops.col.amount')}</dt><dd>{selected.currency} {selected.amount.toLocaleString()}</dd>
              <dt>{t('ops.col.payer')}</dt><dd>{selected.payer}</dd>
              <dt>{t('ops.col.receiver')}</dt><dd>{selected.receiver}</dd>
              {selected.errorCode ? (
                <>
                  <dt>{t('ops.col.errorCode')}</dt><dd className="mono">{selected.errorCode}</dd>
                  <dt>{t('ops.col.errorReason')}</dt><dd>{selected.errorReason}</dd>
                </>
              ) : null}
            </dl>
            <h4>{t('ops.monitor.timeline')}</h4>
            <ol className="ops-timeline">
              {selected.timeline.map((node) => (
                <li key={node.step} className={`ops-timeline-item ops-timeline-${node.status}`}>
                  <strong>{t(`ops.monitor.step_${node.step}`)}</strong>
                  <span>{node.at || t('ops.monitor.pending')}</span>
                </li>
              ))}
            </ol>
          </aside>
        ) : null}
      </div>
    </div>
  )
}
