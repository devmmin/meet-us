import { Box } from "@chakra-ui/react";
import ListHeader from "../components/List/ListHeader";
import ListTable from "../components/List/ListTable";
import { ListItem } from "../types/global";
import { getHeader } from "../util";

const {
  data: { header },
} = getHeader();

const UserManagement = () => {
  const title = "유저 관리";
  const list: Array<ListItem> = [];
  return (
    <Box p="50px" bg="gray.50" minH="100%">
      <ListHeader title={title} />
      <ListTable list={list} tableHeader={header} />
    </Box>
  );
};

export default UserManagement;
