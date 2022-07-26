import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { MouseEventHandler, ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
  buttonText: string;
  clickHandler: MouseEventHandler<HTMLButtonElement>;
  isOpen: boolean;
  onClose: () => void;
}

const confirmModal = ({
  children,
  title,
  buttonText,
  clickHandler,
  isOpen,
  onClose,
}: Props) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{title}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={clickHandler} colorScheme="red" ml="10px">
          {buttonText}
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);
export default confirmModal;
