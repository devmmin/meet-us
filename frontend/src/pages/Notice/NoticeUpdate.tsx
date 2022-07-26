import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useParams, useNavigate } from "react-router-dom";
import UpdateLayout from "../../layouts/Admin/UpdateLayout";
import { getNoticeItem } from "../../util";
import { noticeItemState } from "../../recoil";

const NoticeUpdate = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [notice, updateNotice] = useRecoilState(noticeItemState);
  const id = (params && params.id) || null;
  useEffect(() => {
    if (id) {
      const { code, data } = getNoticeItem({ id: Number(id) });
      if (code !== 0) {
        navigate(-1);
      } else {
        updateNotice(data);
      }
    }
  }, [id, navigate, updateNotice]);
  return (
    <UpdateLayout
      title="공지사항"
      buttonTitle="공지사항"
      toPath="/admin/notice"
      item={notice}
      updateItem={updateNotice}
    />
  );
};

export default NoticeUpdate;
