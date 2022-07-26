import axios from "axios";
import { postRefreshToken } from "../util";
import ERROR from "./error";

const instance = axios.create({
  baseURL: "https://meet-us-api.byeonggi.synology.me",
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");
    const noTokenRequired = ["/v1/auth/login", "/v1/auth/refresh"];
    if (config.headers && token && !noTokenRequired.includes(config.url || "")) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) =>
    // Do something with request error
    error.response
);
// Add a response interceptor
instance.interceptors.response.use(
  (response) =>
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    response,
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.data.code === ERROR.EXPIRED_TOKEN) {
      if (localStorage.getItem("refresh-token")) {
        postRefreshToken(error.response.config);
      } else {
        window.location.href = "/admin/login";
      }
    } else if (error.response.data.code === ERROR.INVALID_TOKEN) {
      window.location.href = "/admin/login?loginRequire=1";
    }
    return error.response;
  }
);

export default instance;
