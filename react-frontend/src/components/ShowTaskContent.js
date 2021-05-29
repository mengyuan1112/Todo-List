import React,{useState,useEffect} from 'react'
import {Modal,Button,ListGroup} from 'react-bootstrap'
import './ShowTaskContent.css'

const ShowTaskContent = (props) => {
    const [toggleTitle,setToggleTitle] = useState(true);
    const [title,setTitle] =useState(props.task.title);
    // useEffect(() => {
    //   if (props.task.content === "" || props.task.content === null || !props.task.content){
    //     props.task.content = "No content provided"
    //   }
    //   if (props.task.date === "" ||props.task.date === null){
    //     props.task.date = "No date provided"
    //   }
    //   if (props.task.time === "" ||props.task.time === null){
    //     props.task.time = "No time provided"
    //   }
    // },[])
    const [toggleContent,setToggleContent] = useState(true);
    const [content,setContent] = useState(props.task.content);

    const [toggleDate,setToggleDate] = useState(true);
    const [date,setDate] = useState(props.task.date);

    const [toggleTime,setToggleTime] = useState(true);
    const [time,setTime] = useState(props.task.time);



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
            <li onDoubleClick={()=>setToggleTitle(false)}>Title :
              {toggleTitle ? (<span>{title}</span>):
              (<input type='text' value={title} onChange={(e)=>{setTitle(e.target.value)}}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setToggleTitle(true)
                  e.preventDefault()
                  e.stopPropagation()
                  setTitle(e.target.value)
                  props.task.title = title
                }
                else if (e.key === 'Escape'){
                  setToggleTitle(true)
                  e.preventDefault()
                  e.stopPropagation()
                }}}
              />)
              }
              </li>
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
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    )
}

export default ShowTaskContent
