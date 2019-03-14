import { GETHOMEPAGEDATA, SETPREVPATHNAME } from '@types/homeTypes'
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
  }
}

const homeReducer = handleActions({
  [GETHOMEPAGEDATA]: (state, action) => ({ ...state, homeData: {...action.homeData, hasHomeData: true} }),
  [SETPREVPATHNAME]: (state, action) => ({ ...state, prevPathname: action.prevPathname })
}, initialState)


export default homeReducer
