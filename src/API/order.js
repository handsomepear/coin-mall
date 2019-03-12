import req from '@common/js/http'

export const coinsMallMakeOrder = data => req('/api/coinsMallMakeOrder', data) // 下单

export const coinsMallOrderList = data => req('/api/coinsMallOrderList', data) // 获取订单列表

export const coinsMallOrderInfo = data => req('/api/coinsMallOrderInfo', data) // 获取订单详情