import React,{ useState } from 'react'
import Button from 'react-bootstrap/Button';
import { BrowserRouter,Link, Route, Switch } from 'react-router-dom'
import Register from './Register'
import { Container,Row,Col,Nav,Pagination,Jumbotron} from 'react-bootstrap';
import Login from './Login';
import Background from '../backgroundHomePage.JPG';
import './Home.css'

const Home = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday","Sunday"];

    var myCurrentDate = new Date();
    var date = myCurrentDate.getDate();
    var month = myCurrentDate.getMonth();
    var day = myCurrentDate.getDay();

    if (date === 1){
        date+= ' st'
    }
    else if (date === 2){
        date += ' nd'
    }
    else{
        date += ' th'
    }

    
    return (
        <Container fluid="sm">
            <row><br></br></row>
            <br></br>
            <br></br>
            <br></br>
            <Row>
                <Col> 
                <h1 className="display-3">Welcome !</h1>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Col><p className="lead">You still have things to do today</p></Col>
                <Col><p className="lead">你還沒有計劃</p></Col>
                <Col><Button href="/login" variant="outline-dark"> start planning</Button></Col>
                </Col>
                <Col style={{
                    backgroundImage:`url(${Background})`,  
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'}}>
                        <Container>
                            <br/>
                            <br/>
                        <br/>
                        <Col><p className="lead" style={{fontSize:40}} className="d-flex justify-content-end">{monthNames[month]}  {date}</p></Col>
                        <Col><p className="lead" style={{fontSize:25}} className="d-flex justify-content-end">{dayName[day]}</p></Col>
                        </Container>
                </Col>
            </Row>
            <Switch>
        <Route path='/login'>
            <Login/>
        </Route>
        </Switch>
        </Container>
    )
}

export default Home
