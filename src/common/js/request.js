import axios from 'axios'
import store from '../../store'
import fetchUrl from './config'


const jcnuserid = store.getState().userReducer.jcnuserid

const service = axios.create({
  baseURL: '',
  timeout: 15000
})

// 请求配置
service.interceptors.request.use(
  config => {
    config.method = 'post'
    config.data = {
      // jcnuserid: jcnuserid,
      ...config.data
    }
    return config
  }
)

service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    }
  },
  err => {
    return Promise.reject(err)
  }
)


export default service