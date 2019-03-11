import * as types from '@types/goodTypes'

const initialState = {
  homeGoodsList: [],
  classifyGoodsList: [],
  goodsDetail: null
}


const goodsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GETGOODSLIST:
      if(action.data.currentPage > 1) {
        action.data.homeGoodsList = state.homeGoodsList.concat(action.data.homeGoodsList)
      }
      return {
        ...state,
        homeGoodsList: action.data.homeGoodsList
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
      if(action.data.currentPage > 1) {
        action.data.classifyGoodsList = state.classifyGoodsList.concat(action.data.classifyGoodsList)
      }
      return {
        ...state,
        classifyGoodsList: action.data.classifyGoodsList
      }
    default:
      return state
  }
}


export default goodsReducer
