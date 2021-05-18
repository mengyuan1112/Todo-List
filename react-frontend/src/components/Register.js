import { Container,Row,Form,Button,Col } from 'react-bootstrap'
import { Link,Route,Switch } from 'react-router-dom'
import Login from './Login'
const Register = () => {
    return(
    <div>
        {/* <Container fluid="lg">
        <row><h1>Welcome to Register Page</h1></row>
        </Container> */}
    
    <Container fluid="sm">
    <Row className="justify-content-md-center">
        <Col xs={5}>
            <br></br>
            <br></br>
            <h1>Register</h1>
            <hr></hr>
            <Form>
            <Form.Group controlId="formGroupEmail">
                {/* <Form.Label>Email address</Form.Label> */}
                <Form.Control size="sm" type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group>
                {/* <Form.Label>Username</Form.Label> */}
                <Form.Control size="sm" type="text" placeholder="Enter username" />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
                {/* <Form.Label>Password</Form.Label> */}
                <Form.Control size="sm" type="password" placeholder="Password" />
                <Form.Text id="passwordHelpBlock" muted>
                Your password must be 8-20 characters long, contain letters and numbers, and
                must not contain spaces, special characters, or emoji.
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
                <Form.Control size="sm" type="password" placeholder="Confirm Password" />
            </Form.Group>
            <Link to="/login"><Button variant="success" type="submit" >Register</Button></Link>
            </Form>
        </Col>
        </Row>
        <Switch>
        <Route path='/login'>
            <Login/>
        </Route>
        </Switch>
    </Container>
    </div>
    )
}

export default Register
