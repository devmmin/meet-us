interface ListItem {
  id: string;
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

interface ErrorResponseType {
  code: number;
  error: { message: string; };
}

interface SuccessResponseType {
  data: any;
}

type ResponseType = ErrorResponseType & SuccessResponseType;

export type {
  ListItem,
  Page,
  UserInfo,
  NavLinkItem,
  ResponseType
};
