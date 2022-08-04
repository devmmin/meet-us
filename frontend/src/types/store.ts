import { MouseEventHandler, ReactNode } from "react";

interface Page {
  page: number;
  offset: number;
  totalCount: number;
  totalPage: number;
}

interface ListItem {
  id: string;
  subject: string;
  content: string;
  status: string;
  register: string;
  createdAt: string;
}

interface UserInfo {
  id: string;
  password: string;
  nickName: string;
}

interface NavLinkItem {
  name: string;
  to: string;
  icon: string;
}

interface ModalProps {
  title: string;
  children: ReactNode;
  confirmText: string;
  cancelText: string;
  onOpen: Function;
  onClose: Function;
  onCancel: MouseEventHandler<HTMLButtonElement>;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
}

interface NewModalProps {
  title: string;
  children: ReactNode;
  confirmText: string;
  cancelText: string;
  onCancel?: MouseEventHandler<HTMLButtonElement>;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
}

export type {
  ListItem,
  Page,
  UserInfo,
  NavLinkItem,
  ModalProps,
  NewModalProps
};
