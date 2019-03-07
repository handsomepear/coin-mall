import * as types from '@types/userTypes'
import { _getQueryString } from '@common/js/tool'
const initialState = {
  jcnuserid: _getQueryString('jcnuserid') || '36cb1a3459046e45c02d60ac4372c966',
  loggingStatus: false, // 登录状态
  address: {
    area: '北京市,直辖区,昌平区',
    cellNumber: '17801111226',
    detailLocation:'新龙城',
    userName: 'Zps'
  },
  isVip: false,
  coinsCount: 0 // 金币数
}


const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // 检测登录状态
    case types.CHECKLOGGINGSTATUS:
      return {
        ...state,
        loggingStatus: action.status
      }
    //  获取用户信息
    case types.GETUSERINFO:
      return {
        ...state,
        address: action.data.userAddress,
        isVip: action.data.userIsVipFlag,
        coinsCount: action.data.coinsCount
      }
    //  登录
    case types.LOGIN:
      return {
        ...state,
        loggingStatus: action.status
      }
    //  保存地址
    case types.SAVEADDRESS:
      return {
        ...state,
        address: action.address
      }
    default:
      return state
  }
}


export default userReducer