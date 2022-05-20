import { useState } from 'react';
import ListLayout from './Layout/ListLayout';

const Blog = () => {
  // TODO: API 연동 이후 로직 변경
  const [list] = useState([
    {
      id: 1,
      subject: '제목입니다1',
      status: 'COMPLETED',
      register: 'Segun Adebayo',
      createdAt: '2022-01-01 19:00:00',
    },
    {
      id: 2,
      subject: '제목입니다2',
      status: 'REQUEST',
      register: 'Segun Adebayo',
      createdAt: '2022-01-01 19:00:00',
    },
    {
      id: 3,
      subject: '제목입니다3',
      status: 'COMPLETED',
      register: 'Segun Adebayo',
      createdAt: '2022-01-01 19:00:00',
    },
    {
      id: 4,
      subject: '제목입니다4',
      status: 'REQUEST',
      register: 'Segun Adebayo',
      createdAt: '2022-01-01 19:00:00',
    },
  ]);
  const tableHeader = [
    'CHECKBOX',
    '제목',
    '상태',
    '등록자',
    '등록/최근 수정 일시',
    'MORE',
  ];
  return (
    <ListLayout
      header="블로그"
      list={list}
      tableHeader={tableHeader}
      buttonTitle="신규 포스트"
    />
  );
};

export default Blog;
