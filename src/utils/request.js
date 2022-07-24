import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getLoginTime } from './auth'
import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

const timeLength = 2 * 1000 * 60 * 60
// const timeLength = 2 * 1000 * 5
const duration = () => {
  const nowTime = Date.now()
  const loginTime = getLoginTime()
  return (nowTime - loginTime) >= timeLength
}

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    const token = store.getters.token
    if (token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      if (duration()) {
        Message.error('登录已过期，请重新登录')
        store.dispatch('user/logout')
        router.push('/login')
        return Promise.reject("登录已过期，请重新登录");
      }
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const { success, data, message } = response.data
    if (success) {
      return data
    }
    else {
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  error => {
    if (error.response && error.response.status === 401 && error.response.data.code === 10002) {
      Message.error('登录已过期，请重新登录')
      store.dispatch('user/logout')
      router.push('/login')
    }
    Promise.reject(error)
  }

)

export default service
