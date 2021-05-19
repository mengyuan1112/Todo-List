import { Container,Row,Form,Button,Col } from 'react-bootstrap'
import { Link,Route,Switch } from 'react-router-dom'
import Main from './Main'
import React, { useState } from 'react';
import Axios from 'axios';

const Login = ({ Login,error }) => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    const login= () =>{
        Axios.post('http://localhost:5000/login',{username:username, password:password}).then(
            (response)=>{
                console.log(response)
            }
        )
    }

    return (
    <Container fluid="sm">
    <Row className="justify-content-md-center">
        <Col xs={5}>
            <br></br>
            <br></br>
            <h1>Login</h1>
            <hr></hr>
            <Form>
            <Form.Group>
            <Form.Control size="sm" onChange={(e)=>{
                    setUsername(e.target.value)
                }} type="text" placeholder="Username" />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
                <Form.Control size="sm" onChange={(e)=>{
                    setPassword(e.target.value)
                }} type="password" placeholder="Password" />

            </Form.Group>
            <Link to="/main"><Button onClick={login} variant="success" type="submit" >login</Button></Link>
            </Form>
        </Col>
        </Row>
        <Switch>
        <Route path='/main'>
            <Main/>
        </Route>
        </Switch>
    </Container>
    )
}

export default Login
