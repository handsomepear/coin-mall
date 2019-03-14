import { checkLoggingStatus } from '@actions/userActions'

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
}

