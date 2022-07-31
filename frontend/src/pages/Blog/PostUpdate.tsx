import { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useRecoilState } from "recoil";
import { useParams, useNavigate } from "react-router-dom";
import UpdateLayout from "../../layouts/Admin/UpdateLayout";
import { postItemState } from "../../recoil";

interface PostVariable {
  postId: string;
}

interface PostResponse {
  getPostById: {
    postId: string;
    title: string;
    content: string;
    status: string;
    authorId: string;
    author: {
      id: string;
      userName: string;
    };
    updatedAt: number;
    createdAt: number;
  };
}

const GET_POST = gql`
  query GetPostById($postId: String!) {
    getPostById(id: $postId) {
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
  }
`;

const PostUpdate = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [post, updatePost] = useRecoilState(postItemState);
  const postId = (params && params.id) || "";

  const { loading, data } = useQuery<PostResponse, PostVariable>(GET_POST, {
    variables: {
      postId,
    },
  });

  useEffect(() => {
    if (!postId) {
      navigate(-1);
    } else {
      if (!loading && data) {
        const newPost = {
          id: data.getPostById.postId,
          subject: data.getPostById.title,
          content: data.getPostById.content,
          status: data.getPostById.status,
          register:
            data.getPostById.author.id + data.getPostById.author.userName,
          createdAt: new Date(data.getPostById.createdAt).toLocaleString(),
        };
        updatePost(newPost);
      }
    }
  }, [postId, navigate, updatePost, loading, data]);
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
