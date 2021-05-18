import { Navbar, Nav, NavItem, NavDropdown, MenuItem,Container } from 'react-bootstrap';
import { Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login'

const Header = () => {
    return (
    <div>
    <Navbar expand="lg" >
    <Container>
        <Navbar.Brand href="/home">ToDoList</Navbar.Brand>
        <Nav className="justify-content-end">
        <Nav.Link as={Link} to="/home">Home</Nav.Link>
        <Nav.Link href="/about">About Us</Nav.Link>
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/register">Register</Nav.Link>
        <Nav.Link href="/setting">Setting</Nav.Link>
        </Nav>
    </Container>
    </Navbar>
    <Switch>
        <Route path='/home'>
            <Home/>
        </Route>
        <Route path='/register'>
            <Register/>
        </Route>
        <Route path='/login'>
            <Login/>
        </Route>

    </Switch>
    </div>
    )
}

export default Header
