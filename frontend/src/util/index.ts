// TODO: mocking
// TODO: API 통신 시 UI loading, disabled, skeleton ... 처리 필요
import { ListItem } from '../types';

const header = [
  'CHECKBOX',
  '제목',
  '상태',
  '등록자',
  '등록/최근 수정 일시',
  'MORE',
];

const list: ListItem[] = Array(1 * 20)
  .fill(undefined)
  .map((item, index) => ({
    id: index + 1,
    subject: `제목입니다${index + 1}`,
    content: `내용입니다${index + 1}`,
    status: index % 2 === 0 ? 'REQUEST' : 'COMPLETED',
    register: 'Segun Adebayo',
    createdAt: '2022-01-01 19:00:00',
  }));

export const getBlogList = ({ page = 1, offset = 10 }: { page: number, offset: number }) => {
  const totalPage = Math.ceil(Math.max(list.length / offset, 1));
  return {
    code: 0,
    message: '',
    data: {
      header,
      list,
      pageInfo: {
        page: page > totalPage ? totalPage : page,
        offset,
        totalPage,
        totalCount: list.length,
      },
    }
  };
};

export const getBlogItem = ({ id }: { id: number }) => {
  if (!id) {
    return {
      code: -1,
      data: {
        id: 0,
        subject: '',
        content: '',
        status: '',
        register: '',
        createdAt: ''
      }
    };
  }
  return {
    code: 0,
    data: list.filter((v) => v.id === id)[0]
  };
};

const listTwo: ListItem[] = Array(1 * 4)
  .fill(undefined)
  .map((item, index) => ({
    id: index + 1,
    subject: `제목입니다${index + 1}`,
    content: `내용입니다${index + 1}`,
    status: index % 2 === 0 ? 'REQUEST' : 'COMPLETED',
    register: 'Segun Adebayo',
    createdAt: '2022-01-01 19:00:00',
  }));

export const getNoticeList = ({ page = 1, offset = 10 }: { page: number, offset: number }) => {
  const totalPage = Math.ceil(Math.max(listTwo.length / offset, 1));
  return {
    code: 0,
    message: '',
    data: {
      header,
      list: listTwo,
      pageInfo: {
        page: page > totalPage ? totalPage : page,
        offset,
        totalPage,
        totalCount: listTwo.length,
      },
    },
  };
};

export const getNoticeItem = ({ id }: { id: number }) => {
  if (!id) {
    return {
      code: -1,
      data: {
        id: 0,
        subject: '',
        content: '',
        status: '',
        register: '',
        createdAt: ''
      }
    };
  }
  return {
    code: 0,
    data: listTwo.filter((v) => v.id === id)[0]
  };
};

export const getUserInfo = () => ({
  code: 0,
  message: '',
  data: {
    nickName: 'Christian Kim',
    email: 'wwww3426@naver.com',
  },
});

export const getNavLinks = () => ({
  code: 0,
  message: '',
  data: [
    { name: '메인', to: '/admin/main', icon: 'home' },
    { name: '공지사항', to: '/admin/notice', icon: 'noti' },
    { name: '블로그', to: '/admin/blog', icon: 'blog' },
    { name: '유저 관리', to: '/admin/user-management', icon: 'user' },
    { name: '설정', to: '/admin/setting', icon: 'setting' },
  ],
});

export const postUpdate = () => ({
  code: 0,
  message: '',
  data: null,
});

export const deletePost = () => ({
  code: 0,
  message: '',
  data: null,
});

export const postLogin = () => ({
  code: 1,
  message: 'ID 또는 비밀번호가 맞지 않습니다. 다시 입력해주세요.',
  data: null,
});

export const getHeader = () => ({
  code: 0,
  message: '',
  data: {
    header,
  },
});
