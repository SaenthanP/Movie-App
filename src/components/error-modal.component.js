import React, { Component, useContext, useState, useEffect } from 'react';
import '../components/component.css';

import { Modal, Button, Card,Form,Alert} from 'react-bootstrap';
import Axios from 'axios';
export default function ErrorModal(props) {


  return (


    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered


    >
      <Modal.Header closeButton>
    
      </Modal.Header>
      <Modal.Body>
      <Alert variant="danger">
        <Alert.Heading>You got an error!</Alert.Heading>
        <p>
      {props.error}
        </p>
      </Alert>

      </Modal.Body>
      <Modal.Footer>



        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>

  );

}