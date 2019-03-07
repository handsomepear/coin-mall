import * as types from '@types/userTypes'
import { _getQueryString } from '@common/js/tool'

const initialState = {
  jcnuserid: _getQueryString('jcnuserid'),
  loggingStatus: false, // 登录状态
  address: null,
  isVip: false
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
    case types.GETUSERINFO:
      return {
        ...state,
        address: action.data.userAddress,
        isVip: action.data.userIsVipFlag
      }
    default:
      return state
  }
}


export default userReducer