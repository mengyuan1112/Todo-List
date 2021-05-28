import React from 'react'
import {Card,ListGroup } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'
import ShowTaskContent from './ShowTaskContent'

const taskClicked =() =>{
    console.log("onclicked")
}

const FinishedTasks = ({task,backTodo}) => {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <ListGroup variant="flush" >
        <ListGroup.Item action onDoubleClick={()=>setModalShow(true)}>
            {task.title}
        <FaTimes onClick={()=>backTodo(task)}
            style={{float:'right', color:'red',cursor:'pointer'}}/> 
        </ListGroup.Item>
        <ShowTaskContent
        task={task}
        show={modalShow}
        onHide={() => setModalShow(false)}/>
        </ListGroup>
        
    )
}

export default FinishedTasks
