import { Box, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import ListHeader from "../../components/List/ListHeader";
import ListTable from "../../components/List/ListTable";
import useModal from "../../hooks/useModal";
import { checkedListState } from "../../recoil";
import { ListItem } from "../../types/global";

interface Props {
  title: string;
  buttonTitle?: string;
  list?: Array<ListItem>;
  tableHeader: Array<string>;
  toPath?: string;
  confirm?: Function;
}

const ListLayout = ({
  title,
  buttonTitle,
  list = [],
  tableHeader = [],
  toPath = "",
  confirm,
}: Props) => {
  const checkedList = useRecoilValue(checkedListState);
  const { showModal, hideModal } = useModal();
  const onOpen = () => {
    showModal({
      title: `${title} 글 삭제`,
      children: `정말로 ${checkedList.length}건의 ${title} 글을 삭제하시겠습니까?`,
      confirmText: "삭제",
      cancelText: "취소",
      onCancel: () => {
        hideModal();
      },
      onConfirm: () => {
        if (confirm) {
          confirm({ id: checkedList });
          hideModal();
        } else {
          hideModal();
        }
      },
    });
  };
  return (
    <Box p="50px" bg="gray.50" minH="100%">
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
  confirm: () => {},
};

export default ListLayout;
