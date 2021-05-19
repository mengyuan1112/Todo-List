import React from 'react'
import Button from 'react-bootstrap/Button';
import { BrowserRouter,Link, Route, Switch } from 'react-router-dom'
import Register from './Register'
import { Container,Row,Col,Nav,Pagination } from 'react-bootstrap';

const Home = () => {
    return (
        <Container fluid="md">
            <Row className="justify-content-lg-center">
                <Col md={{ span: 3, offset: 3 }}> <h1>Welcome </h1></Col>
                <Col md={{ span: 3, offset: 3 }}> Hi </Col>
            </Row>
        </Container>
    )
}

export default Home
