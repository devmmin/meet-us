import axios from "axios";

import ERROR from "../constants/error";
import { logout, postRefreshToken } from "../util";

const instance = axios.create({
  baseURL: "https://meet-us-api.byeonggi.synology.me",
  withCredentials: true,
});

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
      postRefreshToken(error.response.config);
    } else if (error.response.data.code === ERROR.INVALID_TOKEN) {
      logout("loginRequire=1");
    }
    return error.response;
  }
);

export default instance;
