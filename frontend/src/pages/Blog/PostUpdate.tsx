import { MouseEvent, useEffect, ChangeEvent } from "react";
import { useRecoilState } from "recoil";
import { useMutation, useQuery } from "@apollo/client";
import { Box, Flex, Input, useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { postItemState } from "../../recoil";
import { CREATE_POST, DELETE_POST, GET_POST, UPDATE_POST } from "../../gql";
import { PostResponse, PostVariable } from "../../types/server";
import { ListItem } from "../../types/global";
import useEditor from "../../hooks/useEditor";
import UpdateHeader from "../../components/Update/UpdateHeader";

interface Props {
  post: {
    id: string;
    subject: string;
    content: string;
    status: string;
  };
}

const PostUpdateHeader = ({ post }: Props) => {
  const toast = useToast();
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

  // TODO: 저장과 발행의 차이는 무엇인지 확인하기
  const [updatePost] = useMutation(post.id ? UPDATE_POST : CREATE_POST, {
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

  const confirm = (item: { id: string | Array<string> }) => {
    deletePost({
      variables: {
        post: {
          id: item.id,
        },
      },
    });
  };

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

  const title = "블로그";
  const toPath = "/admin/blog";

  return (
    <UpdateHeader
      title={title}
      item={post}
      confirm={confirm}
      toPath={toPath}
      buttonHandler={buttonHandler}
    />
  );
};

const PostUpdate = () => {
  const params = useParams();
  const [post, setPost] = useRecoilState(postItemState);
  const postId = (params && params.id) || "";

  const { data } = useQuery<PostResponse, PostVariable>(GET_POST, {
    variables: {
      postId,
    },
  });

  useEffect(() => {
    if (data) {
      setPost({
        id: data.getPostById.postId,
        subject: data.getPostById.title,
        content: data.getPostById.content,
        status: data.getPostById.status,
        register: data.getPostById.author.id + data.getPostById.author.userName,
        createdAt: new Date(data.getPostById.createdAt).toLocaleString(),
      });
    }
  }, [data, setPost]);

  const update = (content: string) => {
    setPost((prev) => ({
      ...prev,
      content,
    }));
  };

  const { renderEditor } = useEditor({ content: post.content, update });

  const changeHandler = (event: ChangeEvent<HTMLInputElement>, key: string) => {
    setPost((prev: ListItem) => ({
      ...prev,
      [key]: event.target.value,
    }));
  };

  return (
    <Box p="50px" bg="gray.50" minH="100%">
      <PostUpdateHeader post={post} />
      <Flex flexDirection="column">
        <Input
          placeholder="제목을 입력하세요."
          bg="white"
          value={post.subject}
          onChange={(event) => {
            changeHandler(event, "subject");
          }}
        />
        <Box mt="15px" minH="100%" bg="white">
          {renderEditor()}
        </Box>
      </Flex>
      <Box />
    </Box>
  );
};

export default PostUpdate;
