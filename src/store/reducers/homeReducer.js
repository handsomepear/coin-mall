import { GETHOMEPAGEDATA, SETPREVPATHNAME, SETINDEXSCROLLPOSITION } from '@types/homeTypes'
import { handleActions } from 'redux-actions'

const initialState = {
  homeData: {
    expireCoin: 0,
    expireTime: 0,
    totalCoin: 0,
    navigationList: [],
    bannerList: [],
    prevPathname: null,
    hasHomeData: false
  },
  // 首页滚动条位置
  indexScrollPositionY: 0
}

const homeReducer = handleActions({
  [GETHOMEPAGEDATA]: (state, action) => ({ ...state, homeData: { ...action.homeData, hasHomeData: true } }),
  [SETPREVPATHNAME]: (state, action) => ({ ...state, prevPathname: action.prevPathname }),
  [SETINDEXSCROLLPOSITION]:(state, action) => ({...state, indexScrollPositionY: action.scrollPositionY})
}, initialState)


export default homeReducer
