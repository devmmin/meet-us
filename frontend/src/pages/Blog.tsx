import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { GET_POSTS } from "../gql";
import ListLayout from "../layouts/Admin/ListLayout";
import { pageInfoState } from "../recoil";
import { PostListResponse, PostListVariable } from "../types/api";
import { ListItem } from "../types/store";
import { getPostHeaderList } from "../util";

const {
  data: { header },
} = getPostHeaderList();

const Blog = () => {
  const [pageInfo, setPageInfo] = useRecoilState(pageInfoState);

  let list: ListItem[] = [];
  const { loading, data } = useQuery<PostListResponse, PostListVariable>(
    GET_POSTS,
    {
      variables: {
        pagination: {
          skip: pageInfo.offset * (pageInfo.page - 1),
          take: pageInfo.offset,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    }
  );

  let totalCount = 0;

  if (!loading && data) {
    list = data.posts.list.map((item) => ({
      ...item,
      id: item.postId,
      subject: item.title,
      register: item.authorId,
      createdAt: new Date(item.createdAt).toLocaleString(),
    }));
    totalCount = data.posts.totalCount;
  }

  useEffect(() => {
    setPageInfo((prev) => ({
      ...prev,
      totalCount,
      totalPage: totalCount / prev.offset,
    }));
  }, [setPageInfo, totalCount]);
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
