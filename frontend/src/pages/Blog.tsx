import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import ListLayout from '../layouts/Admin/ListLayout';
import { checkedListState, pageInfoState } from '../recoil';
import { getBlogList } from '../util';

const Blog = () => {
  const setPageInfo = useSetRecoilState(pageInfoState);
  const resetCheckedList = useResetRecoilState(checkedListState);
  const [params] = useSearchParams();
  const {
    data: { list, header, pageInfo },
  } = getBlogList({
    page: params.get('page') ? Number(params.get('page')) : 1,
    offset: params.get('offset') ? Number(params.get('offset')) : 10,
  });

  useEffect(() => {
    setPageInfo(pageInfo);
    resetCheckedList();
  }, [pageInfo, setPageInfo, resetCheckedList]);
  return (
    <ListLayout
      title="블로그"
      list={list}
      tableHeader={header}
      buttonTitle="포스트"
      toPath="/admin/blog/update"
    />
  );
};

export default Blog;
