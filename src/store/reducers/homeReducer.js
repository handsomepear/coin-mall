import { GETHOMEPAGEDATA,SETPREVPATHNAME } from '@types/homeTypes'

const initialState = {
  homeData: {
    expireCoin: 0,
    expireTime: 0,
    totalCoin: 0,
    navigationList: [],
    bannerList: [],
    prevPathname: null
  }
}


const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETHOMEPAGEDATA:
      return {
        ...state,
        homeData: action.homeData
      }
    case SETPREVPATHNAME:
      return {
        ...state,
        prevPathname: action.prevPathname
      }
    default:
      return state
  }
}


export default homeReducer
