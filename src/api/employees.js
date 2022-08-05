import request from '@/utils/request'

export const getEmployeeSimpleListApi = () => request({
    url: '/sys/user/simple',
})

export const getEmployListApi = (params) => request({
    url: '/sys/user',
    params,
})

// 批量导入员工
export const importEmployees = data => request({
    method: 'post',
    url: '/sys/user/batch',
    data,
})

// 新增员工
export const addEmployee = data => request({
    method: 'post',
    url: '/sys/user',
    data,
})

// 保存员工基本信息
export const saveEmployee = data => request({
    method: 'PUT',
    url: '/sys/user/' + data.id,
    data,
})
export const delEmployee = id => request({
    method: 'delete',
    url: '/sys/user/' + id,
})

// 获取员工基本信息
export const getEmployeeBasicInfo = id => request({
    url: '/sys/user/' + id,
})

// 获取员工岗位信息
export const getEmployeeJobInfo = id => request({
    url: `/employees/${id}/jobs`,
})

// 保存员工岗位信息
export const saveEmployeeJobInfo = data => request({
    method: 'PUT',
    url: `/employees/${data.userId}/jobs`,
    data
})

// 获取员工个人信息
export const getEmployeePerseonalInfo = id => request({
    url: `/employees/${id}/personalInfo`,
})

// 保存员工个人信息
export const saveEmployeeJPersonalInfo = data => request({
    method: 'PUT',
    url: `/employees/${id}/personalInfo`,
    data
})

// 给员工分配角色

export const assignRolesApi = data => request({
    method: 'PUT',
    url: '/sys/user/assignRoles',
    data,
})