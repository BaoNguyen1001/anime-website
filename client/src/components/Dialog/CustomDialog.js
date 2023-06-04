import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { VscError } from "react-icons/vsc";

export default function CustomDialog({ onButtonClick, title, text, onOK }) {
  const handleClose = (e) => {
    if (typeof onOK === "function") {
      onOK();
    }
    onButtonClick(e, "Close");
  };

  const handleOnOK = (e) => {
    if (typeof onOK === "function") {
      onOK();
    }
    onButtonClick(e, "Close");
  };

  return (
    <>
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={true}
        onHide={handleClose}
      >
        <Modal.Header closeButton style={{ padding: "4px 16px" }}>
          <Modal.Title style={{ fontSize: "20px" }}>
            <VscError size={25} color="red" /> {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{text}</Modal.Body>
        <Modal.Footer
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "4px 16px",
          }}
        >
          <Button
            variant="primary"
            onClick={handleOnOK}
            style={{ padding: "6px 30px" }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
