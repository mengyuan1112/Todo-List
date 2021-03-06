import { Alert,Container,Row,Form,Button,Col } from 'react-bootstrap';
import { Link,Redirect,Route,Switch,useHistory } from 'react-router-dom';
import Home from './Home';
import Main from './Main';
import Register from './Register';
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { ImFacebook2 } from "react-icons/im"
import GoogleLogin from 'react-google-login';
import io from 'socket.io-client';

// const endPoint = "http://localhost:5000/login";
// const socket = io.connect(endPoint);

const Login = ({name,onNameChange,expire,changeNickName}) => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [nickName,setNickName] = useState('')
    const [error,setError] = useState('');
    const history = useHistory();

    //This function will handle login request from google.
    const onSuccess = (response) =>{
        console.log('[Login Sucess from google] ',response)
        // Send the token and name to backend.
        axios.post('google/login',{token: response.tokenObj.id_token, name: response.profileObj.name})
        .then(res=>{
            onNameChange(response.profileObj.name)
            // socket.emit("onlineUser",{username:response.profileObj.name});
            localStorage.setItem('token',res.data.token);
            console.log("this is res: " + JSON.stringify(res))
        })
        .catch(err =>{
            console.log(err)
        })
        history.push(`/${response.profileObj.name}/home`)
    }

    //This function will handle login from facebook/google on failure.
    const onFailure = (res) => {
        console.log('[login Failed] res: ',res)
        onNameChange('')
        //setError("google/facebook login fail")
    }


    //This function will make a post request for facebook sucessful Login.
    const responseFacebook = (response) => {
        onNameChange(response.name)
        localStorage.setItem('token',response.accessToken);
        // socket.emit("onlineUser",{username:response.name})
        console.log('[Login sucess from Facebook] ',response)
        //given: acessesToken,id,name,userID;
        //send the acessToken to backend.
        // Send the token and name to backend.
        axios.post('http://localhost:5000/login',{token: response.accessToken, name: response.name})
        .then(res=>{
            console.log(res)
        })
        .catch(err =>{
            console.log(err)
        })
        history.push(`/${response.name}/home`)
      }

    //his function will handle normal login client.Post data to backend server.
    const login= (e) =>{
        e.preventDefault();
        //Send the username and password to backend.
        axios
        .post('login',{username:username, password:password})
        .then(response=>{
                console.log(response)
                if (response.data.result === 'Pass'){
                    console.log('[Regular login passed]',response);
                    localStorage.setItem('token',response.data.token);
                    onNameChange(response.data.username)
                    changeNickName(response.data.name)
                    setNickName(response.data.name);
                    // return <Redirect to={"/"+response.data.username+"/home"}/>
                    history.push(`/${response.data.username}/home`)
                    window.location.reload(false);
                }
                else{
                    console.log(response.data);
                    setError(response.data.result);
                }

            })
        .catch(error=>{ console.log(error) })
    }
    



    return (
    <Container fluid="sm">
    <Row className="justify-content-md-center">
        <Col xs={5}>
            <br></br>
            <br></br>
            {/* {expire ? <Alert variant="danger">Your session have expired.Please Login again</Alert>:null} */}
            <h1>Login</h1>
            <hr></hr>
            {name ? (<Link to= {`/${name}/home`} />) : (<p style={{color:'red'}} >{error}</p>)}
            <Form onSubmit={login}>
            <Form.Group>
            <Form.Control size="sm" style={{borderRadius:'10px'}} onChange={(e)=>{
                    setUsername(e.target.value)
                }} type="text" placeholder="Enter username" />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
                <Form.Control size="sm" style={{borderRadius:'10px'}} onChange={(e)=>{
                    setPassword(e.target.value)
                }} type="password" placeholder="Enter Password" />

            </Form.Group>
            <Button variant="success" type="submit" >login</Button>
            </Form>

            <br/>
            <p>Need new account? <Link to="/register"><span>Sign up free</span></Link></p>
            <br/>
            <div className = "col-md-6 offset-md-3 text-center">
                <GoogleLogin 
                clientId= "551326818999-6bjhvslugav8rj9lsa10j4ur0pcm3mlb.apps.googleusercontent.com"
                onSuccess = {onSuccess}
                onFailure = {onFailure}
                cookiePolicy ={'single_host_origin'}
                style={{ marginTop: '100px'}}
                buttonText="Login with Google"
                isSignedIn ={false}/> 
                <br></br>
                <FacebookLogin
                    appId="2318622718268647"
                    callback={responseFacebook}
                    onFailure = {onFailure}
                    autoload = {false}
                    render={renderProps => (
                      <button className="my-facebook-button-class" onClick={renderProps.onClick}>
                          <span className="facebookIcon"><ImFacebook2/></span>
                          Login with Facebook</button>)} />
            </div>
        </Col>
        </Row>
            <Route exact path={`/${name}/home`} component = {()=> <Home name={name} expire={expire} nickName={nickName} changeNickName={changeNickName}  onNameChange={onNameChange} thingsToDo={2}/>}/>
    </Container>
    )
}


export default Login
