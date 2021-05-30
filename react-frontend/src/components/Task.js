import React from 'react'
import { FaCheck } from 'react-icons/fa'
import {Card,ListGroup} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShowTaskContent from './ShowTaskContent'

const Task = ({task,onDelete}) => {
    const [modalShow, setModalShow] = React.useState(false);
    return (
    <ListGroup variant="flush" >
        <ListGroup.Item action onClick={()=>setModalShow(true)}>
            {task.title} 
            <FaCheck onClick={()=>onDelete(task)}
            style={{float:'right', color:'green',cursor:'pointer'}}/> 
        </ListGroup.Item>
        <ShowTaskContent
        task={task}
        show={modalShow}
        onHide={() => setModalShow(false)}/>
    </ListGroup>
    )
}

export default Task
