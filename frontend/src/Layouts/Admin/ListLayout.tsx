import { Box, useDisclosure, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { deletePost } from '../../util';
import ModalLayout from '../../components/Modal/confirmModal';
import ListHeader from '../../components/List/ListHeader';
import ListTable from '../../components/List/ListTable';

interface ListItem {
  id: number;
  subject: string;
  status: string;
  register: string;
  createdAt: string;
}

interface Page {
  page: number;
  perPage: number;
  totalCount: number;
  totalPage: number;
}

interface Props {
  title: string;
  buttonTitle?: string;
  list?: Array<ListItem>;
  tableHeader: Array<string>;
  toPath?: string;
  pageInfo?: Page;
}

const ListLayout = ({
  title,
  buttonTitle,
  list = [],
  tableHeader = [],
  toPath = '',
  pageInfo,
}: Props) => {
  const [checkedList, setCheckedList] = useState<number[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const modalClickHandler = () => {
    const response = deletePost();
    toast({
      description: `삭제를 ${response.code === 0 ? '완료' : '실패'}했습니다.`,
      status: response.code === 0 ? 'success' : 'error',
      duration: 9000,
      isClosable: true,
    });
  };
  return (
    <Box p="50px" bg="gray.50" minH="100%">
      <ModalLayout
        title={`${title} 글 삭제`}
        buttonText="삭제"
        clickHandler={modalClickHandler}
        isOpen={isOpen}
        onClose={onClose}
      >
        정말로 {checkedList.length}건의 {title} 글을 삭제하시겠습니까?
      </ModalLayout>
      <ListHeader
        title={title}
        isToggle={checkedList.length > 0}
        buttonTitle={buttonTitle}
        onOpen={onOpen}
        toPath={toPath}
      >
        {checkedList.length > 0 && (
          <Text mr="10px" fontSize="xs" fontWeight="semibold">
            {checkedList.length} 개 의 게시물의 선택 되었습니다.
          </Text>
        )}
      </ListHeader>
      <ListTable
        list={list}
        tableHeader={tableHeader}
        buttonTitle={buttonTitle}
        checkedList={checkedList}
        pageInfo={pageInfo}
        setCheckedList={setCheckedList}
      />
    </Box>
  );
};

ListLayout.defaultProps = {
  list: [],
  buttonTitle: '',
  toPath: '',
  pageInfo: {
    page: 1,
    perPage: 10,
    totalCount: 0,
    totalPage: 1,
  },
};

export default ListLayout;
