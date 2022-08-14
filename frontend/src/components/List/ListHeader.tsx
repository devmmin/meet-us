import { Heading, Button, Flex, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { checkedListState } from "../../recoil";
import useModal from "../../hooks/useModal";

interface Props {
  title: string;
  buttonTitle?: string;
  toPath?: string;
  confirm?: Function;
}
const ListHeader = ({ title, buttonTitle, toPath = "", confirm }: Props) => {
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

  const isToggle = useMemo(() => checkedList.length, [checkedList.length]);
  return (
    <>
      <Flex h="70px">
        <Heading>{title}</Heading>
      </Flex>
      <Flex h="50px" alignItems="center" justifyContent="flex-end">
        {checkedList.length > 0 && (
          <Text mr="10px" fontSize="xs" fontWeight="semibold">
            {checkedList.length} 개 의 게시물의 선택 되었습니다.
          </Text>
        )}
        <Button
          bg={isToggle ? "red.500" : "blue.600"}
          color="white"
          size="sm"
          disabled={!buttonTitle}
          onClick={isToggle ? onOpen : () => {}}
        >
          {isToggle ? (
            `선택된 ${buttonTitle} 삭제`
          ) : (
            <Link to={toPath}>{`${buttonTitle} 등록`}</Link>
          )}
        </Button>
      </Flex>
    </>
  );
};

ListHeader.defaultProps = {
  buttonTitle: "",
  toPath: "",
  confirm: () => {},
};

export default ListHeader;
