import {
  Table,
  Box,
  Heading,
  Flex,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Checkbox,
  Button,
  Text,
  Badge,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { MdMoreHoriz } from 'react-icons/md';

interface listItem {
  id: number;
  subject: string;
  status: string;
  register: string;
  createdAt: string;
}

interface Props {
  header: string;
  buttonTitle?: string;
  list?: Array<listItem>;
  tableHeader: Array<string>;
}

const ListLayout = ({
  header,
  buttonTitle,
  list = [],
  tableHeader = [],
}: Props) => {
  // TODO: 컴포넌트 분리
  const [checkedList, setCheckedList] = useState<number[]>([]);
  const allChecked = checkedList.length === list.length;
  const changeHandler = (event: ChangeEvent<HTMLInputElement>, id: number) => {
    if (id === 0) {
      setCheckedList(event.target.checked ? list.map((v) => v.id) : []);
    } else if (event.target.checked) {
      setCheckedList((prev) => [...prev, id]);
    } else {
      setCheckedList((prev) => prev.filter((v) => v !== id));
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  // TODO: 포스트 삭제 API 연동
  const modalClickHandler = () => {};
  return (
    <Box p="50px">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>2</ModalOverlay>
        <ModalContent>
          <ModalHeader>{header} 글 삭제</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            정말로 {checkedList.length}건의 {header} 글을 삭제하시겠습니까?
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>취소</Button>
            <Button onClick={modalClickHandler} colorScheme="red" ml="10px">
              삭제
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex h="70px">
        <Heading>{header}</Heading>
      </Flex>
      <Flex h="50px" alignItems="center" justifyContent="flex-end">
        {checkedList.length > 0 && (
          <Text mr="10px" fontSize="xs" fontWeight="semibold">
            {checkedList.length} 개 의 게시물의 선택 되었습니다.
          </Text>
        )}
        <Button
          bg={checkedList.length > 0 ? 'red.500' : 'blue.600'}
          color="white"
          size="sm"
          onClick={checkedList.length > 0 ? onOpen : () => {}}
        >
          {checkedList.length > 0
            ? `${buttonTitle} 삭제`
            : `${buttonTitle} 등록`}
        </Button>
      </Flex>
      {list.length > 0 && (
        <TableContainer>
          <Table>
            <Thead bg="gray.200" borderRadius="6px 0px">
              <Tr>
                {tableHeader.map((h) => {
                  if (h === 'CHECKBOX') {
                    return (
                      <Th key={h}>
                        <Checkbox
                          bg="white"
                          isChecked={allChecked}
                          onChange={(event) => {
                            changeHandler(event, 0);
                          }}
                        />
                      </Th>
                    );
                  } else if (h === 'MORE') {
                    return <Th key={h} />;
                  }
                  return <Th key={h}>{h}</Th>;
                })}
              </Tr>
            </Thead>
            <Tbody bg="white">
              {list.map((item) => (
                <Tr key={item.id}>
                  <Td>
                    <Checkbox
                      isChecked={checkedList.includes(item.id)}
                      onChange={(event) => changeHandler(event, item.id)}
                    />
                  </Td>
                  <Td>{item.subject}</Td>
                  <Td>
                    <Badge
                      variant="solid"
                      colorScheme={
                        item.status === 'COMPLETED' ? 'green' : 'gray'
                      }
                    >
                      {item.status === 'COMPLETED'
                        ? '포스트발행'
                        : '포스트발행전'}
                    </Badge>
                  </Td>
                  <Td>
                    <Flex alignItems="center" justifyContent="space-evenly">
                      <Avatar />
                      {item.register}
                    </Flex>
                  </Td>
                  <Td>{item.createdAt}</Td>
                  <Td>
                    <Menu>
                      <MenuButton as={IconButton} icon={<MdMoreHoriz />} />
                      {item.status === 'REQUEST' && (
                        <MenuList minWidth="125px" p="2px">
                          <MenuItem h="25px">포스트 발행 취소</MenuItem>
                        </MenuList>
                      )}
                      {item.status !== 'REQUEST' && (
                        <MenuList minWidth="125px" p="2px">
                          <MenuItem h="25px">포스트 발행</MenuItem>
                          <MenuItem h="25px">포스트 수정</MenuItem>
                          <MenuItem h="25px">포스트 삭제</MenuItem>
                        </MenuList>
                      )}
                    </Menu>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

ListLayout.defaultProps = {
  list: [],
  buttonTitle: '',
};

export default ListLayout;
