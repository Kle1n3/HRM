import request from '@/utils/request'

export const getPermissionListApi = () => request({
    url: '/sys/permission',
})

export const getPermissionInfoApi = id => request({
    url: '/sys/permission/' + id,
})

export const addDepartmentApi = data => request({
    method: 'post',
    url: '/sys/permission',
    data,
})

export const editDepartmentInfoApi = data => request({
    method: 'put',
    url: '/sys/permission/' + data.id,
    data,
})

export const delDepartmentApi = id => request({
    method: 'delete',
    url: '/sys/permission/' + id,
})