import * as orderServer from '@API/order'
import * as types from '@types/orderTypes'

export const getOrderList = (pageNo, pageSize = 10) => async dispatch => {
  const orderList = await orderServer.coinsMallOrderList({
    pageNo, pageSize
  }).then(res => res.data.coinsMallOrderList)

  return dispatch({
    type: types.GETORDERLIST,
    data: {
      currentPage: pageNo,
      orderList,
      hasMoreOrder: orderList && pageSize <= orderList.length
    }
  })
}

// 下单
export const coinsMallMakeOrder = ({ goodsId, skuId, os }) => async dispatch => {
  const res = await orderServer.coinsMallMakeOrder({ goodsId, skuId, os }).then()
  return dispatch({
    type: types.MAKEORDER,
    exchangeRes: res
  })
}

export const getOrderDetail = (orderNumber) => async dispatch => {
  const orderDetail = await orderServer.coinsMallOrderInfo({orderNumber}).then(res => res.data)
  return dispatch({
    type: types.GETORDERINFO,
    orderDetail: orderDetail
  })
}