import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { mockTxnMonitorList } from '../mock/data.js'
import TxnTrackModal from './TxnTrackModal.jsx'
import './TransactionMonitorView.css'

const TABS = ['supervise', 'clearing', 'queued']

const EMPTY_FILTERS = {
  txnNo: '',
  txnId: '',
  scene: 'all',
  status: 'all',
  startTime: '',
  endTime: '',
}

function TabIconSupervise() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M6.5 1a.5.5 0 0 0-.5.5V3h-1A2.5 2.5 0 0 0 2.5 5.5v1A2.5 2.5 0 0 0 5 9h1v5.5a.5.5 0 0 0 1 0V9h1a2.5 2.5 0 0 0 2.5-2.5v-1A2.5 2.5 0 0 0 8 3H7V1.5a.5.5 0 0 0-.5-.5zM5 4h6a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 11 8H5a1.5 1.5 0 0 1-1.5-1.5v-1A1.5 1.5 0 0 1 5 4z" />
    </svg>
  )
}

function TabIconClearing() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zm0 1a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm-.5 2v3.25L5.03 9.03l-.707.707L8 11.414l3.677-3.677-.707-.707L8.5 7.75V4.5h-1z" />
    </svg>
  )
}

function TabIconQueued() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v11a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 13.5v-11zM4.5 2.5v11h7v-11h-7zM5.5 5h5v1h-5V5zm0 2.5h3.5v1H5.5v-1z" />
    </svg>
  )
}

const TAB_ICONS = {
  supervise: TabIconSupervise,
  clearing: TabIconClearing,
  queued: TabIconQueued,
}

function StatusCell({ status, label }) {
  return <span className={`txn-status txn-status--${status}`}>{label}</span>
}

export default function TransactionMonitorView() {
  const { t } = useTranslation()
  const [tab, setTab] = useState('supervise')
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [applied, setApplied] = useState(EMPTY_FILTERS)
  const [trackRow, setTrackRow] = useState(null)

  const filtered = useMemo(() => {
    return mockTxnMonitorList.filter((row) => {
      if (applied.scene !== 'all' && row.scene !== applied.scene) return false
      if (applied.status !== 'all' && row.status !== applied.status) return false
      if (applied.txnNo && !row.txnNo.toLowerCase().includes(applied.txnNo.toLowerCase())) return false
      if (applied.txnId && !row.txnId.toLowerCase().includes(applied.txnId.toLowerCase())) return false
      return true
    })
  }, [applied])

  const totalPages = Math.max(1, Math.ceil(filtered.length / 5))
  const pageNumbers = Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1)

  const handleReset = () => {
    setFilters(EMPTY_FILTERS)
    setApplied(EMPTY_FILTERS)
    setPage(1)
  }

  const handleQuery = () => {
    setApplied({ ...filters })
    setPage(1)
  }

  return (
    <div className="ops-view ops-txn-monitor">
      <header className="ops-txn-monitor-header">
        <h2>{t('ops.monitor.title')}</h2>
        <p className="ops-desc">{t('ops.monitor.desc')}</p>
      </header>

      <div className="txn-tabs">
        {TABS.map((id) => {
          const Icon = TAB_ICONS[id]
          return (
            <button
              key={id}
              type="button"
              className={`txn-tab ${tab === id ? 'active' : ''}`}
              onClick={() => setTab(id)}
            >
              <Icon />
              {t(`ops.monitor.tab_${id}`)}
            </button>
          )
        })}
      </div>

      {tab === 'supervise' ? (
        <>
          <section className="txn-filter-card">
            <div className="txn-filter-row">
              <div className="txn-field">
                <label>{t('ops.monitor.filterTxnNo')}</label>
                <input
                  value={filters.txnNo}
                  onChange={(e) => setFilters((f) => ({ ...f, txnNo: e.target.value }))}
                  placeholder={t('ops.monitor.filterTxnNoPh')}
                />
              </div>
              <div className="txn-field">
                <label>{t('ops.monitor.filterTxnId')}</label>
                <input
                  value={filters.txnId}
                  onChange={(e) => setFilters((f) => ({ ...f, txnId: e.target.value }))}
                  placeholder={t('ops.monitor.filterTxnIdPh')}
                />
              </div>
              <div className="txn-field">
                <label>{t('ops.monitor.filterScene')}</label>
                <select value={filters.scene} onChange={(e) => setFilters((f) => ({ ...f, scene: e.target.value }))}>
                  <option value="all">{t('ops.monitor.filterAll')}</option>
                  <option value="pvp">{t('ops.monitor.scene_pvp')}</option>
                  <option value="cross_border">{t('ops.monitor.scene_cross_border')}</option>
                  <option value="fx_swap">{t('ops.monitor.scene_fx_swap')}</option>
                  <option value="internal">{t('ops.monitor.scene_internal')}</option>
                </select>
              </div>
              <div className="txn-field">
                <label>{t('ops.monitor.filterStatus')}</label>
                <select value={filters.status} onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}>
                  <option value="all">{t('ops.monitor.filterAll')}</option>
                  <option value="success">{t('ops.monitor.status_success')}</option>
                  <option value="failed">{t('ops.monitor.status_failed')}</option>
                  <option value="processing">{t('ops.monitor.status_processing')}</option>
                  <option value="queued">{t('ops.monitor.status_queued')}</option>
                  <option value="rejected">{t('ops.monitor.status_rejected')}</option>
                </select>
              </div>
              <div className="txn-field">
                <label>{t('ops.monitor.filterStartTime')}</label>
                <input
                  type="datetime-local"
                  value={filters.startTime}
                  onChange={(e) => setFilters((f) => ({ ...f, startTime: e.target.value }))}
                />
              </div>
            </div>
            <div className="txn-filter-row txn-filter-row--actions">
              <div className="txn-field">
                <label>{t('ops.monitor.filterEndTime')}</label>
                <input
                  type="datetime-local"
                  value={filters.endTime}
                  onChange={(e) => setFilters((f) => ({ ...f, endTime: e.target.value }))}
                />
              </div>
              <div />
              <div className="txn-filter-actions">
                <button type="button" className="txn-btn-reset" onClick={handleReset}>
                  {t('ops.monitor.reset')}
                </button>
                <button type="button" className="txn-btn-query" onClick={handleQuery}>
                  {t('ops.monitor.query')}
                </button>
              </div>
            </div>
          </section>

          <section className="txn-table-card">
            <table className="txn-table">
              <thead>
                <tr>
                  <th>{t('ops.monitor.colSeq')}</th>
                  <th>{t('ops.monitor.filterTxnNo')}</th>
                  <th>{t('ops.monitor.filterTxnId')}</th>
                  <th>{t('ops.monitor.filterScene')}</th>
                  <th>{t('ops.monitor.filterStatus')}</th>
                  <th>{t('ops.monitor.colTxnTime')}</th>
                  <th>{t('ops.monitor.colException')}</th>
                  <th>{t('ops.monitor.colAction')}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.id}>
                    <td>{row.seq}</td>
                    <td>{row.txnNo}</td>
                    <td>{row.txnId}</td>
                    <td>{t(`ops.monitor.scene_${row.scene}`)}</td>
                    <td>
                      <StatusCell
                        status={row.status}
                        label={t(`ops.monitor.status_${row.status}`)}
                      />
                    </td>
                    <td>{row.txnTime}</td>
                    <td>
                      {row.exceptionReason ? (
                        row.exceptionReason
                      ) : (
                        <span className="txn-reason-empty">-</span>
                      )}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="txn-btn-track"
                        onClick={() => setTrackRow(row)}
                      >
                        {t('ops.monitor.track')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="txn-pagination">
              <button
                type="button"
                className="txn-page-btn"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                {t('ops.monitor.prevPage')}
              </button>
              {pageNumbers.map((n) => (
                <button
                  key={n}
                  type="button"
                  className={`txn-page-num ${page === n ? 'active' : ''}`}
                  onClick={() => setPage(n)}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                className="txn-page-btn"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                {t('ops.monitor.nextPage')}
              </button>
              <span className="txn-page-total">
                {t('ops.monitor.totalRecords', { count: filtered.length })}
              </span>
            </div>
          </section>
        </>
      ) : (
        <div className="txn-placeholder">{t('ops.monitor.tabPlaceholder')}</div>
      )}

      {trackRow && <TxnTrackModal row={trackRow} onClose={() => setTrackRow(null)} />}
    </div>
  )
}
