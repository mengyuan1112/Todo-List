import { Navbar, Nav, Container } from 'react-bootstrap';
import { Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Main from './Main';
import React,{useState} from 'react';

const Header=()=>{
    const [expanded, setExpanded] = useState(false);
    return (
    <>
    <Navbar expand="xl" className="d-flex justify-content-start" expanded = {expanded}>
        <Navbar.Toggle onClick={()=>{
            setExpanded(expanded ? false : "expanded")
        }} aria-controls="navbarScroll" />
        <Navbar.Brand href="/home">ToDo</Navbar.Brand> 
        <Navbar.Collapse id="navbarScroll">
        <Nav>
        <Nav.Link onClick={() => setExpanded(false)} as={Link} to="/home">Home</Nav.Link>
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
