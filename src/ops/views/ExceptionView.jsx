import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { mockExceptionQueryList } from '../mock/data.js'
import RefundApplyForm from './RefundApplyForm.jsx'
import RefundApprovalList from './RefundApprovalList.jsx'
import './ExceptionView.css'

const TABS = ['query', 'refund', 'approval']

const EMPTY_FILTERS = {
  txnNo: '',
  txnId: '',
  exceptionType: 'all',
  status: 'all',
  startTime: '',
  endTime: '',
}

function TabIconQuery() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242 1.156a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z" />
    </svg>
  )
}

function TabIconRefund() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v11a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 13.5v-11zM4.5 2.5v11h7v-11h-7zM5.5 5h5v1h-5V5zm0 2.5h3.5v1H5.5v-1z" />
    </svg>
  )
}

function TabIconApproval() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v11a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 13.5v-11zM4.5 2.5v11h7v-11h-7zM6.5 9.5 5.75 8.75l-.707.707L6.5 10.914l3.957-3.957-.707-.707L6.5 9.5z" />
    </svg>
  )
}

const TAB_ICONS = { query: TabIconQuery, refund: TabIconRefund, approval: TabIconApproval }

function StatusCell({ status, label }) {
  return <span className={`exc-status exc-status--${status}`}>{label}</span>
}

export default function ExceptionView() {
  const { t } = useTranslation()
  const [tab, setTab] = useState('approval')
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [applied, setApplied] = useState(EMPTY_FILTERS)

  const filtered = useMemo(() => {
    return mockExceptionQueryList.filter((row) => {
      if (applied.exceptionType !== 'all' && row.exceptionType !== applied.exceptionType) return false
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
    <div className="ops-view ops-exception">
      <header className="ops-exception-header">
        <h2>{t('ops.exception.title')}</h2>
        <p className="ops-desc">{t('ops.exception.desc')}</p>
      </header>

      <div className="exc-tabs">
        {TABS.map((id) => {
          const Icon = TAB_ICONS[id]
          return (
            <button
              key={id}
              type="button"
              className={`exc-tab ${tab === id ? 'active' : ''}`}
              onClick={() => setTab(id)}
            >
              <Icon />
              {t(`ops.exception.tab_${id}`)}
            </button>
          )
        })}
      </div>

      {tab === 'query' ? (
        <>
          <section className="exc-filter-card">
            <div className="exc-filter-row">
              <div className="exc-field">
                <label>{t('ops.exception.filterTxnNo')}</label>
                <input
                  value={filters.txnNo}
                  onChange={(e) => setFilters((f) => ({ ...f, txnNo: e.target.value }))}
                  placeholder={t('ops.exception.filterTxnNoPh')}
                />
              </div>
              <div className="exc-field">
                <label>{t('ops.exception.filterTxnId')}</label>
                <input
                  value={filters.txnId}
                  onChange={(e) => setFilters((f) => ({ ...f, txnId: e.target.value }))}
                  placeholder={t('ops.exception.filterTxnIdPh')}
                />
              </div>
              <div className="exc-field">
                <label>{t('ops.exception.filterExceptionType')}</label>
                <select
                  value={filters.exceptionType}
                  onChange={(e) => setFilters((f) => ({ ...f, exceptionType: e.target.value }))}
                >
                  <option value="all">{t('ops.exception.filterAll')}</option>
                  <option value="settlement_fail">{t('ops.exception.exceptionType_settlement_fail')}</option>
                  <option value="name_mismatch">{t('ops.exception.exceptionType_name_mismatch')}</option>
                  <option value="account_frozen">{t('ops.exception.exceptionType_account_frozen')}</option>
                  <option value="rule_reject">{t('ops.exception.exceptionType_rule_reject')}</option>
                  <option value="timeout">{t('ops.exception.exceptionType_timeout')}</option>
                </select>
              </div>
              <div className="exc-field">
                <label>{t('ops.exception.filterStatus')}</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
                >
                  <option value="all">{t('ops.exception.filterAll')}</option>
                  <option value="pending_review">{t('ops.exception.status_pending_review')}</option>
                  <option value="pending_refund">{t('ops.exception.status_pending_refund')}</option>
                  <option value="processing">{t('ops.exception.status_processing')}</option>
                  <option value="resolved">{t('ops.exception.status_resolved')}</option>
                </select>
              </div>
            </div>
            <div className="exc-filter-row exc-filter-row--actions">
              <div className="exc-field">
                <label>{t('ops.exception.filterStartTime')}</label>
                <input
                  type="datetime-local"
                  value={filters.startTime}
                  onChange={(e) => setFilters((f) => ({ ...f, startTime: e.target.value }))}
                />
              </div>
              <div className="exc-field">
                <label>{t('ops.exception.filterEndTime')}</label>
                <input
                  type="datetime-local"
                  value={filters.endTime}
                  onChange={(e) => setFilters((f) => ({ ...f, endTime: e.target.value }))}
                />
              </div>
              <div className="exc-filter-actions">
                <button type="button" className="exc-btn-reset" onClick={handleReset}>
                  {t('ops.exception.reset')}
                </button>
                <button type="button" className="exc-btn-query" onClick={handleQuery}>
                  {t('ops.exception.query')}
                </button>
              </div>
            </div>
          </section>

          <section className="exc-table-card">
            <table className="exc-table">
              <thead>
                <tr>
                  <th>{t('ops.exception.colSeq')}</th>
                  <th>{t('ops.exception.filterTxnNo')}</th>
                  <th>{t('ops.exception.colTxnId')}</th>
                  <th>{t('ops.exception.colScene')}</th>
                  <th>{t('ops.exception.colAmount')}</th>
                  <th>{t('ops.exception.filterExceptionType')}</th>
                  <th className="exc-col-status">{t('ops.exception.filterStatus')}</th>
                  <th>{t('ops.exception.colExceptionReason')}</th>
                  <th>{t('ops.exception.colTxnTime')}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.id}>
                    <td>{row.seq}</td>
                    <td>{row.txnNo}</td>
                    <td>{row.txnId}</td>
                    <td>{t(`ops.exception.scene_${row.scene}`)}</td>
                    <td>{row.currency} {row.amount.toLocaleString()}</td>
                    <td>{t(`ops.exception.exceptionType_${row.exceptionType}`)}</td>
                    <td className="exc-col-status">
                      <StatusCell status={row.status} label={t(`ops.exception.status_${row.status}`)} />
                    </td>
                    <td>{row.exceptionReason}</td>
                    <td>{row.txnTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="exc-pagination">
              <button type="button" className="exc-page-btn" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                {t('ops.exception.prevPage')}
              </button>
              {pageNumbers.map((n) => (
                <button
                  key={n}
                  type="button"
                  className={`exc-page-num ${page === n ? 'active' : ''}`}
                  onClick={() => setPage(n)}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                className="exc-page-btn"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                {t('ops.exception.nextPage')}
              </button>
              <span className="exc-page-total">{t('ops.exception.totalRecords', { count: filtered.length })}</span>
            </div>
          </section>
        </>
      ) : null}

      {tab === 'refund' ? <RefundApplyForm /> : null}

      {tab === 'approval' ? <RefundApprovalList /> : null}
    </div>
  )
}
