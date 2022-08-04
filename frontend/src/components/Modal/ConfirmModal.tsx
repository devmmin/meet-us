import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../recoil";

const ConfirmModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modal, setModal] = useRecoilState(modalState);

  useEffect(() => {
    setModal((prev) => ({
      ...prev,
      onOpen,
      onClose,
    }));
  }, [onOpen, onClose, setModal]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modal.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{modal.children}</ModalBody>
        <ModalFooter>
          <Button onClick={modal.onCancel ? modal.onCancel : onClose}>
            {modal.cancelText}
          </Button>
          <Button onClick={modal.onConfirm} colorScheme="red" ml="10px">
            {modal.confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default ConfirmModal;
