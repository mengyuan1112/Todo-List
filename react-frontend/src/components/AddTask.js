import React, { useState } from 'react'
import {Modal,Button,Form,Row,Col} from 'react-bootstrap'
import { FaTemperatureLow } from 'react-icons/fa'


const AddTask = (props) => {
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [date,setDate] = useState('')
    const [time,setTime] = useState('')
    const [error,setError] = useState(false)
    var myCurrentDate = new Date();
    myCurrentDate.setHours(0,0,0,0);

    const handleSubmitTask=(e)=>{
        // props.addtask({title,content,date,time});
        e.preventDefault();
        props.onHide();
        props.addtask({title:title,content:content,date:date,time:time})
        setTitle("")
        setContent('')
        setDate('')
        setTime('')
    }
    return (
        <Modal
        show={props.show} 
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Task
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmitTask}>
        <Modal.Body>
            <Form.Group as={Row} className="mb-3" controlId="TaskTitle">
                <Form.Label column sm="3">Title</Form.Label>
                <Col sm="9"> 
                <Form.Control type="text" placeholder="Enter title" onChange={(e)=>{
                    setTitle(e.target.value)}}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSubmitTask(e);
                        }}}
                    required /> 
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
                        }}} />
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
            <Button type="Submit" variant="primary">Save changes</Button>
        </Modal.Footer>
    </Form>
      </Modal>
    )
}

export default AddTask
