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
} from "@chakra-ui/react";
import { ChangeEvent, memo } from "react";
import { useRecoilState } from "recoil";
import { MdMoreHoriz } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { checkedListState } from "../../recoil";
import { ListItem } from "../../types/global";
import ListFooter from "./ListFooter";

interface Props {
  list: ListItem[];
  tableHeader: string[];
  buttonTitle?: string;
}

const ListTableHead = memo(
  ({
    tableHeader,
    allChecked,
    changeHandler,
  }: {
    tableHeader: string[];
    allChecked: boolean;
    changeHandler: Function;
  }) => (
    <Thead bg="gray.200">
      <Tr>
        {tableHeader.map((h) => {
          if (h === "CHECKBOX") {
            return (
              <Th key={h}>
                <Checkbox
                  bg="white"
                  isChecked={allChecked}
                  onChange={(event) => {
                    changeHandler(event, "");
                  }}
                />
              </Th>
            );
          } else if (h === "MORE") {
            return <Th key={h} />;
          }
          return <Th key={h}>{h}</Th>;
        })}
      </Tr>
    </Thead>
  )
);

const ListTable = ({ list, tableHeader, buttonTitle }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [checkedList, setCheckedList] = useRecoilState(checkedListState);
  const allChecked = list.length > 0 && checkedList.length === list.length;
  const changeHandler = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    if (id === "") {
      setCheckedList(event.target.checked ? list.map((v) => v.id) : []);
    } else if (event.target.checked) {
      setCheckedList((prev) => [...prev, id]);
    } else {
      setCheckedList((prev) => prev.filter((v) => v !== id));
    }
  };
  return (
    <TableContainer borderRadius="6px 6px 0px 0px">
      <Table>
        <ListTableHead
          tableHeader={tableHeader}
          allChecked={allChecked}
          changeHandler={changeHandler}
        />
        <Tbody bg="white">
          {list.map((item) => (
            <Tr
              key={item.id}
              onClick={() => {
                navigate(`../${location.pathname}/update/${item.id}`);
              }}
            >
              <Td
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Checkbox
                  isChecked={checkedList.includes(item.id)}
                  onChange={(event) => changeHandler(event, item.id)}
                />
              </Td>
              <Td>{item.subject}</Td>
              <Td>
                <Badge
                  variant="solid"
                  colorScheme={item.status === "COMPLETED" ? "green" : "gray"}
                >
                  {item.status === "COMPLETED"
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
              <Td
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Menu>
                  <MenuButton
                    as={IconButton}
                    icon={<MdMoreHoriz />}
                    bg="white"
                  />
                  {item.status === "REQUEST" && (
                    <MenuList minWidth="125px" p="2px">
                      <MenuItem h="25px">{buttonTitle} 발행 취소</MenuItem>
                    </MenuList>
                  )}
                  {item.status !== "REQUEST" && (
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
      </Table>
      <ListFooter />
    </TableContainer>
  );
};

ListTable.defaultProps = {
  buttonTitle: "",
};

export default ListTable;
