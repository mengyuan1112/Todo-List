
import React,{useState,useEffect} from 'react'
import Logout from './Logout'
import {Col,CardDeck,Row,Button,Dropdown,Card} from 'react-bootstrap';
import './Main.css'
import { Switch, Route,useParams} from 'react-router-dom';
import AddTask from './AddTask'
import { Redirect} from 'react-router';
import DayNavbar from './DayNavbar'
import Task from './Task'
import io from 'socket.io-client';
import FinishedTasks from './FinishedTasks';
import axios from 'axios'
import AddSharedTask from './AddSharedTask'
import ShareTask from './ShareTask'
import ReactCardFlip from 'react-card-flip';
import { GrSort } from "react-icons/gr";
import SortList from './SortList';

const endPoint = "http://localhost:5000/main";
const socket = io.connect(endPoint);

const Main = ({name,onNameChange}) => {
    const [modalShow, setModalShow] = useState(false);
    const [modalForShared,setModalForShared] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [finishedTask,setFinishedTask] = useState([]);
    const [shareFinishedTask,setShareFinishedTask] = useState([]);
    const [sharedTasks, setSharedTasks] = useState([]);
    const [thingsFinished,setThingsFinished] = useState(0); //number of thing finished
    const [thingsToDo,setThingTodo]= useState(0); // number of thing todo
    const [sharedThings, setShareThing] = useState(0);  //number of shared task
    const [currentDate,setCurrentDate] = useState(new Date());  //initalize the date tobe today.
    const [finishedShareTask,setFinishedShareTask] = useState([])
    const [thingsFinishedShareTask,setThingsFinishedShareTask] = useState(0)
    const [showSortBox,setShowBox] = useState(false);
    const [isFlipped,setIsFlipped] = useState(false)
    const [sort,setSort] = useState('default');
    const [shareSort,setShareSort] = useState('default')

    useEffect(() => {
        //send username to backend once user land in main page.
        //send a get request for user data.
        socket.emit("onlineUser",{username:name})
        axios.get(`${name}/main`).then(
            res => {
              console.log(res)
                console.log("after GET date is: " + currentDate)
                  console.log((res.data.todo).length)
                  if(typeof (res.data.todo).length !== 'undefined'){
                    console.log((res.data.todo).length)
                    setTasks(res.data.todo)
                    setThingTodo(res.data.todo.length)
                  }
                  if (typeof (res.data.todo).length === 'undefined') {
                    setTasks([res.data.todo])
                    setThingTodo(1)
                  }
                  if (typeof (res.data.sharedList).length !== 'undefined')
                    setSharedTasks(res.data.sharedList)
                    setShareThing(res.data.sharedList.length)
                  if (typeof (res.data.sharedList).length === 'undefined') {
                    setSharedTasks([res.data.sharedList])
                    setShareThing(1)
                  }
                  if (typeof (res.data.finishedList).length !== 'undefined')
                    setFinishedTask(res.data.finishedList)
                    setThingsFinished(res.data.finishedList.length)
                  if (typeof (res.data.finishedList).length === 'undefined') {
                    setFinishedTask([res.data.finishedList])
                    setThingsFinished(1)
                  }  else {
                       console.log(res.data)
                  }
                })
      //disconnect once done.
      // return () =>socket.disconnect();
      },[]);
     const clickedFinished=()=>{
        setIsFlipped(!isFlipped)
      }

    const addTask=(task)=>{
      const sameTitle = tasks.find(t=>t.title === task.title);
      if (sameTitle) return false
      setTasks([...tasks,task])
      currentDate.setHours(0,0,0,0,0);
      console.log({username:name,currentDate:currentDate, ...task})
      socket.emit("AddedTask",{username:name,currentDate:currentDate.toISOString(), ...task});
      setThingTodo(thingsToDo+1)
      return true
    }

    const addSharedTask=(task)=>{
      const sameTitle = sharedTasks.find(t=>t.title === task.title);
      if (sameTitle) return false
      setSharedTasks([...sharedTasks,task])
      currentDate.setHours(0,0,0,0,0);
      console.log("AddedSharedTask:", {username:name,currentDate:currentDate, ...task});
      socket.emit("AddedSharedTask",{username:name,currentDate:currentDate, ...task});
      setShareThing(sharedThings+1);
      return true
    }
    socket.on("receviedShareTask",data=>{
      console.log("This is from added shared task: ",data);
      setSharedTasks([...sharedTasks,data]);
      setShareThing(sharedThings+1);
    })



    const moveToFinish = (t) =>{
      setTasks(tasks.filter((task)=> task.title !== t.title ))
      setFinishedTask([...finishedTask,t])
      setThingTodo(thingsToDo-1)
      setThingsFinished(thingsFinished+1)
      currentDate.setHours(0,0,0,0,0);
      console.log({currentDate:currentDate,...t}) //Task to be deleted from todo. == Task to be added to Finished
      socket.emit("moveFromToDoToFinish",{username:name,currentDate:currentDate,...t})
    }

    // This function will handle the onClick event for shareList . Either finished / undo Finish
    const shareTaskStatus = (t,status) =>{
      // if status is true, the task is finished.
      if (status){
        //setShareThing(sharedThings-1)
        console.log("finishedShareTask",{useraname:name,currentDate:currentDate,t})
        socket.emit("finishedShareTask",{useraname:name,currentDate:currentDate,t})
        socket.on("finishedShareTask",data=>{
          console.log(data);
          // TODO: I will need to check if all the share user have finished the task, if so, move the task to finish.
          // Else, do nothing.
        })
      }
      else{
        //setShareThing(sharedThings+1)
        console.log("undoFinishedShareTask",{useraname:name,currentDate:currentDate,t});
        socket.emit("undoFinishedShareTask",{useraname:name,currentDate:currentDate,t});
        socket.on("undoFinishedShareTask",data=>{
          console.log(data);
          //TODO: If the task is on Finished, move back to shared List,
          //Else: do nothing.
        })
      }
    }

    const deleteTaskFromTodo = (t) =>{
      setTasks(tasks.filter((task)=> task.title !== t.title ))
      setThingTodo(thingsToDo-1)
        currentDate.setHours(0,0,0,0,0);
      socket.emit("deleteTaskFromTodo",{username:name,currentDate:currentDate.toISOString(),...t})
    }
    
    const deleteTaskFromFinished =(t)=>{
      setFinishedTask(finishedTask.filter((task)=> task.title !== t.title ))
      setThingsFinished(thingsFinished-1);
      currentDate.setHours(0,0,0,0,0);
        console.log("this is current date: "+ currentDate, t)
      socket.emit("deleteTaskFromFinished",{username:name,currentDate:currentDate,...t})

    }

    const deleteTaskFromShareList = (t)=>{
      setSharedTasks(sharedTasks.filter((task)=> task.title !== t.title ))
      setShareThing(sharedThings-1)
      console.log("deleteTaskFromShareList",{username:name,currentDate:currentDate,...t})
      socket.emit("deleteTaskFromShareList",{username:name,currentDate:currentDate,...t})
    }

    const moveBackTodo=(t) =>{
      setFinishedTask(finishedTask.filter((task)=> task.title !== t.title ))
      setTasks([...tasks,t])
      currentDate.setHours(0,0,0,0,0);
      console.log({currentDate:currentDate, ...t});
      socket.emit("moveFromFinishToTodo",{username:name,currentDate:currentDate, ...t})
      setThingsFinished(thingsFinished-1)
      setThingTodo(thingsToDo+1)
    }
    const moveBackShareList=(t)=>{
      setFinishedTask(finishedTask.filter((task)=> task.title !== t.title ))
      setSharedTasks([...sharedTasks,t])
      currentDate.setHours(0,0,0,0,0);
      console.log({currentDate:currentDate, ...t});
      console.log("moveFromFinishToSharedList",{username:name,currentDate:currentDate, ...t})
      socket.emit("moveFromFinishToSharedList",{username:name,currentDate:currentDate, ...t});
      setThingsFinished(thingsFinished-1)
      setShareThing(sharedThings+1)
    }


    const editTaskContent=(newTitle,task)=>{
      if (newTitle === task.title){
        socket.emit("EditTaskContent",{username:name,currentDate:currentDate,oldTitle:task.title, ...task})
        return true
      }
      // task title is unchangable.
      const titleExist = tasks.find(t=>t.title === newTitle);
      if (titleExist) { 
        console.log(titleExist)
        console.log("The title exit before. The new title is:",task.title)
        return false
      }
      const oldTitle = task.title
      task.title = newTitle
      console.log("Old title: ",oldTitle,"\nNewTaskContent: ",task)
      socket.emit("EditTaskContent",{username:name,currentDate:currentDate,oldTitle:oldTitle, ...task})
      console.log("The title doesn't exit. Good to go! Title is",task.title)
      return true
    }

    const editShareTaskContent =(newTitle,task)=>{
      if (newTitle === task.title){
        console.log("EditSharedTaskContent",{username:name,currentDate:currentDate,oldTitle:task.title, ...task})
        socket.emit("EditSharedTaskContent",{username:name,currentDate:currentDate,oldTitle:task.title, ...task})
        return true
      }
      const titleExist = sharedTasks.find(t=>t.title === newTitle);
      if (titleExist) { 
        console.log(titleExist)
        console.log("The title exit before. The new title is:",task.title)
        return false
      }
      const oldTitle = task.title
      task.title = newTitle
      console.log("EditSharedTaskContent",{username:name,currentDate:currentDate,oldTitle:oldTitle, ...task})
      socket.emit("EditSharedTaskContent",{username:name,currentDate:currentDate,oldTitle:oldTitle, ...task})
      console.log("The title doesn't exit. Good to go! Title is",task.title)
      return true
    }

    const setShareListSort = (e)=>{
      setShareSort(e);
    }

    const sortByDate = tasks.sort((a,b)=>(a.date > b.date)? 1:-1).map(
      (task) => <Task key={task.title} editContent = {editTaskContent} task = {task}  onDelete={moveToFinish} deleteTask={deleteTaskFromTodo}/>)
    const sortByRange = tasks.sort((a,b)=>(a.range < b.range)? 1:-1).map((task) =>
    <Task key={task.title} editContent = {editTaskContent} task = {task}  onDelete={moveToFinish} deleteTask={deleteTaskFromTodo}/>)
    const sortByDefault = tasks.map((task) =>
    <Task key={task.title} editContent = {editTaskContent} task = {task}  onDelete={moveToFinish} deleteTask={deleteTaskFromTodo}/>)

    
    const shareSortByDate = sharedTasks.sort((a,b)=>(a.date > b.date)? 1:-1).map(
      (task) => <ShareTask key={task.title} editContent = {editShareTaskContent} task = {task}  taskStatus={shareTaskStatus} deleteTask={deleteTaskFromShareList}/>)

    const shareSortByRange = sharedTasks.sort((a,b)=>(a.range < b.range)? 1:-1).map((task) =>
    <ShareTask key={task.title} editContent = {editShareTaskContent} task = {task}  taskStatus={shareTaskStatus} deleteTask={deleteTaskFromShareList}/>)

    const shareSortByDefault = sharedTasks.map((task) =>
    <ShareTask key={task.title} editContent = {editShareTaskContent} task = {task}  taskStatus={shareTaskStatus} deleteTask={deleteTaskFromShareList}/>
    );

    const finish_list = finishedTask.map((task)=>
      <FinishedTasks key={task.title} editContent = {editTaskContent} task={task} backShareList={moveBackShareList} backTodo={moveBackTodo} deleteTask={deleteTaskFromFinished}/>
    );

    const sharedTasks_finish_list = finishedShareTask.map((task) =>
    <ShareTask key={task.title} editContent = {editShareTaskContent} task = {task}  taskStatus={shareTaskStatus} deleteTask={deleteTaskFromShareList}/>
    );



    const setNewDay = (e) =>{
      setCurrentDate(e);
      e.setHours(0,0,0,0,0);
      console.log("SetNewDayTo:",e);
      socket.emit("getData",{username:name,currentDate:e})
      socket.on("getData",data=>{
       //update todo, finished and shared list to the setNewDay.
       if(typeof (data.todo).length !== 'undefined'){
        console.log((data.todo).length)
        setTasks(data.todo)
        setThingTodo(data.todo.length)
      }
      if (typeof (data.todo).length === 'undefined') {
        setTasks([data.todo])
        setThingTodo(1)
      }
      if (typeof (data.sharedList).length !== 'undefined')
        setSharedTasks(data.sharedList)
        setShareThing(data.sharedList.length)
      if (typeof (data.sharedList).length === 'undefined') {
        setSharedTasks([data.sharedList])
        setShareThing(1)
      }
      if (typeof (data.finishedList).length !== 'undefined')
        setFinishedTask(data.finishedList)
        setThingsFinished(data.finishedList.length)
      if (typeof (data.finishedList).length === 'undefined') {
        setFinishedTask([data.finishedList])
        setThingsFinished(1)
      }  else {
           console.log(data)
      }
      })
     }

    const setSortBy=(e)=>{
      setSort(e);
    }

    return (
      <>
      {name? null : <Redirect to="home"/>}
      {/* <Button bsPrefix="btn sideButton" onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)} variant="none">&gt;</Button>
       */}
      <div className="mainDay">
        <DayNavbar day={currentDate} setNewDay={setNewDay}/>
        <hr/>
      <CardDeck style={{margin:'5px 10px'}}>

        {/* This is the container for Things to do */}
        <Card>
          <Card.Body className="mainContainer">
            <Card.Title>
              ToDo ({thingsToDo})
              <Dropdown variant="none" style={{float:"right"}}>
              <Dropdown.Toggle display="hidden" variant="none" id="dropdown-basic" size="sm">
              <GrSort/>
              </Dropdown.Toggle>
              <SortList setSortBy={setSortBy} />
              </Dropdown>
              <hr/>
              </Card.Title>
            <AddTask name={name} addtask={addTask} show={modalShow} onHide={() => setModalShow(false)}/>
            
            {sort === "date" ? sortByDate:null}
            {sort === "range" ? sortByRange:null}
            {sort === "default" ? sortByDefault:null}

            <Button onClick={() => setModalShow(true)} variant="light">+</Button>
          </Card.Body>
        </Card>

        {/* This is the container for Finished */}
        <Card >
          <Card.Body className="mainContainer">
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <div>
              <Card.Title onClick={clickedFinished}>
                Finish-Self ({thingsFinished})
                <hr/>
              </Card.Title>
              {finish_list}
            </div>

            <div>
              <Card.Title onClick={clickedFinished}>
                Finish-Share({thingsFinishedShareTask})
                <hr/>
              </Card.Title>
              {sharedTasks_finish_list}
            </div>
          </ReactCardFlip>
          </Card.Body>
        </Card>

        {/* This is the container for shared List. */}
        <Card>
          <Card.Body className="mainContainer">
            <Card.Title>
              Shared List ({sharedThings})
              <Dropdown variant="none" style={{float:"right"}}>
              <Dropdown.Toggle display="hidden" variant="none" id="dropdown-basic" size="sm">
              <GrSort/>
              </Dropdown.Toggle>
              <SortList setSortBy={setShareListSort}/>
              </Dropdown>
              <hr/>
            </Card.Title>
            <AddSharedTask addtask={addSharedTask} name={name} show={modalForShared} onHide={() => setModalForShared(false)}/>
            {shareSort === "date" ? shareSortByDate:null}
            {shareSort === "range" ? shareSortByRange:null}
            {shareSort === "default" ? shareSortByDefault:null}
            <Button onClick={() => setModalForShared(true)} variant="light">+</Button>
            <Card.Text>
            </Card.Text>
          </Card.Body>
        </Card>
      </CardDeck>
      </div>
      </>
    )
}

export default Main
