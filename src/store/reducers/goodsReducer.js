import * as types from '@types/goodTypes'

const initialState = {
  homeGoodsList: [],
  classifyGoodsList: [],
  goodsDetail: null
}


const goodsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GETGOODSLIST:
      return {
        ...state,
        homeGoodsList: action.homeGoodsList
      }
    case types.GETGOODSDETAIL:
      return {
        ...state,
        goodsDetail: action.goodsDetail
      }
    case types.GETBUTTONSTATUS:
      return {
        ...state,
        buttonStatus: action.buttonStatus
      }
    case types.GETCLASSIFYGOODSLIST:
      return {
        ...state,
        classifyGoodsList: action.data.classifyGoodsList
      }
    default:
      return state
  }
}


export default goodsReducer
