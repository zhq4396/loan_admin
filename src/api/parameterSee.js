import {
    fetchEndpoint
} from "@/server/network";

import qs from 'qs';
//消费/小额台账查看
export const getBookList0 = (bookType) => fetchEndpoint(
    "/admin/book/getBookList",
    bookType

)
export const getBookList1 = (bookType) => fetchEndpoint(
    "/admin/book/getBookList", bookType
)
//添加台账
export const addBook0 = (bookType) => fetchEndpoint(
    "/admin/book/addBook",
    bookType

)
export const addBook1 = (bookType) => fetchEndpoint(
    "/admin/book/addBook", bookType
)
//编辑台账
export const editBook = (data) => fetchEndpoint(
    "/admin/book/editBook", data
)
//台账详情
export const getBookInfo = (data) => fetchEndpoint(
    "/admin/book/getBookInfo", data
)
//查看节点
export const getNodeListByBookId = (data) => fetchEndpoint(
    "/admin/book/getNodeListByBookId", data
)
//批量更新环节
export const batchEditBookLink = (data) => fetchEndpoint(
    "/admin/book/batchEditBookLink", data
)
//导出台账
export const exportBook = (data) => fetchEndpoint(
    "/admin/book/exportBook", data
)
//删除台账
export const delBook = (data) => fetchEndpoint(
    "/admin/book/delBook", data
)
//消费信贷明细
export const getConsumerDetail = (data) => fetchEndpoint(
    "/admin/book/getConsumerDetail", data
)
//小额信贷明细
export const getSmallAmountDetail = (data) => fetchEndpoint(
    "/admin/book/getSmallAmountDetail", data
)
//小额信贷明细导出
export const exportSmallAmountDetail = (data) => fetchEndpoint(
    "/admin/book/exportSmallAmountDetail", data
)
//消费信贷明细导出
export const exportConsumerDetail = (data) => fetchEndpoint(
    "/admin/book/exportConsumerDetail", data
)
//组织架构列表
export const getSubbranchList = (data) => fetchEndpoint(
    "/admin/person/getSubbranchList", data
)
//支行部门列表（非树状）
export const getSubList1 = (data) => fetchEndpoint(
    "/admin/person/getSubbranchNoTree", data
)

//楼盘
export const getBuildList = (data) => fetchEndpoint(
    "/admin/build/getBuildList", data
)
//获取贷种列表
export const getLoanList = (data) => fetchEndpoint(
    "/admin/book/getLoanList", data
)