
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





const Main = ({name,onNameChange}) => {

  // const endPoint = `http://localhost:5000/${name}/main`;
  // const socket = socketIOClient.connect(`${endPoint}`);
    const [modalShow, setModalShow] = useState(false);
    const [tasks, setTasks] = useState([{title:'test1',content:'test1 content balallalalala',date:"5/30/2021",time:"11:59pm"},{title:'test2',content:""}]);
    const [finishedTask,setFinishedTask] = useState([{title:'finished',content:'fff'},{title:'aaaaa',content:'fff'}]);
    const [task,setTask] = useState();
    const [sharedTasks, setSharedTasks] = useState([]);
    const [thingsFinished,setThingsFinished] = useState(2)
    const [thingsToDo,setThingTodo]= useState(2);
    const [sharedThings, setShareThing] = useState(0);
    const [ currentDate,setCurrentDate] = useState(new Date());  //initalize the date tobe today.

    // useEffect(() => {
    //   socket.on(`currentDate:${currentDate}`,data=>{
    //     //update todo, finished and shared list to monday.
    //     console.log(data)
    //     setTasks(data);
    //     setThingTodo(data.length)
    //   })
    //   },[]);


    const addTask=(task)=>{
      setTasks([...tasks,task])
      currentDate.setHours(0,0,0,0);
      console.log({currentDate:currentDate, ...task})
      //socket.emit("AddedTask",{currentDate:currentDate, ...task});
      setThingTodo(thingsToDo+1)
    }

    const deleteTask = (t) =>{
      setTasks(tasks.filter((task)=> task.title !== t.title ))
      setFinishedTask([...finishedTask,t])
      setThingTodo(thingsToDo-1)
      setThingsFinished(thingsFinished+1)
      currentDate.setHours(0,0,0,0);
      console.log({currentDate:currentDate,...t}) //Task to be deleted from todo. == Task to be added to Finished
      //socket.emit("deleteTask",{currentDate:currentDate,...t})
    }
    const moveBackTodo=(t) =>{
      setFinishedTask(finishedTask.filter((task)=> task.title !== t.title ))
      setTasks([...tasks,t])
      currentDate.setHours(0,0,0,0);
      console.log({currentDate:currentDate, ...t});
      //socket.emit("AddedTaskBackToDo",{currentDate:currentDate, ...t})
      setThingsFinished(thingsFinished-1)
      setThingTodo(thingsToDo+1)
    }

    const todo_list = tasks.map((task) =>
        <Task key={task.title} task = {task}  onDelete={deleteTask}/>
    );  

    const finish_list = finishedTask.map((task)=>
      <FinishedTasks key={task.title} task={task} backTodo={moveBackTodo}/>
    );

    const setNewDay = (e) =>{
      setCurrentDate(e);
      e.setHours(0,0,0,0);
      console.log(e);
      //socket.on(`currentDate:${e}`,data=>{
        //update todo, finished and shared list to monday.
    //   console.log(data)
    //   setTasks([{title:'hi'}])
    //   setFinishedTask([{title:"finished."}])
    //   setSharedTasks([{title:"Share tasks with friend!"}])
    //   })
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
