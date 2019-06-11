import { CHECKLOGGINGSTATUS, GETUSERINFO, LOGIN, SAVEADDRESS } from '@types/userTypes'
import { _getQueryString } from '@common/js/tool'
import { handleActions } from 'redux-actions'

const initialState = {
  // FIXME:check
  jcnuserid: _getQueryString('jcnuserid') || '36cb1a3459046e45c02d60ac4372c966',
  // jcnuserid: _getQueryString('jcnuserid'),
  loggingStatus: false, // 登录状态
  address: {
    area: '',
    cellNumber: '',
    detailLocation: '',
    userName: ''
  },
  isVip: null, // 是否是vip
  coinsCount: 0 // 金币数
}


const userReducer = handleActions({
  // 检测登录状态
  [CHECKLOGGINGSTATUS]: (state, action) => ({ ...state, loggingStatus: action.status }),
  //  获取用户信息
  [GETUSERINFO]: (state, action) => ({
    ...state, address: action.data.userAddress,
    isVip: action.data.userIsVipFlag,
    coinsCount: action.data.coinsCount
  }),
  //  登录
  [LOGIN]: (state, action) => ({ ...state, loggingStatus: action.status }),
  //  保存地址
  [SAVEADDRESS]: (state, action) => ({ ...state, address: action.address })
}, initialState)


export default userReducer