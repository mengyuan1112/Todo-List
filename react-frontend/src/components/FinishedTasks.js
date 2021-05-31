import React from 'react'
import {Card,ListGroup } from 'react-bootstrap'
import { FaUndo } from 'react-icons/fa'
import ShowTaskContent from './ShowTaskContent'

const taskClicked =() =>{
    console.log("onclicked")
}

const FinishedTasks = ({task,backTodo,deleteTask}) => {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <ListGroup variant="flush" >
        <ListGroup.Item action onClick={()=>setModalShow(true)}>
            {task.title}
        <FaUndo onClick={()=>backTodo(task)}
            style={{float:'right', color:'black',cursor:'pointer' ,fontSize:'1rem'}}/> 
        </ListGroup.Item>
        <ShowTaskContent
        deleteTask={deleteTask}
        task={task}
        show={modalShow}
        onHide={() => setModalShow(false)}/>
        </ListGroup>
        
    )
}

export default FinishedTasks
