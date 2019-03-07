import * as types from '@types/goodTypes'

const initialState = {
  goodsList: [],
  goodsDetail: null
}


const goodsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GETGOODSLIST:
      return {
        ...state,
        goodsList: action.goodsList
      }
    case types.GETGOODSDETAIL:
      return {
        ...state,
        goodsDetail: action.goodsDetail
      }
    default:
      return state
  }
}


export default goodsReducer
