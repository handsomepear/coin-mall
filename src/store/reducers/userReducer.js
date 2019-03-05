import * as types from '@types/userTypes'
import { _getQueryString } from '@common/js/tool'

const initialState = {
  jcnuserid: _getQueryString('jcnuserid'),
  loggingStatus: false // 登录状态
}


const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GETJCNUSERID:
      return {
        ...state,
        jcnuserid: action.jcnuserid
      }
    case types.CHECKLOGGINGSTATUS:
      return {
        ...state,
        loggingStatus: action.status
      }
    default:
      return state
  }
}


export default userReducer