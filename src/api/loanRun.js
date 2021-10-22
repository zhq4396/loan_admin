import {
    fetchEndpoint
} from "@/server/network";
//获取贷种列表
export const getLoanList = (data) => fetchEndpoint(
    "/admin/loan/getLoanList", data
)
//添加贷种
export const addLoan = (data) => fetchEndpoint(
    "/admin/loan/addLoan", data
)
//贷种详情
export const getLoanInfo = (data) => fetchEndpoint(
    "/admin/loan/getLoanInfo", data
)
//编辑贷种
export const editLoan = (data) => fetchEndpoint(
    "/admin/loan/editLoan", data
)
//删除贷种
export const delLoan = (data) => fetchEndpoint(
    "/admin/loan/delLoan", data
)
//组织架构列表
export const getSubbranchList = (data) => fetchEndpoint(
    "/admin/person/getSubbranchList", data
)
