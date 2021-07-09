import React,{useState} from 'react'
import { FaCheck } from 'react-icons/fa'
import {Form,ListGroup} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShowShareTaskContent from './ShowShareTaskContent'
import { FaUndo } from 'react-icons/fa'

const ShareTask = ({name,editContent,task,taskStatus,deleteTask}) => {
    const [modalShow, setModalShow] = useState(false);
    const [isFinished,setIsFinished] = useState(task.status);
    const [completedBy,setCompletedBy] = useState([task.completed]);
    const finishTask=()=>{
        setIsFinished(true)
        taskStatus(task,true)
        setCompletedBy([...completedBy,name])
    }
    const undoFinishTask=()=>{
        setIsFinished(false);
        taskStatus(task,false);
        setCompletedBy(completedBy.filter((completed)=>completed!==name));
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
            {(completedBy && completedBy.length !== 0) ? <Form.Text>Completed: {completedBy}</Form.Text>: null}
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
