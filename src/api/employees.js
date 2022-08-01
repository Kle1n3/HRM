import request from '@/utils/request'

export const getEmployeeSimpleListApi = () => request({
    url: '/sys/user/simple',
})

export const getEmployListApi = (params) => request({
    url: '/sys/user',
    params,
})