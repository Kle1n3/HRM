import Cookies from 'js-cookie'

const TokenKey = 'HRM_TOKEN'
const loginTime = 'HRM_LOGIN_TIME'

export const setLoginTime = () => Cookies.set(loginTime, Date.now())
export const getLoginTime = () => Cookies.get(loginTime)

export const getToken = () => Cookies.get(TokenKey)

export const setToken = (token) => Cookies.set(TokenKey, token)

export const removeToken = () => Cookies.remove(TokenKey)



