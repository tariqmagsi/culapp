import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function DeleteModal({show, handleClose, deleteEvent}) {
    return (
      <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title style={{marginBottom: "-90px"}}>Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    Are you sure you want to delete?
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose} size="sm">
                    No
                </Button>
                <Button variant="success" onClick={deleteEvent} size="sm">
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
      </>
    );
}