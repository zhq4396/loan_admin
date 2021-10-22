import axios from "axios";
import router from "@/router";

let API_HOST = "";
if (process.env.NODE_ENV === "development") {
  API_HOST = window.location.origin + "/api";
} else {
  API_HOST = window.location.origin + "/api";
}
export { API_HOST };

function toQueryString(obj) {
  return obj
    ? Object.keys(obj)
        .sort()
        .map(function(key) {
          var val = obj[key];
          if (Array.isArray(val)) {
            return val
              .sort()
              .map(function(val2) {
                return key + "=" + filterSpecialChars(val2);
              })
              .join("&");
          }
          return key + "=" + filterSpecialChars(val);
        })
        .join("&")
    : "";
}

// 处理特殊字符: ! ~ * ' ( )
function filterSpecialChars(str) {
  if (str && str.length) {
    str = str.replace(/\!/g, "%21");
    str = str.replace(/\~/g, "%7e");
    str = str.replace(/\*/g, "%2A");
    str = str.replace(/\'/g, "%27");
    str = str.replace(/\(/g, "%28");
    str = str.replace(/\)/g, "%29");
  }
  return str;
}

// 请求加密
axios.interceptors.request.use(
  (config) => {
    var params = config.data || {};
    let post_body = config.headers.selfType ? params : toQueryString(params);
    config.headers["Content-Type"] = config.headers.selfType
      ? "application/json; charset=utf-8"
      : "application/x-www-form-urlencoded; charset=utf-8";
    config.data = post_body;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//请求响应拦截
axios.interceptors.response.use(
  (res) => {
    if (res.data.errcode == 0) {
      return Promise.resolve(res);
    } else if (res.data.errcode == 2001 || res.data.errcode == 3001) {
      localStorage.clear();
      router.push("/login");
    } else if (res.data.errcode == 1001) {
      return Promise.reject(res);
    } else {
      return Promise.reject(res);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

function fetchEndpointOverdue(reqUrl, type = "POST", data = {}) {
  return new Promise((resolve, reject) => {
    axios({
      method: type,
      url: reqUrl,
      data,
      headers: {
        Authorization: localStorage.getItem("loveAjaxAccessToken")
          ? localStorage.getItem("loveAjaxAccessToken")
          : "",
      },
    })
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject(res);
      });
  });
}

// contentType 默认为true json格式 false form格式
export function fetchEndpoint(
  reqUrl,
  data = {},
  contentType = false,
  type = "POST"
) {
  if (!reqUrl) {
    return;
  }
  type = type.toUpperCase();
  reqUrl = API_HOST + reqUrl;
  return new Promise((resolve, reject) => {
    axios({
      method: type,
      url: reqUrl,
      data: {
        ...data,
        sessionid: localStorage.getItem("sessionAdminId")
          ? JSON.parse(localStorage.getItem("sessionAdminId"))
          : "",
      },
      headers: {
        selfType: contentType,
      },
    })
      .then((res) => {
        resolve(res);
      })
      .catch((res) => {
        reject(res);
      });
  });
}

export function downLoadTemplate(reqUrl, data = {}, type = "POST") {
  if (!reqUrl) {
    return;
  }
  reqUrl = API_HOST + reqUrl;
  let axiosDwon = axios.create({});
  let ajaxData = toQueryString({
    ...data,
    sessionid: localStorage.getItem("sessionAdminId")
      ? JSON.parse(localStorage.getItem("sessionAdminId"))
      : "",
  });
  return new Promise((resolve, reject) => {
    axiosDwon({
      method: type,
      url: reqUrl,
      data: ajaxData,
      //   headers: {
      //     Authorization: localStorage.getItem("loveAjaxAccessToken")
      //       ? localStorage.getItem("loveAjaxAccessToken")
      //       : "",
      //   },
      responseType: "blob",
    }).then((response) => {
      console.log(response)
      let content = response.data;
      let fileName = response.headers["content-disposition"];
      console.log(content,fileName)
      if (fileName && fileName.length >= 2) {
        fileName = fileName.split("=")[1];
        fileName = decodeURIComponent(fileName)
          .replace('"', "")
          .replace('"', "");
      } else {
        fileName = "文件";
      }
      download(content, fileName);
      resolve(true);
    });
  });
}

function download(content, fileName) {
  let blob = new Blob([content]);
  let url = window.URL.createObjectURL(blob);
  let dom = document.createElement("a");
  dom.style.display = "none";
  dom.href = url;
  dom.setAttribute("download", fileName);
  document.body.appendChild(dom);
  dom.click();
}
