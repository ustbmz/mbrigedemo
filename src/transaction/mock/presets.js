import { TRANSACTION_SCENES } from './constants.js'

const today = () => new Date().toISOString().slice(0, 10)

export function createInitialForm(scene = TRANSACTION_SCENES.FX_OUT, fxCurrency = 'THB') {
  const base = {
    scene,
    fxCurrency,
    payerIdType: 'account',
    payerAccount: '6222021001234567890',
    payerWalletId: '',
    payerAccountName: '深圳星海电子有限公司',
    payerWalletName: '',
    payerName: '深圳星海电子有限公司',
    payerNameEn: 'Shenzhen Xinghai Electronics Co., Ltd.',
    payerAddress: '深圳市南山区科技园南路88号',
    receiverIdType: 'account',
    receiverAccount: 'TQ1s9R7kF2dG5hJ8zL0pN3vB6xC',
    receiverWalletId: '',
    receiverAccountName: 'Bangkok Global Trade Co., Ltd.',
    receiverWalletName: '',
    receiverName: 'Bangkok Global Trade Co., Ltd.',
    receiverNameEn: 'Bangkok Global Trade Co., Ltd.',
    receiverAddress: '123 Sukhumvit Road, Bangkok, Thailand',
    receiverBic: 'BKKBTHBK',
    receiverBankName: 'Bangkok International Bank',
    remittanceAmount: '',
    remittancePurpose: '货物贸易货款',
    remarks: '',
    settlementDate: today(),
    feeBearer: 'DEBT',
    tradeType: '货物贸易结算',
    goods: '消费电子零部件',
    contractNo: 'SZ-TH-2026-0418',
    customsMode: '一般贸易',
  }

  if (scene === TRANSACTION_SCENES.CNY_OUT) {
    return {
      ...base,
      remittancePurpose: '跨境人民币贸易结算',
      contractNo: 'SZ-TH-2026-0418',
    }
  }

  const bicMap = {
    THB: { bic: 'BKKBTHBK', bank: 'Bangkok International Bank', contract: 'SZ-TH-2026-0418' },
    HKD: { bic: 'HKICHKHH', bank: 'Hong Kong International Clearing Bank', contract: 'SZ-HK-2026-0520' },
    AED: { bic: 'ABAEADXXX', bank: 'Abu Dhabi Commercial Bank', contract: 'SZ-AE-2026-0515' },
  }
  const preset = bicMap[fxCurrency] || bicMap.THB

  return {
    ...base,
    receiverBic: preset.bic,
    receiverBankName: preset.bank,
    contractNo: preset.contract,
  }
}
