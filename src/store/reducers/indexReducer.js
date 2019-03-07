import { combineReducers } from 'redux'

import goodsReducer from './goodsReducer'
import userReducer from './userReducer'
import orderReducer from './orderReducer'
import homeReducer from './homeReducer'

const indexReducer = combineReducers({
  goodsReducer,
  userReducer,
  orderReducer,
  homeReducer
})


export default indexReducer