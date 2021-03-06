import {
  GETGOODSLIST, GETGOODSDETAIL, GETBUTTONSTATUS, GETCLASSIFYGOODSLIST, UPDATECHOOSEDSKUINFO, GETALLRECEIVEGIFTCOUNT
} from '@types/goodsTypes'
import { handleActions } from 'redux-actions'
import { _send1_1 } from '@/common/js/tool'

const initialState = {
  homeGoodsList: [],
  pageNum: 1,
  pageSize: 10,
  hasMoreGoods: true,
  classifyGoodsList: [],
  goodsDetail: null,
  buttonStatus: 1,
  allReceivedGiftCount: 0, // 可领取生日礼物的次数
  choosedSkuInfo: null
}

const goodsReducer = handleActions({
  // 获取首页商品列表
  [GETGOODSLIST]: (state, action) => {
    action.data.homeGoodsList.forEach(good => {
      _send1_1(`show-${good.goodsId}`)
    })
    if (action.data.homeGoodsList.length >= state.pageSize) {
      state.pageNum = ++state.pageNum
    } else {
      state.hasMoreGoods = false
    }
    if (state.pageNum > 1) {
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
    action.data.classifyGoodsList.forEach(good => {
      _send1_1(`show-${good.goodsId}`)
    })
    if (action.data.currentPage > 1) {
      action.data.classifyGoodsList = state.classifyGoodsList.concat(action.data.classifyGoodsList)
    }
    return {
      ...state,
      classifyGoodsList: action.data.classifyGoodsList
    }
  },
  [UPDATECHOOSEDSKUINFO]: (state, action) => ({ ...state, choosedSkuInfo: action.choosedSkuInfo }),
  [GETALLRECEIVEGIFTCOUNT]: (state, action) => ({ ...state, allReceivedGiftCount: action.allReceivedGiftCount })
}, initialState)


export default goodsReducer
