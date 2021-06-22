import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { AiOutlineSearch } from "react-icons/ai";
import { Container,Col,Row,Form} from 'react-bootstrap';
import hhh from '../1.png';
import Alert from 'react-bootstrap/Alert'
import React ,{useState,useRef,Component,useEffect} from "react"
import "./Personal.css";
import { CgUserAdd } from "react-icons/cg";
import FriendList from './FriendList'

import io from 'socket.io-client'
import axios from 'axios';
const endPoint = "http://localhost:5000/main";

const socket = io.connect(endPoint);

const Personal = ({name,onNameChange,changeImage}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [nicknamealert, Setnicknamealert] = useState(false);
    
    
    const [usernamePro,Getusername] = useState('');
    const [imagePro, Getimage] = useState('');
    const [nickName,setNickName] = useState('');

    useEffect(() => {
        axios.get(`/${name}/profile`).then(
          res => {
              setNickName(res.data.name)
              Getusername(res.data.username)
              Getimage(res.data.icon)
             
              //SetAvater(res.data.avater)
          },
         err => {
            console.log(err);
            Getusername('')
            Getimage('')
           
          }
        )},[])

    const [friendNumber,SetfriendNumber]= useState(0);

    useEffect(() => {
        axios.get(`/${name}/personal`).then(
          res => {
              SetfriendNumber(res.data.number)
             
              //SetAvater(res.data.avater)
          },
         err => {
            console.log(err);
            Getusername('')
            Getimage('')
           
          }
        )},[])

    const [friends,Setfriends] = useState([]);
    const [searchName,SetsearchName] = useState('');
    const [friendName,SetfriendName] = useState('');
    const [friendPhoto, SetfriendPhoto] = useState('');
    const [friendStatus,SetStatus] = useState('');
    const [error,setError] = useState(false)
    

    const addFriends=(friend)=>{
        // console.log()
        //friendName.preventDefault();
        //addFriends({friendName:friendName,friendPhoto:friendPhoto,friendStatus:friendStatus})
        Setfriends([...friends,friend])
        SetfriendNumber(friendNumber+1)
        socket.emit("Addedfriend",{username:name, friendName:friendName, ...friend});
        socket.on('Addedfriend',data=>{
            
            
            console.log("this is from server" + data)
            if(data.result=="pass"){
                Setfriends([...friends,friend])
                SetfriendNumber(friendNumber+1)
                //SetfriendPhoto(data.photo)
                //SetStatus(data.status)
                //setShow(false)
                
                
            }
            else if(data.result=="already added"){
                setShow(true)


            }
            else{
                setShow(false)

            }

            })
            
        return true
        }
        

    const handleSubmit=(e)=>{
        
        // props.addtask({title,content,date,time});
        e.preventDefault();
        setError(false)
        if(addFriends({friendName:friendName,friendPhoto:friendPhoto,friendStatus:friendStatus})){
            setShow(false)
        }
        else{
            setError(true)
        }
        

    }
    
    const deleteFriend = (f) =>{
        Setfriends(friends.filter((friend)=> friend.friendName!== f.friendName ))
        SetfriendNumber(friendNumber-1)
        socket.emit("Deletefriend",{username:name,  ...f})
        }
    

    const friend_list = friends.map((friend) =>
        <FriendList key={friend.friendName} friend={friend} deleteFriend={deleteFriend}/>
        );


    return(

        <Container>
            <Alert show={nicknamealert} variant="success">
                <p>
                Congratulations! Your nickname was successfully changed.
                </p>
            </Alert>
            <Card className="card">
            {/*<Card.Img variant="top" src={hhh} className="background"/>*/}
            <img className="friendsPhoto" src={imagePro} alt="User avatar" style={{ alignSelf: 'center' }}/>
            <div style={{ alignSelf: 'center' }}>{usernamePro}</div>
            </Card>
            <Card>
                <Card.Body >
                    <Card.Title> My Friends ({friendNumber})</Card.Title>
                    <ListGroup variant="flush">
                       <ListGroup.Item>
                        <Button  variant="light"  onClick={handleShow}><CgUserAdd/></Button>
                         Add new friends
                        </ListGroup.Item>
                        
                    </ListGroup>
                    {friend_list}
                    </Card.Body>
            </Card>   

            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Col sm="10">
                    <Form.Control  placeholder="Search by username" size="sm" style={{borderRadius:'10px'}} onChange={(e)=>{
                        SetfriendName(e.target.value)}}/>
                    </Col>
                    <Button variant="outline-secondary" type="submit" >Add</Button>
                    </Form.Group>
                </Form>

                {/*<ListGroup.Item>
                            <Row>
                            <Col  xs="1" >
                            <img className="friendsPhoto" src={hhh} alt="User avatar" />
                            </Col>
                            <Col>
                            <p class="title" >冉</p>
                            <p class="title" style={{color:'gray'}} >offline</p>
                            <p class="title" style={{color:'gray'}} >708855466@qq.com</p>
                            </Col>        
                            <Col></Col>
                            <Col style={{ alignSelf: 'center' }}> <Button variant="outline-secondary">add </Button></Col> 
                            </Row>
                </ListGroup.Item>*/}
                
            </Modal.Body>
            
            </Modal>  
       
        </Container>
        
    )



}
export default Personal