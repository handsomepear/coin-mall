import { checkLoggingStatus } from '@actions/userActions'

window.getUserInfo = function (userInfo) {
  const oUserInfo = JSON.parse(userInfo)
  checkLoggingStatus(oUserInfo.id !== 0)
}



if(window.app_interface) {
  window.app_interface.appLoginFinish = (status) => {
    if(status === 200) {
      // 登录成功
      checkLoggingStatus(true)
    }else {
      // 登录失败
      checkLoggingStatus(false)
    }
  }
  // 获取她社区的账号信息
  window.app_interface.getHersUserInfo('getUserInfo')
}

