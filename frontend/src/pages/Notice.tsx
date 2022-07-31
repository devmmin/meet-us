import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useResetRecoilState, useRecoilState } from "recoil";
import ListLayout from "../layouts/Admin/ListLayout";
import { checkedListState, pageInfoState } from "../recoil";
import { ListItem } from "../types";
import { getNoticeHeaderList } from "../util";

interface NoticeVariable {
  pagination: {
    skip: number;
    take: number;
  };
  orderBy: {
    createdAt: string;
  };
}

interface NoticeItem {
  authorId: string;
  content: string;
  createdAt: number;
  postId: string;
  status: string;
  title: string;
  updatedAt: number;
}

interface NoticeResponse {
  posts: { list: NoticeItem[]; totalCount: number };
}

const GET_POSTS = gql`
  query GET_POSTS($pagination: OffsetPagination!, $orderBy: PostsOrder) {
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

const Notice = () => {
  const [pageInfo, setPageInfo] = useRecoilState(pageInfoState);
  const resetCheckedList = useResetRecoilState(checkedListState);

  const {
    data: { header },
  } = getNoticeHeaderList();

  let list: ListItem[] = [];
  const { loading, error, data } = useQuery<NoticeResponse, NoticeVariable>(
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
      title="공지사항"
      list={list}
      tableHeader={header}
      buttonTitle="공지사항"
      toPath="/admin/notice/update"
    />
  );
};

export default Notice;
