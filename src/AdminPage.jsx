import './AdminPage.css'

const MOCK_APPROVALS = [
  { id: 'MB-20260420-0010', title: '付款主体权限核验', status: '待审批' },
  { id: 'MB-20260420-0009', title: '收款方信息一致性复核', status: '待审批' },
  { id: 'MB-20260420-0007', title: '反洗钱与制裁筛查确认', status: '待审批' },
]

export default function AdminPage({ theme, loginTimeText, onLogout, onGoHome }) {
  return (
    <main className={`app theme-${theme}`}>
      <header className="admin-header">
        <div className="admin-title">
          <strong>管理员管理页</strong>
          <small>Admin Console</small>
        </div>
        <div className="admin-actions">
          <span className="admin-pill">登录时间：{loginTimeText || '-'}</span>
          <button type="button" className="btn secondary" onClick={onGoHome}>
            返回柜面
          </button>
          <button type="button" className="btn primary" onClick={onLogout}>
            退出登录
          </button>
        </div>
      </header>

      <section className="admin-grid">
        <div className="admin-card">
          <h3>待办概览</h3>
          <div className="admin-kpis">
            <div className="admin-kpi">
              <small>待审批任务</small>
              <strong>{MOCK_APPROVALS.length}</strong>
            </div>
            <div className="admin-kpi">
              <small>待复核用户</small>
              <strong>6</strong>
            </div>
            <div className="admin-kpi">
              <small>系统告警</small>
              <strong>1</strong>
            </div>
          </div>
        </div>

        <div className="admin-card">
          <h3>审批队列</h3>
          <div className="admin-table">
            <div className="admin-table-head">
              <span>流水号</span>
              <span>事项</span>
              <span>状态</span>
              <span />
            </div>
            {MOCK_APPROVALS.map((row) => (
              <div className="admin-table-row" key={row.id}>
                <span className="mono">{row.id}</span>
                <span>{row.title}</span>
                <span className="status-wait">{row.status}</span>
                <button
                  type="button"
                  className="btn secondary small"
                  onClick={() => {
                    // Demo: no real approval API.
                    // Keep UI responsive without introducing external dependencies.
                    window.alert(`已打开审批：${row.id}`)
                  }}
                >
                  审批
                </button>
              </div>
            ))}
          </div>
          <p className="admin-hint">注：当前为前端演示页面，审批操作未接入后端接口。</p>
        </div>
      </section>
    </main>
  )
}

