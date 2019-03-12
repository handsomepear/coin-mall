import * as types from '@types/goodTypes'

const initialState = {
  homeGoodsList: [],
  classifyGoodsList: [],
  goodsDetail: null,
  buttonStatus: 1,
  choosedSkuInfo: null
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
    // 更新选中的sku信息
    case types.UPDATECHOOSEDSKUINFO:
      return {
        ...state,
        choosedSkuInfo: action.choosedSkuInfo
      }
    default:
      return state
  }
}


export default goodsReducer
