import ListLayout from '../layouts/Admin/ListLayout';
import { getHeader } from '../util';

const UserManagement = () => {
  const {
    data: { header },
  } = getHeader();
  return <ListLayout title="유저 관리" tableHeader={header} />;
};

export default UserManagement;
