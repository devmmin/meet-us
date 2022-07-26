import { Heading, Button, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
  title: string;
  isToggle: boolean;
  buttonTitle?: string;
  onOpen: () => void;
  toPath?: string;
}
const ListHeader = ({
  children,
  title,
  isToggle,
  buttonTitle,
  onOpen,
  toPath = "",
}: Props) => (
  <>
    <Flex h="70px">
      <Heading>{title}</Heading>
    </Flex>
    <Flex h="50px" alignItems="center" justifyContent="flex-end">
      {children}
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

ListHeader.defaultProps = {
  buttonTitle: "",
  toPath: "",
};

export default ListHeader;
