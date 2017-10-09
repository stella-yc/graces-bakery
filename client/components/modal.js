import React from 'react';
import Modal from 'react-modal';

const myModal = (props) => {
  console.log('signin modal');
  return (
    <Modal
    isOpen={props.open}
    >
      <p>{props.content}</p>
      <button onClick={props.closeModal}>Close</button>
    </Modal>
  );
};

export default myModal;
