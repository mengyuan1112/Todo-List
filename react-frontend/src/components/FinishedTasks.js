import React from 'react'
import {Card,ListGroup } from 'react-bootstrap'
import { FaUndo } from 'react-icons/fa'
import ShowTaskContent from './ShowTaskContent'

// const taskClicked =() =>{
//     console.log("onclicked")
// }

const FinishedTasks = ({editContent,task,backTodo,backShareList,deleteTask}) => {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <ListGroup variant="flush" >
        <ListGroup.Item action onDoubleClick={()=>setModalShow(true)}>
            {task.title}
        {task.sharedWith? <FaUndo onClick={()=>backShareList(task)}
            style={{float:'right', color:'black',cursor:'pointer' ,fontSize:'1rem'}}/> :
        <FaUndo onClick={()=>backTodo(task)}
            style={{float:'right', color:'black',cursor:'pointer' ,fontSize:'1rem'}}/> 
        }
        </ListGroup.Item>
        <ShowTaskContent
        editContent = {editContent}
        deleteTask={deleteTask}
        task={task}
        show={modalShow}
        onHide={() => setModalShow(false)}/>
        </ListGroup>
        
    )
}

export default FinishedTasks
