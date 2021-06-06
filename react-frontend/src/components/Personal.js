import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import { Container,Col,Row,Form} from 'react-bootstrap';
import hhh from '../1.png';
import React ,{useState,useRef,Component,useEffect} from "react"
import "./Personal.css";
import { CgUserAdd } from "react-icons/cg";
const Personal = ({name,onNameChange,changeImage}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <Container>
            <Card>
                <Card.Body >
                    <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h5>My Friends</h5>
                        
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button  variant="light"><CgUserAdd/></Button>
                         Add new friends
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                        <Col  xs="1">
                        <img className="friendsPhoto" src={hhh} alt="User avatar" />
                        </Col>
                        <Col>
                        <p class="title" >冉</p>
                        <p class="title" style={{color:'gray'}} >offline</p>
                        </Col>         
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <img className="friendsPhoto" src={hhh} alt="User avatar" />
                        </ListGroup.Item>
                    <ListGroup.Item>
                        <img className="friendsPhoto" src={hhh} alt="User avatar" />
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <img className="friendsPhoto" src={hhh} alt="User avatar" />
                    </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>            
        </Container>
    )


}
export default Personal