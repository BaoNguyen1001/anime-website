import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import { VscError } from 'react-icons/vsc'

export default function CustomDialog({
  onButtonClick,
  title,
  text,
}) {

  const handleClose = (e) => {
    onButtonClick(e, 'Close');
  }

  const handleGoToLogin = (e) => {
    window.location.href = '/login'
  }

  return (
    <>
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={true}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title><VscError size={40} color='red'/> {title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{text}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleGoToLogin}>
            Go To Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}