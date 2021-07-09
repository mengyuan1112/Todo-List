import { Navbar, Nav} from 'react-bootstrap';
import React,{useState,useRef} from 'react';
import {useHistory} from 'react-router-dom'
import './Navigation.css'
import hhh from '../1.png';
import ListGroup from 'react-bootstrap/ListGroup'
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import axios from 'axios';

// This will create the navbar.
const Navigation=({name,onNameChange,img,changeNickName})=>{
    const history = useHistory();
    const dropdownRef = useRef(null);
    const [isActive,setIsActive]  = useState (false); 
    //const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const [expanded, setExpanded] = useState(false);    //This is used to set to close the navbar when user onclick.
    
    const logout =()=>{
        setExpanded(false);
        console.log("Logout")
        onNameChange("")
        console.log("This is the logout user: ",name);
        console.log("This is the user token: ",localStorage.getItem("token"));
        axios.post("logout",{username:name,token:localStorage.getItem('token')})
            .then(
                res=>{
                    console.log(res);
                }
            )
            .catch(
                err=>{
                    console.error(err);
                }
            )
            localStorage.clear()
            history.push('/home');
        }
    
    
    const clickedOnImage = () => setIsActive(!isActive);
    
    let hreflink=""
    if (name){
        hreflink='/'+name
    }
    else{
        hreflink=""
    }

    

    return (
        <>
        <Navbar expand="xl" className="d-flex justify-content-start" expanded = {expanded}>
            {/*  Add logo here when it's ready. */}
            <Navbar.Brand href={`${hreflink}/home`}>ToDo</Navbar.Brand>
            {name ? 
            <>
            <button onClick={clickedOnImage} className="menu-trigger" >
                <img className="photo" src={img} alt="User avatar" />
            </button>
            <nav className={`menu ${isActive ? 'active' : 'inactive'}`}>
                <ListGroup>
                    <ListGroup.Item action href={`${hreflink}/main`}>ToDo List</ListGroup.Item>
                    <ListGroup.Item action href={`${hreflink}/profile`}>Profile </ListGroup.Item>
                    <ListGroup.Item action href={`${hreflink}/personal/friends`}>Personal </ListGroup.Item>
                    <ListGroup.Item action href={`${hreflink}/about`}>About Us</ListGroup.Item>
                    <ListGroup.Item action onClick={logout}>Logout</ListGroup.Item>    
                </ListGroup>
            </nav>
            </>
            :
            <>
            <Navbar.Toggle onClick={()=>{
                setExpanded(expanded ? false : true)
                }} aria-controls="navbarScroll" /> 
                <Navbar.Collapse id="navbarScroll"> 
             <Nav>
                <Nav.Link onClick={() => setExpanded(false)} href={`${hreflink}/home`}>Home</Nav.Link>
                <Nav.Link onClick={() => setExpanded(false)} href={`${hreflink}/login`}>Login</Nav.Link>
                <Nav.Link onClick={() => setExpanded(false)} href={`${hreflink}/register`}>Register</Nav.Link>
                <Nav.Link onClick={() => setExpanded(false)} href={`${hreflink}/about`}>About Us</Nav.Link>
            </Nav>
            </Navbar.Collapse>
            </>
            }
    
        </Navbar>
        </>)
}

export default Navigation