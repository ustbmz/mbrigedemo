import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { mockWhitelist } from '../mock/data.js'
import WhitelistAddForm from './WhitelistAddForm.jsx'
import './WhitelistView.css'

const TABS = ['query', 'add']

function TabIconQuery() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v11a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 13.5v-11zM4.5 2.5v11h7v-11h-7zM5.5 5h5v1h-5V5zm0 2.5h3.5v1H5.5v-1z" />
    </svg>
  )
}

function TabIconAdd() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M8 3a.75.75 0 0 1 .75.75V7h3.25a.75.75 0 0 1 0 1.5H8.75v3.25a.75.75 0 0 1-1.5 0V8.5H4.25a.75.75 0 0 1 0-1.5H7.25V3.75A.75.75 0 0 1 8 3z" />
    </svg>
  )
}

const TAB_ICONS = { query: TabIconQuery, add: TabIconAdd }

const EMPTY_FILTERS = {
  type: '',
  status: 'all',
  identifier: '',
  name: '',
  startDate: '',
  endDate: '',
}

function StatusTag({ status, label }) {
  return <span className={`wl-status wl-status--${status}`}>{label}</span>
}

function formatEffectiveTo(value, t) {
  return value === 'permanent' ? t('ops.whitelist.permanent') : value
}

export default function WhitelistView() {
  const { t } = useTranslation()
  const [tab, setTab] = useState('query')
  const [page, setPage] = useState(1)
  const [entries, setEntries] = useState(mockWhitelist)
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [applied, setApplied] = useState(EMPTY_FILTERS)

  const filtered = useMemo(() => {
    return entries.filter((row) => {
      if (applied.type && row.type !== applied.type) return false
      if (applied.status !== 'all' && row.status !== applied.status) return false
      if (applied.identifier) {
        const q = applied.identifier.toLowerCase()
        if (!row.identifier.toLowerCase().includes(q)) return false
      }
      if (applied.name) {
        const q = applied.name.toLowerCase()
        if (!row.name.toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [entries, applied])

  const totalPages = Math.max(1, Math.ceil(filtered.length / 5))
  const pageRows = filtered
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

  const handleDelete = (id) => {
    if (!window.confirm(t('ops.whitelist.removeConfirm'))) return
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }

  return (
    <div className="ops-view ops-whitelist">
      {tab === 'add' ? (
        <>
          <button type="button" className="wl-back-link" onClick={() => setTab('query')}>
            ← {t('ops.whitelist.add.backToList')}
          </button>
          <header className="ops-whitelist-header">
            <h2>{t('ops.whitelist.add.pageTitle')}</h2>
            <p className="ops-desc">{t('ops.whitelist.add.pageDesc')}</p>
          </header>
        </>
      ) : (
        <header className="ops-whitelist-header">
          <h2>{t('ops.whitelist.title')}</h2>
          <p className="ops-desc">{t('ops.whitelist.desc')}</p>
        </header>
      )}

      <div className="wl-tabs">
        {TABS.map((id) => {
          const Icon = TAB_ICONS[id]
          return (
            <button
              key={id}
              type="button"
              className={`wl-tab ${tab === id ? 'active' : ''}`}
              onClick={() => setTab(id)}
            >
              <Icon />
              {t(`ops.whitelist.tab_${id}`)}
            </button>
          )
        })}
      </div>

      {tab === 'query' ? (
        <>
          <section className="wl-filter-card">
            <div className="wl-filter-row">
              <div className="wl-field">
                <label>{t('ops.whitelist.filterType')}</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))}
                >
                  <option value="">{t('ops.whitelist.selectType')}</option>
                  <option value="customer">{t('ops.whitelist.type_customer')}</option>
                  <option value="ip">{t('ops.whitelist.type_ip')}</option>
                  <option value="wallet">{t('ops.whitelist.type_wallet')}</option>
                </select>
              </div>
              <div className="wl-field">
                <label>{t('ops.whitelist.filterStatus')}</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
                >
                  <option value="all">{t('ops.whitelist.filterAll')}</option>
                  <option value="active">{t('ops.whitelist.status_active')}</option>
                  <option value="expired">{t('ops.whitelist.status_expired')}</option>
                  <option value="invalid">{t('ops.whitelist.status_invalid')}</option>
                </select>
              </div>
              <div className="wl-field">
                <label>{t('ops.whitelist.filterIdentifier')}</label>
                <input
                  value={filters.identifier}
                  onChange={(e) => setFilters((f) => ({ ...f, identifier: e.target.value }))}
                  placeholder={t('ops.whitelist.filterIdentifierPh')}
                />
              </div>
              <div className="wl-field">
                <label>{t('ops.whitelist.filterName')}</label>
                <input
                  value={filters.name}
                  onChange={(e) => setFilters((f) => ({ ...f, name: e.target.value }))}
                  placeholder={t('ops.whitelist.filterNamePh')}
                />
              </div>
            </div>
            <div className="wl-filter-row wl-filter-row--actions">
              <div className="wl-field wl-date-input">
                <label>{t('ops.whitelist.filterStartDate')}</label>
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => setFilters((f) => ({ ...f, startDate: e.target.value }))}
                />
                <svg className="wl-date-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                  <path d="M4.5 2a.5.5 0 0 0-1 0v1h-1A1.5 1.5 0 0 0 1 4.5V12A1.5 1.5 0 0 0 2.5 13.5h11A1.5 1.5 0 0 0 15 12V4.5A1.5 1.5 0 0 0 13.5 3h-1v-1a.5.5 0 0 0-1 0v1h-5V2zM2.5 4.5h11V12h-11V4.5z" />
                </svg>
              </div>
              <div className="wl-field wl-date-input">
                <label>{t('ops.whitelist.filterEndDate')}</label>
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => setFilters((f) => ({ ...f, endDate: e.target.value }))}
                />
                <svg className="wl-date-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                  <path d="M4.5 2a.5.5 0 0 0-1 0v1h-1A1.5 1.5 0 0 0 1 4.5V12A1.5 1.5 0 0 0 2.5 13.5h11A1.5 1.5 0 0 0 15 12V4.5A1.5 1.5 0 0 0 13.5 3h-1v-1a.5.5 0 0 0-1 0v1h-5V2zM2.5 4.5h11V12h-11V4.5z" />
                </svg>
              </div>
              <div className="wl-filter-actions">
                <button type="button" className="wl-btn-reset" onClick={handleReset}>
                  {t('ops.whitelist.reset')}
                </button>
                <button type="button" className="wl-btn-query" onClick={handleQuery}>
                  {t('ops.whitelist.query')}
                </button>
              </div>
            </div>
          </section>

          <section className="wl-table-card">
            <table className="wl-table">
              <thead>
                <tr>
                  <th>{t('ops.whitelist.colSeq')}</th>
                  <th>{t('ops.whitelist.colType')}</th>
                  <th>{t('ops.whitelist.colIdentifier')}</th>
                  <th>{t('ops.whitelist.colName')}</th>
                  <th>{t('ops.whitelist.colEffectiveFrom')}</th>
                  <th>{t('ops.whitelist.colEffectiveTo')}</th>
                  <th>{t('ops.col.status')}</th>
                  <th>{t('ops.whitelist.colAction')}</th>
                </tr>
              </thead>
              <tbody>
                {pageRows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.seq}</td>
                    <td>{t(`ops.whitelist.type_${row.type}`)}</td>
                    <td>{row.identifier}</td>
                    <td>{row.name}</td>
                    <td>{row.effectiveFrom}</td>
                    <td>{formatEffectiveTo(row.effectiveTo, t)}</td>
                    <td>
                      <StatusTag status={row.status} label={t(`ops.whitelist.status_${row.status}`)} />
                    </td>
                    <td>
                      <div className="wl-actions">
                        <button
                          type="button"
                          className="wl-btn-link"
                          onClick={() => window.alert(t('ops.whitelist.viewMock', { id: row.id }))}
                        >
                          {t('ops.whitelist.view')}
                        </button>
                        <button
                          type="button"
                          className="wl-btn-edit"
                          onClick={() => window.alert(t('ops.whitelist.editMock', { id: row.id }))}
                        >
                          {t('ops.whitelist.edit')}
                        </button>
                        <button
                          type="button"
                          className="wl-btn-delete"
                          onClick={() => handleDelete(row.id)}
                        >
                          {t('ops.whitelist.delete')}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="wl-pagination">
              <button
                type="button"
                className="wl-page-btn"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                {t('ops.whitelist.prevPage')}
              </button>
              {pageNumbers.map((n) => (
                <button
                  key={n}
                  type="button"
                  className={`wl-page-num ${page === n ? 'active' : ''}`}
                  onClick={() => setPage(n)}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                className="wl-page-btn"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                {t('ops.whitelist.nextPage')}
              </button>
              <span className="wl-page-total">
                {t('ops.whitelist.totalRecords', { count: filtered.length })}
              </span>
            </div>
          </section>
        </>
      ) : (
        <WhitelistAddForm />
      )}
    </div>
  )
}
