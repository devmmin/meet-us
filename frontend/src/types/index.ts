interface ListItem {
  id: number;
  subject: string;
  content: string;
  status: string;
  register: string;
  createdAt: string;
}

interface Page {
  page: number;
  offset: number;
  totalCount: number;
  totalPage: number;
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

export type {
  ListItem,
  Page,
  UserInfo,
  NavLinkItem
};
