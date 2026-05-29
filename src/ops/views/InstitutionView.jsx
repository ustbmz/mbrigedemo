import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import OpsTable from '../components/OpsTable.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { mockAdmissionRequests, mockInstitutions } from '../mock/data.js'

export default function InstitutionView() {
  const { t } = useTranslation()
  const [tab, setTab] = useState('admission')
  const [requests, setRequests] = useState(mockAdmissionRequests)
  const [selected, setSelected] = useState(null)

  const handleApprove = (id) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'ENBL', stage: 'approved' } : r)))
    window.alert(t('ops.admission.approveMock', { id }))
    setSelected(null)
  }

  const handleReject = (id) => {
    const reason = window.prompt(t('ops.admission.rejectPrompt'))
    if (reason === null) return
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'RJCT', stage: 'rejected', rejectReason: reason } : r)))
    window.alert(t('ops.admission.rejectMock', { id, reason }))
    setSelected(null)
  }

  return (
    <div className="ops-view">
      <h2>{t('ops.institution.title')}</h2>
      <p className="ops-desc">{t('ops.institution.desc')}</p>

      <div className="ops-tabs">
        <button type="button" className={tab === 'admission' ? 'active' : ''} onClick={() => { setTab('admission'); setSelected(null) }}>
          {t('ops.institution.tabAdmission')}
        </button>
        <button type="button" className={tab === 'profile' ? 'active' : ''} onClick={() => { setTab('profile'); setSelected(null) }}>
          {t('ops.institution.tabProfile')}
        </button>
      </div>

      {tab === 'admission' ? (
        <div className="ops-split">
          <OpsTable
            columns={[
              { key: 'id', label: t('ops.col.id'), width: '1.3fr', mono: true },
              { key: 'institutionName', label: t('ops.col.institution'), width: '1.5fr' },
              { key: 'operation', label: t('ops.col.operation'), width: '0.8fr', render: (r) => t(`ops.admission.op_${r.operation}`) },
              { key: 'status', label: t('ops.col.status'), width: '0.8fr', render: (r) => <StatusBadge status={r.status} label={t(`ops.status.${r.status}`)} /> },
            ]}
            rows={requests}
            onRowClick={setSelected}
            emptyText={t('ops.empty')}
          />
          {selected ? (
            <aside className="ops-detail">
              <h3>{t('ops.detail.title')}</h3>
              <dl className="ops-dl">
                <dt>{t('ops.col.id')}</dt><dd className="mono">{selected.id}</dd>
                <dt>{t('ops.col.institution')}</dt><dd>{selected.institutionName}</dd>
                <dt>{t('ops.col.bic')}</dt><dd className="mono">{selected.bic}</dd>
                <dt>{t('ops.col.operation')}</dt><dd>{t(`ops.admission.op_${selected.operation}`)}</dd>
                <dt>{t('ops.col.reason')}</dt><dd>{selected.reason}</dd>
                <dt>{t('ops.col.submittedAt')}</dt><dd>{selected.submittedAt}</dd>
                <dt>{t('ops.col.stage')}</dt><dd>{t(`ops.admission.stage_${selected.stage}`)}</dd>
              </dl>
              {selected.status === 'INIT' ? (
                <div className="ops-action-row">
                  <button type="button" className="btn primary" onClick={() => handleApprove(selected.id)}>{t('ops.action.approve')}</button>
                  <button type="button" className="btn secondary" onClick={() => handleReject(selected.id)}>{t('ops.action.reject')}</button>
                </div>
              ) : null}
            </aside>
          ) : null}
        </div>
      ) : (
        <OpsTable
          columns={[
            { key: 'nameZh', label: t('ops.col.nameZh'), width: '1.4fr' },
            { key: 'bic', label: t('ops.col.bic'), width: '1fr', mono: true },
            { key: 'lei', label: t('ops.col.lei'), width: '1.2fr', mono: true },
            { key: 'country', label: t('ops.col.country'), width: '0.6fr' },
            { key: 'status', label: t('ops.col.status'), width: '0.8fr', render: (r) => <StatusBadge status={r.status} label={t(`ops.status.${r.status}`)} /> },
          ]}
          rows={mockInstitutions}
          emptyText={t('ops.empty')}
        />
      )}
    </div>
  )
}
