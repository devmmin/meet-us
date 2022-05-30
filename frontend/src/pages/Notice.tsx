import ListLayout from '../layouts/Admin/ListLayout';
import { getNoticeList } from '../util';

const Notice = () => {
  const {
    data: { list, header, pageInfo },
  } = getNoticeList();
  return (
    <ListLayout
      title="공지사항"
      list={list}
      tableHeader={header}
      pageInfo={pageInfo}
      buttonTitle="공지사항"
      toPath="/admin/notice/update"
    />
  );
};

export default Notice;
