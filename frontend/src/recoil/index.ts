import { atom } from "recoil";
import { ListItem, NavLinkItem, Page, UserInfo } from "../types/store";

const ATOM_KEYS = {
  checkedListState: "checkedListState",
  pageInfoState: "pageInfoState",
  postItemState: "postItemState",
  noticeItemState: "noticeItemState",
  userInfoState: "userInfoState",
  isAuthState: "isAuthState",
  navLinksState: "navLinksState"
};

export const checkedListState = atom<string[]>({
  key: ATOM_KEYS.checkedListState,
  default: [],
});

export const pageInfoState = atom<Page>({
  key: ATOM_KEYS.pageInfoState,
  default: { page: 1, totalCount: 0, totalPage: 0, offset: 10 }
});

export const postItemState = atom<ListItem>({
  key: ATOM_KEYS.postItemState,
  default: { id: "", subject: "", content: "", status: "NONE", register: "", createdAt: "" }
});

export const noticeItemState = atom<ListItem>({
  key: ATOM_KEYS.noticeItemState,
  default: { id: "", subject: "", content: "", status: "NONE", register: "", createdAt: "" }
});

export const userInfoState = atom<UserInfo>({
  key: ATOM_KEYS.userInfoState,
  default: { id: "", password: "", nickName: "" }
});

export const isAuthState = atom<boolean>({
  key: ATOM_KEYS.isAuthState,
  default: false
});

export const navLinksState = atom<NavLinkItem[]>({
  key: ATOM_KEYS.navLinksState,
  default: []
});
