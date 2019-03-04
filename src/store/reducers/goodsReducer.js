import * as types from '../types/goodTypes'

const initialState = {
  goodsList: [],
  goodsDetail: []
}


const goodsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GETGOODSLIST:
      return {
        ...state,
        goodsList: action.data
      }
    case types.ADDGOODS:
      return {
        ...state,
        goodsList: state.goodsList.push(action.data)
      }
    case types.GETGOODSDETAIL:
      return {
        ...state,
        goodsDetail: action.data
      }
    default:
      return state
  }
}


export default goodsReducer
