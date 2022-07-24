import { loginApi, getUserInfoApi, getuserBaseInfoApi } from '@/api/user'
import { getToken, setToken, removeToken, setLoginTime } from '@/utils/auth'

const state = {
  token: getToken(),
  userInfo: {},
}
const mutations = {
  setToken(state, data) {
    state.token = data
    setToken(data)
    setLoginTime()
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  setUserInfo(state, data) {
    state.userInfo = data
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  async login(context, data) {
    const token = await loginApi(data)
    context.commit('setToken', token)
  },
  async getUserInfo(context) {
    const res = await getUserInfoApi()
    const res2 = await getuserBaseInfoApi(res.userId)
    context.commit('setUserInfo', { ...res, ...res2 })
  },
  async logout(context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}

