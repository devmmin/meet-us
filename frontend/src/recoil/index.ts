import { atom } from 'recoil';
import { Page } from '../types';

export const checkedListState = atom<number[]>({
  key: 'checkedListState',
  default: [],
});

export const pageInfoState = atom<Page>({
  key: 'pageInfoState',
  default: { page: 1, totalCount: 0, totalPage: 0, offset: 10 }
});
