import React,{useState} from 'react'
import {Alert,Modal,Button,ListGroup} from 'react-bootstrap'
import './ShowTaskContent.css'
import { MdModeEdit } from "react-icons/md";



const ShowTaskContent = (props) => {
    const [title,setTitle] =useState(props.task.title);
    const [newTitle,setNewTitle] = useState(props.task.title)
    const [toggleTitle,setToggleTitle] = useState(true);

    const [toggleContent,setToggleContent] = useState(true);
    const [content,setContent] = useState(props.task.content);

    const [toggleDate,setToggleDate] = useState(true);
    const [date,setDate] = useState(props.task.date);

    const [toggleRange,setToggleRange] = useState(true);
    const [range,setRange] = useState(props.task.range);

    const [toggleTime,setToggleTime] = useState(true);
    const [time,setTime] = useState(props.task.time);
    const [error,setError] = useState(false);

    const handleSave = () =>{
      props.task.content = content
      props.task.date = date
      props.task.time = time
      props.task.range = range
      props.setNewColor(range);
      setToggleDate(true)
      setToggleContent(true)
      setToggleTime(true)
      setToggleRange(true)


      // user didn't change the title.
      if (newTitle === title){
        setError(false)
        setToggleTitle(true)
        props.task.title = title
        props.editContent(newTitle, props.task)
        props.onHide()
      }
      // user changed the title with no error.
      else if (props.editContent(newTitle, props.task)){
        props.task.title = newTitle
        setError(false)
        setToggleTitle(true)
        props.onHide()
      }

      //user changed the title but title already existed.
      else{
        setToggleTitle(false)
        setError(true)
        props.task.title = title
      }
    }

    // This function will call the delete props and remove the task.
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
        {error? <Alert variant="danger">Duplicated title. Please try again.</Alert>:null}
          <ul>
            <li>Title :
            <MdModeEdit onClick={()=>setToggleTitle(!toggleTitle)} style={{float:'right'}}/>
            {toggleTitle ? (<span>{newTitle}</span>):
                (<input type='text' value={newTitle} onChange={(e)=>{setNewTitle(e.target.value)}}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    e.stopPropagation()
                    setNewTitle(e.target.value)
                    handleSave()
                  }
                  else if (e.key === 'Escape'){
                    setToggleTitle(true)
                    e.preventDefault()
                    e.stopPropagation()
                  }}}
                />  )}
                </li>
              <li>Content: 
              <MdModeEdit onClick={()=>setToggleContent(!toggleContent)} style={{float:'right'}}/>
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
              <li> Date: 
                <MdModeEdit onClick={()=>setToggleDate(!toggleDate)} style={{float:'right'}}/>
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
              <li> Time:
                <MdModeEdit onClick={()=>setToggleTime(!toggleTime)} style={{float:'right'}}/>
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
              
              <li> prority:
                <MdModeEdit onClick={()=>setToggleRange(!toggleRange)} style={{float:'right'}}/>
                  {toggleRange ? (<span>{range}</span>):
                  (<input type='range' value={range} onChange={(e)=>{setRange(e.target.value)}}
                  min="1"  max="5"  step="1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setToggleRange(true)
                      e.preventDefault()
                      e.stopPropagation()
                      setRange(e.target.value)
                      props.task.range = range
                      handleSave()
                    }
                    else if (e.key === 'Escape'){
                      setToggleRange(true)
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

        {(toggleTitle && toggleContent && toggleTime && toggleDate && toggleRange) ? null : 
        <Button variant="success" size="sm" onClick={handleSave}>Save Change</Button>}

        <Button size="sm" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    )
}

export default ShowTaskContent
