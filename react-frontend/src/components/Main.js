
import React from 'react'
import Logout from './Logout'
import {Nav,Navbar,Col,Row,ListGroup,Card} from 'react-bootstrap';
import './Main.css'

const Main = ({name,onNameChange}) => {
    return (
      <>
      <div className="mainDay" style={{backgroundColor:'white'}}>
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
        <Card style={{ width: '35%', display:'inline-block', margin:'0 25px'}}>
          <Card.Header>Todo</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
        </Card>
        <Card style={{ width: '35%', display:'inline-block' }}>
          <Card.Header>Finished</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
      </>
    )
}

export default Main
