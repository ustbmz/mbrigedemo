import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { mockTxnTrackDetails } from '../mock/data.js'

function StatusCell({ status, label }) {
  return <span className={`txn-status txn-status--${status}`}>{label}</span>
}

export default function TxnTrackModal({ row, onClose }) {
  const { t } = useTranslation()
  const track = mockTxnTrackDetails[row.id] ?? {
    summaryTime: row.txnTime,
    steps: [
      { step: 'init', status: 'success', time: row.txnTime },
    ],
  }

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="txn-track-overlay" onClick={onClose} role="presentation">
      <div
        className="txn-track-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="txn-track-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="txn-track-header">
          <h3 id="txn-track-title">{t('ops.monitor.trackTitle')}</h3>
          <button type="button" className="txn-track-close" onClick={onClose} aria-label={t('ops.monitor.trackClose')}>
            ×
          </button>
        </header>

        <div className="txn-track-summary">
          <div className="txn-track-summary-col">
            <div className="txn-track-kv">
              <span className="txn-track-k">{t('ops.monitor.filterTxnNo')}</span>
              <span className="txn-track-v">{row.txnNo}</span>
            </div>
            <div className="txn-track-kv">
              <span className="txn-track-k">{t('ops.monitor.filterScene')}</span>
              <span className="txn-track-v">{t(`ops.monitor.scene_${row.scene}`)}</span>
            </div>
            <div className="txn-track-kv">
              <span className="txn-track-k">{t('ops.monitor.colTxnTime')}</span>
              <span className="txn-track-v">{track.summaryTime}</span>
            </div>
          </div>
          <div className="txn-track-summary-col">
            <div className="txn-track-kv">
              <span className="txn-track-k">{t('ops.monitor.filterTxnId')}</span>
              <span className="txn-track-v">{row.txnId}</span>
            </div>
            <div className="txn-track-kv">
              <span className="txn-track-k">{t('ops.monitor.trackCurrentStatus')}</span>
              <span className="txn-track-v">
                <StatusCell status={row.status} label={t(`ops.monitor.status_${row.status}`)} />
              </span>
            </div>
            <div className="txn-track-kv">
              <span className="txn-track-k">{t('ops.monitor.colException')}</span>
              <span className="txn-track-v">
                {row.exceptionReason || <span className="txn-reason-empty">-</span>}
              </span>
            </div>
          </div>
        </div>

        <div className="txn-track-timeline">
          {track.steps.map((item, index) => {
            const isLast = index === track.steps.length - 1
            const dotClass = item.status === 'failed'
              ? 'failed'
              : item.status === 'processing'
                ? 'processing'
                : 'success'

            return (
              <div key={`${item.step}-${index}`} className={`txn-track-step ${isLast ? 'is-last' : ''}`}>
                <div className="txn-track-rail">
                  <span className={`txn-track-dot txn-track-dot--${dotClass}`} />
                  {!isLast && <span className="txn-track-line" />}
                </div>
                <div className="txn-track-card">
                  <div className="txn-track-card-main">
                    <span className="txn-track-step-name">{t(`ops.monitor.step_${item.step}`)}</span>
                    <span className="txn-track-step-time">{item.time}</span>
                  </div>
                  <span className={`txn-track-step-badge txn-track-step-badge--${item.status}`}>
                    {t(`ops.monitor.stepStatus_${item.status}`)}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
