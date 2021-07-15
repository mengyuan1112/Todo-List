import { Container,Row,Form,Button,Col } from 'react-bootstrap'
import { Route,Switch,useHistory } from 'react-router-dom'
import React,{useState } from 'react'
import Login from './Login'
import axios from 'axios'


const Register = () => {
    const [emailReg,setEmailReg] = useState('');
    const [passwordError,setPasswordError] = useState('');
    const [emailError,setEmailError] = useState('');
    const [usernameError,setUsernameError] = useState('');
    const [usernameReg,setUsernameReg] = useState('');
    const [passwordReg,setPasswordReg] = useState('');
    const [confirmPasswordReg,setConfirmPasswordReg] = useState('');
    const history = useHistory();
    const [error,setError] = useState(false)

    const submitHandler= (e) =>{
        e.preventDefault();
        axios.post('http://3.237.172.105:5000/register',{email:emailReg, username:usernameReg, password:passwordReg}).then(
            (response)=>{
                console.log(response);
                if (response.data.result === "Pass"){
                    history.push("/login");
                }
                else if (response.data.result === "The email already existed please sign in or change to another email"){
                    setEmailError(response.data.result);
                    setPasswordError("")
                    setUsernameError("")
                }
                else if (response.data.result === "The password is not satisfied categories"){
                    setPasswordError(response.data.result)
                    setEmailError("")
                    setUsernameError("")
                }
                else{

                    setUsernameError(response.data.result)
                    setPasswordError("")
                    setEmailError("")
                }
            })
            .catch(err=>{ console.log(err) });
    }
    const checkEmail=(e)=>{
        setEmailReg(e.target.value);
        if (e.target.value==""){
            setError(true);
        }
        else{
            setError(false);
        }
    }

    const checkUsername=(e)=>{
        setUsernameReg(e.target.value);
        if (e.target.value==""){
            setError(true);
        }
        else{
            setError(false);
        }
    }

    const checkPassword=(e)=>{
        setConfirmPasswordReg(e.target.value);
        if (passwordReg !== e.target.value ){
            setPasswordError("Password did't match")
            setError(true);
        }
        else{
            setPasswordError('');
            setError(false);
        }
    }

    const checkPasswordOnce=(e)=>{
        setPasswordReg(e.target.value)
        if (confirmPasswordReg!== e.target.value){
            setError(true);
        }
        else{
            setError(false);
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
            <Form onSubmit={submitHandler}>
                {emailError? 
                (
                <Form.Group controlId="formGroupEmail">
                <Form.Control onChange={(e)=>{ checkEmail(e)
                }} size="sm" type="email" placeholder="Enter Email" style={{borderColor:"red", borderRadius:'10px'}} />
                <Form.Text style={{ color:"red" }}>{emailError}</Form.Text> 
                </Form.Group>
                ) : 
                (<Form.Group controlId="formGroupEmail">
                <Form.Control onChange={(e)=>{
                    checkEmail(e)
                }} size="sm" type="email" placeholder="Enter Email" style={{borderRadius:'10px'}}/>
                </Form.Group>)
                }
                {usernameError? (
                <Form.Group>
                <Form.Control size="sm" type="text" style={{borderColor:"red", borderRadius:'10px'}} onChange={(e)=>{
                        checkUsername(e)
                }} placeholder="Enter username" />
                <Form.Text style={{ color:"red" }}>{usernameError}</Form.Text> 
                </Form.Group>) 
                : 
                (<Form.Group>
                <Form.Control size="sm" type="text" style={{borderRadius:'10px'}} onChange={(e)=>{
                    checkUsername(e);}} placeholder="Enter username" /> </Form.Group>)}

            <Form.Group controlId="formGroupPassword">
                <Form.Control size="sm" type="password" style={{borderRadius:'10px'}} onChange={(e)=>{
                    checkPasswordOnce(e)
                }}  placeholder="Password" />
                <Form.Text id="passwordHelpBlock" muted>
                Your password must be 8-20 characters long, contain uppercase letters, lowercase letters, numbers, and at least one spercial character.
                Your password must not contain spaces, or emoji.
                </Form.Text>
            </Form.Group>
                {passwordError? 
                (<Form.Group controlId="formGroupPasswordConfirm">
                <Form.Control size="sm" type="password" style={{borderColor:"red",borderRadius:'10px'}} onChange={(e)=>checkPassword(e)} placeholder="Confirm Password" />
                <Form.Text style={{ color:"red" }}>{passwordError}</Form.Text>
                </Form.Group>
                ):(<Form.Group controlId="formGroupPasswordConfirm">
                    <Form.Control size="sm" type="password" style={{borderRadius:'10px'}} onChange={(e)=>checkPassword(e)} placeholder="Confirm Password" /> 
                    </Form.Group> )}
            {
                error ?
                <Button variant="success" type="submit" disabled>Register</Button>
                 :
                <Button variant="success" type="submit" >Register</Button>
            }
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
