import React from 'react'
import { FaCheck } from 'react-icons/fa'
import {Card,ListGroup} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShowShareTaskContent from './ShowShareTaskContent'


const ShareTask = ({task,onDelete,deleteTask}) => {
    const [modalShow, setModalShow] = React.useState(false);
    return (
    <ListGroup variant="flush" >
        <ListGroup.Item action onClick={()=>setModalShow(true)}>
            {task.title} 
            <FaCheck onClick={()=>onDelete(task)}
            style={{float:'right', color:'green',cursor:'pointer',fontSize:'1.5rem'}}/> 
        </ListGroup.Item>
        <ShowShareTaskContent
        deleteTask={deleteTask}
        task={task}
        show={modalShow}
        onHide={() => setModalShow(false)}/>
    </ListGroup>
    )
}

export default ShareTask
