import { checkLoggingStatus } from '@actions/userAction'

window.getUserInfo = function (userInfo) {
  const oUserInfo = JSON.parse(userInfo)
  checkLoggingStatus(oUserInfo.id !== 0)
}



if(window.app_interface) {
  window.appLoginFinish = (status) => {
    if(status === 200) {
      window.app_interface.getHersUserInfo('getUserInfo')
    }
    window.app_interface.getHersUserInfo('getUserInfo')
  }
}