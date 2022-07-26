import {
  Box,
  Button,
  Flex,
  Input,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { MdChevronLeft } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import {
  ChangeEvent,
  useRef,
  MutableRefObject,
  MouseEvent,
  useEffect,
} from "react";
import { EditorType } from "@toast-ui/editor";
import { postUpdate, deletePost } from "../../util";
import ConfirmModal from "../../components/Modal/confirmModal";

interface Props {
  title: string;
  buttonTitle: string;
  toPath: string;
  item: { subject: string; content: string; status: string };
  updateItem: Function;
}

interface EditItem {
  id: number;
  subject: string;
  content: string;
  status: string;
  register: string;
  createdAt: string;
}

const UpdateLayout = ({
  title,
  buttonTitle,
  toPath,
  item: { subject = "", content = "", status = "" },
  updateItem,
}: Props) => {
  const params = useParams();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const editorRef = useRef() as MutableRefObject<Editor>;

  const id = (params && params.id) || null;

  const modalClickHandler = () => {
    const response = deletePost();
    toast({
      description: `삭제를 ${response.code === 0 ? "완료" : "실패"}했습니다.`,
      status: response.code === 0 ? "success" : "error",
      duration: 9000,
      isClosable: true,
    });
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>, key: string) => {
    updateItem((prev: EditItem) => ({
      ...prev,
      [key]: event.target.value,
    }));
  };

  useEffect(() => {
    if (editorRef.current.getInstance().isMarkdownMode()) {
      editorRef.current.getInstance().setMarkdown(content);
    } else {
      editorRef.current.getInstance().setHTML(content);
    }
  }, [content]);

  const editorChangeHandler = (eventType: EditorType) => {
    if (!editorRef.current) {
      return;
    }
    updateItem((prev: EditItem) => ({
      ...prev,
      content:
        eventType === "markdown"
          ? editorRef.current.getInstance().getMarkdown()
          : editorRef.current.getInstance().getHTML(),
    }));
  };

  const clickHandler = (event: MouseEvent<HTMLButtonElement>, type: string) => {
    if (subject.trim() === "" || content.trim() === "") {
      toast({
        description: "입력된 값을 확인해주세요.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    const response = postUpdate();
    toast({
      description: `${type === "save" ? "저장" : "발행"}을 ${
        response.code === 0 ? "완료" : "실패"
      }했습니다.`,
      status: response.code === 0 ? "success" : "error",
      duration: 9000,
      isClosable: true,
    });
  };
  return (
    <Box p="50px" bg="gray.50" minH="100%">
      <ConfirmModal
        title={`${title} 글 삭제`}
        buttonText="삭제"
        clickHandler={modalClickHandler}
        isOpen={isOpen}
        onClose={onClose}
      >
        정말로 {title} 글을 삭제하시겠습니까?
      </ConfirmModal>
      <Flex h="88px" justifyContent="space-between">
        <Link to={toPath}>
          <Button leftIcon={<MdChevronLeft />} variant="ghost">
            이전 메뉴
          </Button>
        </Link>
        <Box>
          {id && status !== "COMPLETED" && (
            <Button colorScheme="red" size="sm" onClick={onOpen}>
              {buttonTitle} 삭제
            </Button>
          )}
          {status !== "COMPLETED" && (
            <Button
              variant="outline"
              bg="white"
              size="sm"
              ml={id ? "10px" : "0px"}
              onClick={(event) => {
                clickHandler(event, "save");
              }}
            >
              {buttonTitle} {id ? "수정" : "저장"}
            </Button>
          )}
          {status !== "COMPLETED" && (
            <Button
              colorScheme="green"
              size="sm"
              ml="10px"
              onClick={(event) => {
                clickHandler(event, "regist");
              }}
            >
              {buttonTitle} 발행
            </Button>
          )}
          {status === "COMPLETED" && (
            <Button
              colorScheme="green"
              size="sm"
              ml="10px"
              onClick={(event) => {
                clickHandler(event, "regist");
              }}
            >
              {buttonTitle} 발행 취소
            </Button>
          )}
        </Box>
      </Flex>
      <Flex flexDirection="column">
        <Input
          placeholder="제목을 입력하세요."
          bg="white"
          value={subject}
          onChange={(event) => {
            changeHandler(event, "subject");
          }}
        />
        <Box mt="15px" minH="100%" bg="white">
          <Editor
            previewStyle="vertical"
            ref={editorRef}
            onChange={editorChangeHandler}
          />
        </Box>
      </Flex>
      <Box />
    </Box>
  );
};

export default UpdateLayout;
