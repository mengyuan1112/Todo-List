
import React from 'react'
import Logout from './Logout'
import {Nav,Navbar,Col,Row,Container} from 'react-bootstrap';
import './Main.css'

const Main = ({username}) => {
    return (
      <>
      <Logout/>
      <div className="mainDay">
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
          <hr/>
          {/* <Logout/> */}
        <Row>
          <Col>
            {/* <Container>
              <p>ToDo</p>
            </Container> */}
          </Col>
          <Col>
            {/* <Container>
              <p>Finished</p>
            </Container> */}
          </Col>
          </Row>
      </div>
      </>
    )
}

export default Main
