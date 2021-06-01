
import { Container,Col,Row,Form} from 'react-bootstrap';
import React ,{useState,useRef,Component,useEffect} from "react"
import {ListGroup,Card} from 'react-bootstrap'

import hhh from '../1.png';
import "./Profile.css";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Changepassword from './Changepassword'
import { Switch, Route, Link } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert'





const Profile = ({name,onNameChange}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);


    const [nicknamealert, Setnicknamealert] = useState(false);
    const [passwordalert, Setpasswordalert] = useState(false);



    const [emailPro,Getemail] = useState('');
    const [usernamePro,Getusername] = useState('');
    const [passwordPro, Getpassword] = useState('');

    function kkk(){
        setShow1(false);    
    }
  

    useEffect(() => {
      axios.get('profile').then(
        res => {
            console.log("The url is /name/profile",res)
            Getemail(res.data.email)
            Getusername(res.data.username)
            Getpassword(res.data.password)
        },
       err => {
          console.log(err);
          Getemail('');
          Getusername('')
          Getpassword('')
        }
      )},[])

      
    const [newpasswordPro,Setnewpassword] = useState('');
    const [newpasswordErr,SetnewpasswordErr] = useState('');
    const [newnickname, Setnewname] = useState('');
    const [newnameError, SetnewnameErr]=  useState('');
    const [confirmPasswordPro,setConfirmPasswordPro] = useState('');


    const submitNickname= (e) =>{
    e.preventDefault();
    axios.post('profile/nickname',{username:usernamePro, newpassword:newpasswordPro,oldpassword:passwordPro}).then(

    (response)=>{
        console.log(response);
        if (response.data.result === "Pass"){
           
        }
        else if (newnickname=== "newnickname"){
            SetnewnameErr("nickname can not be empty")
            SetnewpasswordErr("")
        }

 
    })
    .catch(err=>{ console.log(err) });
    }

    const submitPassword= (e) =>{
        e.preventDefault();
        axios.post('profile/password',{username:usernamePro, newname:newnickname}).then(
        (response)=>{
            console.log(response);
            if (response.data.result === "Pass"){
               
            }
            
    
            else if (response.data.result === "The password is not satisfied categories"){
                SetnewpasswordErr(response.data.result)
                SetnewnameErr("")
            }
    
            else if (response.data.result === "You old password is not correct"){
                SetnewpasswordErr(response.data.result)
                SetnewnameErr("")
            }
    
        })
        .catch(err=>{ console.log(err) });
        }

    const checkPassword=(e)=>{
        setConfirmPasswordPro(e.target.value);
        if (newpasswordPro !== e.target.value ){
            SetnewpasswordErr("Password did't match")
        }
        else{
            SetnewpasswordErr('');
        }
    }


    const checkNicname=(e)=>{
        Setnewname(e.target.value)
        if (e.target.value== ""){
            SetnewnameErr("Nickname cannot be empty")
        }
        else{
            SetnewnameErr('');
        }
    }

    
    
    setTimeout(() => {
        Setnicknamealert(false);Setpasswordalert(false)
      }, 2000)


    return(
        <div>
       

        {/*!timeOut &&*/<Alert show={nicknamealert} variant="success" /*onClose={() => setShow2(false)} dismissible*/>

        <p>
            Congratulations! Your nickname was successfully changed.
        </p>
        </Alert>}


        {/*!timeOut &&*/<Alert show={passwordalert} variant="success" /*onClose={() => setShow2(false)} dismissible*/>
        <p>
            Congratulations! Your password was successfully changed.
        </p>
        </Alert>}
        

        <br></br>
        <br></br>
        <Container>
        <Row className="justify-content-md-center">
            <Col xs={8}>
            <Card>
            <Card.Header><h3 >Profile</h3></Card.Header>
            <ListGroup>
                <ListGroup.Item action >
                    <h4>Avatar</h4>
                    <img className="Avatar" src={hhh} alt="User avatar"/>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col xs="3"><h4>Username</h4></Col> <Col>{usernamePro}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item action onClick={handleShow} >
                    
                        <h4>Nickname</h4> {name}
                   
                </ListGroup.Item>
                <ListGroup.Item >
                    <h4>Email</h4>{emailPro}
                </ListGroup.Item>
                <ListGroup.Item action onClick={handleShow1}>
                    <h4>Password</h4>**********
                </ListGroup.Item>
            </ListGroup>  
            </Card>
            </Col>
            </Row>
        </Container>

        <Switch>
            <Route path="/changepassword" component={<Changepassword/>} />
        </Switch>



        <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Nickname Change</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <Form onSubmit={submitNickname}>
                {newnameError
                ?(<Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="nickname" onChange={(e)=>checkNicname(e)} placeholder="Enter nickname"  />

                    <Form.Text className="text-muted">
                    Please enter your new nickname.
                    </Form.Text>
                    <Form.Text style={{ color:"red" }}>{newnameError}</Form.Text> 
                </Form.Group>)  

                :(<Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="nickname" onChange={(e)=>checkNicname(e)} placeholder="Enter nickname"  />
                <Form.Text className="text-muted">
                Please enter your new nickname.
                </Form.Text>
                </Form.Group>)
                }     
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Close
            </Button>

            {newnameError
            ?(<Button variant="primary" type="submit" >Save Changes</Button>)
            :(<Button variant="primary" type="submit" onClick={()=>{setShow(false);Setnicknamealert(true)}}>Save Changes</Button>)
            }

        </Modal.Footer>
      </Modal>

      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Password change</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form onSubmit={submitPassword}>
            <Form.Group className="mb-3" controlId="formBasicPassword" >               

                <Form.Control type="password" placeholder="Old Password" />
                <Form.Text className="text-muted">
                  Please enter your old password
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                
                <Form.Control type="password" onChange={(e)=>Setnewpassword(e.target.value)} placeholder="New Password" />
                <Form.Text className="text-muted">
                Your password must be 8-20 characters long, contain uppercase letters, lowercase letters, numbers, and at least one spercial character.
                Your password must not contain spaces, or emoji.
                </Form.Text>
            </Form.Group>
            {newpasswordErr
            ?(<Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Confirm Password" onChange={(e)=>checkPassword(e)} />
                <Form.Text style={{ color:"red" }}>
                {newpasswordErr}
                </Form.Text>
            </Form.Group>)
            :(<Form.Group className="mb-3" controlId="formBasicPassword">
                
                <Form.Control type="password" placeholder="Confirm Password" onChange={(e)=>checkPassword(e)}/>
            </Form.Group>)
            }
        </Form>   
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          {newpasswordErr

          ?(<Button variant="primary" type="submit" >Submit</Button>)
          :(<Button variant="primary" type="submit" onClick={()=>{setShow1(false);Setpasswordalert(true)}}>Submit</Button>)}

        </Modal.Footer>
      </Modal>

        </div>
        


    )
}

export default Profile