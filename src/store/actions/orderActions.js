

import * as orderServer from '@API/order'
import * as types from '@types/orderTypes'

export const getOrderList = () => async (dispatch) => {
  const orderList = await orderServer.getOrderList().then(res => res.data.orderList)
  return dispatch({
    type: types.GETORDERLIST,
    data: orderList
  })
}