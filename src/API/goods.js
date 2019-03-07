import req from '../common/js/http'

export const getGoodsList = data => req('', data) // 获取商品列表

export const getGoodsDetail = data => req('/api/coinsMallGoodsDetail', data)// 获取商品详情