import { useMutation, useQuery } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { DELETE_POST, GET_POSTS } from "../gql";
import ListLayout from "../layouts/Admin/ListLayout";
import { pageInfoState } from "../recoil";
import { PostListResponse, PostListVariable } from "../types/server";
import { ListItem } from "../types/global";
import { getPostHeaderList } from "../util";

const {
  data: { header },
} = getPostHeaderList();

const Blog = () => {
  const [pageInfo, setPageInfo] = useRecoilState(pageInfoState);
  const toast = useToast();

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

  const [deletePost] = useMutation(DELETE_POST, {
    onCompleted: (response) => {
      toast({
        description: `삭제를 ${response ? "완료" : "실패"}했습니다.`,
        status: response ? "success" : "error",
        duration: 9000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        description: "삭제를 실패했습니다.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const confirm = (item: { id: string }) => {
    deletePost({
      variables: {
        post: {
          id: item.id,
        },
      },
    });
  };

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
      confirm={confirm}
    />
  );
};

export default Blog;
