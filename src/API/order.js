import req from '@common/js/http'

export const coinsMallMakeOrder = data => req('/api/coinsMallMakeOrder', data) // 下单

export const getOrderList = data => req('', data) // 获取订单列表