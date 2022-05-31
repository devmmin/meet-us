interface ListItem {
  id: number;
  subject: string;
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

export type {
  ListItem,
  Page
};
