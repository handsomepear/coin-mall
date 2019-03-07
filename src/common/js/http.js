import axios from 'axios'
import store from '../../store'
// import baseURL from './config'


const jcnuserid = store.getState().userReducer.jcnuserid

const instance = axios.create({
  baseURL: '',
  timeout: 15000
})

// 请求配置
instance.interceptors.request.use(
  config => {
    config.headers = {
      'Content-Type': 'multipart/form-data'
    }
    const formData = new FormData()
    formData.append('jcnuserid', jcnuserid)
    for (let k in config.data) {
      if (config.data.hasOwnProperty(k)) {
        formData.append(k, config.data[k])
      }
    }
    config.data = formData
    return config
  }
)

instance.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    }
  },
  err => {
    return Promise.reject(err)
  }
)


export default function (url, data = null, method = 'POST') {
  method = method.toUpperCase()
  if (method === 'POST') {
    return instance.post(url, data)
  } else if (method === 'GET') {
    return instance.get(url, { params: data })
  } else {
    console.error("未知的method" + method)
    return false
  }

}