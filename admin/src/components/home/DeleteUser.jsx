import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function DeleteUser(props) {
 const done=()=>{
  props.done();
 }
  return (
    <Modal show={props.open}  centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete ?
      </Modal.Body>
      <Modal.Footer>
        <Button  onclick={done} variant="secondary"  >
          No
        </Button>
        <Button variant="danger"  >
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteUser;
