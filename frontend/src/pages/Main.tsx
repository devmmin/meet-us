import ListLayout from '../layouts/Admin/ListLayout';
import { getHeader } from '../util';

const Main = () => {
  const {
    data: { header },
  } = getHeader();
  return <ListLayout title="메인" tableHeader={header} />;
};

export default Main;
