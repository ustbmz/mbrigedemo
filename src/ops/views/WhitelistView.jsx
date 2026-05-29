import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import OpsTable from '../components/OpsTable.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { mockWhitelist } from '../mock/data.js'

export default function WhitelistView() {
  const { t } = useTranslation()
  const [entries, setEntries] = useState(mockWhitelist)
  const [filter, setFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')

  const filtered = useMemo(() => {
    return entries.filter((e) => {
      if (typeFilter !== 'all' && e.type !== typeFilter) return false
      if (!filter.trim()) return true
      const q = filter.toLowerCase()
      return e.name.toLowerCase().includes(q) || e.account.toLowerCase().includes(q)
    })
  }, [entries, filter, typeFilter])

  const handleAdd = () => {
    window.alert(t('ops.whitelist.addMock'))
  }

  const handleRemove = (id) => {
    if (!window.confirm(t('ops.whitelist.removeConfirm'))) return
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }

  return (
    <div className="ops-view">
      <h2>{t('ops.whitelist.title')}</h2>
      <p className="ops-desc">{t('ops.whitelist.desc')}</p>

      <div className="ops-toolbar">
        <input className="ops-search" placeholder={t('ops.whitelist.search')} value={filter} onChange={(e) => setFilter(e.target.value)} />
        <select className="ops-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="all">{t('ops.whitelist.allTypes')}</option>
          <option value="customer">{t('ops.whitelist.type_customer')}</option>
          <option value="institution">{t('ops.whitelist.type_institution')}</option>
          <option value="wallet">{t('ops.whitelist.type_wallet')}</option>
          <option value="ip">{t('ops.whitelist.type_ip')}</option>
        </select>
        <button type="button" className="btn primary" onClick={handleAdd}>{t('ops.whitelist.add')}</button>
      </div>

      <OpsTable
        columns={[
          { key: 'type', label: t('ops.col.type'), width: '0.9fr', render: (r) => t(`ops.whitelist.type_${r.type}`) },
          { key: 'name', label: t('ops.col.name'), width: '1.4fr' },
          { key: 'account', label: t('ops.col.account'), width: '1.3fr', mono: true },
          { key: 'bic', label: t('ops.col.bic'), width: '1fr', mono: true },
          { key: 'effectiveTo', label: t('ops.col.effectiveTo'), width: '0.9fr' },
          { key: 'status', label: t('ops.col.status'), width: '0.7fr', render: (r) => <StatusBadge status={r.status} label={t(`ops.whitelist.status_${r.status}`)} /> },
          { key: 'actions', label: '', width: '0.6fr', render: (r) => (
            <button type="button" className="btn-link" onClick={(e) => { e.stopPropagation(); handleRemove(r.id) }}>{t('ops.action.remove')}</button>
          ) },
        ]}
        rows={filtered}
        emptyText={t('ops.empty')}
      />
    </div>
  )
}
