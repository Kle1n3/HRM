import request from '@/utils/request'

export const getDepartmentsListApi = () => request({
    url: '/company/department',
})

export const getDepartmentsInfoApi = id => request({
    url: '/company/department/' + id,
})

export const addDepartmentApi = data => request({
    method: 'post',
    url: '/company/department',
    data,
})

export const editDepartmentInfoApi = data => request({
    method: 'put',
    url: '/company/department/' + data.id,
    data,
})

export const delDepartmentApi = id => request({
    method: 'delete',
    url: '/company/department/' + id,
})