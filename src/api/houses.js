import {
    fetchEndpoint
} from "@/server/network";

//楼盘列表
export const getBuildList = (data) => fetchEndpoint(
        "/admin/build/getBuildList", data
    )
    //楼盘详情
export const getBuildInfo = (data) => fetchEndpoint(
        "/admin/build/getBuildInfo", data
    )
    //添加楼盘
export const addBuild = (data) => fetchEndpoint(
        "/admin/build/addBuild", data
    )
    //编辑楼盘
export const editBuild = (data) => fetchEndpoint(
        "/admin/build/editBuild", data
    )
    //删除楼盘
export const delBuild = (data) => fetchEndpoint(
    "/admin/build/delBuild", data
)