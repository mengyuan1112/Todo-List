import React,{useState} from 'react'
import { FaCheck } from 'react-icons/fa'
import {Form,ListGroup} from 'react-bootstrap'
import ShowShareTaskContent from './ShowShareTaskContent'
import { FaUndo } from 'react-icons/fa'

const FinishedShareTask = ({editContent,task,taskStatus,deleteTask}) => {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <ListGroup variant="flush" >
        <ListGroup.Item action onDoubleClick={()=>setModalShow(true)}>
            {task.title}
        <FaUndo onClick={()=>taskStatus(task,false)}
            style={{float:'right', color:'black',cursor:'pointer' ,fontSize:'1rem'}}/>
        </ListGroup.Item>
        <ShowShareTaskContent
        editContent = {editContent}
        deleteTask={deleteTask}
        task={task}
        show={modalShow}
        onHide={() => setModalShow(false)}/>
        </ListGroup>
    )
}

export default FinishedShareTask
