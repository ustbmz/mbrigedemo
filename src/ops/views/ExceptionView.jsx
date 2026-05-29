import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import OpsTable from '../components/OpsTable.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { mockExceptions, mockRefunds } from '../mock/data.js'

export default function ExceptionView() {
  const { t } = useTranslation()
  const [tab, setTab] = useState('exception')
  const [exceptions, setExceptions] = useState(mockExceptions)
  const [refunds, setRefunds] = useState(mockRefunds)
  const [selected, setSelected] = useState(null)

  const handleRefund = (exc) => {
    const newRefund = {
      id: `RF-${Date.now()}`,
      txnId: exc.txnId,
      type: 'passive',
      amount: exc.amount,
      currency: exc.currency,
      status: 'pending_approval',
      reason: exc.failReason,
      submittedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    }
    setRefunds((prev) => [newRefund, ...prev])
    setExceptions((prev) => prev.map((e) => (e.id === exc.id ? { ...e, status: 'pending_refund' } : e)))
    window.alert(t('ops.exception.refundMock', { id: exc.txnId }))
    setSelected(null)
  }

  const handleApproveRefund = (id) => {
    setRefunds((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'approved' } : r)))
    window.alert(t('ops.exception.approveRefundMock', { id }))
  }

  return (
    <div className="ops-view">
      <h2>{t('ops.exception.title')}</h2>
      <p className="ops-desc">{t('ops.exception.desc')}</p>

      <div className="ops-tabs">
        <button type="button" className={tab === 'exception' ? 'active' : ''} onClick={() => { setTab('exception'); setSelected(null) }}>
          {t('ops.exception.tabSettlement')}
        </button>
        <button type="button" className={tab === 'refund' ? 'active' : ''} onClick={() => { setTab('refund'); setSelected(null) }}>
          {t('ops.exception.tabRefund')}
        </button>
      </div>

      {tab === 'exception' ? (
        <div className="ops-split">
          <OpsTable
            columns={[
              { key: 'txnId', label: t('ops.col.txnId'), width: '1.2fr', mono: true },
              { key: 'scene', label: t('ops.col.scene'), width: '0.8fr', render: (r) => t(`ops.txn.scene_${r.scene}`) },
              { key: 'amount', label: t('ops.col.amount'), width: '1fr', render: (r) => `${r.currency} ${r.amount.toLocaleString()}` },
              { key: 'failReason', label: t('ops.col.failReason'), width: '1.2fr' },
              { key: 'status', label: t('ops.col.status'), width: '0.9fr', render: (r) => <StatusBadge status={r.status} label={t(`ops.exception.status_${r.status}`)} /> },
            ]}
            rows={exceptions}
            onRowClick={setSelected}
            emptyText={t('ops.empty')}
          />
          {selected ? (
            <aside className="ops-detail">
              <h3>{t('ops.exception.detailTitle')}</h3>
              <dl className="ops-dl">
                <dt>{t('ops.col.txnId')}</dt><dd className="mono">{selected.txnId}</dd>
                <dt>{t('ops.col.failCode')}</dt><dd className="mono">{selected.failCode}</dd>
                <dt>{t('ops.col.failReason')}</dt><dd>{selected.failReason}</dd>
                <dt>{t('ops.col.suspenseAcct')}</dt><dd className="mono">{selected.suspenseAcct}</dd>
                <dt>{t('ops.col.payer')}</dt><dd>{selected.payerName} ({selected.payerInst})</dd>
                <dt>{t('ops.col.receiver')}</dt><dd>{selected.receiverName} ({selected.receiverInst})</dd>
              </dl>
              {selected.status === 'pending_review' ? (
                <div className="ops-action-row">
                  <button type="button" className="btn primary" onClick={() => handleRefund(selected)}>{t('ops.exception.triggerRefund')}</button>
                  <button type="button" className="btn secondary" onClick={() => window.alert(t('ops.exception.correctMock'))}>{t('ops.exception.correctEntry')}</button>
                </div>
              ) : null}
            </aside>
          ) : null}
        </div>
      ) : (
        <OpsTable
          columns={[
            { key: 'id', label: t('ops.col.id'), width: '1.2fr', mono: true },
            { key: 'txnId', label: t('ops.col.txnId'), width: '1.2fr', mono: true },
            { key: 'amount', label: t('ops.col.amount'), width: '1fr', render: (r) => `${r.currency} ${r.amount.toLocaleString()}` },
            { key: 'reason', label: t('ops.col.reason'), width: '1.2fr' },
            { key: 'status', label: t('ops.col.status'), width: '0.9fr', render: (r) => <StatusBadge status={r.status} label={t(`ops.refund.status_${r.status}`)} /> },
            { key: 'actions', label: '', width: '0.7fr', render: (r) => r.status === 'pending_approval' ? (
              <button type="button" className="btn secondary small" onClick={(e) => { e.stopPropagation(); handleApproveRefund(r.id) }}>{t('ops.action.approve')}</button>
            ) : null },
          ]}
          rows={refunds}
          emptyText={t('ops.empty')}
        />
      )}
    </div>
  )
}
