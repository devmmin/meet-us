import { atom } from "recoil";
import { ListItem, ModalProps, NavLinkItem, Page, UserInfo } from "../types/global";

export const checkedListState = atom<string[]>({
  key: "checkedListState",
  default: [],
});

export const pageInfoState = atom<Page>({
  key: "pageInfoState",
  default: { page: 1, totalCount: 0, totalPage: 0, offset: 10 }
});

export const postItemState = atom<ListItem>({
  key: "postItemState",
  default: { id: "", subject: "", content: "", status: "NONE", register: "", createdAt: "" }
});

export const noticeItemState = atom<ListItem>({
  key: "noticeItemState",
  default: { id: "", subject: "", content: "", status: "NONE", register: "", createdAt: "" }
});

export const userInfoState = atom<UserInfo>({
  key: "userInfoState",
  default: { id: "", nickName: "" }
});

export const isAuthState = atom<boolean>({
  key: "isAuthState",
  default: false
});

export const navLinksState = atom<NavLinkItem[]>({
  key: "navLinksState",
  default: []
});

export const modalState = atom<ModalProps>({
  key: "modalState",
  default: { title: "", children: "", confirmText: "", cancelText: "", onOpen: () => { }, onClose: () => { }, onConfirm: () => { }, onCancel: () => { } },
});
