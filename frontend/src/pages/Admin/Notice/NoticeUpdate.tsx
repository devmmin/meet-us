import { useMutation, useQuery } from "@apollo/client";
import { Box, Flex, Input, useToast } from "@chakra-ui/react";
import { ChangeEvent, MouseEvent, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

import UpdateHeader from "../../../components/Update/UpdateHeader";
import {
  CREATE_NOTICE,
  DELETE_NOTICE,
  GET_NOTICE,
  UPDATE_NOTICE,
} from "../../../gql";
import useEditor from "../../../hooks/useEditor";
import { noticeItemState } from "../../../recoil";
import { ListItem } from "../../../types/global";
import { NoticeResponse, NoticeVariable } from "../../../types/server";

interface Props {
  notice: {
    id: string;
    subject: string;
    content: string;
    status: string;
  };
}

const NoticeUpdateHeader = ({ notice }: Props) => {
  const toast = useToast();
  const [deleteNotice] = useMutation(DELETE_NOTICE, {
    onCompleted: (response) => {
      toast({
        description: `삭제를 ${response === 0 ? "완료" : "실패"}했습니다.`,
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
  const [updateNotice] = useMutation(
    notice.id ? UPDATE_NOTICE : CREATE_NOTICE,
    {
      onCompleted: (response) => {
        const type = "save";
        toast({
          description: `${type === "save" ? "저장" : "발행"}을 ${
            response ? "완료" : "실패"
          }했습니다.`,
          status: response ? "success" : "error",
          duration: 9000,
          isClosable: true,
        });
      },
      onError: () => {
        const type = "save";
        toast({
          description: `${type === "save" ? "저장" : "발행"}을 실패했습니다.`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      },
    }
  );

  const confirm = (item: { id: string }) => {
    deleteNotice({
      variables: {
        notice: {
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

  const title = "공지사항";
  const toPath = "/admin/notice";

  return (
    <UpdateHeader
      title={title}
      item={notice}
      toPath={toPath}
      confirm={confirm}
      buttonHandler={buttonHandler}
    />
  );
};

const NoticeUpdate = () => {
  const params = useParams();
  const [notice, setNotice] = useRecoilState(noticeItemState);
  const noticeId = (params && params.id) || "";

  const { data } = useQuery<NoticeResponse, NoticeVariable>(GET_NOTICE, {
    variables: {
      noticeId,
    },
  });

  useEffect(() => {
    if (data) {
      setNotice({
        id: data.getPostById.postId,
        subject: data.getPostById.title,
        content: data.getPostById.content,
        status: data.getPostById.status,
        register: data.getPostById.author.id + data.getPostById.author.userName,
        createdAt: new Date(data.getPostById.createdAt).toLocaleString(),
      });
    }
  }, [data, setNotice]);

  const update = (content: string) => {
    setNotice((prev) => ({
      ...prev,
      content,
    }));
  };

  const { renderEditor } = useEditor({ content: notice.content, update });

  const changeHandler = (event: ChangeEvent<HTMLInputElement>, key: string) => {
    setNotice((prev: ListItem) => ({
      ...prev,
      [key]: event.target.value,
    }));
  };

  return (
    <Box p="50px" bg="gray.50" minH="100%">
      <NoticeUpdateHeader notice={notice} />
      <Flex flexDirection="column">
        <Input
          placeholder="제목을 입력하세요."
          bg="white"
          value={notice.subject}
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

export default NoticeUpdate;
