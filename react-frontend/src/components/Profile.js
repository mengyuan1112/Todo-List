import { Container,Col,Row} from 'react-bootstrap';
import React ,{useState,useRef,Component} from "react"
import ListGroup from 'react-bootstrap/ListGroup'
import hhh from '../1.png';
import "./Profile.css";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Changepassword from './Changepassword'
import { Switch, Route, Link } from 'react-router-dom';


const Profile = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    
    return(
        <div>
            <br></br>
            <br></br>
            <Container>
            <Row className="justify-content-md-center">
                <Col xs={8}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h3 >Profile</h3>
                        </ListGroup.Item >
                        <ListGroup.Item action onClick={handleShow}>
                            <h4>Avatar</h4>
                            <img className="kkk" src={hhh} alt="User avatar"/>
                            
                        </ListGroup.Item>
                        <ListGroup.Item action onClick={handleShow}>
                            <div>
                                <h4>Username</h4>"username"
                            </div>

                        </ListGroup.Item>
                        <ListGroup.Item >
                            <h4>Email</h4>"email"
                        </ListGroup.Item>
                        <ListGroup.Item action onClick={handleShow} href="/changepassword">
                            <h4>Password</h4>"Password"

                        </ListGroup.Item>
                    </ListGroup>  
                </Col>
             </Row>
            </Container>

            <Switch>
                <Route path="/changepassword" component={<Changepassword/>} />
            </Switch>
        </div>
        
    )
}

export default Profile