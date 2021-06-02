import { Navbar, Nav} from 'react-bootstrap';
import React,{useState,useRef} from 'react';
import {useHistory} from 'react-router-dom'
import './Navigation.css'
import hhh from '../1.png';
import ListGroup from 'react-bootstrap/ListGroup'


// This will create the navbar.
const Navigation=({name,onNameChange})=>{
    const history = useHistory();
    const dropdownRef = useRef(null);
    const [isActive,setIsActive]  = useState (false); 
    const [expanded, setExpanded] = useState(false);    //This is used to set to close the navbar when user onclick.
    const logout =()=>{
        setExpanded(false)
        localStorage.clear()
        onNameChange('')
        history.push('/home')
    };
    
    
    const onClick = () => setIsActive(!isActive);
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
        <Navbar.Toggle onClick={()=>{
            setExpanded(expanded ? false : true)
        }} aria-controls="navbarScroll" /> 
        {/*  Add logo here when it's ready. */}
        <Navbar.Brand href={`${hreflink}/home`}>ToDo</Navbar.Brand>
        <Navbar.Collapse id="navbarScroll"> 
        <Nav>
        {name ? 
        
        /* <><Nav.Link onClick={() => setExpanded(false)} href={`${hreflink}/main`}>ToDo List</Nav.Link>
        <Nav.Link onClick={logout}>Logout</Nav.Link> </>): */
        <Nav.Link onClick={() => setExpanded(false)} href={`${hreflink}/about`}>About Us</Nav.Link>
        :
         (<>
            <Nav.Link onClick={() => setExpanded(false)} href={`${hreflink}/home`}>Home</Nav.Link>
            <Nav.Link onClick={() => setExpanded(false)} href={`${hreflink}/login`}>Login</Nav.Link>
            <Nav.Link onClick={() => setExpanded(false)} href={`${hreflink}/register`}>Register</Nav.Link>
            <Nav.Link onClick={() => setExpanded(false)} href={`${hreflink}/about`}>About Us</Nav.Link>
        </>)}
        
        </Nav>
        </Navbar.Collapse>




        {name

        ?(<div className="menu-container">
            <button onClick={onClick} className="menu-trigger">
                <img className="photo" src={hhh} alt="User avatar" />
            </button>
            <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>

                <ListGroup>
                    <ListGroup.Item action href={`${hreflink}/profile`}>Profile </ListGroup.Item>
                    <ListGroup.Item action onClick={logout}> Logout </ListGroup.Item>
                </ListGroup>

            </nav>
        </div>)
        :(<></>)}      
        
    </Navbar>
    </>
    )
}

export default Navigation