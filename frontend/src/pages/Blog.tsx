import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useResetRecoilState, useRecoilState } from "recoil";
import ListLayout from "../layouts/Admin/ListLayout";
import { checkedListState, pageInfoState } from "../recoil";
import { ListItem } from "../types";
import { getPostHeaderList } from "../util";

interface PostVariable {
  pagination: {
    skip: number;
    take: number;
  };
  orderBy: {
    createdAt: string;
  };
}

interface PostItem {
  authorId: string;
  content: string;
  createdAt: number;
  postId: string;
  status: string;
  title: string;
  updatedAt: number;
}

interface PostResponse {
  posts: { list: PostItem[]; totalCount: number };
}

const GET_POSTS = gql`
  query Posts($pagination: OffsetPagination!, $orderBy: PostsOrder) {
    posts(pagination: $pagination, orderBy: $orderBy) {
      list {
        postId
        title
        content
        status
        authorId
        author {
          id
          userName
        }
        updatedAt
        createdAt
      }
      totalCount
    }
  }
`;

const Blog = () => {
  const [pageInfo, setPageInfo] = useRecoilState(pageInfoState);
  const resetCheckedList = useResetRecoilState(checkedListState);

  const {
    data: { header },
  } = getPostHeaderList();

  let list: ListItem[] = [];
  const { loading, error, data } = useQuery<PostResponse, PostVariable>(
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

  if (loading || error) {
    list = [];
  }

  let totalCount = 0;

  if (data) {
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
    resetCheckedList();
  }, [setPageInfo, resetCheckedList, totalCount]);
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
