import req from '@common/js/http'

export const coinsMallMakeOrder = data => req('/api/coinsMallMakeOrder', data) // 下单

export const getOrderList = data => req('/api/coinsMallOrderList', data) // 获取订单列表

export const getOrderInfo = data => req('/api/coinsMallOrderInfo', data) // 获取订单详情