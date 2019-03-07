import * as orderServer from '@API/order'
import * as types from '@types/orderTypes'

export const getOrderList = (pageNo, pageSize = 10) => async dispatch => {
  const orderList = await orderServer.getOrderList({
    pageNo, pageSize
  }).then(res => res.data.orderList)

  return dispatch({
    type: types.GETORDERLIST,
    data: {
      currentPage: pageNo,
      orderList: orderList
    }
  })
}


export const coinsMallMakeOrder = ({ goodsId, skuId }) => async dispatch => {
  await orderServer.coinsMallMakeOrder({ goodsId, skuId }).then()
  return dispatch({
    type: types.MAKEORDER
  })
}