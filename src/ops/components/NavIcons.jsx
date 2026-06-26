/** 侧边栏彩色图标 — 匹配设计稿 */

export function NavIconHome() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden>
      <path d="M10 2.5 3 8.5V17h4.5v-4.5h5V17H17V8.5L10 2.5z" fill="#f5d0a9" stroke="#c4956a" strokeWidth="0.4" />
      <path d="M10 2.5 3 8.5h14L10 2.5z" fill="#e74c3c" />
      <rect x="8" y="10" width="4" height="3" rx="0.3" fill="#87ceeb" opacity="0.8" />
      <ellipse cx="5" cy="16.5" rx="2" ry="1" fill="#52c41a" />
      <ellipse cx="15" cy="16.5" rx="2" ry="1" fill="#52c41a" />
    </svg>
  )
}

export function NavIconInstitution() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden>
      <path d="M10 2 3 6v1h14V6L10 2z" fill="#94a3b8" />
      <rect x="3" y="7" width="14" height="10" rx="0.5" fill="#cbd5e1" />
      <rect x="5" y="9" width="2.5" height="6" rx="0.3" fill="#64748b" />
      <rect x="8.75" y="9" width="2.5" height="6" rx="0.3" fill="#64748b" />
      <rect x="12.5" y="9" width="2.5" height="6" rx="0.3" fill="#64748b" />
      <rect x="2" y="16.5" width="16" height="1.5" rx="0.3" fill="#94a3b8" />
    </svg>
  )
}

export function NavIconCrosschain() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden>
      <circle cx="7.5" cy="10" r="5" fill="none" stroke="#4096ff" strokeWidth="1.4" />
      <circle cx="12.5" cy="10" r="5" fill="none" stroke="#4096ff" strokeWidth="1.4" />
      <path d="M9.2 8.2 7.2 10l2 1.8" fill="none" stroke="#4096ff" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.8 11.8 12.8 10l-2-1.8" fill="none" stroke="#4096ff" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.8 9.2h1.6v1.6H5.8z" fill="#1677ff" />
      <path d="M12.6 9.2h1.6v1.6h-1.6z" fill="#1677ff" />
    </svg>
  )
}

export function NavIconWhitelist() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden>
      <rect x="4" y="3" width="10" height="13" rx="1" fill="#fff" stroke="#d9d9d9" strokeWidth="0.8" />
      <line x1="6" y1="7" x2="12" y2="7" stroke="#e8e8e8" strokeWidth="0.8" />
      <line x1="6" y1="9.5" x2="12" y2="9.5" stroke="#e8e8e8" strokeWidth="0.8" />
      <line x1="6" y1="12" x2="10" y2="12" stroke="#e8e8e8" strokeWidth="0.8" />
      <path d="M11 13.5 15.5 9l1 1.2-4.5 4.5-1.8.5.3-1.7z" fill="#fa8c16" />
      <path d="M14.5 9.2 15.8 10.5" stroke="#d46b08" strokeWidth="0.6" />
    </svg>
  )
}

export function NavIconMonitor() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden>
      <rect x="3" y="12" width="3.5" height="5" rx="0.5" fill="#52c41a" />
      <rect x="8.25" y="8" width="3.5" height="9" rx="0.5" fill="#eb2f96" />
      <rect x="13.5" y="5" width="3.5" height="12" rx="0.5" fill="#1677ff" />
    </svg>
  )
}

export function NavIconException() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden>
      <path d="M10 2.5 17.5 16H2.5L10 2.5z" fill="#faad14" stroke="#d48806" strokeWidth="0.4" />
      <rect x="9.25" y="8" width="1.5" height="4.5" rx="0.5" fill="#262626" />
      <circle cx="10" cy="14.2" r="0.9" fill="#262626" />
    </svg>
  )
}

const ICON_MAP = {
  overview: NavIconHome,
  institution: NavIconInstitution,
  crosschain: NavIconCrosschain,
  whitelist: NavIconWhitelist,
  monitor: NavIconMonitor,
  exception: NavIconException,
}

export default function NavIcon({ id }) {
  const Icon = ICON_MAP[id] || NavIconHome
  return <Icon />
}
