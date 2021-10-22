import {
    fetchEndpoint
} from "@/server/network";
import qs from 'qs';

//角色列表
export const getRoleList = (data) => fetchEndpoint(
    "/admin/role/getRoleList", data
)

//新增角色
export const addRole = (data) => fetchEndpoint(
    "/admin/role/addRole", data
)
//编辑角色
export const editRole = (data) => fetchEndpoint(
    "/admin/role/editRole", data
)
//角色详情
export const getRoleInfo = (data) => fetchEndpoint(
    "/admin/role/getRoleInfo", data
)
//权限菜单列表
export const getAuthMenuList = (data) => fetchEndpoint(
    "/admin/role/getAuthMenuList", data
)
//支行部门列表（非树状）
export const getSubbranchNoTree = (data) => fetchEndpoint(
    "/admin/person/getSubbranchNoTree", data
)
//组织架构列表
export const getTeamList = (data) => fetchEndpoint(
    "/admin/person/getSubbranchList",data
)
// 删除角色
export const delRole = (data) => fetchEndpoint(
    "/admin/role/delRole",data
)
