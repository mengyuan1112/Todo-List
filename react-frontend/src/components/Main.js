
import React,{useState} from 'react'
import Logout from './Logout'
import {Col,CardDeck,Row,Button,ListGroup,Card} from 'react-bootstrap';
import './Main.css'
import { Switch, Route,useParams} from 'react-router-dom';
import AddTask from './AddTask'
import { Redirect, useHistory } from 'react-router';
import DayNavbar from './DayNavbar'
import DayDisplay from './DayDisplay';

const Main = ({name,onNameChange}) => {
    const [isShown,setIsShown] = useState(false);
    const [thingsToDo,setThingTodo]= useState(0);
    const [modalShow, setModalShow] = useState(false);
    const thingsFinished = 0;
    const history = useHistory();
    


    return (
      <>
      {name? null : <Redirect to="home"/>}
      {/* <Button bsPrefix="btn sideButton" onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)} variant="none">&gt;</Button>
       */}
      <div className="mainDay">
        <DayNavbar/>
        <hr/>
      <CardDeck style={{margin:'5px 10px'}}>
        {/* This is the container for Things to do */}
        <Card>
          <Card.Body className="CardBody">
            <Card.Title>ToDo ({thingsToDo})</Card.Title>
            <hr/>
            <Card.Text><Button onClick={() => setModalShow(true)} variant="light">+</Button></Card.Text>
            <AddTask name={name} show={modalShow} onHide={() => setModalShow(false)}/>
          </Card.Body>
        </Card>

        {/* This is the container for Finished */}
        <Card>
          <Card.Body className="CardBody">
            <Card.Title>Finished ({thingsFinished})</Card.Title>
            <hr/>
            <Card.Text>

            </Card.Text>
          </Card.Body>
        </Card>

        {/* This is the container for shared List. */}
        <Card>
          <Card.Body className="CardBody">
            <Card.Title>Shared List ({thingsToDo})</Card.Title>
            <hr/>
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
