import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { mockRefundApprovalList } from '../mock/data.js'

const PAGE_SIZE = 4

const EMPTY_FILTERS = {
  applyNo: '',
  txnNo: '',
  status: 'all',
  applyDate: '',
}

function StatusCell({ status, label }) {
  return <span className={`exc-status exc-status--${status}`}>{label}</span>
}

function formatAmount(value) {
  return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function RefundApprovalList() {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [applied, setApplied] = useState(EMPTY_FILTERS)
  const [approvals, setApprovals] = useState(mockRefundApprovalList)

  const filtered = useMemo(() => {
    return approvals.filter((row) => {
      if (applied.status !== 'all' && row.status !== applied.status) return false
      if (applied.applyNo && !row.applyNo.toLowerCase().includes(applied.applyNo.toLowerCase())) return false
      if (applied.txnNo && !row.txnNo.toLowerCase().includes(applied.txnNo.toLowerCase())) return false
      if (applied.applyDate && row.applyDate !== applied.applyDate) return false
      return true
    })
  }, [approvals, applied])

  const stats = useMemo(() => ({
    total: approvals.length,
    pending: approvals.filter((r) => r.status === 'pending_approval').length,
    approved: approvals.filter((r) => r.status === 'approved').length,
    rejected: approvals.filter((r) => r.status === 'rejected').length,
  }), [approvals])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleReset = () => {
    setFilters(EMPTY_FILTERS)
    setApplied(EMPTY_FILTERS)
    setPage(1)
  }

  const handleQuery = () => {
    setApplied({ ...filters })
    setPage(1)
  }

  const handlePass = (id, applyNo) => {
    setApprovals((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'approved' } : r)))
    window.alert(t('ops.exception.approveRefundMock', { id: applyNo }))
  }

  const handleReject = (id, applyNo) => {
    setApprovals((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'rejected' } : r)))
    window.alert(t('ops.exception.rejectRefundMock', { id: applyNo }))
  }

  const handleView = (applyNo) => {
    window.alert(t('ops.exception.viewApprovalMock', { id: applyNo }))
  }

  return (
    <>
      <div className="exc-approval-kpi-grid">
        <div className="exc-approval-kpi-card">
          <strong>{stats.total}</strong>
          <small>{t('ops.exception.kpiTotal')}</small>
        </div>
        <div className="exc-approval-kpi-card">
          <strong className="accent-warning">{stats.pending}</strong>
          <small>{t('ops.exception.kpiPending')}</small>
        </div>
        <div className="exc-approval-kpi-card">
          <strong className="accent-success">{stats.approved}</strong>
          <small>{t('ops.exception.kpiApproved')}</small>
        </div>
        <div className="exc-approval-kpi-card">
          <strong className="accent-error">{stats.rejected}</strong>
          <small>{t('ops.exception.kpiRejected')}</small>
        </div>
      </div>

      <section className="exc-filter-card">
        <div className="exc-filter-row exc-filter-row--approval">
          <div className="exc-field">
            <label>{t('ops.exception.filterApplyNo')}</label>
            <input
              value={filters.applyNo}
              onChange={(e) => setFilters((f) => ({ ...f, applyNo: e.target.value }))}
              placeholder={t('ops.exception.filterApplyNoPh')}
            />
          </div>
          <div className="exc-field">
            <label>{t('ops.exception.fieldOriginalTxnNo')}</label>
            <input
              value={filters.txnNo}
              onChange={(e) => setFilters((f) => ({ ...f, txnNo: e.target.value }))}
              placeholder={t('ops.exception.fieldOriginalTxnNoPh')}
            />
          </div>
          <div className="exc-field">
            <label>{t('ops.exception.filterApprovalStatus')}</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
            >
              <option value="all">{t('ops.exception.filterAll')}</option>
              <option value="pending_approval">{t('ops.exception.approvalStatus_pending_approval')}</option>
              <option value="approved">{t('ops.exception.approvalStatus_approved')}</option>
              <option value="rejected">{t('ops.exception.approvalStatus_rejected')}</option>
            </select>
          </div>
          <div className="exc-field">
            <label>{t('ops.exception.filterApplyDate')}</label>
            <input
              type="date"
              value={filters.applyDate}
              onChange={(e) => setFilters((f) => ({ ...f, applyDate: e.target.value }))}
            />
          </div>
          <div className="exc-filter-actions">
            <button type="button" className="exc-btn-query" onClick={handleQuery}>
              {t('ops.exception.query')}
            </button>
            <button type="button" className="exc-btn-reset" onClick={handleReset}>
              {t('ops.exception.reset')}
            </button>
          </div>
        </div>
      </section>

      <section className="exc-table-card">
        <table className="exc-table">
          <thead>
            <tr>
              <th>{t('ops.exception.filterApplyNo')}</th>
              <th>{t('ops.exception.fieldOriginalTxnNo')}</th>
              <th>{t('ops.exception.fieldRefundType')}</th>
              <th>{t('ops.exception.colAmount')}</th>
              <th>{t('ops.exception.colCurrency')}</th>
              <th>{t('ops.exception.colInstitution')}</th>
              <th>{t('ops.exception.colSubmittedAt')}</th>
              <th className="exc-col-status">{t('ops.exception.filterApprovalStatus')}</th>
              <th className="exc-col-action">{t('ops.exception.colAction')}</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row) => (
              <tr key={row.id}>
                <td>{row.applyNo}</td>
                <td>{row.txnNo}</td>
                <td>{t(`ops.exception.refundType_${row.refundType}`)}</td>
                <td>{formatAmount(row.amount)}</td>
                <td>{row.currency}</td>
                <td>{row.institution}</td>
                <td>{row.submittedAt}</td>
                <td className="exc-col-status">
                  <StatusCell
                    status={row.status}
                    label={t(`ops.exception.approvalStatus_${row.status}`)}
                  />
                </td>
                <td className="exc-col-action">
                  <div className="exc-action-group">
                    <button type="button" className="exc-link-btn" onClick={() => handleView(row.applyNo)}>
                      {t('ops.exception.view')}
                    </button>
                    {row.status === 'pending_approval' ? (
                      <>
                        <button
                          type="button"
                          className="exc-btn-pass"
                          onClick={() => handlePass(row.id, row.applyNo)}
                        >
                          {t('ops.exception.pass')}
                        </button>
                        <button
                          type="button"
                          className="exc-btn-reject"
                          onClick={() => handleReject(row.id, row.applyNo)}
                        >
                          {t('ops.exception.reject')}
                        </button>
                      </>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="exc-pagination exc-pagination--full">
          <button type="button" className="exc-page-btn" disabled={page <= 1} onClick={() => setPage(1)}>
            {t('ops.exception.firstPage')}
          </button>
          <button type="button" className="exc-page-btn" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            {t('ops.exception.prevPage')}
          </button>
          <span className="exc-page-indicator">
            {t('ops.exception.pageIndicator', { page, total: totalPages })}
          </span>
          <button
            type="button"
            className="exc-page-btn"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            {t('ops.exception.nextPage')}
          </button>
          <button
            type="button"
            className="exc-page-btn"
            disabled={page >= totalPages}
            onClick={() => setPage(totalPages)}
          >
            {t('ops.exception.lastPage')}
          </button>
        </div>
      </section>
    </>
  )
}
