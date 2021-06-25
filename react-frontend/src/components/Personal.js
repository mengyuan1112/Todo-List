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

    const [friendPage,SetfriendPage] = useState(true)
    const [summaryPage,SetsummaryPage] = useState(false)
    const [checkedPage,SetcheckedPage] = useState(false)

    return(

        <Container>
            <Card className="card" >
            <Card.Img src={hhh} alt="Card image" className="background"/>

            <Card.ImgOverlay>
            <img className="friendsPhoto" src={imagePro} alt="User avatar" style={{ alignSelf: 'center' }}/>
            <div style={{ alignSelf: 'center' }}>{usernamePro}</div>
            </Card.ImgOverlay>
        
            <Navbar  variant="light">
                <Container>
                <Nav className="me-auto">
                <Nav.Link href="#friends" onClick={()=>{SetfriendPage(true);SetsummaryPage(false);SetcheckedPage(false)}}><FcConferenceCall/>Friends</Nav.Link>
                <Nav.Link href="#Summary" onClick={()=>{SetfriendPage(false);SetsummaryPage(true);SetcheckedPage(false)}}><FcComboChart/>Summary</Nav.Link>
                <Nav.Link href="#Checked" onClick={()=>{SetfriendPage(false);SetsummaryPage(false);SetcheckedPage(true)}}><FcCalendar/>Checked</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
            </Card>
           
            
            <Card>
                {friendPage
                ?(<Friend></Friend>)
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