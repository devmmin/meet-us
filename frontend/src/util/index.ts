import { AxiosRequestConfig } from "axios";

import axios from "../config/axios";

const header = [
  "CHECKBOX",
  "제목",
  "상태",
  "등록자",
  "등록/최근 수정 일시",
  "MORE",
];

export const getPostHeaderList = () => ({
  code: 0,
  message: "",
  data: {
    header,
  }
});

export const getNoticeHeaderList = () => ({
  code: 0,
  message: "",
  data: {
    header
  },
});

export const getHeader = () => ({
  code: 0,
  message: "",
  data: {
    header,
  },
});

export const getNavLinks = () => ({
  code: 0,
  message: "",
  data: [
    { name: "메인", to: "/admin/main", icon: "home" },
    { name: "공지사항", to: "/admin/notice", icon: "noti" },
    { name: "블로그", to: "/admin/blog", icon: "blog" },
    { name: "유저 관리", to: "/admin/user-management", icon: "user" },
    { name: "설정", to: "/admin/setting", icon: "setting" },
  ],
});

export const postLogin = async (loginInfo: { id: string, password: string }) => {
  const response = await axios.post("/v1/auth/login", {
    userEmail: loginInfo.id,
    userPassword: loginInfo.password
  });

  return response.data;
};

export const postRefreshToken = async (beforeRequestConfig: AxiosRequestConfig) => {
  const response = await axios.post("/v1/auth/refresh");

  if (response.status === 200) {
    axios(beforeRequestConfig);
  }

  return response.data;
};

export const logout = (query = "") => {
  const loginUrl = "/admin/login";
  window.location.href = query ? loginUrl.concat(`?${query}`) : loginUrl;
};
