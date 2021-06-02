import React, { useState } from 'react'
import {Modal,Button,Form,Row,Col} from 'react-bootstrap'


const AddSharedTask = (props) => {
    const [validated, setValidated] = useState(false);
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [date,setDate] = useState('')
    const [time,setTime] = useState('')
    const [sharedWith, setSharedWith] = useState([])
    var myCurrentDate = new Date();
    myCurrentDate.setHours(0,0,0,0);

    // This function will handle the form submission for adding a shared task.
    const handleSubmitTask=(e)=>{
        props.onHide();
        e.preventDefault();
        console.log(sharedWith)
        props.addtask({sharedWith:sharedWith,title:title,content:content,date:date,time:time})
          
    }

    const addFriend=()=>{
        console.log("add friend button clicked.")
    }
    return (
        <Modal
        show={props.show} 
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Add Share Task
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmitTask}>
        <Modal.Body>
            <Form.Group as={Row} className="mb-3" controlId="shareWith">
                <Form.Label column sm="3">Share with</Form.Label>
                <Col sm="8"> 
                <Form.Control as="select" multiple htmlSize={2} required onChange={(e) => 
              setSharedWith([e.target.value]) }>
                  {/* TODO: needed to get the friend list from server and display it here. */}
                    <option>friend 1 </option>
                    <option>friend 2 </option>
                    <option>friend 3 </option>
                </Form.Control>
                </Col>

                {/* This is a button for add friends. TODO: Need to link it to the add friend functions once done */}
                <Button size="sm" onClick={addFriend} variant="info"> + </Button>  
            </Form.Group>


            <Form.Group as={Row} className="mb-3" controlId="TaskTitle">
                <Form.Label column sm="3">Title (required) </Form.Label>
                <Col sm="9"> 
                <Form.Control type="text" placeholder="Enter title"  onChange={(e)=>{
                    setTitle(e.target.value)}} 
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSubmitTask(e);
                        }}} required/> 
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="TaskContent">
                <Form.Label column sm="3">Content(optional)</Form.Label>
                <Col sm="9"> 
                <Form.Control as="textarea" rows="4" type="text" placeholder="Enter content" onChange={(e)=>{
                    setContent(e.target.value)}}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSubmitTask(e);
                        }}}/> 
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="Dealine">
                <Form.Label column sm="3">Deadline(optional)</Form.Label>
                <Col sm="9">
                    <Form.Control type="date" name="date" placeholder="Date" onChange={(e)=>{
                    setDate(e.target.value)}}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSubmitTask(e);
                        }}}/> 
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="time">
                <Form.Label column sm="3">Time (optional)</Form.Label>
                <Col sm="9"><Form.Control type="time" name="time" placeholder="Time" onChange={(e)=>{
                    setTime(e.target.value)}}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSubmitTask(e);
                        }}}/> 
                </Col>
            </Form.Group>

        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>Close</Button>
            <Button type="submit" variant="primary">Save changes</Button>
        </Modal.Footer>
        </Form>
    </Modal>
    );
}

export default AddSharedTask