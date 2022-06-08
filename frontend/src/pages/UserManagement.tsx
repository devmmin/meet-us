import { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';
import ListLayout from '../layouts/Admin/ListLayout';
import { pageInfoState } from '../recoil';
import { getHeader } from '../util';

const UserManagement = () => {
  const resetPageInfo = useResetRecoilState(pageInfoState);
  const {
    data: { header },
  } = getHeader();

  useEffect(() => {
    resetPageInfo();
  });
  return <ListLayout title="유저 관리" tableHeader={header} />;
};

export default UserManagement;
