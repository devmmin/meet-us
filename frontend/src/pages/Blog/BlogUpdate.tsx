import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useParams, useNavigate } from "react-router-dom";
import UpdateLayout from "../../layouts/Admin/UpdateLayout";
import { getBlogItem } from "../../util";
import { blogItemState } from "../../recoil";

const PostUpdate = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [post, updatePost] = useRecoilState(blogItemState);
  const id = (params && params.id) || null;
  useEffect(() => {
    if (id) {
      const { code, data } = getBlogItem({ id: Number(id) });
      if (code !== 0) {
        navigate(-1);
      } else {
        updatePost(data);
      }
    }
  }, [id, navigate, updatePost]);
  return (
    <UpdateLayout
      title="블로그"
      buttonTitle="포스트"
      toPath="/admin/blog"
      item={post}
      updateItem={updatePost}
    />
  );
};

export default PostUpdate;
