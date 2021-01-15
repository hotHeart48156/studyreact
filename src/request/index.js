import { message } from "antd";
import axios from "axios";
const isDev = process.env.NODE_ENV === "development";
const service = axios.create({
  baseURL: isDev ? "http://rap2api.taobao.org/app/mock/269612" : "",
});
const service1 = axios.create({
  baseURL: isDev ? "http://rap2api.taobao.org/app/mock/269612" : "",
});
service.interceptors.request.use((config) => {
  config.data = Object.assign({}, config.data, {
    authToken: "456",
  });

  return config;
});
service.interceptors.response.use((resp) => {
  //如果要log resp后面不要加字符串，直接log数据否则控制台会出现[object,Object],Promise.resolve也一样
  if (resp.data.code === 200) {
    return resp.data.data;
  } else {
    //全局处理错误
    message.error(resp.data.errMsg);
  }
});

export const getArticals = () => {
  return service.post("/api/v1/articalList", { authToken: "1230000" });
};

export const deleteArticalsById = (id) => {
  return service.post(`/api/v1/artical/delete/${id}`, {});
};
export const getArticalsAmount = () => {
  return service.post("/api/v1/articalAmount", { authToken: "1230000" });
};
export const LoginRequest = (userInfo) => {
  return service1.post("/api/v1/login", userInfo);
};
