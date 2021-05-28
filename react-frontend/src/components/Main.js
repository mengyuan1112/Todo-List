
import React,{useState,useEffect} from 'react'
import Logout from './Logout'
import {Col,CardDeck,Row,Button,ListGroup,Card} from 'react-bootstrap';
import './Main.css'
import { Switch, Route,useParams} from 'react-router-dom';
import AddTask from './AddTask'
import { Redirect, useHistory } from 'react-router';
import DayNavbar from './DayNavbar'
import Task from './Task'
import socketIOClient from "socket.io-client";
import FinishedTasks from './FinishedTasks';





const Main = ({name,onNameChange}) => {

  const endPoint = `http://localhost:5000/${name}/main`;
  const socket = socketIOClient.connect(`${endPoint}`);
    const [isShown,setIsShown] = useState(false);
    const [thingsToDo,setThingTodo]= useState(2);
    const [modalShow, setModalShow] = useState(false);
    const [tasks, setTasks] = useState([{title:'test1',content:'test1 content balallalalala',date:"5/30/2021",time:"11:59pm"},{title:'test2',content:""}]);
    const [finishedTask,setFinishedTask] = useState([{title:'finished',content:'fff'},{title:'aaaaa',content:'fff'}]);
    const [task,setTask] = useState();
    const [sharedTasks, setSharedTasks] = useState([]);
    const [thingsFinished,setThingsFinished] = useState(2)
    const [sharedThings, setShareThing] = useState(0)
    const history = useHistory();
    useEffect(() => {
      const date = new Date();
      date.setHours(0,0,0,0);
      console.log(date)
      socket.on(`date:${date}`,data=>{
        //update todo, finished and shared list to monday.
        console.log(data)
        setTasks(data);
        setThingTodo(data.length)
      })
      },[]);


    const addTask=(task)=>{
      setTasks([...tasks,task])
      setThingTodo(thingsToDo+1)
    }

    const deleteTask = (t) =>{
      setTasks(tasks.filter((task)=> task.title !== t.title ))
      setFinishedTask([...finishedTask,t])
      setThingTodo(thingsToDo-1)
      setThingsFinished(thingsFinished+1)
    }

    const moveBackTodo=(t) =>{
      setFinishedTask(finishedTask.filter((task)=> task.title !== t.title ))
      setTasks([...tasks,t])
      setThingsFinished(thingsFinished-1)
      setThingTodo(thingsToDo+1)
    }

    const todo_list = tasks.map((task) =>
        <Task key={task.title} task = {task} onDelete={deleteTask}/>
    );  

    const finish_list = finishedTask.map((task)=>
      <FinishedTasks key={task.title} task={task} backTodo={moveBackTodo}/>
    );





    return (
      <>
      {name? null : <Redirect to="home"/>}
      {/* <Button bsPrefix="btn sideButton" onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)} variant="none">&gt;</Button>
       */}
      <div className="mainDay">
        <DayNavbar socket={socket}/>
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
            <AddTask task={setTask} addtask={addTask} show={modalShow} onHide={() => setModalShow(false)}/>
            <Button onClick={() => setModalShow(true)} variant="light">+</Button>
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
