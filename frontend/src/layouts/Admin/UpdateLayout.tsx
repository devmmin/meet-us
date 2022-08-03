import { Box, Button, Flex, Input, useDisclosure } from "@chakra-ui/react";
import { MdChevronLeft } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { ChangeEvent, useRef, MutableRefObject, useEffect } from "react";
import { EditorType } from "@toast-ui/editor";
import ConfirmModal from "../../components/Modal/confirmModal";
import { ListItem } from "../../types/store";

interface Props {
  title: string;
  buttonTitle: string;
  toPath: string;
  item: { subject: string; content: string; status: string };
  updateItem: Function;
  buttonHandler: Function;
  modalClickHandler: Function;
}

const UpdateLayout = ({
  title,
  buttonTitle,
  toPath,
  item: { subject = "", content = "", status = "" },
  updateItem,
  buttonHandler,
  modalClickHandler,
}: Props) => {
  const params = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const editorRef = useRef() as MutableRefObject<Editor>;

  const id = (params && params.id) || null;

  // TODO: 상태관리 필요없으면 ref로 코드 수정
  const changeHandler = (event: ChangeEvent<HTMLInputElement>, key: string) => {
    updateItem((prev: ListItem) => ({
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
    // TODO: 상태관리 필요없으면 ref로 코드 수정
    updateItem((prev: ListItem) => ({
      ...prev,
      content:
        eventType === "markdown"
          ? editorRef.current.getInstance().getMarkdown()
          : editorRef.current.getInstance().getHTML(),
    }));
  };

  return (
    <Box p="50px" bg="gray.50" minH="100%">
      <ConfirmModal
        title={`${title} 글 삭제`}
        buttonText="삭제"
        clickHandler={() => {
          modalClickHandler({ id, subject, content });
        }}
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
                buttonHandler(event, { id, subject, content }, "save");
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
                buttonHandler(event, { id, subject, content }, "regist");
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
                buttonHandler(event, { id, subject, content }, "regist");
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
