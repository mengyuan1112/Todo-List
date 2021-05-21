import { Container,Row,Form,Button,Col } from 'react-bootstrap';
import { Link,Route,Switch,useHistory } from 'react-router-dom';
import Main from './Main';
import Register from './Register';
import React, { useState } from 'react';
import Axios from 'axios';
import './Login.css';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { ImFacebook2 } from "react-icons/im"
import GoogleLogin from 'react-google-login';

const Login = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [isLogin,setIsLogin] = useState(false);
    const history = useHistory();

    var message = ""
    const onSuccess = (res) =>{
        console.log('[login Sucess] currentUser: ', res.profileObj)
        setUsername(res.profileObj['googleId'])
        setIsLogin(true)
        // response.tokenId
        history.push("/main")
        // what should I send to backend? given: email,fimailyName,givenName, googleId,imageURL,name
    }
    const onFailure = (res) => {
        console.log('[login Failed] res: ',res)
        setIsLogin(false)
        message = "[login Failed] google/facebook login fail."
        return alert(message)
    }

    const responseFacebook = (response) => {
        console.log(response);
        setIsLogin(true)
        //given: acessesToken,id,name,userID;
        history.push("/main")
      }

    const componentClicked =() =>{
        console.log('clicked facebook button');
    }

    const login= () =>{
        Axios.post('http://localhost:5000/login',{username:username, password:password}).then(
            (response)=>{
                console.log(response)
                // if (response.data == 'pass'){
                //     history.push("/main")
                // }
                // else{
                //     console.log(response.data)
                // }
                // I will need to check the response message. If pass. everything good. Else, check error data.

            })
    }

    return (
    <Container fluid="sm">
    <Row className="justify-content-md-center">
        <Col xs={5}>
            {isLogin ? (<Link to="/main"/>) : (<p>{message}</p>)}
            <br></br>
            <br></br>
            <h1>Login</h1>
            <hr></hr>
            <Form>
            <Form.Group>
            <Form.Control size="sm" onChange={(e)=>{
                    setUsername(e.target.value)
                }} type="text" placeholder="Enter username" />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
                <Form.Control size="sm" onChange={(e)=>{
                    setPassword(e.target.value)
                }} type="password" placeholder="Enter Password" />

            </Form.Group>
            <Button onClick={login} variant="success" type="submit" >login</Button>
            </Form>
            <br/>
            <p>Need new account? <Link to="/register"><span>Sign up free</span></Link></p>
            <br/>
            <div className = "col-md-6 offset-md-3 text-center">
                <GoogleLogin 
                clientId= "551326818999-6bjhvslugav8rj9lsa10j4ur0pcm3mlb.apps.googleusercontent.com"
                buttonText ="Login"
                onSuccess = {onSuccess}
                onFailure = {onFailure}
                cookiePolicy ={'single_host_origin'}
                style={{ marginTop: '100px'}}
                buttonText="Login with Google"
                isSignedIn ={true}/> 
                <br></br>
                <FacebookLogin
                    appId="2318622718268647"
                    callback={responseFacebook}
                    onClick = {componentClicked}
                    onFailure = {onFailure}
                    autoload = {false}
                    render={renderProps => (
                      <button className="my-facebook-button-class" onClick={renderProps.onClick}>
                          <span className="facebookIcon"><ImFacebook2/></span>
                          Login with Facebook</button>)} />
            </div>
            {/* {isLogin ? (<Link to="/main"/>) : (<p>Login Fail</p>)} */}
        </Col>
        </Row>
        <Switch>
        <Route path="/main">
            <Main username={username}/>
        </Route>
        <Route path='/register'>
            <Register/>
        </Route>
        </Switch>
    </Container>
    )
}


export default Login
