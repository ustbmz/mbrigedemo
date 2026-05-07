import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import zh from './locales/zh.json'
import en from './locales/en.json'

const STORAGE_KEY = 'mbrigedemo-lang'

function readStoredLng() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function persistLng(lng) {
  try {
    localStorage.setItem(STORAGE_KEY, lng)
  } catch {
    /* ignore */
  }
}

function applyDocumentLang(lng) {
  if (typeof document === 'undefined') return
  document.documentElement.lang = lng === 'en' ? 'en' : 'zh-CN'
}

const stored = typeof window !== 'undefined' ? readStoredLng() : null
const initialLng = stored === 'en' || stored === 'zh' ? stored : 'en'

void i18n.use(initReactI18next).init({
  resources: {
    zh: { translation: zh },
    en: { translation: en },
  },
  lng: initialLng,
  fallbackLng: 'zh',
  interpolation: { escapeValue: false },
})

applyDocumentLang(i18n.language)
i18n.on('languageChanged', (lng) => {
  applyDocumentLang(lng)
  persistLng(lng)
})

export default i18n
