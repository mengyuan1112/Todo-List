import React,{useState} from 'react'
import { FaCheck } from 'react-icons/fa'
import {Form,ListGroup} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShowShareTaskContent from './ShowShareTaskContent'
import { FaUndo } from 'react-icons/fa'

const ShareTask = ({editContent,task,taskStatus,deleteTask,completedBy}) => {
    const [modalShow, setModalShow] = useState(false);
    const [isFinished,setIsFinished] = useState(false);

    const finishTask=()=>{
        setIsFinished(true)
        taskStatus(task,true)
        //onDelete(task)
    }
    const undoFinishTask=()=>{
        setIsFinished(false)
        taskStatus(task,false)
    }
    
    return (
    <ListGroup variant="flush" >
        <ListGroup.Item action onDoubleClick={()=>setModalShow(true)}>
            {task.title} 
            {
            isFinished ? <FaUndo onClick={undoFinishTask}
            style={{float:'right', color:'black',cursor:'pointer' ,fontSize:'1rem'}}/> :
            <FaCheck onClick={finishTask}
            style={{float:'right', color:'green',cursor:'pointer',fontSize:'1.5rem'}}/> 
            }
            <Form.Text>shared with: {task.sharedWith}</Form.Text>
            {completedBy.length !== 0 ? <Form.Text>Completed: {completedBy}</Form.Text>: null}
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

export default ShareTask
