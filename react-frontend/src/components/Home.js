import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import { Link, Route, Switch,useHistory } from 'react-router-dom'
import { Container,Row,Col} from 'react-bootstrap';
import Login from './Login';
import Main from './Main'
import Background from '../2.png';
import './Home.css'
import Logout from './Logout'
import axios from 'axios';

const Home = ({username}) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday","Sunday"];
    var myCurrentDate = new Date();
    var date = myCurrentDate.getDate();
    var month = myCurrentDate.getMonth();
    var day = myCurrentDate.getDay();
    const history = useHistory();

    const startPlanning = ()=>{
        if (username){
            history.push("/main")
        }
        else{
            history.push("/login")
        }
    }

    if (date === 1){
        date+= 'st'
    }
    else if (date === 2){
        date += 'nd'
    }
    else{
        date += 'th'
    }
    
    return (
        <Container fluid="sm">
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Row>
                <Col> 
                <h1 className="display-3">Welcome!</h1>
                <h2 className="display-2">{username}</h2>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Logout/>
                <Col><p className="lead">You still have things to do today</p></Col>
                <Col><Button onClick={startPlanning} variant="outline-dark"> start planning</Button></Col>
                </Col>
                <Col style={{
                    backgroundImage:`url(${Background})`,  
                    backgroundPosition: 'center',
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat'}}>
                        <Container>
                            <br/>
                        <Col><p style={{fontSize:40, color:"#696969",paddingRight:'55px',marginBottom:'5px'}} className="d-flex justify-content-end">{monthNames[month]}  {date}</p></Col>
                        <Col><p style={{fontSize:30, color:"#696969",paddingRight:'55px'}} className="d-flex justify-content-end">{dayName[day]}</p></Col>
                        </Container>
                </Col>
            </Row>
            <Switch>
        <Route path='/login'>
            <Login/>
        </Route>
        <Route path="/main">
            <Main/>
        </Route>
        </Switch>
        </Container>
    )
}

export default Home
