import req from '../common/js/http'

export const getGoodsList = data => req('/api/coinsMallHomePageGoods', data) // 获取商品列表

export const coinsMallGoodsDetail = data => req('/api/coinsMallGoodsDetail', data)// 获取商品详情

export const coinsMallPreMakeOrderBtnStatus = data => req('/api/coinsMallPreMakeOrderBtnStatus', data) // 获取商品详情的按钮状态

export const coinsMallClassifyGoods = data => req('/api/coinsMallClassifyGoods', data) // 获取分类商品列表

export const coinsMallVipDayStatus = data => req('/api/coinsMallVipDayStatus', data) // 会员日场次状态