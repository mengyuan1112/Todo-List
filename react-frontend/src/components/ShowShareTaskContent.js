import React,{useState} from 'react'
import {Modal,Button,ListGroup} from 'react-bootstrap'
import './ShowTaskContent.css'

const ShowShareTaskContent = (props) => {
    const [title,setTitle] =useState(props.task.title);
    const [toggleContent,setToggleContent] = useState(true);
    const [content,setContent] = useState(props.task.content);
    
    const [toggleDate,setToggleDate] = useState(true);
    const [date,setDate] = useState(props.task.date);

    const [toggleTime,setToggleTime] = useState(true);
    const [time,setTime] = useState(props.task.time);

    const handleSave = () =>{
      setToggleDate(true)
      setToggleContent(true)
      setToggleTime(true)
      props.task.content = content
      props.task.date = date
      props.task.time = time
      props.editContent(props.task)
      props.onHide()
    }

    const handleDelete = ()=>{
      props.deleteTask(props.task)
      props.onHide()
    }

    return (
        <Modal
        show={props.show} 
        onHide={props.onHide}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Todo Detail
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <ul>
            <li>Share with :
                <span>{props.task.sharedWith}</span>
            </li>

            <li>Title :<span>{title}</span> </li>
              <li onDoubleClick={()=>setToggleContent(false)}>Content: 
                {toggleContent ? (<span>{content}</span>):
                (<input type='text' value={content} onChange={(e)=>{setContent(e.target.value)}}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setToggleContent(true)
                    e.preventDefault()
                    e.stopPropagation()
                    setContent(e.target.value)
                    props.task.content = content
                    handleSave()
                  }
                  else if (e.key === 'Escape'){
                    setToggleContent(true)
                    e.preventDefault()
                    e.stopPropagation()
                  }}}
                />)
                }
              </li>
              <li onDoubleClick={()=>setToggleDate(false)}>
                  Date: 
                  {toggleDate ? (<span>{date}</span>):
                  (<input type='date' value={date} onChange={(e)=>{setDate(e.target.value)}}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setToggleDate(true)
                      e.preventDefault()
                      e.stopPropagation()
                      setDate(e.target.value)
                      props.task.date = date
                      handleSave()
                    }
                    else if (e.key === 'Escape'){
                      setToggleDate(true)
                      e.preventDefault()
                      e.stopPropagation()
                    }}}
                  />)
                  }
              </li>
              <li onDoubleClick={()=>setToggleTime(false)}>
                  Time:
                  {toggleTime ? (<span>{time}</span>):
                  (<input type='time' value={time} onChange={(e)=>{setTime(e.target.value)}}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setToggleTime(true)
                      e.preventDefault()
                      e.stopPropagation()
                      setTime(e.target.value)
                      props.task.time = time
                      handleSave()
                    }
                    else if (e.key === 'Escape'){
                      setToggleTime(true)
                      e.preventDefault()
                      e.stopPropagation()
                    }}}
                  />)
                  }
              </li>
          </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button size="sm" onClick={handleDelete} variant="danger"> Delete Task </Button>
        {(toggleContent && toggleTime && toggleDate) ? null : 
        <Button variant="success" size="sm" onClick={handleSave}>Save Change</Button>}
        <Button size="sm" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    )
}

export default ShowShareTaskContent
