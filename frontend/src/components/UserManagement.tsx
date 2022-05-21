import ListLayout from './layout/ListLayout';

const UserManagement = () => {
  const tableHeader = ['제목', '상태', '등록자', '등록일시'];
  return <ListLayout header="유저 관리" tableHeader={tableHeader} />;
};

export default UserManagement;
