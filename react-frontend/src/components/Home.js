import React from 'react'
import Button from 'react-bootstrap/Button';
import {useHistory} from 'react-router-dom'
import { Container,Row,Col} from 'react-bootstrap';
import DayDisplay from './DayDisplay';
import './Home.css'

const Home = ({name,onNameChange}) => {
    const history = useHistory();
    const handleClick =()=>{
        console.log("clicked start planning")
        if (name){
            history.push(`/${name}/main`)
        }
        else{
            history.push("/login")
        }
    }
        return (
            <Container fluid="sm">
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Row>
                    <Col> 
                    <h1 className="display-3">Welcome!</h1>
                    {name ? 
                    ( <h2 className="display-4">{name}</h2>): <br></br>}
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Col><p className="lead">You still have things to do today</p></Col>
                    <Col><Button onClick={handleClick} variant="outline-dark"> start planning</Button></Col>
                    </Col>
                    <DayDisplay/>
                </Row>
            </Container>
        )
}

export default Home;