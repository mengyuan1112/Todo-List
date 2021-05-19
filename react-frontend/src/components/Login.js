import { Container,Row,Form,Button,Col } from 'react-bootstrap'
import { Link,Route,Switch } from 'react-router-dom'
import Main from './Main'
import Register from './Register'
import React, { useState } from 'react';
import Axios from 'axios';

const Login = ({ Login,error }) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const login= () =>{
        Axios.post('http://localhost:5000/login',{email:email, password:password}).then(
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
                    setEmail(e.target.value)
                }} type="email" placeholder="Enter Email" />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
                <Form.Control size="sm" onChange={(e)=>{
                    setPassword(e.target.value)
                }} type="password" placeholder="Enter Password" />

            </Form.Group>
            <Link to="/main"><Button onClick={login} variant="success" type="submit" >login</Button></Link>
            </Form>
            <br/>
            <p>Need new account? <Link to="/register"><span>Sign up free</span></Link></p>
        </Col>
        </Row>
        <Switch>
        <Route path='/main'>
            <Main/>
        </Route>

        <Route path='/register'>
            <Register/>
        </Route>

        </Switch>
    </Container>
    )
}

export default Login
