export default function OpsTable({ columns, rows, onRowClick, emptyText }) {
  if (!rows.length) {
    return <p className="ops-empty">{emptyText}</p>
  }
  return (
    <div className="ops-table">
      <div className="ops-table-head" style={{ gridTemplateColumns: columns.map((c) => c.width || '1fr').join(' ') }}>
        {columns.map((col) => (
          <span key={col.key}>{col.label}</span>
        ))}
      </div>
      {rows.map((row) => (
        <div
          key={row.id}
          role={onRowClick ? 'button' : undefined}
          tabIndex={onRowClick ? 0 : undefined}
          className={`ops-table-row ${onRowClick ? 'clickable' : ''}`}
          style={{ gridTemplateColumns: columns.map((c) => c.width || '1fr').join(' ') }}
          onClick={onRowClick ? () => onRowClick(row) : undefined}
          onKeyDown={onRowClick ? (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onRowClick(row)
            }
          } : undefined}
        >
          {columns.map((col) => (
            <span key={col.key} className={col.mono ? 'mono' : ''}>
              {col.render ? col.render(row) : row[col.key]}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}
