import { atom } from 'recoil';

export const checkedListState = atom<number[]>({
  key: 'checkedListState',
  default: [],
});
