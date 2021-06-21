import React from 'react'
import { FaCheck } from 'react-icons/fa'

import {ListGroup} from 'react-bootstrap'

import ShowTaskContent from './ShowTaskContent'

const Task = ({task,onDelete,deleteTask,editContent}) => {
    const [modalShow, setModalShow] = React.useState(false);
    return (
    <ListGroup variant="flush" >
        <ListGroup.Item action onDoubleClick={()=>setModalShow(true)}>
            
            {task.title} 
            <FaCheck onClick={()=>onDelete(task)}
            style={{float:'right', color:'green',cursor:'pointer',fontSize:'1.5rem'}}/>
        </ListGroup.Item>
        <ShowTaskContent
        deleteTask={deleteTask}
        task={task}
        editContent={editContent}
        show={modalShow}
        onHide={() => setModalShow(false)}/>
    </ListGroup>
    )
}

export default Task
