import { combineReducers } from 'redux'

import goodsReducer from './goodsReducer'
import userReducer from './userReducer'

const indexReducer = combineReducers({
  goodsReducer,
  userReducer
})


export default indexReducer