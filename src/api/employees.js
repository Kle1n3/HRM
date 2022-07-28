import request from '@/utils/request'

export const getEmployeeSimpleListApi = () => request({
    url: '/sys/user/simple',
})