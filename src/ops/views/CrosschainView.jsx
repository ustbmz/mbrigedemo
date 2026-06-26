import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import CnyOutForm from './CnyOutForm.jsx'
import FxOutForm from './FxOutForm.jsx'
import './CrosschainView.css'

const TABS = ['cnyOut', 'fxOut', 'fxRecords']

function TabIconCny() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zm-.25 2v1.5h-1.5a.75.75 0 0 0 0 1.5h1.5V9h1.5V6.5h1.5a.75.75 0 0 0 0-1.5H9.25V3.5h-1.5z" />
    </svg>
  )
}

function TabIconFx() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M3 3.5A1.5 1.5 0 0 1 4.5 2h7A1.5 1.5 0 0 1 13 3.5v9A1.5 1.5 0 0 1 11.5 14h-7A1.5 1.5 0 0 1 3 12.5v-9zM4.5 3.5v9h7v-9h-7zM6 5h4v1H6V5zm0 2.5h2.5v1H6v-1z" />
    </svg>
  )
}

function TabIconRecords() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v11a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 13.5v-11zM4.5 2.5v11h7v-11h-7zM5.5 5h5v1h-5V5zm0 2.5h3.5v1H5.5v-1zm0 2.5h2v1h-2v-1z" />
    </svg>
  )
}

const TAB_ICONS = { cnyOut: TabIconCny, fxOut: TabIconFx, fxRecords: TabIconRecords }

export default function CrosschainView({ onBack }) {
  const { t } = useTranslation()
  const [tab, setTab] = useState('cnyOut')

  return (
    <div className="ops-view ops-crosschain">
      <button type="button" className="xc-back-link" onClick={onBack}>
        ← {t('ops.crosschain.backHome')}
      </button>

      <header className="ops-crosschain-header">
        <h2>{t('ops.crosschain.title')}</h2>
        <p className="ops-desc">{t('ops.crosschain.desc')}</p>
      </header>

      <div className="xc-tabs">
        {TABS.map((id) => {
          const Icon = TAB_ICONS[id]
          return (
            <button
              key={id}
              type="button"
              className={`xc-tab ${tab === id ? 'active' : ''}`}
              onClick={() => setTab(id)}
            >
              <Icon />
              {t(`ops.crosschain.tab_${id}`)}
            </button>
          )
        })}
      </div>

      {tab === 'cnyOut' ? (
        <CnyOutForm />
      ) : tab === 'fxOut' ? (
        <FxOutForm />
      ) : (
        <div className="xc-placeholder">{t('ops.crosschain.tabPlaceholder')}</div>
      )}
    </div>
  )
}
