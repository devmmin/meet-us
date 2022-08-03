import { MouseEvent, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRecoilState } from "recoil";
import { useToast } from "@chakra-ui/react";
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

const CREATE_POST = gql`
  mutation Mutation($post: CreatePostInput!) {
    createPost(post: $post) {
      postId
      title
      content
      status
      authorId
      updatedAt
      createdAt
    }
  }
`;

const UPDATE_POST = gql`
  mutation Mutation($post: UpdatePostInput!) {
    updatePost(post: $post) {
      postId
      title
      content
      status
      authorId
      updatedAt
      createdAt
    }
  }
`;

const DELETE_POST = gql`
  mutation Mutation($post: DeletePostInput!) {
    deletePost(id: $post) {
      postId
      title
      content
      status
      authorId
      updatedAt
      createdAt
    }
  }
`;

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
  const [updatePost, { error: updateError, data: updateData }] = useMutation(
    postId ? UPDATE_POST : CREATE_POST,
    {
      onCompleted: () => {
        const type = "save";
        const success = updateData && !updateError;
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
        const type = "save";
        const success = updateData && !updateError;
        toast({
          description: `${type === "save" ? "저장" : "발행"}을 ${
            success ? "완료" : "실패"
          }했습니다.`,
          status: success ? "success" : "error",
          duration: 9000,
          isClosable: true,
        });
      },
    }
  );

  const [deletePost, { error: deleteError, data: deleteData }] = useMutation(
    DELETE_POST,
    {
      onCompleted: () => {
        const success = deleteData && deleteData.deletePost && !deleteError;
        toast({
          description: `삭제를 ${success === 0 ? "완료" : "실패"}했습니다.`,
          status: success ? "success" : "error",
          duration: 9000,
          isClosable: true,
        });
      },
      onError: () => {
        const success = deleteData && deleteData.deletePost && !deleteError;
        toast({
          description: `삭제를 ${success === 0 ? "완료" : "실패"}했습니다.`,
          status: success ? "success" : "error",
          duration: 9000,
          isClosable: true,
        });
      },
    }
  );

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
        notice: {
          id: item.id,
          title: item.subject,
          content: item.content,
        },
      },
    });
  };

  const modalClickHandler = (item: {
    id: string;
    subject: string;
    content: string;
  }) => {
    deletePost({
      variables: {
        notice: {
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
      modalClickHandler={modalClickHandler}
    />
  );
};

export default PostUpdate;
