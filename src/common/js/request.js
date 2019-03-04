import axios from 'axios'
import store from '../../store'
import  fetchUrl  from './config'


const jcnuserid = store.getState().userReducer.jcnuserid

const service = axios.create({
  baseURL: fetchUrl,
  timeout: 15000
})

// 请求配置
service.interceptors.request.use(
  config => {
    config.method = 'post'
    config.data = {
      openId: jcnuserid,
      ...config.data
    }
    return config
  }
)

service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      if (response.data.bizStatus === 0) {
        return Promise.resolve(response)
      }
      return Promise.reject(response)
    }
  },
  err => {
    return Promise.reject(err)
  }
)


export default service