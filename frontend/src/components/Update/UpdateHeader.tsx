import { Box, Button, Flex } from "@chakra-ui/react";
import { MdChevronLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import useModal from "../../hooks/useModal";

interface Props {
  title: string;
  item: { id: string; status: string };
  toPath: string;
  confirm: Function;
  buttonHandler: Function;
}
const UpdateHeader = ({
  title,
  item,
  toPath,
  confirm,
  buttonHandler,
}: Props) => {
  const { showModal, hideModal } = useModal();
  const onOpen = () => {
    showModal({
      title: `${title} 글 삭제`,
      children: `정말로 ${title} 글을 삭제하시겠습니까?`,
      confirmText: "삭제",
      cancelText: "취소",
      onCancel: () => {
        hideModal();
      },
      onConfirm: () => {
        confirm({ id: item.id });
      },
    });
  };
  return (
    <Flex h="88px" justifyContent="space-between">
      <Link to={toPath}>
        <Button leftIcon={<MdChevronLeft />} variant="ghost">
          이전 메뉴
        </Button>
      </Link>
      <Box>
        {item.id && item.status !== "COMPLETED" && (
          <Button
            colorScheme="red"
            size="sm"
            onClick={() => {
              onOpen();
            }}
          >
            {title} 삭제
          </Button>
        )}
        {item.status !== "COMPLETED" && (
          <Button
            variant="outline"
            bg="white"
            size="sm"
            ml={item.id ? "10px" : "0px"}
            onClick={(event) => {
              buttonHandler(event, item);
            }}
          >
            {title} {item.id ? "수정" : "저장"}
          </Button>
        )}
        {item.status !== "COMPLETED" && (
          <Button
            colorScheme="green"
            size="sm"
            ml="10px"
            onClick={(event) => {
              buttonHandler(event, item);
            }}
          >
            {title} 발행
          </Button>
        )}
        {item.status === "COMPLETED" && (
          <Button
            colorScheme="green"
            size="sm"
            ml="10px"
            onClick={(event) => {
              buttonHandler(event, item);
            }}
          >
            {title} 발행 취소
          </Button>
        )}
      </Box>
    </Flex>
  );
};

export default UpdateHeader;
