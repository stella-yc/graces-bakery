import React from 'react';
import Modal from 'react-modal';

const myModal = (props) => {
  return (
    <Modal
      isOpen={props.open}
      className="modal"
      overlayClassName="overlay"
      shouldCloseOnOverlayClick={true}
    >
      <p>{props.content}</p>
      <button className="modal-btn" onClick={props.closeModal}>Close</button>
    </Modal>
  );
};

export default myModal;
