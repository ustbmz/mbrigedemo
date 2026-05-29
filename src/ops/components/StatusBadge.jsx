export default function StatusBadge({ status, label }) {
  const cls = `ops-badge ops-badge-${String(status).toLowerCase()}`
  return <span className={cls}>{label || status}</span>
}
