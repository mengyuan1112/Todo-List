import React,{useState,useEffect} from 'react'
import { FaCheck } from 'react-icons/fa'
import {ListGroup} from 'react-bootstrap'
import { VscCircleFilled } from "react-icons/vsc";
import ShowTaskContent from './ShowTaskContent'
import { AiTwotoneBell } from "react-icons/ai";
const Task = ({task,onDelete,deleteTask,editContent}) => {
    const [color,setColor] = useState('');
    useEffect(() => {
        setNewColor(task.range);
    }, [color])

    const setNewColor = (e)=>{
        if (e === "1"){
            setColor('blue');
        }
        else if (e === "2"){
            setColor('green');
        }
        else if (e === "3"){
            setColor("yellow")
        }
        else if (e === "4"){
            setColor("orange")
        }
        else if (e === "5"){
            setColor("red")
        }
        else{
            setColor('blue')
        }
    }
    const [modalShow, setModalShow] = React.useState(false);
    return (
    <ListGroup variant="flush" >
        <ListGroup.Item action onDoubleClick={()=>setModalShow(true)}>
            <AiTwotoneBell style={{color:color}}/>
            {task.title} 
            <FaCheck onClick={()=>onDelete(task)}
            style={{float:'right', color:'green',cursor:'pointer',fontSize:'1.5rem'}}/>
        </ListGroup.Item>
        <ShowTaskContent
        setNewColor= {setNewColor}
        deleteTask={deleteTask}
        task={task}
        editContent={editContent}
        show={modalShow}
        onHide={() => setModalShow(false)}/>
    </ListGroup>
    )
}

export default Task
