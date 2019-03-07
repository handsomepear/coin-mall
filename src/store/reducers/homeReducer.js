import {GETHOMEPAGEDATA} from '@types/homeTypes'

const initialState = {
  homeData: null
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
