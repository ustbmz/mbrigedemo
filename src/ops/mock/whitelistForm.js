/** 新增白名单表单 — Mock 数据 */

export const emptyWhitelistForm = {
  type: 'customer',
  customerId: '',
  customerName: '',
  idType: '',
  idNumber: '',
  riskLevel: '',
  industry: '',
  walletId: '',
  walletName: '',
  ipAddress: '',
  ipDesc: '',
  effectiveFrom: '',
  effectiveTo: '',
  status: '',
}

export const mockWhitelistFormDraft = {
  type: 'customer',
  customerId: 'CUST202601001',
  customerName: '张三',
  idType: 'id_card',
  idNumber: '110101199001011234',
  riskLevel: 'low',
  industry: 'finance',
  walletId: '',
  walletName: '',
  ipAddress: '',
  ipDesc: '',
  effectiveFrom: '2026-01-01',
  effectiveTo: '',
  status: 'active',
}
