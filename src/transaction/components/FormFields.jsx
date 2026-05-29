export function FormInput({ label, error, className = '', ...props }) {
  return (
    <label className={`form-field ${className}`}>
      <span className="form-label">{label}</span>
      <input className={`form-input ${error ? 'invalid' : ''}`} {...props} />
      {error ? <small className="error-text">{error}</small> : null}
    </label>
  )
}

export function FormSelect({ label, error, options, className = '', ...props }) {
  return (
    <label className={`form-field ${className}`}>
      <span className="form-label">{label}</span>
      <select className={`form-input ${error ? 'invalid' : ''}`} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error ? <small className="error-text">{error}</small> : null}
    </label>
  )
}

export function FormSection({ title, children }) {
  return (
    <div className="form-section">
      <h4 className="form-section-title">{title}</h4>
      <div className="form-grid">{children}</div>
    </div>
  )
}

export function SectionCard({ title, children }) {
  return (
    <section className="section-card">
      <h3>{title}</h3>
      {children}
    </section>
  )
}

export function KvGrid({ items }) {
  return (
    <div className="kv-grid">
      {items.map((item) => (
        <div className="kv-item" key={item.label}>
          <span className="label">{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </div>
  )
}

export function PreconditionResults({ checks }) {
  return (
    <div className="precondition-list">
      {checks.map((check) => (
        <div className={`precondition-item ${check.ok ? 'ok' : 'fail'}`} key={check.id}>
          <span className="precondition-icon">{check.ok ? '✓' : '✗'}</span>
          <div>
            <strong>{check.label}</strong>
            <small>{check.detail}</small>
          </div>
        </div>
      ))}
    </div>
  )
}
