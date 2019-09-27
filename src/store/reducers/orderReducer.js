import { MAKEORDER, GETORDERLIST, GETORDERINFO, MAKEVOWORDER } from '@types/orderTypes'
import { handleActions } from 'redux-actions'

const initialState = {
  orderList: [],
  orderDetail: null
}


const orderReducer = handleActions({
  [MAKEORDER]: (state) => state,
  [MAKEVOWORDER]: state => state,
  [GETORDERLIST]: (state, action) => {
    // 如果当前页不是第一页，合并保存到store中的数据
    if (action.data.currentPage > 1) {
      action.data.orderList = state.orderList.concat(action.data.orderList)
    }
    return {
      ...state,
      orderList: action.data.orderList
    }
  },
  [GETORDERINFO]: (state, action) => ({...state, orderDetail: action.orderDetail})
}, initialState)

export default orderReducer