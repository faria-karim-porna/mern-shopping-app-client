import React from "react";
// import { Modal } from "react-bootstrap";
import { useAppSelector } from "../core/redux/reduxStore";
import { shallowEqual } from "react-redux";
import { Modal } from "react-bootstrap";
import { EnumModal } from "../core/enums/EnumModal";

const UserModalComponent = () => {
  const store = useAppSelector(
    (state) => ({
      isModalOpen: state.UI.showModal === EnumModal.UserModal,
    }),
    shallowEqual
  );
  return (
    <>
      <Modal show={store.isModalOpen}><div>User Modal</div></Modal>
    </>
  );
};

export const UserModal = React.memo(UserModalComponent);
