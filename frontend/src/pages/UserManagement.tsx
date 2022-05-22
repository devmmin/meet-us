import ListLayout from '../layouts/Admin/ListLayout';

const UserManagement = () => {
  const tableHeader = [
    'CHECKBOX',
    '제목',
    '상태',
    '등록자',
    '등록/최근 수정 일시',
    'MORE',
  ];
  return <ListLayout title="유저 관리" tableHeader={tableHeader} />;
};

export default UserManagement;
