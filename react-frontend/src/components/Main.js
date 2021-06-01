
import React,{useState,useEffect} from 'react'
import Logout from './Logout'
import {Col,CardDeck,Row,Button,ListGroup,Card} from 'react-bootstrap';
import './Main.css'
import { Switch, Route,useParams} from 'react-router-dom';
import AddTask from './AddTask'
import { Redirect} from 'react-router';
import DayNavbar from './DayNavbar'
import Task from './Task'
import socketIOClient from "socket.io-client";
import FinishedTasks from './FinishedTasks';
import AddSharedTask from './AddSharedTask'
import ShareTask from './ShareTask'

const endPoint = "http://localhost:5000/main";




const Main = ({name,onNameChange}) => {

    const socket = socketIOClient.connect(endPoint);
    const [modalShow, setModalShow] = useState(false);
    const [modalForShared,setModalForShared] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [finishedTask,setFinishedTask] = useState([]);
    const [sharedTasks, setSharedTasks] = useState([]);
    const [thingsFinished,setThingsFinished] = useState(0);
    const [thingsToDo,setThingTodo]= useState(0);
    const [sharedThings, setShareThing] = useState(0);
    const [ currentDate,setCurrentDate] = useState(new Date());  //initalize the date tobe today.
    useEffect(() => {
      console.log(`currentDate:${currentDate},username:${name}`)
      socket.on(`currentDate:${currentDate},username:${name}`,data=>{
        //update todo, finished and shared list to monday.
          setTasks([]);
          setThingTodo([]);
          setSharedTasks([]);
          setThingsFinished(0)
          setThingTodo(0)
          setShareThing(0)

      });
      //disconnect once done.
      return () =>socket.disconnect();
      },[]);


    const addTask=(task)=>{
      setTasks([...tasks,task])
      currentDate.setHours(0,0,0,0,0);
      console.log({username:name,currentDate:currentDate, ...task})
      socket.emit("AddedTask",{username:name,currentDate:currentDate, ...task});
      setThingTodo(thingsToDo+1)
    }

    const addSharedTask=(task)=>{
      setSharedTasks([...sharedTasks,task])
      currentDate.setHours(0,0,0,0,0);
      console.log({username:name,currentDate:currentDate, ...task});
      socket.emit("AddedSharedTask",{username:name,currentDate:currentDate, ...task});
      setShareThing(sharedThings+1);
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

    const shareListmoveToFinish = (t) =>{
      setSharedTasks(sharedTasks.filter((task)=> task.title !== t.title ))  // filter out the task from shared list.
      setFinishedTask([...finishedTask,t])  // add the task to finished task.
      setShareThing(sharedThings-1)
      setThingsFinished(thingsFinished+1)
      console.log({currentDate:currentDate,...t}) //Task to be deleted from todo. == Task to be added to Finished
      socket.emit("shareListmoveToFinish",{username:name,currentDate:currentDate,...t})
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
      socket.emit("moveFromFinishToSharedList",{username:name,currentDate:currentDate, ...t})
      setThingsFinished(thingsFinished-1)
      setShareThing(sharedThings+1)
    }

    const todo_list = tasks.map((task) =>
        <Task key={task.title} task = {task}  onDelete={moveToFinish} deleteTask={deleteTaskFromTodo}/>
    );  

    const finish_list = finishedTask.map((task)=>
      <FinishedTasks key={task.title} task={task} backShareList={moveBackShareList} backTodo={moveBackTodo} deleteTask={deleteTaskFromFinished}/>
    );

    const shared_list = sharedTasks.map((task) =>
    <ShareTask key={task.title} task = {task}  onDelete={shareListmoveToFinish} deleteTask={deleteTaskFromShareList}/>
    );

    const setNewDay = (e) =>{
      setCurrentDate(e);
      e.setHours(0,0,0,0,0);
      console.log("SetNewDayTo:",e);
      socket.on(`username:${name},currentDate:${e}`,data=>{
       // update todo, finished and shared list to monday.
      //  setTasks([]);
      //  setThingTodo([]);
      //  setSharedTasks([]);
      //  setThingsFinished(0)
      //  setThingTodo(0)
      //  setShareThing(0)
      })
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
