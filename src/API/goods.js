import fetch from '../common/js/request'

export const getGoodsList = () => {
  return fetch({
    url: '/api/makeMoneyTaskList',
    data: {
      pageNum: 1,
      pageSize: 10
    }
  })
}

export const getGoodsDetail = () => {
  return fetch({
    url: '/api/coinsMall/goodsDetail',
    data: {

    }
  })
}

