import { Container,Row,Form,Button,Col } from 'react-bootstrap'
import { Link,Route,Switch } from 'react-router-dom'
import Main from './Main'
const Login = () => {
    return (
        <div>
        {/* <Container fluid="lg">
        <row><h1>Welcome to Register Page</h1></row>
        </Container> */}
    
    <Container fluid="sm">
    <Row className="justify-content-md-center">
        <Col xs={5}>
            <br></br>
            <br></br>
            <h1>Login</h1>
            <hr></hr>
            <Form>
            <Form.Group>
            <Form.Control size="sm" type="text" placeholder="Username" />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
                <Form.Control size="sm" type="password" placeholder="Password" />

            </Form.Group>
            <Link to="/main"><Button variant="success" type="submit" >login</Button></Link>
            </Form>
        </Col>
        </Row>
        <Switch>
        <Route path='/main'>
            <Main/>
        </Route>
        </Switch>
    </Container>
    </div>
    )
}

export default Login
