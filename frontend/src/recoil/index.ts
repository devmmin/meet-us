import { atom } from 'recoil';
import { ListItem, Page } from '../types';

export const checkedListState = atom<number[]>({
  key: 'checkedListState',
  default: [],
});

export const pageInfoState = atom<Page>({
  key: 'pageInfoState',
  default: { page: 1, totalCount: 0, totalPage: 0, offset: 10 }
});

export const blogItemState = atom<ListItem>({
  key: 'blogItemState',
  default: { id: 0, subject: '', content: '', status: 'NONE', register: '', createdAt: '' }
});

export const noticeItemState = atom<ListItem>({
  key: 'noticeItemState',
  default: { id: 0, subject: '', content: '', status: 'NONE', register: '', createdAt: '' }
});
