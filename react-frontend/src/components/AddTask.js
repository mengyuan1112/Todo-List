import axios from 'axios';
import React, { useState } from 'react'
import {Modal,Button,Form,Row,Col} from 'react-bootstrap'

const AddTask = (props) => {
    var myCurrentDate = new Date();
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [date,setDate] = useState(myCurrentDate.getDate())
    const [time,setTime] = useState()


    const handleSubmitTask=(e)=>{
        e.preventDefault();
        // props.addtask({title,content,date,time});
        props.onHide();
        // make a post request .
        axios.post(props.name + '/main/addTask',{title:title,content:content,date:date,time:time})
        .then(response=>{
            console.log(response);
            if (response.data.result === "Success"){
                //add the task........
                props.addtask({title,content,date,time})
            }
            setTitle('')
            setContent('')
            setDate(myCurrentDate)
            setTime()  
        })
        .catch(err=>{
            console.log(err);
        })
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
                <Form.Control type="text" placeholder="Enter title" required onChange={(e)=>{
                    setTitle(e.target.value)}}/> 
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="TaskContent">
                <Form.Label column sm="3">Content(optional)</Form.Label>
                <Col sm="9"> 
                <Form.Control as="textarea" rows="4" type="text" placeholder="Enter content" onChange={(e)=>{
                    setContent(e.target.value)}} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="Dealine">
                <Form.Label column sm="3">Deadline(optional)</Form.Label>
                <Col sm="9">
                    <Form.Control type="date" name="date" placeholder="Date" onChange={(e)=>{
                    setDate(e.target.value)}}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="time">
                <Form.Label column sm="3">Time (optional)</Form.Label>
                <Col sm="9"><Form.Control type="time" name="time" placeholder="Time" onChange={(e)=>{
                    setTime(e.target.value)}}/></Col>
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>Close</Button>
            <Button type="submit" variant="primary">Save changes</Button>
        </Modal.Footer>
    </Form>
      </Modal>
    )
}

export default AddTask
