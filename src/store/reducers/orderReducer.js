import * as types from '@types/orderTypes'


const initialState = {}


const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.MAKEORDER:
      return state
    default:
      return state
  }
}

export default orderReducer