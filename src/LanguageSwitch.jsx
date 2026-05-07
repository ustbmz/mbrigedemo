import { useTranslation } from 'react-i18next'

export default function LanguageSwitch({ className = '' }) {
  const { i18n, t } = useTranslation()
  const lng = i18n.resolvedLanguage || i18n.language

  return (
    <div className={`lang-switch ${className}`.trim()} role="group" aria-label={t('langSwitch.aria')}>
      <button
        type="button"
        className={`lang-switch-btn ${lng === 'zh' ? 'active' : ''}`}
        onClick={() => void i18n.changeLanguage('zh')}
      >
        {t('langSwitch.zh')}
      </button>
      <button
        type="button"
        className={`lang-switch-btn ${lng === 'en' ? 'active' : ''}`}
        onClick={() => void i18n.changeLanguage('en')}
      >
        {t('langSwitch.en')}
      </button>
    </div>
  )
}
