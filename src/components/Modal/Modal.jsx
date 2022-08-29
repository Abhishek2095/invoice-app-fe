import React from "react";
import "./modalStyle.css";

import Modal from "react-modal";

// Modal.setAppElement("#root");
export default function ModalTest({ children, show, onRequestClose }) {
  // useEffect(() => {
  //   setIsOpen(isModalOpen);
  // }, [isModalOpen]);

  // useEffect(() => {
  //   setFilteredCustomerList(customerList);
  // }, [customerList]);

  return (
    <>
      <Modal
        isOpen={show}
        onRequestClose={onRequestClose}
        contentLabel="New Customer"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
        ariaHideApp={false}
      >
        {children}
      </Modal>
    </>
  );
}
