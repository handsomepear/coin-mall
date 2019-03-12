import { GETHOMEPAGEDATA } from '@types/homeTypes'

const initialState = {
  homeData: {
    expireCoin: 0,
    expireTime: 0,
    totalCoin: 0,
    navigationList: [],
    bannerList: []
  }
}


const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETHOMEPAGEDATA:
      return {
        ...state,
        homeData: action.homeData
      }

    default:
      return state
  }
}


export default homeReducer
