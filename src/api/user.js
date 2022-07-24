import request from '@/utils/request'

export const loginApi = data => request({
  method: 'post',
  url: '/sys/login',
  data,
})

export const getUserInfoApi = () => request({
  method: 'post',
  url: '/sys/profile',
})

export const getuserBaseInfoApi = id => request({
  url: '/sys/user/' + id,
})

