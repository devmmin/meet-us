import ListLayout from '../layouts/Admin/ListLayout';
import { getHeader } from '../util';

const Setting = () => {
  const {
    data: { header },
  } = getHeader();
  return <ListLayout title="설정" tableHeader={header} />;
};

export default Setting;
