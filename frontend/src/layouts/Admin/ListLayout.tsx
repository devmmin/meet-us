import { Box, useDisclosure, Text, useToast } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import ConfirmModal from "../../components/Modal/confirmModal";
import ListHeader from "../../components/List/ListHeader";
import ListTable from "../../components/List/ListTable";
import { checkedListState } from "../../recoil";
import { ListItem } from "../../types/index";
import { deletePost } from "../../util";

interface Props {
  title: string;
  buttonTitle?: string;
  list?: Array<ListItem>;
  tableHeader: Array<string>;
  toPath?: string;
}

const ListLayout = ({
  title,
  buttonTitle,
  list = [],
  tableHeader = [],
  toPath = "",
}: Props) => {
  const checkedList = useRecoilValue(checkedListState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const modalClickHandler = () => {
    const response = deletePost();
    toast({
      description: `삭제를 ${response.code === 0 ? "완료" : "실패"}했습니다.`,
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
        정말로 {checkedList.length}건의 {title} 글을 삭제하시겠습니까?
      </ConfirmModal>
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
      />
    </Box>
  );
};

ListLayout.defaultProps = {
  list: [],
  buttonTitle: "",
  toPath: "",
};

export default ListLayout;
