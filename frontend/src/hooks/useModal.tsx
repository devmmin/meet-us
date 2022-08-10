import { useRecoilState } from "recoil";
import { modalState } from "../recoil";
import { NewModalProps } from "../types/global";

const useModal = () => {
  const [modal, setModal] = useRecoilState(modalState);

  const showModal = (newModal: NewModalProps) => {
    setModal((prevModal) => ({
      ...prevModal,
      ...newModal,
    }));
    modal.onOpen();
  };

  const hideModal = () => {
    modal.onClose();
  };

  return { showModal, hideModal };
};

export default useModal;
