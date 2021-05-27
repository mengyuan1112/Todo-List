import React from 'react'
import { FaTimes } from 'react-icons/fa'
import {ListGroup} from 'react-bootstrap'


const Task = ({title,onDelete}) => {
    return (
        <ListGroup.Item>
            {title} 
            <FaTimes onClick={()=>onDelete(title)}
            style={{ color:'red',cursor:'pointer'}}/>
        </ListGroup.Item>
    )
}

export default Task
