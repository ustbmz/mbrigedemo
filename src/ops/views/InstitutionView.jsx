import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { mockInstitutionQueryList } from '../mock/data.js'
import InstitutionAddForm from './InstitutionAddForm.jsx'
import './InstitutionView.css'

const PAGE_SIZE = 5
const TABS = ['query', 'add', 'loginApply', 'loginQuery']

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

function TabIconLock() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M5 7V5a3 3 0 1 1 6 0v2h.5A1.5 1.5 0 0 1 13 8.5v5A1.5 1.5 0 0 1 11.5 15h-7A1.5 1.5 0 0 1 3 13.5v-5A1.5 1.5 0 0 1 4.5 7H5zm1 0h4V5a2 2 0 1 0-4 0v2z" />
    </svg>
  )
}

const TAB_ICONS = {
  query: TabIconQuery,
  add: TabIconAdd,
  loginApply: TabIconLock,
  loginQuery: TabIconLock,
}

function StatusTag({ status, label }) {
  return <span className={`inst-status inst-status--${status}`}>{label}</span>
}

export default function InstitutionView() {
  const { t } = useTranslation()
  const [tab, setTab] = useState('query')
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({
    instType: 'all',
    country: 'all',
    bic: '',
    lei: '',
  })
  const [applied, setApplied] = useState(filters)

  const filtered = useMemo(() => {
    return mockInstitutionQueryList.filter((row) => {
      if (applied.instType !== 'all' && row.instType !== applied.instType) return false
      if (applied.bic && !row.id.toLowerCase().includes(applied.bic.toLowerCase())) return false
      if (applied.lei && !row.nameEn.toLowerCase().includes(applied.lei.toLowerCase())) return false
      return true
    })
  }, [applied])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const pageNumbers = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1)

  const handleReset = () => {
    const empty = { instType: 'all', country: 'all', bic: '', lei: '' }
    setFilters(empty)
    setApplied(empty)
    setPage(1)
  }

  const handleQuery = () => {
    setApplied({ ...filters })
    setPage(1)
  }

  return (
    <div className="ops-view ops-institution">
      <header className="ops-institution-header">
        <h2>{t('ops.institution.title')}</h2>
        <p className="ops-desc">{t('ops.institution.desc')}</p>
      </header>

      <div className="inst-tabs">
        {TABS.map((id) => {
          const Icon = TAB_ICONS[id]
          return (
            <button
              key={id}
              type="button"
              className={`inst-tab ${tab === id ? 'active' : ''}`}
              onClick={() => setTab(id)}
            >
              <Icon />
              {t(`ops.institution.tab_${id}`)}
            </button>
          )
        })}
      </div>

      {tab === 'query' ? (
        <>
          <section className="inst-filter-card">
            <div className="inst-filter-grid">
              <div className="inst-field">
                <label>{t('ops.institution.filterType')}</label>
                <select
                  value={filters.instType}
                  onChange={(e) => setFilters((f) => ({ ...f, instType: e.target.value }))}
                >
                  <option value="all">{t('ops.institution.filterAll')}</option>
                  <option value="commercial">{t('ops.institution.typeCommercial')}</option>
                  <option value="central">{t('ops.institution.typeCentral')}</option>
                </select>
              </div>
              <div className="inst-field">
                <label>{t('ops.institution.filterCountry')}</label>
                <select
                  value={filters.country}
                  onChange={(e) => setFilters((f) => ({ ...f, country: e.target.value }))}
                >
                  <option value="all">{t('ops.institution.filterAll')}</option>
                  <option value="CN">中国</option>
                  <option value="HK">香港</option>
                  <option value="TH">泰国</option>
                  <option value="AE">阿联酋</option>
                </select>
              </div>
              <div className="inst-field">
                <label>{t('ops.institution.filterBic')}</label>
                <input
                  value={filters.bic}
                  onChange={(e) => setFilters((f) => ({ ...f, bic: e.target.value }))}
                  placeholder={t('ops.institution.filterBicPh')}
                />
              </div>
              <div className="inst-field">
                <label>{t('ops.institution.filterLei')}</label>
                <input
                  value={filters.lei}
                  onChange={(e) => setFilters((f) => ({ ...f, lei: e.target.value }))}
                  placeholder={t('ops.institution.filterLeiPh')}
                />
              </div>
            </div>
            <div className="inst-filter-actions">
              <button type="button" className="inst-btn-reset" onClick={handleReset}>
                {t('ops.institution.reset')}
              </button>
              <button type="button" className="inst-btn-query" onClick={handleQuery}>
                {t('ops.institution.query')}
              </button>
            </div>
          </section>

          <section className="inst-table-card">
            <table className="inst-table">
              <thead>
                <tr>
                  <th>{t('ops.institution.colCode')}</th>
                  <th>{t('ops.institution.colNameZh')}</th>
                  <th>{t('ops.institution.colNameEn')}</th>
                  <th>{t('ops.institution.colType')}</th>
                  <th>{t('ops.institution.colCurrency')}</th>
                  <th>{t('ops.col.status')}</th>
                  <th>{t('ops.institution.colAction')}</th>
                </tr>
              </thead>
              <tbody>
                {pageRows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.nameZh}</td>
                    <td>{row.nameEn}</td>
                    <td>{t(`ops.institution.type_${row.instType}`)}</td>
                    <td>{row.currency}</td>
                    <td>
                      <StatusTag
                        status={row.status}
                        label={t(`ops.institution.status_${row.status}`)}
                      />
                    </td>
                    <td>
                      <div className="inst-actions">
                        <button
                          type="button"
                          className="inst-btn-view"
                          onClick={() => window.alert(t('ops.institution.viewMock', { id: row.id }))}
                        >
                          {t('ops.institution.view')}
                        </button>
                        <button
                          type="button"
                          className={`inst-btn-edit ${row.editEnabled ? 'active' : ''}`}
                          disabled={!row.editEnabled}
                          onClick={() => row.editEnabled && window.alert(t('ops.institution.editMock', { id: row.id }))}
                        >
                          {t('ops.institution.edit')}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="inst-pagination">
              <button
                type="button"
                className="inst-page-btn"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                {t('ops.institution.prevPage')}
              </button>
              {pageNumbers.map((n) => (
                <button
                  key={n}
                  type="button"
                  className={`inst-page-num ${page === n ? 'active' : ''}`}
                  onClick={() => setPage(n)}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                className="inst-page-btn"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                {t('ops.institution.nextPage')}
              </button>
              <span className="inst-page-total">
                {t('ops.institution.totalRecords', { count: filtered.length })}
              </span>
            </div>
          </section>
        </>
      ) : tab === 'add' ? (
        <InstitutionAddForm onBack={() => setTab('query')} />
      ) : (
        <div className="inst-placeholder">{t('ops.institution.tabPlaceholder')}</div>
      )}
    </div>
  )
}
