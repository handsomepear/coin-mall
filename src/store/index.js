import { applyMiddleware, createStore, compose } from 'redux'

import thunk from 'redux-thunk'
import logger from 'redux-logger'
import indexReducer from './reducers/indexReducer'

const store = createStore(
  indexReducer,
  compose(
    applyMiddleware(thunk, logger)
  )
)

export default store