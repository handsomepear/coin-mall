
import { GETGOODSLIST, GETGOODSDETAIL, GETBUTTONSTATUS, GETCLASSIFYGOODSLIST, UPDATECHOOSEDSKUINFO } from '@types/goodsTypes'
import { handleActions } from 'redux-actions'

const initialState = {
  homeGoodsList: [],
  classifyGoodsList: [],
  goodsDetail: null,
  buttonStatus: 1,
  choosedSkuInfo: null
}

const goodsReducer = handleActions({
  [GETGOODSLIST]: (state, action) => {
    if (action.data.currentPage > 1) {
      action.data.homeGoodsList = state.homeGoodsList.concat(action.data.homeGoodsList)
    }
    return {
      ...state,
      homeGoodsList: action.data.homeGoodsList
    }
  },
  [GETGOODSDETAIL]: (state, action) => ({ ...state, goodsDetail: action.goodsDetail }),
  [GETBUTTONSTATUS]: (state, action) => ({ ...state, buttonStatus: action.buttonStatus }),
  [GETCLASSIFYGOODSLIST]: (state, action) => {
    if (action.data.currentPage > 1) {
      action.data.classifyGoodsList = state.classifyGoodsList.concat(action.data.classifyGoodsList)
    }
    return {
      ...state,
      classifyGoodsList: action.data.classifyGoodsList
    }
  },
  [UPDATECHOOSEDSKUINFO]: (state, action) => ({ ...state, choosedSkuInfo: action.choosedSkuInfo })
}, initialState)


export default goodsReducer
