import { MouseEvent, useEffect } from "react";
import { useRecoilState } from "recoil";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import UpdateLayout from "../../layouts/Admin/UpdateLayout";
import { noticeItemState } from "../../recoil";

interface PostVariable {
  noticeId: string;
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

const GET_NOTICE = gql`
  query GetPostById($noticeId: String!) {
    getPostById(id: $noticeId) {
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

const CREATE_NOTICE = gql`
  mutation Mutation($notice: CreatePostInput!) {
    createPost(post: $notice) {
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

const UPDATE_NOTICE = gql`
  mutation Mutation($notice: UpdatePostInput!) {
    updatePost(post: $notice) {
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

const DELETE_NOTICE = gql`
  mutation Mutation($notice: DeletePostInput!) {
    deletePost(id: $notice) {
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

const NoticeUpdate = () => {
  const params = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [notice, setNotice] = useRecoilState(noticeItemState);
  const noticeId = (params && params.id) || "";

  const { loading, data } = useQuery<PostResponse, PostVariable>(GET_NOTICE, {
    variables: {
      noticeId,
    },
  });

  // TODO: 저장과 발행의 차이는 무엇인지 확인하기
  const [updateNotice, { error: updateError, data: updateData }] = useMutation(
    noticeId ? UPDATE_NOTICE : CREATE_NOTICE,
    {
      onCompleted: () => {
        console.log("onCompleted");
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
        console.log("onError");
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

  const [deleteNotice, { error: deleteError, data: deleteData }] = useMutation(
    DELETE_NOTICE,
    {
      onCompleted: () => {
        console.log("delete>onCompleted");
        const success = deleteData && deleteData.deletePost && !deleteError;
        toast({
          description: `삭제를 ${success === 0 ? "완료" : "실패"}했습니다.`,
          status: success ? "success" : "error",
          duration: 9000,
          isClosable: true,
        });
      },
      onError: () => {
        console.log("delete>onError");
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

    updateNotice({
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
    deleteNotice({
      variables: {
        notice: {
          id: item.id,
        },
      },
    });
  };

  useEffect(() => {
    if (!loading && data) {
      const newNotice = {
        id: data.getPostById.postId,
        subject: data.getPostById.title,
        content: data.getPostById.content,
        status: data.getPostById.status,
        register: data.getPostById.author.id + data.getPostById.author.userName,
        createdAt: new Date(data.getPostById.createdAt).toLocaleString(),
      };
      setNotice(newNotice);
    }
  }, [noticeId, navigate, setNotice, loading, data]);
  return (
    <UpdateLayout
      title="공지사항"
      buttonTitle="공지사항"
      toPath="/admin/notice"
      item={notice}
      updateItem={setNotice}
      buttonHandler={buttonHandler}
      modalClickHandler={modalClickHandler}
    />
  );
};

export default NoticeUpdate;
