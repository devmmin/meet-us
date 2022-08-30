import { Page } from "../types/global";

const usePagination = ({ pageInfo }: { pageInfo: Page }) => {
  const startPageNum =
      pageInfo.page <= 1
        ? 1
        : pageInfo.page * pageInfo.offset - (pageInfo.offset - 1);
  const endPageNum =
    pageInfo.page * pageInfo.offset > pageInfo.totalCount
      ? pageInfo.totalCount
      : pageInfo.page * pageInfo.offset;
  return { startPageNum, endPageNum };
};

export default usePagination;
