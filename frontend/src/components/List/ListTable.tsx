import {
  Table,
  Flex,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Checkbox,
  Badge,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Tfoot,
  Select,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction, ChangeEvent } from 'react';
import { MdChevronLeft, MdChevronRight, MdMoreHoriz } from 'react-icons/md';

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
  list: ListItem[];
  tableHeader: string[];
  buttonTitle?: string;
  checkedList: number[];
  setCheckedList: Dispatch<SetStateAction<Array<number>>>;
  pageInfo?: Page;
}

const ListTable = ({
  list,
  tableHeader,
  pageInfo = { page: 1, perPage: 10, totalCount: 0, totalPage: 1 },
  buttonTitle,
  checkedList,
  setCheckedList,
}: Props) => {
  const allChecked = list.length > 0 && checkedList.length === list.length;
  const changeHandler = (event: ChangeEvent<HTMLInputElement>, id: number) => {
    if (id === 0) {
      setCheckedList(event.target.checked ? list.map((v) => v.id) : []);
    } else if (event.target.checked) {
      setCheckedList((prev) => [...prev, id]);
    } else {
      setCheckedList((prev) => prev.filter((v) => v !== id));
    }
  };
  const perPageList = Array(1 * 10)
    .fill(undefined)
    .map((arr, i) => i + 1);
  const getList = () => {
    // TODO: API 통신 + 상태관리
  };
  return (
    <TableContainer borderRadius="6px 6px 0px 0px">
      <Table>
        <Thead bg="gray.200">
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
                  colorScheme={item.status === 'COMPLETED' ? 'green' : 'gray'}
                >
                  {item.status === 'COMPLETED'
                    ? `${buttonTitle} 발행`
                    : `${buttonTitle} 발행전`}
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
                  <MenuButton
                    as={IconButton}
                    icon={<MdMoreHoriz />}
                    bg="white"
                  />
                  {item.status === 'REQUEST' && (
                    <MenuList minWidth="125px" p="2px">
                      <MenuItem h="25px">{buttonTitle} 발행 취소</MenuItem>
                    </MenuList>
                  )}
                  {item.status !== 'REQUEST' && (
                    <MenuList minWidth="125px" p="2px">
                      <MenuItem h="25px">{buttonTitle} 발행</MenuItem>
                      <MenuItem h="25px">{buttonTitle} 수정</MenuItem>
                      <MenuItem h="25px">{buttonTitle} 삭제</MenuItem>
                    </MenuList>
                  )}
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot bg="white">
          <Tr>
            <Th colSpan={2}>
              <Flex alignItems="center">
                Show rows per page
                <Select
                  w="75px"
                  ml="8px"
                  value={pageInfo.perPage}
                  onChange={getList}
                >
                  {perPageList.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </Select>
              </Flex>
            </Th>
            <Th />
            <Th />
            <Th />
            <Th textAlign="right">
              {pageInfo.page}-{pageInfo.totalPage} of {pageInfo.totalCount}
              <IconButton
                size="sm"
                ml="24px"
                onClick={getList}
                icon={<MdChevronLeft />}
                aria-label="left"
                bg="white"
              />
              <IconButton
                size="sm"
                ml="8px"
                onClick={getList}
                icon={<MdChevronRight />}
                aria-label="right"
                bg="white"
              />
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

ListTable.defaultProps = {
  buttonTitle: '',
  pageInfo: {
    page: 1,
    perPage: 10,
    totalCount: 0,
    totalPage: 1,
  },
};

export default ListTable;
