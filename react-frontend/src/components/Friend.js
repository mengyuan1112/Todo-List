
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Container,Col,Row,Form} from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert'
import React ,{useState,useRef,Component,useEffect} from "react"
import "./Personal.css";
import { CgUserAdd } from "react-icons/cg";
import FriendList from './FriendList'

import io from 'socket.io-client'
import axios from 'axios';
import Personal from './Personal';

const endPoint = "http://localhost:5000/friends";

const socket = io.connect(endPoint);

const Friend =({name}) => {
 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [notExistAlert, SetnotExistAlert] = useState(false);
    const [alreadyAddedAlert, SetalreadyAddedAlert] = useState(false);
    const [selfAlert,SetselfAler] = useState(false);


    const [friendNumber,SetfriendNumber]= useState(0);
    const [friends,Setfriends] = useState([]);

    useEffect(() => {
        socket.emit("IntoPersonal",{username:name})
        axios.get(`/${name}/friend`).then(
            res => {
                SetfriendNumber(res.data.friend_list.length)
                //console.log(res.data.friend_list)
                Setfriends(res.data.friend_list)
                //console.log(res.friend_list)

                //SetAvater(res.data.avater)
            },
            err => {
                console.log(err);

            }
        )},[])



    const [friendName,SetfriendName] = useState('');
    const [friendPhoto, SetfriendPhoto] = useState('');
    const [friendStatus,SetStatus] = useState(false);
    const [error,setError] = useState(false)
    var friend={friendName:friendName,friendPhoto:friendPhoto,friendStatus:friendStatus}


    const addFriends=(friend)=>{
    
        // console.log()
        //friendName.preventDefault();
        //addFriends({friendName:friendName,friendPhoto:friendPhoto,friendStatus:friendStatus})
        //Setfriends([...friends,friend])
        //SetfriendNumber(friendNumber+1)
        socket.emit("Addedfriend",{username:name , friendName:friendName},console.log("this is socket"));




    }

    socket.on('Addedfriend',data=>{

        console.log("this is from server" + data)
        if(data.result=="pass" && data.friendName!=name){
            friend={friendName:data.friendName,friendPhoto:data.friendPhoto,friendStatus:data.friendStatus}
            console.log(friend)
            SetnotExistAlert(false)
            SetalreadyAddedAlert(false)
            SetselfAler(false)
            SetfriendNumber(friendNumber+1)
            //SetfriendPhoto(data.friendPhoto)
            //SetStatus(data.friendStatus)
            Setfriends([...friends,friend])
            setShow(false)
            console.log(data.result)

            return true


        }
        else if( data.friendName==name){
            SetselfAler(true)
            return false

        }

        else if(data.result=="already added"){
            console.log(data.result)
            SetalreadyAddedAlert(true)
            setShow(true)
            return false

        }
        else{
            SetnotExistAlert(true)
            console.log(data.result)
            setShow(true)
            return false
        }

    })

    socket.on("Addedfriend1",data=>{
        console.log("this is add friend1")
    })



    const handleSubmit=(e)=>{
        e.preventDefault();
        setError(false)
        if(friendName==name){
            SetselfAler(true)
            setError(true)
        }
        else{
            if(addFriends(friend)){
                //SetfriendNumber(friendNumber+1)
                setShow(false)
            }
            else{
                setError(true)
            }

        }
        // props.addtask({title,content,date,time});

    }

    const deleteFriend = (f) =>{
        Setfriends(friends.filter((friend)=> friend.friendName!== f.friendName ))
        SetfriendNumber(friendNumber-1)
        socket.emit("Deletefriend",{username:name, friendName:f.friendName})
    }

    socket.on("Deletefriend", data=>{
        Setfriends(friends.filter((friend)=> friend.friendName!== data.username ))
        console.log(data)
    })


    const friend_list = friends.map((friend) =>
        <FriendList key={friend.friendName} friend={friend} deleteFriend={deleteFriend}/>
    );

    setTimeout(() => {
        SetnotExistAlert(false);SetalreadyAddedAlert(false);SetselfAler(false)
      }, 5000)

      

    return(
        <Container >
        <Personal name={name}></Personal>     
        <Card >
            
        <Card.Body>    
        <Card.Title> My Friends ({friendNumber})</Card.Title>
        <ListGroup variant="flush">
            <ListGroup.Item>
            <Button  variant="light"  onClick={handleShow}><CgUserAdd/></Button>
                Add new friends
            </ListGroup.Item>
            
        </ListGroup>
        {friend_list}
        </Card.Body>   
        <Modal show={show} onHide={()=>{setShow(false);SetnotExistAlert(false);SetalreadyAddedAlert(false);SetselfAler(false)}}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
            <Alert show={notExistAlert} variant="danger" onClose={() => SetnotExistAlert(false)} dismissible>
                <p>
                This user does not exist
                </p>
            </Alert>
            <Alert show={alreadyAddedAlert} variant="danger" onClose={() => SetalreadyAddedAlert(false)} dismissible>
                <p>
                You have already added this friend
                </p>
            </Alert>
            <Alert show={selfAlert} variant="danger" onClose={() => SetselfAler(false)} dismissible>
                <p>
                You can not add yourself
                </p>
            </Alert>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Col sm="10">
                <Form.Control  placeholder="Search by username" size="sm" style={{borderRadius:'10px'}} onChange={(e)=>{
                    SetfriendName(e.target.value)}}/>
                </Col>
                <Button variant="outline-secondary" type="submit" >Add</Button>
                </Form.Group>
            </Form>
            
        </Modal.Body>

        </Modal> 
        </Card>
        </Container>
    )
}

export default Friend
