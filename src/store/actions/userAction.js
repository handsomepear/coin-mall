

import store from '@store'
import * as types from '@types/userTypes'

export const checkLoggingStatus = (status) => {
  return store.dispatch({
    type: types.CHECKLOGGINGSTATUS,
    status
  })
}