
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

    const [show2, setShow2] = useState(true);
    const handleShow2 = () => setShow2(true);


    const [emailPro,Getemail] = useState('');
    const [usernamePro,Getusername] = useState('');
    const [passwordPro, Getpassword] = useState('');

    function kkk(){
        setShow1(false);
        
    }
  

    useEffect(() => {
      axios.get('login').then(
        res => {
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
    const [newnamePro, Setnewname] = useState('');
    const [newnameError, SetnewnameErr]=  useState('');
    const [confirmPasswordPro,setConfirmPasswordPro] = useState('');
    const submitHandler= (e) =>{
    e.preventDefault();
    axios.post('profile',{name:newnamePro, password:newpasswordPro}).then(
    (response)=>{
        console.log(response);
        if (response.data.result === "Pass"){
           
        }
        else if (response.data.result === "Nickname cannot be empty"){
            SetnewnameErr(response.data.result)
            SetnewpasswordErr("")
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


    

    

    return(
        <div>
       
        <Alert show={show2} variant="success" onClose={() => setShow2(false)} dismissible>
        <p>
            Congratulations! Your nickname was successfully changed.
        </p>
        </Alert>
            
            
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
                        <Col xs="11"><h4>Username</h4> {usernamePro}</Col> <Col> </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item action onClick={handleShow}>
                        <h4>Nickname</h4>{name}
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
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="nickname" placeholder="Enter nickname" />
                    <Form.Text className="text-muted">
                    Please enter your new nickname.
                    </Form.Text>
                </Form.Group>         
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Close
            </Button>
            {!show2 &&<Button variant="primary" onClick={()=>{setShow(false);setShow2(true)}}>Save Changes</Button>}
        </Modal.Footer>
      </Modal>

      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Password change</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                
                <Form.Control type="email" placeholder="Old Password" />
                <Form.Text className="text-muted">
                  Please enter your old password
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                
                <Form.Control type="password" placeholder="New Password" />
                <Form.Text className="text-muted">
                Your password must be 8-20 characters long, contain uppercase letters, lowercase letters, numbers, and at least one spercial character.
                Your password must not contain spaces, or emoji.
                </Form.Text>
            </Form.Group>
            {newpasswordErr
            ?(<Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Confirm Password" />
                <Form.Text style={{ color:"red" }}>
                {newpasswordErr}
                </Form.Text>
            </Form.Group>)
            :(<Form.Group className="mb-3" controlId="formBasicPassword">
                
                <Form.Control type="password" placeholder="Confirm Password" />
            </Form.Group>)
            }
        </Form>   
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          {newpasswordErr
          ?(<Button variant="primary" onClick={handleClose1}>
          Submit
          </Button>)
          :(<Button variant="primary" onClick={handleClose1}>
          Submit
          </Button>)}
        </Modal.Footer>
      </Modal>

     

        </div>
        


    )
}

export default Profile