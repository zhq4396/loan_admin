import {
    fetchEndpoint
} from "@/server/network";

//获取角色列表
export const getListRole = (data) => fetchEndpoint(
    "/admin/Role/getList", data
)


//获取所有菜单带check
export const getMenuAll = (role_id) => fetchEndpoint(
    "/admin/Menu/getMenuAll", {
        role_id
    }
)

//新增角色
export const addRole = (data) => fetchEndpoint(
    "/admin/Role/add", data
)

//获取角色详情
export const findOneRole = (role_id) => fetchEndpoint(
    "/admin/Role/findOne", {
        role_id
    }
)

//修改角色
export const updateRole = (data) => fetchEndpoint(
    "/admin/Role/update", data
)

//修改角色状态
export const updateStatusRole = (data) => fetchEndpoint(
    "/admin/Role/updateStatus", data
)

//删除角色
export const deleteRole = (role_id) => fetchEndpoint(
    "/admin/Role/delete", {
        role_id
    }
)

///////////  账号管理   /////////////////

//获取列表
export const getListAdmin = (data) => fetchEndpoint(
    "/admin/admin/getList", data
)

//修改状态
export const updateStatusAdmin = (data) => fetchEndpoint(
    "/admin/admin/updateStatus", data
)

//新增账号
export const addAdmin = (data) => fetchEndpoint(
    "/admin/admin/add", data
)

//获取角色下拉列表
export const getDictRole = () => fetchEndpoint(
    "/admin/Role/getDict", {}
)

//获取详情
export const findOneAdmin = (admin_id) => fetchEndpoint(
    "/admin/admin/findOne", {
        admin_id
    }
)

//修改账号
export const updateAdmin = (data) => fetchEndpoint(
    "/admin/admin/update", data
)

//删除账号
export const deleteAdmin = (admin_id) => fetchEndpoint(
    "/admin/admin/delete", {
        admin_id
    }
)

//修改密码
export const updatePassword = (admin_password) => fetchEndpoint(
    "/admin/admin/updatePassword", {
        admin_password,
        admin_id: JSON.parse(localStorage.getItem('loveUserInfos')).admin_id
    }
)