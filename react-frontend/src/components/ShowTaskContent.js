import React from 'react'
import {Modal,Button,ListGroup} from 'react-bootstrap'
import './ShowTaskContent.css'

const ShowTaskContent = (props) => {
    return (
        <Modal
        show={props.show} 
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Todo Detail
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <ul>
              <li>
                  Title: {props.task.title}
              </li>
              <li>
                  Content: {props.task.content}
              </li>
              <li>
                  Date: {props.task.date}
              </li>
              <li>
                  Time: {props.task.time}
              </li>
          </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    )
}

export default ShowTaskContent
