import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import { Link, Route, Switch,useHistory } from 'react-router-dom'
import { Container,Row,Col} from 'react-bootstrap';
import Login from './Login';
import Main from './Main'
import './Home.css'
import Logout from './Logout'
import axios from 'axios';
import DayDisplay from './DayDisplay';

const Home = () => {
    const history = useHistory();
    const startPlanning = ()=>{
        history.push("/login")
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
                {/* <h2 className="display-4">{username}</h2> */}
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Logout/>
                <Col><p className="lead">You still have things to do today</p></Col>
                <Col><Button onClick={startPlanning} variant="outline-dark"> start planning</Button></Col>
                </Col>
                <DayDisplay/>
            </Row>
        </Container>
    )
}

export default Home
