import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { GET_NOTICES } from "../gql";
import ListLayout from "../layouts/Admin/ListLayout";
import { pageInfoState } from "../recoil";
import { NoticeListResponse, NoticeListVariable } from "../types/api";
import { ListItem } from "../types/store";
import { getNoticeHeaderList } from "../util";

const {
  data: { header },
} = getNoticeHeaderList();

const Notice = () => {
  const [pageInfo, setPageInfo] = useRecoilState(pageInfoState);

  let list: ListItem[] = [];
  const { loading, data } = useQuery<NoticeListResponse, NoticeListVariable>(
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
      title="공지사항"
      list={list}
      tableHeader={header}
      buttonTitle="공지사항"
      toPath="/admin/notice/update"
    />
  );
};

export default Notice;
