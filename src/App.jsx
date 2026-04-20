import { useEffect, useMemo, useState } from 'react'
import './App.css'

const FLOW_STEPS = [
  '通道选 mBridge',
  '付款信息',
  '收款信息',
  '贸易背景',
  '单据上传',
  '自动校验',
  '转账确认',
  '处理中',
  '交易成功',
  '回单申报',
]

const tradeData = {
  orderNo: 'MB-20260420-0007',
  payerCompany: '深圳星海电子有限公司',
  payerBank: '中国银行深圳分行',
  payCurrency: 'CNY',
  payAmount: '1,000,000.00',
  receiverCompany: 'Bangkok Global Trade Co., Ltd.',
  receiverBank: 'Bangkok International Bank',
  receiveCurrency: 'THB',
  receiveAmount: '4,500,000.00',
  fxRate: '1 CNY = 4.5 THB',
  tradeType: '货物贸易结算',
  goods: '消费电子零部件',
}

const LOADING_TASKS = {
  checking: [
    '校验付款主体与账户权限',
    '核验收款方信息一致性',
    '比对合同与发票金额',
    '执行反洗钱与制裁筛查',
    '生成自动校验报告',
  ],
  processing: [
    '锁定付款账户与头寸',
    '提交 mBridge 跨境指令',
    '多边账本共识确认',
    '收款行清算入账处理',
    '生成交易回执与审计日志',
  ],
}

function SectionCard({ title, children }) {
  return (
    <section className="section-card">
      <h3>{title}</h3>
      {children}
    </section>
  )
}

function KvGrid({ items }) {
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

function UploadList() {
  return (
    <div className="upload-list">
      <div className="upload-dropzone">
        <div className="upload-icon">↑</div>
        <p>将文件拖拽到此处，或点击上传</p>
        <small>支持 PDF/JPG/PNG，单文件不超过 20MB（演示界面）</small>
        <button type="button" className="btn secondary upload-trigger">
          选择文件
        </button>
      </div>
      <div className="upload-item">
        <span>商业发票.pdf</span>
        <em>已上传</em>
      </div>
      <div className="upload-item">
        <span>购销合同.pdf</span>
        <em>已上传</em>
      </div>
      <div className="upload-item">
        <span>报关单.pdf</span>
        <em>已上传</em>
      </div>
    </div>
  )
}

function HomeDashboard({ onStartMBridge }) {
  return (
    <section className="home-dashboard">
      <div className="dashboard-topbar">
        <strong>宇信科技 | 金融工作台</strong>
        <div className="dashboard-search">请输入内容</div>
        <div className="topbar-actions">
          <span>消息</span>
          <span>帮助</span>
          <span>工号：999990</span>
        </div>
      </div>

      <div className="dashboard-body">
        <div className="dashboard-left">
          <div className="welcome-card">
            <h3>尊敬的王丹女士，欢迎您！</h3>
            <p>上次登录时间：2026-04-20 08:22:32</p>
            <small>当前流水号：T202609180023</small>
          </div>

          <div className="quick-panel">
            <h4>常用功能</h4>
            <div className="quick-grid">
              <button type="button" className="quick-item"><span>开户</span></button>
              <button type="button" className="quick-item"><span>付款</span></button>
              <button type="button" className="quick-item"><span>复核</span></button>
              <button type="button" className="quick-item"><span>综合查询</span></button>
              <button type="button" className="quick-item"><span>结汇</span></button>
              <button type="button" className="quick-item"><span>销户</span></button>
              <button type="button" className="quick-item"><span>客户360查询</span></button>
              <button type="button" className="quick-item mbridge-entry" onClick={onStartMBridge}>
                <span>mBridge 交易</span>
              </button>
            </div>
          </div>

          <div className="data-panel">
            <h4>今日跨境交易概览</h4>
            <div className="kpi-row">
              <div className="kpi-item"><small>交易笔数</small><strong>128</strong></div>
              <div className="kpi-item"><small>交易总额（CNY）</small><strong>58,420,000</strong></div>
              <div className="kpi-item"><small>成功率</small><strong>99.21%</strong></div>
            </div>
          </div>

          <div className="data-panel">
            <h4>近期交易</h4>
            <div className="mini-table">
              <div className="mini-table-head">
                <span>流水号</span><span>币种/金额</span><span>状态</span>
              </div>
              <div className="mini-table-row">
                <span>MB-20260420-0011</span><span>CNY 680,000 / THB 3,060,000</span><em className="ok">成功</em>
              </div>
              <div className="mini-table-row">
                <span>MB-20260420-0010</span><span>CNY 220,000 / AED 112,200</span><em className="wait">处理中</em>
              </div>
              <div className="mini-table-row">
                <span>MB-20260420-0009</span><span>CNY 1,000,000 / THB 4,500,000</span><em className="ok">成功</em>
              </div>
            </div>
          </div>
        </div>

        <aside className="dashboard-right">
          <div className="right-card">
            <h4>代办事项</h4>
            <div className="todo-metrics">
              <div><strong>12</strong><small>待复核任务</small></div>
              <div><strong>26</strong><small>工作事项备忘</small></div>
            </div>
          </div>

          <div className="right-card">
            <h4>紧急公告</h4>
            <ul className="notice-list">
              <li>mBridge 跨境结算维护窗口：今日 20:00-20:30</li>
              <li>货物贸易真实性审核策略已更新</li>
              <li>泰铢清算通道已恢复，状态正常</li>
            </ul>
          </div>

          <div className="right-card">
            <h4>汇率看板</h4>
            <ul className="rate-list">
              <li><span>CNY/THB</span><strong>4.5000</strong></li>
              <li><span>CNY/AED</span><strong>0.5100</strong></li>
              <li><span>CNY/HKD</span><strong>1.0810</strong></li>
            </ul>
          </div>

          <div className="right-card">
            <h4>系统运行状态</h4>
            <div className="status-grid">
              <div><span>mBridge 网络</span><em className="ok">正常</em></div>
              <div><span>反洗钱引擎</span><em className="ok">正常</em></div>
              <div><span>外汇申报接口</span><em className="warn">轻微延迟</em></div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

function App() {
  const [view, setView] = useState('login')
  const [flowStep, setFlowStep] = useState(0)
  const [loadingPhase, setLoadingPhase] = useState('')
  const [loadingProgress, setLoadingProgress] = useState(0)

  const progress = useMemo(
    () => Math.round(((flowStep + 1) / FLOW_STEPS.length) * 100),
    [flowStep],
  )

  useEffect(() => {
    if (view !== 'flow') {
      setLoadingPhase('')
      setLoadingProgress(0)
      return
    }
    let finishTimer
    let intervalTimer
    if (flowStep === 5) {
      setLoadingPhase('checking')
      setLoadingProgress(0)
      intervalTimer = window.setInterval(() => {
        setLoadingProgress((prev) => Math.min(prev + 1, LOADING_TASKS.checking.length))
      }, 1000)
      finishTimer = window.setTimeout(() => {
        window.clearInterval(intervalTimer)
        setLoadingPhase('')
        setLoadingProgress(0)
        setFlowStep(6)
      }, 5000)
    } else if (flowStep === 7) {
      setLoadingPhase('processing')
      setLoadingProgress(0)
      intervalTimer = window.setInterval(() => {
        setLoadingProgress((prev) => Math.min(prev + 1, LOADING_TASKS.processing.length))
      }, 1000)
      finishTimer = window.setTimeout(() => {
        window.clearInterval(intervalTimer)
        setLoadingPhase('')
        setLoadingProgress(0)
        setFlowStep(8)
      }, 5000)
    } else {
      setLoadingPhase('')
      setLoadingProgress(0)
    }
    return () => {
      if (finishTimer) window.clearTimeout(finishTimer)
      if (intervalTimer) window.clearInterval(intervalTimer)
    }
  }, [flowStep, view])

  const stepContent = [
    <SectionCard title="通道选择">
      <KvGrid items={[
        { label: '通道', value: 'mBridge 多边央行数字货币桥' },
        { label: '路由策略', value: '优先最优汇率 + 实时到账' },
        { label: '预计时效', value: 'T+0，约 30 秒内' },
        { label: '网络状态', value: '可用' },
      ]} />
    </SectionCard>,
    <SectionCard title="付款信息填写">
      <KvGrid items={[
        { label: '付款企业', value: tradeData.payerCompany },
        { label: '付款银行', value: tradeData.payerBank },
        { label: '付款金额', value: `${tradeData.payAmount} ${tradeData.payCurrency}` },
        { label: '付款账户', value: '1045 0001 8823 5600 22' },
      ]} />
    </SectionCard>,
    <SectionCard title="收款信息填写">
      <KvGrid items={[
        { label: '收款企业', value: tradeData.receiverCompany },
        { label: '收款银行', value: tradeData.receiverBank },
        { label: '收款金额', value: `${tradeData.receiveAmount} ${tradeData.receiveCurrency}` },
        { label: '收款账户', value: 'TH42 0192 7788 0055 3341' },
      ]} />
    </SectionCard>,
    <SectionCard title="贸易背景录入">
      <KvGrid items={[
        { label: '贸易类型', value: tradeData.tradeType },
        { label: '货物名称', value: tradeData.goods },
        { label: '合同编号', value: 'SZ-TH-2026-0418' },
        { label: '报关方式', value: '一般贸易' },
      ]} />
    </SectionCard>,
    <SectionCard title="单据上传"><UploadList /></SectionCard>,
    null,
    <SectionCard title="转账确认">
      <KvGrid items={[
        { label: '汇率', value: tradeData.fxRate },
        { label: '汇兑后金额', value: `${tradeData.receiveAmount} ${tradeData.receiveCurrency}` },
        { label: '手续费', value: '0.00 CNY（演示）' },
        { label: '到账模式', value: '实时到账' },
      ]} />
    </SectionCard>,
    null,
    <SectionCard title="交易成功">
      <div className="success-box">
        <h4>交易已成功完成</h4>
        <KvGrid items={[
          { label: '交易流水号', value: 'TXN-MB-20260420-889912' },
          { label: '付款金额', value: `${tradeData.payAmount} ${tradeData.payCurrency}` },
          { label: '收款金额', value: `${tradeData.receiveAmount} ${tradeData.receiveCurrency}` },
          { label: '完成时间', value: '2026-04-20 15:26:18' },
        ]} />
      </div>
    </SectionCard>,
    <SectionCard title="回单申报">
      <KvGrid items={[
        { label: '回单状态', value: '待提交监管申报' },
        { label: '申报口径', value: '货物贸易跨境收付汇' },
        { label: '申报系统', value: '国家外汇管理局数字接口' },
        { label: '操作建议', value: '点击“提交申报”完成闭环' },
      ]} />
      <div className="action-row">
        <button type="button" className="btn secondary">下载电子回单</button>
        <button type="button" className="btn primary">提交申报</button>
      </div>
    </SectionCard>,
  ]

  const canPrev = flowStep > 0
  const canNext = flowStep < FLOW_STEPS.length - 1

  if (view === 'login') {
    return (
      <main className="login-page">
        <section className="login-hero">
          <div className="brand-row"><div className="brand-mark" /><strong> 柜面系统</strong></div>
          <h1>欢迎登录中国银行深圳分行金融工作台</h1>
          <p>支持跨境支付经办、复核、回单申报全流程统一处理。</p>
          <div className="hero-cubes"><span /><span /><span /></div>
        </section>
        <section className="login-card">
          <div className="login-tabs">
            <button type="button" className="active">密码登录</button>
            <button type="button">指纹登录</button>
            <button type="button">人脸识别</button>
            <button type="button">组合登录</button>
          </div>
          <h3>柜员登录</h3>
          <label className="field"><span>柜员号</span><input value="TELLER_SZ_0091" readOnly /></label>
          <label className="field"><span>所属机构</span><input value="中国银行深圳分行" readOnly /></label>
          <label className="field"><span>登录口令</span><input value="••••••••" readOnly /></label>
          <button type="button" className="btn primary login-btn" onClick={() => setView('home')}>
            立即登录
          </button>
        </section>
      </main>
    )
  }

  if (view === 'home') {
    return (
      <main className="app">
        <HomeDashboard onStartMBridge={() => { setFlowStep(0); setView('flow') }} />
      </main>
    )
  }

  return (
    <main className="app">
      <header className="header">
        <div>
          <h1>数字人民币 mBridge 跨境支付</h1>
          {/* <p>银行正式蓝色风格 Demo - 全套交易页面</p> */}
        </div>
        <div className="badge">进度 {progress}%</div>
      </header>

      <div className="workspace">
        <aside className="stepper">
          {FLOW_STEPS.map((step, index) => {
            const state = index < flowStep ? 'done' : index === flowStep ? 'active' : 'todo'
            return (
              <button key={step} type="button" className={`step-item ${state}`} onClick={() => setFlowStep(index)}>
                <span>{index + 1}</span>
                <em>{step}</em>
              </button>
            )
          })}
        </aside>
        <section className="panel">
          <div className="panel-title">
            <h2>{FLOW_STEPS[flowStep]}</h2>
            <small>步骤 {flowStep + 1} / {FLOW_STEPS.length}</small>
          </div>
          <div className="step-page" data-step={flowStep + 1}>
            <div className="step-page-header">
              <span className="step-page-chip">STEP {flowStep + 1}</span>
              <strong className="step-page-title">{FLOW_STEPS[flowStep]}</strong>
            </div>
            <div className="step-page-body">
              {flowStep === 5 ? (
                <div className="processing-inline-tip">正在自动校验交易要素，请稍候...</div>
              ) : flowStep === 7 ? (
                <div className="processing-inline-tip">正在提交到 mBridge 网络，请稍候...</div>
              ) : (
                stepContent[flowStep]
              )}
            </div>
          </div>
        </section>
      </div>

      <footer className="footer-nav">
        <button type="button" className="btn secondary" onClick={() => setFlowStep((s) => s - 1)} disabled={!canPrev}>
          上一步
        </button>
        <button type="button" className="btn primary" onClick={() => setFlowStep((s) => s + 1)} disabled={!canNext || Boolean(loadingPhase)}>
          下一步
        </button>
      </footer>

      <section className="promo-footer">
        <div>
          <strong>mBridge 跨境支付平台</strong>
          <p>实时结算、链路可视、合规可审计，助力企业跨境资金高效流转。</p>
        </div>
        <div className="promo-tags">
          <span>T+0 到账</span><span>7x24 服务</span><span>多币种清算</span>
        </div>
        <button type="button" className="btn secondary">查看产品介绍</button>
      </section>

      {loadingPhase ? (
        <div className="loading-overlay" role="status" aria-live="polite">
          <div className="loading-card">
            <div className="loader-ring" />
            <p>{loadingPhase === 'checking' ? '自动校验中' : 'mBridge 网络处理中'}</p>
            <small>{loadingPhase === 'checking' ? '正在核验主体一致性、金额匹配与合规规则...' : '正在完成跨境结算与多边账本记账...'}</small>
            <div className="loading-progress-track">
              <div className="loading-progress-fill" style={{ width: `${(loadingProgress / LOADING_TASKS[loadingPhase].length) * 100}%` }} />
            </div>
            <div className="loading-task-list">
              {LOADING_TASKS[loadingPhase].map((task, index) => {
                const done = index < loadingProgress
                return (
                  <div key={task} className={`loading-task ${done ? 'done' : ''}`}>
                    <span>{done ? '✓' : index + 1}</span>
                    <em>{task}</em>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}

export default App
