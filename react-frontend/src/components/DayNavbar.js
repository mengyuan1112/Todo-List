import React from 'react'
import {Nav,Navbar} from 'react-bootstrap';
const DayNavbar = () => {
    return (
        <Navbar>
          <Nav className="nav-fill w-100">
            <Nav.Link href="#"><span className="navBarDay">Mon</span></Nav.Link>
            <Nav.Link href="#"><span className="navBarDay">Tues</span></Nav.Link>
            <Nav.Link href="#"><span className="navBarDay">Wed</span></Nav.Link>
            <Nav.Link href="#"><span className="navBarDay">Thur</span></Nav.Link>
            <Nav.Link href="#"><span className="navBarDay">Fri</span></Nav.Link>
            <Nav.Link href="#"><span className="navBarDay">Sat</span></Nav.Link>
            <Nav.Link href="#"><span className="navBarDay">Sun</span></Nav.Link>
          </Nav>
          </Navbar>
    )
}

export default DayNavbar
