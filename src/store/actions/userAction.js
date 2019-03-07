import store from '@store'
import * as types from '@types/userTypes'
import * as userServer from '@API/user'
// 检查登录状态
export const checkLoggingStatus = (status) => store.dispatch({ type: types.CHECKLOGGINGSTATUS, status })


export const doLogin = () => store.dispatch({ type: types.LOGIN })


export const getUserInfo = () => async dispatch => {
  const userInfo = await userServer.coinsMallOrderUserInfo().then(res => {
    return { userAddress: res.data.userAddress, userIsVipFlag: res.data.userIsVipFlag }
  })
  return dispatch({
    type: types.GETUSERINFO,
    data: userInfo
  })
}