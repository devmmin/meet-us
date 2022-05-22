import ListLayout from '../layouts/Admin/ListLayout';
import { getBlogList } from '../util';

const Blog = () => {
  const {
    data: { list, header, pageInfo },
  } = getBlogList();
  return (
    <ListLayout
      title="블로그"
      list={list}
      tableHeader={header}
      pageInfo={pageInfo}
      buttonTitle="포스트"
      toPath="/admin/blog/update"
    />
  );
};

export default Blog;
