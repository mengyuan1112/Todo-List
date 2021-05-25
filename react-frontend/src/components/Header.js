import { Navbar, Nav} from 'react-bootstrap';
import { Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Main from './Main';
import Profile from './Profile'
import React ,{useState,useRef} from "react"
import "./Header.css";
import hhh from '../1.png';

const Header = () => {
    const dropdownRef = useRef(null);
    const [expanded, setExpanded] = useState(false);
    const [isActive,setIsActive]  = useState (false); 
    const onClick = () => setIsActive(!isActive);

    return (
    <div>
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
        <div className="menu-container">
            <button onClick={onClick} className="menu-trigger">
                <img className="photo" src={hhh} alt="User avatar" />
            </button>
            <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
                <ul>
                    <li><a href="/profile">Profile</a></li>
                    <li><a href="/logout">Logout</a></li>
                </ul>
            </nav>
        </div>
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
        <Route path='/profile'>
            <Profile/>
        </Route>

    </Switch>
    </div>
    );
};

export default Header
