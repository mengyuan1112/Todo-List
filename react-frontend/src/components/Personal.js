import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { AiOutlineSearch } from "react-icons/ai";
import { Container,Col,Row,Form} from 'react-bootstrap';
import hhh from '../2.png';
import Alert from 'react-bootstrap/Alert'
import React ,{useState,useRef,Component,useEffect} from "react"
import "./Personal.css";
import Friend from './Friend'
import { CgUserAdd } from "react-icons/cg";
import { FcConferenceCall,FcComboChart,FcCalendar} from "react-icons/fc";
import FriendList from './FriendList'


import io from 'socket.io-client'
import axios from 'axios';
const endPoint = "http://localhost:5000/main";

const socket = io.connect(endPoint);

const Personal = ({name,onNameChange,changeImage}) => {
    
    
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



 //////////////

    let hreflink=""
    if (name){
        hreflink='/'+name
    }
    else{
        hreflink=""
    }

    const [friendPage,SetfriendPage] = useState(false)
    const [summaryPage,SetsummaryPage] = useState(false)
    const [checkedPage,SetcheckedPage] = useState(false)

    return(

        <Container>
            <Card className="card" >
            <Card.Img src={hhh} alt="Card image" className="background"/>

           
            <img className="friendsPhoto" src={imagePro} alt="User avatar" />
            <div className="centered">{usernamePro}</div>
           
        
            <Navbar  variant="light">
                <Container>
                <Nav className="me-auto">
                <Nav.Item as="li">
                <Nav.Link href={`${hreflink}/personal/friends`}  onClick={()=>{SetfriendPage(true);SetsummaryPage(false);SetcheckedPage(false)}}><FcConferenceCall/>Friends</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                <Nav.Link href={`${hreflink}/personal/summary`} onClick={()=>{SetfriendPage(false);SetsummaryPage(true);SetcheckedPage(false)}}><FcComboChart/>Summary</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                <Nav.Link href={`${hreflink}/personal/checked`} onClick={()=>{SetfriendPage(false);SetsummaryPage(false);SetcheckedPage(true)}}><FcCalendar/>Checked</Nav.Link>
                </Nav.Item>
                </Nav>
                </Container>
            </Navbar>
            </Card>
           
            
            <Card>
                {friendPage
                ?(<Friend name={usernamePro}></Friend>)
                //////////////
                :(<></>)
                }
                {summaryPage
                ?
                (<Card.Body >

                </Card.Body >)
                :(<></>)
                }
                {checkedPage
                ?
                (<Card.Body >

                </Card.Body >)
                :(<></>)
                }
            </Card>   

            {/*Modal*/ }
       
        </Container>
        
    )



}
export default Personal