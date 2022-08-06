import request from '@/utils/request'

export const getRolesListApi = (params) => request({
    url: '/sys/role',
    params,
})

export const getRolesInfoApi = id => request({
    url: '/sys/role/' + id,
})

export const addRoleApi = data => request({
    method: 'post',
    url: '/sys/role',
    data,
})

export const editRoleInfoApi = data => request({
    method: 'put',
    url: '/sys/role/' + data.id,
    data,
})

export const delRoleApi = id => request({
    method: 'delete',
    url: '/sys/role/' + id,
})

export const getCompanyInfoApi = id => request({
    url: '/company/' + id,
})

// 给角色分配权限
export const assignAuthApi = data => request({
    method: 'PUT',
    url: '/sys/role/assignPrem',
    data,
})