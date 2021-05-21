import { Container,Row,Form,Button,Col } from 'react-bootstrap'
import { Route,Switch,useHistory } from 'react-router-dom'
import React,{useState } from 'react'
import Login from './Login'
import Axios from 'axios'


const Register = () => {
    const [emailReg,setEmailReg] = useState('');
    const [checkError, setCheckError] = useState('');
    const [registerError, setRegisterError] = useState('');
    const [usernameReg,setUsernameReg] = useState('');
    const [passwordReg,setPasswordReg] = useState('');
    const setConfirmPasswordReg = useState('');
    const history = useHistory();
    const registers= () =>{
        Axios.post('http://localhost:5000/register',{email:emailReg, username:usernameReg, password:passwordReg}).then(
            (response)=>{
                console.log(response)
                if (response.data === "The password is not satisfied categories"){
                    setRegisterError("The password is not satisfied categories, please try again.");
                }
                else{
                    history.push("/login");
                }
            });
    }
    const checkPassword=(e)=>{
        setCheckError('');
        setConfirmPasswordReg(e.target.value);
        if (passwordReg !== e.target.value){
            setCheckError("Password doesn't match")
        }
        else{
            setCheckError('');
        }
    }

    return(
    <div>
    <Container fluid="sm">
    <Row className="justify-content-md-center">
        <Col xs={5}>
            <br></br>
            <br></br>
            <h1>Register</h1>
            <hr></hr>
            <p>{registerError}</p>
            <Form>
            <Form.Group controlId="formGroupEmail">
                <Form.Control onChange={(e)=>{
                    setEmailReg(e.target.value);
                }} size="sm" type="email" placeholder="Enter Email" />
            </Form.Group>

            <Form.Group>
                <Form.Control size="sm" type="text" onChange={(e)=>{
                    setUsernameReg(e.target.value);
                }} placeholder="Enter username" />
            </Form.Group>

            <Form.Group controlId="formGroupPassword">
                <Form.Control size="sm" type="password" onChange={(e)=>{
                    setPasswordReg(e.target.value)
                }}  placeholder="Password" />
                <Form.Text id="passwordHelpBlock" muted>
                Your password must be 8-20 characters long, contain letters and numbers, and
                must not contain spaces, special characters, or emoji.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formGroupPasswordConfirm">
                <Form.Control size="sm" type="password" onChange={(e)=>checkPassword(e)} placeholder="Confirm Password" />
                <Form.Text style={{ color:"red" }}>{checkError}</Form.Text>
            </Form.Group>
            <Button onClick={registers} variant="success" type="submit" >Register</Button>
            </Form>
        </Col>
        </Row>
        <Switch>
        <Route path='/login'>
            <Login/>
        </Route>
        </Switch>
    </Container>
    </div>
    )
}

export default Register
