import * as types from '@types/orderTypes'


const initialState = {
  orderList: []
}


const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.MAKEORDER:
      return state
    case types.GETORDERLIST:
      // 如果当前页不是第一页，合并保存到store中的数据
      if (action.data.currentPage > 1) {
        action.data.orderList = state.orderList.concat(action.data.orderList)
      }
      return {
        ...state,
        orderList: action.data.orderList
      }
    case types.GETORDERINFO:
      return {
        ...state,
        orderInfo: action.orderInfo
      }
    default:
      return state
  }
}

export default orderReducer