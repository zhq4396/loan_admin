import {
    fetchEndpoint
} from "@/server/network";
import qs from 'qs';

//组织架构列表
export const getSubbranchList = (data) => fetchEndpoint(
    "/admin/person/getSubbranchList", data
)

//新增组织架构
export const addSubbranch = (data) => fetchEndpoint(
    "/admin/person/addSubbranch", data
)
//编辑组织架构
export const editSubbranch = (data) => fetchEndpoint(
    "/admin/person/editSubbranch", data
)
//组织架构详情
export const getSubbranchInfo = (data) => fetchEndpoint(
    "/admin/person/getSubbranchInfo", data
)
//删除组织架构
export const delSubbranch = (data) => fetchEndpoint(
    "/admin/person/delSubbranch", data
)

// 人员管理

//获取人员列表
export const getPersonList = (data) => fetchEndpoint(
    "/admin/person/getPersonList", data
)
//添加人员
export const addPerson = (data) => fetchEndpoint(
    "/admin/person/addPerson", data
)
//人员详情
export const getPersonInfo = (data) => fetchEndpoint(
    "/admin/person/getPersonInfo", data
)
//编辑人员
export const editPerson = (data) => fetchEndpoint(
    "/admin/person/editPerson", data
)
//删除人员
export const delPerson = (data) => fetchEndpoint(
    "/admin/person/delPerson", data
)
//重置密码
export const resetPassword = (data) => fetchEndpoint(
    "/admin/person/resetPassword", data
)
//下载人员
export const exportPersonTemplate = (data) => fetchEndpoint(
    "/admin/person/exportPersonTemplate", data
)
//下载人员
export const importPerson = (data) => fetchEndpoint(
    "/admin/person/importPerson", data
)
//组织架构列表
export const getSubbranchListAll = (data) => fetchEndpoint(
    "/admin/person/getSubbranchList", data
)
//角色列表
export const getRoleAllList = (data) => fetchEndpoint(
    "/admin/role/getRoleList", data
)
//支行部门列表（非树状）
export const getSubList = (data) => fetchEndpoint(
    "/admin/person/getSubbranchNoTree", data
)

