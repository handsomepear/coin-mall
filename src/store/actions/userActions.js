import store from '@store'
import * as types from '@types/userTypes'
import * as userServer from '@API/user'
// 检查登录状态
export const checkLoggingStatus = status => store.dispatch({ type: types.CHECKLOGGINGSTATUS, status })

// 登录
export const doLogin = () => dispatch => {
  if (window.app_interface) {
    window.app_interface.appLogin(1)
  }
  return dispatch({
    type: types.LOGIN
  })
}

// 获取用户信息
export const getUserInfo = () => async dispatch => {
  const userInfo = await userServer.coinsMallOrderUserInfo().then(res => {
    return { userAddress: res.data.userAddress, userIsVipFlag: res.data.userIsVipFlag, coinsCount: res.data.coinsCount }
  }).catch(err => err.data)

  return dispatch({
    type: types.GETUSERINFO,
    data: userInfo,
  })
}

// 保存地址
export const saveAddress = () => async dispatch => {
  const res = await userServer.saveAddress().then(res => res.data).catch(err => err.data)
  return dispatch({
    type: types.SAVEADDRESS
  })
}