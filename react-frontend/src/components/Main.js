
import React,{useState,useEffect} from 'react'
import Logout from './Logout'
import {Col,CardDeck,Row,Button,ListGroup,Card} from 'react-bootstrap';
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

const endPoint = "http://localhost:2000/main";
const socket = io.connect(endPoint);


const Main = ({name,onNameChange}) => {
    const [modalShow, setModalShow] = useState(false);
    const [modalForShared,setModalForShared] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [finishedTask,setFinishedTask] = useState([]);
    const [sharedTasks, setSharedTasks] = useState([]);
    const [thingsFinished,setThingsFinished] = useState(0); //number of thing finished
    const [thingsToDo,setThingTodo]= useState(0); // number of thing todo
    const [sharedThings, setShareThing] = useState(0);  //number of shared task
    const [ currentDate,setCurrentDate] = useState(new Date());  //initalize the date tobe today.
    useEffect(() => {
      console.log(`currentDate:${currentDate},username:${name}`)
      axios.get(`${name}/main`).then(
        res => {
          console.log(res)
        },
        err => {
          console.log(err);
          setTasks([]);
          setThingTodo([]);
          setSharedTasks([]);
          setThingsFinished(0)
          setThingTodo(0)
          setShareThing(0)
        })
      //disconnect once done.
      // return () =>socket.disconnect();
      },[]);


    const addTask=(task)=>{
      const sameTitle = tasks.find(t=>t.title === task.title);
      if (sameTitle) return false
      setTasks([...tasks,task])
      currentDate.setHours(0,0,0,0,0);
      console.log({username:name,currentDate:currentDate, ...task})
      socket.emit("AddedTask",{username:name,currentDate:currentDate, ...task});
      setThingTodo(thingsToDo+1)
      socket.on("AddedTask",data=>{
        //update todo, finished and shared list to the setNewDay.
        console.log(data)
       })
      return true
    }

    const addSharedTask=(task)=>{
      const sameTitle = sharedTasks.find(t=>t.title === task.title);
      if (sameTitle) return false
      setSharedTasks([...sharedTasks,task])
      currentDate.setHours(0,0,0,0,0);
      console.log({username:name,currentDate:currentDate, ...task});
      socket.emit("AddedSharedTask",{username:name,currentDate:currentDate, ...task});
      setShareThing(sharedThings+1);
      return true
    }

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
        socket.emit("finishedShareTask",{useraname:name,currentDate:currentDate,t})
      }
      else{
        //setShareThing(sharedThings+1)
        socket.emit("undoFinishedShareTask",{useraname:name,currentDate:currentDate,t})
      }
    }

    const deleteTaskFromTodo = (t) =>{
      setTasks(tasks.filter((task)=> task.title !== t.title ))
      setThingTodo(thingsToDo-1)
      socket.emit("deleteTaskFromTodo",{username:name,currentDate:currentDate,...t})
    }
    
    const deleteTaskFromFinished =(t)=>{
      setFinishedTask(finishedTask.filter((task)=> task.title !== t.title ))
      setThingsFinished(thingsFinished-1)
      socket.emit("deleteTaskFromFinished",{username:name,currentDate:currentDate,...t})
    }

    const deleteTaskFromShareList = (t)=>{
      setSharedTasks(sharedTasks.filter((task)=> task.title !== t.title ))
      setShareThing(sharedThings-1)
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
      socket.emit("moveFromFinishToSharedList",{username:name,currentDate:currentDate, ...t});
      setThingsFinished(thingsFinished-1)
      setShareThing(sharedThings+1)
    }


    const editContent=(task)=>{
      // task title is unchangable.
      console.log("Edit content is called. New Task content: \n",task)
      socket.emit("EditTaskContent",{username:name,currentDate:currentDate, ...task})
    }

    const todo_list = tasks.map((task) =>
        <Task key={task.title} editContent = {editContent} task = {task}  onDelete={moveToFinish} deleteTask={deleteTaskFromTodo}/>
    );  

    const finish_list = finishedTask.map((task)=>
      <FinishedTasks key={task.title} editContent = {editContent} task={task} backShareList={moveBackShareList} backTodo={moveBackTodo} deleteTask={deleteTaskFromFinished}/>
    );

    const shared_list = sharedTasks.map((task) =>
    <ShareTask key={task.title} editContent = {editContent} task = {task}  taskStatus={shareTaskStatus} deleteTask={deleteTaskFromShareList}/>
    );

    const setNewDay = (e) =>{
      setCurrentDate(e);
      e.setHours(0,0,0,0,0);
      console.log("SetNewDayTo:",e);
      socket.emit("getData",{username:name,currentDate:e})
      socket.on("getData",data=>{
       //update todo, finished and shared list to the setNewDay.
       
      })
      //  setTasks([]);
      //  setThingTodo([]);
      //  setSharedTasks([]);
      //  setThingsFinished(0)
      //  setThingTodo(0)
      //  setShareThing(0)
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
          <Card.Body className="CardBody">
            <Card.Title>ToDo ({thingsToDo})</Card.Title>
            <hr/>
            <AddTask name={name} addtask={addTask} show={modalShow} onHide={() => setModalShow(false)}/>
            
            {todo_list}

            <Button onClick={() => setModalShow(true)} variant="light">+</Button>
          </Card.Body>
        </Card>

        {/* This is the container for Finished */}
        <Card>
          <Card.Body className="CardBody">
            <Card.Title>Finished ({thingsFinished})</Card.Title>
            <hr/>

            {finish_list}

          </Card.Body>
        </Card>

        {/* This is the container for shared List. */}
        <Card>
          <Card.Body className="CardBody">
            <Card.Title>Shared List ({sharedThings})</Card.Title>
            <hr/>
            <AddSharedTask addtask={addSharedTask} show={modalForShared} onHide={() => setModalForShared(false)}/>
            {shared_list}
            <Button onClick={() => setModalForShared(true)} variant="light">+</Button>
            <Card.Text>
            </Card.Text>
          </Card.Body>
        </Card>
      </CardDeck>
      </div>
      <Switch>
        <Route exact path="/addTask" component={AddTask}/> 
      </Switch>
      </>
    )
}

export default Main
