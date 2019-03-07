import { combineReducers } from 'redux'

import goodsReducer from './goodsReducer'
import userReducer from './userReducer'
import orderReducer from './orderReducer'

const indexReducer = combineReducers({
  goodsReducer,
  userReducer,
  orderReducer
})


export default indexReducer