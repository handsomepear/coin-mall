import fetch from '../common/js/request'

export const getGoodsList = () => {
  return fetch({
    url: '',
    data: {
      pageNum: 1,
      pageSize: 10
    }
  })
}
// 获取商品详情
export const getGoodsDetail = () => {
  return fetch({
    url: '/api/coinsMallGoodsDetail',
    data: {

    }
  })
}

