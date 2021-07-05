import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Container,Col,Row,Form} from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert'
import React ,{useState,useRef,Component,useEffect} from "react"
import "./Personal.css";
import { CgOpenCollective, CgUserAdd } from "react-icons/cg";
import FriendList from './FriendList'
import Personal from './Personal'


import io from 'socket.io-client'
import axios from 'axios';

const endPoint = "http://localhost:5000/friends";

const socket = io.connect(endPoint);

const Friend = (name) => {
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [notExistAlert, SetnotExistAlert] = useState(false);
    const [alreadyAddedAlert, SetalreadyAddedAlert] = useState(false);
    

    const [friendNumber,SetfriendNumber]= useState(0);

    useEffect(() => {
        axios.get(`/${name}/friend`).then(
          res => {
              console.log(res)
              SetfriendNumber(res.data.number)
             
              //SetAvater(res.data.avater)
          },
         err => {
            console.log(err);
           
          }
        )},[])


           
      

    const [friends,Setfriends] = useState([]);
    const [searchName,SetsearchName] = useState('');
    const [friendName,SetfriendName] = useState('');
    const [friendPhoto, SetfriendPhoto] = useState('');
    const [friendStatus,SetStatus] = useState('');
    const [error,setError] = useState(false)
    

    const addFriends=(friend)=>{
        console.log(name)
        // console.log()
        //friendName.preventDefault();
        //addFriends({friendName:friendName,friendPhoto:friendPhoto,friendStatus:friendStatus})
        //Setfriends([...friends,friend])
        //SetfriendNumber(friendNumber+1)

        socket.emit("Addedfriend",{username:name['name'] , friendName:friendName},console.log("this is socket"));

        socket.on('Addedfriend',data=>{
        console.log("name")
            
            console.log("this is from server" )
            if(data.result=="pass"){
                Setfriends([...friends,friend])
                SetfriendNumber(friendNumber+1)
                
                
                //SetfriendPhoto(data.photo)
                //SetStatus(data.status)
                //setShow(false)
                
                
            }
            else if(data.result=="already added"){
                console.log("already added")
                SetalreadyAddedAlert(true)
                setShow(true)
                return false

            }
            else{
                console.log("not exist")
                SetnotExistAlert(true)
                setShow(true)
                return false
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
        
        
        <Container >
        <Personal name={name}></Personal>     
        <Card className="card">
            
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
        <Modal show={show} onHide={handleClose}>
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

export default Friends