import { useMutation, useQuery } from "@apollo/client";
import { Box, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

import ListHeader from "../../components/List/ListHeader";
import ListTable from "../../components/List/ListTable";
import { DELETE_NOTICE, GET_NOTICES } from "../../gql";
import { pageInfoState } from "../../recoil";
import { NoticeListResponse, NoticeListVariable } from "../../types/server";
import { getNoticeHeaderList } from "../../util";

const {
  data: { header },
} = getNoticeHeaderList();

const Notice = () => {
  const [pageInfo, setPageInfo] = useRecoilState(pageInfoState);
  const toast = useToast();

  const { data } = useQuery<NoticeListResponse, NoticeListVariable>(
    GET_NOTICES,
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

  const totalCount = data?.posts.totalCount || 0;

  const list = data?.posts.list.map((item) => ({
    ...item,
    id: item.postId,
    subject: item.title,
    register: item.authorId,
    createdAt: new Date(item.createdAt).toLocaleString(),
  })) || [];

  useEffect(() => {
    setPageInfo((prev) => ({
      ...prev,
      totalCount,
      totalPage: totalCount / prev.offset,
    }));
  }, [setPageInfo, totalCount]);

  const [deleteNotice] = useMutation(DELETE_NOTICE, {
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
    deleteNotice({
      variables: {
        post: {
          id: item.id,
        },
      },
    });
  };

  const title = "공지사항";
  const buttonTitle = "공지사항";
  const toPath = "/admin/notice/update";

  return (
    <Box p="50px" bg="gray.50" minH="100%">
      <ListHeader
        title={title}
        buttonTitle={buttonTitle}
        toPath={toPath}
        confirm={confirm}
      />
      <ListTable list={list} tableHeader={header} buttonTitle={buttonTitle} />
    </Box>
  );
};

export default Notice;
