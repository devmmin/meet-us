import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import ListLayout from '../layouts/Admin/ListLayout';
import { checkedListState, pageInfoState } from '../recoil';
import { getNoticeList } from '../util';

const Notice = () => {
  const setPageInfo = useSetRecoilState(pageInfoState);
  const resetCheckedList = useResetRecoilState(checkedListState);
  const [params] = useSearchParams();
  const {
    data: { list, header, pageInfo },
  } = getNoticeList({
    page: params.get('page') ? Number(params.get('page')) : 1,
    offset: params.get('offset') ? Number(params.get('offset')) : 10,
  });
  useEffect(() => {
    setPageInfo(pageInfo);
    resetCheckedList();
  });
  return (
    <ListLayout
      title="공지사항"
      list={list}
      tableHeader={header}
      buttonTitle="공지사항"
      toPath="/admin/notice/update"
    />
  );
};

export default Notice;
