import { fetchEndpoint } from "@/server/network";
import axios from "axios";
/**
 * fetchEndpoint
 *  @url    api 接口路径
 *  @data   接口传值
 *  @type   true json传参 /false form传参  ,默认json 可不填
 *  @fun    'GET'/'POST'  默认POST 可不填
 */

//后台登录
export const login = (data) => fetchEndpoint("/admin/login/adminLogin", data);

// 退出登录
export const loginOut = (data) => fetchEndpoint("/admin/login/loginOut", data);

// 修改密码
export const editPassword = (data) => fetchEndpoint("/admin/login/editPassword", data);
// 获取验证码
export const getCode = (data) => fetchEndpoint("/admin/login/getCode",data,false,'GET');


//菜单
export const getMenu = () =>
  fetchEndpoint("/admin/Menu/getMenu", {
    admin_roleid: JSON.parse(localStorage.getItem("loveUserInfos"))
      .admin_roleid,
  });

//获取七牛token
export const getUploadToken = () =>
  fetchEndpoint("/admin/UploadManager/getUploadToken", {});

//xxxxxxxxxxxxxxxxxx
// export const xxxxxxxxxxxxxxxxxx = (data) => fetchEndpoint(
//     "xxxxxxxxxxxxxxxxxx", data
// )
