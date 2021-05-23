import { Navbar, Nav} from 'react-bootstrap';
import React,{useState} from 'react';

// This will create the navbar.
const Navigation=()=>{
    const [expanded, setExpanded] = useState(false);    //This is used to set to close the navbar when user onclick.
    return (
    <>
    <Navbar expand="xl" className="d-flex justify-content-start" expanded = {expanded}>
        <Navbar.Toggle onClick={()=>{
            setExpanded(expanded ? false : "expanded")
        }} aria-controls="navbarScroll" /> 
        {/*  Add logo here when it's ready. */}
        <Navbar.Brand href="/">ToDo</Navbar.Brand> 
        <Navbar.Collapse id="navbarScroll"> 
        <Nav>
        <Nav.Link onClick={() => setExpanded(false)} href="/">Home</Nav.Link>
        <Nav.Link onClick={() => setExpanded(false)} href="/about">About Us</Nav.Link>
        <Nav.Link onClick={() => setExpanded(false)} href="/login">Login</Nav.Link>
        <Nav.Link onClick={() => setExpanded(false)} href="/register">Register</Nav.Link>
        <Nav.Link onClick={() => setExpanded(false)} href="/setting">Setting</Nav.Link>
        </Nav>
        </Navbar.Collapse>
    </Navbar>
    </>
    )
}

export default Navigation
