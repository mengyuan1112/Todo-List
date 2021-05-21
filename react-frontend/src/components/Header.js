import { Navbar, Nav} from 'react-bootstrap';
import { Switch, Route} from 'react-router-dom';
import React,{useState} from 'react';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Main from './Main';

// This will create the navbar.
const Header=()=>{
    const [expanded, setExpanded] = useState(false);    //This is used to set to close the navbar when user onclick.
    return (
    <>
    <Navbar expand="xl" className="d-flex justify-content-start" expanded = {expanded}>
        <Navbar.Toggle onClick={()=>{
            setExpanded(expanded ? false : "expanded")
        }} aria-controls="navbarScroll" /> 
        {/*  Add logo here when it's ready. */}
        <Navbar.Brand href="/home">ToDo</Navbar.Brand> 
        <Navbar.Collapse id="navbarScroll"> 
        <Nav>
        <Nav.Link onClick={() => setExpanded(false)} href="/home">Home</Nav.Link>
        <Nav.Link onClick={() => setExpanded(false)} href="/about">About Us</Nav.Link>
        <Nav.Link onClick={() => setExpanded(false)} href="/login">Login</Nav.Link>
        <Nav.Link onClick={() => setExpanded(false)} href="/register">Register</Nav.Link>
        <Nav.Link onClick={() => setExpanded(false)} href="/setting">Setting</Nav.Link>
        </Nav>
        </Navbar.Collapse>
    </Navbar>
    <Switch>
        <Route exact path='/'>
            <Home/>
        </Route>
        <Route path='/home'>
            <Home/>
        </Route>
        <Route path='/register'>
            <Register/>
        </Route>
        <Route path='/login'>
            <Login/>
        </Route>
        <Route path='/main'>
            <Main/>
        </Route>
    </Switch>
    </>
    )
}

export default Header
