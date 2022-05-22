import { Box, Button, Flex, Input, useToast } from '@chakra-ui/react';
import { MdChevronLeft } from 'react-icons/md';
import { Link } from 'react-router-dom';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import {
  useState,
  ChangeEvent,
  useRef,
  MutableRefObject,
  MouseEvent,
} from 'react';
import { EditorType } from '@toast-ui/editor';
import { postUpdate } from '../../util';

interface Props {
  buttonTitle: string;
  toPath: string;
  subject?: string;
  content?: string;
}

const UpdateLayout = ({
  buttonTitle,
  toPath,
  subject = '',
  content = '',
}: Props) => {
  const [data, setData] = useState({ subject, content });
  const changeHandler = (event: ChangeEvent<HTMLInputElement>, key: string) => {
    setData((prev) => ({
      ...prev,
      [key]: event.target.value,
    }));
  };

  const editorRef = useRef() as MutableRefObject<Editor>;
  const editorChangeHandler = (eventType: EditorType) => {
    if (!editorRef.current) {
      return;
    }
    setData((prev) => ({
      ...prev,
      content:
        eventType === 'markdown'
          ? editorRef.current.getInstance().getMarkdown()
          : editorRef.current.getInstance().getHTML(),
    }));
  };

  const toast = useToast();
  const clickHandler = (event: MouseEvent<HTMLButtonElement>, type: string) => {
    if (data.subject.trim() === '' || data.content.trim() === '') {
      toast({
        description: '입력된 값을 확인해주세요.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    const response = postUpdate();
    toast({
      description: `${type === 'save' ? '저장' : '발행'}을 ${
        response.code === 0 ? '완료' : '실패'
      }했습니다.`,
      status: response.code === 0 ? 'success' : 'error',
      duration: 9000,
      isClosable: true,
    });
  };
  return (
    <Box p="50px" bg="gray.50" minH="100%">
      <Flex h="88px" justifyContent="space-between">
        <Link to={toPath}>
          <Button leftIcon={<MdChevronLeft />} variant="ghost">
            이전 메뉴
          </Button>
        </Link>
        <Box>
          <Button
            variant="outline"
            bg="white"
            size="sm"
            onClick={(event) => {
              clickHandler(event, 'save');
            }}
          >
            {buttonTitle} 저장
          </Button>
          <Button
            colorScheme="green"
            size="sm"
            ml="10px"
            onClick={(event) => {
              clickHandler(event, 'regist');
            }}
          >
            {buttonTitle} 발행
          </Button>
        </Box>
      </Flex>
      <Flex flexDirection="column">
        <Input
          placeholder="제목을 입력하세요."
          bg="white"
          value={data.subject}
          onChange={(event) => {
            changeHandler(event, 'subject');
          }}
        />
        <Box mt="15px" minH="100%" bg="white">
          <Editor
            initialValue={data.content}
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

UpdateLayout.defaultProps = {
  subject: '',
  content: '',
};

export default UpdateLayout;
