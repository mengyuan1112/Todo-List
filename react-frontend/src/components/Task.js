import React,{useState,useEffect} from 'react'
import { FaCheck } from 'react-icons/fa'

import {ListGroup} from 'react-bootstrap'
import { VscCircleFilled } from "react-icons/vsc";
import ShowTaskContent from './ShowTaskContent'

const Task = ({task,onDelete,deleteTask,editContent}) => {
    const [color,setColor] = useState('');
    useEffect(() => {
        if (task.range === "1"){
            setColor('blue');
        }
        else if (task.range === "2"){
            setColor('green');
        }
        else if (task.range === "3"){
            setColor("yellow")
        }
        else if (task.range === "4"){
            setColor("orange")
        }
        else if (task.range === "5"){
            setColor("red")
        }
        else{
            setColor('blue')
        }
    }, [task.range])
    const [modalShow, setModalShow] = React.useState(false);
    return (
    <ListGroup variant="flush" >
        <ListGroup.Item action onDoubleClick={()=>setModalShow(true)}>
        <VscCircleFilled style={{float:'left', marginRight:'1rem', color:color,fontSize:'1rem'}}/>
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
