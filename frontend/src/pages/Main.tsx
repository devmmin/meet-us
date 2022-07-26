import { useEffect } from "react";
import { useResetRecoilState } from "recoil";
import ListLayout from "../layouts/Admin/ListLayout";
import { pageInfoState } from "../recoil";
import { getHeader } from "../util";

const Main = () => {
  const resetPageInfo = useResetRecoilState(pageInfoState);
  const {
    data: { header },
  } = getHeader();

  useEffect(() => {
    resetPageInfo();
  });
  return <ListLayout title="메인" tableHeader={header} />;
};

export default Main;
