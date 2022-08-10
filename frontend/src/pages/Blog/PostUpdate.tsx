import { MouseEvent, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useRecoilState } from "recoil";
import { useToast } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import UpdateLayout from "../../layouts/Admin/UpdateLayout";
import { postItemState } from "../../recoil";
import { CREATE_POST, DELETE_POST, GET_POST, UPDATE_POST } from "../../gql";
import { PostResponse, PostVariable } from "../../types/server";

const PostUpdate = () => {
  const params = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [post, setPost] = useRecoilState(postItemState);
  const postId = (params && params.id) || "";

  const { loading, data } = useQuery<PostResponse, PostVariable>(GET_POST, {
    variables: {
      postId,
    },
  });

  // TODO: 저장과 발행의 차이는 무엇인지 확인하기
  const [updatePost] = useMutation(postId ? UPDATE_POST : CREATE_POST, {
    onCompleted: (response) => {
      const type = "save";
      const success = response;
      toast({
        description: `${type === "save" ? "저장" : "발행"}을 ${
          success ? "완료" : "실패"
        }했습니다.`,
        status: success ? "success" : "error",
        duration: 9000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        description: "저장을 실패했습니다.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  // TODO: onCompleted, onError 공통처리
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

  const buttonHandler = (
    event: MouseEvent<HTMLButtonElement>,
    item: { id: string; subject: string; content: string }
  ) => {
    if (item.subject.trim() === "" || item.content.trim() === "") {
      toast({
        description: "입력된 값을 확인해주세요.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    updatePost({
      variables: {
        post: {
          id: item.id,
          title: item.subject,
          content: item.content,
        },
      },
    });
  };

  const confirm = (item: { id: string | Array<string> }) => {
    deletePost({
      variables: {
        post: {
          id: item.id,
        },
      },
    });
  };

  useEffect(() => {
    if (!loading && data) {
      const newPost = {
        id: data.getPostById.postId,
        subject: data.getPostById.title,
        content: data.getPostById.content,
        status: data.getPostById.status,
        register: data.getPostById.author.id + data.getPostById.author.userName,
        createdAt: new Date(data.getPostById.createdAt).toLocaleString(),
      };
      setPost(newPost);
    }
  }, [postId, navigate, setPost, loading, data]);
  return (
    <UpdateLayout
      title="블로그"
      buttonTitle="포스트"
      toPath="/admin/blog"
      item={post}
      updateItem={setPost}
      buttonHandler={buttonHandler}
      confirm={confirm}
    />
  );
};

export default PostUpdate;
